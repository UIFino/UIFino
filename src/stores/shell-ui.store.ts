"use client";

import { create } from "zustand";

export interface ShellUiState {
  readonly announceDismissed: boolean;
  readonly cmdkOpen: boolean;
  readonly dismissAnnounce: () => void;
  readonly setCmdkOpen: (open: boolean) => void;
  readonly toggleCmdk: () => void;
}

export const useShellUiStore = create<ShellUiState>((set) => ({
  announceDismissed: false,
  cmdkOpen: false,
  dismissAnnounce: () => set({ announceDismissed: true }),
  setCmdkOpen: (cmdkOpen) => set({ cmdkOpen }),
  toggleCmdk: () => set((state) => ({ cmdkOpen: !state.cmdkOpen }))
}));
