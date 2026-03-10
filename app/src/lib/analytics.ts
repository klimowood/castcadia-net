export type AnalyticsEventName =
  | "cta_click_valy_header"
  | "cta_click_valy_hero"
  | "cta_click_valy_trip_card"
  | "cta_click_valy_trip_detail"
  | "cta_click_valy_sticky_mobile"
  | "view_trip_detail"
  | "start_prebook_bridge"
  | "complete_redirect_to_valy"
  | "faq_expand";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") return;

  const dataLayer = (window as typeof window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: name, ...payload });
  }

  if ((window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", name, payload);
  }
}
