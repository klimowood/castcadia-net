import type { Metadata } from "next";
import { BookOnVallyButton } from "@/components/BookOnVallyButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQ | Castcadia Guided Fishing",
  description: "Answers about booking, weather, preparation, and charter policies.",
};

export default function FAQPage() {
  return (
    <section className="section-wrap pt-12 md:pt-16">
      <h1 className="text-4xl md:text-5xl">Frequently Asked Questions</h1>
      <p className="mt-4 max-w-3xl text-[#c7d7d3]">
        Quick answers to remove booking friction: what to bring, weather plans, and how booking on vally works.
      </p>
      <div className="mt-8">
        <FAQAccordion items={faqs} />
      </div>
      <div className="mt-8">
        <BookOnVallyButton placement="cta_click_valy_trip_detail">Book on vally</BookOnVallyButton>
      </div>
    </section>
  );
}
