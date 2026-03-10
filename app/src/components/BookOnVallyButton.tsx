"use client";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { buildVallyUrl } from "@/lib/vally";

type Props = {
  placement: AnalyticsEventName;
  tripSlug?: string;
  className?: string;
  children?: string;
};

export function BookOnVallyButton({
  placement,
  tripSlug,
  className,
  children = "Book on vally",
}: Props) {
  const href = buildVallyUrl({ tripSlug, placement });

  return (
    <a
      href={href}
      className={className ?? "btn-primary"}
      onClick={() => {
        trackEvent(placement, { tripSlug, href });
        trackEvent("complete_redirect_to_valy", { tripSlug, href, placement });
      }}
    >
      {children}
    </a>
  );
}
