import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TagList from "@/components/TagList";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm text-[color:var(--color-muted)]">{formatDate(post.date)}</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
        <p className="text-lg text-[color:var(--color-muted)] leading-relaxed">
          {post.description}
        </p>
        <TagList tags={post.tags} />
      </header>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
