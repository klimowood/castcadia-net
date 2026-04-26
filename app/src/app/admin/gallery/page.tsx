"use client";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function GalleryAdmin() {
  return (
    <div>
      <AdminPageHeader title="Gallery" />
      <div className="rounded-xl bg-white p-8 text-center shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
        <span className="text-4xl">🖼️</span>
        <h3 className="mt-3 text-lg font-semibold" style={{ color: "#2d2a26" }}>Image Gallery</h3>
        <p className="mt-1 text-sm" style={{ color: "#7a7268" }}>
          Upload and manage photos for your trips and site. Coming soon — upload your Instagram export photos here.
        </p>
        <p className="mt-4 text-xs" style={{ color: "#a09889" }}>
          Images will be stored in Supabase Storage (free tier: 1GB)
        </p>
      </div>
    </div>
  );
}
