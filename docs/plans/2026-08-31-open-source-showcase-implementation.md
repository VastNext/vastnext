# VastNext Dual Open-Source Showcase Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将官网开源区升级为 GlanceMD 与 OpenCode Rapid Agent Team 两个同层级双语展台，并同步 GlanceMD 跨平台事实。

**Architecture:** 共享项目事实使用以 ID 为键的对象，双语内容使用相同 ID 提供描述和 CTA；Astro 组件遍历两个项目并根据 ID 渲染专属视觉示意。现有导航锚点、外链安全、Reveal 动效和 Cloudflare Pages 部署方式保持不变。

**Tech Stack:** Astro、TypeScript、原生 CSS、Vitest、Cloudflare Pages

---

### Task 1: 扩展开源项目内容模型

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/content/site.test.ts`

**Step 1: 写失败测试**

断言共享事实包含：

- `glancemd`：Windows / macOS / Linux、Rust + System WebView、MIT、v1.6.3。
- `opencode-rapid-agent-team`：OpenCode、Python、Multi-agent、MIT、Fast / Standard / Strict。

断言英文和中文 `openSource.projects` 键与共享事实一致，并分别包含类型标签、描述和 CTA。

**Step 2: 验证测试失败**

Run: `npm test -- src/content/site.test.ts`

Expected: FAIL，当前只导出单个 `openSourceProject`。

**Step 3: 实现最小类型化模型**

创建 `openSourceProjectFacts`、`OpenSourceProjectId` 和派生数组。把 `SiteCopy.openSource` 改为章节文案加项目文案映射，删除旧的单项目字段。

**Step 4: 验证测试通过**

Run: `npm test -- src/content/site.test.ts`

Expected: PASS。

### Task 2: 实现双项目 Astro 结构

**Files:**
- Modify: `src/components/OpenSourceFeature.astro`
- Modify: `tests/build-output.test.ts`

**Step 1: 写失败的构建产物测试**

英文与中文页面均应包含两个项目 URL、名称和外链属性；GlanceMD 不再输出 Windows-only 标签。

**Step 2: 验证测试失败**

Run: `npm test -- tests/build-output.test.ts`

Expected: FAIL，新 Agent Team URL 尚未出现。

**Step 3: 实现双展台结构**

章节中遍历项目事实，每个项目使用 `article`、标签列表、CTA 和 `data-project`。根据项目 ID渲染 GlanceMD 分屏示意或 Agent 拓扑示意。

**Step 4: 验证测试通过**

Run: `npm test -- tests/build-output.test.ts`

Expected: PASS。

### Task 3: 实现双展台视觉与响应式

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/global.test.ts`

**Step 1: 写静态样式约束**

断言开源项目列表使用双列 Grid、移动端单列、每个项目有独立主题类；不允许项目卡片 hover transform，按钮 hover 仍保留。

**Step 2: 验证测试失败**

Run: `npm test -- src/styles/global.test.ts`

Expected: FAIL，当前开源区为单项目结构。

**Step 3: 实现视觉样式**

- GlanceMD：柔紫分屏编辑/预览窗口、跨平台点。
- Rapid Agent Team：薄荷/蓝拓扑、分级标签、异构 Agent 节点。
- 桌面双列，移动单列。
- 展台本身不做 hover 弹起。

**Step 4: 验证测试通过**

Run: `npm test -- src/styles/global.test.ts`

Expected: PASS。

### Task 4: 完整验证与部署

**Files:**
- Modify: 仅修复验证发现的具体问题

**Step 1: 运行完整自动化验证**

Run: `npm test && npm run check && npm run build && git diff --check`

Expected: 全部退出码为 0。

**Step 2: 运行浏览器验证**

验证英文/中文、桌面/移动：两个展台存在、无横向滚动、无控制台错误、链接可达。

**Step 3: 提交与推送**

```bash
git add src/content/site.ts src/content/site.test.ts src/components/OpenSourceFeature.astro src/styles/global.css src/styles/global.test.ts tests/build-output.test.ts docs/plans/2026-08-31-open-source-showcase-implementation.md
git commit -m "feat: showcase both VastNext open-source projects"
git push origin main
```

**Step 4: 验证 Cloudflare Pages**

等待 GitHub Actions 成功，从 `https://vastnext.com` 验证两个仓库链接和 GlanceMD 跨平台文案。
