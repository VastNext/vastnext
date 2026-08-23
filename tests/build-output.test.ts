import { beforeAll, describe, expect, it } from 'vitest';

import {
  contactFacts,
  futureTrackFacts,
  openSourceProject,
  productFacts,
  siteCopy,
  siteFacts,
} from '../src/content/site';
import { buildSite, readBuiltPage } from './helpers/build';

let englishPage: string;
let chinesePage: string;

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
    ...Object.values(productFacts).map((product) => product.url),
    openSourceProject.url,
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

beforeAll(() => {
  buildSite();
  englishPage = readBuiltPage('index.html');
  chinesePage = readBuiltPage('zh/index.html');
}, 30_000);

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
    ['en', () => englishPage, siteCopy.en.languageSwitch.href],
    ['zh', () => chinesePage, siteCopy.zh.languageSwitch.href],
  ])('%s 页面包含所有产品、开源项目、联系入口及语言切换', (_locale, getHtml, languageHref) => {
    const html = getHtml();

    expectEveryExpectedExternalLink(html);
    expectLink(html, `mailto:${contactFacts.email}`);
    expectLink(html, languageHref);
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
    ['en', () => englishPage, '/privacy/'],
    ['zh', () => chinesePage, '/zh/privacy/'],
  ])('%s 页面包含站内导航和隐私链接', (_locale, getHtml, privacyHref) => {
    const html = getHtml();

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
    });
  });
});
