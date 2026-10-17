import Link from "next/link";
import packageInfo from "@/package.json";
export default function AboutPage() {
  return <div className="mx-auto max-w-3xl space-y-6">
    <header className="wentu-hero"><p className="wentu-eyebrow">ABOUT WENTU / 关于文图</p><h1>让商品表达，更有章法。</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">面向商家的 AI 商品图文与营销素材工作台。</p></header>
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-4"><img src="/wentu-mark.svg" alt="文图标识" width="56" height="56" /><div><h2 className="text-2xl font-semibold">文图</h2><p className="mt-1 text-sm text-muted-foreground">商品图文工作台 · v{packageInfo.version}</p></div></div>
      <p className="mt-6 text-sm leading-8 text-muted-foreground">围绕商家日常上新与内容制作，整理商品资料、提炼卖点，制作主图、详情长图及推广图文。支持图片翻译、编辑与导出，让不同渠道的商品表达保持一致。</p>
      <Link href="/" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm text-primary-foreground hover:bg-primary/90">进入商品创作 →</Link>
    </section>
  </div>;
}