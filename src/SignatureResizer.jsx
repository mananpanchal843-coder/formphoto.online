import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FileUploader from './FileUploader';
import PresetSelector from './PresetSelector';
import SEOHead from './SEOHead';
import {
  resizeImage,
  smartFixSignature,
  getImageDimensions,
  formatFileSize,
} from './imageProcessor';
import { getPresetById } from './presets';
import './SignatureResizer.css';

export default function SignatureResizer() {
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [originalDims, setOriginalDims] = useState(null);
  const [presetId, setPresetId] = useState(searchParams.get('preset') || '');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
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
      getImageDimensions(file).then((dims) => setOriginalDims(dims));
      return () => URL.revokeObjectURL(url);
    }
    setOriginalPreview(null);
    setOriginalDims(null);
  }, [file]);

  useEffect(() => {
    if (presetId) {
      const preset = getPresetById(presetId);
      if (preset?.signature) {
        setWidth(preset.signature.width || '');
        setHeight(preset.signature.height || '');
      }
    }
  }, [presetId]);

  const handleProcess = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setFixSteps([]);
    setResultBlob(null);
    setResultPreview(null);

    try {
      let result;
      const preset = getPresetById(presetId);
      const targetW = parseInt(width, 10);
      const targetH = parseInt(height, 10);

      if (smartFix && (preset?.signature || (targetW && targetH))) {
        const options = preset?.signature ? preset : { width: targetW, height: targetH, maxSize: 30 };
        result = await smartFixSignature(file, options);
        setFixSteps(result.steps || []);
      } else {
        if (!targetW || !targetH) throw new Error('Please enter width and height, or select an exam preset.');
        const isTransparent = bgColor === 'transparent';
        result = await resizeImage(file, targetW, targetH, {
          bgColor: isTransparent ? 'transparent' : bgColor,
          format: isTransparent ? 'image/png' : 'image/jpeg',
          quality: 0.92,
        });
        setFixSteps(['Resized to target size']);
      }

      setResultBlob(result.blob);
      if (resultPreview) URL.revokeObjectURL(resultPreview);
      const url = URL.createObjectURL(result.blob);
      setResultPreview(url);
      const dims = await getImageDimensions(result.blob);
      setResultDims({ ...dims, size: result.size || dims.size });
    } catch (err) {
      setError(err.message || 'Error processing signature');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(resultBlob);
    a.download = `resized_signature_${Date.now()}.${resultBlob.type === 'image/png' ? 'png' : 'jpg'}`;
    a.click();
  };

  return (
    <div className="page-container sig-resizer-page">
      <SEOHead title="Signature Resizer Online Free – Bank SSC IBPS UPSC Forms" path="/signature-resizer" keywords="signature resizer, resize signature, signature resize for forms, SSC signature size, IBPS signature size, NEET signature size, free signature resizer" description="Free signature resizer for Indian bank and exam forms. Exact pixel sizes for SSC, IBPS, SBI, UPSC, NEET. Clean ink, white background, private browser tool." />
      <header className="page-header">
        <h1>Free Signature Resizer for Bank &amp; Exam Forms</h1>
        <p className="subtitle">Resize and clean your signature to the exact pixel size required by SSC, IBPS, SBI, UPSC, NEET and other Indian forms. Get a clear ink signature on a white background in one click. Fully private — processing stays in your browser.</p>
      </header>
      <div className="tool-layout">
        <div className="controls-column glass-panel">
          <FileUploader onFileSelect={setFile} label="Upload Signature" />
          <div className="control-group"><PresetSelector type="signature" selectedPreset={getPresetById(presetId)} onSelect={(preset) => setPresetId(preset.id)} /></div>
          <div className="control-group ai-fix-toggle"><label className="ai-toggle-label"><input type="checkbox" checked={smartFix} onChange={(e) => setSmartFix(e.target.checked)} /><span className="ai-toggle-text"><strong>✨ AI Auto-Fix</strong><small>Clean ink, remove noise, white bg &amp; fit exact size</small></span></label></div>
          <div className="dimensions-row"><div className="input-wrapper"><label>Width (px)</label><input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 140" min="10" max="2000" /></div><div className="input-wrapper"><label>Height (px)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 60" min="10" max="2000" /></div></div>
          {!smartFix && <div className="control-group"><label>Background</label><div className="format-toggle"><button type="button" className={bgColor === '#ffffff' ? 'active' : ''} onClick={() => setBgColor('#ffffff')}>White</button><button type="button" className={bgColor === 'transparent' ? 'active' : ''} onClick={() => setBgColor('transparent')}>Transparent</button></div></div>}
          <div className="sticky-action-bar"><button type="button" className={`primary-button large-button process-btn ${processing ? 'processing' : ''}`} onClick={handleProcess} disabled={!file || processing}>{processing ? <span className="spinner-text"><span className="spinner" /> Processing...</span> : 'Resize Signature'}</button></div>
          {fixSteps.length > 0 && <ul className="fix-steps-list">{fixSteps.map((s, i) => <li key={i}>{s}</li>)}</ul>}
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="preview-column">
          {!originalPreview ? <div className="preview-placeholder glass-panel"><div className="placeholder-icon">✍️</div><p>Upload a signature to see preview</p></div> : <div className="preview-card glass-panel"><div className="preview-header">Original</div><div className="preview-image-container checkerboard"><img src={originalPreview} alt="Original signature" className="sig-img" /></div><div className="preview-badges">{originalDims && <span className="badge dim-badge">{originalDims.width} × {originalDims.height} px</span>}<span className="badge size-badge">{formatFileSize(file.size)}</span></div></div>}
          {resultPreview && <><div className="arrow-divider"><div className="arrow-icon">↓</div></div><div className="preview-card glass-panel result-card"><div className="preview-header success-text">Resized Signature</div><div className="preview-image-container checkerboard"><img src={resultPreview} alt="Processed signature" className="sig-img" /></div><div className="preview-badges">{resultDims && <span className="badge highlight dim-badge">{resultDims.width} × {resultDims.height} px</span>}<span className="badge highlight size-badge">{formatFileSize(resultBlob.size)}</span></div><div className="action-row"><button type="button" className="download-button" onClick={handleDownload}>Download Signature</button></div></div></>}
        </div>
      </div>
      <div className="tips-section glass-panel mt-4"><h3>💡 Tips for a Perfect Signature</h3><ul><li>Use a thick black or dark blue pen on unlined white paper.</li><li>Ensure good lighting without harsh shadows when taking a photo.</li><li>Crop the image tightly around the signature before uploading if possible.</li><li>Many forms require specific dimensions (e.g. 140×60 px for SSC / IBPS). Select the exam preset above for exact sizes.</li><li>Enable <strong>AI Auto-Fix</strong> to automatically clean noise, force white background, and fit the signature cleanly inside the required box.</li></ul></div>
    </div>
  );
}
