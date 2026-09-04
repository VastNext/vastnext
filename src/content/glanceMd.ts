import type { Locale } from './site';

export const glanceMdFacts = {
  githubUrl: 'https://github.com/VastNext/GlanceMD',
  releasesUrl: 'https://github.com/VastNext/GlanceMD/releases/latest',
  issuesUrl: 'https://github.com/VastNext/GlanceMD/issues',
  pullsUrl: 'https://github.com/VastNext/GlanceMD/pulls',
  versionTag: 'GlanceMD v1.6.3 · MIT',
  version: 'v1.6.3',
  screenshots: {
    light: '/glance-md/preview-light.png',
    dark: '/glance-md/preview-dark.png',
    detail: '/glance-md/render-detail.png',
    icon: '/glance-md/icon.png',
  },
  downloadFiles: {
    windows: {
      file: 'GlanceMD-windows-x64.exe',
      size: '≈ 1.0 MB',
      url: 'https://github.com/VastNext/GlanceMD/releases/latest/download/GlanceMD-windows-x64.exe',
    },
    macosArm: {
      file: 'GlanceMD-macos-arm64-unsigned.dmg',
      size: '≈ 0.8 MB',
      url: 'https://github.com/VastNext/GlanceMD/releases/latest/download/GlanceMD-macos-arm64-unsigned.dmg',
    },
    macosIntel: {
      file: 'GlanceMD-macos-x64-unsigned.dmg',
      size: '≈ 0.8 MB',
      url: 'https://github.com/VastNext/GlanceMD/releases/latest/download/GlanceMD-macos-x64-unsigned.dmg',
    },
    linuxDeb: {
      file: 'GlanceMD_1.6.3_amd64.deb',
      size: '≈ 1.8 MB',
      url: 'https://github.com/VastNext/GlanceMD/releases/download/v1.6.3/GlanceMD_1.6.3_amd64.deb',
    },
    linuxAppImage: {
      file: 'GlanceMD_1.6.3_x86_64.AppImage',
      size: '≈ 73 MB',
      url: 'https://github.com/VastNext/GlanceMD/releases/download/v1.6.3/GlanceMD_1.6.3_x86_64.AppImage',
    },
  },
} as const;

export type GlanceMdDownloadKey = keyof typeof glanceMdFacts.downloadFiles;

export interface GlanceMdFeature {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: readonly string[];
  visual: 'screenshot-dark' | 'screenshot-detail' | 'shortcuts' | 'stack';
  screenshotAlt?: string;
  tagColor: 'grape' | 'pink' | 'indigo' | 'amber';
}

export interface GlanceMdCopy {
  title: string;
  description: string;
  tagline: string;
  nav: {
    home: string;
    productName: string;
    features: string;
    elegant: string;
    download: string;
    community: string;
    github: string;
    languageSwitchLabel: string;
    languageSwitchHref: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    tagline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badges: readonly string[];
    windowTitle: string;
    captionLabel: string;
    captionNote: string;
  };
  stats: readonly {
    value: string;
    label: string;
  }[];
  keyPillars: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly {
      icon: string;
      title: string;
      desc: string;
      accent: 'grape' | 'pink' | 'indigo' | 'amber';
    }[];
  };
  features: readonly GlanceMdFeature[];
  shortcuts: readonly {
    keys: readonly string[];
    action: string;
  }[];
  stack: {
    windowTitle: string;
    layers: readonly {
      name: string;
      desc: string;
    }[];
    excludedLabel: string;
    excluded: readonly string[];
  };
  downloads: {
    eyebrow: string;
    title: string;
    description: string;
    cards: readonly {
      key: GlanceMdDownloadKey;
      platform: string;
      note: string;
    }[];
    downloadLabel: string;
    macosNote: string;
    allReleasesLabel: string;
  };
  community: {
    eyebrow: string;
    title: string;
    description: string;
    cardOpenSource: {
      tag: string;
      title: string;
      desc: string;
      meta: readonly string[];
      linkText: string;
    };
    cardIssues: {
      tag: string;
      title: string;
      desc: string;
      meta: readonly string[];
      linkText: string;
    };
    cardPulls: {
      tag: string;
      title: string;
      desc: string;
      meta: readonly string[];
      linkText: string;
    };
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryBtn: string;
    secondaryBtn: string;
    note: string;
  };
  footer: {
    brandTagline: string;
    backToHome: string;
    privacyPolicy: string;
    githubRepo: string;
    copyright: string;
  };
}

export const glanceMdCopy: Record<Locale, GlanceMdCopy> = {
  en: {
    title: 'GlanceMD — Lightweight, Elegant Markdown Viewer & Editor',
    description:
      'GlanceMD is a free, open-source Markdown viewer and editor: a ~1 MB single file on Windows, no Electron, Notepad-fast startup, and elegant Marco typography. Native packages for Windows, macOS, and Linux.',
    tagline: 'Notepad-fast startup · Obsidian-pretty rendering · Zero Electron',
    nav: {
      home: 'VastNext',
      productName: 'GlanceMD',
      features: 'Features',
      elegant: 'Elegant Rendering',
      download: 'Download',
      community: 'Open Source',
      github: 'GitHub',
      languageSwitchLabel: '中文',
      languageSwitchHref: '/zh/glance-md/',
    },
    hero: {
      eyebrow: 'Free & Open Source Desktop App',
      title: 'Light to the core.',
      titleAccent: 'Elegant by design.',
      tagline: 'Notepad-fast startup · Obsidian-pretty rendering · Zero Electron',
      description:
        'GlanceMD is a cross-platform Markdown viewer and editor built with Rust and the system webview. It opens as fast as Notepad, renders with the refined Marco typography, and ships as a single ~1 MB executable on Windows — no installer, no Electron, no bloat.',
      ctaPrimary: 'Download Latest Release',
      ctaSecondary: 'Explore Features',
      badges: ['Windows · macOS · Linux', '~1 MB single file on Windows', 'No Electron', 'MIT · Free & open source'],
      windowTitle: 'GlanceMD — README.md',
      captionLabel: 'Marco typography · Light theme',
      captionNote: 'Real app window — gradient headings, full-width content, outline sidebar',
    },
    stats: [
      { value: '≈ 1 MB', label: 'Single-file Windows executable' },
      { value: '0', label: 'Electron or Node runtime bundled' },
      { value: '30+', label: 'Languages with syntax highlighting' },
      { value: '3', label: 'Desktop platforms with native packages' },
    ],
    keyPillars: {
      eyebrow: 'Why GlanceMD',
      title: 'Light Where It Matters, Beautiful Where It Counts',
      description:
        'Markdown tools usually make you choose: tiny viewers that render poorly, or gorgeous editors that take a minute to launch. GlanceMD refuses the trade-off.',
      items: [
        {
          icon: '⚡',
          title: 'Truly Lightweight',
          desc: 'Rust plus the webview your OS already ships. No Electron, no Node, no bundler — the Windows build is one ~1 MB executable with every asset embedded.',
          accent: 'grape',
        },
        {
          icon: '🎨',
          title: 'Elegant by Default',
          desc: 'The Marco typography theme comes built in: gradient headings, full-width content, zebra tables, and a comfortable reading measure. Beautiful out of the box.',
          accent: 'pink',
        },
        {
          icon: '🚀',
          title: 'Starts Instantly',
          desc: 'A native window powered by WebView2, WebKit, or WebKitGTK opens as fast as Notepad and stays light on memory, file after file.',
          accent: 'indigo',
        },
        {
          icon: '🛠️',
          title: 'Open & Free',
          desc: 'MIT-licensed and developed in the open on GitHub. Inspect it, fork it, shape the roadmap — no accounts, no telemetry, no paywalls.',
          accent: 'amber',
        },
      ],
    },
    features: [
      {
        id: 'marco-typography',
        badge: 'Elegant Rendering',
        title: 'The Marco Typography, Built In',
        subtitle: 'Gradient headings, full-width layouts, and a theme for every hour',
        description:
          'GlanceMD ships with the preview style of the Marco reader: left-aligned purple-to-pink gradient headings, content and tables that span the whole window, zebra rows with hover highlights, and calm code blocks with language labels. One click switches the entire app between light and dark.',
        highlights: [
          'Purple → pink gradient headings on every section',
          'Full-width content and zebra-striped tables',
          'Code blocks with language tags, tuned for light & dark',
          'One-click light / dark theme toggle',
        ],
        visual: 'screenshot-dark',
        screenshotAlt: 'GlanceMD dark theme rendering a Markdown document with gradient headings and outline sidebar',
        tagColor: 'pink',
      },
      {
        id: 'live-preview',
        badge: 'Live Rendering',
        title: 'Live Preview with Full GFM Support',
        subtitle: 'Tables, task lists, footnotes, and 30+ highlighted languages',
        description:
          'Reading and editing stay in sync. GlanceMD renders GitHub-Flavored Markdown through marked.js — tables, task lists, footnotes, strikethrough — while highlight.js colors over 30 languages. Press Ctrl+\\ for split view and watch the preview follow every keystroke.',
        highlights: [
          'Full GFM: tables, task lists, footnotes',
          'Split view with live sync (Ctrl+\\)',
          '30+ syntax-highlighted languages',
          'Adjustable preview width — just drag the edge',
        ],
        visual: 'screenshot-detail',
        screenshotAlt: 'Close-up of GlanceMD rendering GFM lists, bold text, and inline icons with a gradient section heading',
        tagColor: 'grape',
      },
      {
        id: 'focused-workflow',
        badge: 'Focused Workflow',
        title: 'A Keyboard-First Reading Workbench',
        subtitle: 'Tabs, outline, find, and zoom — one shortcut away',
        description:
          'Keep several documents open in tabs, jump through the auto-generated outline, find anything inside the document, and zoom to your eyes’ comfort. Drop any .md file onto the window to open it, and set GlanceMD as your system default Markdown viewer.',
        highlights: [
          'Multi-tab with an auto-hiding tab bar',
          'Auto outline sidebar (Ctrl+Shift+O)',
          'Find in document with match navigation (Ctrl+F)',
          'Drag & drop files, recent-files panel, file association',
        ],
        visual: 'shortcuts',
        tagColor: 'indigo',
      },
      {
        id: 'native-core',
        badge: 'Native Core',
        title: 'Rust Core, System WebView, Zero Bloat',
        subtitle: 'Every frontend asset compiled into one native binary',
        description:
          'Windowing and file I/O run in Rust through tao + wry, and rendering is handled by the webview your OS already ships — WebView2 on Windows, WebKit on macOS, WebKitGTK on Linux. HTML, CSS, and JavaScript are embedded at compile time via include_str!. Based on the open-source Peekdown project, with the Marco theme.',
        highlights: [
          'tao + wry: windowing and IPC in pure Rust',
          'System webview — nothing heavy bundled',
          'Assets embedded at compile time (include_str!)',
          'Built on open-source Peekdown · Marco theme',
        ],
        visual: 'stack',
        tagColor: 'amber',
      },
    ],
    shortcuts: [
      { keys: ['Ctrl', 'E'], action: 'Toggle edit / preview' },
      { keys: ['Ctrl', '\\'], action: 'Toggle split view' },
      { keys: ['Ctrl', 'F'], action: 'Find in document' },
      { keys: ['Ctrl', 'Shift', 'O'], action: 'Outline sidebar' },
      { keys: ['Ctrl', 'N'], action: 'New tab' },
      { keys: ['Ctrl', 'W'], action: 'Close tab' },
      { keys: ['Ctrl', 'Tab'], action: 'Next tab' },
      { keys: ['Ctrl', '='], action: 'Zoom in' },
    ],
    stack: {
      windowTitle: 'How GlanceMD is built',
      layers: [
        { name: 'Your Markdown', desc: '.md files on your disk' },
        { name: 'Embedded UI', desc: 'marked.js + highlight.js, compiled in' },
        { name: 'System WebView', desc: 'WebView2 / WebKit / WebKitGTK' },
        { name: 'Rust Core', desc: 'tao + wry — windows, files, IPC' },
      ],
      excludedLabel: 'Never bundled',
      excluded: ['Electron', 'Node.js', 'Bundler'],
    },
    downloads: {
      eyebrow: 'Get GlanceMD',
      title: 'One Click, One File, Ready to Run',
      description:
        'Grab the latest release straight from GitHub — Windows ships as a single portable executable, while macOS and Linux use native packages. All downloads below come from the latest release.',
      cards: [
        { key: 'windows', platform: 'Windows 10/11 · x64', note: 'Portable — no install needed' },
        { key: 'macosArm', platform: 'macOS · Apple Silicon', note: 'Unsigned DMG' },
        { key: 'macosIntel', platform: 'macOS · Intel', note: 'Unsigned DMG' },
        { key: 'linuxDeb', platform: 'Linux · Debian / Ubuntu', note: 'amd64 .deb package' },
        { key: 'linuxAppImage', platform: 'Linux · AppImage', note: 'Self-contained runtime' },
      ],
      downloadLabel: 'Download',
      macosNote:
        'macOS packages are not yet signed or notarized. On first launch, allow the app under System Settings → Privacy & Security.',
      allReleasesLabel: 'Browse all releases & checksums',
    },
    community: {
      eyebrow: 'Free & Open Source',
      title: 'Open by Design, Built in the Open',
      description:
        'GlanceMD grows on GitHub, deeply developed from the open-source Peekdown project with the Marco typography theme. Inspect the code, report issues, and help shape the next release.',
      cardOpenSource: {
        tag: 'Open Source',
        title: 'MIT-Licensed & Transparent',
        desc: 'Read the Rust core, the embedded UI, and the theme pipeline. Star the repo to follow each release.',
        meta: ['GitHub repository', 'Rust + System WebView', 'MIT license'],
        linkText: 'View Repository',
      },
      cardIssues: {
        tag: 'Feedback & Bugs',
        title: 'Report Issues & Requests',
        desc: 'Found a rendering glitch on your platform, or need a feature for your workflow? Open an issue and drive the roadmap.',
        meta: ['Bug reports', 'Feature requests', 'Platform-specific tips'],
        linkText: 'Browse Issues',
      },
      cardPulls: {
        tag: 'Code Contributions',
        title: 'Contribute Pull Requests',
        desc: 'Improve the renderer, add theme options, extend keyboard control, or package GlanceMD for more platforms — PRs are welcome.',
        meta: ['PRs welcome', 'Theme tuning', 'Platform packaging'],
        linkText: 'Browse Pull Requests',
      },
    },
    cta: {
      eyebrow: 'Start Reading Markdown Beautifully',
      title: 'Feather-light. Elegant. Free.',
      description:
        'Download the latest release, set GlanceMD as your default .md viewer, and give every Markdown file the reading experience it deserves.',
      primaryBtn: 'Download the Latest Release',
      secondaryBtn: 'Star on GitHub',
      note: 'Free & open source · MIT · Windows / macOS / Linux',
    },
    footer: {
      brandTagline: 'Useful ideas, built for what comes next.',
      backToHome: 'Back to VastNext Home',
      privacyPolicy: 'Privacy Policy',
      githubRepo: 'GitHub Repository',
      copyright: '© 2026 VastNext. Built in the open on GitHub.',
    },
  },
  zh: {
    title: 'GlanceMD — 轻量优雅的跨平台 Markdown 查看器与编辑器',
    description:
      'GlanceMD 是免费开源的 Markdown 查看器与编辑器：Windows 单文件约 1 MB、不含 Electron、启动媲美记事本、内置 Marco 优雅排版。提供 Windows / macOS / Linux 系统原生安装包，免费下载。',
    tagline: '启动媲美记事本 · 渲染媲美 Obsidian · 零 Electron',
    nav: {
      home: '瀚海未来首页',
      productName: 'GlanceMD',
      features: '功能特性',
      elegant: '优雅排版',
      download: '下载安装',
      community: '开源共建',
      github: 'GitHub',
      languageSwitchLabel: 'English',
      languageSwitchHref: '/glance-md/',
    },
    hero: {
      eyebrow: '免费开源的桌面应用',
      title: '轻量至极，',
      titleAccent: '优雅天成。',
      tagline: '启动媲美记事本 · 渲染媲美 Obsidian · 零 Electron',
      description:
        'GlanceMD 是一款用 Rust 与系统原生 WebView 打造的跨平台 Markdown 查看器与编辑器：打开速度媲美记事本，内置 Marco 优雅排版，Windows 上是约 1 MB 的单文件程序——免安装、无 Electron、毫无臃肿。',
      ctaPrimary: '下载最新版本',
      ctaSecondary: '浏览核心特性',
      badges: ['Windows · macOS · Linux', 'Windows 单文件约 1 MB', '不含 Electron', 'MIT · 免费开源'],
      windowTitle: 'GlanceMD — README.md',
      captionLabel: 'Marco 排版 · 浅色主题',
      captionNote: '真实应用窗口 — 渐变标题、通栏排版、大纲侧栏',
    },
    stats: [
      { value: '≈ 1 MB', label: 'Windows 单文件体积' },
      { value: '0', label: 'Electron / Node 运行时依赖' },
      { value: '30+', label: '语法高亮语言' },
      { value: '3', label: '桌面平台原生安装包' },
    ],
    keyPillars: {
      eyebrow: '为什么选择 GlanceMD',
      title: '该轻的地方极致轻，该美的地方真正美',
      description:
        'Markdown 工具常常让你二选一：要么体积小巧但渲染寒酸，要么渲染精美却启动缓慢。GlanceMD 拒绝这种取舍。',
      items: [
        {
          icon: '⚡',
          title: '极致轻量',
          desc: 'Rust + 操作系统自带的 WebView：无 Electron、无 Node、无打包器。Windows 版是约 1 MB 的单文件程序，资源全部内嵌。',
          accent: 'grape',
        },
        {
          icon: '🎨',
          title: '默认优雅',
          desc: '内置 Marco 排版主题：渐变标题、通栏内容、斑马纹表格与舒适的阅读字号，开箱即美。',
          accent: 'pink',
        },
        {
          icon: '🚀',
          title: '秒开秒用',
          desc: '原生窗口由 WebView2、WebKit 或 WebKitGTK 驱动，启动媲美记事本，连续打开文件依然轻松流畅。',
          accent: 'indigo',
        },
        {
          icon: '🛠️',
          title: '开放免费',
          desc: 'MIT 许可证，在 GitHub 上开放共建。可审查、可分叉、可参与规划——无账号、无遥测、无付费墙。',
          accent: 'amber',
        },
      ],
    },
    features: [
      {
        id: 'marco-typography',
        badge: '优雅排版',
        title: '内置 Marco 优雅排版',
        subtitle: '渐变标题、通栏布局，还有适配全天候的主题',
        description:
          'GlanceMD 内置来自 Marco 阅读器的预览排版：紫粉渐变的居左标题、铺满整窗的内容与表格、带悬停高亮的斑马纹行，以及标注语言标签的清爽代码块。一键即可在整个应用中切换深色与浅色主题。',
        highlights: [
          '每个章节标题都带紫 → 粉渐变配色',
          '内容与表格铺满全宽，表格带斑马纹',
          '代码块带语言标签，深浅配色各自调优',
          '一键切换深色 / 浅色主题',
        ],
        visual: 'screenshot-dark',
        screenshotAlt: 'GlanceMD 深色主题渲染 Markdown 文档，可见渐变标题与大纲侧栏',
        tagColor: 'pink',
      },
      {
        id: 'live-preview',
        badge: '实时渲染',
        title: '实时预览，完整支持 GFM',
        subtitle: '表格、任务列表、脚注，30+ 种语言语法高亮',
        description:
          '阅读与编辑始终同步。GlanceMD 通过 marked.js 渲染 GitHub 风味 Markdown——表格、任务列表、脚注、删除线一样不少，highlight.js 为 30 多种语言着色。按下 Ctrl+\\ 进入分屏，预览随每一次输入实时刷新。',
        highlights: [
          '完整 GFM 支持：表格、任务列表、脚注',
          '分屏对照，实时同步（Ctrl+\\）',
          '30+ 种语言语法高亮',
          '预览宽度可调，拖动边缘即可',
        ],
        visual: 'screenshot-detail',
        screenshotAlt: 'GlanceMD 渲染 GFM 列表与加粗文本的细节，渐变章节标题清晰可见',
        tagColor: 'grape',
      },
      {
        id: 'focused-workflow',
        badge: '高效操作',
        title: '键盘优先的阅读工作台',
        subtitle: '多标签、大纲、查找、缩放，一个快捷键直达',
        description:
          '多个文档以标签页并行打开，自动生成的大纲随时跳转，文档内查找一步到位，缩放贴合双眼。把任意 .md 文件拖进窗口即可打开，还能把 GlanceMD 设为系统默认的 Markdown 查看器。',
        highlights: [
          '多标签页，单文件时自动隐藏标签栏',
          '自动大纲侧栏（Ctrl+Shift+O）',
          '文档内查找，匹配项高亮跳转（Ctrl+F）',
          '拖放打开、最近文件面板、系统文件关联',
        ],
        visual: 'shortcuts',
        tagColor: 'indigo',
      },
      {
        id: 'native-core',
        badge: '轻量内核',
        title: 'Rust 内核 + 系统 WebView，零冗余',
        subtitle: '全部前端资源编译进一个原生二进制',
        description:
          '窗口管理与文件读写由 Rust（tao + wry）完成，渲染交给操作系统自带的 WebView——Windows 用 WebView2，macOS 用 WebKit，Linux 用 WebKitGTK。HTML、CSS、JavaScript 在编译期通过 include_str! 全部内嵌。项目基于开源的 Peekdown 深度开发，并采用 Marco 排版主题。',
        highlights: [
          'tao + wry：纯 Rust 实现窗口与进程通信',
          '系统自带 WebView，不捆绑沉重运行时',
          '资源编译期内嵌（include_str!）',
          '基于开源 Peekdown 深度开发 · Marco 主题',
        ],
        visual: 'stack',
        tagColor: 'amber',
      },
    ],
    shortcuts: [
      { keys: ['Ctrl', 'E'], action: '切换编辑 / 预览' },
      { keys: ['Ctrl', '\\'], action: '切换分屏视图' },
      { keys: ['Ctrl', 'F'], action: '文档内查找' },
      { keys: ['Ctrl', 'Shift', 'O'], action: '大纲侧栏' },
      { keys: ['Ctrl', 'N'], action: '新建标签页' },
      { keys: ['Ctrl', 'W'], action: '关闭标签页' },
      { keys: ['Ctrl', 'Tab'], action: '下一个标签页' },
      { keys: ['Ctrl', '='], action: '放大' },
    ],
    stack: {
      windowTitle: 'GlanceMD 的构建方式',
      layers: [
        { name: '你的 Markdown', desc: '磁盘上的 .md 文件' },
        { name: '内嵌 UI', desc: 'marked.js + highlight.js，编译期内嵌' },
        { name: '系统 WebView', desc: 'WebView2 / WebKit / WebKitGTK' },
        { name: 'Rust 内核', desc: 'tao + wry — 窗口、文件、进程通信' },
      ],
      excludedLabel: '绝不捆绑',
      excluded: ['Electron', 'Node.js', '打包器'],
    },
    downloads: {
      eyebrow: '获取 GlanceMD',
      title: '单击下载，打开即用',
      description:
        '直接从 GitHub 获取最新版本：Windows 提供单文件便携程序，macOS 与 Linux 提供系统原生软件包。以下下载均来自最新发布版本。',
      cards: [
        { key: 'windows', platform: 'Windows 10/11 · x64', note: '便携单文件，免安装' },
        { key: 'macosArm', platform: 'macOS · Apple Silicon', note: '未签名 DMG' },
        { key: 'macosIntel', platform: 'macOS · Intel', note: '未签名 DMG' },
        { key: 'linuxDeb', platform: 'Linux · Debian / Ubuntu', note: 'amd64 .deb 软件包' },
        { key: 'linuxAppImage', platform: 'Linux · AppImage', note: '自带完整运行时' },
      ],
      downloadLabel: '下载',
      macosNote: 'macOS 安装包暂未签名与公证，首次运行可能需要在「系统设置 → 隐私与安全性」中手动允许。',
      allReleasesLabel: '查看全部历史版本与校验信息',
    },
    community: {
      eyebrow: '免费开源',
      title: '开源透明，在开放中打磨进化',
      description:
        'GlanceMD 在 GitHub 上持续公开开发，基于开源项目 Peekdown 深度开发而来，并采用 Marco 阅读器的排版主题。欢迎查看源码、反馈问题，一起决定下一个版本。',
      cardOpenSource: {
        tag: '完全开源',
        title: 'MIT 许可，源码透明',
        desc: 'Rust 内核、内嵌 UI 与排版主题管线全部可读。给仓库点个 Star，跟随每个版本的发布。',
        meta: ['GitHub 仓库', 'Rust + 系统 WebView', 'MIT 许可证'],
        linkText: '查看 GitHub 仓库',
      },
      cardIssues: {
        tag: '反馈与需求',
        title: '提交 Issue 反馈问题',
        desc: '在你的系统上遇到渲染问题，或希望为你的工作流补充功能？提交 Issue，直接影响路线图。',
        meta: ['缺陷反馈', '功能建议', '平台适配技巧'],
        linkText: '前往 Issues 讨论区',
      },
      cardPulls: {
        tag: '代码贡献',
        title: '提交 Pull Request 共建',
        desc: '改进渲染管线、扩充主题选项、增强快捷键能力，或为更多平台打包分发——欢迎提交 PR。',
        meta: ['欢迎贡献 PR', '主题调优', '多平台打包'],
        linkText: '浏览 Pull Requests',
      },
    },
    cta: {
      eyebrow: '立即开启优雅的 Markdown 阅读',
      title: '轻量至极，优雅天成。',
      description: '下载最新版本，把 GlanceMD 设为默认的 .md 打开方式，让每一个 Markdown 文件都获得应有的阅读体验。',
      primaryBtn: '下载最新版本',
      secondaryBtn: '去 GitHub 点个 Star',
      note: '免费开源 · MIT 许可 · Windows / macOS / Linux',
    },
    footer: {
      brandTagline: 'Useful ideas, built for what comes next.',
      backToHome: '返回 瀚海未来首页',
      privacyPolicy: '隐私政策',
      githubRepo: 'GitHub 仓库',
      copyright: '© 2026 瀚海未来. Built in the open on GitHub.',
    },
  },
};
