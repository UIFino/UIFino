import type { AdapterRenderContext } from "../../types";
import { toPascalCase } from "../../virtual-fs";
import { getComponentDependencies } from "./props";

export * from "./props";

/**
 * Pure reusable React component (zero hardcoded mock data arrays inside).
 */
export function renderReactSource(ctx: AdapterRenderContext): string {
  const { item, category, tokens: tk, clsOuter, clsCard, clsBtn } = ctx;
  const pascal = toPascalCase(item.id);
  const deps = getComponentDependencies(item);
  const needsClient =
    item.archetype === "motion-lab" ||
    item.archetype === "cmdk-palette" ||
    item.archetype === "faq-accordion" ||
    item.archetype === "pricing-tiers" ||
    item.archetype === "auth-card";

  const clientHeader = needsClient ? `"use client";\n\n` : "";
  const iconImport = deps.includes("lucide-react")
    ? `import { ArrowRight } from "lucide-react";\n`
    : "";

  return `${clientHeader}import type { FC } from "react";
${iconImport}
export interface ${pascal}MetricItem {
  readonly label: string;
  readonly value: string;
}

export interface ${pascal}Props {
  readonly title?: string;
  readonly subtitle?: string;
  readonly ctaLabel?: string;
  readonly variant?: "default" | "compact" | "loading";
  readonly items?: readonly ${pascal}MetricItem[];
  readonly onAction?: () => void;
  readonly className?: string;
}

export const ${pascal}: FC<${pascal}Props> = ({
  title = "${item.name}",
  subtitle = "${item.descEn.replaceAll('"', '\\"')}",
  ctaLabel = "Apply Protocol",
  variant = "default",
  items = [],
  onAction,
  className = ""
}) => {
  const padClass = variant === "compact" ? "p-3.5" : "${tk.twPadCard}";

  if (variant === "loading") {
    return (
      <section className={\`${clsOuter} animate-pulse \${className}\`}>
        <div className={\`mx-auto max-w-5xl border border-[var(--ui-border,${tk.border})] bg-[var(--ui-surface,${tk.surface})] \${padClass} ${tk.twCard}\`}>
          <div className="h-3 w-28 bg-[var(--ui-border,${tk.border})]" />
          <div className="mt-3 h-7 w-2/3 bg-[var(--ui-border,${tk.border})]" />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="h-16 bg-[var(--ui-canvas,${tk.canvas})]" />
            <div className="h-16 bg-[var(--ui-canvas,${tk.canvas})]" />
            <div className="h-16 bg-[var(--ui-canvas,${tk.canvas})]" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        borderRadius: "var(--ui-radius-card, ${tk.card})"
      }}
      className={\`${clsOuter} \${className}\`}
    >
      <div className="mx-auto grid max-w-5xl ${tk.twGap}">
        <header className={\`${clsCard} \${padClass}\`}>
          <p className="font-mono text-xs tracking-wider text-[var(--ui-muted,${tk.muted})] uppercase">
            ${category.assetType} / ${item.subcat}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ui-ink,${tk.ink})]">
            {title}
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-[var(--ui-muted,${tk.muted})]">
            {subtitle}
          </p>
          <button
            type="button"
            onClick={onAction}
            className="mt-4 inline-flex items-center gap-1.5 h-9 ${clsBtn} cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span>{ctaLabel}</span>${
              deps.includes("lucide-react") ? '\n            <ArrowRight className="h-3.5 w-3.5" />' : ""
            }
          </button>
        </header>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 ${tk.twGap}">
            {items.map((entry) => (
              <article key={entry.label} className={\`${clsCard} \${padClass} min-w-0\`}>
                <div className="font-mono text-xl font-semibold tabular-nums text-[var(--ui-ink,${tk.ink})]">
                  {entry.value}
                </div>
                <div className="mt-1 truncate text-xs text-[var(--ui-muted,${tk.muted})]">
                  {entry.label}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};`;
}

/**
 * Separated Demo file holding sample data and interactive invocation.
 */
export function renderReactDemoSource(ctx: AdapterRenderContext): string {
  const { item } = ctx;
  const pascal = toPascalCase(item.id);

  return `import { ${pascal}, type ${pascal}MetricItem } from "./${pascal}";

const DEMO_ITEMS: readonly ${pascal}MetricItem[] = [
  { label: "Verified Specs", value: "550+" },
  { label: "P99 Latency", value: "14ms" },
  { label: "Token Contrast", value: "99.9%" }
];

export function ${pascal}Demo() {
  return (
    <${pascal}
      title="${item.name}"
      variant="default"
      items={DEMO_ITEMS}
      onAction={() => console.info("${item.id} action triggered")}
    />
  );
}`;
}
