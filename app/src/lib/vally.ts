type VallyOptions = {
  tripSlug?: string;
  placement: string;
};

const defaultVallyUrl = "https://book.vally.co/castcadia";

export function getVallyBaseUrl() {
  return process.env.NEXT_PUBLIC_VALLY_URL || defaultVallyUrl;
}

export function buildVallyUrl({ tripSlug, placement }: VallyOptions) {
  const url = new URL(getVallyBaseUrl());

  url.searchParams.set("utm_source", "castcadia");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "mvp_launch");
  url.searchParams.set("placement", placement);

  if (tripSlug) {
    url.searchParams.set("trip_slug", tripSlug);
  }

  return url.toString();
}
