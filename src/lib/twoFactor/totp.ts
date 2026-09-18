import { generateHotp, OtpError, type HashAlgorithm } from './hotp';
import type { Bytes } from './bytes';

export const DEFAULT_ALGORITHM: HashAlgorithm = 'SHA-1';
export const DEFAULT_DIGITS = 6;
export const DEFAULT_PERIOD = 30;

export function timeCounter(unixSeconds: number, period: number = DEFAULT_PERIOD): number {
  assertPeriod(period);
  if (!Number.isFinite(unixSeconds)) {
    throw new OtpError(`无效的时间戳: ${unixSeconds}`);
  }
  if (unixSeconds < 0) {
    throw new OtpError('不支持早于 1970-01-01 的时间。');
  }
  return Math.floor(unixSeconds / period);
}

export function secondsUntilNextCode(unixSeconds: number, period: number = DEFAULT_PERIOD): number {
  assertPeriod(period);
  const elapsed = unixSeconds - timeCounter(unixSeconds, period) * period;
  return Math.ceil(period - elapsed) || period;
}

export function periodProgress(unixSeconds: number, period: number = DEFAULT_PERIOD): number {
  assertPeriod(period);
  const elapsed = unixSeconds - Math.floor(unixSeconds / period) * period;
  return elapsed / period;
}

export interface TotpParams {
  readonly secret: Bytes;
  readonly unixSeconds: number;
  readonly algorithm?: HashAlgorithm;
  readonly digits?: number;
  readonly period?: number;
}

export async function generateTotp({
  secret,
  unixSeconds,
  algorithm = DEFAULT_ALGORITHM,
  digits = DEFAULT_DIGITS,
  period = DEFAULT_PERIOD,
}: TotpParams): Promise<string> {
  return generateHotp({
    secret,
    counter: timeCounter(unixSeconds, period),
    algorithm,
    digits,
  });
}

export function assertPeriod(period: number): void {
  if (!Number.isInteger(period) || period <= 0) {
    throw new OtpError(`无效的周期时间: ${period}，必须为正整数。`);
  }
}
