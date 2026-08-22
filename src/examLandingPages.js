/**
 * High-intent exam landing page content (2026 cycle).
 * Specs aligned with applicationRequirements.js / official portals.
 * Always advise users to re-check the latest official notification.
 */

export const EXAM_LANDING_PAGES = {
  'ssc-cgl-photo-signature-resizer': {
    slug: 'ssc-cgl-photo-signature-resizer',
    examName: 'SSC CGL',
    fullTitle: 'SSC CGL Photo & Signature Size 2026 – Resize to 20–50 KB Free',
    h1: 'SSC CGL Photo & Signature Resizer 2026',
    metaDescription:
      'Free SSC CGL photo size tool 2026. Resize photo to 413×531 px (20–50 KB) and signature to 190×95 px (10–20 KB). White background, JPG only. Instant browser tool.',
    keywords:
      'SSC CGL photo size, SSC CGL photo size 20-50 KB, SSC CGL signature size, SSC CGL photo dimensions 2026, SSC CGL photo resize online',
    organization: 'Staff Selection Commission',
    year: '2026',
    officialUrl: 'https://ssc.gov.in/',
    presetId: 'ssc',
    photo: {
      width: 413,
      height: 531,
      minKb: 20,
      maxKb: 50,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Recent colour photo, front-facing, face clearly visible, no cap/sunglasses',
    },
    signature: {
      width: 190,
      height: 95,
      minKb: 10,
      maxKb: 20,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Black or blue ink on white paper, clear and not overlapping',
    },
    specialRules: [
      'Both photo and signature must be in JPG/JPEG format only.',
      'Photo file size must be between 20 KB and 50 KB (strict).',
      'Signature file size must be between 10 KB and 20 KB.',
      'White background is preferred; avoid shadows and patterned walls.',
      'Same photo/signature used across application stages should match.',
    ],
    howTo: [
      'Take a recent colour photo against a plain white background, facing the camera.',
      'Crop so the face occupies most of the frame (passport-style).',
      'Upload the photo below and use the SSC preset — we resize to 413×531 px.',
      'Compress if needed so the file is between 20 KB and 50 KB.',
      'Sign on white paper with black/blue ink, scan or photograph clearly.',
      'Resize signature to 190×95 px and 10–20 KB, then download both JPG files.',
    ],
    rejections: [
      {
        reason: 'File size outside 20–50 KB (photo) or 10–20 KB (signature)',
        fix: 'Use our Compress tool to hit the exact KB range after resizing.',
      },
      {
        reason: 'Wrong dimensions (not 413×531 or 190×95)',
        fix: 'Use the SSC preset on this page — it applies official pixel sizes.',
      },
      {
        reason: 'Dark, busy, or non-white background',
        fix: 'Retake on white background or use Background Remover, then re-export as JPG.',
      },
      {
        reason: 'Blurry face or signature not readable',
        fix: 'Use a sharp photo; for signature, write larger and scan at higher resolution.',
      },
      {
        reason: 'PNG or other format instead of JPG',
        fix: 'Always download as JPEG from the tool before uploading to SSC.',
      },
    ],
    faqs: [
      {
        q: 'What is the SSC CGL photo size in 2026?',
        a: 'SSC CGL requires a photograph of 413 × 531 pixels, file size between 20 KB and 50 KB, in JPG format, preferably with a white background.',
      },
      {
        q: 'What is the SSC CGL signature size?',
        a: 'Signature should be 190 × 95 pixels, 10 KB to 20 KB, JPG format, black or blue ink on white paper.',
      },
      {
        q: 'Can I use a mobile photo for SSC CGL?',
        a: 'Yes. Take a clear front-facing photo on a white background, then use this tool to resize and compress to the exact SSC limits.',
      },
      {
        q: 'Is this SSC CGL photo tool free?',
        a: 'Yes. FormPhoto runs fully in your browser. Your files are not uploaded to any server.',
      },
    ],
    related: [
      { label: 'SSC CHSL / MTS sizes', to: '/exam-requirements' },
      { label: 'Application upload checker', to: '/application/ssc-cgl' },
      { label: 'Compress to exact KB', to: '/compress' },
      { label: 'Background remover', to: '/background-remover' },
    ],
  },

  'upsc-cse-photo-signature-size': {
    slug: 'upsc-cse-photo-signature-size',
    examName: 'UPSC CSE',
    fullTitle: 'UPSC Photo Size & Signature Size 2026 – CSE / IFoS Free Resizer',
    h1: 'UPSC CSE Photo & Signature Size 2026',
    metaDescription:
      'UPSC Civil Services photo size 2026: 350×350 px, 20–300 KB. Signature 350×150 px, 10–100 KB. Free browser resizer for UPSC CSE and IFoS applications.',
    keywords:
      'UPSC photo size, UPSC signature size, UPSC CSE photo dimensions 2026, UPSC photo 350x350, UPSC form photo resize',
    organization: 'Union Public Service Commission',
    year: '2026',
    officialUrl: 'https://upsc.gov.in/',
    presetId: 'upsc',
    photo: {
      width: 350,
      height: 350,
      minKb: 20,
      maxKb: 300,
      format: 'JPG / JPEG',
      background: 'White / light',
      notes: 'Passport-size colour photo, recent, full face visible',
    },
    signature: {
      width: 350,
      height: 150,
      minKb: 10,
      maxKb: 100,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Black ink on white paper, clear signature',
    },
    specialRules: [
      'Photo is typically square: 350 × 350 pixels.',
      'File size for photo: 20 KB to 300 KB.',
      'Signature roughly 350 × 150 pixels, 10–100 KB.',
      'Use a recent photograph that matches your appearance at the exam.',
      'Follow the exact instructions in the current year’s OTR / application notice.',
    ],
    howTo: [
      'Take a passport-style colour photo on a light/white background.',
      'Ensure eyes are open, face centred, no heavy shadows.',
      'Upload and select the UPSC preset to get 350×350 px.',
      'Keep file size between 20 KB and 300 KB (compress only if above limit).',
      'Prepare signature on white paper in black ink; resize to 350×150 px.',
      'Download JPG files and upload them in the UPSC online application.',
    ],
    rejections: [
      {
        reason: 'Photo not square or wrong pixel size',
        fix: 'Use the UPSC preset here for exact 350×350 output.',
      },
      {
        reason: 'File larger than 300 KB',
        fix: 'Use Compress Photo and set target under 300 KB without killing quality.',
      },
      {
        reason: 'Old or mismatched photograph',
        fix: 'Use a photo taken within the last 3–6 months that matches your current look.',
      },
      {
        reason: 'Unclear signature',
        fix: 'Sign larger on white paper, photograph/scan sharply, then resize.',
      },
    ],
    faqs: [
      {
        q: 'What is the UPSC photo size for CSE 2026?',
        a: 'UPSC commonly requires a 350 × 350 pixel colour photograph, 20 KB to 300 KB, in JPG format.',
      },
      {
        q: 'What is the UPSC signature size?',
        a: 'Signature is typically 350 × 150 pixels, 10 KB to 100 KB, JPG, black ink on white.',
      },
      {
        q: 'Does UPSC accept mobile photos?',
        a: 'Yes if quality is good. Resize with this tool to meet pixel and KB limits before uploading.',
      },
      {
        q: 'Are these UPSC sizes guaranteed forever?',
        a: 'Portals can update rules. Always cross-check the latest official UPSC notification for your cycle.',
      },
    ],
    related: [
      { label: 'All exam size chart', to: '/exam-requirements' },
      { label: 'UPSC upload checker', to: '/application/upsc' },
      { label: 'Photo resizer', to: '/photo-resizer?preset=upsc' },
      { label: 'Signature resizer', to: '/signature-resizer?preset=upsc' },
    ],
  },

  'neet-photo-resizer-2026': {
    slug: 'neet-photo-resizer-2026',
    examName: 'NEET (UG)',
    fullTitle: 'NEET Photo Size 2026 & Signature – Free Resizer (NTA)',
    h1: 'NEET Photo Resizer 2026 – Exact NTA Size',
    metaDescription:
      'NEET UG 2026 photo size: 413×531 px, 10–200 KB. Signature as per NTA limits. Free online resizer for NEET application. Private, no upload.',
    keywords:
      'NEET photo size 2026, NEET photo size, NEET signature size, NEET photo dimensions, NTA photo size, NEET photo 10 to 200 KB',
    organization: 'National Testing Agency (NTA)',
    year: '2026',
    officialUrl: 'https://neet.nta.nic.in/',
    presetId: 'neet',
    photo: {
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 200,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Recent passport-style colour photo for NEET UG application',
    },
    signature: {
      width: 200,
      height: 80,
      minKb: 4,
      maxKb: 30,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Clear signature; check current NEET information bulletin for exact px if updated',
    },
    specialRules: [
      'Photo: 413 × 531 pixels is the widely used NTA dimension set.',
      'Photo file size typically 10 KB to 200 KB.',
      'White background preferred; face should be clearly visible.',
      'Name and details on application must match photo identity.',
      'Always verify the current NEET information bulletin before final submit.',
    ],
    howTo: [
      'Capture a clear front-facing photo on a white background.',
      'Avoid caps, dark glasses, or heavy filters.',
      'Upload and apply the NEET preset (413×531 px).',
      'Ensure file size is between 10 KB and 200 KB.',
      'Prepare a clean signature scan and resize within NTA limits.',
      'Download JPG files and upload on the NEET portal.',
    ],
    rejections: [
      {
        reason: 'Photo file above 200 KB or below 10 KB',
        fix: 'Compress or slightly re-export quality until within 10–200 KB.',
      },
      {
        reason: 'Incorrect aspect ratio / cropped face',
        fix: 'Use smart resize with NEET preset so face stays centred.',
      },
      {
        reason: 'Selfie angle or side profile',
        fix: 'Use a straight-on passport-style photo only.',
      },
      {
        reason: 'Signature too light or cut off',
        fix: 'Re-sign with darker ink and full signature inside the frame.',
      },
    ],
    faqs: [
      {
        q: 'What is NEET photo size 2026?',
        a: 'NEET (UG) commonly requires 413 × 531 pixel JPG photo, about 10 KB to 200 KB, with a white background.',
      },
      {
        q: 'What is NEET signature size?',
        a: 'Signature is usually a small JPG (often around 4–30 KB). Confirm exact pixels in the latest NTA bulletin.',
      },
      {
        q: 'Can I change my NEET photo after submission?',
        a: 'Correction windows are limited. Prepare a compliant photo before the final submit.',
      },
      {
        q: 'Is this NEET photo tool free?',
        a: 'Yes. Processing happens in your browser; files are not uploaded to FormPhoto servers.',
      },
    ],
    related: [
      { label: 'JEE Main photo size', to: '/jee-main-photo-signature' },
      { label: 'NEET application checker', to: '/application/neet' },
      { label: 'Master size chart', to: '/exam-requirements' },
      { label: 'Compress photo', to: '/compress' },
    ],
  },

  'ibps-po-clerk-photo-signature': {
    slug: 'ibps-po-clerk-photo-signature',
    examName: 'IBPS PO / Clerk',
    fullTitle: 'IBPS PO & Clerk Photo Size & Signature 2026 – Free Resizer',
    h1: 'IBPS PO & Clerk Photo & Signature Size 2026',
    metaDescription:
      'IBPS PO/Clerk photo and signature size for 2026. Typical photo 200×200 px, signature as per IBPS. Free resizer for CRP PO and Clerk applications.',
    keywords:
      'IBPS photo size, IBPS PO photo size, IBPS Clerk signature size, IBPS photo dimensions, IBPS form photo resize 2026',
    organization: 'Institute of Banking Personnel Selection',
    year: '2026',
    officialUrl: 'https://www.ibps.in/',
    presetId: 'ibps',
    photo: {
      width: 200,
      height: 200,
      minKb: 20,
      maxKb: 50,
      format: 'JPG / JPEG',
      background: 'White / light',
      notes: 'Recent colour photo; square format commonly used in IBPS CRP forms',
    },
    signature: {
      width: 140,
      height: 60,
      minKb: 10,
      maxKb: 20,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Black ink on white; clear and complete signature',
    },
    specialRules: [
      'IBPS often uses compact square photos (e.g. 200×200) with tight KB limits.',
      'Left thumb impression may also be required in some CRP cycles — check notification.',
      'Photo and signature must match the candidate; do not use someone else’s scan.',
      'Keep originals; you may need the same set for later stages.',
      'Confirm exact numbers in the current IBPS CRP advertisement.',
    ],
    howTo: [
      'Take a clear colour photo on a light background.',
      'Crop to a square face shot if required by the form.',
      'Use the IBPS preset to hit typical pixel and KB targets.',
      'Prepare signature on white paper; resize to the signature slot size.',
      'If thumb impression is required, scan it separately as per IBPS instructions.',
      'Upload only JPG files within the stated min/max KB.',
    ],
    rejections: [
      {
        reason: 'Photo exceeds max KB (often 50 KB)',
        fix: 'Compress to 20–50 KB after resizing to the correct pixels.',
      },
      {
        reason: 'Signature file too large or wrong aspect',
        fix: 'Use Signature Resizer with IBPS preset / custom 140×60 style size.',
      },
      {
        reason: 'Blurry or pixelated image after resize',
        fix: 'Start from a high-resolution original, then resize down once.',
      },
      {
        reason: 'Missing thumb impression when required',
        fix: 'Read the CRP notice — some posts need photo + signature + LTI.',
      },
    ],
    faqs: [
      {
        q: 'What is IBPS PO photo size?',
        a: 'IBPS CRP forms commonly ask for a small JPG photo (often around 200×200 px) with a size limit such as 20–50 KB. Confirm in the current advertisement.',
      },
      {
        q: 'Is IBPS Clerk photo size the same as PO?',
        a: 'Usually the same CRP photo/signature rules apply across PO and Clerk in a given cycle, but always read that year’s notice.',
      },
      {
        q: 'Does IBPS need left thumb impression?',
        a: 'Many IBPS applications do. Prepare a clear LTI scan if the form lists it as mandatory.',
      },
      {
        q: 'Can I use the same photo for SBI and IBPS?',
        a: 'Only if both portals’ pixel and KB rules are satisfied. Resize separately for each if limits differ.',
      },
    ],
    related: [
      { label: 'SBI PO / Clerk sizes', to: '/exam-requirements' },
      { label: 'IBPS PO checker', to: '/application/ibps-po' },
      { label: 'IBPS Clerk checker', to: '/application/ibps-clerk' },
      { label: 'Signature resizer', to: '/signature-resizer?preset=ibps' },
    ],
  },

  'rrb-ntpc-group-d-photo-resizer': {
    slug: 'rrb-ntpc-group-d-photo-resizer',
    examName: 'RRB NTPC / Group D',
    fullTitle: 'RRB NTPC & Group D Photo Size 2026 – Signature Resizer Free',
    h1: 'RRB NTPC & Group D Photo Resizer 2026',
    metaDescription:
      'RRB NTPC and Group D photo size: 413×531 px, 15–50 KB. Signature about 140×60 px, 10–30 KB. Free Railway recruitment photo tool.',
    keywords:
      'RRB NTPC photo size, RRB Group D photo size, Railway photo size, RRB signature size, RRB photo 15 to 50 KB',
    organization: 'Railway Recruitment Board',
    year: '2026',
    officialUrl: 'https://www.rrbcdg.gov.in/',
    presetId: 'railway',
    photo: {
      width: 413,
      height: 531,
      minKb: 15,
      maxKb: 50,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Colour photo, white background, taken recently',
    },
    signature: {
      width: 140,
      height: 60,
      minKb: 10,
      maxKb: 30,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Black ink signature, clearly visible',
    },
    specialRules: [
      'Photo dimensions commonly 413 × 531 pixels.',
      'Photo size usually 15 KB to 50 KB.',
      'Signature often around 140 × 60 pixels, 10–30 KB.',
      'Same standards generally apply to NTPC and Group D in a cycle — verify CEN notice.',
      'Keep a copy of the uploaded files for document verification stage.',
    ],
    howTo: [
      'Photograph yourself against a plain white background.',
      'Use front-facing, well-lit image without filters.',
      'Apply the Railway / RRB preset for 413×531 px output.',
      'Compress into the 15–50 KB window if needed.',
      'Resize signature to ~140×60 px and under 30 KB.',
      'Upload JPG files on the RRB application portal.',
    ],
    rejections: [
      {
        reason: 'Photo larger than 50 KB',
        fix: 'Compress to 15–50 KB after correct pixel resize.',
      },
      {
        reason: 'Non-white background',
        fix: 'Retake on white or remove background, then export JPG.',
      },
      {
        reason: 'Signature cut off or too thin',
        fix: 'Write a complete signature with thicker strokes, then crop tightly.',
      },
      {
        reason: 'Wrong file format',
        fix: 'Convert to JPG only — avoid PNG/WebP for RRB forms.',
      },
    ],
    faqs: [
      {
        q: 'What is RRB NTPC photo size?',
        a: 'Typically 413 × 531 pixels, 15 KB to 50 KB, JPG, white background.',
      },
      {
        q: 'Is RRB Group D photo size the same as NTPC?',
        a: 'Usually yes within the same recruitment cycle, but always read the specific CEN notification.',
      },
      {
        q: 'What is RRB signature size?',
        a: 'Often about 140 × 60 pixels and 10–30 KB in JPG format.',
      },
      {
        q: 'Do I need the same photo at DV?',
        a: 'Carry printed copies that match what you uploaded; major mismatch can cause issues.',
      },
    ],
    related: [
      { label: 'RRB NTPC checker', to: '/application/rrb-ntpc' },
      { label: 'RRB Group D checker', to: '/application/rrb-group-d' },
      { label: 'SSC CGL photo tool', to: '/ssc-cgl-photo-signature-resizer' },
      { label: 'All exam sizes', to: '/exam-requirements' },
    ],
  },

  'jee-main-photo-signature': {
    slug: 'jee-main-photo-signature',
    examName: 'JEE Main',
    fullTitle: 'JEE Main Photo Size & Signature 2026 – NTA Free Resizer',
    h1: 'JEE Main Photo & Signature Size 2026',
    metaDescription:
      'JEE Main 2026 photo size: 413×531 px, 10–200 KB. Signature about 413×177 px, 4–30 KB. Free NTA-compliant resizer for JEE application.',
    keywords:
      'JEE Main photo size, JEE Main signature size, JEE photo dimensions 2026, NTA JEE photo size, JEE Main photo 10 to 200 KB',
    organization: 'National Testing Agency (NTA)',
    year: '2026',
    officialUrl: 'https://jeemain.nta.nic.in/',
    presetId: 'jee-main',
    photo: {
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 200,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Passport-style colour photo for JEE Main application',
    },
    signature: {
      width: 413,
      height: 177,
      minKb: 4,
      maxKb: 30,
      format: 'JPG / JPEG',
      background: 'White',
      notes: 'Clear signature; dimensions as commonly listed for NTA JEE forms',
    },
    specialRules: [
      'Photo commonly 413 × 531 px, 10–200 KB, JPG.',
      'Signature often wider format (e.g. 413 × 177), 4–30 KB.',
      'Photo should match the candidate appearing in the exam.',
      'Follow the latest JEE Main information bulletin for any updated limits.',
      'Keep files ready for both session applications if you apply twice in a year.',
    ],
    howTo: [
      'Take a recent front-facing photo on white background.',
      'Upload and choose the JEE Main preset.',
      'Confirm output is 413×531 px and within 10–200 KB.',
      'Create a clear signature image and resize to the signature dimensions.',
      'Download both as JPG.',
      'Upload on the JEE Main portal during registration.',
    ],
    rejections: [
      {
        reason: 'Photo not within 10–200 KB',
        fix: 'Use Compress tool to target a safe mid-range (e.g. 50–100 KB).',
      },
      {
        reason: 'Signature aspect wrong or text cut off',
        fix: 'Use Signature Resizer with JEE dimensions; leave small margins.',
      },
      {
        reason: 'Low-quality webcam image',
        fix: 'Use a phone camera in good light, then resize once.',
      },
      {
        reason: 'Background not plain',
        fix: 'White background only — use Background Remover if needed.',
      },
    ],
    faqs: [
      {
        q: 'What is JEE Main photo size 2026?',
        a: 'JEE Main typically requires a 413 × 531 pixel JPG photo between 10 KB and 200 KB.',
      },
      {
        q: 'What is JEE Main signature size?',
        a: 'Signature is often around 413 × 177 pixels and 4–30 KB. Confirm in the current NTA bulletin.',
      },
      {
        q: 'Is JEE photo size same as NEET?',
        a: 'Photo dimensions are often similar (413×531), but signature rules can differ — prepare each exam separately.',
      },
      {
        q: 'Can I reuse my Class 12 board photo?',
        a: 'Only if it meets JEE pixel/KB rules and still looks like you. Prefer a fresh photo.',
      },
    ],
    related: [
      { label: 'NEET photo resizer', to: '/neet-photo-resizer-2026' },
      { label: 'JEE Main checker', to: '/application/jee-main' },
      { label: 'Exam size chart', to: '/exam-requirements' },
      { label: 'Photo resizer', to: '/photo-resizer?preset=jee-main' },
    ],
  },
};

export const getExamLandingBySlug = (slug) => EXAM_LANDING_PAGES[slug] || null;

export const EXAM_LANDING_SLUGS = Object.keys(EXAM_LANDING_PAGES);
