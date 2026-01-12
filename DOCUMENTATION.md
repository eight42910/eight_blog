# Minimal Notes ドキュメント

Minimal Notes は、文章が主役のタイポグラフィ重視ブログです。Next.js App Router + TypeScript + Tailwind CSS で構成し、最小の設計で静かな読み心地を目指しています。

## プロジェクト構成

- `content/posts/*.md`: Markdown 記事（frontmatter 付き）
- `src/app`: App Router のページ群
- `src/components`: 最小の UI コンポーネント
- `src/lib`: 記事読み込み・フォーマット・サイト情報

## コンテンツ形式

各記事は Markdown ファイルで管理します。

```md
---
title: "Post title"
date: "2025-02-01"
description: "一覧とメタデータに使う短い説明。"
tags: ["design", "note"]
draft: false
canonical: "https://example.com/original-post"
---

本文
```

補足:
- `draft: true` は本番ビルドで非表示になります。
- `canonical` は任意で、指定時のみ canonical URL に反映します。

## ルーティング

- `/`: 最新記事とタグへの導線
- `/posts`: 記事一覧（降順）
- `/posts/[slug]`: 記事詳細
- `/tags`: タグ一覧
- `/tags/[tag]`: タグ別一覧
- `/about`: About
- `404`: Not Found

## SEO / フィード

- Next.js の metadata API によるページ別メタデータ
- RSS: `/feed.xml`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

`NEXT_PUBLIC_SITE_URL` を設定して、RSS と sitemap の絶対URLを正しくします。

## デザイン方針

- 1カラム、行長 65–75ch
- モノトーン + 控えめなアクセント1色
- UI は最小限（ヘッダ/フッタ/記事カード程度）
- 余白とタイポグラフィ優先

## ローカル実行

```bash
npm run dev
```

```bash
npm run lint
npm run typecheck
npm run build
```

## 運用フロー（Obsidian からコピペ）

1. Obsidian で記事を書く（Markdown）。
2. 先頭に frontmatter を付ける。
3. `content/posts/` に `slug.md` として保存する。
4. 公開時は `draft: false` にする。

### 推奨テンプレート

```md
---
title: "Post title"
date: "2025-02-01"
description: "一覧とメタデータに使う短い説明。"
tags: ["design", "note"]
draft: false
canonical: "https://example.com/original-post"
---

本文
```

### 画像の扱い

- 画像は `public/images/` に配置し、Markdown から `/images/xxx.jpg` で参照する。
- ファイル名は `yyyy-mm-title-01.jpg` のように日時と内容が分かる形にする。
- 形式は `webp` または `jpg` を推奨（透過が必要なら `png`）。
- 画像は横幅 1600px 程度を上限にして軽量化する。

例:

```md
![図の説明](/images/2025-02-01-quiet-interface-01.jpg)
```

### 投稿の確認

- ローカルで `npm run dev` を実行し、見た目とリンクを確認する。
- 公開前に `npm run lint` と `npm run build` を通す。

## 公開前にやること（あなた側）

- `content/posts/` の記事内容を見直す（タイトル/日付/説明/タグ）。
- 画像を `public/images/` に整理して配置する。
- `src/lib/site.ts` の `title` / `description` / `author` を本番値にする。
- `NEXT_PUBLIC_SITE_URL` を `.env` かホスティング側の環境変数で用意する。
- `npm run lint` と `npm run build` を通す。
