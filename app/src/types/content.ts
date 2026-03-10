export type SkillLevel = "beginner" | "intermediate" | "advanced" | "all";

export type Species = {
  id: string;
  name: string;
  seasonMonths: number[];
  notes?: string;
};

export type Location = {
  id: string;
  name: string;
  region: string;
  description?: string;
};

export type Trip = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  durationHours: number;
  priceFromUsd: number;
  maxAnglers: number;
  skillLevel: SkillLevel;
  locationIds: string[];
  speciesIds: string[];
  includes: string[];
  excludes?: string[];
  imageUrl: string;
  isFeatured?: boolean;
  vallyBookingPath?: string;
  isActive: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  tripId?: string;
  source?: "google" | "facebook" | "direct" | "other";
  isFeatured?: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "preparation" | "logistics" | "policy" | "safety";
  order: number;
};
