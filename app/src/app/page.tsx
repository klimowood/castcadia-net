import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookNowButton } from "@/components/BookNowButton";
import { TripCard } from "@/components/TripCard";
import { ReviewCard } from "@/components/ReviewCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { EmailCapture } from "@/components/EmailCapture";
import { trips } from "@/content/trips";
import { featuredReviews } from "@/content/testimonials";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Premium Guided Fishing in Coeur d'Alene & the Pacific Northwest",
  description:
    "Catch more, stress less with premium guided fishing charters. Target bass, pike, salmon, and steelhead with Castcadia Outfitters. Book your trip today.",
};

export default function Home() {
  const featuredTrips = trips.filter((t) => t.isFeatured);
  const previewFaqs = faqs.slice(0, 4);
  const previewReviews = featuredReviews.slice(0, 3);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center" style={{ backgroundColor: "var(--text-primary)", minHeight: "580px" }}>
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/photos/hero-steelhead-haul.jpg"
            className="h-full w-full object-cover"
            style={{ opacity: 0.45 }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Directional gradient — keep left edge readable */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(105deg, rgba(26,43,35,0.88) 35%, rgba(26,43,35,0.2) 100%)" }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-36">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
            {/* Logo */}
            <div className="animate-fade-up flex-shrink-0">
              <Image src="/logo.svg" alt="Castcadia Outfitters" width={560} height={560} className="h-[26rem] w-auto md:h-[36rem]" />
            </div>
            {/* Text block */}
            <div>
              <p className="eyebrow-light mb-4 animate-fade-up">Guided Fishing Charters • Coeur d&apos;Alene, Idaho</p>
              <h1 className="max-w-3xl animate-fade-up delay-100" style={{ color: "white", fontStyle: "italic" }}>
                Premium guided trips for anglers who want a day worth remembering.
              </h1>
              <p className="mt-5 max-w-2xl text-lg animate-fade-up delay-200" style={{ color: "rgba(255,255,255,0.75)" }}>
                From calm sunrise launches to hard-fighting fish, Castcadia delivers elevated charter
                experiences designed for confidence, adventure, and consistent action.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up delay-300">
                <BookNowButton placement="cta_click_hero">Book Your Trip</BookNowButton>
                <Link href="/trips" className="btn-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white", backgroundColor: "rgba(255,255,255,0.08)" }}>
                  View Trip Options
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm animate-fade-up delay-400" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span className="flex items-center gap-1.5">
                  <span className="stars">★</span> 5.0 rated on FishingBooker
                </span>
                <span>•</span>
                <span>Licensed &amp; insured</span>
                <span>•</span>
                <span>Conservation-driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Trips ──────────────────────── */}
      <section className="section-wrap">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2">Our Trips</p>
          <h2>Choose your adventure</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            Clear options, transparent pricing, and quick booking. Every trip includes expert guidance
            and premium gear.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/trips" className="btn-secondary">
            View All Trip Details
          </Link>
        </div>
      </section>

      {/* ─── Why Castcadia ───────────────────────── */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap">
          <div className="mb-8 text-center">
            <p className="eyebrow mb-2">Why Castcadia</p>
            <h2>More than just a fishing trip</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Local Water Expertise",
                desc: "We fish active patterns, not crowded guesses. Daily-updated knowledge across Lake CdA, Clearwater, Snake, and Columbia rivers.",
              },
              {
                num: "02",
                title: "Premium Gear & Coaching",
                desc: "Tournament-rigged boats, top-tier tackle, and expert instruction — every detail handled so you can focus on the strike.",
              },
              {
                num: "03",
                title: "Memories That Last",
                desc: "Whether it's a family bonding day, a trip with friends, or a team-building event, Castcadia is built to create unforgettable moments.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <p className="font-bold leading-none" style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", color: "var(--accent)", opacity: 0.25 }}>{item.num}</p>
                <h3 className="mt-2">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews ─────────────────────────────── */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap">
          <div className="mb-8 text-center">
            <p className="eyebrow mb-2">Guest Reviews</p>
            <h2>Trusted by visiting and local anglers</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
              Real stories from families, first-timers, and repeat anglers.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {previewReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/reviews" className="btn-secondary">
              See All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ─── What's Included ─────────────────────── */}
      <section className="section-wrap">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2">What&apos;s Included</p>
          <h2>Everything you need for a great day</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-4" style={{ color: "var(--teal)" }}>✓ Included in every trip</h3>
            <ul className="space-y-2">
              {["All fishing gear, tackle & bait", "Beverage selection", "Lunch (full-day Idaho trips)", "Life jackets", "Fuel", "Expert instruction & coaching"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--teal)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="mb-4" style={{ color: "var(--text-muted)" }}>📋 You&apos;ll need to bring</h3>
            <ul className="space-y-2">
              {["State fishing license & catch cards (mandatory)", "Weather-appropriate clothing", "Sunscreen & sunglasses", "Fishing guide gratuity"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-light)" }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── FAQ Preview ─────────────────────────── */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap-sm">
          <div className="mb-8 text-center">
            <p className="eyebrow mb-2">FAQ</p>
            <h2>Common questions</h2>
          </div>
          <FAQAccordion items={previewFaqs} />
          <div className="mt-8 text-center">
            <Link href="/faq" className="btn-secondary">
              See All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Email Capture ────────────────────────── */}
      <section className="section-wrap">
        <EmailCapture />
      </section>

      {/* ─── Final CTA ───────────────────────────── */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap text-center">
          <h2>Ready to make some memories?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            Peak fishing windows book quickly. Reserve your guided charter and lock in your date.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <BookNowButton placement="cta_click_final">Book Your Trip</BookNowButton>
            <Link href="/contact" className="btn-secondary">
              Talk to a Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
