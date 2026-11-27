import type { AdapterRenderContext } from "../../types";

export function renderSvelteSource(ctx: AdapterRenderContext): string {
  const { item, category, tokens: tk, clsOuter, clsCard, clsBtn } = ctx;
  return `<script lang="ts">
  interface Props {
    title?: string;
  }
  let { title = "${item.name}" }: Props = $props();
  const metrics = [
    { label: "Specs", value: "550+" },
    { label: "Latency", value: "14ms" },
    { label: "Match", value: "99.9%" }
  ];
</script>

<section class="${clsOuter}">
  <div class="mx-auto max-w-5xl grid ${tk.twGap}">
    <header class="${clsCard}">
      <p class="font-mono text-xs uppercase text-[${tk.muted}]">${category.assetType} / ${item.subcat}</p>
      <h2 class="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
      <button type="button" class="mt-4 h-9 ${clsBtn}">Run Protocol</button>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-3 ${tk.twGap}">
      {#each metrics as m (m.label)}
        <article class="${clsCard} min-w-0">
          <div class="font-mono text-xl font-semibold tabular-nums">{m.value}</div>
          <div class="mt-1 text-xs text-[${tk.muted}] truncate">{m.label}</div>
        </article>
      {/each}
    </div>
  </div>
</section>`;
}
