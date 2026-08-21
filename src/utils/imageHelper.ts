/**
 * Formats image URLs so that common cloud-drive / sharing links (Google Drive, Dropbox, etc.)
 * are converted into direct raw image URLs that browsers can render.
 */
export function formatImageUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const url = rawUrl.trim();
  if (!url) return '';

  // Data URLs (base64) or blob URLs
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  // Google Drive links:
  // e.g. https://drive.google.com/file/d/1A2B3C4D.../view?usp=sharing
  // or https://drive.google.com/open?id=1A2B3C4D...
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // Dropbox links:
  // e.g. https://www.dropbox.com/s/xyz/photo.jpg?dl=0
  if (url.includes('dropbox.com')) {
    return url.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
  }

  // OneDrive links:
  if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
    // If it has embed parameter or download
    if (!url.includes('download=1') && !url.includes('authkey=')) {
      return url;
    }
  }

  // Imgur page link to direct image:
  // e.g. https://imgur.com/abc1234 -> https://i.imgur.com/abc1234.jpg
  if (url.startsWith('https://imgur.com/') && !url.includes('/a/') && !url.includes('/gallery/')) {
    const id = url.replace('https://imgur.com/', '').split('?')[0];
    if (id && !id.includes('.')) {
      return `https://i.imgur.com/${id}.jpg`;
    }
  }

  return url;
}

/**
 * Compresses an uploaded image file on the client using HTML Canvas.
 * Ensures the image fits easily into localStorage (<400KB) and renders smoothly.
 */
export function compressImageFile(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let { width, height } = img;

        // Calculate proportional scale
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if 2D context fails
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as optimized JPEG
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
