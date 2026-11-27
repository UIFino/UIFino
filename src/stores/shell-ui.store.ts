"use client";

import { create } from "zustand";

export interface ShellUiState {
  readonly announceDismissed: boolean;
  readonly cmdkOpen: boolean;
  readonly starred: boolean;
  readonly starCount: number;
  readonly dismissAnnounce: () => void;
  readonly setCmdkOpen: (open: boolean) => void;
  readonly toggleCmdk: () => void;
  readonly toggleStar: () => void;
}

export const useShellUiStore = create<ShellUiState>((set) => ({
  announceDismissed: false,
  cmdkOpen: false,
  starred: false,
  starCount: 12800,
  dismissAnnounce: () => set({ announceDismissed: true }),
  setCmdkOpen: (cmdkOpen) => set({ cmdkOpen }),
  toggleCmdk: () => set((state) => ({ cmdkOpen: !state.cmdkOpen })),
  toggleStar: () =>
    set((state) => {
      const nextStarred = !state.starred;
      return {
        starred: nextStarred,
        starCount: state.starCount + (nextStarred ? 1 : -1)
      };
    })
}));
