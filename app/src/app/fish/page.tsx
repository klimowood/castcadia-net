import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookNowButton } from "@/components/BookNowButton";
import { species } from "@/content/species";

export const metadata: Metadata = {
  title: "Fish We Guide For",
  description:
    "Bass, pike, steelhead, and salmon — learn about the species Castcadia Outfitters targets and when to book for peak action.",
};

export default function FishPage() {
  return (
    <>
      {/* ─── Header ──────────────────────────────────── */}
      <section className="section-wrap">
        <p className="eyebrow mb-2">Target Species</p>
        <h1>Fish we guide for</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          From trophy bass on Lake Coeur d&apos;Alene to legendary B-Run steelhead and Pacific salmon,
          Castcadia guides some of the most productive and scenic fisheries in the Pacific Northwest.
        </p>
      </section>

      {/* ─── Species Cards ────────────────────────────── */}
      <section className="section-wrap pt-0">
        <div className="flex flex-col gap-10">
          {species.map((s, i) => (
            <Link
              key={s.id}
              href={`/fish/${s.slug}`}
              className="card overflow-hidden flex flex-col md:flex-row group"
              style={{ textDecoration: "none" }}
            >
              {/* Image — alternates side on desktop */}
              <div
                className={`relative h-[480px] w-full flex-shrink-0 overflow-hidden md:h-auto md:min-h-[480px] md:w-96 ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={s.imageUrl}
                  alt={s.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between gap-4 p-6 md:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-2xl">{s.name}</h2>
                    <span className="badge">{s.seasonLabel}</span>
                  </div>
                  <p className="text-sm font-medium mb-3" style={{ color: "var(--teal)" }}>
                    {s.locations.join(" · ")}
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {s.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                  {s.averageWeight && (
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Avg. {s.averageWeight}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────── */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap text-center">
          <h2>Ready to get on the water?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            Peak windows book fast. Lock in your date and we&apos;ll take care of the rest.
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
