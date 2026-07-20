const encoder = new TextEncoder();

function ascii(value) {
  return String(value ?? '').normalize('NFKD').replace(/[^\x20-\x7E]/g, '?');
}

function safeFilePart(value) {
  return ascii(value).replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'Unknown';
}

function centralDateParts(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: '2-digit', month: '2-digit', day: '2-digit',
  }).formatToParts(date).reduce((result, part) => ({ ...result, [part.type]: part.value }), {});
  return `${parts.month}${parts.day}${parts.year}`;
}

export function buildQuoteKey(submission, date = new Date()) {
  const names = String(submission.name || '').trim().split(/\s+/).filter(Boolean);
  const firstInitial = safeFilePart(names[0]?.slice(0, 1) || 'X').toUpperCase();
  const lastName = safeFilePart(names.at(-1) || 'Unknown');
  const service = submission.isCloset === 'Yes' ? 'closet' : 'kitchen';
  return `${lastName}-${firstInitial}-${service}-${centralDateParts(date)}`;
}

function wrapText(label, value, width = 88) {
  const prefix = `${label}: `;
  const words = ascii(value || 'Not provided').replace(/\s+/g, ' ').trim().split(' ');
  const lines = [];
  let line = prefix;
  words.forEach((word) => {
    if (`${line}${word}`.length > width && line.trim()) {
      lines.push(line.trimEnd());
      line = '  ';
    }
    line += `${word} `;
  });
  lines.push(line.trimEnd());
  return lines;
}

function pdfEscape(value) {
  return ascii(value).replace(/([\\()])/g, '\\$1');
}

export function buildQuotePdf(submission, fileNames = [], date = new Date()) {
  const quoteKey = buildQuoteKey(submission, date);
  const lines = [
    'SKI KITCHENS - WEBSITE QUOTE REQUEST',
    `Quote ID: ${quoteKey}`,
    '',
    ...wrapText('Customer', submission.name),
    ...wrapText('Email', submission.email),
    ...wrapText('Phone', submission.phone),
    ...wrapText('Service area', submission.area),
    ...wrapText('Project type', submission.isCloset === 'Yes' ? 'Closet' : 'Kitchen'),
    ...wrapText('Closet type', submission.closetType),
    ...wrapText('Closet design assistance', submission.designAssistance),
    ...wrapText('Inventory service', submission.inventoryService),
    ...wrapText('Expedited service', submission.expeditedService),
    '',
    ...wrapText('Project details', submission.details),
    '',
    ...wrapText('Attached files', fileNames.length ? fileNames.join(', ') : 'None'),
  ];

  const pageLines = [];
  for (let index = 0; index < lines.length; index += 46) pageLines.push(lines.slice(index, index + 46));
  const objects = [];
  const pageRefs = pageLines.map((_, index) => `${4 + index * 2} 0 R`).join(' ');
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = `<< /Type /Pages /Kids [${pageRefs}] /Count ${pageLines.length} >>`;
  objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  pageLines.forEach((page, index) => {
    const pageNumber = 4 + index * 2;
    const contentNumber = pageNumber + 1;
    const content = `BT\n/F1 11 Tf\n50 742 Td\n14 TL\n${page.map((line) => `(${pdfEscape(line)}) Tj T*`).join('\n')}\nET`;
    objects[pageNumber] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentNumber} 0 R >>`;
    objects[contentNumber] = `<< /Length ${encoder.encode(content).length} >>\nstream\n${content}\nendstream`;
  });

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = encoder.encode(pdf).length;
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
  }
  const xrefOffset = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let index = 1; index < objects.length; index += 1) pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return encoder.encode(pdf);
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = (value & 1) ? (0xEDB88320 ^ (value >>> 1)) : (value >>> 1);
  return value >>> 0;
});

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  bytes.forEach((byte) => { crc = crcTable[(crc ^ byte) & 0xFF] ^ (crc >>> 8); });
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function set16(view, offset, value) { view.setUint16(offset, value, true); }
function set32(view, offset, value) { view.setUint32(offset, value >>> 0, true); }
function concat(parts) {
  const result = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let offset = 0;
  parts.forEach((part) => { result.set(part, offset); offset += part.length; });
  return result;
}

export function buildZip(entries, date = new Date()) {
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();

  entries.forEach((entry) => {
    const name = encoder.encode(String(entry.name).replace(/[\\:]/g, '_'));
    const data = entry.content instanceof Uint8Array ? entry.content : new Uint8Array(entry.content);
    const checksum = crc32(data);
    const local = new Uint8Array(30 + name.length);
    const localView = new DataView(local.buffer);
    set32(localView, 0, 0x04034B50); set16(localView, 4, 20); set16(localView, 6, 0x0800);
    set16(localView, 8, 0); set16(localView, 10, dosTime); set16(localView, 12, dosDate);
    set32(localView, 14, checksum); set32(localView, 18, data.length); set32(localView, 22, data.length);
    set16(localView, 26, name.length); set16(localView, 28, 0); local.set(name, 30);
    localParts.push(local, data);

    const central = new Uint8Array(46 + name.length);
    const centralView = new DataView(central.buffer);
    set32(centralView, 0, 0x02014B50); set16(centralView, 4, 20); set16(centralView, 6, 20);
    set16(centralView, 8, 0x0800); set16(centralView, 10, 0); set16(centralView, 12, dosTime); set16(centralView, 14, dosDate);
    set32(centralView, 16, checksum); set32(centralView, 20, data.length); set32(centralView, 24, data.length);
    set16(centralView, 28, name.length); set16(centralView, 30, 0); set16(centralView, 32, 0);
    set16(centralView, 34, 0); set16(centralView, 36, 0); set32(centralView, 38, 0); set32(centralView, 42, localOffset);
    central.set(name, 46); centralParts.push(central);
    localOffset += local.length + data.length;
  });

  const centralDirectory = concat(centralParts);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  set32(endView, 0, 0x06054B50); set16(endView, 4, 0); set16(endView, 6, 0);
  set16(endView, 8, entries.length); set16(endView, 10, entries.length);
  set32(endView, 12, centralDirectory.length); set32(endView, 16, localOffset); set16(endView, 20, 0);
  return concat([...localParts, centralDirectory, end]);
}
