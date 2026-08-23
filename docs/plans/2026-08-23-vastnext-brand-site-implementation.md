# VastNext Brand Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个明亮、活泼、具有未来感的 VastNext 双语静态品牌官网，并可直接部署到 Cloudflare Pages。

**Architecture:** 使用 Astro 生成英文 `/`、中文 `/zh/` 和对应隐私政策静态页面。共享内容保存在类型化字典中，共享页面骨架由 Astro 组件组成，视觉系统集中在全局 CSS，自制 SVG 提供品牌标记与产品示意。站点不包含服务端逻辑，构建结果完整输出到 `dist`。

**Tech Stack:** Astro、TypeScript、原生 CSS、Vitest、Astro Check、Playwright/Lighthouse（视觉与浏览器验证）

---

### Task 1: 初始化 Astro 静态项目

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/env.d.ts`
- Create: `public/robots.txt`

**Step 1: 写入最小项目配置**

定义 `dev`、`build`、`preview`、`check` 和 `test` 脚本；依赖只包含 Astro、sitemap 集成、Vitest 和 TypeScript 检查所需包。

**Step 2: 安装依赖**

Run: `npm install`

Expected: 生成 `node_modules` 与 `package-lock.json`，无安装错误。

**Step 3: 运行空项目检查**

Run: `npm run check`

Expected: Astro 检查命令可运行；若因页面尚不存在而提示空源目录，可接受该明确提示。

**Step 4: 提交**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src/env.d.ts public/robots.txt
git commit -m "chore: initialize Astro brand site"
```

### Task 2: 建立双语内容模型与测试

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/site.test.ts`

**Step 1: 编写失败测试**

测试应断言：

- 支持 `en` 和 `zh` 两种语言。
- 三个产品 URL 分别为 `https://findryai.com`、`https://pg.vastnext.com`、`https://vast-translator.vercel.app`。
- GlanceMD URL 为 `https://github.com/VastNext/GlanceMD`。
- 每种语言都有唯一标题、描述、导航、品牌主张、产品文案、未来方向和页脚文案。
- 语言切换分别指向 `/zh/` 和 `/`。

**Step 2: 验证测试失败**

Run: `npm test -- src/content/site.test.ts`

Expected: FAIL，原因是 `src/content/site.ts` 尚不存在。

**Step 3: 实现类型化内容字典**

创建 `Locale`、`Product`、`SiteCopy` 等类型，并导出 `siteCopy`、`products`、`openSourceProject` 和 `futureTracks`。产品事实只保存一次，翻译文案按语言保存。

**Step 4: 验证测试通过**

Run: `npm test -- src/content/site.test.ts`

Expected: PASS。

**Step 5: 提交**

```bash
git add src/content/site.ts src/content/site.test.ts
git commit -m "feat: add bilingual brand content model"
```

### Task 3: 建立品牌基础组件与 SEO 布局

**Files:**
- Create: `src/components/BrandMark.astro`
- Create: `src/components/ExternalIcon.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `public/favicon.svg`
- Create: `public/site.webmanifest`
- Create: `public/og-cover.svg`

**Step 1: 编写布局元数据断言**

在内容测试中加入对 canonical、语言代码和共享图像路径所需字段的断言。

**Step 2: 运行测试确认新增断言失败**

Run: `npm test -- src/content/site.test.ts`

Expected: FAIL，提示缺少对应元数据字段。

**Step 3: 实现品牌标记与布局**

- `BrandMark.astro` 绘制开放 V/N 航标 SVG，并支持仅图形与图形加字标两种模式。
- `BaseLayout.astro` 接受语言、标题、描述、canonical path，输出 canonical、hreflang、Open Graph、Twitter Card、主题色和 Organization JSON-LD。
- favicon 与 webmanifest 使用相同标记。
- OG 图使用暖白、靛蓝和彩色轨道组成静态品牌封面。

**Step 4: 运行测试和类型检查**

Run: `npm test -- src/content/site.test.ts && npm run check`

Expected: 全部 PASS，无 Astro/TypeScript 错误。

**Step 5: 提交**

```bash
git add src/components src/layouts public src/content/site.ts src/content/site.test.ts
git commit -m "feat: establish VastNext brand and metadata"
```

### Task 4: 实现共享单页品牌体验

**Files:**
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/ProductShowcase.astro`
- Create: `src/components/OpenSourceFeature.astro`
- Create: `src/components/FutureTracks.astro`
- Create: `src/components/AboutSection.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/BrandPage.astro`
- Create: `src/pages/index.astro`
- Create: `src/pages/zh/index.astro`

**Step 1: 编写构建输出测试**

创建测试或构建后断言脚本，验证英文和中文入口存在、每页包含对应 `lang`、H1、三个产品链接和 GlanceMD 链接。

**Step 2: 运行测试确认失败**

Run: `npm test`

Expected: FAIL，原因是页面或构建输出尚不存在。

**Step 3: 实现语义化页面组件**

- Header 提供锚点导航、GitHub 外链、语言切换和移动菜单。
- Hero 提供品牌主张、双 CTA 和纯 SVG/CSS 航标轨道。
- ProductShowcase 使用不等宽产品展台，并为三类产品绘制与功能相关的简化 UI。
- OpenSourceFeature 独立展示 GlanceMD 的平台、技术和许可证。
- FutureTracks 仅显示 Games 与 Utilities 的探索状态。
- AboutSection 解释 Vast、Next 和“瀚海·未来”。
- Footer 提供邮箱、GitHub、隐私政策和语言入口。
- 所有外链使用 `target="_blank"` 与 `rel="noreferrer"`，并包含可感知的新窗口提示。

**Step 4: 运行测试和生产构建**

Run: `npm test && npm run check && npm run build`

Expected: 全部 PASS，生成 `dist/index.html` 与 `dist/zh/index.html`。

**Step 5: 提交**

```bash
git add src/components src/pages
git commit -m "feat: build bilingual VastNext brand page"
```

### Task 5: 实现“明亮新界”视觉系统与动效

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/ProductShowcase.astro`
- Modify: `src/components/OpenSourceFeature.astro`

**Step 1: 建立视觉验收清单**

桌面宽度 1440px：

- 暖白背景、深靛蓝文字，首屏出现多彩航标体与轨道。
- 三个产品展台不等宽且使用柔紫、薄荷青和电光蓝区分。
- GlanceMD 独立横向展示，不与产品卡视觉同级。
- 页面避免重复的玻璃卡片、霓虹暗色背景和模板化渐变标题。

移动宽度 390px：

- 导航可操作且不溢出。
- 标题不截断，产品展台单列排列。
- 探索轨道转为纵向背景线。
- 所有按钮至少 44px 高。

**Step 2: 实现设计 token 与布局**

在 `global.css` 中定义颜色、字体、间距、圆角、边框、焦点和容器 token。使用 CSS Grid 建立不对称产品布局，使用 SVG 与伪元素完成轨道和航标，不引入图片生成依赖。

**Step 3: 实现轻量动效**

使用 CSS keyframes 和小型 IntersectionObserver 实现轨道漂移与进入动画。为 `prefers-reduced-motion: reduce` 禁用非必要动画并取消平滑滚动。

**Step 4: 启动预览并截图检查**

Run: `npm run dev -- --host 127.0.0.1`

使用浏览器工具检查：

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/zh/`
- 1440×1000 桌面视口
- 390×844 移动视口

Expected: 无横向滚动、无遮挡、无控制台错误，双语布局均成立。

**Step 5: 提交**

```bash
git add src/styles src/layouts src/components
git commit -m "style: create Bright Frontier visual system"
```

### Task 6: 添加隐私政策与静态部署文件

**Files:**
- Create: `src/pages/privacy.astro`
- Create: `src/pages/zh/privacy.astro`
- Create: `public/_headers`
- Create: `README.md`

**Step 1: 编写隐私页输出断言**

验证 `/privacy/` 与 `/zh/privacy/` 均存在，并包含“不主动收集个人信息、外部链接适用各自政策、联系邮箱”三类内容。

**Step 2: 运行测试确认失败**

Run: `npm test`

Expected: FAIL，原因是隐私页面尚不存在。

**Step 3: 实现隐私页面与部署说明**

- 两种语言使用共享布局和各自文案。
- `_headers` 添加基础安全响应头，但不设置会破坏字体或 SVG 的过严 CSP。
- README 记录本地命令、Cloudflare Pages 构建命令 `npm run build`、输出目录 `dist`、域名 `vastnext.com` 和 DNS/自定义域名配置提示。

**Step 4: 构建并验证输出**

Run: `npm test && npm run check && npm run build`

Expected: 全部 PASS，隐私页、sitemap、robots.txt 和 `_headers` 均出现在 `dist`。

**Step 5: 提交**

```bash
git add src/pages public/_headers README.md
git commit -m "docs: add privacy and Cloudflare deployment"
```

### Task 7: 完整质量验证与收尾

**Files:**
- Modify: 仅修改验证发现的具体问题文件

**Step 1: 运行完整自动化验证**

Run: `npm test && npm run check && npm run build`

Expected: 全部命令退出码为 0。

**Step 2: 运行浏览器与可访问性检查**

检查四种页面组合：桌面英文、桌面中文、移动英文、移动中文。确认：

- 页面无控制台错误。
- 导航锚点、语言切换、产品链接、GitHub、邮箱和隐私页可达。
- 键盘焦点清晰，跳过导航链接有效。
- 减少动态效果偏好生效。
- Lighthouse 的 Performance、Accessibility、Best Practices、SEO 均无关键失败项。

**Step 3: 检查 Git 差异**

Run: `git status --short && git diff --check`

Expected: 仅包含预期修改，无空白错误。

**Step 4: 修复验证发现的问题并重新运行完整验证**

Run: `npm test && npm run check && npm run build`

Expected: 全部 PASS。

**Step 5: 提交最终修复**

仅在确有修复时执行：

```bash
git add <修复文件>
git commit -m "fix: polish brand site experience"
```
