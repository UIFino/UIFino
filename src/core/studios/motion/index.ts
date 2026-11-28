import type { StudioCodeFormat } from "@/core/studios/background";

export type MotionPreviewScene = "drawer" | "modal" | "hover-card";
export type MotionExportMode = "bezier" | "spring";

export interface MotionPresetSpec {
  readonly id: string;
  readonly name: string;
  readonly nameZh: string;
  readonly source: string;
  readonly durationMs: number;
  readonly bezier: string;
  readonly stiffness: number;
  readonly damping: number;
  readonly usageZh: string;
  readonly usageEn: string;
}

export const MOTION_STUDIO_PRESETS: readonly MotionPresetSpec[] = [
  {
    id: "linear-crisp",
    name: "Linear Crisp",
    nameZh: "Linear 干脆极速",
    source: "linear.app",
    durationMs: 180,
    bezier: "cubic-bezier(0.22, 1, 0.36, 1)",
    stiffness: 380,
    damping: 32,
    usageZh: "顶栏抽屉、快捷键指令面板、列表焦点切换",
    usageEn: "Flyout drawers, command palettes, and crisp list shifts"
  },
  {
    id: "apple-spring",
    name: "Apple Damped Spring",
    nameZh: "苹果阻尼弹簧",
    source: "Human Interface",
    durationMs: 360,
    bezier: "cubic-bezier(0.16, 1, 0.3, 1)",
    stiffness: 280,
    damping: 22,
    usageZh: "模态弹窗浮现、抽屉弹性停靠、卡片展开",
    usageEn: "Modal sheets, sidebars, and tactile card expansion"
  },
  {
    id: "micro-snap",
    name: "Vercel Micro Snap",
    nameZh: "微交互瞬态",
    source: "vercel.com",
    durationMs: 140,
    bezier: "cubic-bezier(0.25, 1, 0.5, 1)",
    stiffness: 460,
    damping: 38,
    usageZh: "按钮悬停抬起、分段控制器游标、复制提示",
    usageEn: "Hover lifts, segmented indicators, and button feedback"
  },
  {
    id: "editorial-glide",
    name: "Editorial Gentle Glide",
    nameZh: "社论温和消散",
    source: "anthropic.com",
    durationMs: 280,
    bezier: "cubic-bezier(0.37, 0, 0.63, 1)",
    stiffness: 200,
    damping: 28,
    usageZh: "长文折叠手风琴、内容模块渐进浮现",
    usageEn: "Accordions and calm content section reveals"
  }
];

/**
 * Generates modern CSS native linear() spring curve values (supported by Chrome 113+, Safari 17.2+, Firefox 112+)
 * without requiring GSAP or Framer Motion.
 */
export function synthesizeSpringLinear(stiffness = 280, damping = 22): string {
  const k = Math.max(80, Math.min(600, stiffness));
  const c = Math.max(10, Math.min(60, damping));
  const omega = Math.sqrt(k);
  const zeta = c / (2 * omega);

  const stops: string[] = [];
  const steps = 16;
  const totalSec = 0.6;

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * totalSec;
    let val: number;
    if (zeta < 1) {
      const wd = omega * Math.sqrt(1 - zeta * zeta);
      val =
        1 -
        Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
    } else {
      val = 1 - Math.exp(-omega * t) * (1 + omega * t);
    }
    if (i === 0) val = 0;
    if (i === steps) val = 1;
    stops.push(val.toFixed(3).replace(/\.?0+$/, ""));
  }

  return `linear(${stops.join(", ")})`;
}

export function serializeMotionCode(
  preset: MotionPresetSpec,
  exportMode: MotionExportMode,
  format: StudioCodeFormat,
  durationOverrideMs?: number
): string {
  const duration = Math.max(80, Math.min(800, durationOverrideMs ?? preset.durationMs));
  const curve =
    exportMode === "spring"
      ? synthesizeSpringLinear(preset.stiffness, preset.damping)
      : preset.bezier;

  if (format === "tailwind") {
    return `/* Tailwind v4 @theme Motion Token (${preset.name}) */
@theme {
  --ease-${preset.id}: ${curve};
  --duration-${preset.id}: ${duration}ms;
}

/* Usage */
// className="transition-transform duration-[${duration}ms] ease-[var(--ease-${preset.id})] motion-reduce:transition-none"`;
  }

  return `/* UIFino Motion Preset: ${preset.name} (${exportMode === "spring" ? "CSS linear() Spring" : "Cubic-Bezier"}) */
:root {
  --motion-ease-${preset.id}: ${curve};
  --motion-duration-${preset.id}: ${duration}ms;
}

.uifino-interactive {
  transition: transform var(--motion-duration-${preset.id}) var(--motion-ease-${preset.id}),
              opacity var(--motion-duration-${preset.id}) ease;
}

@media (prefers-reduced-motion: reduce) {
  .uifino-interactive {
    transition: none;
  }
}`;
}
