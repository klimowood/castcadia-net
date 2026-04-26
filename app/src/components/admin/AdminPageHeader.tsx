"use client";

export function AdminPageHeader({
  title,
  count,
  onBack,
  children,
}: {
  title: string;
  count?: number;
  onBack?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-lg p-1.5 transition-colors hover:bg-white"
            style={{ color: "#7a7268" }}
          >
            ← Back
          </button>
        )}
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "#2d2a26", fontFamily: "var(--font-heading, Georgia, serif)" }}
          >
            {title}
            {count !== undefined && (
              <span className="ml-2 text-base font-normal" style={{ color: "#a09889" }}>
                ({count})
              </span>
            )}
          </h1>
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
