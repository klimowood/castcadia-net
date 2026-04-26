"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Toast } from "@/components/admin/Toast";

type Guide = { id: string; name: string; title: string; bio: string; credentials: string[]; image_url?: string; years_experience?: number; is_primary?: boolean };

const emptyGuide: Omit<Guide, "id"> = { name: "", title: "", bio: "", credentials: [], is_primary: false };

export default function GuideAdmin() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Guide | (Omit<Guide, "id"> & { id?: undefined }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [credInput, setCredInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/guide");
    if (res.ok) {
      const data = await res.json();
      setGuides(Array.isArray(data) ? data : [data]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let canceled = false;

    fetch("/api/admin/guide")
      .then(async (res) => {
        if (!res.ok || canceled) return;
        const data = await res.json();
        setGuides(Array.isArray(data) ? data : [data]);
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const res = await fetch("/api/admin/guide", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      setToast({ msg: isNew ? "Guide added!" : "Guide updated!", type: "success" });
      setEditing(null);
      await load();
    } else {
      setToast({ msg: "Failed to save", type: "error" });
    }
    setSaving(false);
  }

  async function remove(guide: Guide) {
    if (!confirm(`Remove ${guide.name}?`)) return;
    const res = await fetch("/api/admin/guide", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: guide.id }),
    });
    if (res.ok) {
      setToast({ msg: "Guide removed", type: "success" });
      await load();
    } else {
      setToast({ msg: "Failed to remove", type: "error" });
    }
  }

  function addCred() {
    if (!credInput.trim() || !editing) return;
    setEditing({ ...editing, credentials: [...editing.credentials, credInput.trim()] });
    setCredInput("");
  }

  function removeCred(i: number) {
    if (!editing) return;
    setEditing({ ...editing, credentials: editing.credentials.filter((_, idx) => idx !== i) });
  }

  const inputStyle = { borderColor: "#e5ddd5", color: "#2d2a26" };

  if (loading) return <p className="p-6 text-sm" style={{ color: "#7a7268" }}>Loading...</p>;

  // ── Editing / Adding form ──
  if (editing) {
    return (
      <div>
        <AdminPageHeader title={editing.id ? "Edit Guide" : "Add Guide"}>
          <button onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm font-medium" style={{ borderColor: "#e5ddd5", color: "#4a4540" }}>
            Cancel
          </button>
        </AdminPageHeader>

        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Name</label>
                <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
              <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Title</label>
                <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} placeholder="e.g. Lead Guide" /></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Bio</label>
                <textarea value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} rows={5} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Photo</label>
                <div className="flex items-start gap-4">
                  {editing.image_url ? (
                    <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg" style={{ border: "1px solid #e5ddd5" }}>
                      <Image src={editing.image_url} alt="Guide photo" fill className="object-cover object-top" />
                    </div>
                  ) : (
                    <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "#f5f0eb", border: "1px solid #e5ddd5" }}>
                      <span className="text-3xl opacity-40">👤</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        const form = new FormData();
                        form.append("file", file);
                        form.append("folder", "guides");
                        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
                        if (res.ok) {
                          const { url } = await res.json();
                          setEditing({ ...editing, image_url: url });
                          setToast({ msg: "Photo uploaded!", type: "success" });
                        } else {
                          setToast({ msg: "Upload failed", type: "error" });
                        }
                        setUploading(false);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="rounded-lg border px-4 py-2 text-sm font-medium"
                      style={{ borderColor: "#e5ddd5", color: "#4a4540" }}
                    >
                      {uploading ? "Uploading..." : editing.image_url ? "Change Photo" : "Upload Photo"}
                    </button>
                    {editing.image_url && (
                      <button
                        type="button"
                        onClick={() => setEditing({ ...editing, image_url: "" })}
                        className="text-left text-xs"
                        style={{ color: "#dc2626" }}
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm" style={{ color: "#4a4540" }}>
                  <input type="checkbox" checked={editing.is_primary ?? false} onChange={(e) => setEditing({ ...editing, is_primary: e.target.checked })} /> Primary guide (shown on About page)
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>Credentials</h3>
            <div className="flex gap-2">
              <input type="text" value={credInput} onChange={(e) => setCredInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCred(); } }}
                placeholder="Add credential and press Enter" className="flex-1 rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
              <button type="button" onClick={addCred} className="rounded-lg px-3 py-2 text-sm font-medium text-white" style={{ backgroundColor: "#2A7B6F" }}>Add</button>
            </div>
            <ul className="mt-3 space-y-2">
              {editing.credentials.map((c, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm" style={{ backgroundColor: "#f5f0eb" }}>
                  <span>{c}</span>
                  <button onClick={() => removeCred(i)} className="text-xs font-bold" style={{ color: "#dc2626" }}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={save} disabled={saving} className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "#C06B2D" }}>
            {saving ? "Saving..." : editing.id ? "Save Changes" : "Add Guide"}
          </button>
        </div>

        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  // ── Guide list ──
  return (
    <div>
      <AdminPageHeader title="Guides" count={guides.length}>
        <button onClick={() => setEditing({ ...emptyGuide })} className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#C06B2D" }}>
          + Add Guide
        </button>
      </AdminPageHeader>

      {guides.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
          <p className="text-sm" style={{ color: "#7a7268" }}>No guides yet. Add your first guide to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {guides.map((g) => (
            <div key={g.id} className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold" style={{ color: "#2d2a26" }}>{g.name}</h3>
                  {g.is_primary && (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ backgroundColor: "#2A7B6F" }}>Primary</span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "#7a7268" }}>{g.title}</p>
                {g.credentials.length > 0 && (
                  <p className="mt-1 text-xs" style={{ color: "#a09890" }}>{g.credentials.length} credential{g.credentials.length !== 1 ? "s" : ""}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(g); setCredInput(""); }} className="rounded-lg border px-3 py-1.5 text-xs font-medium" style={{ borderColor: "#e5ddd5", color: "#4a4540" }}>
                  Edit
                </button>
                <button onClick={() => remove(g)} className="rounded-lg border px-3 py-1.5 text-xs font-medium" style={{ borderColor: "#fecaca", color: "#dc2626" }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
