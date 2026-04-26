import type { Metadata } from "next";
import { partners, categoryLabels } from "@/content/partners";
import { BookNowButton } from "@/components/BookNowButton";

export const metadata: Metadata = {
  title: "Partner Lodging & Campgrounds",
  description:
    "Stay close to the water. Castcadia Outfitters partners with the best hotels, resorts, and campgrounds in Coeur d'Alene for a seamless fishing trip experience.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="section-wrap">
        <p className="eyebrow mb-2">Local Partners</p>
        <h1>Where to Stay in Coeur d&apos;Alene</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          We work closely with the best lodging and campground options in the area so your whole
          trip — from check-in to cast-off — is taken care of. Whether you&apos;re looking for
          lakeside luxury or a night under the stars, we&apos;ve got a recommendation for you.
        </p>
      </section>

      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap">
          <div className="grid gap-6 md:grid-cols-2">
            {partners.map((partner) => (
              <article key={partner.id} className="card p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl">{partner.name}</h2>
                  <span className="badge shrink-0">{categoryLabels[partner.category]}</span>
                </div>

                <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {partner.description}
                </p>

                <div className="flex flex-col gap-1 pt-2" style={{ borderTop: "1px solid var(--border-light)" }}>
                  <p className="text-xs" style={{ color: "var(--text-light)" }}>
                    {partner.address}
                  </p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    Visit website →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap text-center">
        <h2>Ready to plan your trip?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base" style={{ color: "var(--text-secondary)" }}>
          Book your guided charter and reach out to one of our partners to lock in your
          accommodations. We&apos;re happy to help coordinate.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookNowButton placement="cta_click_trip_detail">Book Your Trip</BookNowButton>
          <a href="/contact" className="btn-secondary">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
