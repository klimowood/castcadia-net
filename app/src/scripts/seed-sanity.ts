/**
 * Seed script — populates Sanity with initial content from our static files.
 * Run with: npx tsx src/scripts/seed-sanity.ts
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hflxk54s",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log("🌱 Seeding Sanity...\n");

  // ── Trips ────────────────────────────────────
  const trips = [
    {
      _id: "trip-bass-half-day",
      _type: "trip",
      title: "Half-Day Bass & Pike Trip",
      slug: { _type: "slug", current: "bass-half-day" },
      subtitle: "Lake Coeur d'Alene, Idaho",
      description: "High-efficiency morning session built for consistent action on trophy smallmouth and largemouth bass, plus massive pike. Operating from a tournament-rigged Lund Pro-V Bass boat, we strategically target the best structure and cover Lake CDA has to offer.",
      durationHours: 4,
      pricingModel: "per-boat",
      priceUsd: 695,
      baseAnglers: 2,
      extraAnglerPriceUsd: 150,
      maxAnglers: 3,
      species: ["Smallmouth Bass", "Largemouth Bass", "Northern Pike"],
      location: "Lake Coeur d'Alene, Idaho",
      seasonLabel: "April – November",
      catchAndRelease: true,
      isFeatured: true,
      isActive: true,
      bookingPath: "bass-half-day",
      order: 1,
    },
    {
      _id: "trip-bass-full-day",
      _type: "trip",
      title: "Full-Day Bass & Pike Trip",
      slug: { _type: "slug", current: "bass-full-day" },
      subtitle: "Lake Coeur d'Alene, Idaho",
      description: "Full-water-time session for anglers targeting size and peak bite windows. Consistently earning a spot in Bassmaster's top ten best bass fishing lakes, Lake CDA hosts world-class technical bass and pike fishing. Our commitment lies in preserving the true trophy-class fish that inhabit Lake CDA.",
      durationHours: 8,
      pricingModel: "per-boat",
      priceUsd: 995,
      baseAnglers: 2,
      extraAnglerPriceUsd: 225,
      maxAnglers: 3,
      species: ["Smallmouth Bass", "Largemouth Bass", "Northern Pike"],
      location: "Lake Coeur d'Alene, Idaho",
      seasonLabel: "April – November",
      catchAndRelease: true,
      isFeatured: true,
      isActive: true,
      bookingPath: "bass-full-day",
      order: 2,
    },
    {
      _id: "trip-steelhead",
      _type: "trip",
      title: "Steelhead Fishing Trip",
      slug: { _type: "slug", current: "steelhead" },
      subtitle: "Clearwater & Snake Rivers, Idaho",
      description: "The Clearwater River is renowned for its legendary B-Run Steelhead, which typically weigh between 12 to 15 pounds — with some lucky anglers landing fish exceeding 20 pounds and measuring over 40 inches. We use various techniques including back trolling with plugs and divers, as well as side drifting with beads or eggs.",
      durationHours: 8,
      pricingModel: "per-seat",
      priceUsd: 285,
      minAnglers: 3,
      maxAnglers: 18,
      species: ["Steelhead"],
      location: "Clearwater & Snake Rivers, Idaho",
      seasonLabel: "October – March",
      catchAndRelease: false,
      isFeatured: true,
      isActive: true,
      bookingPath: "steelhead",
      order: 3,
    },
    {
      _id: "trip-salmon",
      _type: "trip",
      title: "Salmon Fishing Trip",
      slug: { _type: "slug", current: "salmon" },
      subtitle: "Columbia River, WA / Clearwater & Snake Rivers, ID",
      description: "Chase Chinook and Sockeye salmon on some of the Pacific Northwest's most productive waters. Whether you're on the mighty Columbia River in Washington or the Clearwater and Snake rivers in Idaho, these full-day trips put you in the heart of the salmon run with expert guidance and proven techniques.",
      durationHours: 8,
      pricingModel: "per-seat",
      priceUsd: 285,
      minAnglers: 3,
      maxAnglers: 18,
      species: ["Chinook Salmon", "Sockeye Salmon"],
      location: "Columbia River, WA / Clearwater & Snake Rivers, ID",
      seasonLabel: "May – October",
      catchAndRelease: false,
      isFeatured: true,
      isActive: true,
      bookingPath: "salmon",
      order: 4,
    },
  ];

  // ── Guide ────────────────────────────────────
  const guide = {
    _id: "guide-jesse",
    _type: "guide",
    name: "Capt. Jesse Kroetch",
    title: "Owner / Lead Guide",
    bio: "An experienced fishing guide with an unwavering love for angling and the great outdoors. Having spent a lifetime navigating the fishing grounds across the Pacific Northwest, Jesse skillfully pursues a diverse array of species throughout the year — ranging from salmon and steelhead to pike and bass. His true passion lies in the intricacies of technical bass fishing on Lake Coeur d'Alene. With a friendly demeanor and an earnest desire to share knowledge, Jesse is the go-to guide for anyone seeking an unforgettable fishing experience in the Pacific Northwest.",
    credentials: [
      "Licensed & insured guide",
      "North Idaho native",
      "Conservation-driven angling practices",
      "Technical bass fishing specialist",
      "Multi-species expert across PNW waters",
    ],
  };

  // ── Reviews ──────────────────────────────────
  const reviews = [
    { _id: "review-1", _type: "review", author: "Mark D.", rating: 5, text: "Best guided trip we've done in Idaho — organized, fun, and productive from start to finish. Jesse's knowledge of the lake is incredible.", date: "2025-09-15", source: "google", tripType: "Bass & Pike", isFeatured: true },
    { _id: "review-2", _type: "review", author: "Sarah K.", rating: 5, text: "We brought two beginners and everyone caught fish. Couldn't have asked for a better guide. Patient, knowledgeable, and made it so fun for the whole family.", date: "2025-08-22", source: "fishingbooker", tripType: "Bass & Pike", isFeatured: true },
    { _id: "review-3", _type: "review", author: "Chris T.", rating: 5, text: "Professional operation, clear communication, and a truly premium experience. The bass fishing on Lake CDA is world-class and Jesse knows exactly where to go.", date: "2025-07-10", source: "google", tripType: "Bass & Pike", isFeatured: true },
    { _id: "review-4", _type: "review", author: "Tom W.", rating: 5, text: "Landed my personal best steelhead — a 17-pounder on the Clearwater. Jesse put us on fish all day. Already booked again for next season.", date: "2026-01-08", source: "google", tripType: "Steelhead", isFeatured: true },
    { _id: "review-5", _type: "review", author: "Lisa & Doug P.", rating: 5, text: "Family-friendly, incredibly knowledgeable, and we caught more fish than we expected. The kids haven't stopped talking about it. Truly unforgettable.", date: "2025-06-30", source: "fishingbooker", tripType: "Bass & Pike", isFeatured: true },
    { _id: "review-6", _type: "review", author: "Ryan M.", rating: 5, text: "The salmon trip on the Columbia was outstanding. Well-equipped boat, great conversation, and we limited out by noon. Highly recommend Castcadia.", date: "2025-08-05", source: "google", tripType: "Salmon", isFeatured: false },
    { _id: "review-7", _type: "review", author: "Jennifer L.", rating: 5, text: "Booked for my husband's birthday and it exceeded every expectation. Jesse went above and beyond to make it special. This isn't just fishing — it's an experience.", date: "2025-10-12", source: "google", tripType: "Bass & Pike", isFeatured: false },
    { _id: "review-8", _type: "review", author: "Jake H.", rating: 5, text: "Third year in a row booking with Castcadia. They're consistent, professional, and the fishing just keeps getting better. Best guide service in North Idaho.", date: "2026-02-20", source: "fishingbooker", tripType: "Steelhead", isFeatured: false },
  ];

  // ── FAQs ─────────────────────────────────────
  const faqs = [
    { _id: "faq-1", _type: "faq", question: "Is this good for beginners?", answer: "Absolutely. We coach all skill levels and provide practical instruction from launch to final cast. Whether you've never held a rod or you're a seasoned angler, we tailor the experience to your goals.", category: "preparation", order: 1 },
    { _id: "faq-2", _type: "faq", question: "What should I bring?", answer: "We provide all fishing gear, tackle, bait, beverages, and life jackets. You'll need to bring a valid state fishing license with required catch cards, weather-appropriate clothing, sunscreen, and any personal snacks.", category: "preparation", order: 2 },
    { _id: "faq-3", _type: "faq", question: "How do I book a trip?", answer: "Click any 'Book Now' button on our site to reserve through our secure booking system. Choose your trip type, pick your date, and confirm — it takes about two minutes. You can also call us at (208) 699-5636 or email info@castcadia.net.", category: "booking", order: 3 },
    { _id: "faq-4", _type: "faq", question: "What if weather changes?", answer: "Safety comes first. We communicate proactively and will reschedule when conditions compromise safety or trip quality. If we cancel due to weather or unsafe conditions, you'll receive a full refund or the option to reschedule.", category: "safety", order: 4 },
    { _id: "faq-5", _type: "faq", question: "Is a fishing license included?", answer: "Fishing licenses are not included in the trip price. You'll need a valid state fishing license and any required catch cards for the state you're fishing in (Idaho or Washington).", category: "policy", order: 5 },
    { _id: "faq-6", _type: "faq", question: "What's the cancellation policy?", answer: "Cancellations made at least 7 days before your trip receive a full refund. Cancellations within 7 days are non-refundable. No-shows are not eligible for a refund. If Castcadia cancels due to weather or safety, you'll receive a full refund or the option to reschedule.", category: "policy", order: 6 },
    { _id: "faq-7", _type: "faq", question: "How many people can come on a trip?", answer: "Bass and pike trips on Lake CdA accommodate up to 3 anglers on our tournament-rigged bass boat. Steelhead and salmon trips can accommodate up to 18 guests with a minimum of 3.", category: "logistics", order: 7 },
    { _id: "faq-8", _type: "faq", question: "What species can we target?", answer: "We target smallmouth and largemouth bass, northern pike, steelhead, Chinook salmon, and sockeye salmon. The species depend on the trip type and season.", category: "preparation", order: 8 },
    { _id: "faq-9", _type: "faq", question: "Is the bass trip catch and release only?", answer: "Yes. Our bass and pike trips on Lake Coeur d'Alene are strictly catch and release. We're committed to preserving the trophy-class fish that make this lake one of Bassmaster's top-rated waters.", category: "policy", order: 9 },
    { _id: "faq-10", _type: "faq", question: "Are kids welcome?", answer: "Absolutely! We love introducing kids to fishing. Our guides are patient, friendly, and experienced with young anglers. Please let us know ages when booking so we can prepare the right gear.", category: "preparation", order: 10 },
  ];

  // ── Site Settings ────────────────────────────
  const settings = {
    _id: "siteSettings",
    _type: "siteSettings",
    phone: "(208) 699-5636",
    email: "info@castcadia.net",
    instagram: "https://www.instagram.com/castcadia_guide/",
    facebook: "https://www.facebook.com/profile.php?id=100091227791429",
    bookingUrl: "https://book.vallypro.com/p/castcadia-outfitters",
    tagline: "North Idaho-born. Conservation-driven. Adventure-focused.",
  };

  // ── Write all documents ──────────────────────
  const allDocs = [...trips, guide, ...reviews, ...faqs, settings];

  const transaction = client.transaction();
  for (const doc of allDocs) {
    transaction.createOrReplace(doc);
  }

  const result = await transaction.commit();
  console.log(`✅ Seeded ${allDocs.length} documents`);
  console.log(`   - ${trips.length} trips`);
  console.log(`   - 1 guide`);
  console.log(`   - ${reviews.length} reviews`);
  console.log(`   - ${faqs.length} FAQs`);
  console.log(`   - 1 site settings`);
  console.log(`\nTransaction ID: ${result.transactionId}`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
