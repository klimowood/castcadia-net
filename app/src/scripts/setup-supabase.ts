/**
 * Setup script — creates Supabase tables and seeds with initial content.
 * Run with: SUPABASE_SERVICE_ROLE_KEY=... npx tsx src/scripts/setup-supabase.ts
 */

const SUPABASE_URL = "https://qmrbhkbtwyrekdclkhfu.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function setup() {
  console.log("🔧 Setting up Supabase tables...\n");

  // We'll use the Supabase client to insert data, but for DDL we need
  // to use the pg meta endpoint or ask the user to run SQL manually.
  // Let's try the pg endpoint first.

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // ── Seed Trips ───────────────────────────────
  console.log("📦 Seeding trips...");
  const trips = [
    {
      slug: "bass-half-day",
      title: "Half-Day Bass & Pike Trip",
      subtitle: "Lake Coeur d'Alene, Idaho",
      description: "High-efficiency morning session built for consistent action on trophy smallmouth and largemouth bass, plus massive pike. Operating from a tournament-rigged Lund Pro-V Bass boat, we strategically target the best structure and cover Lake CDA has to offer.",
      duration_hours: 4,
      pricing_model: "per-boat",
      price_usd: 695,
      base_anglers: 2,
      extra_angler_price_usd: 150,
      max_anglers: 3,
      species: ["Smallmouth Bass", "Largemouth Bass", "Northern Pike"],
      location: "Lake Coeur d'Alene, Idaho",
      season_label: "April – November",
      season_months: [4, 5, 6, 7, 8, 9, 10, 11],
      includes: ["All fishing gear & tackle", "Lund Pro-V bass boat", "Beverages & snacks", "Fish cleaning (if applicable)", "Expert instruction & coaching"],
      not_included: ["Fishing license", "Gratuity"],
      catch_and_release: true,
      is_featured: true,
      is_active: true,
      booking_path: "bass-half-day",
      display_order: 1,
    },
    {
      slug: "bass-full-day",
      title: "Full-Day Bass & Pike Trip",
      subtitle: "Lake Coeur d'Alene, Idaho",
      description: "Full-water-time session for anglers targeting size and peak bite windows. Consistently earning a spot in Bassmaster's top ten best bass fishing lakes, Lake CDA hosts world-class technical bass and pike fishing. Our commitment lies in preserving the true trophy-class fish that inhabit Lake CDA.",
      duration_hours: 8,
      pricing_model: "per-boat",
      price_usd: 995,
      base_anglers: 2,
      extra_angler_price_usd: 225,
      max_anglers: 3,
      species: ["Smallmouth Bass", "Largemouth Bass", "Northern Pike"],
      location: "Lake Coeur d'Alene, Idaho",
      season_label: "April – November",
      season_months: [4, 5, 6, 7, 8, 9, 10, 11],
      includes: ["All fishing gear & tackle", "Lund Pro-V bass boat", "Beverages & snacks", "Lunch", "Fish cleaning (if applicable)", "Expert instruction & coaching"],
      not_included: ["Fishing license", "Gratuity"],
      catch_and_release: true,
      is_featured: true,
      is_active: true,
      booking_path: "bass-full-day",
      display_order: 2,
    },
    {
      slug: "steelhead",
      title: "Steelhead Fishing Trip",
      subtitle: "Clearwater & Snake Rivers, Idaho",
      description: "The Clearwater River is renowned for its legendary B-Run Steelhead, which typically weigh between 12 to 15 pounds — with some lucky anglers landing fish exceeding 20 pounds and measuring over 40 inches. We use various techniques including back trolling with plugs and divers, as well as side drifting with beads or eggs.",
      duration_hours: 8,
      pricing_model: "per-seat",
      price_usd: 285,
      min_anglers: 3,
      max_anglers: 18,
      species: ["Steelhead"],
      location: "Clearwater & Snake Rivers, Idaho",
      season_label: "October – March",
      season_months: [10, 11, 12, 1, 2, 3],
      includes: ["All fishing gear & tackle", "Jet boat", "Beverages", "Expert guidance"],
      not_included: ["Fishing license", "Catch cards", "Gratuity"],
      catch_and_release: false,
      is_featured: true,
      is_active: true,
      booking_path: "steelhead",
      display_order: 3,
    },
    {
      slug: "salmon",
      title: "Salmon Fishing Trip",
      subtitle: "Columbia River, WA / Clearwater & Snake Rivers, ID",
      description: "Chase Chinook and Sockeye salmon on some of the Pacific Northwest's most productive waters. Whether you're on the mighty Columbia River in Washington or the Clearwater and Snake rivers in Idaho, these full-day trips put you in the heart of the salmon run with expert guidance and proven techniques.",
      duration_hours: 8,
      pricing_model: "per-seat",
      price_usd: 285,
      min_anglers: 3,
      max_anglers: 18,
      species: ["Chinook Salmon", "Sockeye Salmon"],
      location: "Columbia River, WA / Clearwater & Snake Rivers, ID",
      season_label: "May – October",
      season_months: [5, 6, 7, 8, 9, 10],
      includes: ["All fishing gear & tackle", "Jet boat", "Beverages", "Fish cleaning", "Expert guidance"],
      not_included: ["Fishing license", "Catch cards", "Gratuity"],
      catch_and_release: false,
      is_featured: true,
      is_active: true,
      booking_path: "salmon",
      display_order: 4,
    },
  ];

  const { error: tripsErr } = await supabase.from("trips").upsert(trips, { onConflict: "slug" });
  if (tripsErr) {
    console.error("  ❌ Trips error:", tripsErr.message);
    if (tripsErr.message.includes("relation") && tripsErr.message.includes("does not exist")) {
      console.error("\n⚠️  Tables don't exist yet. Please run the SQL migration first.");
      console.error("   Copy the contents of src/scripts/migration.sql and paste it into your");
      console.error("   Supabase SQL Editor at:");
      console.error("   https://supabase.com/dashboard/project/qmrbhkbtwyrekdclkhfu/sql/new\n");
      process.exit(1);
    }
  } else {
    console.log(`  ✅ ${trips.length} trips`);
  }

  // ── Seed Guide ───────────────────────────────
  console.log("📦 Seeding guide...");
  const { error: guideErr } = await supabase.from("guides").insert([{
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
    is_primary: true,
  }]);
  if (guideErr) console.error("  ❌ Guide error:", guideErr.message);
  else console.log("  ✅ 1 guide");

  // ── Seed Reviews ─────────────────────────────
  console.log("📦 Seeding reviews...");
  const reviews = [
    { author: "Mark D.", rating: 5, text: "Best guided trip we've done in Idaho — organized, fun, and productive from start to finish. Jesse's knowledge of the lake is incredible.", date: "2025-09-15", source: "google", trip_type: "Bass & Pike", is_featured: true },
    { author: "Sarah K.", rating: 5, text: "We brought two beginners and everyone caught fish. Couldn't have asked for a better guide. Patient, knowledgeable, and made it so fun for the whole family.", date: "2025-08-22", source: "fishingbooker", trip_type: "Bass & Pike", is_featured: true },
    { author: "Chris T.", rating: 5, text: "Professional operation, clear communication, and a truly premium experience. The bass fishing on Lake CDA is world-class and Jesse knows exactly where to go.", date: "2025-07-10", source: "google", trip_type: "Bass & Pike", is_featured: true },
    { author: "Tom W.", rating: 5, text: "Landed my personal best steelhead — a 17-pounder on the Clearwater. Jesse put us on fish all day. Already booked again for next season.", date: "2026-01-08", source: "google", trip_type: "Steelhead", is_featured: true },
    { author: "Lisa & Doug P.", rating: 5, text: "Family-friendly, incredibly knowledgeable, and we caught more fish than we expected. The kids haven't stopped talking about it. Truly unforgettable.", date: "2025-06-30", source: "fishingbooker", trip_type: "Bass & Pike", is_featured: true },
    { author: "Ryan M.", rating: 5, text: "The salmon trip on the Columbia was outstanding. Well-equipped boat, great conversation, and we limited out by noon. Highly recommend Castcadia.", date: "2025-08-05", source: "google", trip_type: "Salmon", is_featured: false },
    { author: "Jennifer L.", rating: 5, text: "Booked for my husband's birthday and it exceeded every expectation. Jesse went above and beyond to make it special. This isn't just fishing — it's an experience.", date: "2025-10-12", source: "google", trip_type: "Bass & Pike", is_featured: false },
    { author: "Jake H.", rating: 5, text: "Third year in a row booking with Castcadia. They're consistent, professional, and the fishing just keeps getting better. Best guide service in North Idaho.", date: "2026-02-20", source: "fishingbooker", trip_type: "Steelhead", is_featured: false },
  ];
  const { error: reviewsErr } = await supabase.from("reviews").insert(reviews);
  if (reviewsErr) console.error("  ❌ Reviews error:", reviewsErr.message);
  else console.log(`  ✅ ${reviews.length} reviews`);

  // ── Seed FAQs ────────────────────────────────
  console.log("📦 Seeding FAQs...");
  const faqs = [
    { question: "Is this good for beginners?", answer: "Absolutely. We coach all skill levels and provide practical instruction from launch to final cast. Whether you've never held a rod or you're a seasoned angler, we tailor the experience to your goals.", category: "preparation", display_order: 1 },
    { question: "What should I bring?", answer: "We provide all fishing gear, tackle, bait, beverages, and life jackets. You'll need to bring a valid state fishing license with required catch cards, weather-appropriate clothing, sunscreen, and any personal snacks.", category: "preparation", display_order: 2 },
    { question: "How do I book a trip?", answer: "Click any 'Book Now' button on our site to reserve through our secure booking system. Choose your trip type, pick your date, and confirm — it takes about two minutes. You can also call us at (208) 699-5636 or email info@castcadia.net.", category: "booking", display_order: 3 },
    { question: "What if weather changes?", answer: "Safety comes first. We communicate proactively and will reschedule when conditions compromise safety or trip quality. If we cancel due to weather or unsafe conditions, you'll receive a full refund or the option to reschedule.", category: "safety", display_order: 4 },
    { question: "Is a fishing license included?", answer: "Fishing licenses are not included in the trip price. You'll need a valid state fishing license and any required catch cards for the state you're fishing in (Idaho or Washington).", category: "policy", display_order: 5 },
    { question: "What's the cancellation policy?", answer: "Cancellations made at least 7 days before your trip receive a full refund. Cancellations within 7 days are non-refundable. No-shows are not eligible for a refund. If Castcadia cancels due to weather or safety, you'll receive a full refund or the option to reschedule.", category: "policy", display_order: 6 },
    { question: "How many people can come on a trip?", answer: "Bass and pike trips on Lake CdA accommodate up to 3 anglers on our tournament-rigged bass boat. Steelhead and salmon trips can accommodate up to 18 guests with a minimum of 3.", category: "logistics", display_order: 7 },
    { question: "What species can we target?", answer: "We target smallmouth and largemouth bass, northern pike, steelhead, Chinook salmon, and sockeye salmon. The species depend on the trip type and season.", category: "preparation", display_order: 8 },
    { question: "Is the bass trip catch and release only?", answer: "Yes. Our bass and pike trips on Lake Coeur d'Alene are strictly catch and release. We're committed to preserving the trophy-class fish that make this lake one of Bassmaster's top-rated waters.", category: "policy", display_order: 9 },
    { question: "Are kids welcome?", answer: "Absolutely! We love introducing kids to fishing. Our guides are patient, friendly, and experienced with young anglers. Please let us know ages when booking so we can prepare the right gear.", category: "preparation", display_order: 10 },
  ];
  const { error: faqsErr } = await supabase.from("faqs").insert(faqs);
  if (faqsErr) console.error("  ❌ FAQs error:", faqsErr.message);
  else console.log(`  ✅ ${faqs.length} FAQs`);

  // ── Seed Site Settings ───────────────────────
  console.log("📦 Seeding site settings...");
  const { error: settingsErr } = await supabase.from("site_settings").upsert([{
    phone: "(208) 699-5636",
    email: "info@castcadia.net",
    instagram: "https://www.instagram.com/castcadia_guide/",
    facebook: "https://www.facebook.com/profile.php?id=100091227791429",
    booking_url: "https://book.vallypro.com/p/castcadia-outfitters",
    tagline: "North Idaho-born. Conservation-driven. Adventure-focused.",
  }]);
  if (settingsErr) console.error("  ❌ Settings error:", settingsErr.message);
  else console.log("  ✅ 1 site settings");

  console.log("\n🎉 Seed complete!");
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
