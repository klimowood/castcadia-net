"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Toast } from "@/components/admin/Toast";

type Review = {
  id?: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: string;
  trip_type: string;
  is_featured: boolean;
};

const emptyReview: Review = { author: "", rating: 5, text: "", date: new Date().toISOString().split("T")[0], source: "google", trip_type: "", is_featured: false };

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editing, setEditing] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/reviews");
    if (res.ok) setReviews(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    let canceled = false;

    fetch("/api/admin/reviews")
      .then(async (res) => {
        if (res.ok && !canceled) setReviews(await res.json());
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  async function save(review: Review) {
    const method = review.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/reviews", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(review) });
    if (res.ok) { setToast({ msg: review.id ? "Review updated!" : "Review added!", type: "success" }); setEditing(null); load(); }
    else { const { error } = await res.json(); setToast({ msg: error || "Failed", type: "error" }); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this review?")) return;
    await fetch("/api/admin/reviews", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setToast({ msg: "Review deleted", type: "success" }); load();
  }

  async function toggleFeatured(review: Review) {
    await save({ ...review, is_featured: !review.is_featured });
  }

  const inputStyle = { borderColor: "#e5ddd5", color: "#2d2a26" };

  if (editing) {
    return (
      <div>
        <AdminPageHeader title={editing.id ? "Edit Review" : "Add Review"} onBack={() => setEditing(null)} />
        <form onSubmit={(e) => { e.preventDefault(); save(editing); }} className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Author</label>
                <input type="text" value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} required /></div>
              <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Rating</label>
                <select value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)}{"☆".repeat(5 - n)}</option>)}
                </select></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Review Text</label>
                <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={4} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} required /></div>
              <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Date</label>
                <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} /></div>
              <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Source</label>
                <select value={editing.source} onChange={(e) => setEditing({ ...editing, source: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle}>
                  <option value="google">Google</option><option value="facebook">Facebook</option><option value="direct">Direct</option>
                </select></div>
              <div><label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Trip Type</label>
                <input type="text" value={editing.trip_type} onChange={(e) => setEditing({ ...editing, trip_type: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} placeholder="e.g., Bass & Pike" /></div>
              <div className="flex items-end"><label className="flex items-center gap-2 text-sm" style={{ color: "#4a4540" }}>
                <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /> Featured on homepage</label></div>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "#C06B2D" }}>{editing.id ? "Update" : "Add"} Review</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-6 py-2.5 text-sm" style={{ borderColor: "#e5ddd5", color: "#7a7268" }}>Cancel</button>
          </div>
        </form>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="Reviews" count={reviews.length}>
        <button onClick={() => setEditing({ ...emptyReview })} className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#C06B2D" }}>+ Add Review</button>
      </AdminPageHeader>

      {loading ? <p className="text-sm" style={{ color: "#7a7268" }}>Loading...</p> : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="flex items-start justify-between rounded-xl bg-white px-5 py-4 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: "#2d2a26" }}>{r.author}</span>
                  <span className="text-xs" style={{ color: "#d4a028" }}>{"★".repeat(r.rating)}</span>
                  <span className="rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: "#f5f0eb", color: "#7a7268" }}>{r.source}</span>
                  {r.is_featured && <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>Featured</span>}
                </div>
                <p className="mt-1 text-sm" style={{ color: "#7a7268" }}>{r.text.substring(0, 120)}...</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => toggleFeatured(r)} className="rounded-lg px-2 py-1 text-xs" style={{ backgroundColor: r.is_featured ? "#fef3c7" : "#f5f0eb" }} title="Toggle featured">{r.is_featured ? "★" : "☆"}</button>
                <button onClick={() => setEditing(r)} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ backgroundColor: "#f5f0eb", color: "#4a4540" }}>Edit</button>
                <button onClick={() => remove(r.id!)} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
