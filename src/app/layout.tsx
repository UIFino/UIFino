import type { ReactNode } from "react";
import "@/styles/globals.css";

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return children;
}
