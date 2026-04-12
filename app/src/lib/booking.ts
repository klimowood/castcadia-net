import { siteConfig } from "@/content/config";

type BookingOptions = {
  tripSlug?: string;
  placement: string;
};

/**
 * Build the booking URL with tracking params.
 * Provider-agnostic: when you swap Vally for a custom system,
 * only update `siteConfig.bookingUrl` and this function.
 */
export function buildBookingUrl({ tripSlug, placement }: BookingOptions) {
  const base = process.env.NEXT_PUBLIC_BOOKING_URL || siteConfig.bookingUrl;

  let url: URL;
  try {
    url = new URL(base);
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[booking] Invalid booking URL "${base}", falling back to config.`);
    }
    url = new URL(siteConfig.bookingUrl);
  }

  url.searchParams.set("utm_source", "castcadia");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "revamp_2026");
  url.searchParams.set("placement", placement);

  if (tripSlug) {
    url.searchParams.set("trip", tripSlug);
  }

  return url.toString();
}
