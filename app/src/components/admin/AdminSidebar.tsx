"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/trips", label: "Trips", icon: "🎣" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { href: "/admin/faqs", label: "FAQs", icon: "❓" },
  { href: "/admin/guide", label: "Guide", icon: "🧑‍✈️" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  { href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  }

  return (
    <aside
      className="flex w-full flex-col border-r md:w-60 md:min-h-screen"
      style={{ backgroundColor: "#1a2e1a", borderColor: "#2a4a2a" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: "#2a4a2a" }}>
        <Image src="/logo.png" alt="Castcadia" width={36} height={36} className="h-9 w-auto" />
        <div>
          <p className="text-sm font-bold text-white tracking-wide">CASTCADIA</p>
          <p className="text-xs" style={{ color: "#7fa87f" }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-row gap-1 overflow-x-auto px-2 py-2 md:flex-col md:overflow-visible md:py-4">
        {navItems.map((item) => {
          const isActive = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors"
              style={{
                backgroundColor: isActive ? "#2a4a2a" : "transparent",
                color: isActive ? "#fff" : "#a0c4a0",
              }}
            >
              <span className="text-base">{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="mt-auto border-t px-4 py-4 hidden md:block" style={{ borderColor: "#2a4a2a" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
          style={{ color: "#7fa87f" }}
        >
          ↗ View Live Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors text-left"
          style={{ color: "#7fa87f" }}
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}
