"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DensityMode, RadiusStop, ThemeMode } from "@/core/tokens";

export interface WorkbenchPresetState {
  readonly radius: RadiusStop;
  readonly density: DensityMode;
  readonly skin: string;
  readonly stageMode: ThemeMode;
  readonly setRadius: (radius: RadiusStop) => void;
  readonly setDensity: (density: DensityMode) => void;
  readonly setSkin: (skin: string) => void;
  readonly setStageMode: (mode: ThemeMode) => void;
  readonly applyBrandSkin: (skinId: string, radius?: RadiusStop) => void;
  readonly resetPreset: () => void;
}

const DEFAULT_PRESET = {
  radius: 4 as RadiusStop,
  density: "default" as DensityMode,
  skin: "linear",
  stageMode: "dark" as ThemeMode
};

export const useWorkbenchPresetStore = create<WorkbenchPresetState>()(
  persist(
    (set) => ({
      ...DEFAULT_PRESET,
      setRadius: (radius) => set({ radius }),
      setDensity: (density) => set({ density }),
      setSkin: (skin) => set({ skin }),
      setStageMode: (stageMode) => set({ stageMode }),
      applyBrandSkin: (skinId, radius) =>
        set((prev) => ({
          skin: skinId,
          radius: radius ?? prev.radius
        })),
      resetPreset: () => set(DEFAULT_PRESET)
    }),
    {
      name: "uifino-workbench-preset-v1"
    }
  )
);
