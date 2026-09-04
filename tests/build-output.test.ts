import { beforeAll, describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  contactFacts,
  futureTrackFacts,
  openSourceProjectFacts,
  productFacts,
  siteCopy,
  siteFacts,
} from '../src/content/site';
import { lexiLayerFacts, lexiLayerCopy } from '../src/content/lexiLayer';
import { buildSite, readBuiltPage } from './helpers/build';

let englishPage: string;
let chinesePage: string;
let englishPrivacyPage: string;
let chinesePrivacyPage: string;
let englishLexiLayerPage: string;
let chineseLexiLayerPage: string;

const projectRoot = resolve(import.meta.dirname, '..');

function expectLink(html: string, href: string): void {
  expect(html).toMatch(new RegExp(`<a[^>]+href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`));
}

function expectEveryExternalLink(html: string, href: string): void {
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const links = html.match(
    new RegExp(`<a\\b(?=[^>]*href=["']${escapedHref}["'])[^>]*>[\\s\\S]*?<\\/a>`, 'g'),
  ) ?? [];

  expect(links.length, `应至少输出一个指向 ${href} 的链接`).toBeGreaterThan(0);
  for (const link of links) {
    const openingTag = link.match(/^<a\b[^>]*>/)?.[0] ?? '';

    expect(openingTag, `${href} 的每个链接都应在新窗口打开`).toMatch(/\btarget=["']_blank["']/);
    expect(openingTag, `${href} 的每个链接都应包含 noreferrer`).toMatch(
      /\brel=["'][^"']*\bnoreferrer\b[^"']*["']/,
    );
    expect(link, `${href} 的每个链接都应包含屏幕阅读器新窗口提示`).toMatch(
      /<span class=["']sr-only["']>.+?<\/span>/,
    );
  }
}

function expectEveryExpectedExternalLink(html: string): void {
  for (const href of [
    ...Object.values(productFacts)
      .map((product) => product.url)
      .filter((url) => /^https?:\/\//.test(url)),
    ...Object.values(openSourceProjectFacts).map((project) => project.url),
    contactFacts.githubUrl,
  ]) {
    expectEveryExternalLink(html, href);
  }
}

function expectLocalizedMetadata(
  html: string,
  lang: string,
  canonical: string,
  enHref: string,
  zhHref: string,
): void {
  expect(html).toMatch(new RegExp(`<html[^>]+lang=["']${lang}["']`));
  expect(html).toContain(`<link rel="canonical" href="${canonical}">`);
  expect(html).toContain(`<link rel="alternate" hreflang="en" href="${enHref}">`);
  expect(html).toContain(`<link rel="alternate" hreflang="zh-CN" href="${zhHref}">`);
  expect(html).toContain(`<link rel="alternate" hreflang="x-default" href="${enHref}">`);
}

function getFutureTrack(html: string, trackId: string): string {
  const escapedTrackId = trackId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const article = html.match(
    new RegExp(`<article(?=[^>]*data-track=["']${escapedTrackId}["'])[^>]*>[\\s\\S]*?<\\/article>`),
  );

  expect(article, `应输出 data-track="${trackId}" 的未来方向条目`).not.toBeNull();
  return article![0];
}

function expectAccessibleBrandEquation(html: string, equationLabel: string): void {
  const escapedLabel = equationLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  expect(html).toMatch(
    new RegExp(
      `<div(?=[^>]*data-brand-equation)(?=[^>]*aria-hidden=["']true["'])[^>]*>[\\s\\S]*?<\\/div>\\s*` +
        `<p class=["']sr-only["']>${escapedLabel}<\\/p>`,
    ),
  );
}

beforeAll(() => {
  buildSite();
  englishPage = readBuiltPage('index.html');
  chinesePage = readBuiltPage('zh/index.html');
  englishPrivacyPage = readBuiltPage('privacy/index.html');
  chinesePrivacyPage = readBuiltPage('zh/privacy/index.html');
  englishLexiLayerPage = readBuiltPage('lexi-layer/index.html');
  chineseLexiLayerPage = readBuiltPage('zh/lexi-layer/index.html');
}, 90_000);

describe('品牌页构建产物', () => {
  it('为英文和中文页面输出正确的语言及本地化链接元数据', () => {
    const enUrl = `${siteFacts.siteUrl}/`;
    const zhUrl = `${siteFacts.siteUrl}/zh/`;

    expectLocalizedMetadata(englishPage, 'en', enUrl, enUrl, zhUrl);
    expectLocalizedMetadata(chinesePage, 'zh-CN', zhUrl, enUrl, zhUrl);
  });

  it.each([
    ['en', () => englishPage, siteCopy.en.tagline],
    ['zh', () => chinesePage, siteCopy.zh.tagline],
  ])('%s 页面只有一个 H1，且内容为对应标语', (_locale, getHtml, tagline) => {
    const html = getHtml();
    const headings = html.match(/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/g) ?? [];

    expect(headings).toHaveLength(1);
    expect(headings[0]).toContain(tagline.replaceAll("'", '&#39;'));
  });

  it.each([
    ['en', () => englishPage, siteCopy.en.languageSwitch.href, '/lexi-layer/'],
    ['zh', () => chinesePage, siteCopy.zh.languageSwitch.href, '/zh/lexi-layer/'],
  ])('%s 页面包含所有产品、开源项目、联系入口、语层翻译入口及语言切换', (_locale, getHtml, languageHref, lexiLayerHref) => {
    const html = getHtml();

    expectEveryExpectedExternalLink(html);
    expectLink(html, `mailto:${contactFacts.email}`);
    expectLink(html, languageHref);
    expectLink(html, lexiLayerHref);
  });

  it.each([
    ['en', () => englishPage],
    ['zh', () => chinesePage],
  ])('%s 页面为两个开源项目输出独立展台', (_locale, getHtml) => {
    const html = getHtml();

    for (const [projectId, project] of Object.entries(openSourceProjectFacts)) {
      const article = html.match(
        new RegExp(`<article(?=[^>]*data-project=["']${projectId}["'])[^>]*>[\\s\\S]*?<\\/article>`),
      );

      expect(article, `应输出 ${projectId} 开源项目展台`).not.toBeNull();
      expect(article![0]).toContain(`<h3>${project.name}</h3>`);
      for (const fact of project.facts) {
        expect(article![0]).toContain(fact);
      }
    }
  });

  it('英文未来方向中每个共享事实只渲染一个可见标题', () => {
    for (const trackId of Object.keys(futureTrackFacts) as Array<keyof typeof futureTrackFacts>) {
      const article = getFutureTrack(englishPage, trackId);
      const title = siteCopy.en.future.tracks[trackId].title;
      const visibleText = article
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const titleOccurrences = visibleText.match(new RegExp(`\\b${title}\\b`, 'g')) ?? [];

      expect(article).toContain(`<h3>${title}</h3>`);
      expect(titleOccurrences, `${title} 在对应 future item 中应只显示一次`).toHaveLength(1);
    }
  });

  it.each([
    ['en', () => englishPage, siteCopy.en.future.explorationNote],
    ['zh', () => chinesePage, siteCopy.zh.future.explorationNote],
  ])('%s 页面始终显示未来方向探索说明且不输出日期承诺属性', (_locale, getHtml, explorationNote) => {
    const html = getHtml();

    expect(html).toContain(explorationNote);
    expect(html).not.toContain('data-date-commitment');
  });

  it.each([
    ['en', () => englishPage, 'Vast plus Next: an open horizon for what comes next.'],
    ['zh', () => chinesePage, 'Vast 加上 Next，寓意瀚海与未来。'],
  ])('%s 页面隐藏视觉品牌等式并提供单一辅助说明', (_locale, getHtml, equationLabel) => {
    expectAccessibleBrandEquation(getHtml(), equationLabel);
  });

  it.each([
    ['en', () => englishPage, '/privacy/', '/lexi-layer/'],
    ['zh', () => chinesePage, '/zh/privacy/', '/zh/lexi-layer/'],
  ])('%s 页面包含站内导航和隐私链接', (_locale, getHtml, privacyHref, lexiLayerHref) => {
    const html = getHtml();

    expectLink(html, lexiLayerHref);
    expectLink(html, '#products');
    expectLink(html, '#open-source');
    expectLink(html, '#about');
    expectLink(html, privacyHref);
  });

  it.each([
    ['en', () => englishPage],
    ['zh', () => chinesePage],
  ])('%s 页面输出可解析的 Organization JSON-LD', (_locale, getHtml) => {
    const script = getHtml().match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

    expect(script).not.toBeNull();
    expect(JSON.parse(script![1])).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteFacts.brandName,
      url: siteFacts.siteUrl,
      sameAs: [contactFacts.githubUrl],
      logo: `${siteFacts.siteUrl}/favicon-01.svg`,
    });
    expect(getHtml()).toContain('<link rel="icon" href="/favicon-01.svg" type="image/svg+xml">');
  });

  it('为英文和中文隐私页面输出正确的语言及本地化链接元数据', () => {
    const enUrl = `${siteFacts.siteUrl}/privacy/`;
    const zhUrl = `${siteFacts.siteUrl}/zh/privacy/`;

    expectLocalizedMetadata(englishPrivacyPage, 'en', enUrl, enUrl, zhUrl);
    expectLocalizedMetadata(chinesePrivacyPage, 'zh-CN', zhUrl, enUrl, zhUrl);
  });

  it.each([
    ['en', () => englishPrivacyPage, siteCopy.en.privacy, '/'],
    ['zh', () => chinesePrivacyPage, siteCopy.zh.privacy, '/zh/'],
  ])('%s 隐私页面包含核心说明、联系邮箱和返回首页链接', (_locale, getHtml, privacy, homeHref) => {
    const html = getHtml();

    expect(html).toContain(privacy.noCollection);
    expect(html).toContain(privacy.technicalData);
    expect(html).toContain(privacy.externalLinks);
    expectLink(html, `mailto:${contactFacts.email}`);
    expectLink(html, homeHref);
  });

  it('构建产物包含 Cloudflare 安全头、robots、sitemap 和无斜杠重定向', () => {
    const headers = readFileSync(resolve(projectRoot, 'dist/_headers'), 'utf8');
    const redirects = readFileSync(resolve(projectRoot, 'dist/_redirects'), 'utf8');
    const fontHeaders = headers.match(/\/fonts\/\*[\s\S]*?(?=\n\/|$)/)?.[0] ?? '';
    const svgHeaders = headers.match(/\/\*\.svg[\s\S]*?(?=\n\/|$)/)?.[0] ?? '';

    expect(headers).toContain('/*');
    expect(headers).toContain('X-Content-Type-Options: nosniff');
    expect(headers).toContain('Referrer-Policy: strict-origin-when-cross-origin');
    expect(headers).toContain('Permissions-Policy:');
    expect(headers).toContain('X-Frame-Options: DENY');
    expect(fontHeaders).toContain('Cache-Control: public, max-age=0, must-revalidate');
    expect(fontHeaders).not.toContain('max-age=604800');
    expect(svgHeaders).toContain('Cache-Control: public, max-age=0, must-revalidate');
    for (const [from, to] of [
      ['/privacy', '/privacy/'],
      ['/lexi-layer', '/lexi-layer/'],
      ['/zh/privacy', '/zh/privacy/'],
      ['/zh/lexi-layer', '/zh/lexi-layer/'],
    ] as const) {
      expect(redirects).toContain(`${from} ${to} 308`);
    }
    expect(existsSync(resolve(projectRoot, 'dist/robots.txt'))).toBe(true);
    expect(existsSync(resolve(projectRoot, 'dist/sitemap-index.xml'))).toBe(true);
  });

  it('首页隐私链接与生成页面闭合', () => {
    expectLink(englishPage, '/privacy/');
    expectLink(chinesePage, '/zh/privacy/');
    expect(englishPrivacyPage).toContain(siteCopy.en.privacy.title);
    expect(chinesePrivacyPage).toContain(siteCopy.zh.privacy.title);
  });
});

describe('LexiLayer 产品页构建产物', () => {
  it('输出双语元数据、核心入口和全部产品截图', () => {
    const enUrl = `${siteFacts.siteUrl}/lexi-layer/`;
    const zhUrl = `${siteFacts.siteUrl}/zh/lexi-layer/`;

    expectLocalizedMetadata(englishLexiLayerPage, 'en', enUrl, enUrl, zhUrl);
    expectLocalizedMetadata(chineseLexiLayerPage, 'zh-CN', zhUrl, enUrl, zhUrl);

    for (const html of [englishLexiLayerPage, chineseLexiLayerPage]) {
      expect(html).toContain(lexiLayerFacts.githubUrl);
      expect(html).toContain(lexiLayerFacts.releasesUrl);
      expect(html).toContain(lexiLayerFacts.issuesUrl);
      expect(html).toContain(lexiLayerFacts.pullsUrl);
      expect(html).toContain(lexiLayerFacts.demoSiteUrl);
      for (const screenshot of Object.values(lexiLayerFacts.screenshots)) {
        expect(html).toContain(`src="${screenshot}"`);
        expect(existsSync(resolve(projectRoot, 'public', screenshot.slice(1)))).toBe(true);
      }
      expect(html).not.toMatch(/sk-[A-Za-z0-9_-]{20,}/);
    }

    expect(englishLexiLayerPage).toContain(lexiLayerCopy.en.hero.title);
    expect(chineseLexiLayerPage).toContain(lexiLayerCopy.zh.hero.title);
  });
});
