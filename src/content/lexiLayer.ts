import type { Locale } from './site';

export const lexiLayerFacts = {
  githubUrl: 'https://github.com/VastNext/LexiLayer-Translator',
  issuesUrl: 'https://github.com/VastNext/LexiLayer-Translator/issues',
  pullsUrl: 'https://github.com/VastNext/LexiLayer-Translator/pulls',
  demoSiteUrl: 'https://findryai.com',
  versionTag: 'v0.7.1 · MVP',
  screenshots: {
    hero: '/lexi-layer/hero-translated.jpg',
    notebooklm: '/lexi-layer/notebooklm-fullpage.png',
    popup: '/lexi-layer/popup-controls.png',
    customAi: '/lexi-layer/options-custom-ai.png',
    experts: '/lexi-layer/options-experts.png',
    selection: '/lexi-layer/selection-translation.png',
  },
} as const;

export interface LexiLayerFeature {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: readonly string[];
  screenshotKey: keyof typeof lexiLayerFacts.screenshots;
  screenshotAlt: string;
  tagColor?: 'electric' | 'mint' | 'coral' | 'lilac';
}

export interface LexiLayerCopy {
  title: string;
  description: string;
  tagline: string;
  nav: {
    home: string;
    productName: string;
    features: string;
    experts: string;
    customization: string;
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
    browserUrl: string;
    browserNote: string;
  };
  keyPillars: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly {
      icon: string;
      title: string;
      desc: string;
      accent: 'electric' | 'mint' | 'coral' | 'lilac';
    }[];
  };
  features: readonly LexiLayerFeature[];
  scenarioSection: {
    eyebrow: string;
    title: string;
    description: string;
    realWorldTitle: string;
    realWorldDesc: string;
    visitDemoLabel: string;
    scenarios: readonly {
      title: string;
      role: string;
      detail: string;
    }[];
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

export const lexiLayerCopy: Record<Locale, LexiLayerCopy> = {
  en: {
    title: 'LexiLayer Translator — Free, Open Source AI Web Translation',
    description:
      'LexiLayer is a next-generation browser translation extension with zero login required. Features deep AI context translation, customizable expert personas, custom API models, and 100% open source freedom.',
    tagline: 'Your web translation tool, fully tailored by you.',
    nav: {
      home: 'VastNext',
      productName: 'LexiLayer Translator',
      features: 'Features',
      experts: 'AI Experts',
      customization: 'Custom Models',
      community: 'Open Source',
      github: 'GitHub',
      languageSwitchLabel: '中文',
      languageSwitchHref: '/zh/lexi-layer/',
    },
    hero: {
      eyebrow: 'AI-Powered Browser Extension',
      title: 'Next-Gen Web Translation',
      titleAccent: 'Tailored by You.',
      tagline: 'No sign-up. Free translation. Deep AI context & custom expert personas.',
      description:
        'Break language barriers effortlessly. LexiLayer brings contextual AI translation, bilingual dual-view reading, custom system prompts, and your own API keys directly into your browser with zero friction.',
      ctaPrimary: 'Get on GitHub',
      ctaSecondary: 'Explore Features',
      badges: ['No Sign-up Required', '100% Free & Open Source', 'Custom AI Personas', 'Use Your Own Key'],
      browserUrl: 'https://findryai.com',
      browserNote: 'Real-time contextual translation active on live web pages',
    },
    keyPillars: {
      eyebrow: 'Why LexiLayer',
      title: 'Built for Clarity, Freedom, and Control',
      description:
        'Standard web translators produce stiff, word-by-word outputs with strict paywalls. LexiLayer is crafted around privacy, deep intelligence, and complete user ownership.',
      items: [
        {
          icon: '⚡',
          title: 'Zero Login Friction',
          desc: 'Install and start translating immediately. No VastNext account or phone verification is required.',
          accent: 'mint',
        },
        {
          icon: '🧠',
          title: 'Context-Aware AI',
          desc: 'Powered by advanced LLMs to grasp nuances, technical terminology, idioms, and full-page discourse context.',
          accent: 'electric',
        },
        {
          icon: '🎭',
          title: 'Custom AI Personas',
          desc: 'Switch between academic researchers, software engineers, literary translators, or casual colloquial tones.',
          accent: 'lilac',
        },
        {
          icon: '🛠️',
          title: 'Total Customization',
          desc: 'Connect an OpenAI-compatible AI service using your own private API key.',
          accent: 'coral',
        },
      ],
    },
    features: [
      {
        id: 'full-page-translation',
        badge: 'Immersive Reading',
        title: 'Full-Page Bilingual Translation',
        subtitle: 'Read side-by-side without losing the original layout',
        description:
          'Transform complex foreign articles into smooth bilingual reading experiences. LexiLayer preserves the original web structure, code blocks, and styling while rendering clear, fluent target text right alongside.',
        highlights: [
          'Parallel bilingual inline paragraphs',
          'Preserves code snippets, formatting & math formulas',
          'Fast incremental DOM translation for dynamic sites',
          'Instant toggle between bilingual and single view',
        ],
        screenshotKey: 'notebooklm',
        screenshotAlt: 'LexiLayer full-page bilingual translation of the NotebookLM page on findryai.com',
        tagColor: 'electric',
      },
      {
        id: 'selection-translation',
        badge: 'Instant Interaction',
        title: 'Selection Translation & Floating Card',
        subtitle: 'Select any text snippet for immediate deep insight',
        description:
          'Highlight any unfamiliar word, paragraph, or code comment on any web page. The interactive floating card provides instant definitions, phonetic guides, contextual translations, and grammar breakdowns.',
        highlights: [
          'Trigger on selection or dedicated keyboard shortcut',
          'Draggable and resizable floating popup card',
          'Detailed grammatical and contextual analysis',
          'One-click copy of translated snippet',
        ],
        screenshotKey: 'selection',
        screenshotAlt: 'LexiLayer selection and hover translation popup card',
        tagColor: 'coral',
      },
      {
        id: 'expert-personas',
        badge: 'Persona Engine',
        title: 'Configurable AI Experts & Prompts',
        subtitle: 'Tailor translation tone to your exact domain',
        description:
          'Translation is never one-size-fits-all. Configure specialized AI personas—such as Academic Research Specialist, Senior Software Engineer, Legal Consultant, or Literary Polisher—with tailored system prompts.',
        highlights: [
          'Built-in presets for tech, science, finance, and casual reading',
          'Create and save unlimited custom AI expert prompts',
          'Domain-specific vocabulary preservation rules',
          'Custom prompt engineering for tone, formality, and style',
        ],
        screenshotKey: 'experts',
        screenshotAlt: 'LexiLayer options page showing AI expert persona configurations',
        tagColor: 'lilac',
      },
      {
        id: 'custom-ai-models',
        badge: 'Privacy & Control',
        title: 'Use Your Own AI Models & Private Keys',
        subtitle: 'Connect your own API key directly. No middleware platform markup',
        description:
          'Take full control over your translation setup and privacy. Connect your own OpenAI-compatible AI service or local endpoint, and keep your API key stored locally in your browser.',
        highlights: [
          'Requests go directly to the endpoint selected in your configuration',
          'Support for any OpenAI-compatible API endpoint',
          'Choose the model and endpoint supported by your AI provider.',
          'Local endpoints are supported when they expose an OpenAI-compatible API.',
        ],
        screenshotKey: 'customAi',
        screenshotAlt: 'LexiLayer custom AI provider and API key settings',
        tagColor: 'mint',
      },
      {
        id: 'popup-controls',
        badge: 'Effortless Control',
        title: 'Streamlined Browser Popup Controls',
        subtitle: 'Switch languages, models, and modes in a single click',
        description:
          'The clean popup interface gives you instant access to your active translation engine, target languages, active expert personas, and translation triggers without digging into complex menus.',
        highlights: [
          'Quick switch between auto-translate, selection-only, and manual',
          'Rapid target language and persona switcher',
          'Status indicators for API latency and model connection',
          'Lightweight and optimized for minimal memory footprint',
        ],
        screenshotKey: 'popup',
        screenshotAlt: 'LexiLayer browser popup interface with translation controls',
        tagColor: 'electric',
      },
    ],
    scenarioSection: {
      eyebrow: 'Real-World Scenarios',
      title: 'Tested in Demanding Technical Workflows',
      description:
        'From keeping up with cutting-edge AI breakthroughs to reading international research papers, LexiLayer is engineered for high-density knowledge workers.',
      realWorldTitle: 'Live Tested on Real Web Environments',
      realWorldDesc:
        'Experience seamless translation on dynamic modern platforms like findryai.com, GitHub documentation, arXiv preprints, and developer blogs.',
      visitDemoLabel: 'Explore Live Website',
      scenarios: [
        {
          title: 'AI & Tech Research',
          role: 'AI Engineer / Researcher',
          detail: 'Effortlessly digest the latest whitepapers on findryai.com and arXiv with precise technical terminology retention.',
        },
        {
          title: 'Open Source Exploration',
          role: 'Developer / Contributor',
          detail: 'Read foreign GitHub issues, pull request discussions, and API documentation directly within the code context.',
        },
        {
          title: 'Global News & Analysis',
          role: 'Analyst / Lifelong Learner',
          detail: 'Browse international industry insights in dual-language mode to absorb nuances and improve language proficiency.',
        },
      ],
    },
    community: {
      eyebrow: 'Free & Open Source',
      title: 'Community Driven, Open by Design',
      description:
        'LexiLayer is shared in its GitHub repository so users can inspect the project, report issues, and help shape what comes next.',
      cardOpenSource: {
        tag: 'Open Source',
        title: 'Transparent & Free Forever',
        desc: 'Review the project on GitHub, report problems, and help shape the next release.',
        meta: ['GitHub repository', 'TypeScript', 'User-controlled setup'],
        linkText: 'View Repository',
      },
      cardIssues: {
        tag: 'Feedback & Bug Reports',
        title: 'Submit Issues & Requests',
        desc: 'Encountered a site layout bug or have an idea for a new AI persona? Open an issue on GitHub to shape the roadmap.',
        meta: ['Bug Reports', 'Feature Requests', 'Active Triage'],
        linkText: 'Browse Issues',
      },
      cardPulls: {
        tag: 'Code Contributions',
        title: 'Contribute Pull Requests',
        desc: 'Join developers worldwide to add new translation engines, UI localizations, prompt presets, and performance optimizations.',
        meta: ['PRs Welcome', 'Prompt Presets', 'Engine Adapters'],
        linkText: 'Browse Pull Requests',
      },
    },
    cta: {
      eyebrow: 'Start Translating Smarter',
      title: 'Your Translation Tool, Fully Tailored By You.',
      description:
        'Install LexiLayer, plug in your preferred AI model, customize your expert personas, and read the global web without friction.',
      primaryBtn: 'Star & Download on GitHub',
      secondaryBtn: 'View Open Issues',
      note: 'Free to use · GitHub repository · No registration required',
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
    title: 'LexiLayer 翻译 — 免登录、可定制 AI 专家角色的开源网页翻译扩展',
    description:
      'LexiLayer 是一款免登录、零门槛的 AI 浏览器双语翻译扩展。支持上下文 AI 翻译、可定制的 AI 专家角色与提示词，并把选择权交给用户。',
    tagline: '你的翻译工具，由你完全定制！',
    nav: {
      home: 'VastNext 首页',
      productName: 'LexiLayer 翻译扩展',
      features: '功能特性',
      experts: 'AI 专家角色',
      customization: '模型与定制',
      community: '开源协作',
      github: 'GitHub',
      languageSwitchLabel: 'English',
      languageSwitchHref: '/lexi-layer/',
    },
    hero: {
      eyebrow: '新一代 AI 网页双语翻译扩展',
      title: '智能双语翻译',
      titleAccent: '由你完全定制！',
      tagline: '免注册登录 · 免费翻译 · AI 深度语境 · 专家角色定制 · GitHub 共建',
      description:
        '打破网页语言藩篱。LexiLayer 将大语言模型深层语境理解、双语沉浸式对照排版、可自由定制的 AI 专家角色提示词以及私有 API Key 直连能力融入浏览器，带来零摩擦的阅读体验。',
      ctaPrimary: '前往 GitHub 获取',
      ctaSecondary: '浏览核心特性',
      badges: ['完全免登录', '免费翻译引擎', '自定义 AI 专家', '配置本地保存'],
      browserUrl: 'https://findryai.com',
      browserNote: '真实前沿网页沉浸式双语对照翻译体验',
    },
    keyPillars: {
      eyebrow: '核心优势',
      title: '更清晰、更自由、更懂你的专业翻译',
      description:
        '告别传统机器翻译生硬死板的字词直译与繁杂的账号充值套路。LexiLayer 坚持隐私至上、深度智能和用户自主定制。',
      items: [
        {
          icon: '⚡',
          title: '免登录零门槛',
          desc: '安装即用，无需注册 VastNext 账号或手机号验证；翻译由你选择的引擎发起。',
          accent: 'mint',
        },
        {
          icon: '🧠',
          title: 'AI 深度语境理解',
          desc: '借助前沿大语言模型，精准理解长篇上下文、专业术语、俚语典故与行业语境。',
          accent: 'electric',
        },
        {
          icon: '🎭',
          title: '可设定 AI 专家角色',
          desc: '学术研究专家、软件工程师、文学润色师、生活口语大师……随心定制专属 Prompt。',
          accent: 'lilac',
        },
        {
          icon: '🛠️',
          title: '你的工具你定制',
          desc: '接入任意 OpenAI 兼容 AI 服务，密钥仅在扩展本地配置中使用。',
          accent: 'coral',
        },
      ],
    },
    features: [
      {
        id: 'full-page-translation',
        badge: '沉浸阅读',
        title: '网页全文双语智能对照',
        subtitle: '完美保留排版，原文与译文段落并排沉浸呈现',
        description:
          '将复杂晦涩的外文长文转化为清晰自然的双语对照阅读视图。LexiLayer 智能保护网页原有结构、代码块、高亮格式与数学公式，在原文下方或侧边无缝呈现流畅译文。',
        highlights: [
          '段落级双语并排对照排版',
          '完美保留代码块、Markdown 格式与数学公式',
          '针对动态渲染网页的高效增量 DOM 翻译',
          '一键在双语对照与纯净译文视图间自由切换',
        ],
        screenshotKey: 'notebooklm',
        screenshotAlt: 'LexiLayer 对 findryai.com NotebookLM 详情页的整页双语翻译实景',
        tagColor: 'electric',
      },
      {
        id: 'selection-translation',
        badge: '即时交互',
        title: '划词即译与智能悬浮卡片',
        subtitle: '随时选中文本，获取深度释义与语法剖析',
        description:
          '浏览网页时随手选中生词、长难句或代码注释，交互式悬浮卡片即刻弹出。不仅给出精准翻译，还提供词性分析、音标、上下文例句和语法解析。',
        highlights: [
          '支持鼠标划词触发或快捷键精准召唤',
          '可自由拖拽、缩放的交互式悬浮卡片',
          '深入分析上下文语境与专业领域含义',
          '一键快速复制译文与词条解析结果',
        ],
        screenshotKey: 'selection',
        screenshotAlt: 'LexiLayer 划选翻译与悬浮卡片交互效果图',
        tagColor: 'coral',
      },
      {
        id: 'expert-personas',
        badge: '专家引擎',
        title: '可设定 AI 专家角色与自定义 Prompt',
        subtitle: '针对不同学科与场景，定制你的专属翻译官',
        description:
          '不同领域有截然不同的语言习惯。LexiLayer 内置并支持自定义多领域 AI 专家角色（如计算机科研专家、医学顾问、法律翻译官、轻小说润色师），用专属 System Prompt 注入专业灵魂。',
        highlights: [
          '内置技术开发、学术前沿、商务金融与日常阅读等丰富预设',
          '自由新建、编辑并保存无限数量的自定义 AI 专家 Prompt',
          '支持专业专有名词保护与术语表映射规则',
          '自由微调语气、严谨度、口语化程度与排版风格',
        ],
        screenshotKey: 'experts',
        screenshotAlt: 'LexiLayer 设置面板中的 AI 专家角色管理界面',
        tagColor: 'lilac',
      },
      {
        id: 'custom-ai-models',
        badge: '隐私与自主',
        title: '使用你自己的 API Key，自由接入任意大模型',
        subtitle: '由你提供并保存私有 Key，直接调用模型，无中间商平台加价',
        description:
          '彻底掌控你的翻译偏好与数据路径。你可以随时填入自己申请的 OpenAI 兼容服务 Key，也可以连接你自己运行的本地端点，密钥仅保存在扩展本地。',
        highlights: [
          '请求直接发送到你在配置中选择的服务端点',
          '全面兼容任意标准 OpenAI 协议接口与第三方中转',
          '模型、Base URL、目标语言和提示词都由你决定',
          '本地端点只要提供 OpenAI 兼容 API 即可接入',
        ],
        screenshotKey: 'customAi',
        screenshotAlt: 'LexiLayer 自定义 AI 服务商与 API Key 配置界面',
        tagColor: 'mint',
      },
      {
        id: 'popup-controls',
        badge: '丝滑掌控',
        title: '极简直观的浏览器弹窗控制台',
        subtitle: '一键切换目标语言、翻译模式与当前专家',
        description:
          '无需在深层设置页面反复查找，轻点浏览器右上角图标即可唤出控制面板，实时掌控当前激活的翻译引擎、目标语言、专家角色和快捷触发方式。',
        highlights: [
          '一键在全文翻译、划词模式与停用之间快速切换',
          '即时切换目标语言与当前工作的 AI 专家角色',
          '直观展示 API 响应延迟与模型连接健康度',
          '超轻量级架构设计，内存占用低且极速响应',
        ],
        screenshotKey: 'popup',
        screenshotAlt: 'LexiLayer 浏览器工具栏弹窗控制面板界面',
        tagColor: 'electric',
      },
    ],
    scenarioSection: {
      eyebrow: '真实应用场景',
      title: '专为高密度知识获取与技术研读打造',
      description:
        '从追踪全球 AI 最新进展，到研读英文开源技术文档与论文，LexiLayer 为知识探索者提供强大的效率杠杆。',
      realWorldTitle: '在真实复杂的网络环境中经受验证',
      realWorldDesc:
        '在诸如 findryai.com 科技前沿资讯站、GitHub 开发者社区、arXiv 预印本平台及全球科技博客中，均能获得流畅的双语阅读体验。',
      visitDemoLabel: '访问真实场景网站',
      scenarios: [
        {
          title: 'AI 资讯与前沿追踪',
          role: 'AI 研发者 / 科技爱好者',
          detail: '无障碍畅读 findryai.com 与全球科技博客，在保留专业术语的同时迅速把握技术脉络。',
        },
        {
          title: '开源项目与源码研读',
          role: '软件工程师 / 开源贡献者',
          detail: '快速浏览 GitHub Issue 讨论、Pull Request 评审记录与技术架构文档，代码与译文互不干扰。',
        },
        {
          title: '学术前沿与论文速览',
          role: '科研学者 / 高校师生',
          detail: '利用“学术论文专家”角色，将复杂的英文学术句式转化为严谨符合学术规范的中文表达。',
        },
      ],
    },
    community: {
      eyebrow: '开放协作 · 社区共建',
      title: '开源透明，期待与你一同打磨进化',
      description:
        'LexiLayer 在 GitHub 上持续公开开发。提交 Issue 一起决定产品方向，提交 Pull Request 一起改进产品。',
      cardOpenSource: {
        tag: '完全开源',
        title: '源码可见，一起决定下一步',
        desc: '在 GitHub 查看项目、反馈问题，并一起讨论后续改进方向。',
        meta: ['GitHub repository', 'TypeScript 构建', '用户掌控配置'],
        linkText: '查看 GitHub 仓库',
      },
      cardIssues: {
        tag: '反馈与需求',
        title: '提交 Issue 提出你的想法',
        desc: '遇到特定网页的排版适配问题，或是对 AI 专家角色有新构想？欢迎在 GitHub Issue 中告诉我们。',
        meta: ['Bug 缺陷反馈', 'Feature 功能建议', '即时响应处理'],
        linkText: '前往 Issues 讨论区',
      },
      cardPulls: {
        tag: '代码贡献',
        title: '提交 Pull Request 协作共建',
        desc: '欢迎来自全球开发者的 PR！无论是新增翻译引擎适配、优化提示词预设还是翻译多语言界面。',
        meta: ['欢迎贡献 PR', 'Prompt 预设库', '多引擎适配扩展'],
        linkText: '浏览 Pull Requests',
      },
    },
    cta: {
      eyebrow: '立即开启高效阅读',
      title: '你的翻译工具，由你完全定制！',
      description:
        '安装 LexiLayer，接入你心仪的 AI 模型，配置专属的专家角色，尽情探索无边界的全球互联网。',
      primaryBtn: '在 GitHub 获取扩展与源码',
      secondaryBtn: '浏览开放 Issues',
      note: '免费使用 · GitHub 共建 · 无需注册登录',
    },
    footer: {
      brandTagline: 'Useful ideas, built for what comes next.',
      backToHome: '返回 VastNext 首页',
      privacyPolicy: '隐私政策',
      githubRepo: 'GitHub 仓库',
      copyright: '© 2026 VastNext. Built in the open on GitHub.',
    },
  },
};
