export type SkillLevel = "beginner" | "intermediate" | "advanced" | "all";

export type PricingModel = "per-boat" | "per-seat";

export type Trip = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  durationHours: number;
  pricingModel: PricingModel;
  /** Base price — per-boat = total for base group, per-seat = price per person */
  priceUsd: number;
  /** Number of anglers included in base price (per-boat only) */
  baseAnglers?: number;
  /** Price per additional angler beyond base (per-boat only) */
  extraAnglerPriceUsd?: number;
  minAnglers?: number;
  maxAnglers: number;
  skillLevel: SkillLevel;
  species: string[];
  location: string;
  seasonLabel: string;
  seasonMonths: number[];
  includes: string[];
  notIncluded: string[];
  imageUrl: string;
  isFeatured: boolean;
  bookingPath?: string;
  catchAndRelease?: boolean;
  isActive: boolean;
};

export type Guide = {
  id: string;
  name: string;
  title: string;
  bio: string;
  credentials: string[];
  imageUrl: string;
  yearsExperience?: number;
};

export type Review = {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date?: string;
  source: "google" | "fishingbooker" | "facebook" | "direct";
  tripType?: string;
  isFeatured?: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "preparation" | "logistics" | "policy" | "safety";
  order: number;
};

export type Species = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  details: string; // second paragraph — habitat, behavior, why they're prized
  techniques: string[];
  locations: string[];
  seasonLabel: string;
  seasonMonths: number[];
  averageWeight?: string;
  recordWeight?: string;
  imageUrl: string;
  relatedTripSlugs: string[];
};

export type SiteConfig = {
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  bookingUrl: string;
  address?: string;
};
