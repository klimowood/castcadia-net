import Image from "next/image";
import { Trip } from "@/types/content";
import { BookNowButton } from "./BookNowButton";

export function TripCard({ trip }: { trip: Trip }) {
  const priceDisplay =
    trip.pricingModel === "per-seat"
      ? `$${trip.priceUsd}/person`
      : `$${trip.priceUsd}`;

  const priceNote =
    trip.pricingModel === "per-boat"
      ? `for ${trip.baseAnglers} anglers`
      : `${trip.minAnglers}–${trip.maxAnglers} guests`;

  return (
    <article className="card overflow-hidden flex flex-col">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={trip.imageUrl}
          alt={trip.title}
          width={1200}
          height={800}
          className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
        />
        {trip.catchAndRelease && (
          <span className="badge badge-teal absolute right-3 top-3 text-[10px]">
            Catch &amp; Release
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{trip.title}</h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{trip.subtitle}</p>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {trip.description.length > 120 ? trip.description.slice(0, 120) + "…" : trip.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {trip.species.map((s) => (
            <span key={s} className="badge text-[11px]">{s}</span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>{trip.durationHours}h</span>
          <span>•</span>
          <span>{trip.seasonLabel}</span>
        </div>

        <div className="flex flex-col gap-3 pt-2" style={{ borderTop: "1px solid var(--border-light)" }}>
          <div>
            <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>{priceDisplay}</p>
            <p className="text-xs" style={{ color: "var(--text-light)" }}>{priceNote}</p>
          </div>
          <BookNowButton
            placement="cta_click_trip_card"
            tripSlug={trip.slug}
            className="btn-primary text-sm w-full text-center"
          />
        </div>
      </div>
    </article>
  );
}
