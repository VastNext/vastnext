# VastNext 品牌站

VastNext 的双语静态品牌网站，用于介绍品牌、产品、开源项目和未来探索方向。生产站点：<https://vastnext.com>。

## 技术栈

- Astro 静态站点生成
- TypeScript
- 原生 CSS
- Vitest 构建产物测试
- `@astrojs/sitemap` 站点地图

## 本地开发

需要 Node.js 22.19 或更高版本。

```bash
npm install
npm run dev
```

常用命令：

```bash
npm test
npm run check
npm run build
npm run preview
```

## 多语言路径

- 英文首页：`/`
- 中文首页：`/zh/`
- 英文隐私页：`/privacy/`
- 中文隐私页：`/zh/privacy/`

页面会输出对应的 canonical、hreflang 和 `x-default` 元数据。

## Cloudflare Pages

生产站点部署在 Cloudflare Pages，由 GitHub Actions 在 `main` 分支更新后自动发布。

Cloudflare Pages 项目可使用以下构建设置：

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js 版本：22.19 或更高

仓库包含 `.github/workflows/deploy-pages.yml`。向 `main` 推送后，GitHub Actions 会先运行测试、类型检查和构建，再通过 Wrangler Direct Upload 发布 `dist`。仓库需要配置以下 Secrets：

- `CLOUDFLARE_API_TOKEN`：具有 `Account / Cloudflare Pages / Edit` 权限。
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID。

绑定 `vastnext.com` 自定义域名时，应在同一个 Cloudflare 账户中完成域名关联，并检查现有 DNS 记录，避免与 Pages 自动创建的记录冲突。切换 DNS 或删除旧记录前，应先确认当前线上服务和子域名依赖。仓库中的 `public/_headers` 会随构建复制到 `dist/_headers`。

## 项目结构

```text
public/             静态资源、robots、字体和 Cloudflare 配置
src/components/     页面组件
src/content/        双语内容模型与共享事实
src/layouts/        HTML 布局和页面元数据
src/pages/          Astro 文件路由
src/styles/         全局视觉系统
tests/              构建产物测试
```

## 内容与字体维护

双语内容集中在 `src/content/site.ts`。新增或修改页面时，应同步检查两种语言、站内链接、canonical 和 hreflang。

中文字体使用站点所需字符的子集文件。中文文案变化后，应重新生成 `public/fonts/NotoSansSC-VastNext.woff2` 字体子集，并参考 `public/fonts/README.md` 核对来源、授权和更新步骤，避免新增字符回退到系统字体。字体使用固定文件名，因此缓存策略会在每次使用前重新验证，确保新部署的字形及时生效。
