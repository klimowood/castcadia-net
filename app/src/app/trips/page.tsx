import type { Metadata } from "next";
import { BookNowButton } from "@/components/BookNowButton";
import { TripCard } from "@/components/TripCard";
import { getTrips } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Trips & Rates",
  description:
    "Compare guided fishing trip options in Coeur d'Alene, Clearwater, and the Columbia River. Bass, pike, steelhead, and salmon trips with transparent pricing.",
};

export default async function TripsPage() {
  const trips = await getTrips();
  const bassTrips = trips.filter((t) => t.species.some((s) => s.includes("Bass")));
  const otherTrips = trips.filter((t) => !t.species.some((s) => s.includes("Bass")));

  return (
    <>
      <section className="section-wrap">
        <p className="eyebrow mb-2">Our Trips</p>
        <h1>Trip Options &amp; Rates</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          Choose your target species and pace. Every trip includes expert guidance, premium gear, and a
          direct booking path. Pricing is transparent — no hidden fees.
        </p>
      </section>

      {/* Bass / Pike Trips */}
      <section className="section-wrap pt-0">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h2>Bass &amp; Pike Trips</h2>
            <span className="badge-accent">Per Boat</span>
          </div>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Lake Coeur d&apos;Alene, Idaho &bull; April – November &bull; Tournament-rigged Lund Pro-V Bass Boat
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {bassTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
        <div className="card mt-6 p-5" style={{ backgroundColor: "var(--accent-light)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <strong>Larger groups?</strong> An additional fee of $225 (full day) or $150 (half day) per angler applies
            for groups larger than 2, with a maximum of 3 anglers per trip.{" "}
            <a href="/contact" className="font-medium" style={{ color: "var(--accent)" }}>Contact us for group arrangements →</a>
          </p>
        </div>
      </section>

      {/* Salmon & Steelhead */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <h2>Salmon &amp; Steelhead Trips</h2>
              <span className="badge-teal">Per Person</span>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Clearwater River &bull; Snake River &bull; Columbia River &bull; Minimum 3 guests
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {otherTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-wrap">
        <h2 className="mb-6">What&apos;s included in every trip</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-4" style={{ color: "var(--teal)" }}>✓ We provide</h3>
            <ul className="space-y-2">
              {["All fishing gear, tackle & bait", "Beverage selection", "Lunch (full-day Idaho trips only)", "Life jackets", "Fuel", "Good times"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--teal)" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="mb-4" style={{ color: "var(--text-muted)" }}>📋 You bring</h3>
            <ul className="space-y-2">
              {["State fishing license & catch cards (mandatory)", "Proper clothing (dress for weather)", "Fishing guide gratuity"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--text-light)" }}>•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap-sm">
          <h2 className="mb-4">Cancellation Policy</h2>
          <div className="card p-6 space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p><strong>Customer cancellation:</strong> Refunds are available for cancellations made at least 7 days prior. No refunds within 7 days of the trip.</p>
            <p><strong>Weather/safety cancellation:</strong> If we cancel due to conditions beyond our control, you receive a full refund or the option to reschedule.</p>
            <p><strong>No-shows:</strong> Not eligible for a refund without prior notice.</p>
            <p><strong>Gift certificates:</strong> Non-refundable but may be transferable with prior approval.</p>
            <p className="pt-2" style={{ color: "var(--text-light)" }}>
              To initiate a refund, contact us at <a href="mailto:info@castcadia.net" style={{ color: "var(--accent)" }}>info@castcadia.net</a> or call <a href="tel:2086995636" style={{ color: "var(--accent)" }}>(208) 699-5636</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-wrap text-center">
        <h2>Not sure which trip?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
          Give us a call or send a message — we&apos;ll help you pick the right trip for your group,
          experience level, and target species.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <BookNowButton placement="cta_click_trip_detail">Book Now</BookNowButton>
          <a href="/contact" className="btn-secondary">Contact Us</a>
        </div>
      </section>
    </>
  );
}
