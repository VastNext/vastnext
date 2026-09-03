# LexiLayer 产品推广页实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 VastNext Astro 官网新增中英双语 `/lexi-layer` 产品推广页，使用当前插件 `dist/` 实际运行截图展示 LexiLayer 的核心能力、AI 专家定制与开源协作入口。

**Architecture:** 新增独立的 Astro 产品页组件与中英文文案数据，不改动既有首页结构。截图作为静态资源放入官网 `public/lexi-layer/`，页面通过共享 BaseLayout 输出 SEO 元信息，并在 `/lexi-layer` 与 `/zh/lexi-layer` 复用同一组件切换语言。

**Tech Stack:** Astro、TypeScript、原生 CSS、Playwright Chromium 扩展测试、Cloudflare Pages 静态部署。

---

### Task 1: 采集当前插件真实截图

**Files:**
- Read: `D:/WorkDev/MyShare/VastTranslatorChromePlugin/dist/`
- Read: `F:/Downloads/lexilayer-translator-config.json`
- Create: `public/lexi-layer/*.png`

**Step 1:** 启动当前插件仓库可复用的 Chromium 扩展测试环境，加载 `dist/`。

**Step 2:** 在本地会话导入配置文件，确认自定义 AI 和 AI 专家可用；API Key 仅保存在浏览器上下文。

**Step 3:** 打开 `findryai.com`，等待页面稳定；执行页面翻译，并为整页翻译预留明显更长的等待时间，直到主要内容完成。

**Step 4:** 采集 Popup、Options 自定义 AI、AI 专家、网页翻译和划词翻译截图，检查截图中没有 API Key、Cookie 或内部调试信息。

**Step 5:** 仅复制最终截图到官网 `public/lexi-layer/`，不复制配置文件、插件 `dist/` 或测试临时目录。

### Task 2: 新增双语产品页内容与路由

**Files:**
- Create: `src/content/lexiLayer.ts`
- Create: `src/components/LexiLayerPage.astro`
- Create: `src/pages/lexi-layer.astro`
- Create: `src/pages/zh/lexi-layer.astro`
- Modify: `src/layouts/BaseLayout.astro`（仅在需要时补充页面 metadata 能力）

**Step 1:** 写入中英文页面文案、截图清单、GitHub 链接和页面 metadata。

**Step 2:** 实现语义化页面结构：Hero、真实截图、翻译流程、AI 专家、定制能力、功能列表、隐私/免费/开源说明、Issue/PR CTA。

**Step 3:** 为中英文页面复用同一个组件，确保 canonical、alternate hreflang、标题和描述正确。

### Task 3: 实现产品页视觉样式与交互

**Files:**
- Create: `src/styles/lexi-layer.css`
- Modify: `src/components/LexiLayerPage.astro`

**Step 1:** 延续官网 Space Grotesk + Noto Sans SC、深靛蓝/亮蓝/薄荷绿/珊瑚色 token。

**Step 2:** 实现产品截图的 editorial 展示，避免通用 SaaS 卡片网格；Hero 首屏保留一个主视觉锚点。

**Step 3:** 添加有限且有意义的 reveal、hover 和截图层叠动效，并支持 prefers-reduced-motion。

**Step 4:** 验证移动端截图横向滚动、按钮触达尺寸、焦点样式和文字对比度。

### Task 4: 验证与交付

**Files:**
- Read: 页面构建产物与工作区 diff

**Step 1:** 运行 `npm test`。

**Step 2:** 运行 `npm run check` 与 `npm run build`。

**Step 3:** 启动本地站点，确认 HTTP 就绪后用浏览器打开 `/lexi-layer` 和 `/zh/lexi-layer`，执行一次目标视口 smoke test 并截取证据。

**Step 4:** 检查 `git diff --check`、确认没有配置文件/API Key/临时截图混入，交由 Reviewer 做只读审查。
