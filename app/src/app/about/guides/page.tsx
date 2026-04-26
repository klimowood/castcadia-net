import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookNowButton } from "@/components/BookNowButton";
import { getGuides } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Guides",
  description:
    "Meet the experienced fishing guides at Castcadia Outfitters. Expert anglers with deep knowledge of Lake Coeur d'Alene, Clearwater, Snake, and Columbia rivers.",
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <>
      <section className="section-wrap">
        <p className="eyebrow mb-2">Our Team</p>
        <h1>Meet Your Guides</h1>
        <p className="mt-4 max-w-3xl text-base" style={{ color: "var(--text-secondary)" }}>
          Every Castcadia trip is led by an experienced, licensed guide who knows these waters inside
          and out. Get to know the people who&apos;ll put you on the fish.
        </p>
      </section>

      {guides.map((guide, i) => (
        <section key={guide.id} style={i % 2 === 0 ? { backgroundColor: "var(--bg-warm)" } : undefined}>
          <div className="section-wrap">
            <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 !== 0 ? "md:[direction:rtl] md:[&>*]:[direction:ltr]" : ""}`}>
              <div className="relative aspect-square overflow-hidden md:aspect-[3/4]" style={{ borderRadius: "var(--radius-lg)" }}>
                {guide.imageUrl ? (
                  <Image
                    src={guide.imageUrl}
                    alt={guide.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(135deg, #2A7B6F 0%, #1a4a3f 100%)" }}>
                    <span className="text-7xl opacity-40">🎣</span>
                  </div>
                )}
              </div>
              <div>
                <h2>{guide.name}</h2>
                <p className="mt-1 text-base font-medium" style={{ color: "var(--accent)" }}>
                  {guide.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {guide.bio}
                </p>
                {guide.credentials.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {guide.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--teal)" }}>✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {guides.length === 0 && (
        <section className="section-wrap text-center">
          <p style={{ color: "var(--text-muted)" }}>Guide profiles coming soon.</p>
        </section>
      )}

      {/* CTA */}
      <section style={{ backgroundColor: guides.length % 2 === 0 ? "var(--bg-warm)" : undefined }}>
        <div className="section-wrap text-center">
          <h2>Ready to get on the water?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            Book a trip and experience the Pacific Northwest with one of our expert guides.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <BookNowButton placement="cta_click_guides">Book Your Trip</BookNowButton>
            <Link href="/trips" className="btn-secondary">View Trip Options</Link>
          </div>
        </div>
      </section>
    </>
  );
}
