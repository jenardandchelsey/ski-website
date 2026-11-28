// Confirmed unsolicited sales submissions. Enforce before processing quote files or email.
const BLOCKED_EMAILS = new Set(['connor@automaxrevenue.com']);
const BLOCKED_DOMAINS = new Set(['automaxrevenue.com']);
const BLOCKED_PHONES = new Set(['4786062782']);

export function isBlockedQuoteContact({ email, phone }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const domain = normalizedEmail.slice(normalizedEmail.lastIndexOf('@') + 1);
  if (BLOCKED_EMAILS.has(normalizedEmail)) return true;
  for (const blockedDomain of BLOCKED_DOMAINS) {
    if (domain === blockedDomain || domain.endsWith(`.${blockedDomain}`)) return true;
  }

  const digits = String(phone || '').replace(/(?:ext\.?|extension|x|#)\s*\d+\s*$/i, '').replace(/\D/g, '');
  const normalizedPhone = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return BLOCKED_PHONES.has(normalizedPhone);
}
