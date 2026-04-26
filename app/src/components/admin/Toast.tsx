"use client";

import { useEffect } from "react";

export function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg"
      style={{ backgroundColor: type === "success" ? "#22c55e" : "#dc2626" }}
    >
      {type === "success" ? "✓" : "✕"} {msg}
    </div>
  );
}
