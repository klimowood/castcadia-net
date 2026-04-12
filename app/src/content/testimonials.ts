import { Review } from "@/types/content";

/**
 * Placeholder reviews based on real FishingBooker feedback themes.
 * These will be replaced by live Google Places API data when the API key is configured.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    author: "Mark D.",
    rating: 5,
    text: "Best guided trip we've done in Idaho — organized, fun, and productive from start to finish. Jesse's knowledge of the lake is incredible.",
    date: "2025-09-15",
    source: "google",
    tripType: "Bass & Pike",
    isFeatured: true,
  },
  {
    id: "r2",
    author: "Sarah K.",
    rating: 5,
    text: "We brought two beginners and everyone caught fish. Couldn't have asked for a better guide. Patient, knowledgeable, and made it so fun for the whole family.",
    date: "2025-08-22",
    source: "fishingbooker",
    tripType: "Bass & Pike",
    isFeatured: true,
  },
  {
    id: "r3",
    author: "Chris T.",
    rating: 5,
    text: "Professional operation, clear communication, and a truly premium experience. The bass fishing on Lake CDA is world-class and Jesse knows exactly where to go.",
    date: "2025-07-10",
    source: "google",
    tripType: "Bass & Pike",
    isFeatured: true,
  },
  {
    id: "r4",
    author: "Tom W.",
    rating: 5,
    text: "Landed my personal best steelhead — a 17-pounder on the Clearwater. Jesse put us on fish all day. Already booked again for next season.",
    date: "2026-01-08",
    source: "google",
    tripType: "Steelhead",
    isFeatured: true,
  },
  {
    id: "r5",
    author: "Lisa & Doug P.",
    rating: 5,
    text: "Family-friendly, incredibly knowledgeable, and we caught more fish than we expected. The kids haven't stopped talking about it. Truly unforgettable.",
    date: "2025-06-30",
    source: "fishingbooker",
    tripType: "Bass & Pike",
    isFeatured: true,
  },
  {
    id: "r6",
    author: "Ryan M.",
    rating: 5,
    text: "The salmon trip on the Columbia was outstanding. Well-equipped boat, great conversation, and we limited out by noon. Highly recommend Castcadia.",
    date: "2025-08-05",
    source: "google",
    tripType: "Salmon",
    isFeatured: false,
  },
  {
    id: "r7",
    author: "Jennifer L.",
    rating: 5,
    text: "Booked for my husband's birthday and it exceeded every expectation. Jesse went above and beyond to make it special. This isn't just fishing — it's an experience.",
    date: "2025-10-12",
    source: "google",
    tripType: "Bass & Pike",
    isFeatured: false,
  },
  {
    id: "r8",
    author: "Jake H.",
    rating: 5,
    text: "Third year in a row booking with Castcadia. They're consistent, professional, and the fishing just keeps getting better. Best guide service in North Idaho.",
    date: "2026-02-20",
    source: "fishingbooker",
    tripType: "Steelhead",
    isFeatured: false,
  },
];

export const featuredReviews = reviews.filter((r) => r.isFeatured);
