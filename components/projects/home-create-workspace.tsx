"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuickStartWorkspace } from "./quick-start-workspace";
import { BatchDetailWorkspace } from "./batch-detail-workspace";

export function HomeCreateWorkspace({ initialBatch = false }: { initialBatch?: boolean }) {
  const [batch, setBatch] = useState(initialBatch);
  return <div className="wentu-commerce">
    <header className="wentu-hero mx-auto max-w-4xl">
      <div className="wentu-hero-top"><p className="wentu-eyebrow">WENTU / 商家创作工作台</p><span className="wentu-edition">商品图文 · 营销内容</span></div>
      <div className="wentu-hero-layout"><div><h1>好商品，<br />值得被好好呈现。</h1><p className="wentu-hero-description">从商品照片到卖点文案、详情页与推广图文，<br className="hidden sm:block" />为商家整理商品信息，制作风格统一的营销素材。</p></div>
      <div className="wentu-service-note" aria-label="支持的创作场景"><span className="wentu-note-number">文 / 图</span><strong>一件商品，多种表达</strong><p>商品主图 · 详情长图<br />多语言翻译 · 小红书图文</p><span className="wentu-note-footer">为日常经营，备好每一份素材。</span></div></div>
      <ol className="wentu-process" aria-label="商品图文制作步骤"><li><span>01</span><div><strong>上传商品</strong><small>准备清晰参考图</small></div></li><li><span>02</span><div><strong>确认卖点</strong><small>补充真实商品信息</small></div></li><li><span>03</span><div><strong>制作与导出</strong><small>编辑并下载营销素材</small></div></li></ol>
    </header>
    <section className="wentu-workbench mx-auto max-w-4xl" aria-label="商品创作">
      <div className="wentu-workbench-heading"><div><p className="wentu-eyebrow">开始制作 / CREATE</p><h2>今天，为哪件商品上新？</h2></div><div className="wentu-mode" role="group" aria-label="商品处理模式"><button type="button" aria-pressed={!batch} className={cn(!batch && "is-active")} onClick={() => setBatch(false)}>单件商品</button><button type="button" aria-pressed={batch} className={cn(batch && "is-active")} onClick={() => setBatch(true)}>批量制作</button></div></div>
      <div hidden={batch}><QuickStartWorkspace /></div>
      <div hidden={!batch}><BatchDetailWorkspace /></div>
    </section>
  </div>;
}