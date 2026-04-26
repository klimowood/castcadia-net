import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookNowButton } from "@/components/BookNowButton";
import { TripCard } from "@/components/TripCard";
import { species, getSpeciesBySlug } from "@/content/species";
import { trips } from "@/content/trips";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return species.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpeciesBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.name} Fishing`,
    description: s.tagline,
  };
}

export default async function SpeciesPage({ params }: Props) {
  const { slug } = await params;
  const s = getSpeciesBySlug(slug);
  if (!s) notFound();

  const relatedTrips = trips.filter((t) => s.relatedTripSlugs.includes(t.slug));
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "520px", backgroundColor: "var(--text-primary)" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={s.imageUrl}
            alt={s.name}
            fill
            className="object-cover object-center"
            style={{ opacity: 0.4 }}
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(to top, rgba(26,43,35,0.95) 30%, rgba(26,43,35,0.3) 100%)" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-24">
          {/* Breadcrumb */}
          <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link href="/fish" className="hover:text-white transition-colors">Target Species</Link>
            {" / "}
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{s.name}</span>
          </p>
          <p className="eyebrow-light mb-2">{s.seasonLabel} · {s.locations[0]}</p>
          <h1 style={{ color: "white", fontStyle: "italic" }}>{s.name}</h1>
          <p className="mt-4 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            {s.tagline}
          </p>
        </div>
      </section>

      {/* ─── Quick Stats ───────────────────────────────── */}
      <section style={{ backgroundColor: "var(--bg-warm)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-wrap gap-6 md:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Season</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.seasonLabel}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Waters</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.locations.join(", ")}</p>
            </div>
            {s.averageWeight && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Typical Size</p>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.averageWeight}</p>
              </div>
            )}
            {s.recordWeight && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>Notable Catches</p>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.recordWeight}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── About + Techniques ────────────────────────── */}
      <section className="section-wrap">
        <div className="grid gap-10 md:grid-cols-[1fr_320px]">
          {/* Description */}
          <div>
            <h2 className="mb-5">About {s.name}</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
              {s.description}
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {s.details}
            </p>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Techniques */}
            <div className="card p-5">
              <h3 className="mb-4 text-base">Techniques we use</h3>
              <ul className="space-y-2">
                {s.techniques.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--teal)", marginTop: "2px" }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Season calendar */}
            <div className="card p-5">
              <h3 className="mb-4 text-base">Peak season months</h3>
              <div className="grid grid-cols-6 gap-1.5">
                {MONTH_NAMES.map((name, i) => {
                  const active = s.seasonMonths.includes(i + 1);
                  return (
                    <div
                      key={name}
                      className="rounded-md py-1.5 text-center text-xs font-medium"
                      style={{
                        backgroundColor: active ? "var(--teal-light)" : "var(--bg-muted)",
                        color: active ? "var(--teal)" : "var(--text-light)",
                      }}
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="card p-5 text-center" style={{ backgroundColor: "var(--accent-light)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Ready to target {s.name.toLowerCase()}?
              </p>
              <BookNowButton placement="cta_click_trip_detail" className="btn-primary w-full text-center text-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Trips ─────────────────────────────── */}
      {relatedTrips.length > 0 && (
        <section style={{ backgroundColor: "var(--bg-warm)" }}>
          <div className="section-wrap">
            <div className="mb-8">
              <p className="eyebrow mb-2">Book Now</p>
              <h2>{s.name} trips</h2>
              <p className="mt-2 text-base" style={{ color: "var(--text-secondary)" }}>
                Choose your trip length and lock in a date.
              </p>
            </div>
            <div className={`grid gap-6 ${relatedTrips.length === 1 ? "md:grid-cols-1 max-w-md" : "md:grid-cols-2"}`}>
              {relatedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Nav to other species ──────────────────────── */}
      <section className="section-wrap">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-1">Also guide for</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {species
                .filter((sp) => sp.slug !== s.slug)
                .map((sp) => (
                  <Link key={sp.id} href={`/fish/${sp.slug}`} className="btn-secondary text-sm">
                    {sp.name}
                  </Link>
                ))}
            </div>
          </div>
          <Link href="/fish" className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            ← All species
          </Link>
        </div>
      </section>
    </>
  );
}
