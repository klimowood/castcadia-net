import { Review } from "@/types/content";

const sourceLabels: Record<Review["source"], string> = {
  google: "Google",
  fishingbooker: "Review",
  facebook: "Facebook",
  direct: "Direct",
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="stars text-base">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
        <span className="badge text-[10px]">{sourceLabels[review.source]}</span>
      </div>

      <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border-light)" }}>
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          — {review.author}
        </p>
        <div className="flex items-center gap-2">
          {review.tripType && (
            <span className="text-xs" style={{ color: "var(--text-light)" }}>
              {review.tripType}
            </span>
          )}
          {review.date && (
            <span className="text-xs" style={{ color: "var(--text-light)" }}>
              {new Date(review.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
