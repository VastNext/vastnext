import type { Bytes } from './bytes';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const CHAR_TO_VALUE: ReadonlyMap<string, number> = new Map(
  [...ALPHABET].map((char, value) => [char, value]),
);

const IMPOSSIBLE_LENGTH_REMAINDERS: ReadonlySet<number> = new Set([1, 3, 6]);
const PADDING_CHAR_CODE = 61; // '='

export class Base32Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Base32Error';
  }
}

/**
 * 将 Base32 编码的字符串解码为字节数组 Uint8Array。
 * 兼容空格、破折号、大小写以及有无 '=' 填充。
 */
export function decodeBase32(input: string): Bytes {
  const cleaned = input.replace(/[\s-]+/g, '').toUpperCase();

  let end = cleaned.length;
  while (end > 0 && cleaned.charCodeAt(end - 1) === PADDING_CHAR_CODE) {
    end--;
  }
  const data = cleaned.slice(0, end);

  if (data.includes('=')) {
    throw new Base32Error('字符 "=" 只能出现在末尾作为填充。');
  }
  if (data.length === 0) {
    throw new Base32Error('密钥内容不能为空。');
  }

  for (let i = 0; i < data.length; i++) {
    const char = data.charAt(i);
    if (!CHAR_TO_VALUE.has(char)) {
      throw new Base32Error(
        `在第 ${i + 1} 位发现无效字符 "${char}"。Base32 仅支持 A-Z 和 2-7。`,
      );
    }
  }

  if (IMPOSSIBLE_LENGTH_REMAINDERS.has(data.length % 8)) {
    throw new Base32Error(
      `无效的 Base32 长度（${data.length} 个字符）。请检查是否有遗漏或多余字符。`,
    );
  }

  const bytes = new Uint8Array(Math.floor((data.length * 5) / 8));
  let bitBuffer = 0;
  let bitCount = 0;
  let byteIndex = 0;

  for (let i = 0; i < data.length; i++) {
    const value = CHAR_TO_VALUE.get(data.charAt(i)) ?? 0;
    bitBuffer = (bitBuffer << 5) | value;
    bitCount += 5;

    if (bitCount >= 8) {
      bitCount -= 8;
      bytes[byteIndex++] = (bitBuffer >>> bitCount) & 0xff;
    }
  }

  return bytes;
}

/**
 * 将字节数组编码为 Base32 字符串。
 */
export function encodeBase32(bytes: Uint8Array, options: { padding?: boolean } = {}): string {
  const { padding = true } = options;

  let output = '';
  let bitBuffer = 0;
  let bitCount = 0;

  for (const byte of bytes) {
    bitBuffer = (bitBuffer << 8) | byte;
    bitCount += 8;
    while (bitCount >= 5) {
      bitCount -= 5;
      output += ALPHABET.charAt((bitBuffer >>> bitCount) & 0b11111);
    }
  }

  if (bitCount > 0) {
    output += ALPHABET.charAt((bitBuffer << (5 - bitCount)) & 0b11111);
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += '=';
    }
  }

  return output;
}
