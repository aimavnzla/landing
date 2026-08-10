/**
 * GA4 loader — only initializes when a measurement ID is provided via
 * the `VITE_GA4_ID` env var (e.g. `.env.local`: `VITE_GA4_ID=G-XXXXXXX`).
 * Without it, the page runs analytics-free (no fake IDs shipped).
 */

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

export function initGA4() {
  if (typeof window === 'undefined' || !GA4_ID) return;
  if (window.gtag) return; // already loaded

  const w = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.gtag = function (...args: unknown[]) {
    w.dataLayer!.push(args);
  };

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);

  w.gtag('js', new Date());
  w.gtag('config', GA4_ID);
}
