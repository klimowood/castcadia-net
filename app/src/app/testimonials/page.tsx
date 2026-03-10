import type { Metadata } from "next";
import { BookOnVallyButton } from "@/components/BookOnVallyButton";
import { TestimonialCard } from "@/components/TestimonialCard";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | Castcadia Guided Fishing",
  description: "Read guest stories from guided fishing charters in Coeur d'Alene and the PNW.",
};

export default function TestimonialsPage() {
  return (
    <section className="section-wrap pt-12 md:pt-16">
      <h1 className="text-4xl md:text-5xl">What Guests Are Saying</h1>
      <p className="mt-4 max-w-3xl text-[#c7d7d3]">
        Guests book Castcadia for results backed by professionalism. These are real stories from families,
        first-timers, and repeat anglers.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </div>

      <div className="mt-8">
        <BookOnVallyButton placement="cta_click_valy_trip_detail">Book on vally</BookOnVallyButton>
      </div>
    </section>
  );
}
