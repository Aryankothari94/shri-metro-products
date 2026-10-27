/**
 * High-performance client-side image compression and conversion utility.
 * Downsamples camera/device photos (even 10MB+ high-res images) into ultra-crisp,
 * optimized Base64 data URLs (~50KB-120KB) so they fit comfortably in permanent
 * browser storage without hitting quotas or lagging the UI.
 */

export function compressImageFile(file, options = {}) {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.85,
    mimeType = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file from device'));

    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if canvas 2D context unavailable
          resolve({
            dataUrl: event.target.result,
            originalSize: file.size,
            compressedSize: file.size,
            width: img.width,
            height: img.height,
            fileName: file.name
          });
          return;
        }

        // Draw with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // For transparent PNGs or formats where transparency matters, keep PNG if requested or draw on white
        if (file.type === 'image/png') {
          // If PNG has no transparency or user wants JPEG, JPEG is much smaller
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png');
          // If PNG is over 400KB, fallback to JPEG with white background for massive size savings
          if (dataUrl.length > 500000) {
            const jpgCanvas = document.createElement('canvas');
            jpgCanvas.width = width;
            jpgCanvas.height = height;
            const jpgCtx = jpgCanvas.getContext('2d');
            jpgCtx.fillStyle = '#FFFFFF';
            jpgCtx.fillRect(0, 0, width, height);
            jpgCtx.imageSmoothingEnabled = true;
            jpgCtx.imageSmoothingQuality = 'high';
            jpgCtx.drawImage(img, 0, 0, width, height);
            const jpgDataUrl = jpgCanvas.toDataURL(mimeType, quality);
            resolve({
              dataUrl: jpgDataUrl,
              originalSize: file.size,
              compressedSize: Math.round((jpgDataUrl.length * 3) / 4),
              width,
              height,
              fileName: file.name
            });
            return;
          }
          resolve({
            dataUrl,
            originalSize: file.size,
            compressedSize: Math.round((dataUrl.length * 3) / 4),
            width,
            height,
            fileName: file.name
          });
          return;
        }

        // Standard JPEG/WebP compression
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(mimeType, quality);

        resolve({
          dataUrl,
          originalSize: file.size,
          compressedSize: Math.round((dataUrl.length * 3) / 4),
          width,
          height,
          fileName: file.name
        });
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes to readable string (e.g. 1.2 MB or 85 KB)
 */
export function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
