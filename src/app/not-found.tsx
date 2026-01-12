import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--color-muted)]">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-[color:var(--color-muted)]">探しているページは見つかりませんでした。</p>
      <Link className="text-sm" href="/">
        Back to home
      </Link>
    </div>
  );
}
