"use client";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { buildBookingUrl } from "@/lib/booking";

type Props = {
  placement: AnalyticsEventName;
  tripSlug?: string;
  className?: string;
  children?: React.ReactNode;
};

export function BookNowButton({
  placement,
  tripSlug,
  className,
  children = "Book Now",
}: Props) {
  const href = buildBookingUrl({ tripSlug, placement });

  return (
    <a
      href={href}
      className={className ?? "btn-primary"}
      onClick={() => {
        trackEvent(placement, { tripSlug, href });
        trackEvent("complete_redirect_to_booking", { tripSlug, href, placement });
      }}
    >
      {children}
    </a>
  );
}
