import type { Locale } from './site';

export interface TwoFactorCopy {
  meta: {
    title: string;
    description: string;
  };
  masthead: {
    brand: string;
    tagline: string;
    spec: string;
    offline: string;
    directModeBadge: string;
  };
  vacant: {
    title: string;
    subtitle: string;
    instructions: string;
  };
  directView: {
    badge: string;
    secretFoundTitle: string;
    secretFoundSubtitle: string;
    issuerLabel: string;
    accountLabel: string;
    codeLabel: string;
    clickToCopy: string;
    copied: string;
    periodRemaining: string;
    sessionTitle: string;
    sessionTimeRemaining: string;
    sessionExpiredTitle: string;
    sessionExpiredDesc: string;
    sessionExpiredAction: string;
    openFullTool: string;
  };
  workspace: {
    codesTitle: string;
    filterPlaceholder: string;
    filterEmpty: string;
    nextPrefix: string;
    inSeconds: string;
    copyCode: string;
    copied: string;
    inputTitle: string;
    inputSubtitle: string;
    inputPlaceholder: string;
    clearBtn: string;
    insertTestKeyBtn: string;
    qrFileBtn: string;
    formatsSummary: string;
    shareLinkTitle: string;
    shareLinkDesc: string;
    shareLinkCopyBtn: string;
    shareLinkCopied: string;
  };
  security: {
    title: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  backHome: string;
}

export const twoFactorCopy: Record<Locale, TwoFactorCopy> = {
  en: {
    meta: {
      title: 'Clockwork 2FA Authenticator — VastNext',
      description:
        'Client-side TOTP two-factor authenticator. Compute RFC 6238 codes offline, share 3-minute temporary view links, and copy with a single tap.',
    },
    masthead: {
      brand: 'Clockwork',
      tagline: 'TOTP Authenticator',
      spec: 'RFC 6238 · RFC 4226 · RFC 4648',
      offline: 'Offline · nothing stored',
      directModeBadge: '3-Minute Direct Link Mode',
    },
    vacant: {
      title: 'Ready for input',
      subtitle: 'Put in a secret, an otpauth link or a QR image — nothing ever leaves this browser.',
      instructions: 'Enter one secret per line (e.g. GitHub: JBSWY3DPEHPK3PXP or raw Base32 / otpauth:// URL)',
    },
    directView: {
      badge: '3-Minute Temporary View',
      secretFoundTitle: 'Active 2FA Code',
      secretFoundSubtitle: 'Computed locally in browser memory from secret key',
      issuerLabel: 'Issuer',
      accountLabel: 'Account',
      codeLabel: 'Two-Factor Authentication Code',
      clickToCopy: 'Click code to copy',
      copied: 'Copied to clipboard!',
      periodRemaining: 'seconds remaining in period',
      sessionTitle: 'Auto-refresh Active',
      sessionTimeRemaining: 'Refreshing for another',
      sessionExpiredTitle: '3-Minute Auto-Refresh Limit Reached',
      sessionExpiredDesc:
        'Auto-refresh stopped to prevent background token leakage on open screens. The code above may now be expired.',
      sessionExpiredAction: 'Resume 3-Minute Refresh',
      openFullTool: 'Open Clockwork Multi-Account Workspace',
    },
    workspace: {
      codesTitle: 'Codes',
      filterPlaceholder: 'Filter accounts...',
      filterEmpty: 'No accounts match the filter.',
      nextPrefix: 'next',
      inSeconds: 's valid',
      copyCode: 'Copy',
      copied: 'Copied',
      inputTitle: 'Input Secrets',
      inputSubtitle: 'One entry per line: Name: SECRET, raw Base32, or otpauth:// URIs',
      inputPlaceholder: 'GitHub: JBSWY3DPEHPK3PXP\nAWS: GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ\notpauth://totp/Google:user@gmail.com?secret=JBSWY3DPEHPK3PXP',
      clearBtn: 'Clear',
      insertTestKeyBtn: 'Insert RFC Test Key',
      qrFileBtn: 'Scan QR / Image',
      formatsSummary: 'Supported formats: Name: SECRET, raw Base32, otpauth://totp/..., # comments',
      shareLinkTitle: '3-Minute Temporary Direct Link',
      shareLinkDesc: 'Share or bookmark this direct link to view this 2FA code with a 3-minute auto-refresh window:',
      shareLinkCopyBtn: 'Copy Link',
      shareLinkCopied: 'Link Copied!',
    },
    security: {
      title: 'Why you can trust it',
      items: [
        {
          title: 'Zero Network Requests',
          desc: 'HMAC calculations happen locally in memory via browser Web Crypto API. No secrets ever leave your browser.',
        },
        {
          title: 'Zero Storage by Default',
          desc: 'Nothing is stored in localStorage, cookies, or IndexedDB. Close the tab and all secrets are gone.',
        },
        {
          title: '3-Minute Direct Link Safety',
          desc: 'Direct secret links refresh dynamically for 3 minutes before auto-pausing, preventing open screen exposure.',
        },
        {
          title: 'Full RFC Compliance',
          desc: 'Verified against all official standard test vectors with SHA-1, SHA-256, and SHA-512 support.',
        },
      ],
    },
    backHome: 'Back to VastNext Home',
  },
  zh: {
    meta: {
      title: 'Clockwork 2FA 验证器 — 瀚海未来',
      description:
        '纯本地离线 2FA TOTP 双重验证码生成器。支持 RFC 6238 标准、多账户管理、3 分钟临时直达链接与全端一键点击复制。',
    },
    masthead: {
      brand: 'Clockwork',
      tagline: 'TOTP 动态验证器',
      spec: 'RFC 6238 · RFC 4226 · RFC 4648',
      offline: '离线运算 · 零数据存储',
      directModeBadge: '3 分钟临时直达模式',
    },
    vacant: {
      title: '等待输入密钥',
      subtitle: '输入密钥、otpauth 链接或上传二维码图片 — 所有数据纯本地运算，永不离开当前浏览器。',
      instructions: '每行输入一个账户（例如 GitHub: JBSWY3DPEHPK3PXP 或纯 Base32 / otpauth:// 链接）',
    },
    directView: {
      badge: '3 分钟临时直达视图',
      secretFoundTitle: '当前 2FA 动态验证码',
      secretFoundSubtitle: '由浏览器基于本地密钥实时计算生成',
      issuerLabel: '平台/发布者',
      accountLabel: '账户',
      codeLabel: '动态双重验证码 (TOTP)',
      clickToCopy: '点击验证码一键复制',
      copied: '已复制到剪贴板！',
      periodRemaining: '秒后刷新本轮代码',
      sessionTitle: '实时刷新中',
      sessionTimeRemaining: '距离停止刷新还剩',
      sessionExpiredTitle: '已达到 3 分钟自动刷新时限',
      sessionExpiredDesc: '为保障安全性并避免后台持续轮询，已停止自动刷新。当前显示的验证码可能已失效。',
      sessionExpiredAction: '重新开始刷新（3分钟）',
      openFullTool: '打开 Clockwork 多账户完整工作区',
    },
    workspace: {
      codesTitle: '动态验证码',
      filterPlaceholder: '过滤/搜索账户...',
      filterEmpty: '未找到匹配的账户。',
      nextPrefix: '下一轮',
      inSeconds: '秒后失效',
      copyCode: '复制',
      copied: '已复制',
      inputTitle: '输入密钥',
      inputSubtitle: '每行一个：支持 名称: 密钥、纯 Base32 或 otpauth:// 链接',
      inputPlaceholder: 'GitHub: JBSWY3DPEHPK3PXP\nAWS: GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ\notpauth://totp/Google:user@gmail.com?secret=JBSWY3DPEHPK3PXP',
      clearBtn: '清空',
      insertTestKeyBtn: '填入 RFC 测试密钥',
      qrFileBtn: '导入二维码图片',
      formatsSummary: '支持格式：名称: SECRET、纯 Base32、otpauth://totp/...、# 注释行',
      shareLinkTitle: '3 分钟专属快捷访问链接',
      shareLinkDesc: '打开或分享该链接可直接进入 3 分钟倒计时动态验证码页面：',
      shareLinkCopyBtn: '复制链接',
      shareLinkCopied: '链接已复制！',
    },
    security: {
      title: '为什么可以信任它',
      items: [
        {
          title: '零网络请求与数据上传',
          desc: '所有 HMAC 哈希计算全部在浏览器内存中通过原生 Web Crypto API 完成，没有任何数据外传。',
        },
        {
          title: '默认零存储',
          desc: '不使用 localStorage、Cookie 或数据库，关闭标签页后内存数据即刻销毁。',
        },
        {
          title: '3 分钟安全刷新时限',
          desc: '直达链接默认仅维护 3 分钟动态刷新，超时后自动暂停，防止屏幕长时间闲置泄露最新验证码。',
        },
        {
          title: '严格符合 RFC 6238 & 4226',
          desc: '通过全部官方测试用例，支持 SHA-1、SHA-256、SHA-512 与多种位数/周期配置。',
        },
      ],
    },
    backHome: '返回瀚海未来首页',
  },
};
