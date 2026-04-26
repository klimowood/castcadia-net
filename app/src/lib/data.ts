import { supabase } from "./supabase";
import type { Trip, Review, FAQ, Guide, SiteConfig } from "@/types/content";

// ── Trips ──────────────────────────────────────

export async function getTrips(): Promise<Trip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error || !data) return [];

  return data.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    subtitle: t.subtitle || "",
    description: t.description,
    durationHours: t.duration_hours,
    pricingModel: t.pricing_model as "per-boat" | "per-seat",
    priceUsd: t.price_usd,
    baseAnglers: t.base_anglers ?? undefined,
    extraAnglerPriceUsd: t.extra_angler_price_usd ?? undefined,
    minAnglers: t.min_anglers ?? undefined,
    maxAnglers: t.max_anglers,
    skillLevel: "all" as const,
    species: t.species || [],
    location: t.location,
    seasonLabel: t.season_label || "",
    seasonMonths: t.season_months || [],
    includes: t.includes || [],
    notIncluded: t.not_included || [],
    imageUrl: t.image_url || "",
    isFeatured: t.is_featured,
    bookingPath: t.booking_path ?? undefined,
    catchAndRelease: t.catch_and_release ?? false,
    isActive: t.is_active,
  }));
}

export async function getFeaturedTrips(): Promise<Trip[]> {
  const trips = await getTrips();
  return trips.filter((t) => t.isFeatured);
}

// ── Reviews ────────────────────────────────────

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("date", { ascending: false });

  if (error || !data) return [];

  return data.map((r) => ({
    id: r.id,
    author: r.author,
    rating: r.rating as 1 | 2 | 3 | 4 | 5,
    text: r.text,
    date: r.date ?? undefined,
    source: r.source as "google" | "fishingbooker" | "facebook" | "direct",
    tripType: r.trip_type ?? undefined,
    isFeatured: r.is_featured ?? false,
  }));
}

export async function getFeaturedReviews(): Promise<Review[]> {
  const reviews = await getReviews();
  return reviews.filter((r) => r.isFeatured);
}

// ── FAQs ───────────────────────────────────────

export async function getFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) return [];

  return data.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category as "booking" | "preparation" | "logistics" | "policy" | "safety",
    order: f.display_order,
  }));
}

// ── Guides ─────────────────────────────────────

function mapGuide(data: Record<string, unknown>): Guide {
  return {
    id: data.id as string,
    name: data.name as string,
    title: (data.title as string) || "",
    bio: (data.bio as string) || "",
    credentials: (data.credentials as string[]) || [],
    imageUrl: (data.image_url as string) || "",
    yearsExperience: (data.years_experience as number) ?? undefined,
  };
}

export async function getGuides(): Promise<Guide[]> {
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .order("is_primary", { ascending: false });

  if (error || !data) return [];
  return data.map(mapGuide);
}

export async function getPrimaryGuide(): Promise<Guide | null> {
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("is_primary", true)
    .limit(1)
    .single();

  if (error || !data) return null;
  return mapGuide(data);
}

// ── Site Settings ──────────────────────────────

export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    // Fallback defaults
    return {
      phone: "(208) 699-5636",
      email: "info@castcadia.net",
      instagram: "https://www.instagram.com/castcadia_guide/",
      facebook: "https://www.facebook.com/profile.php?id=100091227791429",
      bookingUrl: "https://book.vallypro.com/p/castcadia-outfitters",
    };
  }

  return {
    phone: data.phone || "",
    email: data.email || "",
    instagram: data.instagram || "",
    facebook: data.facebook || "",
    bookingUrl: data.booking_url || "",
    address: data.address ?? undefined,
  };
}
