import { describe, expect, it } from 'vitest';

import * as site from './site';

const {
  futureFacts,
  futureTrackFacts,
  locales,
  openSourceProject,
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
      'vast-translator': {
        name: 'Vast Translator',
        url: 'https://vast-translator.vercel.app',
      },
    });
  });

  it('保存准确的 GlanceMD 开源事实', () => {
    expect(openSourceProject).toEqual({
      name: 'GlanceMD',
      url: 'https://github.com/VastNext/GlanceMD',
      platform: 'Windows',
      stack: 'Rust + WebView2',
      license: 'MIT',
    });
  });

  it('为每种语言提供完整的页面文案', () => {
    for (const locale of locales) {
      const copy = siteCopy[locale];

      expectStringsToBeNonEmpty(copy, locale);
      expect(Object.keys(copy.products)).toEqual(Object.keys(productFacts));
      expect(Object.keys(copy.future.tracks)).toEqual(Object.keys(futureTrackFacts));
    }

    expect(siteCopy.en.tagline).toBe("Useful ideas, built for what's next.");
    expect(siteCopy.zh.tagline).toBe('把有用的想法，带到下一个未来。');
  });

  it('为关键可翻译叶子字段提供独立的中英文内容', () => {
    const en = siteCopy.en;
    const zh = siteCopy.zh;
    const fields: Array<[string, string, string]> = [
      [en.title, zh.title, 'title'],
      [en.description, zh.description, 'description'],
      [en.tagline, zh.tagline, 'tagline'],
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
      [en.openSource.eyebrow, zh.openSource.eyebrow, 'openSource.eyebrow'],
      [en.openSource.description, zh.openSource.description, 'openSource.description'],
      [en.openSource.cta, zh.openSource.cta, 'openSource.cta'],
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
      [en.footer.emailLabel, zh.footer.emailLabel, 'footer.emailLabel'],
      [en.footer.githubLabel, zh.footer.githubLabel, 'footer.githubLabel'],
      [en.footer.privacy, zh.footer.privacy, 'footer.privacy'],
      [en.languageSwitch.label, zh.languageSwitch.label, 'languageSwitch.label'],
    ];

    for (const [english, chinese, path] of fields) {
      expectTranslationToDiffer(english, chinese, path);
    }
  });

  it('将未来方向标记为探索中且不承诺日期', () => {
    expect(futureTrackFacts).toEqual({
      games: { name: 'Games' },
      utilities: { name: 'Utilities' },
    });
    expect(futureFacts).toEqual({ dateCommitment: false });

    for (const locale of locales) {
      expect(siteCopy[locale].future.explorationNote).toBeTruthy();
      expect(siteCopy[locale].future).not.toHaveProperty('dateCommitment');
    }
  });

  it('产品和开源文案不重复共享名称', () => {
    for (const locale of locales) {
      for (const copy of Object.values(siteCopy[locale].products)) {
        expect(copy).not.toHaveProperty('title');
      }
      expect(siteCopy[locale].openSource).not.toHaveProperty('title');
    }
  });

  it('只在共享事实中保存联系方式，并提供双向语言切换', () => {
    const contactFacts = (site as unknown as { contactFacts?: unknown }).contactFacts;

    expect(contactFacts).toEqual({
      email: 'hello@vastnext.com',
      githubUrl: 'https://github.com/VastNext',
    });
    expect(siteCopy.en.footer).not.toHaveProperty('email');
    expect(siteCopy.zh.footer).not.toHaveProperty('email');
    expect(siteCopy.en.footer).not.toHaveProperty('githubUrl');
    expect(siteCopy.zh.footer).not.toHaveProperty('githubUrl');
    expect(siteCopy.en.languageSwitch.href).toBe('/zh/');
    expect(siteCopy.zh.languageSwitch.href).toBe('/');
  });

  it('开源文案不重复结构化技术事实', () => {
    for (const locale of locales) {
      const copy = Object.values(siteCopy[locale].openSource).join(' ');

      expect(copy).not.toContain(openSourceProject.platform);
      expect(copy).not.toContain('Rust');
      expect(copy).not.toContain('WebView2');
      expect(copy).not.toContain(openSourceProject.license);
    }
  });
});
