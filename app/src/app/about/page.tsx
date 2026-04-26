import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookNowButton } from "@/components/BookNowButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Capt. Jesse Kroetch and learn about Castcadia Outfitters — North Idaho's premier guided fishing charter service on Lake Coeur d'Alene and beyond.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-wrap">
        <p className="eyebrow mb-2">About Us</p>
        <h1>Who We Are</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          CastCadia Outfitters is the premier fishing outfitter in North Idaho. We offer private,
          elevated, and highly customized angling experiences across the Pacific Northwest.
        </p>
      </section>

      {/* Story */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2>Our Story</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                As the region&apos;s leading specialized technical bass guide service — and seasoned salmon,
                steelhead, kokanee, pike, and walleye instructors — we are built for the angling
                enthusiast and beginner alike who expect more than just a day on the water.
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                North Idaho-born, conservation-driven, and adventure-focused — Castcadia was founded on
                the belief that a guided fishing trip should be the highlight of your trip, not just
                another activity.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: "var(--radius-lg)" }}>
              <Image
                src="/photos/about-release.jpg"
                alt="Guide releasing a salmon on the Columbia River"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="section-wrap">
        <div className="mb-8 text-center">
          <h2>Our Promise</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            At CastCadia, we go the extra mile to create a fun, relaxed, and unforgettable experience.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { num: "01", title: "Thoughtfully planned trips", desc: "Every outing is customized to your goals, skill level, and target species." },
            { num: "02", title: "Expert instruction without ego", desc: "Patient coaching for all levels — from first cast to trophy catch." },
            { num: "03", title: "Welcoming atmosphere", desc: "Family-friendly environment for families, friends, and corporate groups." },
            { num: "04", title: "Conservation-first", desc: "Responsible angling practices and respect for the waters we fish." },
            { num: "05", title: "Unforgettable moments", desc: "A day filled with laughter, learning, and memories you'll talk about for years." },
            { num: "06", title: "Exceeding expectations", desc: "We don't just meet the bar — we set it. Every single trip." },
          ].map((item) => (
            <div key={item.title} className="card p-5">
              <p className="font-bold leading-none" style={{ fontFamily: "var(--font-heading)", fontSize: "2.25rem", color: "var(--teal)", opacity: 0.25 }}>{item.num}</p>
              <h3 className="mt-2">{item.title}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Guides CTA */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap text-center">
          <p className="eyebrow mb-2">Your Guides</p>
          <h2>Meet the team behind Castcadia</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            Every trip is led by an experienced, licensed guide who knows these waters inside and out.
          </p>
          <div className="mt-6">
            <Link href="/about/guides" className="btn-secondary">Meet Our Guides</Link>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section-wrap">
        <h2 className="mb-6 text-center">Where We Fish</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Lake Coeur d'Alene", species: "Bass, Pike", season: "Apr–Nov" },
            { name: "Clearwater River", species: "Steelhead, Salmon", season: "Oct–Mar" },
            { name: "Snake River", species: "Steelhead, Salmon", season: "Oct–Mar" },
            { name: "Columbia River", species: "Salmon", season: "May–Oct" },
          ].map((loc) => (
            <div key={loc.name} className="card p-5 text-center">
              <h3 className="text-base">{loc.name}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{loc.species}</p>
              <p className="text-xs" style={{ color: "var(--text-light)" }}>{loc.season}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap text-center">
          <h2>Ready to get on the water?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            This isn&apos;t just a fishing trip — it&apos;s an experience you&apos;ll talk about for years.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <BookNowButton placement="cta_click_final">Book Your Trip</BookNowButton>
            <Link href="/trips" className="btn-secondary">View Trip Options</Link>
          </div>
        </div>
      </section>
    </>
  );
}
