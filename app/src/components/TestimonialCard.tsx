import { Testimonial } from "@/types/content";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#142b26] p-5">
      <p className="mb-3 text-amber-300">{"★".repeat(testimonial.rating)}</p>
      <p className="text-[#d6e3e0]">“{testimonial.quote}”</p>
      <p className="mt-4 text-sm text-[#9db5af]">— {testimonial.name}</p>
    </article>
  );
}
