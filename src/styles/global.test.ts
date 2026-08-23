import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

const source = (relativePath: string) =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

describe('明亮新界视觉系统', () => {
  it('由基础布局引入全局样式与指定字体', () => {
    const layout = source('../layouts/BaseLayout.astro');
    const css = source('./global.css');

    expect(layout).toContain("import '../styles/global.css'");
    expect(css).toContain('Space Grotesk');
    expect(css).toContain('Noto Sans SC');
  });

  it('定义品牌画布、文字与四种功能色 token', () => {
    const css = source('./global.css');

    expect(css).toMatch(/--color-canvas:\s*#F7F8F3/i);
    expect(css).toMatch(/--color-ink:\s*#18235C/i);
    expect(css).toMatch(/--color-electric:/);
    expect(css).toMatch(/--color-mint:/);
    expect(css).toMatch(/--color-coral:/);
    expect(css).toMatch(/--color-lilac:/);
  });

  it('提供桌面、平板、390 手机布局与减少动效保护', () => {
    const css = source('./global.css');

    expect(css).toMatch(/@media\s*\(max-width:\s*960px\)/);
    expect(css).toMatch(/@media\s*\(max-width:\s*600px\)/);
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toMatch(/\.products__list[\s\S]*grid-template-columns/);
    expect(css).toMatch(/min-height:\s*44px/);
  });

  it('通过渐进增强 reveal hooks 驱动滚动进入效果', () => {
    const page = source('../components/BrandPage.astro');
    const css = source('./global.css');
    const components = [
      'Hero.astro',
      'ProductShowcase.astro',
      'OpenSourceFeature.astro',
      'FutureTracks.astro',
      'AboutSection.astro',
    ].map((name) => source(`../components/${name}`)).join('\n');

    expect(page).toContain('IntersectionObserver');
    expect(page).toContain("classList.add('js')");
    expect(components).toContain('data-reveal');
    expect(css).toMatch(/\.js\s+\[data-reveal\]/);
    expect(css).toMatch(/\.js\s+\[data-reveal\]\.is-visible/);
  });
});
