"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookNowButton } from "./BookNowButton";
import { siteConfig } from "@/content/config";

const navItems = [
  { href: "/trips", label: "Trips" },
  { href: "/reviews", label: "Reviews" },
  { href: "/partners", label: "Partners" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const fishItems = [
  { href: "/fish/bass", label: "Bass & Pike" },
  { href: "/fish/steelhead", label: "Steelhead" },
  { href: "/fish/salmon", label: "Salmon" },
];

const aboutItems = [
  { href: "/about/guides", label: "Our Guides" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fishOpen, setFishOpen] = useState(false);
  const [fishMobileOpen, setFishMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur"
        style={{ borderColor: "var(--border-light)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Castcadia Outfitters"
              width={56}
              height={56}
              className="h-12 w-auto sm:h-14"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>Castcadia</span>
              <span className="text-xs font-medium uppercase tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>Outfitters</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex" style={{ color: "var(--text-secondary)" }}>
            <Link href="/trips" className="transition-colors duration-200 hover:text-[var(--accent)]">
              Trips
            </Link>

            {/* Fish dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFishOpen(true)}
              onMouseLeave={() => setFishOpen(false)}
            >
              <button
                className="flex items-center gap-1 transition-colors duration-200 hover:text-[var(--accent)]"
                style={{ color: fishOpen ? "var(--accent)" : undefined }}
                aria-expanded={fishOpen}
                aria-haspopup="true"
              >
                Fish
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200"
                  style={{ transform: fishOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <polyline points="2 5 7 10 12 5" />
                </svg>
              </button>

              {fishOpen && (
                <div
                  className="absolute left-1/2 top-full pt-2"
                  style={{ transform: "translateX(-50%)", minWidth: "180px" }}
                >
                  <div
                    className="rounded-xl border py-1.5 shadow-lg"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-light)",
                      boxShadow: "var(--shadow-lg)",
                    }}
                  >
                    {fishItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm font-medium transition-colors hover:text-[var(--accent)]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div style={{ borderTop: "1px solid var(--border-light)", margin: "4px 0" }} />
                    <Link
                      href="/fish"
                      className="block px-4 py-2.5 text-xs font-medium transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      View all species →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className="flex items-center gap-1 transition-colors duration-200 hover:text-[var(--accent)]"
                style={{ color: aboutOpen ? "var(--accent)" : undefined }}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
              >
                About
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200"
                  style={{ transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <polyline points="2 5 7 10 12 5" />
                </svg>
              </button>

              {aboutOpen && (
                <div
                  className="absolute left-1/2 top-full pt-2"
                  style={{ transform: "translateX(-50%)", minWidth: "180px" }}
                >
                  <div
                    className="rounded-xl border py-1.5 shadow-lg"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-light)",
                      boxShadow: "var(--shadow-lg)",
                    }}
                  >
                    <Link
                      href="/about"
                      className="block px-4 py-2.5 text-sm font-medium transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      About Us
                    </Link>
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm font-medium transition-colors hover:text-[var(--accent)]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <BookNowButton placement="cta_click_header" className="btn-primary hidden text-sm sm:inline-flex" />

            {/* Mobile hamburger */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
              style={{ color: "var(--text-primary)" }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-bold tracking-wide" style={{ color: "var(--text-primary)" }}>
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ color: "var(--text-primary)" }}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              <Link
                href="/trips"
                className="rounded-lg px-3 py-3 text-base font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMenuOpen(false)}
              >
                Trips
              </Link>

              {/* Fish expandable section */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setFishMobileOpen((v) => !v)}
                >
                  Fish
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200"
                    style={{ transform: fishMobileOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="3 6 8 11 13 6" />
                  </svg>
                </button>

                {fishMobileOpen && (
                  <div className="ml-3 flex flex-col gap-0.5 pb-1">
                    {fishItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/fish"
                      className="rounded-lg px-3 py-2.5 text-xs font-medium transition-colors"
                      style={{ color: "var(--text-light)" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      View all species →
                    </Link>
                  </div>
                )}
              </div>

              {/* About expandable section */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setAboutMobileOpen((v) => !v)}
                >
                  About
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200"
                    style={{ transform: aboutMobileOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="3 6 8 11 13 6" />
                  </svg>
                </button>

                {aboutMobileOpen && (
                  <div className="ml-3 flex flex-col gap-0.5 pb-1">
                    <Link
                      href="/about"
                      className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <BookNowButton placement="cta_click_header" className="btn-primary w-full text-center" />
            </div>

            <div className="mt-auto pt-8 text-sm" style={{ color: "var(--text-muted)" }}>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
