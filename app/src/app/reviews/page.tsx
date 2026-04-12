import type { Metadata } from "next";
import Link from "next/link";
import { ReviewCard } from "@/components/ReviewCard";
import { BookNowButton } from "@/components/BookNowButton";
import { reviews } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read real guest reviews from guided fishing charters with Castcadia Outfitters in Coeur d'Alene and the Pacific Northwest.",
};

export default function ReviewsPage() {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      <section className="section-wrap">
        <p className="eyebrow mb-2">Guest Reviews</p>
        <h1>What Our Guests Are Saying</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          Guests book Castcadia for one reason: results backed by professionalism. These are real
          stories from families, first-timers, and repeat anglers.
        </p>

        {/* Aggregate Rating */}
        <div className="card mt-8 inline-flex items-center gap-4 px-6 py-4">
          <span className="text-4xl font-bold" style={{ color: "var(--accent)" }}>{avgRating}</span>
          <div>
            <p className="stars text-lg">★★★★★</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {reviews.length} reviews &bull; Google &bull; FishingBooker
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap">
          <div className="grid gap-5 md:grid-cols-2">
            {reviews.map((review, index) => (
              <div key={review.id}>
                <ReviewCard review={review} />
                {/* CTA after every 4 reviews */}
                {(index + 1) % 4 === 0 && index < reviews.length - 1 && (
                  <div className="mt-5 text-center">
                    <BookNowButton placement="cta_click_trip_detail" className="btn-primary text-sm">
                      Book Your Trip
                    </BookNowButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="section-wrap text-center">
        <h2>See more reviews</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--text-secondary)" }}>
          Read our reviews on Google and FishingBooker, or leave your own after your trip.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://www.google.com/maps/place/Castcadia+Outfitters"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Google Reviews
          </a>
          <a
            href="https://www.fishingbooker.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            FishingBooker
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap text-center">
          <h2>Ready to create your own story?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base" style={{ color: "var(--text-secondary)" }}>
            Join the growing list of happy Castcadia guests.
          </p>
          <div className="mt-6">
            <BookNowButton placement="cta_click_trip_detail">Book Your Trip</BookNowButton>
          </div>
        </div>
      </section>
    </>
  );
}
