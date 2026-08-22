import React, { useState, useEffect } from 'react';
import FileUploader from '../components/FileUploader';
import SEOHead from '../components/SEOHead';
import { removeBackground, formatFileSize, getImageDimensions } from '../utils/imageProcessor';
import './BackgroundRemover.css';

export default function BackgroundRemover() {
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [originalDims, setOriginalDims] = useState(null);

  // Simple defaults – advanced options hidden by default
  const [tolerance, setTolerance] = useState(45);
  const [feather, setFeather] = useState(10);
  const [targetColor, setTargetColor] = useState('#ffffff');
  const [mode, setMode] = useState('auto');
  const [protectDark, setProtectDark] = useState(true);
  const [despeckle, setDespeckle] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultPreview, setResultPreview] = useState(null);
  const [resultDims, setResultDims] = useState(null);
  const [error, setError] = useState(null);
  const [detectedBg, setDetectedBg] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalPreview(url);
      getImageDimensions(file).then((dims) => setOriginalDims(dims));
      // Reset previous result when new file is selected
      setResultBlob(null);
      setResultPreview(null);
      setResultDims(null);
      setError(null);
      setDetectedBg(null);
      return () => URL.revokeObjectURL(url);
    }
    setOriginalPreview(null);
    setOriginalDims(null);
  }, [file]);

  // Cleanup result preview URL
  useEffect(() => {
    return () => {
      if (resultPreview) URL.revokeObjectURL(resultPreview);
    };
  }, [resultPreview]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [255, 255, 255];
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    if (resultPreview) URL.revokeObjectURL(resultPreview);
    setResultBlob(null);
    setResultPreview(null);
    setDetectedBg(null);

    try {
      const color = mode === 'color' ? hexToRgb(targetColor) : [255, 255, 255];
      const result = await removeBackground(file, {
        mode,
        tolerance,
        feather,
        targetColor: color,
        protectDark,
        despeckle,
      });

      setResultBlob(result.blob);
      const url = URL.createObjectURL(result.blob);
      setResultPreview(url);
      setResultDims({ width: result.width, height: result.height, size: result.size });
      if (result.detectedBg) {
        setDetectedBg(
          `rgb(${result.detectedBg[0]}, ${result.detectedBg[1]}, ${result.detectedBg[2]})`
        );
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not remove background. Try a clearer photo or adjust settings.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(resultBlob);
    const base = file?.name?.replace(/\.[^.]+$/, '') || 'photo';
    a.download = `${base}-no-bg.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleReset = () => {
    setFile(null);
    setResultBlob(null);
    setResultPreview(null);
    setError(null);
  };

  return (
    <div className="page-container bg-remover-page">
      <SEOHead
        title="Background Remover Online Free – Transparent PNG"
        path="/background-remover"
        keywords="background remover, remove background, transparent png, photo background remover free"
        description="Remove photo or signature background free. Get a transparent PNG in one click. Private – files never leave your browser."
      />

      <header className="page-header">
        <h1>Free Background Remover – Transparent PNG Online</h1>
        <p className="subtitle">
          Remove the background from any photo or signature and download a clean transparent PNG.
          Ideal for form photos, passport-style images and signatures. One click, fully private —
          your file never leaves your browser.
        </p>
      </header>

      <div className="tool-layout">
        <div className="controls-column glass-panel">
          {/* Step 1 */}
          <div className="step-label">1. Upload image</div>
          <FileUploader onFileSelect={setFile} label="Upload Photo or Signature" maxSizeMB={12} />

          {file && (
            <>
              {/* Step 2 – main action */}
              <div className="step-label">2. Remove background</div>
              <div className="sticky-action-bar">
                <button
                  type="button"
                  className={`primary-button large-button hero-btn process-btn ${processing ? 'processing' : ''}`}
                  onClick={handleProcess}
                  disabled={processing}
                >
                  {processing ? (
                    <span className="spinner-text">
                      <span className="spinner" /> Removing…
                    </span>
                  ) : (
                    '🪄 Remove Background'
                  )}
                </button>
              </div>

              {/* Advanced settings (collapsed) */}
              <button
                type="button"
                className="advanced-toggle"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                {showAdvanced ? '▼ Hide advanced settings' : '▶ Advanced settings (optional)'}
              </button>

              {showAdvanced && (
                <div className="advanced-panel">
                  <div className="control-group">
                    <label>Mode</label>
                    <div className="mode-toggle three-modes">
                      <button
                        type="button"
                        className={`mode-btn ${mode === 'auto' ? 'active' : ''}`}
                        onClick={() => setMode('auto')}
                      >
                        Auto
                      </button>
                      <button
                        type="button"
                        className={`mode-btn ${mode === 'flood' ? 'active' : ''}`}
                        onClick={() => setMode('flood')}
                      >
                        Flood
                      </button>
                      <button
                        type="button"
                        className={`mode-btn ${mode === 'color' ? 'active' : ''}`}
                        onClick={() => setMode('color')}
                      >
                        Color
                      </button>
                    </div>
                    <small className="help-text">
                      {mode === 'auto' && 'Best for white / studio backgrounds'}
                      {mode === 'flood' && 'Safest for complex subjects'}
                      {mode === 'color' && 'Removes a specific color everywhere'}
                    </small>
                  </div>

                  {mode === 'color' && (
                    <div className="control-group">
                      <label>Target color</label>
                      <input
                        type="color"
                        value={targetColor}
                        onChange={(e) => setTargetColor(e.target.value)}
                        className="color-picker"
                      />
                    </div>
                  )}

                  <div className="control-group">
                    <label>Tolerance: {tolerance}</label>
                    <input
                      type="range"
                      min="5"
                      max="140"
                      value={tolerance}
                      onChange={(e) => setTolerance(Number(e.target.value))}
                    />
                    <small className="help-text">Higher = removes more background</small>
                  </div>

                  <div className="control-group">
                    <label>Edge softener: {feather}</label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={feather}
                      onChange={(e) => setFeather(Number(e.target.value))}
                    />
                  </div>

                  <div className="toggles-row">
                    <label className="ai-toggle-label">
                      <input
                        type="checkbox"
                        checked={protectDark}
                        onChange={(e) => setProtectDark(e.target.checked)}
                      />
                      <span className="ai-toggle-text">
                        <strong>Protect dark ink / hair</strong>
                        <small>Keeps signatures and dark areas solid</small>
                      </span>
                    </label>
                    <label className="ai-toggle-label">
                      <input
                        type="checkbox"
                        checked={despeckle}
                        onChange={(e) => setDespeckle(e.target.checked)}
                      />
                      <span className="ai-toggle-text">
                        <strong>Clean edges</strong>
                        <small>Removes tiny dots and holes</small>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}
              {detectedBg && !error && (
                <p className="help-text detected-bg">
                  Detected background ≈ <span style={{ color: detectedBg }}>{detectedBg}</span>
                </p>
              )}

              {/* Step 3 – download */}
              {resultBlob && (
                <>
                  <div className="step-label">3. Download</div>
                  <button
                    type="button"
                    className="secondary-button large-button download-cta"
                    onClick={handleDownload}
                  >
                    Download Transparent PNG
                  </button>
                  <button type="button" className="text-btn" onClick={handleReset}>
                    Start over with another image
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <div className="preview-column">
          {!originalPreview ? (
            <div className="preview-placeholder glass-panel">
              <div className="placeholder-icon">🪄</div>
              <p>Upload a photo or signature</p>
              <p className="hint">Works best with plain white or light backgrounds</p>
            </div>
          ) : (
            <div className="comparison-container glass-panel">
              <div className="preview-card">
                <div className="preview-header">Original</div>
                <div className="preview-image-container checkered">
                  <img src={originalPreview} alt="Original" />
                </div>
                {originalDims && (
                  <div className="preview-badges center">
                    <span className="badge">
                      {originalDims.width}×{originalDims.height}
                    </span>
                    <span className="badge size-badge">{formatFileSize(file.size)}</span>
                  </div>
                )}
              </div>

              {resultPreview && (
                <>
                  <div className="arrow-divider horizontal">
                    <div className="arrow-icon">→</div>
                  </div>
                  <div className="preview-card result-card success-glow">
                    <div className="preview-header">Background Removed (PNG)</div>
                    <div className="preview-image-container checkered">
                      <img src={resultPreview} alt="Result" />
                    </div>
                    {resultDims && (
                      <div className="preview-badges center">
                        <span className="badge">
                          {resultDims.width}×{resultDims.height}
                        </span>
                        <span className="badge highlight size-badge">
                          {formatFileSize(resultBlob.size)}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="tips-section glass-panel">
        <h3>💡 Quick tips</h3>
        <ul>
          <li>
            <strong>One click is enough</strong> for most passport photos and signatures on white paper.
          </li>
          <li>
            If some background remains, open <strong>Advanced settings</strong> and raise Tolerance.
          </li>
          <li>
            If hair or ink disappears, enable <strong>Protect dark ink / hair</strong>.
          </li>
          <li>Download is always a transparent PNG – ready for form uploads.</li>
        </ul>
      </div>
    </div>
  );
}
