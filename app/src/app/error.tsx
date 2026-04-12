"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-wrap text-center">
      <p className="text-6xl font-bold" style={{ color: "var(--accent)" }}>Oops</p>
      <h1 className="mt-4 text-2xl">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-base" style={{ color: "var(--text-secondary)" }}>
        Don&apos;t worry — even the best fishing days hit a snag. Let&apos;s try again.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button onClick={() => reset()} className="btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn-secondary">Back to Home</Link>
      </div>
    </section>
  );
}
