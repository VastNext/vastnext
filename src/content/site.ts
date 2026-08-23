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

interface NamedFact {
  name: string;
}

export const productFacts = {
  'findry-ai': { name: 'Findry AI', url: 'https://findryai.com' },
  'password-generator': {
    name: 'Password Generator',
    url: 'https://pg.vastnext.com',
  },
  'vast-translator': {
    name: 'Vast Translator',
    url: 'https://vast-translator.vercel.app',
  },
} as const satisfies Record<string, NamedLink>;

export const futureTrackFacts = {
  games: { name: 'Games' },
  utilities: { name: 'Utilities' },
} as const satisfies Record<string, NamedFact>;

export const futureFacts = {
  dateCommitment: false,
} as const;

export type ProductId = keyof typeof productFacts;
export type FutureTrackId = keyof typeof futureTrackFacts;

export interface Product {
  id: ProductId;
  name: string;
  url: string;
}

export interface OpenSourceProject {
  name: string;
  url: string;
  platform: string;
  stack: string;
  license: string;
}

export interface FutureTrack {
  id: FutureTrackId;
  name: string;
}

interface ProductCopy {
  description: string;
}

interface FutureTrackCopy {
  title: string;
  description: string;
  status: string;
}

export interface SiteCopy {
  title: string;
  description: string;
  tagline: string;
  metadata: {
    canonicalPath: string;
    ogLocale: string;
    alternateLocale: string;
  };
  nav: {
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
    description: string;
    cta: string;
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
  };
  footer: {
    emailLabel: string;
    githubLabel: string;
    privacy: string;
    copyright: string;
  };
  languageSwitch: {
    label: string;
    href: string;
  };
}

export const products: Product[] = Object.entries(productFacts).map(([id, product]) => ({
  id: id as ProductId,
  ...product,
}));

export const openSourceProject = {
  name: 'GlanceMD',
  url: 'https://github.com/VastNext/GlanceMD',
  platform: 'Windows',
  stack: 'Rust + WebView2',
  license: 'MIT',
} as const satisfies OpenSourceProject;

export const contactFacts = {
  email: 'hello@vastnext.com',
  githubUrl: 'https://github.com/VastNext',
} as const;

export const futureTracks: FutureTrack[] = Object.entries(futureTrackFacts).map(([id, track]) => ({
  id: id as FutureTrackId,
  ...track,
}));

export const siteCopy = {
  en: {
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
      'vast-translator': {
        description: 'Compare results from multiple translation engines side by side.',
      },
    },
    openSource: {
      eyebrow: 'Open by default',
      description:
        'Open Markdown files in a focused viewer built to make reading quick and distraction-free.',
      cta: 'Explore GlanceMD on GitHub',
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
        'Vast stands for an open horizon, the boundless sea of possibilities. Next points to the next step and the future. Together, VastNext means “瀚海·未来”: a long-term commitment to building useful products for everyone.',
    },
    footer: {
      emailLabel: 'Email us',
      githubLabel: 'VastNext on GitHub',
      privacy: 'Privacy',
      copyright: '© VastNext',
    },
    languageSwitch: {
      label: '中文',
      href: '/zh/',
    },
  },
  zh: {
    title: 'VastNext — 为下一个未来创造实用产品',
    description: 'VastNext 是一个独立未来产品实验室，为每个人创造实用的数字产品。',
    tagline: '把有用的想法，带到下一个未来。',
    metadata: {
      canonicalPath: '/zh/',
      ogLocale: 'zh_CN',
      alternateLocale: 'en_US',
    },
    nav: {
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
      eyebrow: 'VastNext 出品',
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
      'vast-translator': {
        description: '并排比较多个翻译引擎的结果。',
      },
    },
    openSource: {
      eyebrow: '默认开放',
      description: '在专注的查看器中打开 Markdown 文件，快速阅读，不受干扰。',
      cta: '在 GitHub 探索 GlanceMD',
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
      eyebrow: '关于 VastNext',
      title: '辽阔视野，迈向下一步。',
      description:
        'Vast 代表辽阔、开放与充满可能的瀚海，Next 代表下一步、下一代与未来。VastNext 即“瀚海·未来”，表达我们长期为每个人创造实用产品的方向。',
    },
    footer: {
      emailLabel: '联系我们',
      githubLabel: 'VastNext 的 GitHub',
      privacy: '隐私政策',
      copyright: '© VastNext',
    },
    languageSwitch: {
      label: 'English',
      href: '/',
    },
  },
} as const satisfies Record<Locale, SiteCopy>;
