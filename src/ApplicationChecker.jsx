import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SEOHead from './SEOHead';
import {
  APPLICATION_CATEGORIES,
  getApplicationById,
  searchApplications,
} from './data/applicationRequirements';
import { validateAgainstSlot, computeReadiness } from './fileAnalyzer';
import {
  smartFixPhoto,
  smartFixSignature,
  compressToExactKB,
  resizeImageSmart,
} from './imageProcessor';
import './ApplicationChecker.css';

const statusLabel = { pass: 'Passed', warning: 'Needs review', fail: 'Failed', empty: 'Not uploaded' };

export default function ApplicationChecker() {
  const { appId: rawAppId } = useParams();
  const navigate = useNavigate();
  const appId = rawAppId ? rawAppId.replace(/-photo-signature-checker$/i, '').replace(/-checker$/i, '') : null;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [selected, setSelected] = useState(() => (appId ? getApplicationById(appId) : null));
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [results, setResults] = useState({});
  const [busy, setBusy] = useState(null);
  const inputRefs = useRef({});

  const filtered = useMemo(() => searchApplications(query, category), [query, category]);
  const readiness = selected ? computeReadiness(results, selected.slots) : null;

  const selectApp = (app) => {
    setSelected(app);
    setFiles({});
    setPreviews({});
    setResults({});
    navigate(`/application/${app.id}-photo-signature-checker`, { replace: true });
  };

  const handleFile = async (slot, file) => {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setResults((p) => ({ ...p, [slot.id]: { status: 'fail', summary: 'File exceeds 15 MB', issues: [], fixes: [] } }));
      return;
    }
    setBusy(slot.id);
    try {
      if (previews[slot.id]) URL.revokeObjectURL(previews[slot.id]);
      const url = URL.createObjectURL(file);
      setFiles((p) => ({ ...p, [slot.id]: file }));
      setPreviews((p) => ({ ...p, [slot.id]: url }));
      const result = await validateAgainstSlot(file, slot);
      setResults((p) => ({ ...p, [slot.id]: result }));
    } catch (e) {
      setResults((p) => ({ ...p, [slot.id]: { status: 'fail', summary: e.message || 'Analysis failed', issues: [], fixes: [] } }));
    } finally {
      setBusy(null);
    }
  };

  const removeFile = (slotId) => {
    if (previews[slotId]) URL.revokeObjectURL(previews[slotId]);
    setFiles((p) => { const n = { ...p }; delete n[slotId]; return n; });
    setPreviews((p) => { const n = { ...p }; delete n[slotId]; return n; });
    setResults((p) => { const n = { ...p }; delete n[slotId]; return n; });
  };

  const fixSlot = async (slot, fix) => {
    const file = files[slot.id];
    if (!file) return;
    setBusy(slot.id);
    try {
      let blob;
      if (fix.action === 'compress') {
        blob = (await compressToExactKB(file, fix.targetKb || slot.maxSizeKb, 1)).blob;
      } else if (fix.action === 'resize' || fix.action === 'convert-jpg') {
        blob = (await resizeImageSmart(file, slot.width, slot.height, { mode: slot.type === 'signature' ? 'contain' : 'cover', bgColor: '#fff', format: 'image/jpeg', quality: 0.92 })).blob;
        if (slot.maxSizeKb && blob.size > slot.maxSizeKb) blob = (await compressToExactKB(blob, slot.maxSizeKb, 1)).blob;
      } else if (slot.type === 'signature') {
        blob = (await smartFixSignature(file, { width: slot.width || 140, height: slot.height || 60, maxSize: slot.maxSizeKb || 20 })).blob;
      } else {
        blob = (await smartFixPhoto(file, { width: slot.width, height: slot.height, maxSize: slot.maxSizeKb, bgColor: '#fff', format: 'jpeg' })).blob;
      }
      await handleFile(slot, new File([blob], `${slot.id}-fixed.jpg`, { type: 'image/jpeg' }));
    } catch (e) {
      alert(e.message || 'Could not fix this file');
      setBusy(null);
    }
  };

  const download = (slot) => {
    const file = files[slot.id];
    if (!file) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = file.name || `${slot.id}-ready.jpg`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const allPassed = selected && selected.slots.filter((s) => s.required !== false).every((s) => ['pass', 'warning'].includes(results[s.id]?.status));

  return (
    <div className="checker-page">
      <SEOHead title={selected ? `${selected.name} Photo & Signature Checker – FormPhoto` : 'Application Upload Checker – FormPhoto'} path={selected ? `/application/${selected.id}-photo-signature-checker` : '/application-checker'} description="Check application photos and signatures against file size and dimension requirements. Private browser processing." />
      <header className="checker-hero">
        <h1>{selected ? `${selected.name} Photo & Signature Upload Checker` : 'Application Photo & Signature Upload Checker'}</h1>
        <p>Select your exam or application, upload the required files, and check dimensions, KB limits and formats directly in your browser.</p>
        <div className="privacy-badge">🔒 Files stay on your device</div>
      </header>

      {!selected ? (
        <section className="checker-selector">
          <h2>What are you applying for?</h2>
          <input className="app-search" type="search" placeholder="Search SSC, UPSC, NEET, IBPS…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="category-chips">
            <button type="button" className={`chip ${!category ? 'active' : ''}`} onClick={() => setCategory(null)}>All</button>
            {APPLICATION_CATEGORIES.map((c) => <button type="button" className={`chip ${category === c ? 'active' : ''}`} key={c} onClick={() => setCategory(c)}>{c}</button>)}
          </div>
          <div className="app-list">
            {filtered.map((app) => <button type="button" className="app-card" key={app.id} onClick={() => selectApp(app)}><strong>{app.name}</strong><span>{app.organization}</span></button>)}
          </div>
        </section>
      ) : (
        <>
          <div className="selected-app-bar"><div><h2>{selected.name}</h2><span>{selected.organization} · {selected.lastVerified}</span></div><button type="button" className="change-app-btn" onClick={() => { setSelected(null); navigate('/application-checker', { replace: true }); }}>Change application</button></div>
          {readiness && Object.keys(files).length > 0 && <div className="readiness-card"><div className={`readiness-score ${readiness.score >= 100 ? 'pass' : readiness.score >= 70 ? 'warn' : 'fail'}`}>{readiness.score}</div><div><h3>Application Readiness</h3><p>{readiness.ready}/{readiness.total} files ready · {readiness.label}</p></div></div>}
          {allPassed && <div className="success-banner"><h2>🎉 Your files look ready</h2><p>All required files meet the listed limits. Always verify the latest official notification before submitting.</p></div>}
          <div className="slot-grid">
            {selected.slots.map((slot) => {
              const result = results[slot.id];
              const file = files[slot.id];
              return <article className={`slot-card ${result ? `status-${result.status}` : ''}`} key={slot.id}>
                <div className="slot-header"><div><h3>{slot.label}{slot.required ? '' : ' (optional)'}</h3><div className="slot-req">{(slot.formats || []).join(' / ').toUpperCase()} {slot.minSizeKb != null && slot.maxSizeKb != null ? `· ${slot.minSizeKb}–${slot.maxSizeKb} KB` : slot.maxSizeKb ? `· max ${slot.maxSizeKb} KB` : ''} {slot.width && slot.height ? `· ${slot.width}×${slot.height} px` : ''}</div></div><span className={`status-pill ${result?.status || 'empty'}`}>{busy === slot.id ? 'Checking…' : statusLabel[result?.status || 'empty']}</span></div>
                {!file ? <div className="slot-drop" onClick={() => inputRefs.current[slot.id]?.click()}><strong>Upload {slot.label}</strong><span>Click to choose a file</span><input ref={(el) => { inputRefs.current[slot.id] = el; }} type="file" accept={slot.type === 'pdf' ? 'application/pdf' : 'image/jpeg,image/png,image/webp'} hidden onChange={(e) => handleFile(slot, e.target.files?.[0])} /></div> : <div className="slot-preview-row">{previews[slot.id] && <img className="slot-preview" src={previews[slot.id]} alt={`${slot.label} preview`} />}<div className="slot-meta"><p>{result?.analysis ? `${result.analysis.width}×${result.analysis.height} px · ${result.analysis.sizeKb.toFixed(1)} KB` : file.size}</p><p>{result?.summary}</p><div className="slot-actions"><button type="button" onClick={() => download(slot)}>Download</button><button type="button" onClick={() => removeFile(slot.id)}>Replace</button></div></div></div>}
                {result?.issues?.length > 0 && <ul className="issue-list">{result.issues.map((issue, i) => <li className={issue.severity} key={i}><strong>{issue.message}</strong><span>Required: {issue.required} · Current: {issue.current}</span></li>)}</ul>}
                {result?.fixes?.length > 0 && <div className="fix-row">{result.fixes.slice(0, 3).map((fix) => <button type="button" className="fix-btn" key={fix.id} disabled={busy === slot.id} onClick={() => fixSlot(slot, fix)}>{busy === slot.id ? 'Working…' : fix.label}</button>)}</div>}
              </article>;
            })}
          </div>
          <p className="disclaimer">Validation checks file size, dimensions, format and basic quality hints. It cannot guarantee acceptance by an exam portal. <Link to="/photo-resizer">Photo Resizer</Link> · <Link to="/signature-resizer">Signature Resizer</Link></p>
        </>
      )}
    </div>
  );
}
