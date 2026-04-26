import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { BookNowButton } from "@/components/BookNowButton";
import { getFaqs } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about booking, weather, preparation, cancellation policies, and what to expect on your guided fishing trip with Castcadia Outfitters.",
};

export default async function FAQPage() {
  const faqs = await getFaqs();
  const categories = [
    { key: "booking", label: "Booking" },
    { key: "preparation", label: "Preparation" },
    { key: "logistics", label: "Logistics" },
    { key: "policy", label: "Policies" },
    { key: "safety", label: "Safety" },
  ] as const;

  return (
    <>
      <section className="section-wrap">
        <p className="eyebrow mb-2">FAQ</p>
        <h1>Frequently Asked Questions</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          Quick answers to help you prepare for your trip, understand our policies, and remove any
          booking friction.
        </p>
      </section>

      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap-sm">
          {categories.map((cat) => {
            const catFaqs = faqs.filter((f) => f.category === cat.key);
            if (catFaqs.length === 0) return null;
            return (
              <div key={cat.key} className="mb-10">
                <h2 className="mb-4 text-xl">{cat.label}</h2>
                <FAQAccordion items={catFaqs} />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section-wrap text-center">
        <h2>Still have questions?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base" style={{ color: "var(--text-secondary)" }}>
          Give us a call at <a href="tel:2086995636" className="font-medium" style={{ color: "var(--accent)" }}>(208) 699-5636</a> or
          send us a message — we&apos;re happy to help.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <BookNowButton placement="cta_click_final">Book Your Trip</BookNowButton>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
