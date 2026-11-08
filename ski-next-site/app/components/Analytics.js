'use client';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MEASUREMENT_ID, analyticsUrl, trackEvent } from '../lib/analytics';

export default function Analytics() {
  const pathname = usePathname();
  const previousPage = useRef(null);
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    if (!window.__skiAnalyticsInitialized) {
      window.gtag('js', new Date());
      window.__skiAnalyticsInitialized = true;
    }
    const location = analyticsUrl(window.location.href);
    if (previousPage.current !== location) {
      window.gtag('config', MEASUREMENT_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: analyticsUrl(window.location.href),
        page_referrer: analyticsUrl(document.referrer),
        ...(new URLSearchParams(window.location.search).get('ski_tracking_test') === '1' ? { debug_mode: true, test_event: true } : {}),
      });
      trackEvent('page_view', { page_title: document.title, page_referrer: previousPage.current || analyticsUrl(document.referrer) });
      previousPage.current = location;
    }
  }, [pathname]);
  useEffect(() => {
    function contactClick(event) {
      const anchor = event.target.closest?.('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const type = href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : href.startsWith('sms:') ? 'sms' : '';
      if (type) trackEvent(`${type}_click`, { contact_method: type });
    }
    document.addEventListener('click', contactClick);
    return () => document.removeEventListener('click', contactClick);
  }, []);
  return <Script id="ski-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />;
}
