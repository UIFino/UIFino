import type {
  DensityMode,
  DensityScaleEntry,
  RadiusScaleEntry,
  RadiusStop,
  ThemeMode,
  ThemePalette
} from "./types";

export const RADIUS_STOP_VALUES: readonly RadiusStop[] = [0, 4, 8, 12, 16];

export const RADIUS_SCALE_MAP: Record<RadiusStop, RadiusScaleEntry> = {
  0: {
    card: "0px",
    ctrl: "0px",
    badge: "0px",
    twCard: "rounded-none",
    twCtrl: "rounded-none"
  },
  4: {
    card: "4px",
    ctrl: "4px",
    badge: "2px",
    twCard: "rounded-[4px]",
    twCtrl: "rounded-[4px]"
  },
  8: {
    card: "8px",
    ctrl: "6px",
    badge: "4px",
    twCard: "rounded-lg",
    twCtrl: "rounded-md"
  },
  12: {
    card: "12px",
    ctrl: "8px",
    badge: "6px",
    twCard: "rounded-xl",
    twCtrl: "rounded-lg"
  },
  16: {
    card: "16px",
    ctrl: "9999px",
    badge: "9999px",
    twCard: "rounded-2xl",
    twCtrl: "rounded-full"
  }
};

export const DENSITY_SCALE_MAP: Record<DensityMode, DensityScaleEntry> = {
  compact: {
    padStage: "20px",
    padCard: "12px",
    gap: "10px",
    btnH: "32px",
    twPadStage: "p-5",
    twPadCard: "p-3",
    twGap: "gap-2.5"
  },
  default: {
    padStage: "32px",
    padCard: "18px",
    gap: "16px",
    btnH: "36px",
    twPadStage: "p-8",
    twPadCard: "p-4",
    twGap: "gap-4"
  },
  spacious: {
    padStage: "48px",
    padCard: "26px",
    gap: "24px",
    btnH: "42px",
    twPadStage: "p-12",
    twPadCard: "p-6",
    twGap: "gap-6"
  }
};

export const DEFAULT_UIFINO_PALETTE: Record<ThemeMode, ThemePalette> = {
  light: {
    canvas: "#F5F4F0",
    surface: "#FFFFFF",
    elevated: "#EAE8E1",
    border: "#D8D4CA",
    ink: "#1B1A17",
    muted: "#646058",
    accent: "#1B1A17",
    accentFg: "#FFFFFF"
  },
  dark: {
    canvas: "#161618",
    surface: "#1D1D20",
    elevated: "#26262A",
    border: "#29292E",
    ink: "#ECECEE",
    muted: "#A0A0A8",
    accent: "#CEFF00",
    accentFg: "#111113"
  }
};
