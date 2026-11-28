"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "@/i18n/navigation";
import { WorkflowRail } from "./workflow-rail";

export function HomeHeroStage() {
  const t = useTranslations("home");
  const { copy } = useClipboard();
  const cliCommand = "npx uifino@latest add design/linear";

  const stats = [
    ["12", t("statSpecs")],
    ["10", t("statStyles")],
    ["21", t("statCategories")],
    ["5", t("statStudios")]
  ] as const;

  return (
    <div className="band-full">
      <section className="shell-wrap grid grid-cols-1 lg:grid-cols-2">
        <div className="hero-stripes flex flex-col justify-between gap-6 border-b border-hairline px-7 pt-10 pb-11 lg:border-r lg:border-b-0">
          <div>
            <Badge variant="ribbon">{t("heroRibbon")}</Badge>
            <h1 className="heading-hero mt-[18px]">{t("heroTitle")}</h1>
            <p className="mt-3.5 max-w-[540px] text-[15px] leading-[1.6] text-muted">
              {t("heroDesc")}
            </p>
            <div className="mt-[22px] flex flex-wrap gap-2.5">
              <Link href="/catalog">
                <Button variant="contrast">{t("heroPrimaryCta")} →</Button>
              </Link>
              <Link href="/components">
                <Button variant="hairline">{t("heroSecondaryCta")}</Button>
              </Link>
            </div>
            <div className="mt-3.5 flex max-w-[460px] items-center justify-between gap-2.5 border border-hairline bg-code px-3 py-[9px] font-mono text-[12.5px]">
              <span className="truncate">
                <span className="text-accent-text">$</span> {cliCommand}
              </span>
              <button
                type="button"
                onClick={() => void copy(cliCommand, "Copied CLI command")}
                className="shrink-0 cursor-pointer"
              >
                <Badge className="text-ink hover:border-accent-border">Copy</Badge>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 border-t border-hairline pt-4 font-mono text-[11.5px] text-subtle">
            <span>AGENTS:</span>
            <span className="text-body">Claude Code</span>
            <span>·</span>
            <span className="text-body">Cursor</span>
            <span>·</span>
            <span className="text-body">Codex</span>
            <span>·</span>
            <span className="text-body">Windsurf</span>
            <span>·</span>
            <span className="text-body">Cline</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-[18px] bg-canvas px-7 pb-9">
          <WorkflowRail />

          <div className="grid grid-cols-4 border border-hairline bg-surface">
            {stats.map(([num, label], idx) => (
              <div
                key={label}
                className={idx < 3 ? "border-r border-hairline px-3 py-2.5" : "px-3 py-2.5"}
              >
                <div className="font-mono-ui text-[17px] font-bold text-accent-text">{num}</div>
                <div className="text-[11px] text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
