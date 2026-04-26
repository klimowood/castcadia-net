"use client";

import { useState } from "react";
import { Review } from "@/types/content";
import { ReviewCard } from "./ReviewCard";

export function ExpandableReviews({
  reviews,
  initialCount = 10,
}: {
  reviews: Review[];
  initialCount?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, initialCount);
  const hasMore = reviews.length > initialCount;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {hasMore && !showAll && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="btn-secondary"
          >
            Read More Reviews ({reviews.length - initialCount} more)
          </button>
        </div>
      )}
    </>
  );
}
