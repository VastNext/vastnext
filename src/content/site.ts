export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const siteFacts = {
  siteUrl: 'https://vastnext.com',
  ogImage: '/og-cover.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  brandName: 'VastNext',
} as const;

interface NamedLink {
  name: string;
  url: string;
}

export const productFacts = {
  'findry-ai': { name: 'Findry AI', url: 'https://findryai.com' },
  'password-generator': {
    name: 'Password Generator',
    url: 'https://pg.vastnext.com',
  },
  'lexi-layer': {
    name: 'LexiLayer',
    url: '/lexi-layer/',
  },
  'vast-translator': {
    name: 'Vast Translator',
    url: 'https://tr.vastnext.com',
  },
} as const satisfies Record<string, NamedLink>;

export const futureTrackFacts = {
  games: {},
  utilities: {},
} as const;

export type ProductId = keyof typeof productFacts;
export type FutureTrackId = keyof typeof futureTrackFacts;

export interface Product {
  id: ProductId;
  name: string;
  url: string;
}

interface OpenSourceProjectFact extends NamedLink {
  facts: readonly string[];
}

interface OpenSourceProjectCopy {
  typeLabel: string;
  description: string;
  cta: string;
}

export interface OpenSourceProject {
  id: OpenSourceProjectId;
  name: string;
  url: string;
  facts: readonly string[];
}

interface ProductCopy {
  name?: string;
  description: string;
}

interface FutureTrackCopy {
  title: string;
  description: string;
  status: string;
}

interface PrivacyCopy {
  title: string;
  description: string;
  updatedLabel: string;
  updatedDate: string;
  introduction: string;
  sections: readonly [string, string, string];
  noCollection: string;
  technicalData: string;
  externalLinks: string;
  contactTitle: string;
  contact: string;
  homeLabel: string;
  homeHref: string;
}

export interface SiteCopy {
  brandName: string;
  title: string;
  description: string;
  tagline: string;
  metadata: {
    canonicalPath: string;
    ogLocale: string;
    alternateLocale: string;
  };
  nav: {
    lexiLayer: string;
    products: string;
    openSource: string;
    about: string;
    github: string;
  };
  hero: {
    eyebrow: string;
    introduction: string;
    cta: {
      products: string;
      github: string;
    };
  };
  productsSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  products: Record<ProductId, ProductCopy>;
  openSource: {
    eyebrow: string;
    title: string;
    description: string;
    projects: Record<OpenSourceProjectId, OpenSourceProjectCopy>;
  };
  future: {
    eyebrow: string;
    title: string;
    description: string;
    explorationNote: string;
    tracks: Record<FutureTrackId, FutureTrackCopy>;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    equationLabel: string;
  };
  footer: {
    emailLabel: string;
    githubLabel: string;
    privacy: string;
    copyright: string;
  };
  privacy: PrivacyCopy;
  languageSwitch: {
    label: string;
    href: string;
  };
}

export const products: Product[] = Object.entries(productFacts).map(([id, product]) => ({
  id: id as ProductId,
  ...product,
}));

export const openSourceProjectFacts = {
  glancemd: {
    name: 'GlanceMD',
    url: 'https://github.com/VastNext/GlanceMD',
    facts: ['Windows · macOS · Linux', 'Rust + System WebView', 'MIT', 'v1.6.3'],
  },
  'opencode-rapid-agent-team': {
    name: 'OpenCode Rapid Agent Team',
    url: 'https://github.com/VastNext/opencode-rapid-agent-team',
    facts: [
      'OpenCode',
      'Python',
      'Multi-agent',
      'MIT',
      'Fast · Standard · Strict',
      'rapid-dev-team · /rapid-dev',
    ],
  },
} as const satisfies Record<string, OpenSourceProjectFact>;

export type OpenSourceProjectId = keyof typeof openSourceProjectFacts;

export const openSourceProjects: OpenSourceProject[] = Object.entries(openSourceProjectFacts).map(
  ([id, project]) => ({
    id: id as OpenSourceProjectId,
    ...project,
  }),
);

export const contactFacts = {
  email: 'hello@vastnext.com',
  githubUrl: 'https://github.com/VastNext',
} as const;

export const futureTracks = Object.keys(futureTrackFacts) as FutureTrackId[];

export const siteCopy = {
  en: {
    brandName: 'VastNext',
    title: 'VastNext — Useful products for what comes next',
    description:
      'VastNext is an independent future product lab creating practical digital products for everyone.',
    tagline: "Useful ideas, built for what's next.",
    metadata: {
      canonicalPath: '/',
      ogLocale: 'en_US',
      alternateLocale: 'zh_CN',
    },
    nav: {
      lexiLayer: 'LexiLayer',
      products: 'Products',
      openSource: 'Open Source',
      about: 'About',
      github: 'GitHub',
    },
    hero: {
      eyebrow: 'An independent future product lab',
      introduction:
        'We explore open horizons and turn promising ideas into practical products for everyday use.',
      cta: {
        products: 'Explore our products',
        github: 'View on GitHub',
      },
    },
    productsSection: {
      eyebrow: 'Made by VastNext',
      title: 'Small tools with a clear purpose',
      description: 'Focused products designed to make useful work simpler.',
    },
    products: {
      'findry-ai': {
        description: 'Discover curated AI tools that fit the task at hand.',
      },
      'password-generator': {
        description: 'Generate random passwords, memorable passwords, and PINs.',
      },
      'lexi-layer': {
        description:
          'Free, open-source browser translation with deep AI context and custom expert personas.',
      },
      'vast-translator': {
        description: 'Compare results from multiple translation engines side by side.',
      },
    },
    openSource: {
      eyebrow: 'Open by default',
      title: 'Built in the open',
      description:
        'Two open-source projects exploring native desktop tools and agent-powered software delivery.',
      projects: {
        glancemd: {
          typeLabel: 'Native desktop tool',
          description:
            'A lightweight cross-platform Markdown viewer and editor with fast startup, split editing, tabs, outlines, search, and native system packages.',
          cta: 'Explore GlanceMD on GitHub',
        },
        'opencode-rapid-agent-team': {
          typeLabel: 'OpenCode agent team',
          description:
            'A self-installing OpenCode development team with adaptive delivery modes, heterogeneous workers, independent review, and strict high-risk gates.',
          cta: 'Explore Rapid Agent Team on GitHub',
        },
      },
    },
    future: {
      eyebrow: 'On the horizon',
      title: 'Exploring what could be useful next',
      description: 'We are experimenting in two broad directions while ideas take shape.',
      explorationNote: 'These are areas of exploration, not product or release announcements.',
      tracks: {
        games: {
          title: 'Games',
          description: 'Playful ideas shaped around curiosity, clarity, and delight.',
          status: 'Exploring',
        },
        utilities: {
          title: 'Utilities',
          description: 'Focused tools that remove friction from everyday digital tasks.',
          status: 'Exploring',
        },
      },
    },
    about: {
      eyebrow: 'About VastNext',
      title: 'Open horizons. Practical next steps.',
      description:
        'Vast stands for an open horizon, the boundless sea of possibilities. Next points to the next step and the future. Together, VastNext evokes a boundless horizon and the future ahead: a long-term commitment to building useful products for everyone.',
      equationLabel: 'Vast plus Next: an open horizon for what comes next.',
    },
    footer: {
      emailLabel: 'Email us',
      githubLabel: 'VastNext on GitHub',
      privacy: 'Privacy',
      copyright: '© VastNext',
    },
    privacy: {
      title: 'Privacy',
      description: 'How the VastNext brand site handles privacy and technical information.',
      updatedLabel: 'Last updated',
      updatedDate: 'August 23, 2026',
      introduction:
        'This short notice explains privacy practices for the VastNext brand site. It is general information, not legal advice.',
      sections: ['Information we collect', 'Technical delivery', 'External links'],
      noCollection:
        'This site does not actively collect personal information through accounts, forms, analytics, or advertising.',
      technicalData:
        'Our server and CDN provider, such as Cloudflare, may process necessary technical information and basic request logs to deliver and protect the site. This site does not set analytics or advertising cookies.',
      externalLinks:
        'Links to VastNext products and other external services are governed by each product or service’s own privacy policy.',
      contactTitle: 'Contact',
      contact: 'For privacy questions, email',
      homeLabel: 'Back to home',
      homeHref: '/',
    },
    languageSwitch: {
      label: '中文',
      href: '/zh/',
    },
  },
  zh: {
    brandName: '瀚海未来',
    title: '瀚海未来 — 为下一个未来创造实用产品',
    description: '瀚海未来是一个独立未来产品实验室，为每个人创造实用的数字产品。',
    tagline: '把有用的想法，带到下一个未来。',
    metadata: {
      canonicalPath: '/zh/',
      ogLocale: 'zh_CN',
      alternateLocale: 'en_US',
    },
    nav: {
      lexiLayer: '语层翻译',
      products: '产品',
      openSource: '开源',
      about: '关于',
      github: 'GitHub',
    },
    hero: {
      eyebrow: '独立未来产品实验室',
      introduction: '我们探索开放的可能，并把值得尝试的想法变成日常可用的产品。',
      cta: {
        products: '探索我们的产品',
        github: '在 GitHub 查看',
      },
    },
    productsSection: {
      eyebrow: '瀚海未来出品',
      title: '目标清晰的小工具',
      description: '专注解决具体问题，让有用的工作更简单。',
    },
    products: {
      'findry-ai': {
        description: '发现经过精选、适合当前任务的 AI 工具。',
      },
      'password-generator': {
        description: '生成随机密码、易记密码和 PIN。',
      },
      'lexi-layer': {
        name: '语层翻译',
        description: '免登录、零门槛的 AI 浏览器双语翻译扩展，支持专家角色与提示词定制。',
      },
      'vast-translator': {
        description: '并排比较多个翻译引擎的结果。',
      },
    },
    openSource: {
      eyebrow: '默认开放',
      title: '在开放中构建',
      description: '两个开源项目，分别探索原生桌面工具与 Agent 驱动的软件交付。',
      projects: {
        glancemd: {
          typeLabel: '跨平台桌面工具',
          description:
            '轻量跨平台 Markdown 查看器与编辑器，提供快速启动、分屏编辑、多标签、目录、查找和系统原生安装包。',
          cta: '在 GitHub 探索 GlanceMD',
        },
        'opencode-rapid-agent-team': {
          typeLabel: 'OpenCode Agent Team',
          description:
            '可自安装的 OpenCode 软件开发团队，提供自适应执行档位、异构 Worker、独立审查与高风险严格门禁。',
          cta: '在 GitHub 探索 Rapid Agent Team',
        },
      },
    },
    future: {
      eyebrow: '未来方向',
      title: '探索下一个有用的可能',
      description: '当想法逐渐成形，我们正在两个宽泛方向上持续实验。',
      explorationNote: '这些内容仅代表探索方向，不是产品或发布日期承诺。',
      tracks: {
        games: {
          title: '游戏',
          description: '围绕好奇、清晰与愉悦展开有趣的互动想法。',
          status: '探索中',
        },
        utilities: {
          title: '实用工具',
          description: '减少日常数字任务摩擦的专注型工具。',
          status: '探索中',
        },
      },
    },
    about: {
      eyebrow: '关于瀚海未来',
      title: '辽阔视野，迈向下一步。',
      description:
        'Vast 代表辽阔、开放与充满可能的瀚海，Next 代表下一步、下一代与未来。瀚海未来（VastNext）即由此而来，表达我们长期为每个人创造实用产品的方向。',
      equationLabel: 'Vast 加上 Next，寓意瀚海与未来。',
    },
    footer: {
      emailLabel: '联系我们',
      githubLabel: '瀚海未来的 GitHub',
      privacy: '隐私政策',
      copyright: '© 瀚海未来',
    },
    privacy: {
      title: '隐私政策',
      description: '瀚海未来品牌站如何处理隐私与必要技术信息。',
      updatedLabel: '更新时间',
      updatedDate: '2026 年 8 月 23 日',
      introduction: '这份简短说明介绍瀚海未来品牌站的隐私做法，仅供一般参考，不构成法律意见。',
      sections: ['我们收集的信息', '技术服务信息', '外部链接'],
      noCollection: '本站不通过账户、表单、分析或广告主动收集个人信息。',
      technicalData:
        '为交付和保护本站，服务器及 Cloudflare 等 CDN 服务商可能处理必要技术信息和基础请求日志。本站不设置分析或广告 Cookie。',
      externalLinks: '本站链接到的瀚海未来产品及其他外部服务，适用各产品或服务自身的隐私政策。',
      contactTitle: '联系我们',
      contact: '如有隐私相关问题，请发送邮件至',
      homeLabel: '返回首页',
      homeHref: '/zh/',
    },
    languageSwitch: {
      label: 'English',
      href: '/',
    },
  },
} as const satisfies Record<Locale, SiteCopy>;
