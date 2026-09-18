import type { Bytes } from './bytes';

export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';
export const HASH_ALGORITHMS: readonly HashAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-512'];

export const MIN_DIGITS = 6;
export const MAX_DIGITS = 8;

export class OtpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OtpError';
  }
}

export function assertDigits(digits: number): void {
  if (!Number.isInteger(digits) || digits < MIN_DIGITS || digits > MAX_DIGITS) {
    throw new OtpError(`无效的代码位数: ${digits}，仅支持 ${MIN_DIGITS} 到 ${MAX_DIGITS} 位。`);
  }
}

export function counterToBytes(counter: number | bigint): Bytes {
  let value: bigint;
  if (typeof counter === 'bigint') {
    value = counter;
  } else {
    if (!Number.isSafeInteger(counter)) {
      throw new OtpError(`计数器 ${counter} 不是有效整数。`);
    }
    value = BigInt(counter);
  }
  if (value < 0n) {
    throw new OtpError('计数器不能为负数。');
  }
  if (value > 0xffff_ffff_ffff_ffffn) {
    throw new OtpError('计数器超出 8 字节最大范围。');
  }

  const bytes = new Uint8Array(8);
  new DataView(bytes.buffer).setBigUint64(0, value, false);
  return bytes;
}

export async function hmac(algorithm: HashAlgorithm, key: Bytes, message: Bytes): Promise<Bytes> {
  if (key.length === 0) {
    throw new OtpError('密钥为空，无法计算哈希。');
  }

  const cryptoSubtle = globalThis.crypto?.subtle;
  if (!cryptoSubtle) {
    throw new OtpError('当前运行环境不支持 Web Crypto API。');
  }

  const cryptoKey = await cryptoSubtle.importKey(
    'raw',
    key as unknown as ArrayBuffer,
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['sign'],
  );
  const signature = await cryptoSubtle.sign('HMAC', cryptoKey, message as unknown as ArrayBuffer);
  return new Uint8Array(signature);
}

export function dynamicTruncate(hmacResult: Uint8Array): number {
  if (hmacResult.byteLength < 20) {
    throw new OtpError(`HMAC 结果过短: 长度为 ${hmacResult.byteLength} 字节，至少需 20 字节。`);
  }

  const view = new DataView(hmacResult.buffer, hmacResult.byteOffset, hmacResult.byteLength);
  const offset = view.getUint8(view.byteLength - 1) & 0x0f;
  const fourBytes = view.getUint32(offset, false);

  return fourBytes & 0x7fff_ffff;
}

export interface HotpParams {
  readonly secret: Bytes;
  readonly counter: number | bigint;
  readonly digits?: number;
  readonly algorithm?: HashAlgorithm;
}

export async function generateHotp({
  secret,
  counter,
  digits = 6,
  algorithm = 'SHA-1',
}: HotpParams): Promise<string> {
  assertDigits(digits);

  const counterBytes = counterToBytes(counter);
  const mac = await hmac(algorithm, secret, counterBytes);
  const truncated = dynamicTruncate(mac);

  return String(truncated % 10 ** digits).padStart(digits, '0');
}
