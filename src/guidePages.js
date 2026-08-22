/**
 * High-quality long-form guide pages for SEO and user education.
 */

export const GUIDE_PAGES = {
  'ssc-cgl-photo-signature-size-complete-guide-2026': {
    slug: 'ssc-cgl-photo-signature-size-complete-guide-2026',
    title: 'Correct Photo & Signature Size for SSC CGL 2026 (Complete Guide)',
    h1: 'Correct Photo & Signature Size for SSC CGL 2026 (Complete Guide)',
    metaDescription:
      'Complete SSC CGL 2026 photo and signature size guide: 413×531 px photo (20–50 KB), 190×95 px signature (10–20 KB), white background, JPG only. Step-by-step with free tools.',
    keywords:
      'SSC CGL photo size 2026, SSC CGL signature size, SSC CGL photo 20-50 KB, correct photo size SSC CGL, SSC CGL document upload guide',
    category: 'Exam guides',
    updated: '2026-08-01',
    readMinutes: 8,
    intro:
      'Every year thousands of SSC CGL applications face photo or signature rejection because of wrong dimensions, file size, or background. This guide walks through the exact 2026-style requirements, how to prepare files correctly, and how to fix the most common mistakes — using free browser tools on FormPhoto.',
    sections: [
      {
        h2: 'SSC CGL photo size requirements (2026)',
        paragraphs: [
          'Staff Selection Commission typically asks for a recent colour photograph in JPG/JPEG format. The dimensions used across recent CGL cycles are 413 × 531 pixels, with a strict file size between 20 KB and 50 KB.',
          'The background should be white or very light. The face must be front-facing, eyes open, and clearly visible — no caps, dark glasses, or heavy shadows. The photo should look like you on the day of the exam.',
        ],
        bullets: [
          'Dimensions: 413 × 531 pixels',
          'File size: 20 KB minimum, 50 KB maximum',
          'Format: JPG / JPEG only',
          'Background: white preferred',
          'Style: passport-type, full face visible',
        ],
      },
      {
        h2: 'SSC CGL signature size requirements',
        paragraphs: [
          'The signature slot is smaller and tighter on file size. A common specification is 190 × 95 pixels, with the file between 10 KB and 20 KB.',
          'Sign with black or blue ink on plain white paper. Avoid fancy pens that feather, and do not crop so tightly that part of the signature is cut off.',
        ],
        bullets: [
          'Dimensions: 190 × 95 pixels',
          'File size: 10 KB – 20 KB',
          'Format: JPG / JPEG',
          'Ink: black or blue on white paper',
        ],
      },
      {
        h2: 'Step-by-step: prepare a compliant SSC CGL photo',
        paragraphs: [
          'You do not need paid software. A phone camera and FormPhoto are enough if you follow a clear process.',
        ],
        steps: [
          'Stand or sit against a plain white wall in even daylight (or soft indoor light).',
          'Hold the phone at eye level; keep a neutral expression.',
          'Transfer the image to the device you will use for the application.',
          'Open the SSC CGL photo tool or Photo Resizer with the SSC preset (413×531).',
          'If the file is still above 50 KB, use Compress Photo and target about 40 KB.',
          'Download as JPG and keep a backup copy for later stages.',
        ],
      },
      {
        h2: 'Step-by-step: prepare the signature',
        steps: [
          'Sign once on white paper with a dark pen; write slightly larger than usual.',
          'Photograph or scan the signature in good light without glare.',
          'Crop tightly around the signature, leaving a small white margin.',
          'Resize to 190×95 px using Signature Resizer.',
          'Compress to 10–20 KB if needed, then download JPG.',
        ],
      },
      {
        h2: 'Before you submit',
        paragraphs: [
          'Open both files and confirm pixel size and KB in your file properties. Upload only after both pass. Rules can be updated in a fresh SSC notice — always skim the current advertisement PDF before final submit.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the exact SSC CGL photo size in KB?',
        a: 'Typically 20 KB to 50 KB for the photograph. Files outside this range are a common cause of upload errors.',
      },
      {
        q: 'Can I use a PNG photo for SSC CGL?',
        a: 'No. Convert to JPG/JPEG. PNG uploads are usually rejected by the SSC portal.',
      },
      {
        q: 'Is 413×531 the same as 3.5×4.5 cm?',
        a: 'It is the pixel equivalent often used for a 3.5 × 4.5 cm style photo at the resolution SSC expects online.',
      },
    ],
    relatedTools: [
      { label: 'SSC CGL landing page', to: '/ssc-cgl-photo-signature-resizer' },
      { label: 'Photo resizer (SSC preset)', to: '/photo-resizer?preset=ssc' },
      { label: 'Signature resizer', to: '/signature-resizer?preset=ssc' },
      { label: 'Compress to KB', to: '/compress' },
      { label: 'Master size chart', to: '/exam-requirements' },
    ],
  },

  'why-exam-photo-gets-rejected-and-how-to-fix': {
    slug: 'why-exam-photo-gets-rejected-and-how-to-fix',
    title: 'Why Your Exam Photo Gets Rejected & How to Fix It',
    h1: 'Why Your Exam Photo Gets Rejected & How to Fix It',
    metaDescription:
      'Exam photo rejected by SSC, UPSC, IBPS, NEET or RRB? Learn the top rejection reasons — wrong KB, pixels, background, blur — and exact fixes with free tools.',
    keywords:
      'exam photo rejected, photo upload failed SSC, form photo rejection reasons, fix exam photo, photo size error application',
    category: 'Troubleshooting',
    updated: '2026-08-01',
    readMinutes: 7,
    intro:
      'Photo rejection is frustrating, especially near deadlines. Most failures fall into a few predictable categories: file size, dimensions, background, clarity, or format. Fix the root cause once and reuse the same checklist for every Indian exam portal.',
    sections: [
      {
        h2: '1. File size outside the allowed range',
        paragraphs: [
          'Portals enforce both minimum and maximum KB. A crystal-clear 2 MB phone photo will fail a 50 KB limit. An over-compressed 5 KB image may fail a 20 KB minimum.',
        ],
        bullets: [
          'Check the official min–max KB for your exam.',
          'Resize pixels first, then compress to a target in the middle of the allowed band.',
          'Use Compress Photo to hit sizes like 20 KB, 40 KB, or 100 KB within about ±1 KB.',
        ],
      },
      {
        h2: '2. Wrong dimensions or aspect ratio',
        paragraphs: [
          'Uploading a 1080×1080 selfie when the form wants 413×531 will fail automated checks. Stretching the image to “fit” distorts the face and can also trigger rejection at verification.',
        ],
        bullets: [
          'Always resize to the exact width × height listed in the notice.',
          'Prefer smart crop (cover mode) so the face stays centred.',
          'Use exam presets on FormPhoto instead of guessing.',
        ],
      },
      {
        h2: '3. Background not white or too busy',
        paragraphs: [
          'Many forms explicitly want a white or light background. Busy curtains, posters, or strong shadows behind the head are frequent reasons for manual rejection later even if the file uploads.',
        ],
        bullets: [
          'Retake against a plain white wall when possible.',
          'Or use Background Remover, then place the subject on pure white and export JPG.',
        ],
      },
      {
        h2: '4. Blur, noise, or face not clearly visible',
        paragraphs: [
          'Motion blur, extreme filters, sunglasses, caps, or hair covering the eyes can fail both software checks and human verification. Group photos or side profiles are never acceptable.',
        ],
      },
      {
        h2: '5. Wrong file format',
        paragraphs: [
          'JPG/JPEG is the safe default for almost all Indian exam portals. HEIC (iPhone), WebP, or PNG may upload on some sites and fail on others — convert to JPG before you start the form.',
        ],
      },
      {
        h2: 'Quick fix checklist',
        steps: [
          'Read the current notification for pixels + KB + format.',
          'Start from a sharp, front-facing original on a light background.',
          'Resize with the correct preset.',
          'Compress into the allowed KB band.',
          'Open the final JPG and confirm properties before upload.',
          'Keep a backup for admit card / DV stages.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The portal says “invalid file” but size looks fine. Why?',
        a: 'Often the dimensions or format are wrong, or the file is corrupt. Re-export as a fresh JPG after resize.',
      },
      {
        q: 'Can I edit my photo with beauty filters?',
        a: 'Avoid heavy filters. A natural colour photo that matches your real appearance is safer for verification.',
      },
      {
        q: 'My photo uploaded but was rejected later at scrutiny.',
        a: 'Manual checks catch background, clarity, and identity issues. Fix those even if the file size was accepted.',
      },
    ],
    relatedTools: [
      { label: 'Photo resizer', to: '/photo-resizer' },
      { label: 'Compress photo', to: '/compress' },
      { label: 'Background remover', to: '/background-remover' },
      { label: 'Application checker', to: '/application-checker' },
      { label: 'Exam size chart', to: '/exam-requirements' },
    ],
  },

  'how-to-resize-signature-under-20kb': {
    slug: 'how-to-resize-signature-under-20kb',
    title: 'How to Resize Signature Under 20 KB Without Losing Quality',
    h1: 'How to Resize Signature Under 20 KB Without Losing Quality',
    metaDescription:
      'Resize signature under 20 KB for SSC, IBPS and bank forms without blur. Exact pixel sizes, compression tips, and free browser signature tool.',
    keywords:
      'signature under 20 KB, resize signature 20kb, SSC signature size, IBPS signature KB, compress signature without quality loss',
    category: 'How-to',
    updated: '2026-08-01',
    readMinutes: 6,
    intro:
      'Bank and SSC forms often cap signatures at 10–20 KB. Aggressive compression turns strokes into grey smudges. The right order is: clean capture → correct pixels → gentle compression to the KB target.',
    sections: [
      {
        h2: 'Why signatures balloon in file size',
        paragraphs: [
          'Phone photos of paper signatures include the whole page, coloured backgrounds, and high resolution. The portal only needs a small black-on-white crop. Most of the KB is wasted background.',
        ],
      },
      {
        h2: 'Recommended pixel sizes',
        bullets: [
          'SSC-style: about 190 × 95 px (often 10–20 KB)',
          'Railway-style: about 140 × 60 px (often 10–30 KB)',
          'UPSC-style: about 350 × 150 px (often up to 100 KB)',
          'Always prefer the size printed in your specific notice',
        ],
      },
      {
        h2: 'Method that preserves stroke quality',
        steps: [
          'Sign with a dark gel or ball pen on bright white paper.',
          'Scan or photograph straight-on in bright, even light (no shadow across the ink).',
          'Crop so only the signature and a thin white margin remain.',
          'Resize to the required width × height with Signature Resizer.',
          'If still above 20 KB, compress gradually — target 15–18 KB, not 5 KB.',
          'Zoom the result: strokes should stay continuous, not pixel dust.',
        ],
      },
      {
        h2: 'What not to do',
        bullets: [
          'Do not squash a wide signature into a tiny box without cropping first.',
          'Do not save as PNG then rename to .jpg.',
          'Do not use pencil or light blue ink on creamy paper.',
          'Do not add digital “signature fonts” if the form expects your handwritten sign.',
        ],
      },
      {
        h2: 'When the portal needs both signature and thumb impression',
        paragraphs: [
          'IBPS and some other forms ask for a left thumb impression as a separate upload. Prepare it the same way: high contrast, correct pixels, under the stated KB limit, JPG format.',
        ],
      },
    ],
    faqs: [
      {
        q: 'My signature becomes unreadable under 20 KB. What now?',
        a: 'Crop tighter, use darker ink, and resize to the exact small dimensions first. Compression works better on a small, high-contrast image than on a full-page photo.',
      },
      {
        q: 'Is 20 KB always the limit?',
        a: 'No. SSC signatures are often 10–20 KB; other exams allow more. Read your notice. This guide focuses on the strict under-20 KB case.',
      },
    ],
    relatedTools: [
      { label: 'Signature resizer', to: '/signature-resizer' },
      { label: 'Compress photo/signature', to: '/compress' },
      { label: 'SSC CGL guide', to: '/ssc-cgl-photo-signature-size-complete-guide-2026' },
      { label: 'IBPS photo & signature', to: '/ibps-po-clerk-photo-signature' },
    ],
  },

  'upsc-vs-ssc-photo-requirements': {
    slug: 'upsc-vs-ssc-photo-requirements',
    title: 'UPSC Photo Requirements vs SSC – Key Differences',
    h1: 'UPSC Photo Requirements vs SSC – Key Differences',
    metaDescription:
      'UPSC vs SSC photo size compared: 350×350 vs 413×531, different KB limits and signature rules. Clear table and free resizers for both.',
    keywords:
      'UPSC vs SSC photo size, UPSC photo size, SSC photo size difference, UPSC signature vs SSC, civil services photo requirements',
    category: 'Comparisons',
    updated: '2026-08-01',
    readMinutes: 6,
    intro:
      'UPSC and SSC both want a clear identity photo, but the pixel box and KB limits differ. Using an SSC-ready file on UPSC (or the reverse) is a common unforced error. Here is a practical side-by-side view for the 2026 cycle style rules.',
    sections: [
      {
        h2: 'Quick comparison table',
        paragraphs: [
          'Figures below reflect widely used online specifications. Always confirm against the latest official notice for your exact recruitment.',
        ],
        table: {
          headers: ['Item', 'UPSC (CSE-style)', 'SSC (CGL-style)'],
          rows: [
            ['Photo pixels', '350 × 350', '413 × 531'],
            ['Photo KB', '20 – 300 KB', '20 – 50 KB'],
            ['Photo shape', 'Square', 'Portrait rectangle'],
            ['Signature pixels', '≈ 350 × 150', '≈ 190 × 95'],
            ['Signature KB', '≈ 10 – 100 KB', '≈ 10 – 20 KB'],
            ['Format', 'JPG', 'JPG'],
            ['Background', 'White / light', 'White preferred'],
          ],
        },
      },
      {
        h2: 'What this means in practice',
        paragraphs: [
          'SSC is stricter on maximum photo KB (often 50 KB). UPSC allows a larger file but expects a square crop. A single “one size” image rarely satisfies both without re-export.',
          'Signatures on SSC are smaller and tighter on KB. UPSC signatures are usually allowed more space.',
        ],
      },
      {
        h2: 'Recommended workflow if you apply to both',
        steps: [
          'Keep one high-quality original photo and one clean signature scan.',
          'Export an SSC set: 413×531, 20–50 KB photo + 190×95, 10–20 KB signature.',
          'Export a separate UPSC set: 350×350 photo + 350×150 signature within UPSC KB limits.',
          'Label files clearly (e.g. ssc-photo.jpg, upsc-photo.jpg) so you do not mix them up at submit time.',
        ],
      },
      {
        h2: 'Other differences to watch',
        bullets: [
          'Application portals and One-Time Registration flows differ — photo rules appear in each form’s instructions.',
          'Verification stages may compare your face to the uploaded image; use a recent photo for both.',
          'Do not rely on WhatsApp-compressed images as your master file; quality drops fast.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I stretch SSC photo to 350×350 for UPSC?',
        a: 'No. Stretching distorts the face. Start from the original and crop/resize properly to square.',
      },
      {
        q: 'Which is harder to satisfy?',
        a: 'SSC’s 50 KB photo cap is often harder on phone images. Resize first, then compress carefully.',
      },
    ],
    relatedTools: [
      { label: 'UPSC landing page', to: '/upsc-cse-photo-signature-size' },
      { label: 'SSC CGL landing page', to: '/ssc-cgl-photo-signature-resizer' },
      { label: 'UPSC preset resizer', to: '/photo-resizer?preset=upsc' },
      { label: 'SSC preset resizer', to: '/photo-resizer?preset=ssc' },
      { label: 'All exam sizes', to: '/exam-requirements' },
    ],
  },

  'passport-size-vs-exam-photo': {
    slug: 'passport-size-vs-exam-photo',
    title: 'Passport Size Photo vs Exam Photo – What’s the Difference?',
    h1: 'Passport Size Photo vs Exam Photo – What’s the Difference?',
    metaDescription:
      'Passport size photo vs SSC, UPSC, NEET exam photo: cm vs pixels, KB limits, background rules. Know when a studio passport photo is not enough.',
    keywords:
      'passport size vs exam photo, passport photo pixels, exam photo size India, passport size for SSC, difference passport and form photo',
    category: 'Comparisons',
    updated: '2026-08-01',
    readMinutes: 6,
    intro:
      '“Passport size” in a studio usually means a print in centimetres (often 3.5 × 4.5 cm). Online exam forms speak in pixels and kilobytes. A perfect studio print can still fail a digital upload if it is scanned wrong or saved too large.',
    sections: [
      {
        h2: 'Passport size (studio meaning)',
        paragraphs: [
          'In Indian studios, passport size often refers to a small printed photo for passports, visas, or paper forms. Background is usually white; pose is formal. The physical print does not automatically equal 413×531 pixels or a 50 KB file.',
        ],
      },
      {
        h2: 'Exam / portal photo (digital meaning)',
        paragraphs: [
          'Exam boards define width × height in pixels, min/max file size in KB, and allowed formats. The same face and white background are required, but the file must pass automated validation on the website.',
        ],
        bullets: [
          'SSC-style digital photo: 413 × 531 px, 20–50 KB',
          'UPSC-style: often 350 × 350 px, 20–300 KB',
          'NEET / JEE-style: often 413 × 531 px, 10–200 KB',
        ],
      },
      {
        h2: 'Key differences',
        table: {
          headers: ['Aspect', 'Studio passport photo', 'Exam portal photo'],
          rows: [
            ['Unit', 'Centimetres (print)', 'Pixels + KB (file)'],
            ['Checked by', 'Human / print size', 'Software then human'],
            ['File size', 'Often irrelevant', 'Strict min–max KB'],
            ['Format', 'Print or any scan', 'Usually JPG only'],
            ['Reuse', 'Many paper forms', 'Must match each portal rule'],
          ],
        },
      },
      {
        h2: 'How to use one studio session for many exams',
        steps: [
          'Ask for a high-resolution digital copy (not only prints).',
          'Ensure white background and correct pose in the original.',
          'For each exam, resize that original to the required pixels.',
          'Compress to that exam’s KB window.',
          'Never WhatsApp the file between steps if you can avoid it — send originals as documents.',
        ],
      },
      {
        h2: 'Passport India online vs exam forms',
        paragraphs: [
          'Passport Seva has its own digital specifications (separate from SSC/UPSC). Treat passport application photos as another preset: follow the Passport Seva guidelines, not only “passport size” shop slang.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a 3.5×4.5 cm photo the same as SSC digital size?',
        a: 'Only if your scan/export also hits SSC’s pixel and KB rules. Print size alone is not enough for online forms.',
      },
      {
        q: 'Can I crop a group photo to passport size for exams?',
        a: 'Not recommended. Use a dedicated front-facing photo taken for identity documents.',
      },
    ],
    relatedTools: [
      { label: 'Photo resizer', to: '/photo-resizer' },
      { label: 'Exam requirements chart', to: '/exam-requirements' },
      { label: 'NEET photo guide page', to: '/neet-photo-resizer-2026' },
      { label: 'Compress tool', to: '/compress' },
    ],
  },

  'compress-photo-exact-kb-indian-forms': {
    slug: 'compress-photo-exact-kb-indian-forms',
    title: 'How to Compress Photo to Exact KB for Indian Forms',
    h1: 'How to Compress Photo to Exact KB for Indian Forms',
    metaDescription:
      'Compress exam photos to exact KB — 20 KB, 50 KB, 100 KB — for SSC, IBPS, UPSC and more. Keep faces clear. Free browser compressor.',
    keywords:
      'compress photo to 20kb, compress photo to 50kb, exact KB photo compressor, SSC photo compress, form photo file size',
    category: 'How-to',
    updated: '2026-08-01',
    readMinutes: 5,
    intro:
      'Indian forms rarely say “about 50 KB”. They say maximum 50 KB or between 20 and 50 KB. Missing the window by a few KB causes upload errors. Here is a reliable order of operations.',
    sections: [
      {
        h2: 'Resize pixels before you compress',
        paragraphs: [
          'Compression alone on a 4000-pixel-wide image either destroys quality or never reaches 20 KB. Set the official width and height first, then compress.',
        ],
      },
      {
        h2: 'Pick a target inside the allowed band',
        bullets: [
          'If allowed 20–50 KB, aim for ~35–45 KB.',
          'If max 100 KB, aiming for 70–90 KB preserves more detail.',
          'If max 200 KB (some NTA forms), do not over-compress.',
        ],
      },
      {
        h2: 'Steps with FormPhoto',
        steps: [
          'Resize with the correct exam preset.',
          'Open Compress Photo and enter the target KB.',
          'Download and verify the file size in your system properties.',
          'If the portal still rejects, try a target 2–3 KB lower (for max limits) or slightly higher (for minimum limits).',
        ],
      },
      {
        h2: 'Quality tips',
        paragraphs: [
          'Prefer JPEG for portal uploads. Avoid saving multiple generations of the same JPG (open → save → open → save), which stacks quality loss. Always go back to the resized master when adjusting compression.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does my file become 51 KB when I need 50 KB?',
        a: 'Encoders vary. Set target to 47–48 KB to stay safely under a 50 KB ceiling.',
      },
      {
        q: 'Does compression change pixel dimensions?',
        a: 'It should not. Confirm width and height after compression still match the form.',
      },
    ],
    relatedTools: [
      { label: 'Compress photo tool', to: '/compress' },
      { label: 'Photo resizer', to: '/photo-resizer' },
      { label: 'Rejection fixes guide', to: '/why-exam-photo-gets-rejected-and-how-to-fix' },
    ],
  },

  'neet-vs-jee-photo-size': {
    slug: 'neet-vs-jee-photo-size',
    title: 'NEET vs JEE Photo Size Requirements Compared (2026)',
    h1: 'NEET vs JEE Photo Size Requirements Compared (2026)',
    metaDescription:
      'NEET vs JEE Main photo and signature size 2026: shared 413×531 style photo rules, signature differences, KB limits, and free NTA-oriented tools.',
    keywords:
      'NEET vs JEE photo size, NEET photo size 2026, JEE Main signature size, NTA photo requirements',
    category: 'Comparisons',
    updated: '2026-08-01',
    readMinutes: 5,
    intro:
      'Both NEET (UG) and JEE Main are conducted under the NTA ecosystem and often share similar photograph dimensions. Signatures and exact KB bands can still differ. Prepare separate final files for each application.',
    sections: [
      {
        h2: 'Photo comparison',
        table: {
          headers: ['Item', 'NEET (UG)', 'JEE Main'],
          rows: [
            ['Typical pixels', '413 × 531', '413 × 531'],
            ['Typical KB', '10 – 200 KB', '10 – 200 KB'],
            ['Format', 'JPG', 'JPG'],
            ['Background', 'White', 'White'],
          ],
        },
      },
      {
        h2: 'Signature comparison',
        paragraphs: [
          'JEE Main notices have often listed a wider signature box (for example around 413 × 177 pixels) with a modest KB cap. NEET signature dimensions may differ in the information bulletin. Never assume one signature file fits both.',
        ],
      },
      {
        h2: 'Practical advice for engineering + medical aspirants',
        steps: [
          'Shoot one excellent original photo on white background.',
          'Export NEET-compliant photo and signature per the NEET bulletin.',
          'Export JEE-compliant set per the JEE Main bulletin.',
          'Run each pair through the application checker mindset: pixels, KB, format.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can one 413×531 photo serve both NEET and JEE?',
        a: 'Often yes for the photograph if KB limits match both bulletins. Still verify each year. Signatures should be prepared separately.',
      },
    ],
    relatedTools: [
      { label: 'NEET photo page', to: '/neet-photo-resizer-2026' },
      { label: 'JEE Main page', to: '/jee-main-photo-signature' },
      { label: 'Photo resizer', to: '/photo-resizer' },
    ],
  },

  'remove-background-exam-photo-guide': {
    slug: 'remove-background-exam-photo-guide',
    title: 'How to Remove Background from Exam Photo (Free Guide)',
    h1: 'How to Remove Background from Exam Photo (Free Guide)',
    metaDescription:
      'Remove photo background for SSC, UPSC, NEET and bank forms. Get a white background JPG that meets exam rules. Free browser tool, no upload.',
    keywords:
      'remove background exam photo, white background photo SSC, transparent to white background, exam photo background remover',
    category: 'How-to',
    updated: '2026-08-01',
    readMinutes: 5,
    intro:
      'If your only photo has a cluttered background, you can still produce a form-ready image: remove the background, place the subject on pure white, resize to official pixels, then compress to the KB limit.',
    sections: [
      {
        h2: 'When background removal is appropriate',
        bullets: [
          'Soft or uneven backgrounds that are almost plain',
          'Home photos where retake is hard before a deadline',
          'Signature scans with grey paper tone',
        ],
      },
      {
        h2: 'When you should retake instead',
        bullets: [
          'Face is blurred or poorly lit',
          'Heavy shadows across the face',
          'Profile or extreme angle',
          'Another person visible in the frame',
        ],
      },
      {
        h2: 'Recommended workflow',
        steps: [
          'Open Background Remover and upload your photo.',
          'Download a clean cut-out (transparent PNG).',
          'Place on a white canvas (or retake path if the cut-out is rough).',
          'Resize with the correct exam preset.',
          'Export JPG and compress to the allowed KB range.',
        ],
      },
      {
        h2: 'Quality check',
        paragraphs: [
          'Zoom in on hair edges and shoulders. Harsh halos or missing hair strands look unnatural at verification. When in doubt, retake on a real white wall — it still beats a bad cut-out.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do exams accept transparent PNG?',
        a: 'Usually no. Convert to JPG with a white background before upload.',
      },
    ],
    relatedTools: [
      { label: 'Background remover', to: '/background-remover' },
      { label: 'Photo resizer', to: '/photo-resizer' },
      { label: 'Compress tool', to: '/compress' },
    ],
  },

  'ibps-vs-sbi-photo-signature': {
    slug: 'ibps-vs-sbi-photo-signature',
    title: 'IBPS vs SBI Photo & Signature Requirements',
    h1: 'IBPS vs SBI Photo & Signature Requirements',
    metaDescription:
      'IBPS vs SBI PO/Clerk photo and signature size differences, KB limits, and thumb impression notes. Prepare bank exam uploads correctly.',
    keywords:
      'IBPS vs SBI photo size, SBI PO photo size, IBPS signature size, bank exam photo requirements',
    category: 'Comparisons',
    updated: '2026-08-01',
    readMinutes: 5,
    intro:
      'IBPS and SBI both recruit through online forms with photo and signature uploads, but pixel boxes and extra slots (like thumb impression) can differ by advertisement. Use this as a preparation guide, then match the PDF notice for your year.',
    sections: [
      {
        h2: 'What usually stays similar',
        bullets: [
          'Recent colour photograph, light background',
          'Clear handwritten signature in dark ink',
          'JPG format and tight KB limits',
          'Separate files for photo and signature',
        ],
      },
      {
        h2: 'What often differs',
        bullets: [
          'Exact pixel dimensions for photo and signature',
          'Whether left thumb impression is mandatory',
          'Maximum KB per slot',
          'Whether photo must be strictly square',
        ],
      },
      {
        h2: 'Safe preparation strategy',
        steps: [
          'Keep a master photo and master signature scan.',
          'For each bank form, read the live advertisement’s upload section.',
          'Resize and compress specifically for that form.',
          'If LTI is required, prepare it as its own JPG at the stated size.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I use IBPS photo file for SBI?',
        a: 'Only if SBI’s pixel and KB rules match. When in doubt, re-export for SBI.',
      },
    ],
    relatedTools: [
      { label: 'IBPS landing page', to: '/ibps-po-clerk-photo-signature' },
      { label: 'Exam size chart', to: '/exam-requirements' },
      { label: 'Signature under 20 KB guide', to: '/how-to-resize-signature-under-20kb' },
    ],
  },

  'rrb-photo-signature-preparation-guide': {
    slug: 'rrb-photo-signature-preparation-guide',
    title: 'RRB NTPC & Group D Photo Signature Preparation Guide',
    h1: 'RRB NTPC & Group D Photo & Signature Preparation Guide',
    metaDescription:
      'Prepare RRB NTPC and Group D photo (413×531, 15–50 KB) and signature for Railway recruitment. Step-by-step upload guide with free tools.',
    keywords:
      'RRB photo size, RRB NTPC photo, Group D signature size, railway recruitment photo guide',
    category: 'Exam guides',
    updated: '2026-08-01',
    readMinutes: 6,
    intro:
      'Railway Recruitment Board applications are unforgiving on file validation. This guide covers a practical NTPC / Group D style setup so you are not stuck at the upload step on deadline day.',
    sections: [
      {
        h2: 'Typical RRB digital specs',
        bullets: [
          'Photo: 413 × 531 px, about 15–50 KB, JPG, white background',
          'Signature: about 140 × 60 px, about 10–30 KB, JPG',
        ],
      },
      {
        h2: 'End-to-end checklist',
        steps: [
          'Read the CEN notification upload paragraph for your post.',
          'Capture photo on white background; verify face clarity.',
          'Resize photo with Railway preset; compress into 15–50 KB.',
          'Prepare signature; resize and compress to the signature limit.',
          'Store files with clear names before starting the multi-page form.',
          'After upload, use any preview the portal provides to confirm the image is not cropped wrongly.',
        ],
      },
      {
        h2: 'Document verification later',
        paragraphs: [
          'Keep printed copies consistent with what you uploaded. A completely different hairstyle or older photo can create avoidable questions at DV even if the online form accepted the file.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is Group D photo size same as NTPC?',
        a: 'Often aligned within a cycle, but always read the specific CEN. Re-export if numbers differ.',
      },
    ],
    relatedTools: [
      { label: 'RRB landing page', to: '/rrb-ntpc-group-d-photo-resizer' },
      { label: 'Photo resizer', to: '/photo-resizer?preset=railway' },
      { label: 'Application checker', to: '/application/rrb-ntpc' },
    ],
  },
};

export const getGuideBySlug = (slug) => GUIDE_PAGES[slug] || null;
export const GUIDE_SLUGS = Object.keys(GUIDE_PAGES);

export const GUIDE_LIST = GUIDE_SLUGS.map((slug) => {
  const g = GUIDE_PAGES[slug];
  return {
    slug: g.slug,
    title: g.title,
    category: g.category,
    readMinutes: g.readMinutes,
    metaDescription: g.metaDescription,
  };
});
