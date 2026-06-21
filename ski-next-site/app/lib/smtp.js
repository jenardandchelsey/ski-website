import tls from 'node:tls';
import { randomUUID } from 'node:crypto';

class LineReader {
  constructor(socket) {
    this.buffer = '';
    this.lines = [];
    this.waiters = [];
    this.error = null;
    socket.on('data', (chunk) => {
      this.buffer += chunk.toString('utf8');
      const parts = this.buffer.split(/\r?\n/);
      this.buffer = parts.pop();
      parts.forEach((line) => this.push(line));
    });
    socket.on('error', (error) => this.fail(error));
    socket.on('end', () => this.fail(new Error('SMTP connection closed unexpectedly.')));
  }
  push(line) {
    const waiter = this.waiters.shift();
    if (waiter) waiter.resolve(line);
    else this.lines.push(line);
  }
  fail(error) {
    this.error = error;
    this.waiters.splice(0).forEach((waiter) => waiter.reject(error));
  }
  next() {
    if (this.error) return Promise.reject(this.error);
    if (this.lines.length) return Promise.resolve(this.lines.shift());
    return new Promise((resolve, reject) => this.waiters.push({ resolve, reject }));
  }
}

async function reply(reader) {
  const first = await reader.next();
  const code = Number(first.slice(0, 3));
  const lines = [first];
  if (first[3] === '-') {
    while (true) {
      const line = await reader.next();
      lines.push(line);
      if (line.startsWith(`${code} `)) break;
    }
  }
  return { code, message: lines.join('\n') };
}

async function command(socket, reader, value, expected) {
  socket.write(`${value}\r\n`);
  const response = await reply(reader);
  if (!expected.includes(response.code)) throw new Error(`SMTP command failed (${response.code}).`);
}

function encodeHeader(value) {
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`;
}

function wrapBase64(buffer) {
  return buffer.toString('base64').match(/.{1,76}/g)?.join('\r\n') || '';
}

function createMessage({ from, to, replyTo, subject, text, html, attachments }) {
  const mixed = `mixed-${randomUUID()}`;
  const alternative = `alternative-${randomUUID()}`;
  const lines = [
    `From: ${from}`, `To: ${to}`, `Reply-To: ${replyTo}`, `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`, 'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${mixed}"`, '', `--${mixed}`,
    `Content-Type: multipart/alternative; boundary="${alternative}"`, '', `--${alternative}`,
    'Content-Type: text/plain; charset="UTF-8"', 'Content-Transfer-Encoding: 8bit', '', text, '',
    `--${alternative}`, 'Content-Type: text/html; charset="UTF-8"', 'Content-Transfer-Encoding: 8bit', '', html, '',
    `--${alternative}--`,
  ];
  attachments.forEach((attachment) => {
    const filename = attachment.filename.replace(/[\r\n"\\]/g, '_').slice(0, 180);
    lines.push('', `--${mixed}`, `Content-Type: ${attachment.contentType}; name="${filename}"`,
      'Content-Transfer-Encoding: base64', `Content-Disposition: attachment; filename="${filename}"`, '',
      wrapBase64(attachment.content));
  });
  lines.push('', `--${mixed}--`, '');
  return lines.join('\r\n').replace(/^\./gm, '..');
}

export async function sendSmtpMail(options) {
  const socket = tls.connect({ host: options.host, port: options.port, servername: options.host, rejectUnauthorized: true });
  socket.setTimeout(20000, () => socket.destroy(new Error('SMTP connection timed out.')));
  const reader = new LineReader(socket);
  try {
    await new Promise((resolve, reject) => {
      socket.once('secureConnect', resolve);
      socket.once('error', reject);
    });
    const greeting = await reply(reader);
    if (greeting.code !== 220) throw new Error('SMTP server did not accept the connection.');
    await command(socket, reader, 'EHLO ski-kitchens.com', [250]);
    const auth = Buffer.from(`\0${options.username}\0${options.password}`).toString('base64');
    await command(socket, reader, `AUTH PLAIN ${auth}`, [235]);
    await command(socket, reader, `MAIL FROM:<${options.username}>`, [250]);
    await command(socket, reader, `RCPT TO:<${options.to}>`, [250, 251]);
    await command(socket, reader, 'DATA', [354]);
    socket.write(`${createMessage(options)}\r\n.\r\n`);
    const result = await reply(reader);
    if (result.code !== 250) throw new Error('SMTP server did not accept the message.');
    await command(socket, reader, 'QUIT', [221]);
  } finally {
    socket.end();
  }
}
