import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = post.canonical ?? `${site.url}/posts/${post.slug}`;

      return `\n    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n      <description>${escapeXml(post.description)}</description>\n    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n  <rss version="2.0">\n  <channel>\n    <title>${escapeXml(site.title)}</title>\n    <link>${site.url}</link>\n    <description>${escapeXml(site.description)}</description>\n    <language>${site.locale}</language>\n    ${items}\n  </channel>\n  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
