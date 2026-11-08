export const MEASUREMENT_ID = 'G-M5SHYL4C3Q';

// Retain campaign attribution without forwarding arbitrary queries or hashes.
const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid'];
export function analyticsUrl(value) {
  try {
    const url = new URL(value);
    const clean = new URL(url.origin + url.pathname);
    for (const key of ATTRIBUTION_KEYS) {
      if (url.searchParams.has(key)) clean.searchParams.set(key, url.searchParams.get(key));
    }
    return clean.href;
  } catch { return ''; }
}
export function trackEvent(name, parameters = {}) {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', name, { send_to: MEASUREMENT_ID, page_location: analyticsUrl(window.location.href), ...parameters });
  } catch { /* Analytics must never interrupt a quote or contact action. */ }
}
export function trackQuoteSuccess(formData, result) {
  if (result?.ok === true && !formData.get('companyWebsite')) {
    trackEvent('generate_lead', { lead_source: 'website_quote', form_id: 'quote_request' });
  }
}
