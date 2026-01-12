import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Posts",
  description: "All posts from Minimal Notes.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
        <p className="text-[color:var(--color-muted)]">更新順に並んだすべての記事。</p>
      </header>
      <PostList posts={posts} />
    </div>
  );
}
