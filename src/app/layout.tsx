import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.title}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    url: site.url,
    siteName: site.title,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)] antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <div className="mx-auto flex min-h-screen w-full max-w-[90ch] flex-col px-6">
          <header className="border-b border-[color:var(--color-border)] py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <Link href="/" className="text-2xl font-semibold tracking-tight">
                  {site.title}
                </Link>
                <p className="text-sm text-[color:var(--color-muted)]">{site.description}</p>
              </div>
              <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-[color:var(--color-muted)]">
                <Link className="transition hover:text-[color:var(--color-fg)]" href="/posts">
                  Posts
                </Link>
                <Link className="transition hover:text-[color:var(--color-fg)]" href="/tags">
                  Tags
                </Link>
                <Link className="transition hover:text-[color:var(--color-fg)]" href="/about">
                  About
                </Link>
              </nav>
            </div>
          </header>
          <main id="content" className="flex-1 py-12">
            {children}
          </main>
          <footer className="border-t border-[color:var(--color-border)] py-10 text-sm text-[color:var(--color-muted)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} {site.author}</p>
              <p className="text-xs">Built with calm, written with intent.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
