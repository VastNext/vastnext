# VastNext 双开源展台设计

日期：2026-08-31

## 目标

将 VastNext 官网的开源区域从单个 GlanceMD 展台升级为两个同层级项目展台，新增 OpenCode Rapid Agent Team，并同步 GlanceMD 最新的跨平台能力。

访客应能快速理解两个项目的区别：

- GlanceMD 是轻量、原生、跨平台的 Markdown 查看器与编辑器。
- OpenCode Rapid Agent Team 是面向 OpenCode 的可自安装异构多 Agent 软件开发团队范例。

## 项目事实

### GlanceMD

- 地址：`https://github.com/VastNext/GlanceMD`
- 平台：Windows、macOS、Linux
- 技术：Rust + 系统 WebView
- 系统实现：Windows WebView2、macOS WebKit、Linux WebKitGTK
- 能力：查看与编辑、实时预览、分屏、多标签、目录、查找、深浅主题
- 最新核验版本：v1.6.3
- 许可证：MIT

### OpenCode Rapid Agent Team

- 地址：`https://github.com/VastNext/opencode-rapid-agent-team`
- 定位：可移植的 OpenCode Agent Team 配置范例
- 技术：OpenCode、Python 安装与验证脚本、多 Agent 配置
- 能力：自安装、Fast / Standard / Strict 自适应档位、异构并发、独立 Reviewer 与高风险 Architect
- 使用入口：`rapid-dev-team` Agent 与 `/rapid-dev` 命令
- 许可证：MIT

## 信息架构

保留现有 `Open by default / 默认开放` 章节，不新增独立 Agent Systems 章节。

章节结构：

1. 双语章节眉题与标题
2. 两个同层级项目展台
3. 每个展台包含：
   - 项目类型标签
   - 项目名称
   - 用户价值描述
   - 技术与状态标签
   - 功能相关视觉示意
   - GitHub 外链按钮

## 视觉设计

桌面端使用两个并列展台，移动端纵向排列。

### GlanceMD 展台

- 使用柔紫与暖白，延续 Markdown 排版主题。
- 示意图展示编辑器与预览分屏。
- 顶部显示 Windows、macOS、Linux 三个平台点。
- 保持原生桌面应用感，不使用暗色终端模板。

### Rapid Agent Team 展台

- 使用薄荷青、电光蓝与珊瑚信号点。
- 示意图展示 Primary Agent 连接 Scout、GLM、DeepSeek、Reviewer、Architect 的拓扑。
- 通过 Fast / Standard / Strict 小型档位标签表达自适应分级。
- 避免把 Agent Team 表现成聊天机器人或普通 AI 卡片。

两个展台共用结构和层级，但不做完全相同的内部图形，确保项目性质清楚可辨。

## 内容模型

将单个 `openSourceProject` 升级为以项目 ID 为键的 `openSourceProjectFacts`，并从事实键推导类型与遍历数组。

双语内容按项目 ID 保存：

- 类型标签
- 描述
- CTA
- 展台视觉中的辅助标签

名称、URL、技术栈、平台和许可证只保存在共享事实中，避免双语漂移。

## 可访问性与交互

- 两个项目使用语义化 `article`。
- 技术标签使用列表结构。
- 图形示意为装饰内容并对辅助技术隐藏。
- GitHub 外链保留新窗口提示。
- 展台自身不做 hover 弹起；仅按钮保留现有 hover 位移反馈。
- `prefers-reduced-motion` 行为沿用当前网站规则。

## 验证

- 内容模型测试验证两个项目的准确事实与双语文案键对齐。
- 构建产物测试验证两个 GitHub URL 在英文、中文页面中出现且外链属性完整。
- Astro 类型检查与生产构建通过。
- 浏览器验证桌面双列、移动单列、无横向滚动、无控制台错误。
- 部署后从 `vastnext.com` 验证两个项目链接和最新文案。

## 边界

本次不包含：

- GitHub API 实时星标或版本请求
- 项目详情子页面
- 安装脚本在线执行
- 新增第三个开源分类或独立导航项
- 改动产品区、未来方向区或品牌视觉系统
