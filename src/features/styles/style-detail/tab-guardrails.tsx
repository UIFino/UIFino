"use client";

import { useTranslations } from "next-intl";
import { CodeViewer } from "@/components/patterns/code-viewer";
import type { UiStyleSpec } from "@/core/styles";

export interface StyleGuardrailsTabProps {
  readonly item: UiStyleSpec;
  readonly rawCss: string;
  readonly rawMd: string;
  readonly isZh: boolean;
}

export function StyleGuardrailsTab({ item, rawCss, rawMd, isZh }: StyleGuardrailsTabProps) {
  const t = useTranslations("styles");

  const dosList = isZh ? item.dosZh : item.dosEn;
  const dontsList = isZh ? item.dontsZh : item.dontsEn;

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="border-accent-border/40 bg-surface border p-5">
          <div className="font-mono-ui text-accent-text mb-3 text-xs font-bold">
            {t("mustKeepTitle")}
          </div>
          <ul className="text-ink m-0 grid list-none gap-2.5 p-0 text-[13px] leading-[1.58]">
            {dosList.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="text-accent-text font-mono font-bold">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-[#FF5C5C]/35 p-5">
          <div className="font-mono-ui mb-3 text-xs font-bold text-[#FF5C5C]">
            {t("antiAiTitle")}
          </div>
          <ul className="text-ink/90 m-0 grid list-none gap-2.5 p-0 text-[13px] leading-[1.58]">
            {dontsList.map((ban) => (
              <li key={ban} className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#FF5C5C]">✕</span>
                <span>{ban}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <CodeViewer
          code={rawCss}
          lang="css"
          title={`styles/${item.slug}/tokens.css`}
          copyLabel={t("copyCss")}
        />
        <CodeViewer
          code={rawMd}
          lang="markdown"
          title={`styles/${item.slug}/DESIGN.md`}
          copyLabel={t("copyMd")}
        />
      </div>
    </div>
  );
}
