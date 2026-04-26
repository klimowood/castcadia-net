import { Review } from "@/types/content";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number; // Unix timestamp
}

interface PlacesDetailsResponse {
  result?: {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
  };
  status: string;
  error_message?: string;
}

function mapGoogleReview(r: GoogleReview, index: number): Review {
  const clamped = Math.min(5, Math.max(1, Math.round(r.rating))) as Review["rating"];
  return {
    id: `google-${r.time}-${index}`,
    author: r.author_name,
    rating: clamped,
    text: r.text,
    date: new Date(r.time * 1000).toISOString().split("T")[0],
    source: "google",
    isFeatured: index < 3,
  };
}

export interface GooglePlacesResult {
  reviews: Review[];
  /** Aggregate rating reported by Google (e.g. 4.9) */
  rating: number | null;
  /** Total review count on Google */
  totalCount: number | null;
}

/**
 * Fetches place reviews from the Google Places API (legacy).
 *
 * Requires env vars:
 *   GOOGLE_PLACES_API_KEY — server-side API key (Places API enabled)
 *   GOOGLE_PLACE_ID       — Place ID for Castcadia Outfitters
 *
 * Returns null when env vars are missing or the request fails, so
 * callers can fall back to local placeholder data gracefully.
 *
 * Response is cached for 24 hours via Next.js fetch cache.
 */
export async function fetchGoogleReviews(): Promise<GooglePlacesResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  const fields = "reviews,rating,user_ratings_total";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&reviews_sort=newest&key=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // 24-hour ISR cache
    });

    if (!res.ok) return null;

    const data: PlacesDetailsResponse = await res.json();

    if (data.status !== "OK" || !data.result?.reviews?.length) return null;

    return {
      reviews: data.result.reviews.map(mapGoogleReview),
      rating: data.result.rating ?? null,
      totalCount: data.result.user_ratings_total ?? null,
    };
  } catch {
    return null;
  }
}
