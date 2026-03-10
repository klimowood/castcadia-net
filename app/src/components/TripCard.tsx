import Image from "next/image";
import { Trip } from "@/types/content";
import { BookOnVallyButton } from "./BookOnVallyButton";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#142b26]">
      <Image src={trip.imageUrl} alt={trip.title} width={1200} height={800} className="h-48 w-full object-cover" />
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold text-white">{trip.title}</h3>
        <p className="text-sm text-[#c7d7d3]">{trip.summary}</p>
        <p className="text-sm text-[#c7d7d3]">
          {trip.durationHours}h • Up to {trip.maxAnglers} anglers • From ${trip.priceFromUsd}
        </p>
        <BookOnVallyButton placement="cta_click_valy_trip_card" tripSlug={trip.slug} />
      </div>
    </article>
  );
}
