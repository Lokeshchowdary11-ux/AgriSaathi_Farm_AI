export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  outputFormat?: "image/jpeg" | "image/webp";
}

export interface CompressionResult {
  compressedBase64: string;
  originalSize: number;
  compressedSize: number;
  originalSizeFormatted: string;
  compressedSizeFormatted: string;
  bandwidthSavedPercent: number;
  width: number;
  height: number;
  compressionTimeMs: number;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.75,
    outputFormat = "image/jpeg",
  } = options;

  const startTime = performance.now();
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = (err) => reject(err);

    reader.onload = (event) => {
      const img = new Image();

      img.onerror = (err) => reject(err);

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaling maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D canvas context"));
          return;
        }

        // Fill white background for JPEGs (handles transparent PNGs nicely)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

        // Draw image resized
        ctx.drawImage(img, 0, 0, width, height);

        // Export compressed base64
        const compressedBase64 = canvas.toDataURL(outputFormat, quality);

        // Calculate compressed size in bytes from base64 length
        // Base64 header length approx ~22 chars ("data:image/jpeg;base64,")
        const base64Data = compressedBase64.split(",")[1] || "";
        const compressedSize = Math.round((base64Data.length * 3) / 4);

        const savedPercent =
          originalSize > 0
            ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
            : 0;

        const endTime = performance.now();

        resolve({
          compressedBase64,
          originalSize,
          compressedSize,
          originalSizeFormatted: formatBytes(originalSize),
          compressedSizeFormatted: formatBytes(compressedSize),
          bandwidthSavedPercent: savedPercent,
          width,
          height,
          compressionTimeMs: Math.round(endTime - startTime),
        });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
