import type { AdapterRenderContext } from "../../types";

export function renderReactSource(ctx: AdapterRenderContext): string {
  const { item, category, tokens: tk, clsOuter, clsCard, clsBtn } = ctx;
  return `import type { FC } from "react";

export interface AssetStageProps {
  readonly title?: string;
}

const METRICS = [
  { label: "Specs", value: "550+" },
  { label: "Latency", value: "14ms" },
  { label: "Match", value: "99.9%" }
] as const;

export const UifinoAssetStage: FC<AssetStageProps> = ({ title = "${item.name}" }) => {
  return (
    <section className="${clsOuter}">
      <div className="mx-auto max-w-5xl grid ${tk.twGap}">
        <header className="${clsCard}">
          <p className="font-mono text-xs uppercase text-[${tk.muted}]">
            ${category.assetType} / ${item.subcat}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
          <button type="button" className="mt-4 h-9 ${clsBtn}">
            Apply Protocol
          </button>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 ${tk.twGap}">
          {METRICS.map((m) => (
            <article key={m.label} className="${clsCard} min-w-0">
              <div className="font-mono text-xl font-semibold tabular-nums">{m.value}</div>
              <div className="mt-1 text-xs text-[${tk.muted}] truncate">{m.label}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};`;
}
