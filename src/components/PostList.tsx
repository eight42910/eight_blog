import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import TagList from "@/components/TagList";

type PostListProps = {
  posts: PostMeta[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="space-y-10">
      {posts.map((post) => (
        <li key={post.slug} className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-[color:var(--color-muted)]">
              {formatDate(post.date)}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              <Link href={`/posts/${post.slug}`} className="hover:opacity-70">
                {post.title}
              </Link>
            </h2>
          </div>
          <p className="text-[color:var(--color-muted)]">{post.description}</p>
          <TagList tags={post.tags} />
        </li>
      ))}
    </ul>
  );
}
