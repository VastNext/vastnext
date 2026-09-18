import jsQR from 'jsqr';

interface BarcodeDetectorLike {
  detect(source: ImageBitmapSource): Promise<{ rawValue: string }[]>;
}

interface BarcodeDetectorConstructor {
  new (options?: { formats?: string[] }): BarcodeDetectorLike;
}

let nativeDetector: BarcodeDetectorLike | null | undefined;

function getNativeDetector(): BarcodeDetectorLike | null {
  if (nativeDetector !== undefined) {
    return nativeDetector;
  }
  const constructor = (globalThis as unknown as { BarcodeDetector?: BarcodeDetectorConstructor })
    .BarcodeDetector;
  try {
    nativeDetector = constructor ? new constructor({ formats: ['qr_code'] }) : null;
  } catch {
    nativeDetector = null;
  }
  return nativeDetector;
}

/**
 * 从 ImageBitmap 或 HTMLVideoElement / Canvas 中解析 QR 码
 */
export async function decodeQr(source: ImageBitmap | HTMLVideoElement): Promise<string | null> {
  const detector = getNativeDetector();
  if (detector) {
    try {
      const results = await detector.detect(source);
      if (results && results.length > 0 && results[0]?.rawValue) {
        return results[0].rawValue;
      }
      return null;
    } catch {
      nativeDetector = null;
    }
  }

  return decodeWithJsQr(source);
}

/**
 * 从 Blob / File（例如剪贴板图片、拖放图片、文件上传）中解码 QR 码
 */
export async function decodeQrFromBlob(blob: Blob): Promise<string | null> {
  const bitmap = await createImageBitmap(blob);
  try {
    return await decodeQr(bitmap);
  } finally {
    bitmap.close();
  }
}

function decodeWithJsQr(source: ImageBitmap | HTMLVideoElement): string | null {
  const width = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
  const height = source instanceof HTMLVideoElement ? source.videoHeight : source.height;
  if (width === 0 || height === 0) {
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return null;
  }

  context.drawImage(source, 0, 0, width, height);
  const image = context.getImageData(0, 0, width, height);

  const found = jsQR(image.data, image.width, image.height, {
    inversionAttempts: 'attemptBoth',
  });

  return found?.data ?? null;
}
