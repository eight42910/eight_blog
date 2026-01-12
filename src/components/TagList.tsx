import Link from "next/link";
import { slugifyTag } from "@/lib/posts";

type TagListProps = {
  tags: string[];
  className?: string;
};

export default function TagList({ tags, className }: TagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={`flex flex-wrap gap-2 text-sm ${className ?? ""}`.trim()}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${slugifyTag(tag)}`}
            className="rounded-full border border-[color:var(--color-border)] px-3 py-1 text-[color:var(--color-muted)] transition hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-soft)] hover:text-[color:var(--color-fg)]"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
