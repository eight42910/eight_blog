import Link from "next/link";
import PostList from "@/components/PostList";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const tags = getAllTags();

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          Latest notes
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Minimal words, deliberate spacing.
        </h1>
        <p className="max-w-[60ch] text-[color:var(--color-muted)]">
          文章が静かに立つための、最小構成のブログ。思考の余白を残すために、必要以上の機能は持たない。
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
            Explore
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-fg)]"
            >
              {tag.tag} <span className="text-xs text-[color:var(--color-muted)]">({tag.count})</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
