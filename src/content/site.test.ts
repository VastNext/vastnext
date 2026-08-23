import { describe, expect, it } from 'vitest';

import * as site from './site';

const { futureTracks, locales, openSourceProject, products, siteCopy } = site;

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

function expectTranslationsToDiffer(en: unknown, zh: unknown): void {
  expect(en).not.toEqual(zh);
}

describe('站点内容模型', () => {
  it('支持英文和简体中文', () => {
    expect(locales).toEqual(['en', 'zh']);
    expect(Object.keys(siteCopy).sort()).toEqual([...locales].sort());
  });

  it('只保存一份准确的产品事实', () => {
    expect(products).toEqual([
      { id: 'findry-ai', name: 'Findry AI', url: 'https://findryai.com' },
      {
        id: 'password-generator',
        name: 'Password Generator',
        url: 'https://pg.vastnext.com',
      },
      {
        id: 'vast-translator',
        name: 'Vast Translator',
        url: 'https://vast-translator.vercel.app',
      },
    ]);
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
      expect(Object.keys(copy.products)).toEqual(products.map(({ id }) => id));
      expect(Object.keys(copy.future.tracks)).toEqual(futureTracks.map(({ id }) => id));
    }

    expect(siteCopy.en.tagline).toBe("Useful ideas, built for what's next.");
    expect(siteCopy.zh.tagline).toBe('把有用的想法，带到下一个未来。');
  });

  it('为主要可翻译文案组提供独立的中英文内容', () => {
    expectTranslationsToDiffer(siteCopy.en.title, siteCopy.zh.title);
    expectTranslationsToDiffer(siteCopy.en.description, siteCopy.zh.description);
    expectTranslationsToDiffer(siteCopy.en.tagline, siteCopy.zh.tagline);
    expectTranslationsToDiffer(siteCopy.en.hero, siteCopy.zh.hero);
    expectTranslationsToDiffer(siteCopy.en.productsSection, siteCopy.zh.productsSection);
    expectTranslationsToDiffer(
      Object.values(siteCopy.en.products).map(({ description }) => description),
      Object.values(siteCopy.zh.products).map(({ description }) => description),
    );
    expectTranslationsToDiffer(siteCopy.en.openSource, siteCopy.zh.openSource);
    expectTranslationsToDiffer(siteCopy.en.future, siteCopy.zh.future);
    expectTranslationsToDiffer(siteCopy.en.about, siteCopy.zh.about);
    expectTranslationsToDiffer(siteCopy.en.footer, siteCopy.zh.footer);
    expectTranslationsToDiffer(siteCopy.en.languageSwitch.label, siteCopy.zh.languageSwitch.label);
  });

  it('将未来方向标记为探索中且不承诺日期', () => {
    expect(futureTracks).toEqual([
      { id: 'games', name: 'Games' },
      { id: 'utilities', name: 'Utilities' },
    ]);

    for (const locale of locales) {
      expect(siteCopy[locale].future.explorationNote).toBeTruthy();
      expect(siteCopy[locale].future.dateCommitment).toBe(false);
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
