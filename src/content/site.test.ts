import { describe, expect, it } from 'vitest';

import * as site from './site';

const {
  futureTrackFacts,
  locales,
  openSourceProjectFacts,
  productFacts,
  siteCopy,
  siteFacts,
} = site;

function expectStringsToBeNonEmpty(value: unknown, path = 'copy'): void {
  if (typeof value === 'string') {
    expect(value.trim(), `${path} 应为非空字符串`).not.toBe('');
    return;
  }

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      expectStringsToBeNonEmpty(child, `${path}.${key}`);
    }
  }
}

function expectTranslationToDiffer(en: string, zh: string, path: string): void {
  expect(en, `${path} 应提供独立的中英文文案`).not.toBe(zh);
}

describe('站点内容模型', () => {
  it('支持英文和简体中文', () => {
    expect(locales).toEqual(['en', 'zh']);
    expect(Object.keys(siteCopy).sort()).toEqual([...locales].sort());
  });

  it('提供共享站点事实和每种语言的页面元数据', () => {
    expect(siteFacts).toEqual({
      siteUrl: 'https://vastnext.com',
      ogImage: '/og-cover.png',
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageType: 'image/png',
      brandName: 'VastNext',
    });
    expect(siteCopy.en.metadata).toEqual({
      canonicalPath: '/',
      ogLocale: 'en_US',
      alternateLocale: 'zh_CN',
    });
    expect(siteCopy.zh.metadata).toEqual({
      canonicalPath: '/zh/',
      ogLocale: 'zh_CN',
      alternateLocale: 'en_US',
    });
  });

  it('只保存一份准确的产品事实', () => {
    expect(productFacts).toEqual({
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
    });
  });

  it('保存两个准确的开源项目事实', () => {
    expect(openSourceProjectFacts).toEqual({
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
    });
  });

  it('为每种语言提供完整的页面文案', () => {
    for (const locale of locales) {
      const copy = siteCopy[locale];

      expectStringsToBeNonEmpty(copy, locale);
      expect(Object.keys(copy.products)).toEqual(Object.keys(productFacts));
      expect(Object.keys(copy.openSource.projects)).toEqual(Object.keys(openSourceProjectFacts));
      expect(Object.keys(copy.future.tracks)).toEqual(Object.keys(futureTrackFacts));
    }

    expect(siteCopy.en.tagline).toBe("Useful ideas, built for what's next.");
    expect(siteCopy.zh.tagline).toBe('把有用的想法，带到下一个未来。');
    expect(siteCopy.en.about.equationLabel).toBe(
      'Vast plus Next: an open horizon for what comes next.',
    );
    expect(siteCopy.zh.about.equationLabel).toBe('Vast 加上 Next，寓意瀚海与未来。');
  });

  it('保持英文品牌故事为纯英文', () => {
    expect(siteCopy.en.about.description).toBe(
      'Vast stands for an open horizon, the boundless sea of possibilities. Next points to the next step and the future. Together, VastNext evokes a boundless horizon and the future ahead: a long-term commitment to building useful products for everyone.',
    );
    expect(siteCopy.en.about.description).not.toMatch(/[\u3400-\u9fff]/);
  });

  it('为隐私页面提供完整且独立的双语文案', () => {
    for (const locale of locales) {
      expectStringsToBeNonEmpty(siteCopy[locale].privacy, `${locale}.privacy`);
    }

    expect(siteCopy.en.privacy.title).not.toBe(siteCopy.zh.privacy.title);
    expect(siteCopy.en.privacy.sections).toHaveLength(3);
    expect(siteCopy.zh.privacy.sections).toHaveLength(3);
    expect(siteCopy.en.privacy.homeHref).toBe('/');
    expect(siteCopy.zh.privacy.homeHref).toBe('/zh/');
  });

  it('为关键可翻译叶子字段提供独立的中英文内容', () => {
    const en = siteCopy.en;
    const zh = siteCopy.zh;
    const fields: Array<[string, string, string]> = [
      [en.title, zh.title, 'title'],
      [en.description, zh.description, 'description'],
      [en.tagline, zh.tagline, 'tagline'],
      [en.nav.lexiLayer, zh.nav.lexiLayer, 'nav.lexiLayer'],
      [en.nav.products, zh.nav.products, 'nav.products'],
      [en.nav.openSource, zh.nav.openSource, 'nav.openSource'],
      [en.nav.about, zh.nav.about, 'nav.about'],
      [en.hero.eyebrow, zh.hero.eyebrow, 'hero.eyebrow'],
      [en.hero.introduction, zh.hero.introduction, 'hero.introduction'],
      [en.hero.cta.products, zh.hero.cta.products, 'hero.cta.products'],
      [en.hero.cta.github, zh.hero.cta.github, 'hero.cta.github'],
      [en.productsSection.eyebrow, zh.productsSection.eyebrow, 'productsSection.eyebrow'],
      [en.productsSection.title, zh.productsSection.title, 'productsSection.title'],
      [en.productsSection.description, zh.productsSection.description, 'productsSection.description'],
      [en.products['findry-ai'].description, zh.products['findry-ai'].description, 'products.findry-ai.description'],
      [en.products['password-generator'].description, zh.products['password-generator'].description, 'products.password-generator.description'],
      [en.products['vast-translator'].description, zh.products['vast-translator'].description, 'products.vast-translator.description'],
      [en.products['lexi-layer'].description, zh.products['lexi-layer'].description, 'products.lexi-layer.description'],
      [en.openSource.eyebrow, zh.openSource.eyebrow, 'openSource.eyebrow'],
      [en.openSource.title, zh.openSource.title, 'openSource.title'],
      [en.openSource.description, zh.openSource.description, 'openSource.description'],
      [en.openSource.projects.glancemd.typeLabel, zh.openSource.projects.glancemd.typeLabel, 'openSource.projects.glancemd.typeLabel'],
      [en.openSource.projects.glancemd.description, zh.openSource.projects.glancemd.description, 'openSource.projects.glancemd.description'],
      [en.openSource.projects.glancemd.cta, zh.openSource.projects.glancemd.cta, 'openSource.projects.glancemd.cta'],
      [en.openSource.projects['opencode-rapid-agent-team'].typeLabel, zh.openSource.projects['opencode-rapid-agent-team'].typeLabel, 'openSource.projects.opencode-rapid-agent-team.typeLabel'],
      [en.openSource.projects['opencode-rapid-agent-team'].description, zh.openSource.projects['opencode-rapid-agent-team'].description, 'openSource.projects.opencode-rapid-agent-team.description'],
      [en.openSource.projects['opencode-rapid-agent-team'].cta, zh.openSource.projects['opencode-rapid-agent-team'].cta, 'openSource.projects.opencode-rapid-agent-team.cta'],
      [en.future.eyebrow, zh.future.eyebrow, 'future.eyebrow'],
      [en.future.title, zh.future.title, 'future.title'],
      [en.future.description, zh.future.description, 'future.description'],
      [en.future.explorationNote, zh.future.explorationNote, 'future.explorationNote'],
      [en.future.tracks.games.title, zh.future.tracks.games.title, 'future.tracks.games.title'],
      [en.future.tracks.games.description, zh.future.tracks.games.description, 'future.tracks.games.description'],
      [en.future.tracks.games.status, zh.future.tracks.games.status, 'future.tracks.games.status'],
      [en.future.tracks.utilities.title, zh.future.tracks.utilities.title, 'future.tracks.utilities.title'],
      [en.future.tracks.utilities.description, zh.future.tracks.utilities.description, 'future.tracks.utilities.description'],
      [en.future.tracks.utilities.status, zh.future.tracks.utilities.status, 'future.tracks.utilities.status'],
      [en.about.eyebrow, zh.about.eyebrow, 'about.eyebrow'],
      [en.about.title, zh.about.title, 'about.title'],
      [en.about.description, zh.about.description, 'about.description'],
      [en.about.equationLabel, zh.about.equationLabel, 'about.equationLabel'],
      [en.footer.emailLabel, zh.footer.emailLabel, 'footer.emailLabel'],
      [en.footer.githubLabel, zh.footer.githubLabel, 'footer.githubLabel'],
      [en.footer.privacy, zh.footer.privacy, 'footer.privacy'],
      [en.privacy.title, zh.privacy.title, 'privacy.title'],
      [en.privacy.introduction, zh.privacy.introduction, 'privacy.introduction'],
      [en.privacy.updatedLabel, zh.privacy.updatedLabel, 'privacy.updatedLabel'],
      [en.privacy.homeLabel, zh.privacy.homeLabel, 'privacy.homeLabel'],
      [en.languageSwitch.label, zh.languageSwitch.label, 'languageSwitch.label'],
    ];

    for (const [english, chinese, path] of fields) {
      expectTranslationToDiffer(english, chinese, path);
    }
  });

  it('将未来方向标记为探索中且不承诺日期', () => {
    expect(futureTrackFacts).toEqual({
      games: {},
      utilities: {},
    });
    expect(site).not.toHaveProperty('futureFacts');

    for (const locale of locales) {
      expect(siteCopy[locale].future.explorationNote).toBeTruthy();
      expect(siteCopy[locale].future).not.toHaveProperty('dateCommitment');
      expect(siteCopy[locale].future.tracks.games.title).toBeTruthy();
      expect(siteCopy[locale].future.tracks.utilities.title).toBeTruthy();
    }
  });

  it('只在共享事实中保存联系方式，并提供双向语言切换', () => {
    const contactFacts = (site as unknown as { contactFacts?: unknown }).contactFacts;

    expect(contactFacts).toEqual({
      email: 'hello@vastnext.com',
      githubUrl: 'https://github.com/VastNext',
    });
    expect(siteCopy.en.languageSwitch.href).toBe('/zh/');
    expect(siteCopy.zh.languageSwitch.href).toBe('/');
  });
});
