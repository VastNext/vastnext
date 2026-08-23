import { beforeAll, describe, expect, it } from 'vitest';

import {
  contactFacts,
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

function expectExternalLink(html: string, href: string): void {
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  expect(html).toMatch(
    new RegExp(`<a(?=[^>]+href=["']${escapedHref}["'])(?=[^>]+target=["']_blank["'])(?=[^>]+rel=["']noreferrer["'])[^>]*>`),
  );
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

    for (const product of Object.values(productFacts)) {
      expectExternalLink(html, product.url);
    }
    expectExternalLink(html, openSourceProject.url);
    expectExternalLink(html, contactFacts.githubUrl);
    expectLink(html, `mailto:${contactFacts.email}`);
    expectLink(html, languageHref);
  });

  it.each([
    ['en', () => englishPage, '/privacy/'],
    ['zh', () => chinesePage, '/zh/privacy/'],
  ])('%s 页面包含站内导航、隐私链接和新窗口辅助提示', (_locale, getHtml, privacyHref) => {
    const html = getHtml();

    expectLink(html, '#products');
    expectLink(html, '#open-source');
    expectLink(html, '#about');
    expectLink(html, privacyHref);
    expect(html).toContain('class="sr-only"');
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
