import { sendSmtpMail } from '../../lib/smtp';
import { buildQuoteKey, buildQuotePdf, buildZip } from '../../lib/quote-package';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_FILES = 10;
const ALLOWED_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

function clean(value, maxLength = 2000) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, (character) => ({
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

    if (!submission.name || !submission.email || !submission.phone || !submission.area) {
      return Response.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(submission.email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const files = formData.getAll('plans').filter((item) => item && typeof item.arrayBuffer === 'function' && item.size > 0);
    if (files.length > MAX_FILES) {
      return Response.json({ error: `Please upload no more than ${MAX_FILES} files.` }, { status: 400 });
    }
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_UPLOAD_BYTES) {
      return Response.json({ error: 'Combined attachments must be 4 MB or less.' }, { status: 400 });
    }
    if (files.some((file) => !ALLOWED_TYPES.has(file.type))) {
      return Response.json({ error: 'Only PDF, JPG, PNG, and WEBP attachments are accepted.' }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_APP_PASSWORD;
    const recipient = 'quotes@ski-kitchens.com';
    if (!smtpUser || !smtpPassword) {
      console.error('Quote email is not configured: missing SMTP_USER or SMTP_APP_PASSWORD.');
      return Response.json({ error: 'The quote inbox is temporarily unavailable. Please try again shortly.' }, { status: 503 });
    }

    const rows = [
      ['Full Name', submission.name], ['Email Address', submission.email], ['Phone Number', submission.phone],
      ['Service Area', submission.area], ['Closet Project', submission.isCloset], ['Closet Type', submission.closetType],
      ['Closet Design Assistance', submission.designAssistance], ['Inventory Service', submission.inventoryService],
      ['Expedited Service', submission.expeditedService],
      ['Project Details', submission.details || 'Not provided'], ['Attachments', files.length ? files.map((file) => file.name).join(', ') : 'None'],
    ];

    const htmlRows = rows.map(([label, value]) => `<tr><th style="padding:11px 14px;border:1px solid #d8dee8;text-align:left;background:#f7f9fc;color:#00306b;width:190px">${escapeHtml(label)}</th><td style="padding:11px 14px;border:1px solid #d8dee8;white-space:pre-wrap;color:#26384d">${escapeHtml(value)}</td></tr>`).join('');
    const textBody = rows.map(([label, value]) => `${label}: ${value}`).join('\n\n');
    const preparedFiles = await Promise.all(files.map(async (file, index) => ({
      filename: clean(file.name, 180), content: Buffer.from(await file.arrayBuffer()), contentType: file.type,
      contentId: `ski-upload-${index + 1}@ski-kitchens.com`, disposition: file.type.startsWith('image/') ? 'inline' : 'attachment',
    })));
    const quoteKey = buildQuoteKey(submission);
    const quotePdf = Buffer.from(buildQuotePdf(submission, preparedFiles.map((file) => file.filename)));
    const filesZip = preparedFiles.length ? Buffer.from(buildZip(preparedFiles.map((file) => ({ name: file.filename, content: file.content })))) : null;
    const quotePdfId = 'ski-quote-pdf@ski-kitchens.com';
    const filesZipId = 'ski-quote-files@ski-kitchens.com';
    const fileCards = preparedFiles.length ? preparedFiles.map((file, index) => {
      const preview = file.contentType.startsWith('image/')
        ? `<img src="cid:${file.contentId}" alt="${escapeHtml(file.filename)}" style="display:block;width:150px;height:105px;object-fit:cover;border-radius:5px 5px 0 0;background:#eef2f6">`
        : `<div style="display:flex;width:150px;height:105px;align-items:center;justify-content:center;border-radius:5px 5px 0 0;background:#eef2f6;color:#c62828;font-size:28px;font-weight:800">PDF</div>`;
      return `<td style="padding:0 10px 14px 0;vertical-align:top"><a href="cid:${file.contentId}" style="display:block;width:150px;border:1px solid #d8dee8;border-radius:6px;text-decoration:none;overflow:hidden">${preview}<span style="display:block;padding:8px;color:#00306b;font:12px Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${index + 1}. ${escapeHtml(file.filename)}</span></a></td>`;
    }).reduce((rowsHtml, card, index) => `${rowsHtml}${index % 4 === 0 ? '<tr>' : ''}${card}${index % 4 === 3 || index === preparedFiles.length - 1 ? '</tr>' : ''}`, '') : '<tr><td style="color:#65758b">No files attached.</td></tr>';
    const saveButtons = `<table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="padding:0 10px 10px 0"><a href="cid:${quotePdfId}" style="display:inline-block;background:#fbb316;color:#001f4f;text-decoration:none;font:bold 14px Arial,sans-serif;padding:13px 18px;border-radius:5px">&#128190;&nbsp; DOWNLOAD QUOTE PDF</a></td>${filesZip ? `<td style="padding:0 0 10px"><a href="cid:${filesZipId}" style="display:inline-block;background:#003f7d;color:#fff;text-decoration:none;font:bold 14px Arial,sans-serif;padding:13px 18px;border-radius:5px">&#128190;&nbsp; DOWNLOAD ALL FILES</a></td>` : ''}</tr></table>`;
    const htmlBody = `<div style="margin:0;background:#f2f5f8;padding:24px;font-family:Arial,sans-serif"><div style="max-width:820px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #d8dee8"><div style="background:#003f7d;padding:22px 26px"><h1 style="margin:0;color:#fff;font-size:24px">New SKI Quote Request</h1><p style="margin:6px 0 0;color:#dbe8f5;font-size:14px">${escapeHtml(quoteKey)}</p></div><div style="padding:24px 26px"><p style="margin:0 0 18px;color:#44566c">Submitted through the SKI Kitchens website.</p>${saveButtons}<table style="border-collapse:collapse;width:100%;margin:8px 0 24px">${htmlRows}</table><h2 style="margin:0 0 12px;color:#00306b;font-size:18px">Uploaded files</h2><table role="presentation" cellspacing="0" cellpadding="0">${fileCards}</table><p style="margin:16px 0 0;color:#65758b;font-size:12px">The quote PDF, original uploads, and a ZIP containing all uploaded files are also attached to this email.</p></div></div></div>`;
    const attachments = [
      ...preparedFiles,
      { filename: `${quoteKey}.pdf`, content: quotePdf, contentType: 'application/pdf', contentId: quotePdfId },
      ...(filesZip ? [{ filename: `${quoteKey}-files.zip`, content: filesZip, contentType: 'application/zip', contentId: filesZipId }] : []),
    ];

    await sendSmtpMail({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      username: smtpUser,
      password: smtpPassword,
      from: `SKI Website <${smtpUser}>`,
      to: recipient,
      replyTo: submission.email,
      subject: quoteKey,
      text: textBody,
      html: htmlBody,
      attachments,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Quote submission failed:', error);
    return Response.json({ error: 'Your request could not be sent. Please try again.' }, { status: 500 });
  }
}
