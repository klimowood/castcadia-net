import { BookNowButton } from "./BookNowButton";

export function StickyMobileCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t p-3 md:hidden"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Guided trips from</p>
          <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>$285<span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>/person</span></p>
        </div>
        <BookNowButton
          placement="cta_click_sticky_mobile"
          className="btn-primary flex-1 text-center"
        />
      </div>
    </div>
  );
}
