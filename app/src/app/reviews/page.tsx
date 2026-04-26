import type { Metadata } from "next";
import { BookNowButton } from "@/components/BookNowButton";
import { ExpandableReviews } from "@/components/ExpandableReviews";
import { getReviews } from "@/lib/data";
import { fetchGoogleReviews } from "@/lib/google-places";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read real guest reviews from guided fishing charters with Castcadia Outfitters in Coeur d'Alene and the Pacific Northwest.",
};

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-6 text-right font-medium" style={{ color: "var(--text-muted)" }}>
        {stars}
      </span>
      <span style={{ color: "var(--star-color)" }}>★</span>
      <div
        className="h-2 flex-1 overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--bg-muted)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: "var(--star-color)" }}
        />
      </div>
      <span className="w-8 text-xs" style={{ color: "var(--text-light)" }}>
        {count}
      </span>
    </div>
  );
}

export default async function ReviewsPage() {
  const googleData = await fetchGoogleReviews();
  const dbReviews = await getReviews();

  const allReviews = dbReviews.length > 0 ? dbReviews : (googleData?.reviews ?? []);

  const aggregateRating =
    googleData?.rating?.toFixed(1) ??
    (allReviews.length > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
      : "5.0");

  const reviewCountLabel = googleData?.totalCount
    ? `${googleData.totalCount}+ reviews`
    : `${allReviews.length} reviews`;

  // Rating breakdown
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: allReviews.filter((r) => r.rating === stars).length,
  }));

  // Shuffle all reviews
  const shuffled = [...allReviews].sort(() => Math.random() - 0.5);

  // Random spotlight from 5-star reviews with decent length
  const fiveStars = shuffled.filter((r) => r.rating === 5 && r.text.length > 80);
  const spotlight = fiveStars[0] ?? null;

  // Remaining reviews (exclude spotlight), take first 10 for initial display
  const remaining = spotlight ? shuffled.filter((r) => r.id !== spotlight.id) : shuffled;

  return (
    <>
      {/* ─── Header + Stats ───────────────────────── */}
      <section className="section-wrap">
        <p className="eyebrow mb-2">Guest Reviews</p>
        <h1>What Our Guests Are Saying</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          Guests book Castcadia for one reason: results backed by professionalism. These are real
          stories from families, first-timers, and repeat anglers.
        </p>

        {/* Aggregate + Breakdown */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
          <div className="card inline-flex items-center gap-4 px-6 py-4">
            <span className="text-4xl font-bold" style={{ color: "var(--accent)" }}>
              {aggregateRating}
            </span>
            <div>
              <p className="stars text-lg">★★★★★</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {reviewCountLabel} &bull; Google
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-xs space-y-1.5">
            {ratingCounts.map(({ stars, count }) => (
              <RatingBar key={stars} stars={stars} count={count} total={allReviews.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Spotlight Testimonial ────────────────── */}
      {spotlight && (
        <section style={{ backgroundColor: "var(--bg-warm)" }}>
          <div className="section-wrap-sm text-center">
            <p className="stars text-2xl">★★★★★</p>
            <blockquote
              className="mt-4 text-xl leading-relaxed md:text-2xl"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              &ldquo;{spotlight.text}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              — {spotlight.author}
              {spotlight.date && (
                <span>
                  {" "}&bull;{" "}
                  {new Date(spotlight.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </p>
          </div>
        </section>
      )}

      {/* ─── Reviews Grid (10 initial + expand) ───── */}
      <section>
        <div className="section-wrap">
          <ExpandableReviews reviews={remaining} initialCount={10} />
        </div>
      </section>

      {/* ─── External Links ───────────────────────── */}
      <section className="section-wrap text-center">
        <h2>See more reviews</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--text-secondary)" }}>
          Read our reviews on Google, or leave your own after your trip.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJ1VaOzuK0HwIRtdeY5oTlahg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Google Reviews
          </a>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap text-center">
          <h2>Ready to create your own story?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base" style={{ color: "var(--text-secondary)" }}>
            Join the growing list of happy Castcadia guests.
          </p>
          <div className="mt-6">
            <BookNowButton placement="cta_click_final">Book Your Trip</BookNowButton>
          </div>
        </div>
      </section>
    </>
  );
}
