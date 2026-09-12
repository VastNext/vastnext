import type { Locale } from './site';

export const glanceMdUltraFacts = {
  githubUrl: 'https://github.com/VastNext/GlanceMD-Ultra',
  releasesUrl: 'https://github.com/VastNext/GlanceMD-Ultra/releases/latest',
  issuesUrl: 'https://github.com/VastNext/GlanceMD-Ultra/issues',
  pullsUrl: 'https://github.com/VastNext/GlanceMD-Ultra/pulls',
  versionTag: 'GlanceMD Ultra v0.6.1 · MIT',
  version: 'v0.6.1',
  icon: '/glance-md-ultra/icon.png',
  screenshots: {
    hero: {
      en: '/glance-md-ultra/hero-en.png',
      zh: '/glance-md-ultra/hero-zh.png',
    },
    workspace: {
      en: '/glance-md-ultra/workspace-en.png',
      zh: '/glance-md-ultra/workspace-zh.png',
    },
    translate: {
      en: '/glance-md-ultra/translate-en.png',
      zh: '/glance-md-ultra/translate-zh.png',
    },
    selection: {
      en: '/glance-md-ultra/selection-en.png',
      zh: '/glance-md-ultra/selection-zh.png',
    },
    keybindings: {
      en: '/glance-md-ultra/keybindings-en.png',
      zh: '/glance-md-ultra/keybindings-zh.png',
    },
    outline: {
      en: '/glance-md-ultra/outline-en.png',
      zh: '/glance-md-ultra/outline-zh.png',
    },
  },
  downloadFiles: {
    windows: {
      file: 'GlanceMD-Ultra-windows-x64.exe',
      size: '≈ 6.8 MB',
      url: 'https://github.com/VastNext/GlanceMD-Ultra/releases/latest/download/GlanceMD-Ultra-windows-x64.exe',
    },
    macosArm: {
      file: 'GlanceMD-Ultra-macos-arm64-unsigned.dmg',
      size: '≈ 3.1 MB',
      url: 'https://github.com/VastNext/GlanceMD-Ultra/releases/latest/download/GlanceMD-Ultra-macos-arm64-unsigned.dmg',
    },
    macosIntel: {
      file: 'GlanceMD-Ultra-macos-x64-unsigned.dmg',
      size: '≈ 3.1 MB',
      url: 'https://github.com/VastNext/GlanceMD-Ultra/releases/latest/download/GlanceMD-Ultra-macos-x64-unsigned.dmg',
    },
    linuxDeb: {
      file: 'GlanceMD-Ultra_0.6.1_amd64.deb',
      size: '≈ 3.4 MB',
      url: 'https://github.com/VastNext/GlanceMD-Ultra/releases/download/v0.6.1/GlanceMD-Ultra_0.6.1_amd64.deb',
    },
    linuxAppImage: {
      file: 'GlanceMD-Ultra_0.6.1_x86_64.AppImage',
      size: '≈ 76 MB',
      url: 'https://github.com/VastNext/GlanceMD-Ultra/releases/download/v0.6.1/GlanceMD-Ultra_0.6.1_x86_64.AppImage',
    },
  },
} as const;

export type GlanceMdUltraDownloadKey = keyof typeof glanceMdUltraFacts.downloadFiles;
export type GlanceMdUltraScreenshotKey = keyof typeof glanceMdUltraFacts.screenshots;

export interface GlanceMdUltraFeature {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: readonly string[];
  visual: 'screenshot' | 'stack';
  screenshotKey?: GlanceMdUltraScreenshotKey;
  screenshotAlt?: string;
  tagColor: 'grape' | 'pink' | 'indigo' | 'amber';
}

export interface GlanceMdUltraCopy {
  title: string;
  description: string;
  tagline: string;
  nav: {
    home: string;
    productName: string;
    features: string;
    translation: string;
    keybindings: string;
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
  features: readonly GlanceMdUltraFeature[];
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
      key: GlanceMdUltraDownloadKey;
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

export const glanceMdUltraCopy: Record<Locale, GlanceMdUltraCopy> = {
  en: {
    title: 'GlanceMD Ultra — Markdown Workspace with Built-in Translation',
    description:
      'GlanceMD Ultra is a free, open-source Markdown workspace editor: a project tree with real file operations, built-in LexiLayer translation, fully rebindable shortcuts, project-wide search, and crash-safe file watching — a 2–8 MB native executable for Windows, macOS, and Linux.',
    tagline: 'Project tree · Built-in translation · Custom shortcuts · Zero Electron',
    nav: {
      home: 'VastNext',
      productName: 'GlanceMD Ultra',
      features: 'Features',
      translation: 'Translation',
      keybindings: 'Shortcuts',
      download: 'Download',
      community: 'Open Source',
      github: 'GitHub',
      languageSwitchLabel: '中文',
      languageSwitchHref: '/zh/glance-md-ultra/',
    },
    hero: {
      eyebrow: 'Free & Open Source Workspace Editor',
      title: 'A whole Markdown workspace,',
      titleAccent: 'still feather-light.',
      tagline: 'Project tree · Built-in translation · Custom shortcuts · Zero Electron',
      description:
        'GlanceMD Ultra grows GlanceMD into a full local workspace: a project tree with real file operations, built-in LexiLayer translation, fully rebindable shortcuts, project-wide search, and crash-safe file watching — all in one native executable with zero dependencies.',
      ctaPrimary: 'Download Latest Release',
      ctaSecondary: 'Explore Features',
      badges: ['Windows · macOS · Linux', 'Built-in LexiLayer translation', 'Rebindable shortcuts', 'MIT · Free & open source'],
      windowTitle: 'GlanceMD Ultra',
      captionLabel: 'Split view · Bilingual translation',
      captionNote: 'Real app window — project tree, tabs, and LexiLayer at work',
    },
    stats: [
      { value: '2–8 MB', label: 'Single-file executable, zero dependencies' },
      { value: '3', label: 'Translation engines built in' },
      { value: '100%', label: 'Shortcuts rebindable with conflict detection' },
      { value: '2', label: 'UI languages with one-click switch' },
    ],
    keyPillars: {
      eyebrow: 'Why Ultra',
      title: 'More Workspace, Same Featherweight',
      description:
        'Ultra keeps everything that made GlanceMD fast and elegant, then adds the pieces a single-file viewer could not hold: a workspace, translation, and shortcuts that bend to you.',
      items: [
        {
          icon: '🌲',
          title: 'A Real Workspace',
          desc: 'Open any folder as a project: lazy-loading tree, create / rename / move / copy / delete with undo, reveal in file manager, open in terminal.',
          accent: 'grape',
        },
        {
          icon: '🈯',
          title: 'Translation Built In',
          desc: 'LexiLayer lives inside: bilingual or translation-only preview, selection translate with write-back, Google / Bing / OpenAI-compatible engines.',
          accent: 'pink',
        },
        {
          icon: '⌨️',
          title: 'Shortcuts That Fit You',
          desc: 'Rebind every command with conflict detection, start from Eclipse or VS Code schemes, and search them all in the Key Assist overlay.',
          accent: 'indigo',
        },
        {
          icon: '🛡️',
          title: 'Safe & Still Light',
          desc: 'File watching with external-change protection, atomic saves, and crash-recovery snapshots — inside a 2–8 MB native binary.',
          accent: 'amber',
        },
      ],
    },
    features: [
      {
        id: 'workspace',
        badge: 'Workspace',
        title: 'Open a Folder, Get a Workspace',
        subtitle: 'A project tree with real file operations',
        description:
          'Point Ultra at any folder and it becomes a project: a lazy-loading tree that stays instant on thousands of files, with create, rename, move, copy, and delete — undo included. Reveal files in the file manager, open a terminal right where you are, and search the whole project from a dedicated full-text panel.',
        highlights: [
          'Lazy-loading project tree, instant even on big folders',
          'Create / rename / move / copy / delete with undo',
          'Reveal in file manager · open in terminal',
          'Project-wide full-text search panel',
          'File watching: external-change protection & atomic saves',
        ],
        visual: 'screenshot',
        screenshotKey: 'workspace',
        screenshotAlt: 'GlanceMD Ultra project tree with the context menu showing full file operations',
        tagColor: 'grape',
      },
      {
        id: 'translation',
        badge: 'Built-in Translation',
        title: 'LexiLayer Translation, Built In',
        subtitle: 'Translate the whole preview or just a selection',
        description:
          'The LexiLayer engine ships inside Ultra. Turn the preview into a bilingual side-by-side reading view or a translation-only layout, pick your engine per task — Google, Bing, or any OpenAI-compatible endpoint — and watch progress in a status toast that keeps every translation visible.',
        highlights: [
          'Bilingual side-by-side or translation-only preview layouts',
          'Engines: Google, Bing, or OpenAI-compatible endpoints',
          'Engine, target language, and layout in one popup',
          'Original text is one click away — restore anytime',
          'Progress toast with segment count and timing',
        ],
        visual: 'screenshot',
        screenshotKey: 'translate',
        screenshotAlt: 'GlanceMD Ultra translation popup with engine, target language, and layout options',
        tagColor: 'pink',
      },
      {
        id: 'selection',
        badge: 'Write in Two Languages',
        title: 'Translate a Selection, Write It Back',
        subtitle: 'From a highlighted sentence to replaced text in one keystroke',
        description:
          'Select any sentence in the editor and Alt+Shift+X swaps it for the translation. The bubble offers Replace, Insert, or Copy, so you can draft in one language and localize as you go — perfect for bilingual notes, documentation, and study material.',
        highlights: [
          'Alt+T translates the selection into a bubble',
          'Alt+Shift+X replaces the selection in place',
          'Choose Replace, Insert, or Copy per snippet',
          'Target language and engine switchable on the fly',
          'Global hotkeys keep working when the popup is closed',
        ],
        visual: 'screenshot',
        screenshotKey: 'selection',
        screenshotAlt: 'GlanceMD Ultra selection translation bubble with Replace, Insert, and Copy actions',
        tagColor: 'grape',
      },
      {
        id: 'keybindings',
        badge: 'Keybindings',
        title: 'Shortcuts That Fit Your Hands',
        subtitle: 'Rebind everything, with conflict detection',
        description:
          'Every command is rebindable under Settings → Shortcuts, with live conflict detection. Start from the built-in Eclipse or VS Code schemes, and when a key slips your mind, Ctrl+Shift+L opens Key Assist — a searchable overlay listing every command and its binding.',
        highlights: [
          'Every command rebindable with live conflict detection',
          'Eclipse & VS Code keymap schemes out of the box',
          'Key Assist overlay (Ctrl+Shift+L) lists all commands',
          'Search commands, IDs, or shortcuts from one field',
          'Translation hotkeys work globally, popup or not',
        ],
        visual: 'screenshot',
        screenshotKey: 'keybindings',
        screenshotAlt: 'GlanceMD Ultra Key Assist overlay searching every command and shortcut',
        tagColor: 'indigo',
      },
      {
        id: 'outline',
        badge: 'Navigate Fast',
        title: 'Outline & Search, Everywhere',
        subtitle: 'Fuzzy-jump through headings, full-text across the project',
        description:
          'Ctrl+O opens the quick outline: a fuzzy filter over every heading that jumps straight to the line. Keep the outline panel docked for structure at a glance, and when a keyword hides somewhere in the workspace, the project search panel finds it across every file.',
        highlights: [
          'Quick outline fuzzy jump (Ctrl+O)',
          'Dockable outline panel (Ctrl+Shift+O)',
          'Heading-level chips with target line numbers',
          'Project-wide full-text search in a dedicated panel',
        ],
        visual: 'screenshot',
        screenshotKey: 'outline',
        screenshotAlt: 'GlanceMD Ultra quick outline overlay with fuzzy heading filtering',
        tagColor: 'amber',
      },
      {
        id: 'native-core',
        badge: 'Native Core',
        title: 'Native Core, Zero Bloat',
        subtitle: 'A single executable that opens workspaces like code .',
        description:
          'The same native recipe as GlanceMD: Rust (tao + wry) for windowing and file I/O, the OS webview for rendering, and every frontend asset embedded at compile time. The result is a single 2–8 MB executable — no Electron, no Node, no bundler — with a gmdu CLI that opens any folder from the terminal, like code .',
        highlights: [
          'Single 2–8 MB executable, zero dependencies',
          'gmdu . opens any folder from your terminal',
          'Bilingual UI: 简体中文 / English one-click switch',
          'Optional Vim mode with a command line',
          'Crash-recovery snapshots & atomic saves',
        ],
        visual: 'stack',
        tagColor: 'amber',
      },
    ],
    stack: {
      windowTitle: 'How Ultra is built',
      layers: [
        { name: 'Your Workspace', desc: 'local folders & .md files' },
        { name: 'Embedded UI', desc: 'marked.js + highlight.js + LexiLayer, compiled in' },
        { name: 'System WebView', desc: 'WebView2 / WebKit / WebKitGTK' },
        { name: 'Rust Core', desc: 'tao + wry — windows, files, IPC' },
      ],
      excludedLabel: 'Never bundled',
      excluded: ['Electron', 'Node.js', 'Bundler'],
    },
    downloads: {
      eyebrow: 'Get GlanceMD Ultra',
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
        'macOS packages are not yet signed or notarized. On first launch, right-click → Open, or allow the app under System Settings → Privacy & Security.',
      allReleasesLabel: 'Browse all releases & checksums',
    },
    community: {
      eyebrow: 'Free & Open Source',
      title: 'Open by Design, Built in the Open',
      description:
        'GlanceMD Ultra grows on GitHub, continuing the Peekdown → GlanceMD lineage with the Marco typography theme. Inspect the code, report issues, and help shape the next release.',
      cardOpenSource: {
        tag: 'Open Source',
        title: 'MIT-Licensed & Transparent',
        desc: 'Read the Rust core, the embedded UI, and the translation pipeline. Star the repo to follow each release.',
        meta: ['GitHub repository', 'Rust + System WebView', 'MIT license'],
        linkText: 'View Repository',
      },
      cardIssues: {
        tag: 'Feedback & Bugs',
        title: 'Report Issues & Requests',
        desc: 'Found a glitch on your platform, or missing a workspace feature your workflow needs? Open an issue and drive the roadmap.',
        meta: ['Bug reports', 'Feature requests', 'Platform-specific tips'],
        linkText: 'Browse Issues',
      },
      cardPulls: {
        tag: 'Code Contributions',
        title: 'Contribute Pull Requests',
        desc: 'Improve the translation pipeline, extend the workspace tree, add keymap schemes, or package Ultra for more platforms — PRs are welcome.',
        meta: ['PRs welcome', 'Translation engines', 'Platform packaging'],
        linkText: 'Browse Pull Requests',
      },
    },
    cta: {
      eyebrow: 'Start Working in One Workspace',
      title: 'A whole workspace. Still feather-light.',
      description:
        'Download the latest release, open your notes folder with gmdu ., and let translation, outlines, and shortcuts meet you at every keystroke.',
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
    title: 'GlanceMD Ultra — 内置翻译的 Markdown 工作区编辑器',
    description:
      'GlanceMD Ultra 是免费开源的 Markdown 工作区编辑器：项目树文件管理、内置语层翻译、快捷键完全自定义、全项目搜索与崩溃恢复的文件监视。2–8 MB 原生单文件，支持 Windows / macOS / Linux。',
    tagline: '项目树工作区 · 内置翻译 · 自定义快捷键 · 零 Electron',
    nav: {
      home: '瀚海未来首页',
      productName: 'GlanceMD Ultra',
      features: '功能特性',
      translation: '内置翻译',
      keybindings: '自定义快捷键',
      download: '下载安装',
      community: '开源共建',
      github: 'GitHub',
      languageSwitchLabel: 'English',
      languageSwitchHref: '/glance-md-ultra/',
    },
    hero: {
      eyebrow: '免费开源的工作区编辑器',
      title: '一整个 Markdown 工作区，',
      titleAccent: '依旧如此轻盈。',
      tagline: '项目树工作区 · 内置翻译 · 自定义快捷键 · 零 Electron',
      description:
        'GlanceMD Ultra 把 GlanceMD 升级为完整的本地工作区：项目树文件管理、内置语层翻译、快捷键完全自定义、全项目搜索与崩溃恢复的文件监视——全部装进一个零依赖的原生单文件。',
      ctaPrimary: '下载最新版本',
      ctaSecondary: '浏览核心特性',
      badges: ['Windows · macOS · Linux', '内置语层翻译', '快捷键完全自定义', 'MIT · 免费开源'],
      windowTitle: 'GlanceMD Ultra',
      captionLabel: '分屏视图 · 双语对照翻译',
      captionNote: '真实应用窗口 —— 项目树、多标签与语层翻译协同工作',
    },
    stats: [
      { value: '2–8 MB', label: '单文件可执行，零依赖' },
      { value: '3', label: '内置翻译引擎' },
      { value: '100%', label: '快捷键可重绑定，冲突自动检测' },
      { value: '2', label: '界面语言，一键切换' },
    ],
    keyPillars: {
      eyebrow: '为什么是 Ultra',
      title: '更多工作区能力，依旧轻盈',
      description:
        'Ultra 保留了 GlanceMD 的快速与优雅，又补上了单文件查看器装不下的那几块：工作区、翻译，以及随心定制的快捷键。',
      items: [
        {
          icon: '🌲',
          title: '真正的工作区',
          desc: '把任意文件夹作为项目打开：懒加载目录树，新建/重命名/移动/复制/删除全支持且可撤销，还能直达文件管理器与终端。',
          accent: 'grape',
        },
        {
          icon: '🈯',
          title: '翻译开箱即用',
          desc: '语层翻译内嵌其中：预览可双语对照或纯译文，划词即译并能原地回写，支持 Google、Bing 与 OpenAI 兼容引擎。',
          accent: 'pink',
        },
        {
          icon: '⌨️',
          title: '快捷键合你的手',
          desc: '每个命令都可重绑并自动检测冲突，内置 Eclipse 与 VS Code 键位方案，Key Assist 悬层可搜索全部快捷键。',
          accent: 'indigo',
        },
        {
          icon: '🛡️',
          title: '安全，依旧轻量',
          desc: '文件监视防外部改动、原子保存、崩溃恢复快照——装在一个 2–8 MB 的原生程序里。',
          accent: 'amber',
        },
      ],
    },
    features: [
      {
        id: 'workspace',
        badge: '工作区',
        title: '打开文件夹，即得工作区',
        subtitle: '带完整文件操作的项目树',
        description:
          '把 Ultra 指向任意文件夹，它就变成一个项目：懒加载目录树面对数千文件也毫不迟疑，新建、重命名、移动、复制、删除一应俱全且支持撤销。可以一键在文件管理器中显示文件、就地打开终端，还能在专属全文面板里搜索整个项目。',
        highlights: [
          '懒加载项目树，大文件夹也秒开',
          '新建 / 重命名 / 移动 / 复制 / 删除，全程可撤销',
          '直达文件管理器 · 就地打开终端',
          '全项目全文搜索面板',
          '文件监视：防外部改动与原子保存',
        ],
        visual: 'screenshot',
        screenshotKey: 'workspace',
        screenshotAlt: 'GlanceMD Ultra 项目树右键菜单，展示完整文件操作',
        tagColor: 'grape',
      },
      {
        id: 'translation',
        badge: '内置翻译',
        title: '内置语层翻译',
        subtitle: '整篇预览可译，划词也可译',
        description:
          '语层（LexiLayer）引擎直接内嵌在 Ultra 中。预览可以变成双语对照的阅读视图，也可以切换为纯译文版式；引擎按需选择——Google、Bing 或任意 OpenAI 兼容接口；翻译进度由状态气泡实时呈现，段数与耗时不缺席。',
        highlights: [
          '预览支持双语对照与纯译文两种版式',
          '引擎可选：Google、Bing 或 OpenAI 兼容接口',
          '引擎、目标语言、呈现模式集中在一个浮窗',
          '还原原文只需一键，随时回退',
          '进度气泡显示段数与耗时',
        ],
        visual: 'screenshot',
        screenshotKey: 'translate',
        screenshotAlt: 'GlanceMD Ultra 语层翻译浮窗，集中设置引擎、目标语言与呈现模式',
        tagColor: 'pink',
      },
      {
        id: 'selection',
        badge: '双语写作',
        title: '划词即译，原地回写',
        subtitle: '从选中一句话到原地替换，一次按键',
        description:
          '在编辑器里选中任意句子，按下 Alt+Shift+X 即可换成译文。气泡提供替换、插入、复制三种动作，你可以先用一种语言起草，再随手逐句本地化——双语笔记、文档与学习材料都顺手。',
        highlights: [
          'Alt+T 划词翻译，气泡即出',
          'Alt+Shift+X 翻译并原地替换选区',
          '每段译文可选替换、插入或复制',
          '目标语言与引擎随时切换',
          '全局热键生效，无关浮窗开关',
        ],
        visual: 'screenshot',
        screenshotKey: 'selection',
        screenshotAlt: 'GlanceMD Ultra 划词翻译气泡，提供替换、插入与复制操作',
        tagColor: 'grape',
      },
      {
        id: 'keybindings',
        badge: '自定义快捷键',
        title: '快捷键，合你的手',
        subtitle: '全部可改，冲突自动检测',
        description:
          '在「设置 → 快捷键」里，每个命令都可以重绑定，冲突实时检测。可以从内置的 Eclipse 或 VS Code 键位方案起步；忘记按键时，Ctrl+Shift+L 打开 Key Assist——一个可搜索的悬层，列出每个命令及其绑定。',
        highlights: [
          '每个命令都可重绑，冲突实时检测',
          '开箱即用的 Eclipse 与 VS Code 键位方案',
          'Key Assist 悬层（Ctrl+Shift+L）一览全部命令',
          '按命令名、ID 或按键组合搜索',
          '翻译热键全局生效，无关浮窗开关',
        ],
        visual: 'screenshot',
        screenshotKey: 'keybindings',
        screenshotAlt: 'GlanceMD Ultra 快捷键助手悬层，可搜索全部命令与快捷键',
        tagColor: 'indigo',
      },
      {
        id: 'outline',
        badge: '快速导航',
        title: '大纲与搜索，随处可达',
        subtitle: '标题模糊跳转，项目全文检索',
        description:
          'Ctrl+O 唤出快速大纲：对全部标题做模糊过滤，回车直达所在行。可以把大纲面板停靠在侧边随时把握结构；当关键词藏在工作区的某个角落，项目搜索面板会跨所有文件把它找出来。',
        highlights: [
          '快速大纲模糊跳转（Ctrl+O）',
          '可停靠的大纲面板（Ctrl+Shift+O）',
          '标题级别徽标 + 目标行号',
          '专属面板支持全项目全文搜索',
        ],
        visual: 'screenshot',
        screenshotKey: 'outline',
        screenshotAlt: 'GlanceMD Ultra 快速大纲悬层，支持标题模糊过滤跳转',
        tagColor: 'amber',
      },
      {
        id: 'native-core',
        badge: '原生内核',
        title: '原生内核，零冗余',
        subtitle: '单文件可执行，像 code . 一样打开工作区',
        description:
          '与 GlanceMD 一脉相承的原生配方：Rust（tao + wry）负责窗口与文件读写，渲染交给操作系统自带的 WebView，全部前端资源在编译期内嵌。最终就是一个 2–8 MB 的单文件——无 Electron、无 Node、无打包器——还配有 gmdu 命令行，在终端里像 code . 一样打开任意文件夹。',
        highlights: [
          '单个 2–8 MB 可执行文件，零依赖',
          'gmdu . 在终端打开任意文件夹',
          '界面双语：简体中文 / English 一键切换',
          '可选 Vim 模式，带命令行',
          '崩溃恢复快照与原子保存',
        ],
        visual: 'stack',
        tagColor: 'amber',
      },
    ],
    stack: {
      windowTitle: 'Ultra 的构建方式',
      layers: [
        { name: '你的工作区', desc: '本地文件夹与 .md 文件' },
        { name: '内嵌 UI', desc: 'marked.js + highlight.js + 语层翻译，编译期内嵌' },
        { name: '系统 WebView', desc: 'WebView2 / WebKit / WebKitGTK' },
        { name: 'Rust 内核', desc: 'tao + wry — 窗口、文件、进程通信' },
      ],
      excludedLabel: '绝不捆绑',
      excluded: ['Electron', 'Node.js', '打包器'],
    },
    downloads: {
      eyebrow: '获取 GlanceMD Ultra',
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
      macosNote:
        'macOS 安装包暂未签名与公证。首次运行可右键选择「打开」，或在「系统设置 → 隐私与安全性」中手动允许。',
      allReleasesLabel: '查看全部历史版本与校验信息',
    },
    community: {
      eyebrow: '免费开源',
      title: '开源透明，在开放中打磨进化',
      description:
        'GlanceMD Ultra 在 GitHub 上持续公开开发，延续 Peekdown → GlanceMD 的血脉，并采用 Marco 排版主题。欢迎查看源码、反馈问题，一起决定下一个版本。',
      cardOpenSource: {
        tag: '完全开源',
        title: 'MIT 许可，源码透明',
        desc: 'Rust 内核、内嵌 UI 与翻译管线全部可读。给仓库点个 Star，跟随每个版本的发布。',
        meta: ['GitHub 仓库', 'Rust + 系统 WebView', 'MIT 许可证'],
        linkText: '查看 GitHub 仓库',
      },
      cardIssues: {
        tag: '反馈与需求',
        title: '提交 Issue 反馈问题',
        desc: '在你的系统上遇到问题，或工作流里缺某个工作区能力？提交 Issue，直接影响路线图。',
        meta: ['缺陷反馈', '功能建议', '平台适配技巧'],
        linkText: '前往 Issues 讨论区',
      },
      cardPulls: {
        tag: '代码贡献',
        title: '提交 Pull Request 共建',
        desc: '改进翻译管线、扩展工作区目录树、补充键位方案，或为更多平台打包分发——欢迎提交 PR。',
        meta: ['欢迎贡献 PR', '翻译引擎', '多平台打包'],
        linkText: '浏览 Pull Requests',
      },
    },
    cta: {
      eyebrow: '在一个工作区里完成一切',
      title: '一整个工作区，依旧轻盈。',
      description: '下载最新版本，用 gmdu . 打开你的笔记文件夹，让翻译、大纲和快捷键在每一次敲击中就位。',
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
