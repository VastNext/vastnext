import { describe, expect, it } from 'vitest';
import { decodeBase32, encodeBase32 } from './base32';
import { generateHotp } from './hotp';
import { generateTotp, timeCounter, secondsUntilNextCode, periodProgress } from './totp';
import { parseOtpauthUri, parseInputToAccount, formatOtpCode } from './otpauth';

describe('2FA Core Engine (RFC Compliance)', () => {
  describe('Base32 RFC 4648', () => {
    it('对标准测试向量正确编解码', () => {
      const textEncoder = new TextEncoder();
      const textDecoder = new TextDecoder();

      const vectors = [
        ['', ''],
        ['f', 'MY======'],
        ['fo', 'MZXQ===='],
        ['foo', 'MZXW6==='],
        ['foob', 'MZXW6YQ='],
        ['fooba', 'MZXW6YTB'],
        ['foobar', 'MZXW6YTBOI======'],
      ];

      for (const [plain, encoded] of vectors) {
        const bytes = textEncoder.encode(plain);
        if (plain.length > 0) {
          expect(encodeBase32(bytes)).toBe(encoded);
          const decoded = decodeBase32(encoded);
          expect(textDecoder.decode(decoded)).toBe(plain);
        }
      }
    });

    it('容忍小写字母、空格与连字符', () => {
      const decoded1 = decodeBase32('gezd gnbv-gy3t qojq');
      const decoded2 = decodeBase32('GEZDGNBVGY3TQOJQ');
      expect(decoded1).toEqual(decoded2);
    });
  });

  describe('HOTP RFC 4226 官方测试向量', () => {
    // RFC 4226 Appendix D 密钥: '12345678901234567890' (20 字节)
    // Base32: GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ
    const secret = decodeBase32('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');
    const expectedCodes = [
      '755224',
      '287082',
      '359152',
      '969429',
      '338314',
      '254676',
      '287922',
      '162583',
      '399871',
      '520489',
    ];

    it.each(expectedCodes.map((code, counter) => [counter, code]))(
      '计数器 %d 生成代码 %s',
      async (counter, expected) => {
        const code = await generateHotp({ secret, counter, digits: 6, algorithm: 'SHA-1' });
        expect(code).toBe(expected);
      },
    );
  });

  describe('TOTP RFC 6238 官方测试向量', () => {
    // RFC 6238 Appendix B 测试
    // Seed for HMAC-SHA-1: 20 bytes "12345678901234567890" (GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ)
    const secretSha1 = decodeBase32('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');

    const testTimes = [
      { time: 59, expected: '287082' },
      { time: 1111111109, expected: '081804' },
      { time: 1111111111, expected: '050471' },
      { time: 1234567890, expected: '005924' },
      { time: 2000000000, expected: '279037' },
    ];

    it.each(testTimes)('SHA-1 时间戳 $time 产生 $expected', async ({ time, expected }) => {
      const code = await generateTotp({
        secret: secretSha1,
        unixSeconds: time,
        algorithm: 'SHA-1',
        digits: 6,
        period: 30,
      });
      expect(code).toBe(expected);
    });

    it('计算周期倒计时与进度', () => {
      expect(timeCounter(0, 30)).toBe(0);
      expect(timeCounter(29, 30)).toBe(0);
      expect(timeCounter(30, 30)).toBe(1);

      expect(secondsUntilNextCode(0, 30)).toBe(30);
      expect(secondsUntilNextCode(10, 30)).toBe(20);
      expect(secondsUntilNextCode(29, 30)).toBe(1);

      expect(periodProgress(0, 30)).toBe(0);
      expect(periodProgress(15, 30)).toBe(0.5);
    });
  });

  describe('otpauth:// 解析与格式化', () => {
    it('正确解析标准 otpauth URI', () => {
      const uri = 'otpauth://totp/GitHub:octocat?secret=JBSWY3DPEHPK3PXP&issuer=GitHub';
      const parsed = parseOtpauthUri(uri);
      expect(parsed.secret).toBe('JBSWY3DPEHPK3PXP');
      expect(parsed.issuer).toBe('GitHub');
      expect(parsed.accountName).toBe('octocat');
      expect(parsed.algorithm).toBe('SHA-1');
      expect(parsed.digits).toBe(6);
      expect(parsed.period).toBe(30);
    });

    it('正确解析带有自定义参数的 otpauth URI', () => {
      const uri = 'otpauth://totp/AWS:admin@123456?secret=JBSWY3DPEHPK3PXP&issuer=AWS&digits=8&period=60&algorithm=SHA256';
      const parsed = parseOtpauthUri(uri);
      expect(parsed.secret).toBe('JBSWY3DPEHPK3PXP');
      expect(parsed.issuer).toBe('AWS');
      expect(parsed.accountName).toBe('admin@123456');
      expect(parsed.algorithm).toBe('SHA-256');
      expect(parsed.digits).toBe(8);
      expect(parsed.period).toBe(60);
    });

    it('通过 parseInputToAccount 解析用户输入的 Base32 密钥或带前缀文本', () => {
      const account1 = parseInputToAccount('JDU5RLZDW7LENCLQ7PCB3QJEUA4HOAZ6');
      expect(account1.rawSecret).toBe('JDU5RLZDW7LENCLQ7PCB3QJEUA4HOAZ6');
      expect(account1.issuer).toBeUndefined();

      const account2 = parseInputToAccount('Google: JDU5RLZDW7LENCLQ7PCB3QJEUA4HOAZ6');
      expect(account2.issuer).toBe('Google');
      expect(account2.rawSecret).toBe('JDU5RLZDW7LENCLQ7PCB3QJEUA4HOAZ6');
    });

    it('格式化 6 位和 8 位验证码', () => {
      expect(formatOtpCode('123456')).toBe('123 456');
      expect(formatOtpCode('12345678')).toBe('1234 5678');
    });
  });
});
