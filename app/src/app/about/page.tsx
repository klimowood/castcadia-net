import type { Metadata } from "next";
import { BookOnVallyButton } from "@/components/BookOnVallyButton";

export const metadata: Metadata = {
  title: "About | Castcadia Guided Fishing",
  description: "Meet your Coeur d'Alene fishing guide and learn our safety-first charter approach.",
};

export default function AboutPage() {
  return (
    <section className="section-wrap pt-12 md:pt-16">
      <h1 className="text-4xl md:text-5xl">About Castcadia</h1>
      <p className="mt-4 max-w-3xl text-[#c7d7d3]">
        Castcadia is built around quiet confidence on the water: local river knowledge, premium equipment, and
        a safety-first experience for every skill level.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#142b26] p-5">
          <h2 className="text-2xl">Local expertise</h2>
          <p className="mt-2 text-[#c7d7d3]">Daily pattern updates across Coeur d&apos;Alene and nearby fisheries.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#142b26] p-5">
          <h2 className="text-2xl">Safety standards</h2>
          <p className="mt-2 text-[#c7d7d3]">Licensed, insured, and focused on clear communication from dock to dock.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#142b26] p-5">
          <h2 className="text-2xl">Premium gear</h2>
          <p className="mt-2 text-[#c7d7d3]">Well-maintained tackle and proven techniques tailored to your goals.</p>
        </div>
      </div>

      <div className="mt-8">
        <BookOnVallyButton placement="cta_click_valy_trip_detail">Book on vally</BookOnVallyButton>
      </div>
    </section>
  );
}
