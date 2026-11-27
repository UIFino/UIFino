import type { ComponentAssetMeta, ComponentPropRow } from "../../types";

export function getComponentDependencies(item: ComponentAssetMeta): readonly string[] {
  const needsLucide =
    item.archetype === "telemetry-hero" ||
    item.archetype === "cli-hero" ||
    item.archetype === "ai-chat-thread" ||
    item.archetype === "cmdk-palette" ||
    item.archetype === "auth-card" ||
    item.archetype === "pricing-tiers" ||
    item.archetype === "navbar-bar" ||
    item.archetype === "sidebar-nav" ||
    item.archetype === "faq-accordion" ||
    item.archetype === "motion-lab";

  return needsLucide ? ["lucide-react"] : [];
}

const ARCHETYPE_SPECIFIC_PROPS: Partial<
  Record<ComponentAssetMeta["archetype"], readonly ComponentPropRow[]>
> = {
  "telemetry-hero": [
    {
      name: "metrics",
      type: "readonly { label: string; value: string }[]",
      defaultValue: "DEFAULT_METRICS",
      descEn: "Tabular counter KPI items shown below the hero headline.",
      descZh: "首屏下方等宽数字指标条数据数组。"
    },
    {
      name: "primaryLabel",
      type: "string",
      defaultValue: '"Get Started"',
      descEn: "Primary call-to-action button label.",
      descZh: "主转化按钮展示文案。"
    }
  ],
  "pricing-tiers": [
    {
      name: "billingCycle",
      type: '"monthly" | "yearly"',
      defaultValue: '"monthly"',
      descEn: "Controlled billing interval toggle state.",
      descZh: "计费周期切换状态（按月 / 按年）。"
    },
    {
      name: "tiers",
      type: "readonly PricingTier[]",
      defaultValue: "[]",
      descEn: "Array of plan tiers including featured highlight flag.",
      descZh: "定价档位配置数组，支持高亮推荐档。"
    }
  ],
  "auth-card": [
    {
      name: "onSubmit",
      type: "(email: string) => Promise<void> | void",
      defaultValue: "undefined",
      descEn: "Handler invoked with validated email or passkey trigger.",
      descZh: "邮箱或 Passkey 登录提交回调函数。"
    },
    {
      name: "providers",
      type: 'readonly ("github" | "google" | "passkey")[]',
      defaultValue: '["passkey", "github"]',
      descEn: "Enabled SSO & hardware authentication buttons.",
      descZh: "启用的第三方 SSO 或密钥登录方式。"
    }
  ],
  "data-table": [
    {
      name: "rows",
      type: "readonly Record<string, string | number>[]",
      defaultValue: "[]",
      descEn: "Structured row records rendered in tabular alignment.",
      descZh: "表格行数据源，数值列默认启用等宽对齐。"
    },
    {
      name: "onRowSelect",
      type: "(rowId: string) => void",
      defaultValue: "undefined",
      descEn: "Row click callback for opening detail drawer or selection.",
      descZh: "点击任意数据行的回调事件。"
    }
  ]
};

export function getComponentPropsSpec(item: ComponentAssetMeta): readonly ComponentPropRow[] {
  const custom = ARCHETYPE_SPECIFIC_PROPS[item.archetype] ?? [
    {
      name: "items",
      type: "readonly ComponentItem[]",
      defaultValue: "[]",
      descEn: "Content entries injected from parent without baked-in mock data.",
      descZh: "由父级注入的结构化展示条目（不含写死假数据）。"
    }
  ];

  return [
    {
      name: "title",
      type: "string",
      defaultValue: `"${item.name}"`,
      descEn: "Primary heading text rendered at the top of the component.",
      descZh: "组件顶部主标题文本。"
    },
    {
      name: "variant",
      type: '"default" | "compact" | "loading"',
      defaultValue: '"default"',
      descEn: "Visual density & loading state mode.",
      descZh: "外观状态变体（默认 / 紧凑 / 加载骨架）。"
    },
    ...custom,
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      descEn: "Optional Tailwind classes merged onto the root wrapper.",
      descZh: "追加到外层容器的自定义类名。"
    }
  ];
}
