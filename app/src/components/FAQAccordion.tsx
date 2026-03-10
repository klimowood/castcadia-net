"use client";

import { FAQ } from "@/types/content";
import { trackEvent } from "@/lib/analytics";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="space-y-3">
      {items.map((faq) => (
        <details
          key={faq.id}
          className="rounded-xl border border-white/10 bg-[#142b26] p-4"
          onToggle={(event) => {
            if ((event.currentTarget as HTMLDetailsElement).open) {
              trackEvent("faq_expand", { faqId: faq.id, category: faq.category });
            }
          }}
        >
          <summary className="cursor-pointer list-none font-medium text-white">{faq.question}</summary>
          <p className="mt-3 text-sm text-[#c7d7d3]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
