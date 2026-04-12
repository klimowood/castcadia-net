import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/content/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Castcadia Outfitters. Call, email, or send a message about your guided fishing trip in Coeur d'Alene and the Pacific Northwest.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-wrap">
        <p className="eyebrow mb-2">Get In Touch</p>
        <h1>Contact Us</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          Have a question about trips, availability, or need help choosing the right experience?
          We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
        </p>
      </section>

      <section style={{ backgroundColor: "var(--bg-warm)" }}>
        <div className="section-wrap">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">Call us</h3>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="text-lg font-semibold transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--accent)" }}
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div>
                <h3 className="mb-2">Email us</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-base transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--accent)" }}
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <h3 className="mb-2">Follow us</h3>
                <div className="flex gap-4">
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Instagram →
                  </a>
                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Facebook →
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-2">Service Area</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Lake Coeur d&apos;Alene, Idaho<br />
                  Clearwater &amp; Snake Rivers, Idaho<br />
                  Columbia River, Washington
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
