import type { Metadata } from "next";
import { BookOnVallyButton } from "@/components/BookOnVallyButton";
import { TripCard } from "@/components/TripCard";
import { trips } from "@/content/trips";

export const metadata: Metadata = {
  title: "Trips | Castcadia Guided Fishing",
  description: "Compare guided fishing trip options and book your charter on vally.",
};

export default function TripsPage() {
  return (
    <section className="section-wrap pt-12 md:pt-16">
      <h1 className="text-4xl md:text-5xl">Trip Options</h1>
      <p className="mt-4 max-w-3xl text-[#c7d7d3]">
        Choose your target species and pace. Every trip includes expert guidance, premium gear, and a direct
        booking path through vally.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-white/10 bg-[#142b26] p-6">
        <p className="mb-4 text-[#c7d7d3]">Need help selecting the right trip format?</p>
        <BookOnVallyButton placement="cta_click_valy_trip_detail">Book on vally</BookOnVallyButton>
      </div>
    </section>
  );
}
