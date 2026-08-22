import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import PresetSelector from '../components/PresetSelector';
import SEOHead from '../components/SEOHead';
import AdUnit from '../components/AdUnit';
import { resizeImage, resizeImageSmart, smartFixPhoto, getImageDimensions, formatFileSize } from '../utils/imageProcessor';
import { getPresetById } from '../utils/presets';
import './PhotoResizer.css';

export default function PhotoResizer() {
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [originalDims, setOriginalDims] = useState(null);
  
  const [presetId, setPresetId] = useState(searchParams.get('preset') || '');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [format, setFormat] = useState('jpeg');
  
  const [processing, setProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultPreview, setResultPreview] = useState(null);
  const [resultDims, setResultDims] = useState(null);
  const [error, setError] = useState(null);
  const [smartFix, setSmartFix] = useState(true);
  const [fixSteps, setFixSteps] = useState([]);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalPreview(url);
      getImageDimensions(file).then(dims => setOriginalDims(dims));
      return () => URL.revokeObjectURL(url);
    } else {
      setOriginalPreview(null);
      setOriginalDims(null);
    }
  }, [file]);

  useEffect(() => {
    if (presetId) {
      const preset = getPresetById(presetId);
      if (preset && preset.photo) {
        setWidth(preset.photo.width || '');
        setHeight(preset.photo.height || '');
        if (preset.photo.bgColor) setBgColor(preset.photo.bgColor);
        if (preset.photo.format) setFormat(preset.photo.format === 'png' ? 'png' : 'jpeg');
      }
    }
  }, [presetId]);

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setFixSteps([]);
    try {
      let result;
      const preset = getPresetById(presetId);
      if (smartFix && preset?.photo) {
        result = await smartFixPhoto(file, preset);
        setFixSteps(result.steps || []);
      } else if (smartFix && width && height) {
        result = await smartFixPhoto(file, {
          width: parseInt(width, 10),
          height: parseInt(height, 10),
          maxSize: preset?.photo?.maxSize || 300,
          bgColor,
          format,
        });
        setFixSteps(result.steps || []);
      } else {
        result = await resizeImageSmart(file, parseInt(width, 10), parseInt(height, 10), {
          bgColor,
          format: `image/${format}`,
          quality: 0.92,
          mode: 'cover',
        });
        setFixSteps(['Resized with smart crop (cover mode)']);
      }
      setResultBlob(result.blob);
      if (resultPreview) URL.revokeObjectURL(resultPreview);
      const url = URL.createObjectURL(result.blob);
      setResultPreview(url);
      const dims = await getImageDimensions(result.blob);
      setResultDims({ ...dims, size: result.size || dims.size });
    } catch (err) {
      setError(err.message || 'Error processing image');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="page-container photo-resizer-page">
      <SEOHead title="Photo Resizer for UPSC SSC IBPS NEET – Exact Pixel Size Free" path="/photo-resizer" keywords="photo resizer, resize photo to pixels, Indian form photo resizer, SSC photo resize, UPSC photo resize, passport photo resize, NEET photo resize" description="Free photo resizer for Indian forms. Exact UPSC, SSC, IBPS, SBI, NEET, JEE & Passport sizes. Resize in your browser – private, no upload." />
      
      <header className="page-header">
        <h1>Free Photo Resizer for UPSC, SSC, IBPS & NEET</h1>
        <p className="subtitle">
          Resize your photo to the exact pixel size and file limit required by Indian exams and forms.
          Choose a preset (UPSC, SSC, IBPS, SBI, NEET, JEE, Passport and more), or set custom dimensions.
          Everything runs privately in your browser — no upload, no account needed.
        </p>
      </header>

      <AdUnit enabled={false} slot="2222222222" />
      <div className="tool-layout">
        <div className="controls-column glass-panel">
          <FileUploader onFileSelect={setFile} label="Upload Photo" />
          
          <div className="control-group">
            <PresetSelector 
              type="photo" 
              selectedPreset={getPresetById(presetId)} 
              onSelect={(preset) => setPresetId(preset.id)} 
            />
          </div>


          <div className="control-group ai-fix-toggle">
            <label className="ai-toggle-label">
              <input
                type="checkbox"
                checked={smartFix}
                onChange={(e) => setSmartFix(e.target.checked)}
              />
              <span className="ai-toggle-text">
                <strong>✨ AI Auto-Fix</strong>
                <small>Enhance, clean background, smart crop &amp; match file size</small>
              </span>
            </label>
          </div>

          <div className="dimensions-row">
            <div className="input-wrapper">
              <label>Width (px)</label>
              <input 
                type="number" 
                value={width} 
                onChange={e => setWidth(e.target.value)} 
                placeholder="e.g. 350" 
              />
            </div>
            <div className="input-wrapper">
              <label>Height (px)</label>
              <input 
                type="number" 
                value={height} 
                onChange={e => setHeight(e.target.value)} 
                placeholder="e.g. 450" 
              />
            </div>
          </div>

          <div className="control-group">
            <label>Background Color</label>
            <div className="color-swatches">
              {['#ffffff', '#000000', '#f0f0f0', '#0000ff', '#ff0000'].map(c => (
                <button 
                  key={c}
                  className={`color-swatch ${bgColor === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setBgColor(c)}
                  title={c}
                  aria-label={`Select color ${c}`}
                />
              ))}
              <input 
                type="color" 
                value={bgColor} 
                onChange={e => setBgColor(e.target.value)} 
                className="color-picker-input"
              />
            </div>
          </div>

          <div className="control-group">
            <label>Output Format</label>
            <div className="format-toggle">
              <button 
                className={format === 'jpeg' ? 'active' : ''} 
                onClick={() => setFormat('jpeg')}
              >
                JPEG
              </button>
              <button 
                className={format === 'png' ? 'active' : ''} 
                onClick={() => setFormat('png')}
              >
                PNG
              </button>
            </div>
          </div>

          <div className="sticky-action-bar">
            <button 
              className={`primary-button large-button process-btn ${processing ? 'processing' : ''}`} 
              onClick={handleProcess} 
              disabled={!file || processing}
            >
              {processing ? (
                <span className="spinner-text">
                  <span className="spinner"></span> Processing...
                </span>
              ) : 'Resize Photo'}
            </button>
          </div>
          
          {fixSteps.length > 0 && (
            <ul className="fix-steps-list">
              {fixSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="preview-column">
          {!originalPreview ? (
            <div className="preview-placeholder glass-panel">
              <div className="placeholder-icon">📸</div>
              <p>Upload a photo to see preview</p>
            </div>
          ) : (
            <div className="preview-card glass-panel">
              <div className="preview-header">Original</div>
              <div className="preview-image-container">
                <img src={originalPreview} alt="Original preview" />
              </div>
              <div className="preview-badges">
                {originalDims && <span className="badge dim-badge">{originalDims.width} × {originalDims.height} px</span>}
                <span className="badge size-badge">{formatFileSize(file.size)}</span>
              </div>
            </div>
          )}

          {resultPreview && (
            <>
              <div className="arrow-divider">
                <div className="arrow-icon">↓</div>
              </div>
              <div className="preview-card glass-panel result-card">
                <div className="preview-header success-text">Resized Result</div>
                <div className="preview-image-container checkerboard">
                  <img src={resultPreview} alt="Processed result" />
                </div>
                <div className="preview-badges">
                  {resultDims && <span className="badge highlight dim-badge">{resultDims.width} × {resultDims.height} px</span>}
                  <span className="badge highlight size-badge">{formatFileSize(resultBlob.size)}</span>
                </div>
                <div className="action-row">
                  <a 
                    href={resultPreview} 
                    download={`resized_photo.${format}`} 
                    className="download-button"
                  >
                    Download Photo
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
