import { decodeBase32 } from './base32';
import { MAX_DIGITS, MIN_DIGITS, type HashAlgorithm } from './hotp';
import { DEFAULT_ALGORITHM, DEFAULT_DIGITS, DEFAULT_PERIOD } from './totp';
import type { Bytes } from './bytes';

export class OtpauthUriError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OtpauthUriError';
  }
}

export interface ParsedOtpauthUri {
  readonly secret: string;
  readonly issuer?: string;
  readonly accountName?: string;
  readonly algorithm: HashAlgorithm;
  readonly digits: number;
  readonly period: number;
}

export interface Account {
  readonly issuer?: string;
  readonly accountName?: string;
  readonly secret: Bytes;
  readonly rawSecret: string;
  readonly algorithm: HashAlgorithm;
  readonly digits: number;
  readonly period: number;
}

export function isOtpauthUri(text: string): boolean {
  return /^otpauth:\/\//i.test(text.trim());
}

export function parseOtpauthUri(input: string): ParsedOtpauthUri {
  const trimmed = input.trim();
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new OtpauthUriError('无效的 URI 格式，期望为 "otpauth://totp/..."。');
  }

  if (url.protocol.toLowerCase() !== 'otpauth:') {
    throw new OtpauthUriError(`未知协议 "${url.protocol}"，期望为 "otpauth"。`);
  }

  const type = url.hostname.toLowerCase();
  if (type === 'hotp') {
    throw new OtpauthUriError('检测到 HOTP（基于计数器）协议，当前仅支持基于时间的 TOTP 验证码。');
  }
  if (type !== 'totp') {
    throw new OtpauthUriError(`未知类型 "${url.hostname}"，期望为 "totp"。`);
  }

  const { issuerFromLabel, accountName } = parseLabel(url.pathname);
  const secret = url.searchParams.get('secret')?.trim();
  if (!secret) {
    throw new OtpauthUriError('URI 中缺少必要的 "secret" 参数。');
  }

  const issuerParam = url.searchParams.get('issuer')?.trim();
  const issuer = issuerParam || issuerFromLabel;

  return {
    secret,
    issuer: issuer || undefined,
    accountName: accountName || undefined,
    algorithm: parseAlgorithm(url.searchParams.get('algorithm')),
    digits: parseDigits(url.searchParams.get('digits')),
    period: parsePeriod(url.searchParams.get('period')),
  };
}

function parseLabel(pathname: string): {
  issuerFromLabel?: string;
  accountName?: string;
} {
  const raw = pathname.replace(/^\//, '');
  let label: string;
  try {
    label = decodeURIComponent(raw);
  } catch {
    throw new OtpauthUriError('URI 标签包含无效的 URL 编码字符。');
  }

  const separator = label.indexOf(':');
  if (separator === -1) {
    return { issuerFromLabel: undefined, accountName: label.trim() || undefined };
  }
  return {
    issuerFromLabel: label.slice(0, separator).trim() || undefined,
    accountName: label.slice(separator + 1).trim() || undefined,
  };
}

function parseAlgorithm(value: string | null): HashAlgorithm {
  if (value === null || value.trim() === '') {
    return DEFAULT_ALGORITHM;
  }
  const norm = value.trim().toUpperCase().replace(/-/g, '');
  switch (norm) {
    case 'SHA1':
      return 'SHA-1';
    case 'SHA256':
      return 'SHA-256';
    case 'SHA512':
      return 'SHA-512';
    default:
      throw new OtpauthUriError(`不支持的哈希算法 "${value}"，支持 SHA1, SHA256, SHA512。`);
  }
}

function parseDigits(value: string | null): number {
  if (value === null || value.trim() === '') {
    return DEFAULT_DIGITS;
  }
  const digits = Number(value.trim());
  if (!Number.isInteger(digits) || digits < MIN_DIGITS || digits > MAX_DIGITS) {
    throw new OtpauthUriError(`无效的位数 "${value}"，允许值为 ${MIN_DIGITS} 到 ${MAX_DIGITS}。`);
  }
  return digits;
}

function parsePeriod(value: string | null): number {
  if (value === null || value.trim() === '') {
    return DEFAULT_PERIOD;
  }
  const period = Number(value.trim());
  if (!Number.isInteger(period) || period < 1 || period > 3600) {
    throw new OtpauthUriError(`无效的周期 "${value}"，允许值为 1 到 3600 秒。`);
  }
  return period;
}

/**
 * 解析用户输入的字符串（支持纯 Base32、带标签的 "Issuer: SECRET" 或 otpauth:// URI）
 */
export function parseInputToAccount(source: string): Account {
  const trimmed = source.trim();
  if (!trimmed) {
    throw new Error('输入内容不能为空。');
  }

  if (isOtpauthUri(trimmed)) {
    const uri = parseOtpauthUri(trimmed);
    return {
      issuer: uri.issuer,
      accountName: uri.accountName,
      secret: decodeBase32(uri.secret),
      rawSecret: uri.secret.replace(/[\s-]+/g, '').toUpperCase(),
      algorithm: uri.algorithm,
      digits: uri.digits,
      period: uri.period,
    };
  }

  // 检查是否包含标签分隔符冒号 (例 "GitHub: JDU5RLZDW7LENCLQ7PCB3QJEUA4HOAZ6")
  const separator = trimmed.lastIndexOf(':');
  const label = separator === -1 ? undefined : trimmed.slice(0, separator).trim();
  const secretText = separator === -1 ? trimmed : trimmed.slice(separator + 1).trim();

  return {
    issuer: label || undefined,
    accountName: undefined,
    secret: decodeBase32(secretText),
    rawSecret: secretText.replace(/[\s-]+/g, '').toUpperCase(),
    algorithm: DEFAULT_ALGORITHM,
    digits: DEFAULT_DIGITS,
    period: DEFAULT_PERIOD,
  };
}

export function formatOtpCode(code: string): string {
  if (code.length === 6) {
    return `${code.slice(0, 3)} ${code.slice(3)}`;
  }
  if (code.length === 8) {
    return `${code.slice(0, 4)} ${code.slice(4)}`;
  }
  return code;
}
