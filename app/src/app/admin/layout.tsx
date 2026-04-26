import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — Castcadia Outfitters",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f5f0eb;
        }
        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          max-width: 1200px;
        }
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column; }
          .admin-main { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
