"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookNowButton } from "./BookNowButton";

const navItems = [
  { href: "/trips", label: "Trips" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            {navItems.map((item) => (
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
              {navItems.map((item) => (
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
              <p>(208) 699-5636</p>
              <p>info@castcadia.net</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
