import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata = {
  title: "Tags",
  description: "Browse posts by tag.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Tags</h1>
        <p className="text-[color:var(--color-muted)]">テーマ別に記事を探す。</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="rounded-2xl border border-[color:var(--color-border)] px-5 py-4 transition hover:border-[color:var(--color-accent)]"
          >
            <div className="text-lg font-semibold">{tag.tag}</div>
            <p className="text-sm text-[color:var(--color-muted)]">{tag.count} posts</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
