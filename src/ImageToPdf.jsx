import React, { useState, useRef } from 'react';
import SEOHead from './SEOHead';
import { formatFileSize } from './imageProcessor';
import './ImageToPdf.css';

const loadPdfLib = async () => { const mod = await import('pdf-lib'); return mod; };

export default function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [pageSize, setPageSize] = useState('fit');
  const [orientation, setOrientation] = useState('portrait');
  const [margin, setMargin] = useState(20);
  const [processing, setProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (!arr.length) { setError('Please select image files (JPG, PNG, WebP).'); return; }
    setError(null); setFiles(arr); setResultBlob(null); setPreviews(arr.map((f) => URL.createObjectURL(f)));
  };
  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const removeFile = (idx) => {
    const newFiles = files.filter((_, i) => i !== idx); const newPreviews = previews.filter((_, i) => i !== idx);
    URL.revokeObjectURL(previews[idx]); setFiles(newFiles); setPreviews(newPreviews); setResultBlob(null);
  };
  const moveFile = (idx, dir) => {
    const newIdx = idx + dir; if (newIdx < 0 || newIdx >= files.length) return;
    const newFiles = [...files], newPreviews = [...previews];
    [newFiles[idx], newFiles[newIdx]] = [newFiles[newIdx], newFiles[idx]];
    [newPreviews[idx], newPreviews[newIdx]] = [newPreviews[newIdx], newPreviews[idx]];
    setFiles(newFiles); setPreviews(newPreviews);
  };
  const getPageDims = (imgW, imgH) => {
    if (pageSize === 'fit') return { width: imgW * 0.75, height: imgH * 0.75 };
    let w = pageSize === 'a4' ? 595 : 612, h = pageSize === 'a4' ? 842 : 792;
    if (orientation === 'landscape') [w, h] = [h, w]; return { width: w, height: h };
  };
  const handleConvert = async () => {
    if (!files.length) return; setProcessing(true); setError(null); setResultBlob(null);
    try {
      const { PDFDocument } = await loadPdfLib(); const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer(); let image;
        if (file.type === 'image/png') image = await pdfDoc.embedPng(bytes);
        else {
          try { image = await pdfDoc.embedJpg(bytes); }
          catch {
            const img = await createImageBitmap(file); const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(img, 0, 0);
            const jpegBlob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.92));
            image = await pdfDoc.embedJpg(await jpegBlob.arrayBuffer());
          }
        }
        const { width: pageW, height: pageH } = getPageDims(image.width, image.height); const page = pdfDoc.addPage([pageW, pageH]);
        if (pageSize === 'fit') page.drawImage(image, { x: 0, y: 0, width: pageW, height: pageH });
        else {
          const scale = Math.min((pageW - margin * 2) / image.width, (pageH - margin * 2) / image.height, 1);
          const drawW = image.width * scale, drawH = image.height * scale;
          page.drawImage(image, { x: (pageW - drawW) / 2, y: (pageH - drawH) / 2, width: drawW, height: drawH });
        }
      }
      setResultBlob(new Blob([await pdfDoc.save()], { type: 'application/pdf' }));
    } catch (err) { console.error(err); setError(err.message || 'Failed to create PDF. Try converting images to JPG first.'); }
    finally { setProcessing(false); }
  };
  const handleDownload = () => { if (!resultBlob) return; const a = document.createElement('a'); a.href = URL.createObjectURL(resultBlob); a.download = `images-to-pdf-${Date.now()}.pdf`; a.click(); };

  return <div className="page-container image-to-pdf-page">
    <SEOHead title="Image to PDF Converter Free – JPG PNG to PDF Online" path="/image-to-pdf" keywords="image to pdf, jpg to pdf, png to pdf, convert images to pdf, multiple images to pdf" description="Convert JPG, PNG images to PDF online free. Merge multiple images into one PDF. 100% private – processing in your browser." />
    <header className="page-header"><h1>Free Image to PDF Converter – JPG & PNG to PDF</h1><p className="subtitle">Convert one or multiple JPG/PNG images into a single PDF document. Ideal for application forms, scanned pages and sharing. Fully private — conversion happens in your browser with no file upload.</p></header>
    <div className="tool-layout"><div className="controls-column glass-panel">
      <div className="multi-drop-zone" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => inputRef.current?.click()}><input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} /><div className="upload-icon">📄</div><p>Drop images here or click to browse</p><p className="upload-subtext">JPG, PNG, WebP • Multiple files supported</p></div>
      {files.length > 0 && <div className="file-list">{files.map((f, i) => <div key={i} className="file-item"><img src={previews[i]} alt="" className="thumb" /><span className="name">{f.name}</span><span className="size">{formatFileSize(f.size)}</span><div className="actions"><button onClick={() => moveFile(i, -1)} disabled={i === 0}>↑</button><button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1}>↓</button><button onClick={() => removeFile(i)}>✕</button></div></div>)}</div>}
      <div className="control-group"><label>Page Size</label><select value={pageSize} onChange={(e) => setPageSize(e.target.value)}><option value="fit">Fit to Image (1 image = 1 page)</option><option value="a4">A4</option><option value="letter">Letter</option></select></div>
      {pageSize !== 'fit' && <><div className="control-group"><label>Orientation</label><div className="mode-toggle"><button className={`mode-btn ${orientation === 'portrait' ? 'active' : ''}`} onClick={() => setOrientation('portrait')}>Portrait</button><button className={`mode-btn ${orientation === 'landscape' ? 'active' : ''}`} onClick={() => setOrientation('landscape')}>Landscape</button></div></div><div className="control-group"><label>Margin: {margin} pt</label><input type="range" min="0" max="60" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="size-slider" /></div></>}
      <div className="sticky-action-bar"><button className={`primary-button large-button hero-btn process-btn ${processing ? 'processing' : ''}`} onClick={handleConvert} disabled={!files.length || processing}>{processing ? <span className="spinner-text"><span className="spinner" /> Creating PDF...</span> : `Convert ${files.length || ''} Image${files.length !== 1 ? 's' : ''} to PDF`}</button></div>
      {error && <div className="error-message">{error}</div>}{resultBlob && <div className="result-box success-glow"><p>✅ PDF ready — {formatFileSize(resultBlob.size)}</p><button className="secondary-button large-button" onClick={handleDownload}>Download PDF</button></div>}
    </div><div className="preview-column">{previews.length === 0 ? <div className="preview-placeholder glass-panel"><div className="placeholder-icon">📑</div><p>Select one or more images to convert into a PDF</p></div> : <div className="preview-grid glass-panel">{previews.map((src, i) => <div key={i} className="grid-item"><img src={src} alt={`Page ${i + 1}`} /><span>Page {i + 1}</span></div>)}</div>}</div></div>
  </div>;
}
