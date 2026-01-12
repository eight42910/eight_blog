import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostFrontMatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft?: boolean;
  canonical?: string;
};

export type PostMeta = PostFrontMatter & {
  slug: string;
};

export type Post = PostMeta & {
  content: string;
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

const isProduction = process.env.NODE_ENV === "production";

function getMarkdownFiles() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function parsePost(fileName: string) {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontMatter = data as PostFrontMatter;

  return {
    slug,
    frontMatter: {
      title: frontMatter.title,
      date: frontMatter.date,
      description: frontMatter.description,
      tags: frontMatter.tags ?? [],
      draft: frontMatter.draft ?? false,
      canonical: frontMatter.canonical,
    },
    content,
  };
}

function isDraft(post: PostMeta) {
  return Boolean(post.draft);
}

export function getAllPosts(): PostMeta[] {
  const posts = getMarkdownFiles().map((fileName) => {
    const { slug, frontMatter } = parsePost(fileName);

    return {
      slug,
      ...frontMatter,
    } satisfies PostMeta;
  });

  const visiblePosts = isProduction ? posts.filter((post) => !isDraft(post)) : posts;

  return visiblePosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fileName = getMarkdownFiles().find((file) => file.replace(/\.mdx?$/, "") === slug);

  if (!fileName) {
    return null;
  }

  const { frontMatter, content } = parsePost(fileName);
  const result = await remark().use(html).process(content);
  const contentHtml = result.toString();

  const post: Post = {
    slug,
    ...frontMatter,
    content,
    contentHtml,
  };

  if (isProduction && isDraft(post)) {
    return null;
  }

  return post;
}

export function getAllTags() {
  const tagMap = new Map<string, { tag: string; slug: string; count: number }>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      const existing = tagMap.get(tag);

      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(tag, { tag, slug, count: 1 });
      }
    }
  }

  return Array.from(tagMap.values()).sort((a, b) => a.tag.localeCompare(b.tag, "ja"));
}

export function getPostsByTagSlug(tagSlug: string) {
  return getAllPosts().filter((post) => post.tags.some((tag) => slugifyTag(tag) === tagSlug));
}

export function slugifyTag(tag: string) {
  return encodeURIComponent(tag.trim().toLowerCase().replace(/\s+/g, "-"));
}
