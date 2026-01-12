import { notFound } from "next/navigation";
import PostList from "@/components/PostList";
import { getAllTags, getPostsByTagSlug } from "@/lib/posts";

type PageProps = {
  params: { tag: string };
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const tag = getAllTags().find((item) => item.slug === params.tag);

  if (!tag) {
    return {};
  }

  return {
    title: `Tag: ${tag.tag}`,
    description: `${tag.tag} の記事一覧。`,
  };
}

export default function TagPage({ params }: PageProps) {
  const tag = getAllTags().find((item) => item.slug === params.tag);
  const posts = getPostsByTagSlug(params.tag);

  if (!tag) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--color-muted)]">Tag</p>
        <h1 className="text-3xl font-semibold tracking-tight">{tag.tag}</h1>
        <p className="text-[color:var(--color-muted)]">{tag.count} posts</p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
