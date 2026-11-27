import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const [common, home, catalog, styles, library, templates, tools, mcp] = await Promise.all([
    import(`./messages/${locale}/common.json`),
    import(`./messages/${locale}/home.json`),
    import(`./messages/${locale}/catalog.json`),
    import(`./messages/${locale}/styles.json`),
    import(`./messages/${locale}/library.json`),
    import(`./messages/${locale}/templates.json`),
    import(`./messages/${locale}/tools.json`),
    import(`./messages/${locale}/mcp.json`)
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      home: home.default,
      catalog: catalog.default,
      styles: styles.default,
      library: library.default,
      templates: templates.default,
      tools: tools.default,
      mcp: mcp.default
    }
  };
});
