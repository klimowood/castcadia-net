"use client";

import { FAQ } from "@/types/content";
import { trackEvent } from "@/lib/analytics";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="space-y-3">
      {items.map((faq) => (
        <details
          key={faq.id}
          className="card group overflow-hidden"
          onToggle={(event) => {
            if ((event.currentTarget as HTMLDetailsElement).open) {
              trackEvent("faq_expand", { faqId: faq.id, category: faq.category });
            }
          }}
        >
          <summary
            className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            <span>{faq.question}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              style={{ color: "var(--text-muted)" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="px-5 pb-4">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
