export const metadata = {
  title: "About",
  description: "About Minimal Notes.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-[color:var(--color-muted)]">このブログの方針と、書く人について。</p>
      </header>
      <div className="markdown">
        <p>
          Minimal Notes は「究極にシンプルなのに、品があり、静かにかっこいい」ことを目指した個人ブログです。
          過剰な装飾は避け、タイポグラフィと余白で読みやすさを整えています。
        </p>
        <p>
          書き手は Eito。プロダクト設計と実装の間にある曖昧さが好きで、言葉の密度を整えることに関心があります。
          ここでは観察と設計のメモを短く記録していきます。
        </p>
      </div>
    </div>
  );
}
