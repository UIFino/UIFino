"use client";

import { useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import type { CatalogBrandSpec } from "@/core/design-md";

const DEFAULT_ANTI_AI_ZH = [
  "严禁给主标题套用蓝紫粉多色彩虹文字渐变。",
  "严禁使用发光模糊霓虹阴影替代干净的 1px 实线边框。",
  "严禁超出品牌原生圆角阶梯随意混用夸张大圆角胶囊卡片。"
];

const DEFAULT_ANTI_AI_EN = [
  "NEVER apply multi-stop purple/cyan rainbow text gradients to headlines.",
  "NEVER replace crisp 1px structural borders with heavy colorful neon outer glows.",
  "NEVER inflate card border-radius beyond the brand's native radius ladder."
];

export function CatalogGuardrailsTab({
  item,
  rawMd,
  isZh
}: {
  readonly item: CatalogBrandSpec;
  readonly rawMd: string;
  readonly isZh: boolean;
}) {
  const t = useTranslations("catalog");

  const mustKeep = isZh ? (item.rulesZh ?? item.rules) : item.rules;
  const antiAi = isZh
    ? (item.antiAiRulesZh ?? DEFAULT_ANTI_AI_ZH)
    : (item.antiAiRulesEn ?? DEFAULT_ANTI_AI_EN);

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="border border-accent-border/40 bg-surface p-5">
          <div className="font-mono-ui mb-3 text-xs font-bold text-accent-text">
            {t("mustKeepTitle")}
          </div>
          <ul className="m-0 grid list-none gap-2.5 p-0 text-[13px] leading-[1.58] text-ink">
            {mustKeep.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="font-mono font-bold text-accent-text">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[#FF5C5C]/35 bg-surface p-5">
          <div className="font-mono-ui mb-3 text-xs font-bold text-[#FF5C5C]">
            {t("antiAiTitle")}
          </div>
          <ul className="m-0 grid list-none gap-2.5 p-0 text-[13px] leading-[1.58] text-ink/90">
            {antiAi.map((ban) => (
              <li key={ban} className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#FF5C5C]">✕</span>
                <span>{ban}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CodeViewer
        code={rawMd}
        lang="markdown"
        title={`${item.slug}/DESIGN.md`}
        copyLabel={t("copyMd")}
      />
    </div>
  );
}
