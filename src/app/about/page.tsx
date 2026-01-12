export const metadata = {
  title: "About",
  description: "About Wine, Food, and AI.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">About</h1>
        <p className="max-w-[60ch] text-[color:var(--color-muted)]">
          このブログの方針と、記録の軸。
        </p>
      </header>
      <div className="markdown">
        <p>
          Wine, Food, and AI は、ワインの学習ログ、食事のペアリング、AI活用の実験を記録する個人ブログです。
          文章と余白を主役にして、静かな読み心地を優先します。
        </p>
        <p>
          ワインはテイスティングと学習の積み上げを。食事は健康的で最高に美味しい体験を。
          AIは手間や代替の可能性を探り、日常を整えるための道具として活用します。
        </p>
      </div>
    </div>
  );
}
