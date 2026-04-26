"use client";

import { useState } from "react";

type Trip = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration_hours: number;
  pricing_model: string;
  price_usd: number;
  base_anglers?: number;
  extra_angler_price_usd?: number;
  min_anglers?: number;
  max_anglers: number;
  species: string[];
  location: string;
  season_label: string;
  includes: string[];
  not_included: string[];
  image_url?: string;
  catch_and_release: boolean;
  is_featured: boolean;
  is_active: boolean;
  booking_path?: string;
  display_order: number;
};

const defaultTrip: Omit<Trip, "id"> = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  duration_hours: 8,
  pricing_model: "per-boat",
  price_usd: 0,
  base_anglers: 2,
  extra_angler_price_usd: 0,
  max_anglers: 3,
  species: [],
  location: "",
  season_label: "",
  includes: [],
  not_included: [],
  catch_and_release: false,
  is_featured: false,
  is_active: true,
  display_order: 0,
};

const inputStyle = {
  borderColor: "#e5ddd5",
  color: "#2d2a26",
};

export function TripForm({
  trip,
  onSave,
  onCancel,
}: {
  trip?: Trip;
  onSave: (data: Partial<Trip>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Trip>({ ...defaultTrip, ...trip } as Trip);
  const [saving, setSaving] = useState(false);
  const [speciesInput, setSpeciesInput] = useState("");
  const [includesInput, setIncludesInput] = useState("");
  const [notIncInput, setNotIncInput] = useState("");

  function set(key: keyof Trip, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  function addToList(key: "species" | "includes" | "not_included", value: string, setter: (v: string) => void) {
    if (!value.trim()) return;
    set(key, [...(form[key] || []), value.trim()]);
    setter("");
  }

  function removeFromList(key: "species" | "includes" | "not_included", idx: number) {
    set(key, (form[key] || []).filter((_: string, i: number) => i !== idx));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>Basic Info</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => { set("title", e.target.value); if (!trip) set("slug", autoSlug(e.target.value)); }}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Subtitle</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Season</label>
            <input
              type="text"
              value={form.season_label}
              onChange={(e) => set("season_label", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
              placeholder="e.g., April – November"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>Pricing</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Model</label>
            <select
              value={form.pricing_model}
              onChange={(e) => set("pricing_model", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
            >
              <option value="per-boat">Per Boat</option>
              <option value="per-seat">Per Seat</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Price (USD)</label>
            <input
              type="number"
              value={form.price_usd}
              onChange={(e) => set("price_usd", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Duration (hours)</label>
            <input
              type="number"
              value={form.duration_hours}
              onChange={(e) => set("duration_hours", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
            />
          </div>
          {form.pricing_model === "per-boat" && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Base Anglers</label>
                <input
                  type="number"
                  value={form.base_anglers || 0}
                  onChange={(e) => set("base_anglers", parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Extra Angler Price</label>
                <input
                  type="number"
                  value={form.extra_angler_price_usd || 0}
                  onChange={(e) => set("extra_angler_price_usd", parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  style={inputStyle}
                />
              </div>
            </>
          )}
          {form.pricing_model === "per-seat" && (
            <div>
              <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Min Anglers</label>
              <input
                type="number"
                value={form.min_anglers || 0}
                onChange={(e) => set("min_anglers", parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={inputStyle}
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Max Anglers</label>
            <input
              type="number"
              value={form.max_anglers}
              onChange={(e) => set("max_anglers", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>Species</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={speciesInput}
            onChange={(e) => setSpeciesInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToList("species", speciesInput, setSpeciesInput); } }}
            placeholder="Add species and press Enter"
            className="flex-1 rounded-lg border px-3 py-2 text-sm"
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => addToList("species", speciesInput, setSpeciesInput)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#2A7B6F" }}
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.species.map((s, i) => (
            <span key={i} className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: "#f0fdf4", color: "#166534" }}>
              {s}
              <button type="button" onClick={() => removeFromList("species", i)} className="ml-1">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>What&apos;s Included</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium" style={{ color: "#7a7268" }}>Included</label>
            <div className="flex gap-2">
              <input type="text" value={includesInput} onChange={(e) => setIncludesInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToList("includes", includesInput, setIncludesInput); } }}
                className="flex-1 rounded-lg border px-3 py-2 text-sm" style={inputStyle} placeholder="Add item" />
              <button type="button" onClick={() => addToList("includes", includesInput, setIncludesInput)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-white" style={{ backgroundColor: "#2A7B6F" }}>+</button>
            </div>
            <ul className="mt-2 space-y-1">
              {(form.includes || []).map((item, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg px-2 py-1 text-sm" style={{ backgroundColor: "#f5f0eb" }}>
                  <span>✓ {item}</span>
                  <button type="button" onClick={() => removeFromList("includes", i)} className="text-xs" style={{ color: "#dc2626" }}>×</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium" style={{ color: "#7a7268" }}>Not Included</label>
            <div className="flex gap-2">
              <input type="text" value={notIncInput} onChange={(e) => setNotIncInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToList("not_included", notIncInput, setNotIncInput); } }}
                className="flex-1 rounded-lg border px-3 py-2 text-sm" style={inputStyle} placeholder="Add item" />
              <button type="button" onClick={() => addToList("not_included", notIncInput, setNotIncInput)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-white" style={{ backgroundColor: "#C06B2D" }}>+</button>
            </div>
            <ul className="mt-2 space-y-1">
              {(form.not_included || []).map((item, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg px-2 py-1 text-sm" style={{ backgroundColor: "#fef2f2" }}>
                  <span>✕ {item}</span>
                  <button type="button" onClick={() => removeFromList("not_included", i)} className="text-xs" style={{ color: "#dc2626" }}>×</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: "1px solid #e5ddd5" }}>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider" style={{ color: "#7a7268" }}>Options</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Booking Path</label>
            <input
              type="text"
              value={form.booking_path || ""}
              onChange={(e) => set("booking_path", e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>Display Order</label>
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => set("display_order", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={inputStyle}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm" style={{ color: "#4a4540" }}>
            <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: "#4a4540" }}>
            <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: "#4a4540" }}>
            <input type="checkbox" checked={form.catch_and_release} onChange={(e) => set("catch_and_release", e.target.checked)} />
            Catch &amp; Release Only
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: "#C06B2D" }}
        >
          {saving ? "Saving..." : trip ? "Update Trip" : "Create Trip"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-6 py-2.5 text-sm font-medium"
          style={{ borderColor: "#e5ddd5", color: "#7a7268" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
