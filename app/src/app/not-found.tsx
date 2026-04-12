import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-wrap text-center">
      <p className="text-6xl font-bold" style={{ color: "var(--accent)" }}>404</p>
      <h1 className="mt-4 text-2xl">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-base" style={{ color: "var(--text-secondary)" }}>
        Looks like this page swam away. Let&apos;s get you back on course.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/trips" className="btn-secondary">View Trips</Link>
      </div>
    </section>
  );
}
