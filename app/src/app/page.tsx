import type { Metadata } from "next";
import Link from "next/link";
import { BookOnVallyButton } from "@/components/BookOnVallyButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TripCard } from "@/components/TripCard";
import { faqs } from "@/content/faqs";
import { testimonials } from "@/content/testimonials";
import { trips } from "@/content/trips";

export const metadata: Metadata = {
  title: "Premium Guided Fishing in Coeur d'Alene & the Pacific Northwest",
  description:
    "Catch more, stress less with premium guided fishing charters. Book on vally and secure your date in minutes.",
};

export default function Home() {
  const featuredTrips = trips.filter((trip) => trip.isFeatured);

  return (
    <>
      <section className="section-wrap space-y-6 pt-14 md:pt-20">
        <p className="text-sm uppercase tracking-[0.14em] text-[#9db5af]">Guided Fishing Charter • Coeur d&apos;Alene</p>
        <h1 className="max-w-3xl text-4xl leading-tight md:text-6xl">
          Premium Guided Fishing in Coeur d&apos;Alene & the Pacific Northwest
        </h1>
        <p className="max-w-2xl text-lg text-[#c7d7d3]">
          From calm sunrise launches to hard-fighting fish, Castcadia delivers high-end guided charter trips
          designed for confidence, adventure, and consistent action.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookOnVallyButton placement="cta_click_valy_hero">Book on vally</BookOnVallyButton>
          <Link href="/trips" className="btn-secondary">
            View Trip Options
          </Link>
        </div>
        <p className="text-sm text-[#9db5af]">Licensed guide • Safety-first operations • Local Coeur d&apos;Alene expertise</p>
      </section>

      <section className="section-wrap">
        <h2 className="mb-6 text-3xl">Featured Trips</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <h2 className="mb-6 text-3xl">Trusted by visiting and local anglers</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <h2 className="mb-6 text-3xl">Frequently asked questions</h2>
        <FAQAccordion items={faqs.slice(0, 5)} />
      </section>

      <section className="section-wrap">
        <div className="rounded-2xl border border-white/10 bg-[#142b26] p-8 text-center">
          <h2 className="text-3xl">Ready to lock in your date?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#c7d7d3]">
            Peak fishing windows book quickly. Reserve your guided charter through vally now.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <BookOnVallyButton placement="cta_click_valy_hero">Book on vally</BookOnVallyButton>
            <Link href="/trips" className="btn-secondary">
              See matching trips
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
