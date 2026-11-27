"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { FilterToolbar } from "@/components/patterns/filter-bar";
import { Button } from "@/components/primitives/button";
import { SegmentedControl } from "@/components/primitives/segmented";
import type { StudioCodeFormat } from "@/core/studios/background";
import { useClipboard } from "@/hooks/use-clipboard";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type ActiveToolStudio = "background" | "shadow" | "colors" | "typography";

export interface StudioShellProps {
  readonly activeStudio: ActiveToolStudio;
  readonly format: StudioCodeFormat;
  readonly currentCode: string;
  readonly onFormatChange: (fmt: StudioCodeFormat) => void;
  readonly children: ReactNode;
}

export function StudioShell({
  activeStudio,
  format,
  currentCode,
  onFormatChange,
  children
}: StudioShellProps) {
  const t = useTranslations("tools");
  const { copy } = useClipboard();

  const tabs: readonly { readonly id: ActiveToolStudio; readonly num: string; readonly label: string }[] = [
    { id: "background", num: "01", label: t("studioBg") },
    { id: "shadow", num: "02", label: t("studioShadow") },
    { id: "colors", num: "03", label: t("studioColors") },
    { id: "typography", num: "04", label: t("studioType") }
  ];

  return (
    <div className="band-full">
      <section className="shell-wrap">
        <FilterToolbar
          left={
            <div className="inline-flex flex-wrap items-stretch border border-hairline bg-code">
              {tabs.map((tab, idx) => (
                <Link
                  key={tab.id}
                  href={`/tools/${tab.id}`}
                  className={cn(
                    "inline-flex h-[30px] items-center px-3 text-xs transition-colors",
                    idx < tabs.length - 1 && "border-r border-hairline",
                    activeStudio === tab.id
                      ? "bg-gray-100 font-semibold text-ink"
                      : "text-muted hover:bg-surface-hover hover:text-ink"
                  )}
                >
                  {tab.num} · {tab.label}
                </Link>
              ))}
            </div>
          }
          right={
            <>
              <SegmentedControl
                options={[
                  { value: "css" as StudioCodeFormat, label: "CSS" },
                  { value: "tailwind" as StudioCodeFormat, label: "Tailwind" }
                ]}
                value={format}
                onChange={onFormatChange}
              />
              <Button
                variant="contrast"
                size="sm"
                onClick={() =>
                  void copy(
                    currentCode,
                    `Copied ${format === "tailwind" ? "Tailwind" : "CSS"} snippet`
                  )
                }
              >
                Copy {format === "tailwind" ? "Tailwind" : "CSS"}
              </Button>
            </>
          }
        />

        <div className="px-7 py-6">{children}</div>
      </section>
    </div>
  );
}
