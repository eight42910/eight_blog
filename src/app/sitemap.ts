import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/posts`, lastModified: new Date() },
    { url: `${site.url}/tags`, lastModified: new Date() },
    { url: `${site.url}/about`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${site.url}/posts/${post.slug}`,
      lastModified: new Date(post.date),
    })),
    ...tags.map((tag) => ({
      url: `${site.url}/tags/${tag.slug}`,
      lastModified: new Date(),
    })),
  ];
}
