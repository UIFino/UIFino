import type { ReactNode } from "react";
import { AnnounceBar } from "@/components/shell/announce-bar";
import { CmdkPalette } from "@/components/shell/cmdk-palette";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";

export default function SiteChromeLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AnnounceBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CmdkPalette />
    </div>
  );
}
