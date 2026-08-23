# 本地字体说明

本站不在运行时请求 Google Fonts，字体文件均由项目静态托管。

## Space Grotesk

- 文件：`SpaceGrotesk-Variable.woff2`
- 上游：Google Fonts 官方仓库 `ofl/spacegrotesk/SpaceGrotesk[wght].ttf`
- 来源：https://github.com/google/fonts/tree/main/ofl/spacegrotesk
- 字重范围：300-700
- 处理：使用 fontTools 转为 WOFF2，并保留 Latin、Latin Extended 与常用标点字符。

## Noto Sans SC

- 文件：`NotoSansSC-VastNext.woff2`
- 上游：Google Fonts 官方仓库 `ofl/notosanssc/NotoSansSC[wght].ttf`
- 来源：https://github.com/google/fonts/tree/main/ofl/notosanssc
- 字重范围：100-900
- 处理：使用 fontTools 转为 WOFF2，并按当前 `src` 中实际使用的中英文字符生成站点子集。新增可见文案后，应重新生成该子集并检查页面字形。

两套字体均依据 SIL Open Font License 1.1 分发。完整许可证和版权声明见 `OFL-1.1.txt`。
