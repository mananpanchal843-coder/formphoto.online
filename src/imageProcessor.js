/**
 * Client-side image processing helpers.
 * Nothing is uploaded: files are decoded and rendered in the user's browser.
 */

export const loadImage = (source) => new Promise((resolve, reject) => {
  const img = new Image();
  let objectUrl = null;

  if (source instanceof Blob) {
    objectUrl = URL.createObjectURL(source);
    img.src = objectUrl;
  } else if (typeof source === 'string') {
    img.src = source;
  } else {
    reject(new Error('Invalid image source.'));
    return;
  }

  img.onload = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    resolve(img);
  };
  img.onerror = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    reject(new Error('This image could not be decoded. Please use a valid JPG, JPEG, PNG, or WebP image.'));
  };
});

export const canvasToBlob = (canvas, mimeType = 'image/jpeg', quality = 0.92) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (blob && blob.size > 0) resolve(blob);
    else reject(new Error('The browser could not create the processed image. Try a different image or format.'));
  }, mimeType, quality);
});

const normalizeMimeType = (format = 'jpeg') => {
  if (format === 'png' || format === 'image/png') return 'image/png';
  if (format === 'webp' || format === 'image/webp') return 'image/webp';
  return 'image/jpeg';
};

/** Resize to exact pixel dimensions. */
export const resizeImage = async (file, targetWidth, targetHeight, options = {}) => {
  // Backward-compatible support for the old resizeImage(file, options) call.
  if (typeof targetWidth === 'object') {
    options = targetWidth || {};
    targetWidth = options.width;
    targetHeight = options.height;
  }

  const img = await loadImage(file);
  const width = Math.max(1, Math.round(Number(targetWidth) || img.naturalWidth || img.width));
  const height = Math.max(1, Math.round(Number(targetHeight) || img.naturalHeight || img.height));
  const mimeType = normalizeMimeType(options.format);
  const quality = Number.isFinite(options.quality) ? Math.min(1, Math.max(0.05, options.quality)) : 0.92;
  const bgColor = options.bgColor ?? '#ffffff';

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: mimeType !== 'image/jpeg' });
  if (!ctx) throw new Error('Your browser does not support canvas image processing.');

  if (mimeType === 'image/jpeg' && bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, mimeType, quality);
  return {
    blob,
    dataUrl: canvas.toDataURL(mimeType, quality),
    width,
    height,
    size: blob.size / 1024,
    mimeType,
  };
};

/**
 * Compress an image to a target KB without producing a corrupt/empty file.
 * JPEG quality is binary-searched. If the target is very small, dimensions are
 * reduced progressively so the requested size remains achievable.
 */
export const compressToExactKB = async (file, targetKB, toleranceKB = 1) => {
  if (!(file instanceof Blob)) throw new Error('Please select an image first.');

  const target = Math.max(1, Number(targetKB) || 1);
  const tolerance = Math.max(0, Number(toleranceKB) || 0);
  const img = await loadImage(file);
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  if (!width || !height) throw new Error('Could not read the image dimensions.');

  let best = null;
  const maxDimensionPasses = 12;

  for (let pass = 0; pass < maxDimensionPasses; pass += 1) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Your browser does not support canvas image processing.');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Find the largest quality that fits at/below target.
    let low = 0.05;
    let high = 1;
    let fitting = null;
    let closestOverall = null;

    for (let i = 0; i < 24; i += 1) {
      const quality = (low + high) / 2;
      const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
      const sizeKB = blob.size / 1024;
      const candidate = { blob, sizeKB, quality, width: canvas.width, height: canvas.height };

      if (!closestOverall || Math.abs(sizeKB - target) < Math.abs(closestOverall.sizeKB - target)) {
        closestOverall = candidate;
      }

      if (sizeKB <= target) {
        fitting = candidate;
        low = quality;
      } else {
        high = quality;
      }
    }

    const candidate = fitting || closestOverall;
    if (candidate && (!best || Math.abs(candidate.sizeKB - target) < Math.abs(best.sizeKB - target))) {
      best = candidate;
    }

    if (candidate && candidate.sizeKB <= target + tolerance) {
      const dataUrl = await blobToDataUrl(candidate.blob);
      return {
        blob: candidate.blob,
        dataUrl,
        size: candidate.sizeKB,
        quality: candidate.quality,
        iterations: 24 * (pass + 1),
        width: candidate.width,
        height: candidate.height,
      };
    }

    // The minimum quality still cannot reach the target; reduce dimensions.
    if (candidate && candidate.sizeKB > target) {
      const ratio = Math.sqrt(Math.max(target, 1) / candidate.sizeKB) * 0.92;
      const nextWidth = Math.floor(width * Math.min(0.9, ratio));
      const nextHeight = Math.floor(height * Math.min(0.9, ratio));
      if (nextWidth >= width && nextHeight >= height) break;
      width = Math.max(32, nextWidth);
      height = Math.max(32, nextHeight);
    } else {
      break;
    }
  }

  if (!best) throw new Error('Compression failed. Please try another image.');
  const dataUrl = await blobToDataUrl(best.blob);
  return {
    blob: best.blob,
    dataUrl,
    size: best.sizeKB,
    quality: best.quality,
    iterations: maxDimensionPasses * 24,
    width: best.width,
    height: best.height,
  };
};

export const resizeAndCompress = async (file, targetWidth, targetHeight, targetKB, toleranceKB = 1) => {
  const resized = await resizeImage(file, targetWidth, targetHeight, {
    format: 'jpeg',
    quality: 1,
    bgColor: '#ffffff',
  });
  return compressToExactKB(resized.blob, targetKB, toleranceKB);
};

export const getImageDimensions = async (source) => {
  const img = await loadImage(source);
  const size = source instanceof Blob ? source.size / 1024 : 0;
  return {
    width: img.naturalWidth || img.width,
    height: img.naturalHeight || img.height,
    size,
  };
};

export const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Could not prepare the image for preview.'));
  reader.readAsDataURL(blob);
});

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Remove near-white (or near-target-color) background by making matching pixels transparent.
 * Ideal for form photos and signatures shot on white/light backgrounds.
 * @param {Blob|File} file
 * @param {object} options - { tolerance: 0-255 (default 30), targetColor: [r,g,b] (default [255,255,255]), feather: 0-20 }
 */
/**
 * Powerful background remover (100% client-side).
 * Modes:
 *  - color: chroma-key style (match target color by Euclidean distance)
 *  - flood: flood-fill from image edges (best for solid studio / white paper backgrounds)
 *  - auto: sample corners to detect dominant BG then flood
 * Options: tolerance, feather, targetColor [r,g,b], despeckle, protectDark (keep dark ink)
 */
export const removeBackground = async (file, options = {}) => {
  const tolerance = Math.max(0, Math.min(255, Number(options.tolerance) ?? 35));
  let target = options.targetColor || [255, 255, 255];
  const feather = Math.max(0, Math.min(50, Number(options.feather) ?? 10));
  const mode = options.mode || 'color'; // color | flood | auto
  const despeckle = options.despeckle !== false;
  const protectDark = options.protectDark === true;
  const darkThreshold = Number(options.darkThreshold) || 90;

  const img = await loadImage(file);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas not supported.');

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const n = width * height;

  // Sample corner colors for auto mode
  const sampleCorner = (x, y) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  };
  if (mode === 'auto') {
    const corners = [
      sampleCorner(0, 0),
      sampleCorner(width - 1, 0),
      sampleCorner(0, height - 1),
      sampleCorner(width - 1, height - 1),
      sampleCorner(Math.floor(width / 2), 0),
      sampleCorner(Math.floor(width / 2), height - 1),
    ];
    // Average of corners
    target = corners
      .reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0])
      .map((v) => Math.round(v / corners.length));
  }

  const tr = target[0];
  const tg = target[1];
  const tb = target[2];
  const maxDist = tolerance + feather;
  const distFn = (r, g, b) =>
    Math.sqrt((r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2);

  const isBg = (r, g, b) => distFn(r, g, b) <= tolerance;
  const isProtected = (r, g, b) =>
    protectDark && (r + g + b) / 3 < darkThreshold;

  if (mode === 'flood' || mode === 'auto') {
    // Flood-fill from edges: mark connected background pixels
    const visited = new Uint8Array(n);
    const queue = [];
    const pushIfBg = (x, y) => {
      if (x < 0 || y < 0 || x >= width || y >= height) return;
      const idx = y * width + x;
      if (visited[idx]) return;
      const i = idx * 4;
      if (isProtected(data[i], data[i + 1], data[i + 2])) return;
      if (!isBg(data[i], data[i + 1], data[i + 2])) return;
      visited[idx] = 1;
      queue.push(idx);
    };

    // Seed from all edge pixels
    for (let x = 0; x < width; x++) {
      pushIfBg(x, 0);
      pushIfBg(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      pushIfBg(0, y);
      pushIfBg(width - 1, y);
    }

    // BFS flood
    while (queue.length) {
      const idx = queue.pop();
      const x = idx % width;
      const y = (idx / width) | 0;
      pushIfBg(x + 1, y);
      pushIfBg(x - 1, y);
      pushIfBg(x, y + 1);
      pushIfBg(x, y - 1);
    }

    // Apply transparency + feather on flood mask
    for (let idx = 0; idx < n; idx++) {
      const i = idx * 4;
      if (visited[idx]) {
        data[i + 3] = 0;
        continue;
      }
      // Soft edge: check distance for near-bg pixels adjacent to mask
      if (feather > 0) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (isProtected(r, g, b)) continue;
        const dist = distFn(r, g, b);
        if (dist < maxDist) {
          // Only feather if near a visited (bg) pixel
          const x = idx % width;
          const y = (idx / width) | 0;
          let nearBg = false;
          for (let dy = -2; dy <= 2 && !nearBg; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                if (visited[ny * width + nx]) nearBg = true;
              }
            }
          }
          if (nearBg) {
            const alpha = Math.round(255 * ((dist - tolerance) / feather));
            data[i + 3] = Math.min(data[i + 3], Math.max(0, alpha));
          }
        }
      }
    }
  } else {
    // Classic color-key
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isProtected(r, g, b)) continue;
      const dist = distFn(r, g, b);
      if (dist <= tolerance) {
        data[i + 3] = 0;
      } else if (dist < maxDist && feather > 0) {
        const alpha = Math.round(255 * ((dist - tolerance) / feather));
        data[i + 3] = Math.min(data[i + 3], alpha);
      }
    }
  }

  // Optional light despeckle: remove tiny transparent holes inside subject & isolated bg pixels
  if (despeckle && width > 20 && height > 20) {
    const alphaCopy = new Uint8Array(n);
    for (let idx = 0; idx < n; idx++) alphaCopy[idx] = data[idx * 4 + 3];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        let opaqueNeighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            if (alphaCopy[(y + dy) * width + (x + dx)] > 128) opaqueNeighbors++;
          }
        }
        // Fill tiny transparent holes
        if (alphaCopy[idx] < 64 && opaqueNeighbors >= 6) {
          data[idx * 4 + 3] = 255;
        }
        // Remove isolated background specks
        if (alphaCopy[idx] > 200 && opaqueNeighbors <= 1) {
          data[idx * 4 + 3] = 0;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const blob = await canvasToBlob(canvas, 'image/png', 1);
  return {
    blob,
    dataUrl: canvas.toDataURL('image/png'),
    width,
    height,
    size: blob.size / 1024,
    mimeType: 'image/png',
    detectedBg: target,
  };
};

/* ═══════════════════════════════════════════════════════════
   Smart / AI-assisted corrections (100% in-browser)
   ═══════════════════════════════════════════════════════════ */

/** Draw image into canvas covering target size (center-crop). */
const drawCover = (ctx, img, tw, th) => {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(tw / iw, th / ih);
  const sw = tw / scale;
  const sh = th / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, tw, th);
};

/** Draw image containing fully inside target (letterbox with bg). */
const drawContain = (ctx, img, tw, th, bgColor) => {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.min(tw / iw, th / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (tw - dw) / 2;
  const dy = (th - dh) / 2;
  if (bgColor && bgColor !== 'transparent') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, tw, th);
  }
  ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
};

/**
 * Auto brightness / contrast from image histogram (gentle correction).
 */
export const autoEnhance = async (file, options = {}) => {
  const strength = Math.min(1, Math.max(0, options.strength ?? 0.55));
  const img = await loadImage(file);
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  // Luminance histogram
  const hist = new Array(256).fill(0);
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 16) continue;
    const y = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    hist[y] += 1;
    count += 1;
  }
  if (count < 10) {
    const blob = await canvasToBlob(canvas, 'image/png', 1);
    return { blob, width: w, height: h, size: blob.size / 1024 };
  }

  // Percentile stretch (ignore extreme 2%)
  const lowCount = count * 0.02;
  const highCount = count * 0.98;
  let cum = 0;
  let low = 0;
  let high = 255;
  for (let i = 0; i < 256; i += 1) {
    cum += hist[i];
    if (cum >= lowCount && low === 0) low = i;
    if (cum >= highCount) {
      high = i;
      break;
    }
  }
  if (high <= low + 8) {
    const blob = await canvasToBlob(canvas, 'image/png', 1);
    return { blob, width: w, height: h, size: blob.size / 1024 };
  }

  const range = high - low;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 8) continue;
    for (let c = 0; c < 3; c += 1) {
      const v = data[i + c];
      const stretched = ((v - low) / range) * 255;
      data[i + c] = Math.round(v * (1 - strength) + stretched * strength);
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const blob = await canvasToBlob(canvas, 'image/png', 1);
  return { blob, width: w, height: h, size: blob.size / 1024, mimeType: 'image/png' };
};

/**
 * Detect approximate subject region using skin-tone + center bias,
 * then crop to target aspect ratio.
 */
export const smartCropToAspect = async (file, targetW, targetH, options = {}) => {
  const img = await loadImage(file);
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const targetAspect = targetW / targetH;

  // Downsample for analysis
  const aw = Math.min(160, iw);
  const ah = Math.round((ih / iw) * aw);
  const ac = document.createElement('canvas');
  ac.width = aw;
  ac.height = ah;
  const actx = ac.getContext('2d', { willReadFrequently: true });
  actx.drawImage(img, 0, 0, aw, ah);
  const { data } = actx.getImageData(0, 0, aw, ah);

  let sumX = 0;
  let sumY = 0;
  let weightSum = 0;
  const cx = aw / 2;
  const cy = ah / 2;

  for (let y = 0; y < ah; y += 1) {
    for (let x = 0; x < aw; x += 1) {
      const i = (y * aw + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Simple skin-tone heuristic (works for many portrait photos)
      const isSkin =
        r > 60 &&
        g > 30 &&
        b > 15 &&
        r > g &&
        r > b &&
        r - g > 10 &&
        Math.abs(r - g) > b * 0.1;
      const dx = (x - cx) / aw;
      const dy = (y - cy) / ah;
      const centerBias = 1 - Math.min(1, Math.sqrt(dx * dx + dy * dy) * 1.4);
      const wgt = (isSkin ? 4 : 0.35) * (0.4 + centerBias);
      sumX += x * wgt;
      sumY += y * wgt;
      weightSum += wgt;
    }
  }

  const focusX = weightSum > 0 ? sumX / weightSum / aw : 0.5;
  const focusY = weightSum > 0 ? sumY / weightSum / ah : 0.4; // slightly above center for faces

  // Crop window in original coords
  let cropW;
  let cropH;
  if (iw / ih > targetAspect) {
    cropH = ih;
    cropW = ih * targetAspect;
  } else {
    cropW = iw;
    cropH = iw / targetAspect;
  }
  let sx = focusX * iw - cropW / 2;
  let sy = focusY * ih - cropH / 2;
  sx = Math.max(0, Math.min(iw - cropW, sx));
  sy = Math.max(0, Math.min(ih - cropH, sy));

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  const bg = options.bgColor ?? '#ffffff';
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, targetW, targetH);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, sx, sy, cropW, cropH, 0, 0, targetW, targetH);

  const mime = normalizeMimeType(options.format || 'jpeg');
  const quality = options.quality ?? 0.92;
  const blob = await canvasToBlob(canvas, mime, quality);
  return {
    blob,
    width: targetW,
    height: targetH,
    size: blob.size / 1024,
    mimeType: mime,
    crop: { sx, sy, cropW, cropH },
  };
};

/**
 * Replace near-white (or light) background with pure solid color.
 */
export const forceSolidBackground = async (file, bgColor = '#ffffff', options = {}) => {
  const tolerance = options.tolerance ?? 42;
  const img = await loadImage(file);
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const hex = bgColor.replace('#', '');
  const br = parseInt(hex.substring(0, 2), 16) || 255;
  const bg = parseInt(hex.substring(2, 4), 16) || 255;
  const bb = parseInt(hex.substring(4, 6), 16) || 255;

  // Sample corners to detect background tone
  const samples = [
    [2, 2],
    [w - 3, 2],
    [2, h - 3],
    [w - 3, h - 3],
    [w / 2, 2],
    [2, h / 2],
  ];
  let sr = 0;
  let sg = 0;
  let sb = 0;
  let n = 0;
  for (const [x, y] of samples) {
    const i = (Math.floor(y) * w + Math.floor(x)) * 4;
    sr += data[i];
    sg += data[i + 1];
    sb += data[i + 2];
    n += 1;
  }
  sr /= n;
  sg /= n;
  sb /= n;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dist = Math.sqrt((r - sr) ** 2 + (g - sg) ** 2 + (b - sb) ** 2);
    // Also treat very bright pixels as background
    const bright = (r + g + b) / 3;
    if (dist < tolerance || bright > 245) {
      data[i] = br;
      data[i + 1] = bg;
      data[i + 2] = bb;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const blob = await canvasToBlob(canvas, 'image/png', 1);
  return { blob, width: w, height: h, size: blob.size / 1024, mimeType: 'image/png' };
};

/**
 * Clean signature: grayscale → adaptive threshold → crop to ink → optional resize.
 */
export const cleanupSignature = async (file, options = {}) => {
  const threshold = options.threshold ?? 160;
  const img = await loadImage(file);
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  let inkPixels = 0;

  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = (y * w + x) * 4;
      const yv = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const isInk = yv < threshold && data[i + 3] > 40;
      if (isInk) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
        inkPixels += 1;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      } else {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Crop with padding if ink found
  let outCanvas = canvas;
  if (inkPixels > 20 && maxX > minX && maxY > minY) {
    const pad = Math.max(4, Math.round(Math.min(w, h) * 0.04));
    const sx = Math.max(0, minX - pad);
    const sy = Math.max(0, minY - pad);
    const sw = Math.min(w - sx, maxX - minX + 1 + pad * 2);
    const sh = Math.min(h - sy, maxY - minY + 1 + pad * 2);
    const cropped = document.createElement('canvas');
    cropped.width = sw;
    cropped.height = sh;
    const cctx = cropped.getContext('2d');
    cctx.fillStyle = '#ffffff';
    cctx.fillRect(0, 0, sw, sh);
    cctx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);
    outCanvas = cropped;
  }

  // Optional target size with contain
  const tw = options.width;
  const th = options.height;
  if (tw && th) {
    const finalC = document.createElement('canvas');
    finalC.width = tw;
    finalC.height = th;
    const fctx = finalC.getContext('2d');
    fctx.fillStyle = '#ffffff';
    fctx.fillRect(0, 0, tw, th);
    fctx.imageSmoothingEnabled = true;
    fctx.imageSmoothingQuality = 'high';
    const src = outCanvas;
    const scale = Math.min(tw / src.width, th / src.height) * 0.92;
    const dw = src.width * scale;
    const dh = src.height * scale;
    fctx.drawImage(src, (tw - dw) / 2, (th - dh) / 2, dw, dh);
    outCanvas = finalC;
  }

  const blob = await canvasToBlob(outCanvas, 'image/jpeg', 0.95);
  return {
    blob,
    width: outCanvas.width,
    height: outCanvas.height,
    size: blob.size / 1024,
    mimeType: 'image/jpeg',
    inkPixels,
  };
};

/**
 * Full smart pipeline for form photos.
 * enhance → solid white bg → smart crop/resize → compress to max KB
 */
export const smartFixPhoto = async (file, presetOrOptions = {}) => {
  const opts =
    presetOrOptions?.photo
      ? {
          width: presetOrOptions.photo.width,
          height: presetOrOptions.photo.height,
          maxSize: presetOrOptions.photo.maxSize,
          bgColor: presetOrOptions.photo.bgColor || '#ffffff',
          format: presetOrOptions.photo.format || 'jpeg',
        }
      : presetOrOptions;

  const width = Math.max(1, Math.round(Number(opts.width) || 350));
  const height = Math.max(1, Math.round(Number(opts.height) || 350));
  const maxSize = Math.max(5, Number(opts.maxSize) || 100);
  const bgColor = opts.bgColor || '#ffffff';
  const steps = [];

  // 1. Enhance lighting
  let current = file;
  try {
    const enhanced = await autoEnhance(current, { strength: 0.5 });
    current = enhanced.blob;
    steps.push('Auto-enhanced brightness & contrast');
  } catch {
    steps.push('Enhance skipped');
  }

  // 2. Force solid background
  try {
    const bgFixed = await forceSolidBackground(current, bgColor, { tolerance: 48 });
    current = bgFixed.blob;
    steps.push('Background cleaned to solid white');
  } catch {
    steps.push('Background cleanup skipped');
  }

  // 3. Smart crop + resize to exact pixels
  const cropped = await smartCropToAspect(current, width, height, {
    bgColor,
    format: 'jpeg',
    quality: 0.95,
  });
  current = cropped.blob;
  steps.push(`Resized to ${width}×${height} px (smart crop)`);

  // 4. Compress under max KB
  const compressed = await compressToExactKB(current, maxSize, 1.5);
  steps.push(`Compressed to ~${compressed.size.toFixed(1)} KB (limit ${maxSize} KB)`);

  return {
    blob: compressed.blob,
    dataUrl: compressed.dataUrl,
    width: compressed.width || width,
    height: compressed.height || height,
    size: compressed.size,
    mimeType: 'image/jpeg',
    steps,
    quality: compressed.quality,
  };
};

/**
 * Full smart pipeline for signatures.
 */
export const smartFixSignature = async (file, presetOrOptions = {}) => {
  const opts =
    presetOrOptions?.signature
      ? {
          width: presetOrOptions.signature.width,
          height: presetOrOptions.signature.height,
          maxSize: presetOrOptions.signature.maxSize,
        }
      : presetOrOptions;

  const width = Math.max(1, Math.round(Number(opts.width) || 140));
  const height = Math.max(1, Math.round(Number(opts.height) || 60));
  const maxSize = Math.max(5, Number(opts.maxSize) || 20);
  const steps = [];

  const cleaned = await cleanupSignature(file, { width, height, threshold: 165 });
  steps.push('Cleaned ink, removed noise, white background');
  steps.push(`Fitted to ${width}×${height} px`);

  const compressed = await compressToExactKB(cleaned.blob, maxSize, 1);
  steps.push(`Compressed to ~${compressed.size.toFixed(1)} KB (limit ${maxSize} KB)`);

  return {
    blob: compressed.blob,
    dataUrl: compressed.dataUrl,
    width: compressed.width || width,
    height: compressed.height || height,
    size: compressed.size,
    mimeType: 'image/jpeg',
    steps,
  };
};

/**
 * Resize with cover (crop) or contain (pad) mode — better than stretch.
 */
export const resizeImageSmart = async (file, targetWidth, targetHeight, options = {}) => {
  const mode = options.mode || 'cover'; // cover | contain | stretch
  if (mode === 'stretch') {
    return resizeImage(file, targetWidth, targetHeight, options);
  }
  const img = await loadImage(file);
  const width = Math.max(1, Math.round(Number(targetWidth)));
  const height = Math.max(1, Math.round(Number(targetHeight)));
  const mimeType = normalizeMimeType(options.format);
  const quality = Number.isFinite(options.quality) ? options.quality : 0.92;
  const bgColor = options.bgColor ?? '#ffffff';

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: mimeType !== 'image/jpeg' });
  if (!ctx) throw new Error('Canvas not supported.');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (mode === 'contain') {
    drawContain(ctx, img, width, height, bgColor);
  } else {
    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }
    drawCover(ctx, img, width, height);
  }

  const blob = await canvasToBlob(canvas, mimeType, quality);
  return {
    blob,
    dataUrl: canvas.toDataURL(mimeType, quality),
    width,
    height,
    size: blob.size / 1024,
    mimeType,
  };
};
