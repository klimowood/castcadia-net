import Link from "next/link";
import { BookOnVallyButton } from "./BookOnVallyButton";

const navItems = [
  { href: "/trips", label: "Trips" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d1f1b]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-wide text-[#ecf4f2]">
          Castcadia
        </Link>

        <nav className="hidden gap-6 text-sm text-[#c7d7d3] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <BookOnVallyButton placement="cta_click_valy_header" className="btn-primary text-sm" />
      </div>
    </header>
  );
}
