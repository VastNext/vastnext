import { describe, expect, it } from 'vitest';

import {
  futureTracks,
  locales,
  openSourceProject,
  products,
  siteCopy,
} from './site';

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
      technology: 'Rust + WebView2',
      license: 'MIT',
    });
  });

  it('为每种语言提供完整且独立的页面文案', () => {
    for (const locale of locales) {
      const copy = siteCopy[locale];

      expect(copy.title.trim()).not.toBe('');
      expect(copy.description.trim()).not.toBe('');
      expect(copy.tagline.trim()).not.toBe('');
      expect(Object.values(copy.nav).every(Boolean)).toBe(true);
      expect(Object.values(copy.hero.cta).every(Boolean)).toBe(true);
      expect(Object.keys(copy.products)).toEqual(products.map(({ id }) => id));
      expect(
        Object.values(copy.products).every(
          ({ title, description }) => title.trim() && description.trim(),
        ),
      ).toBe(true);
      expect(Object.values(copy.openSource).every(Boolean)).toBe(true);
      expect(Object.keys(copy.future.tracks)).toEqual(futureTracks.map(({ id }) => id));
      expect(copy.future.eyebrow).toBeTruthy();
      expect(copy.future.title).toBeTruthy();
      expect(copy.future.description).toBeTruthy();
      expect(copy.future.explorationNote).toBeTruthy();
      expect(Object.values(copy.about).every(Boolean)).toBe(true);
      expect(Object.values(copy.footer).every(Boolean)).toBe(true);
    }

    expect(siteCopy.en.title).not.toBe(siteCopy.zh.title);
    expect(siteCopy.en.description).not.toBe(siteCopy.zh.description);
    expect(siteCopy.en.tagline).not.toBe(siteCopy.zh.tagline);
    expect(siteCopy.en.tagline).toBe("Useful ideas, built for what's next.");
    expect(siteCopy.zh.tagline).toBe('把有用的想法，带到下一个未来。');
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

  it('提供品牌联系方式、GitHub 地址和双向语言切换', () => {
    expect(siteCopy.en.footer.email).toBe('hello@vastnext.com');
    expect(siteCopy.zh.footer.email).toBe('hello@vastnext.com');
    expect(siteCopy.en.footer.githubUrl).toBe('https://github.com/VastNext');
    expect(siteCopy.zh.footer.githubUrl).toBe('https://github.com/VastNext');
    expect(siteCopy.en.languageSwitch.href).toBe('/zh/');
    expect(siteCopy.zh.languageSwitch.href).toBe('/');
  });
});
