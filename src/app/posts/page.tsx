import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Posts",
  description: "Wine, food, and AI notes.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Posts</h1>
        <p className="max-w-[60ch] text-[color:var(--color-muted)]">
          ワイン、食事、AI活用の記録。
        </p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
