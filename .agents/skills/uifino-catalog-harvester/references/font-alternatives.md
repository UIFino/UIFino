# 商业收费字体 → 免费开源商用平替白名单

采集图鉴时，`fonts.display` / `fonts.body` / `fonts.mono` 如实填写原站 `getComputedStyle` 检测到的真实字体名；而 `openFontAlt` 与 `measuredTypography[].freeAlternative` **必须从下表开源免费商用字体（Google Fonts / Vercel Geist / 开源 OFL 协议）中选择**，确保用户与 AI 拷走 CSS 后无需购买商业字库即可直接渲染出接近气质。

## 1. 无衬线几何与现代工程体（Sans-Serif）

| 原站检测到的商业/私有字体 | 气质特征 | 标准免费开源平替 |
| :--- | :--- | :--- |
| `Inter` / `Inter Variable` / `Inter Display` | 中性、紧凑高 x 字高、SaaS 标配 | `Inter` |
| `Geist` / `Geist Sans` | 冷峻建筑感、锋利切口、数字干脆 | `Geist` |
| `Söhne` / `Söhne Breit` (Klim) | OpenAI / Stripe 常用，干练克制新怪诞体 | `Plus Jakarta Sans` 或 `Inter` |
| `PP Neue Montreal` (Pangram Pangram) | 现代工作室与先锋科技感，紧凑字距 | `DM Sans` 或 `Geist` |
| `Suisse Int'l` (Swiss Typefaces) | 瑞士国际主义网格秩序感 | `Inter` 或 `Work Sans` |
| `GT America` / `GT Walsheim` (Grilli Type) | 美式哥特工业感 / 几何亲和力 | `Public Sans` / `Space Grotesk` |
| `Roobert` / `Aeonik` | 科技感圆润几何转角与机械直线结合 | `Space Grotesk` 或 `Plus Jakarta Sans` |
| `Circular` / `LL Circular` / `Spotify Mix` | 饱满几何圆形字怀、消费级亲和力 | `Plus Jakarta Sans` 或 `Outfit` |
| `SF Pro Display` / `SF Pro Text` / `-apple-system` | 苹果原生系统质感 | `Inter`（配 `-apple-system` 系统回退） |
| `Graphik` / `Proxima Nova` | 清爽现代商务官网与文档 | `DM Sans` 或 `Figtree` |
| `Satoshi` / `General Sans` (Fontshare) | 现代独立开发者高频免费几何体 | `Plus Jakarta Sans` 或 `DM Sans` |

## 2. 人文衬线与编辑出版体（Editorial Serif）

| 原站检测到的商业/私有字体 | 气质特征 | 标准免费开源平替 |
| :--- | :--- | :--- |
| `Tiempos Text` / `Tiempos Headline` (Klim) | Claude / 高质感阅读产品常用人文衬线 | `Newsreader` 或 `Source Serif 4` |
| `Copernicus` / `Styrene` | 智识感、温润书卷气息 | `Newsreader` 或 `Lora` |
| `PP Editorial New` / `migra` | 高对比度窄体时尚杂志大标题 | `Cormorant Garamond` 或 `Instrument Serif` |
| `Canela` / `GT Super` / `Lyon` | 柔和刀锋衬线、深度长文与品牌叙事 | `Playfair Display` 或 `Fraunces` |
| `New York` / `Georgia` | 经典报纸阅读感 | `Newsreader` 或 `Merriweather` |

## 3. 代码、遥测指标与像素等宽体（Monospace）

| 原站检测到的商业/私有字体 | 气质特征 | 标准免费开源平替 |
| :--- | :--- | :--- |
| `Berkeley Mono` (US Graphics) | Linear / 极客工具神级工业等宽体 | `JetBrains Mono` 或 `Geist Mono` |
| `Geist Mono` | Vercel 遥测数字与代码块标配 | `Geist Mono` |
| `Commit Mono` / `Server Mono` / `MonoLisa` | 现代开发工具清晰等宽体 | `JetBrains Mono` 或 `IBM Plex Mono` |
| `SF Mono` / `Menlo` | macOS 原生终端质感 | `JetBrains Mono` |
| `Söhne Mono` / `GT America Mono` | 财务报表、对账单、API 文档等宽标签 | `IBM Plex Mono` 或 `Geist Mono` |
| `Departure Mono` / 像素点阵体 | 复古终端与像素角标 | `Silkscreen` 或 `Space Mono` |

## 4. `openFontAlt` 字段书写格式约定

统一写成 **`<正文/标题开源字体> + <等宽开源字体>`**（若带特色衬线标题则写 `<衬线标题字体> + <正文开源字体> + <等宽开源字体>`），例如：
- `"Inter + JetBrains Mono"`
- `"Geist + Geist Mono"`
- `"Newsreader + Inter + JetBrains Mono"`
- `"Space Grotesk + IBM Plex Mono"`
