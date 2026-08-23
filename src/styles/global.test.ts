import { existsSync, readFileSync } from 'node:fs';

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

  it('从本站 WOFF2 文件加载字体且不发起第三方字体请求', () => {
    const css = source('./global.css');
    const fontPaths = [
      '../../public/fonts/SpaceGrotesk-Variable.woff2',
      '../../public/fonts/NotoSansSC-VastNext.woff2',
    ];

    expect(css).not.toMatch(/@import|fonts\.googleapis\.com|fonts\.gstatic\.com/);
    expect(css).toMatch(/@font-face[\s\S]*font-family:\s*["']Space Grotesk["']/);
    expect(css).toMatch(/@font-face[\s\S]*font-family:\s*["']Noto Sans SC["']/);
    expect(css.match(/font-display:\s*swap/g)).toHaveLength(2);

    for (const fontPath of fontPaths) {
      const fontUrl = new URL(fontPath, import.meta.url);
      expect(existsSync(fontUrl), `${fontPath} 应存在`).toBe(true);
      if (existsSync(fontUrl)) {
        expect(readFileSync(fontUrl).subarray(0, 4).toString('ascii')).toBe('wOF2');
      }
    }
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
  });

  it('在页面滚动根裁切装饰元素产生的横向溢出', () => {
    const css = source('./global.css');
    const htmlRule = css.match(/^html\s*\{([^}]*)\}/m)?.[1];

    expect(htmlRule, '应定义基础 html 样式规则').toBeDefined();
    expect(htmlRule).toMatch(/overflow-x:\s*clip/);
  });

  it('为品牌首页链接应用至少 44px 的触控高度', () => {
    const css = source('./global.css');
    const brandRule = css.match(/\.site-header__brand\s*\{([^}]*)\}/)?.[1];

    expect(brandRule, '应定义 .site-header__brand 样式规则').toBeDefined();
    expect(brandRule).toMatch(/display:\s*inline-flex/);
    expect(brandRule).toMatch(/min-height:\s*44px/);
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

  it('将产品 reveal 位移与展台 hover 位移隔离到两层元素', () => {
    const component = source('../components/ProductShowcase.astro');
    const css = source('./global.css');
    const productOpeningTag = component.match(/<article\s+[\s\S]*?class=\{`product product--\$\{product\.id\}`\}[\s\S]*?>/)?.[0];

    expect(component).toMatch(/class=\{`product-reveal product-reveal--\$\{product\.id\}`\}[\s\S]*?data-reveal/);
    expect(productOpeningTag).toBeDefined();
    expect(productOpeningTag).not.toContain('data-reveal');
    expect(css).toMatch(/\.product-reveal--findry-ai\s*\{[^}]*grid-row:\s*span 2/);
    expect(css).toMatch(/\.product-reveal--vast-translator\s*\{[^}]*grid-column:\s*1 \/ -1/);
    expect(css).toMatch(/\.product-reveal\s*>\s*\.product\s*\{[^}]*height:\s*100%/);
    expect(css).toMatch(/\.product:hover\s*\{[^}]*transform:/);
    expect(css).not.toMatch(/\.js\s+\.product\[data-reveal\]/);
  });
});
