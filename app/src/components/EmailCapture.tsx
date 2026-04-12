"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Wire to newsletter API (Mailchimp, Resend, etc.)
    trackEvent("email_capture", { email });
    setStatus("sent");
    setEmail("");
  }

  if (status === "sent") {
    return (
      <div className="card mx-auto max-w-xl p-8 text-center" style={{ backgroundColor: "var(--teal-light)" }}>
        <span className="text-3xl">✓</span>
        <h3 className="mt-2">You&apos;re on the list!</h3>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          We&apos;ll send you fishing reports and exclusive trip deals.
        </p>
      </div>
    );
  }

  return (
    <div className="card mx-auto max-w-xl p-8 text-center" style={{ backgroundColor: "var(--teal-light)" }}>
      <h2 className="text-2xl">Get fishing reports &amp; trip deals</h2>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        Join our mailing list for seasonal updates, fishing reports, and exclusive offers.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="input flex-1"
          required
        />
        <button type="submit" className="btn-teal whitespace-nowrap">
          Sign Up
        </button>
      </form>
      <p className="mt-3 text-xs" style={{ color: "var(--text-light)" }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
