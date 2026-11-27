import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { fontVariablesClass } from "@/lib/fonts";
import { AppClientProviders } from "./providers";

export const metadata: Metadata = {
  title: "uifino — Design System Protocols & Progressive UI Registry",
  description:
    "DESIGN.md protocols, tunable multi-framework UI components, starter templates, and MCP integration for AI coding agents."
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <body className={fontVariablesClass}>
        <NextIntlClientProvider messages={messages}>
          <AppClientProviders>{children}</AppClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
