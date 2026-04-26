"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Toast } from "@/components/admin/Toast";

type Settings = { id: string; phone: string; email: string; instagram: string; facebook: string; booking_url: string; tagline: string; address?: string };

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    let canceled = false;

    fetch("/api/admin/settings")
      .then(async (res) => {
        if (res.ok && !canceled) setSettings(await res.json());
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    if (res.ok) setToast({ msg: "Settings saved!", type: "success" });
    else setToast({ msg: "Failed to save", type: "error" });
    setSaving(false);
  }

  const inputStyle = { borderColor: "#e5ddd5", color: "#2d2a26" };

  if (loading) return <p className="text-sm" style={{ color: "#7a7268" }}>Loading...</p>;
  if (!settings) return <p className="text-sm" style={{ color: "#7a7268" }}>No settings found. Seed the database first.</p>;

  return (
    <div>
      <AdminPageHeader title="Site Settings" />

      <div className="space-y-6">
        <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>Contact Info</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Phone</label>
              <input type="text" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
            <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Email</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Tagline</label>
              <input type="text" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
            <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Address</label>
              <input type="text" value={settings.address || ""} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>Social & Booking</h3>
          <div className="grid gap-4 sm:grid-cols-1">
            <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Instagram URL</label>
              <input type="url" value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
            <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Facebook URL</label>
              <input type="url" value={settings.facebook} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
            <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Booking URL</label>
              <input type="url" value={settings.booking_url} onChange={(e) => setSettings({ ...settings, booking_url: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
          </div>
        </div>

        <button onClick={save} disabled={saving} className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "#C06B2D" }}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
