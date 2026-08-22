import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import SEOHead from './SEOHead';
import AdUnit from './AdUnit';
import { compressToExactKB, formatFileSize } from './imageProcessor';
import './CompressPhoto.css';

export default function CompressPhoto() {
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [targetSize, setTargetSize] = useState(50);
  const [tolerance, setTolerance] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultPreview, setResultPreview] = useState(null);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setOriginalPreview(null);
  }, [file]);

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultPreview(null);
    setMetrics(null);
    try {
      const result = await compressToExactKB(file, targetSize, tolerance);
      const blob = result.blob || result;
      setResultBlob(blob);
      setResultPreview(URL.createObjectURL(blob));
      const actualSize = blob.size;
      const reduction = ((file.size - actualSize) / file.size * 100).toFixed(1);
      const isSuccess = Math.abs((actualSize / 1024) - targetSize) <= tolerance;
      setMetrics({ actualSize, reduction, isSuccess, iterations: result.iterations || null, quality: result.quality || null });
    } catch (err) {
      setError(err.message || 'Compression failed. Please try a different image or target size.');
    } finally {
      setProcessing(false);
    }
  };

  const handleQuickSize = (size) => setTargetSize(size);
  const quickSizes = [20, 30, 50, 100, 200, 300];
  const presetForms = [
    { name: 'IBPS', size: 50 }, { name: 'SSC', size: 50 }, { name: 'UPSC', size: 300 },
    { name: 'NEET', size: 200 }, { name: 'JEE', size: 200 }, { name: 'Passport', size: 100 }
  ];

  return (
    <div className="page-container compress-page">
      <SEOHead title="Compress Photo to 20KB 50KB 100KB Free – Image Compressor" path="/compress" keywords="compress photo to 20kb, compress photo to 50kb, compress image to 100kb, photo compressor, image compressor, compress JPG to KB" description="Compress photo to exact KB size online free. Hit 20KB, 50KB, 100KB limits for SSC, UPSC, IBPS, NEET forms. Private – no upload." />
      <header className="page-header">
        <h1>Compress Photo to Exact KB Size (20KB, 50KB, 100KB)</h1>
        <p className="subtitle">Reduce your photo to any target file size in KB — perfect for SSC, UPSC, IBPS, NEET and other form uploads. Hit limits like 20KB, 50KB or 100KB within ±1KB. Runs entirely in your browser so your image never leaves your device.</p>
      </header>
      <AdUnit enabled={false} slot="2222222222" />
      <div className="tool-layout">
        <div className="controls-column glass-panel">
          <FileUploader onFileSelect={setFile} label="Upload Photo to Compress" />
          <div className="target-size-section glass-inner">
            <div className="hero-input-wrapper"><label>Target Size (KB)</label><div className="big-input-container"><input type="number" value={targetSize} onChange={e => setTargetSize(Number(e.target.value))} min="1" max="10000" className="hero-input" /><span className="unit">KB</span></div></div>
            <input type="range" min="5" max="500" value={targetSize} onChange={e => setTargetSize(Number(e.target.value))} className="size-slider" />
            <div className="quick-buttons row">{quickSizes.map(s => <button type="button" key={s} className={`quick-btn ${targetSize === s ? 'active' : ''}`} onClick={() => handleQuickSize(s)}>{s}KB</button>)}</div>
          </div>
          <div className="form-presets-section"><label>Popular Form Presets:</label><div className="quick-buttons wrap">{presetForms.map(form => <button type="button" key={form.name} className="preset-btn" onClick={() => handleQuickSize(form.size)} title={`Set to ${form.size}KB for ${form.name}`}>{form.name} ({form.size}KB)</button>)}</div></div>
          <div className="advanced-toggle"><button type="button" className="text-btn" onClick={() => setShowAdvanced(!showAdvanced)}>{showAdvanced ? 'Hide Advanced Options ↑' : 'Advanced Options ↓'}</button></div>
          {showAdvanced && <div className="advanced-section glass-inner slide-down"><div className="input-wrapper"><label>Tolerance (± KB)</label><input type="number" value={tolerance} onChange={e => setTolerance(Number(e.target.value))} min="0.1" max="50" step="0.1" /><small className="help-text">How close to the target size the result needs to be.</small></div></div>}
          <div className="sticky-action-bar"><button type="button" className={`primary-button large-button hero-btn process-btn ${processing ? 'processing' : ''}`} onClick={handleProcess} disabled={!file || processing}>{processing ? <span className="spinner-text"><span className="spinner" /> Compressing... Finding optimal quality</span> : 'Compress Photo'}</button></div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="preview-column">
          {!originalPreview ? <div className="preview-placeholder glass-panel"><div className="placeholder-icon">🗜️</div><p>Upload a photo to start compressing</p></div> : <div className="comparison-container glass-panel">
            <div className="preview-card"><div className="preview-header">Original Image</div><div className="preview-image-container"><img src={originalPreview} alt="Original" /></div><div className="preview-badges center"><span className="badge size-badge">{formatFileSize(file.size)}</span></div></div>
            {resultPreview && <><div className="arrow-divider horizontal"><div className="arrow-icon">→</div></div><div className={`preview-card result-card ${metrics?.isSuccess ? 'success-glow' : 'warn-glow'}`}><div className="preview-header flex-between">Compressed Result {metrics?.isSuccess ? <span className="status-icon success" title="Within tolerance">✅</span> : <span className="status-icon warn" title="Outside tolerance">⚠️</span>}</div><div className="preview-image-container"><img src={resultPreview} alt="Compressed result" /></div><div className="preview-badges center multi"><span className="badge highlight size-badge success-text">{formatFileSize(resultBlob.size)}</span><span className="badge reduction-badge">-{metrics?.reduction}% smaller</span></div>{metrics && <div className="metrics-details">{metrics.quality && <span>Quality: {(metrics.quality * 100).toFixed(0)}%</span>}{metrics.iterations && <span>Converged in {metrics.iterations} iterations</span>}</div>}{!metrics?.isSuccess && <div className="warn-message">Hard to reach exactly {targetSize}KB. Try resizing dimensions first.</div>}<a href={resultPreview} download={`compressed_${Math.round(resultBlob.size/1024)}kb.jpg`} className="download-button hero-download">Download ({formatFileSize(resultBlob.size)})</a></div></>}
          </div>}
        </div>
      </div>
    </div>
  );
}
