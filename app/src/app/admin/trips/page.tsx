"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TripForm } from "@/components/admin/TripForm";
import { Toast } from "@/components/admin/Toast";

type Trip = {
  id: string;
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

export default function TripsAdmin() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editing, setEditing] = useState<Trip | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const loadTrips = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/trips");
    if (res.ok) setTrips(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    let canceled = false;

    fetch("/api/admin/trips")
      .then(async (res) => {
        if (res.ok && !canceled) setTrips(await res.json());
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  async function handleSave(trip: Partial<Trip>) {
    const method = trip.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/trips", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });

    if (res.ok) {
      setToast({ msg: trip.id ? "Trip updated!" : "Trip created!", type: "success" });
      setEditing(null);
      setCreating(false);
      loadTrips();
    } else {
      const { error } = await res.json();
      setToast({ msg: error || "Failed to save", type: "error" });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this trip? This cannot be undone.")) return;
    const res = await fetch("/api/admin/trips", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setToast({ msg: "Trip deleted", type: "success" });
      loadTrips();
    }
  }

  if (editing || creating) {
    return (
      <div>
        <AdminPageHeader
          title={editing ? "Edit Trip" : "New Trip"}
          onBack={() => { setEditing(null); setCreating(false); }}
        />
        <TripForm
          trip={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setCreating(false); }}
        />
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="Trips" count={trips.length}>
        <button
          onClick={() => setCreating(true)}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: "#C06B2D" }}
        >
          + New Trip
        </button>
      </AdminPageHeader>

      {loading ? (
        <p className="text-sm" style={{ color: "#7a7268" }}>Loading...</p>
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm"
              style={{ border: "1px solid #e5ddd5" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: trip.is_active ? "#22c55e" : "#9ca3af" }}
                  title={trip.is_active ? "Active" : "Inactive"}
                />
                <div>
                  <p className="font-semibold" style={{ color: "#2d2a26" }}>{trip.title}</p>
                  <p className="text-xs" style={{ color: "#a09889" }}>
                    {trip.pricing_model === "per-boat" ? `$${trip.price_usd}/boat` : `$${trip.price_usd}/person`}
                    {" · "}{trip.duration_hours}h · {trip.species.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {trip.is_featured && (
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
                    Featured
                  </span>
                )}
                <button
                  onClick={() => setEditing(trip)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium"
                  style={{ backgroundColor: "#f5f0eb", color: "#4a4540" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium"
                  style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}
                >
                  Delete
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
