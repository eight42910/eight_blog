import Link from "next/link";
import PostList from "@/components/PostList";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const tags = getAllTags();

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-muted)]">
          Wine / Food / AI
        </p>
        <h1 className="max-w-[22ch] text-3xl font-semibold tracking-tight md:text-5xl md:leading-tight">
          学びと食事と技術の、静かな記録。
        </h1>
        <p className="max-w-[60ch] text-[color:var(--color-muted)] leading-relaxed">
          ワインの学習ログ、食事のペアリング、AI活用の実験を、余白を持って積み上げていく。
        </p>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest</h2>
          <Link className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]" href="/posts">
            View all
          </Link>
        </div>
        <PostList posts={posts} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tags</h2>
          <Link className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]" href="/tags">
            Browse
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-muted)] transition hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-fg)]"
            >
              {tag.tag} <span className="text-xs text-[color:var(--color-muted)]">({tag.count})</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
