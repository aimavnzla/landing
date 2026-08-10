type EventName =
  | 'demo_click'
  | 'roi_calc_start'
  | 'roi_calc_complete'
  | 'segment_selected'
  | 'demo_tab_changed'
  | 'whatsapp_click'
  | 'funnel_step_view'
  | 'objection_expanded'
  | 'cta_click'
  | 'scroll_depth_50'
  | 'scroll_depth_75'
  | 'scroll_depth_100';

interface EventParams {
  segment?: string;
  source?: string;
  value?: string | number;
  [key: string]: unknown;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: EventName, params: EventParams = {}) {
  // Console log for debugging
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    console.log(`[Analytics] ${eventName}`, params);
  }

  // GA4 via gtag
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // DataLayer fallback
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

export function trackSegmentSelected(segment: string, source: 'hero' | 'diagnostic' | 'funnel' | 'comparison' | 'comparison_cta' | 'cta' = 'hero') {
  trackEvent('segment_selected', { segment, source });
}

export function trackDemoTabChanged(segment: string, tabIndex: number) {
  trackEvent('demo_tab_changed', { segment, tabIndex });
}

export function trackWhatsAppClick(segment: string, source: 'hero' | 'funnel' | 'comparison' | 'final_cta' | 'footer' = 'hero') {
  trackEvent('whatsapp_click', { segment, source });
}

export function trackFunnelStepView(stepId: string) {
  trackEvent('funnel_step_view', { stepId });
}

export function trackObjectionExpanded(objectionId: string) {
  trackEvent('objection_expanded', { objectionId });
}

export function trackCTAClick(ctaId: string, segment: string, location: string) {
  trackEvent('cta_click', { ctaId, segment, location });
}

export function trackScrollDepth(depth: 50 | 75 | 100) {
  trackEvent(`scroll_depth_${depth}` as EventName, { depth });
}