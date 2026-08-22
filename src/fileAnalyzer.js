/**
 * Deterministic file analyzer + validation engine.
 * AI-style quality checks are heuristic only — never claimed as official pass.
 */

import { loadImage, getImageDimensions } from '../imageProcessor';

const EXT_MAP = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/jpg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'application/pdf': ['pdf'],
};

export const getExtension = (filename = '') => {
  const parts = filename.toLowerCase().split('.');
  return parts.length > 1 ? parts.pop() : '';
};

export const analyzeImageFile = async (file) => {
  if (!(file instanceof Blob)) throw new Error('Invalid file');

  const sizeKb = file.size / 1024;
  const mime = file.type || '';
  const ext = getExtension(file.name || '');

  // Corrupt / undecodable detection
  let width = 0;
  let height = 0;
  let readable = true;
  let brightness = null;
  let darkWarning = false;
  let brightWarning = false;
  let blurHint = false;

  try {
    const dims = await getImageDimensions(file);
    width = dims.width;
    height = dims.height;

    // Lightweight quality sample
    const img = await loadImage(file);
    const sample = document.createElement('canvas');
    const sw = Math.min(64, width);
    const sh = Math.round((height / width) * sw) || 1;
    sample.width = sw;
    sample.height = sh;
    const ctx = sample.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, sw, sh);
    const data = ctx.getImageData(0, 0, sw, sh).data;
    let sum = 0;
    let edge = 0;
    for (let i = 0; i < data.length; i += 4) {
      const y = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      sum += y;
    }
    brightness = sum / (data.length / 4);
    darkWarning = brightness < 45;
    brightWarning = brightness > 230;

    // crude sharpness: neighbour difference
    for (let y = 0; y < sh - 1; y += 1) {
      for (let x = 0; x < sw - 1; x += 1) {
        const i = (y * sw + x) * 4;
        const j = (y * sw + x + 1) * 4;
        const y1 = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const y2 = 0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2];
        edge += Math.abs(y1 - y2);
      }
    }
    const avgEdge = edge / (sw * sh);
    blurHint = avgEdge < 4;
  } catch {
    readable = false;
  }

  return {
    sizeKb,
    mime,
    ext,
    width,
    height,
    aspectRatio: height ? width / height : 0,
    readable,
    brightness,
    darkWarning,
    brightWarning,
    blurHint,
    isPdf: mime === 'application/pdf' || ext === 'pdf',
  };
};

/**
 * Validate a file against a requirement slot.
 * Returns { status: 'pass'|'warning'|'fail', issues: [], fixes: [], summary }
 */
export const validateAgainstSlot = async (file, slot) => {
  const issues = [];
  const fixes = [];
  let analysis;

  try {
    analysis = await analyzeImageFile(file);
  } catch (e) {
    return {
      status: 'fail',
      summary: 'Could not read this file',
      issues: [
        {
          code: 'unreadable',
          severity: 'fail',
          message: e.message || 'File appears corrupted or unsupported',
          required: 'Valid image (JPG/PNG)',
          current: 'Unreadable',
        },
      ],
      fixes: [],
      analysis: null,
    };
  }

  if (!analysis.readable) {
    issues.push({
      code: 'corrupted',
      severity: 'fail',
      message: 'File could not be decoded',
      required: 'Valid image file',
      current: 'Corrupted or unsupported',
    });
  }

  // Format check
  const allowed = (slot.formats || []).map((f) => f.toLowerCase());
  if (allowed.length) {
    const okExt = allowed.includes(analysis.ext);
    const okMime =
      (analysis.mime.includes('jpeg') && (allowed.includes('jpg') || allowed.includes('jpeg'))) ||
      (analysis.mime.includes('png') && allowed.includes('png')) ||
      (analysis.mime.includes('webp') && allowed.includes('webp'));
    if (!okExt && !okMime) {
      issues.push({
        code: 'format',
        severity: 'fail',
        message: 'Wrong file format',
        required: allowed.map((f) => f.toUpperCase()).join(' / '),
        current: analysis.ext ? analysis.ext.toUpperCase() : analysis.mime || 'Unknown',
      });
      fixes.push({
        id: 'convert-jpg',
        label: 'Convert to JPG',
        action: 'convert-jpg',
        tool: '/photo-resizer',
      });
    }
  }

  // Size checks
  if (typeof slot.maxSizeKb === 'number' && analysis.sizeKb > slot.maxSizeKb + 0.5) {
    issues.push({
      code: 'too-large',
      severity: 'fail',
      message: 'File is too large',
      required: slot.minSizeKb
        ? `${slot.minSizeKb}–${slot.maxSizeKb} KB`
        : `Max ${slot.maxSizeKb} KB`,
      current: `${analysis.sizeKb.toFixed(1)} KB`,
    });
    fixes.push({
      id: 'compress',
      label: `Compress to ${slot.maxSizeKb} KB`,
      action: 'compress',
      tool: '/compress',
      targetKb: slot.maxSizeKb,
      minKb: slot.minSizeKb,
    });
  }

  if (typeof slot.minSizeKb === 'number' && analysis.sizeKb < slot.minSizeKb - 0.5) {
    issues.push({
      code: 'too-small',
      severity: 'warning',
      message: 'File is smaller than the usual minimum',
      required: `At least ${slot.minSizeKb} KB`,
      current: `${analysis.sizeKb.toFixed(1)} KB`,
    });
  }

  // Dimension checks
  if (slot.width && slot.height && analysis.width && analysis.height) {
    const wOk = Math.abs(analysis.width - slot.width) <= 2;
    const hOk = Math.abs(analysis.height - slot.height) <= 2;
    if (!wOk || !hOk) {
      issues.push({
        code: 'dimensions',
        severity: 'fail',
        message: 'Wrong dimensions',
        required: `${slot.width} × ${slot.height} px`,
        current: `${analysis.width} × ${analysis.height} px`,
      });
      const tool =
        slot.type === 'signature' || slot.type === 'thumb'
          ? '/signature-resizer'
          : '/photo-resizer';
      fixes.push({
        id: 'resize',
        label: `Resize to ${slot.width}×${slot.height}`,
        action: 'resize',
        tool,
        width: slot.width,
        height: slot.height,
        maxSizeKb: slot.maxSizeKb,
        type: slot.type,
      });
    }
  }

  // Aspect ratio soft check
  if (slot.aspectRatio && analysis.aspectRatio) {
    const tol = slot.aspectTolerance ?? 0.1;
    if (Math.abs(analysis.aspectRatio - slot.aspectRatio) > tol) {
      issues.push({
        code: 'aspect',
        severity: 'warning',
        message: 'Aspect ratio differs from the usual requirement',
        required: `≈ ${slot.aspectRatio.toFixed(2)}`,
        current: analysis.aspectRatio.toFixed(2),
      });
    }
  }

  // Quality heuristics (warnings only)
  if (analysis.darkWarning) {
    issues.push({
      code: 'dark',
      severity: 'warning',
      message: 'Image appears quite dark',
      required: 'Clear, well-lit photo',
      current: 'Low brightness detected',
    });
  }
  if (analysis.brightWarning) {
    issues.push({
      code: 'bright',
      severity: 'warning',
      message: 'Image appears overexposed',
      required: 'Clear, balanced lighting',
      current: 'Very high brightness',
    });
  }
  if (analysis.blurHint && (slot.type === 'photo' || slot.type === 'signature')) {
    issues.push({
      code: 'blur',
      severity: 'warning',
      message: 'Image may be soft or blurry',
      required: 'Sharp, readable image',
      current: 'Low edge detail',
    });
  }

  // Background hint for photos
  if (slot.bgHint === 'white' && slot.type === 'photo') {
    fixes.push({
      id: 'bg',
      label: 'Clean background',
      action: 'background',
      tool: '/background-remover',
    });
  }

  // Deduplicate fixes by id
  const seen = new Set();
  const uniqueFixes = fixes.filter((f) => {
    if (seen.has(f.id)) return false;
    seen.add(f.id);
    return true;
  });

  const hasFail = issues.some((i) => i.severity === 'fail');
  const hasWarn = issues.some((i) => i.severity === 'warning');
  const status = hasFail ? 'fail' : hasWarn ? 'warning' : 'pass';

  let summary = 'Looks compliant';
  if (status === 'fail') {
    summary = issues.find((i) => i.severity === 'fail')?.message || 'Does not meet requirements';
  } else if (status === 'warning') {
    summary = 'Meets core limits, but review suggested';
  }

  // Prefer smart-fix as primary when multiple issues
  if (status === 'fail' && (slot.type === 'photo' || slot.type === 'signature' || slot.type === 'thumb')) {
    uniqueFixes.unshift({
      id: 'smart-fix',
      label: '✨ AI Auto-Fix to requirements',
      action: 'smart-fix',
      tool: slot.type === 'photo' ? '/photo-resizer' : '/signature-resizer',
      width: slot.width,
      height: slot.height,
      maxSizeKb: slot.maxSizeKb,
      type: slot.type,
    });
  }

  return {
    status,
    summary,
    issues,
    fixes: uniqueFixes,
    analysis,
  };
};

/**
 * Compute readiness score from slot results.
 * Required slots only. Pass=full, warning=partial, fail/missing=0.
 */
export const computeReadiness = (slotResults, slots) => {
  const required = slots.filter((s) => s.required !== false);
  if (!required.length) return { score: 0, ready: 0, total: 0, label: 'No requirements' };

  let points = 0;
  let ready = 0;
  required.forEach((slot) => {
    const r = slotResults[slot.id];
    if (!r) return;
    if (r.status === 'pass') {
      points += 1;
      ready += 1;
    } else if (r.status === 'warning') {
      points += 0.7;
      ready += 1;
    }
  });

  const total = required.length;
  const score = Math.round((points / total) * 100);
  let label = 'Not ready';
  if (score >= 100) label = 'Ready to submit';
  else if (score >= 80) label = 'Almost ready';
  else if (score >= 50) label = 'Needs fixes';
  else label = 'Not ready';

  return { score, ready, total, label };
};

export default { analyzeImageFile, validateAgainstSlot, computeReadiness };
