import React, { useState, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import { formatFileSize } from '../utils/imageProcessor';
import './PdfCompress.css';

const QUALITY_PRESETS = {
  low: { scale: 1.0, quality: 0.4, label: 'Low (smallest)' },
  medium: { scale: 1.5, quality: 0.65, label: 'Medium (balanced)' },
  high: { scale: 2.0, quality: 0.85, label: 'High (better quality)' },
};

export default function PdfCompress() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('medium');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [resultBlob, setResultBlob] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f || f.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }
    setError(null);
    setFile(f);
    setResultBlob(null);
    setMetrics(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResultBlob(null);
    setMetrics(null);
    setProgress('Loading libraries...');

    try {
      // Dynamic imports – only load when user clicks Compress (avoids main.jsx / build issues)
      const pdfjs = await import('pdfjs-dist');
      const { PDFDocument } = await import('pdf-lib');

      // Worker for pdf.js (Vite-compatible)
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();

      setProgress('Reading PDF...');
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const { scale, quality } = QUALITY_PRESETS[preset];
      const newPdf = await PDFDocument.create();

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Compressing page ${i} of ${numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        // Limit canvas size to avoid browser memory issues
        const maxDim = 4096;
        let renderScale = scale;
        if (viewport.width > maxDim || viewport.height > maxDim) {
          renderScale =
            scale * Math.min(maxDim / viewport.width, maxDim / viewport.height);
        }
        const renderViewport = page.getViewport({ scale: renderScale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(renderViewport.width);
        canvas.height = Math.floor(renderViewport.height);
        const ctx = canvas.getContext('2d');

        await page.render({
          canvasContext: ctx,
          viewport: renderViewport,
        }).promise;

        const jpegBlob = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create image'))),
            'image/jpeg',
            quality
          );
        });

        const jpegBytes = await jpegBlob.arrayBuffer();
        const image = await newPdf.embedJpg(jpegBytes);

        // Original page size in PDF points
        const origViewport = page.getViewport({ scale: 1 });
        const pageWidth = origViewport.width;
        const pageHeight = origViewport.height;

        const pdfPage = newPdf.addPage([pageWidth, pageHeight]);
        pdfPage.drawImage(image, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });

        canvas.width = 0;
        canvas.height = 0;
      }

      setProgress('Saving PDF...');
      const pdfBytes = await newPdf.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResultBlob(blob);

      const reduction = (((file.size - blob.size) / file.size) * 100).toFixed(1);
      setMetrics({
        original: file.size,
        compressed: blob.size,
        reduction,
        pages: numPages,
      });
      setProgress('');
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          'Compression failed. The PDF may be encrypted, password-protected, or corrupted.'
      );
      setProgress('');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(resultBlob);
    a.download = `compressed-${file?.name || 'document'}.pdf`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="page-container pdf-compress-page">
      <SEOHead
        title="PDF Compress Online Free – Reduce PDF File Size"
        path="/pdf-compress"
        keywords="pdf compress, compress pdf online, reduce pdf size, pdf compressor free"
        description="Compress PDF files online free. Reduce PDF size while keeping quality. Private – files never leave your browser."
      />

      <header className="page-header">
        <h1>Free PDF Compress – Reduce PDF File Size Online</h1>
        <p className="subtitle">
          Shrink large PDF files by re-encoding pages as optimized images. Perfect for email
          attachments and form uploads that have strict size limits. Processing is done entirely in
          your browser — your document never leaves your device.
        </p>
      </header>

      <div className="tool-layout single-col">
        <div className="controls-column glass-panel centered">
          <div
            className="multi-drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className="upload-icon">📑</div>
            <p>{file ? file.name : 'Drop a PDF here or click to browse'}</p>
            {file && <span className="file-size">{formatFileSize(file.size)}</span>}
          </div>

          {file && (
            <>
              <div className="control-group">
                <label>Compression Level</label>
                <div className="preset-grid">
                  {Object.entries(QUALITY_PRESETS).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      className={`preset-card ${preset === key ? 'active' : ''}`}
                      onClick={() => setPreset(key)}
                      disabled={processing}
                    >
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
                      <span>{val.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sticky-action-bar">
                <button
                  type="button"
                  className={`primary-button large-button hero-btn process-btn ${processing ? 'processing' : ''}`}
                  onClick={handleCompress}
                  disabled={processing}
                >
                  {processing ? (
                    <span className="spinner-text">
                      <span className="spinner"></span> {progress || 'Compressing...'}
                    </span>
                  ) : (
                    'Compress PDF'
                  )}
                </button>
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          {resultBlob && metrics && (
            <div className="result-box success-glow">
              <h3>Compression Complete</h3>
              <div className="metrics-row">
                <div>
                  <span className="label">Original</span>
                  <strong>{formatFileSize(metrics.original)}</strong>
                </div>
                <div className="arrow">→</div>
                <div>
                  <span className="label">Compressed</span>
                  <strong className="success-text">{formatFileSize(metrics.compressed)}</strong>
                </div>
              </div>
              <p className="reduction">
                {metrics.reduction > 0
                  ? `−${metrics.reduction}% smaller`
                  : 'Size similar (already optimized)'}
                {' • '}
                {metrics.pages} page{metrics.pages !== 1 ? 's' : ''}
              </p>
              <button
                type="button"
                className="secondary-button large-button"
                onClick={handleDownload}
              >
                Download Compressed PDF
              </button>
              <p className="note">
                Note: Text becomes non-selectable (rasterized). Best for visual documents & forms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
