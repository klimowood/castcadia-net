"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Toast } from "@/components/admin/Toast";

type FAQ = { id?: string; question: string; answer: string; category: string; display_order: number };
const emptyFaq: FAQ = { question: "", answer: "", category: "preparation", display_order: 0 };
const categories = ["booking", "preparation", "logistics", "policy", "safety"];
const categoryColors: Record<string, string> = { booking: "#C06B2D", preparation: "#2A7B6F", logistics: "#4a6741", policy: "#6b5b3e", safety: "#b45309" };

export default function FAQsAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/faqs");
    if (res.ok) setFaqs(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    let canceled = false;

    fetch("/api/admin/faqs")
      .then(async (res) => {
        if (res.ok && !canceled) setFaqs(await res.json());
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  async function save(faq: FAQ) {
    const method = faq.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/faqs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(faq) });
    if (res.ok) { setToast({ msg: faq.id ? "FAQ updated!" : "FAQ added!", type: "success" }); setEditing(null); load(); }
    else { const { error } = await res.json(); setToast({ msg: error, type: "error" }); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch("/api/admin/faqs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setToast({ msg: "FAQ deleted", type: "success" }); load();
  }

  const inputStyle = { borderColor: "#e5ddd5", color: "#2d2a26" };

  if (editing) {
    return (
      <div>
        <AdminPageHeader title={editing.id ? "Edit FAQ" : "New FAQ"} onBack={() => setEditing(null)} />
        <form onSubmit={(e) => { e.preventDefault(); save(editing); }} className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Question</label>
                <input type="text" value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Answer</label>
                <textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={4} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Category</label>
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle}>
                    {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Display Order</label>
                  <input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "#C06B2D" }}>{editing.id ? "Update" : "Create"} FAQ</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-6 py-2.5 text-sm" style={{ borderColor: "#e5ddd5", color: "#7a7268" }}>Cancel</button>
          </div>
        </form>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="FAQs" count={faqs.length}>
        <button onClick={() => setEditing({ ...emptyFaq, display_order: faqs.length + 1 })} className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#C06B2D" }}>+ New FAQ</button>
      </AdminPageHeader>
      {loading ? <p className="text-sm" style={{ color: "#7a7268" }}>Loading...</p> : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="flex items-start justify-between rounded-xl bg-white px-5 py-4 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: categoryColors[faq.category] || "#7a7268" }}>{faq.category}</span>
                  <span className="text-xs" style={{ color: "#a09889" }}>#{faq.display_order}</span>
                </div>
                <p className="mt-1 font-semibold" style={{ color: "#2d2a26" }}>{faq.question}</p>
                <p className="mt-0.5 text-sm" style={{ color: "#7a7268" }}>{faq.answer.substring(0, 100)}...</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => setEditing(faq)} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ backgroundColor: "#f5f0eb", color: "#4a4540" }}>Edit</button>
                <button onClick={() => remove(faq.id!)} className="rounded-lg px-3 py-1.5 text-xs font-medium" style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
