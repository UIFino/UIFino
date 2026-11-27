"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

export function AppClientProviders({ children }: { readonly children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NuqsAdapter>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!rounded-none !border !border-strong !bg-surface !text-ink !font-mono !text-xs"
          }}
        />
      </NuqsAdapter>
    </ThemeProvider>
  );
}
