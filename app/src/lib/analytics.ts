export type AnalyticsEventName =
  | "cta_click_header"
  | "cta_click_hero"
  | "cta_click_trip_card"
  | "cta_click_trip_detail"
  | "cta_click_sticky_mobile"
  | "cta_click_footer"
  | "cta_click_final"
  | "view_trip_detail"
  | "complete_redirect_to_booking"
  | "faq_expand"
  | "contact_form_submit"
  | "email_capture";

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
