"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: Wire to server action / API route with Resend
      // For now, construct a mailto fallback
      const subject = `Trip Inquiry: ${data.tripInterest || "General"}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\nTrip Interest: ${data.tripInterest || "N/A"}\n\nMessage:\n${data.message}`;
      window.location.href = `mailto:info@castcadia.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      trackEvent("contact_form_submit", { tripInterest: String(data.tripInterest || "") });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 text-center">
        <span className="text-4xl">✓</span>
        <h3 className="mt-3">Message sent!</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          We typically respond within 24 hours. Looking forward to getting you on the water!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Name *
          </label>
          <input id="name" name="name" type="text" required className="input" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Email *
          </label>
          <input id="email" name="email" type="email" required className="input" placeholder="your@email.com" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className="input" placeholder="(555) 123-4567" />
        </div>
        <div>
          <label htmlFor="tripInterest" className="mb-1 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Trip Interest
          </label>
          <select id="tripInterest" name="tripInterest" className="input">
            <option value="">Select a trip type...</option>
            <option value="bass-half-day">Bass & Pike — Half Day</option>
            <option value="bass-full-day">Bass & Pike — Full Day</option>
            <option value="steelhead">Steelhead</option>
            <option value="salmon">Salmon</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="textarea"
          placeholder="Tell us about your group, dates, and any questions..."
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
