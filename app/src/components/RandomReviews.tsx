import { Review } from "@/types/content";
import { ReviewCard } from "./ReviewCard";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function RandomReviews({ reviews, count = 3 }: { reviews: Review[]; count?: number }) {
  const picked = shuffle(reviews).slice(0, count);
  return (
    <>
      {picked.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </>
  );
}
