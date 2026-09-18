import type { Locale } from './site';

export interface TwoFactorCopy {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  directView: {
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
    backToInput: string;
  };
  manualInput: {
    title: string;
    description: string;
    inputPlaceholder: string;
    calculateBtn: string;
    insertTestKeyBtn: string;
    clearBtn: string;
    shareLinkTitle: string;
    shareLinkDesc: string;
    shareLinkCopyBtn: string;
    shareLinkCopied: string;
    rfcTestKeyNote: string;
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
        'Client-side TOTP two-factor code generator. Compute RFC 6238 codes offline, share 3-minute temporary view links, and copy with a single tap.',
    },
    hero: {
      badge: 'RFC 6238 · Zero Network · Pure WebCrypto',
      title: 'Clockwork 2FA Authenticator',
      subtitle:
        'A zero-knowledge two-factor code generator that runs entirely in your browser. Generate TOTP codes, share 3-minute temporary links, and tap to copy.',
    },
    directView: {
      secretFoundTitle: 'Active 2FA Code',
      secretFoundSubtitle: 'Computed directly on your device from secret key',
      issuerLabel: 'Issuer',
      accountLabel: 'Account',
      codeLabel: 'Two-Factor Authentication Code',
      clickToCopy: 'Click code to copy',
      copied: 'Copied to clipboard!',
      periodRemaining: 'seconds left in period',
      sessionTitle: 'Auto-refresh Active',
      sessionTimeRemaining: 'Refreshing for another',
      sessionExpiredTitle: '3-Minute Auto-Refresh Limit Reached',
      sessionExpiredDesc:
        'Auto-refresh stopped to prevent indefinite background execution. The code above may now be out of date.',
      sessionExpiredAction: 'Resume 3-Minute Refresh',
      backToInput: 'Enter another secret',
    },
    manualInput: {
      title: 'Enter Secret or OTPAuth Link',
      description:
        'Paste a Base32 key (e.g. JDU5RLZDW7LENCLQ7PCB3QJEUA4HOAZ6) or standard otpauth:// URL.',
      inputPlaceholder: 'Paste Base32 secret key or otpauth://totp/URI here...',
      calculateBtn: 'Generate 2FA Code',
      insertTestKeyBtn: 'Insert RFC Test Key',
      clearBtn: 'Clear',
      shareLinkTitle: '3-Minute Direct Link',
      shareLinkDesc: 'Open or share this direct URL to view this 2FA code instantly with a 3-minute refresh window:',
      shareLinkCopyBtn: 'Copy Link',
      shareLinkCopied: 'Link Copied!',
      rfcTestKeyNote: 'RFC 4226 / 6238 standard test key loaded (GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ).',
    },
    security: {
      title: 'Why you can trust it',
      items: [
        {
          title: 'Zero Network Requests',
          desc: 'HMAC calculations happen locally in memory via browser Web Crypto API. No secrets ever leave your browser.',
        },
        {
          title: '3-Minute Safety Lifecycle',
          desc: 'Direct secret links only refresh dynamically for 3 minutes before pausing, reducing accidental exposure on open screens.',
        },
        {
          title: 'Full RFC 6238 & 4226 Compliance',
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
        '纯本地离线 2FA TOTP 双重验证码生成器。支持 RFC 6238 标准、3 分钟临时链接即开即用、一键点击复制与零网络上传。',
    },
    hero: {
      badge: 'RFC 6238 · 零网络传输 · 纯 WebCrypto 运算',
      title: 'Clockwork 2FA 验证器',
      subtitle:
        '在浏览器本地运行的零知识双重身份验证器。输入 Base32 密钥或访问专属链接，即可获取动态 2FA 验证码，点击一键复制。',
    },
    directView: {
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
      backToInput: '输入其它密钥',
    },
    manualInput: {
      title: '输入密钥或 OTPAuth 链接',
      description: '支持纯 Base32 字符串（如 JDU5RLZDW7LENCLQ7PCB3QJEUA4HOAZ6）或标准 otpauth:// 链接。',
      inputPlaceholder: '在此粘贴 Base32 密钥或 otpauth://totp/... 链接...',
      calculateBtn: '立即生成验证码',
      insertTestKeyBtn: '填入 RFC 测试密钥',
      clearBtn: '清空',
      shareLinkTitle: '3 分钟专属快捷访问链接',
      shareLinkDesc: '打开或分享该链接可直接进入 3 分钟倒计时动态验证码页面：',
      shareLinkCopyBtn: '复制链接',
      shareLinkCopied: '链接已复制！',
      rfcTestKeyNote: '已载入 RFC 4226 / 6238 官方标准测试密钥 (GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ)。',
    },
    security: {
      title: '为什么可以信任它',
      items: [
        {
          title: '零网络请求与数据上传',
          desc: '所有 HMAC 哈希计算全部在浏览器内存中通过原生 Web Crypto API 完成，没有任何数据外传或存储。',
        },
        {
          title: '3 分钟安全刷新时限',
          desc: '页面默认仅维护 3 分钟动态刷新，超时后自动暂停，防止屏幕长时间闲置泄露最新验证码。',
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
