import { sendSmtpMail } from '../../lib/smtp';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

function clean(value, maxLength = 2000) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    if (clean(formData.get('companyWebsite'))) return Response.json({ ok: true });

    const submission = {
      name: clean(formData.get('name'), 120),
      email: clean(formData.get('email'), 180),
      phone: clean(formData.get('phone'), 60),
      area: clean(formData.get('area'), 120),
      isCloset: formData.get('isCloset') === 'Yes' ? 'Yes' : 'No',
      closetType: clean(formData.get('closetType'), 120) || 'Not selected',
      designAssistance: formData.get('designAssistance') === 'Yes' ? 'Yes' : 'No',
      inventoryService: formData.get('inventoryService') === 'Yes' ? 'Yes' : 'No',
      expeditedService: formData.get('expeditedService') === 'Yes' ? 'Yes' : 'No',
      details: clean(formData.get('details'), 5000),
    };

    if (!submission.name || !submission.email || !submission.phone || !submission.area || !submission.details) {
      return Response.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(submission.email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const files = formData.getAll('plans').filter((item) => item && typeof item.arrayBuffer === 'function' && item.size > 0);
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_UPLOAD_BYTES) {
      return Response.json({ error: 'Combined attachments must be 4 MB or less.' }, { status: 400 });
    }
    if (files.some((file) => !ALLOWED_TYPES.has(file.type))) {
      return Response.json({ error: 'Only PDF, JPG, PNG, and WEBP attachments are accepted.' }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_APP_PASSWORD;
    const recipient = process.env.QUOTE_TO_EMAIL || 'quotes@ski-kitchens.com';
    if (!smtpUser || !smtpPassword) {
      console.error('Quote email is not configured: missing SMTP_USER or SMTP_APP_PASSWORD.');
      return Response.json({ error: 'The quote inbox is temporarily unavailable. Please try again shortly.' }, { status: 503 });
    }

    const rows = [
      ['Full Name', submission.name], ['Email Address', submission.email], ['Phone Number', submission.phone],
      ['Service Area', submission.area], ['Closet Project', submission.isCloset], ['Closet Type', submission.closetType],
      ['Closet Design Assistance', submission.designAssistance], ['Inventory Service', submission.inventoryService],
      ['Expedited Service', submission.expeditedService],
      ['Project Details', submission.details], ['Attachments', files.length ? files.map((file) => file.name).join(', ') : 'None'],
    ];

    const htmlRows = rows.map(([label, value]) => `<tr><th style="padding:10px;border:1px solid #d8dee8;text-align:left;background:#f7f9fc">${escapeHtml(label)}</th><td style="padding:10px;border:1px solid #d8dee8;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('');
    const textBody = rows.map(([label, value]) => `${label}: ${value}`).join('\n\n');
    const attachments = await Promise.all(files.map(async (file) => ({
      filename: clean(file.name, 180),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    })));

    await sendSmtpMail({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      username: smtpUser,
      password: smtpPassword,
      from: `SKI Website <${smtpUser}>`,
      to: recipient,
      replyTo: submission.email,
      subject: `New quote request from ${submission.name}${submission.isCloset === 'Yes' ? ' - Closet Project' : ''}`,
      text: textBody,
      html: `<h2>New SKI Quote Request</h2><p>Submitted through the website quote form.</p><table style="border-collapse:collapse;width:100%;max-width:760px">${htmlRows}</table>`,
      attachments,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Quote submission failed:', error);
    return Response.json({ error: 'Your request could not be sent. Please try again.' }, { status: 500 });
  }
}
