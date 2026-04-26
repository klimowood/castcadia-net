import { getAdminClient } from "@/lib/supabase";

async function getStats() {
  const supabase = getAdminClient();

  const [trips, reviews, faqs, guides] = await Promise.all([
    supabase.from("trips").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
    supabase.from("faqs").select("id", { count: "exact", head: true }),
    supabase.from("guides").select("id", { count: "exact", head: true }),
  ]);

  return {
    trips: trips.count ?? 0,
    reviews: reviews.count ?? 0,
    faqs: faqs.count ?? 0,
    guides: guides.count ?? 0,
  };
}

export default async function AdminDashboard() {
  let stats = { trips: 0, reviews: 0, faqs: 0, guides: 0 };
  try {
    stats = await getStats();
  } catch {
    // tables may not exist yet
  }

  const cards = [
    { label: "Trips", count: stats.trips, href: "/admin/trips", icon: "🎣", color: "#C06B2D" },
    { label: "Reviews", count: stats.reviews, href: "/admin/reviews", icon: "⭐", color: "#d4a028" },
    { label: "FAQs", count: stats.faqs, href: "/admin/faqs", icon: "❓", color: "#2A7B6F" },
    { label: "Guide", count: stats.guides, href: "/admin/guide", icon: "🧑‍✈️", color: "#4a6741" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#2d2a26", fontFamily: "var(--font-heading, Georgia, serif)" }}>
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#7a7268" }}>
          Manage your Castcadia Outfitters content
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            style={{ border: "1px solid #e5ddd5" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{card.icon}</span>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                style={{ backgroundColor: card.color }}
              >
                {card.count}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold" style={{ color: "#2d2a26" }}>
              {card.label}
            </p>
            <p className="text-xs" style={{ color: "#a09889" }}>
              Click to manage →
            </p>
          </a>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
        <h2 className="mb-3 text-lg font-bold" style={{ color: "#2d2a26" }}>Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/trips" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "#C06B2D" }}>
            + New Trip
          </a>
          <a href="/admin/reviews" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "#2A7B6F" }}>
            + Add Review
          </a>
          <a href="/admin/faqs" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: "#4a6741" }}>
            + New FAQ
          </a>
          <a href="/" target="_blank" className="rounded-lg border px-4 py-2 text-sm font-medium" style={{ borderColor: "#e5ddd5", color: "#7a7268" }}>
            ↗ View Live Site
          </a>
        </div>
      </div>
    </div>
  );
}
