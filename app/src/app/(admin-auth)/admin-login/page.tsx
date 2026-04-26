"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#f5f0eb" }}>
      <div className="w-full max-w-sm">
        <div className="rounded-xl bg-white p-8 shadow-lg" style={{ border: "1px solid #e5ddd5" }}>
          <div className="mb-6 flex flex-col items-center">
            <Image src="/logo.png" alt="Castcadia" width={64} height={64} className="h-16 w-auto" />
            <h1 className="mt-3 text-xl font-bold" style={{ color: "#2d2a26", fontFamily: "var(--font-heading, 'Georgia', serif)" }}>
              Admin Panel
            </h1>
            <p className="mt-1 text-sm" style={{ color: "#7a7268" }}>
              Sign in to manage your site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium" style={{ color: "#4a4540" }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                style={{
                  borderColor: error ? "#dc2626" : "#e5ddd5",
                  color: "#2d2a26",
                  ...(error ? {} : { focusRingColor: "#C06B2D" }),
                }}
                autoFocus
              />
              {error && (
                <p className="mt-1 text-sm" style={{ color: "#dc2626" }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#C06B2D" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs" style={{ color: "#a09889" }}>
          Castcadia Outfitters &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
