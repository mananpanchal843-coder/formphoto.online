import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import {
  APPLICATIONS,
  APPLICATION_CATEGORIES,
  getApplicationById,
  searchApplications,
} from '../../data/applicationRequirements';
import { validateAgainstSlot, computeReadiness } from '../../utils/checker/fileAnalyzer';
import {
  smartFixPhoto,
  smartFixSignature,
  compressToExactKB,
  resizeImageSmart,
} from '../../utils/imageProcessor';
import './ApplicationChecker.css';

const statusLabel = {
  pass: 'Passed',
  warning: 'Needs review',
  fail: 'Failed',
  empty: 'Not uploaded',
};

export default function ApplicationChecker() {
  const { appId: rawAppId } = useParams();
  const navigate = useNavigate();
  // Support SEO slugs like "ssc-cgl-photo-signature-checker"
  const appId = rawAppId
    ? rawAppId.replace(/-photo-signature-checker$/i, '').replace(/-checker$/i, '')
    : null;
  const initialApp = appId ? getApplicationById(appId) : null;

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [selected, setSelected] = useState(initialApp);
  const [files, setFiles] = useState({}); // slotId -> File
  const [previews, setPreviews] = useState({}); // slotId -> url
  const [results, setResults] = useState({}); // slotId -> validation result
  const [busySlot, setBusySlot] = useState(null);
  const [fixAllBusy, setFixAllBusy] = useState(false);
  const [dragSlot, setDragSlot] = useState(null);
  const inputRefs = useRef({});

  const filtered = useMemo(
    () => searchApplications(query, category),
    [query, category]
  );

  const readiness = useMemo(() => {
    if (!selected) return null;
    return computeReadiness(results, selected.slots);
  }, [selected, results]);

  const selectApp = (app) => {
    setSelected(app);
    setFiles({});
    setPreviews({});
    setResults({});
    navigate(`/application/${app.id}-photo-signature-checker`, { replace: true });
  };

  const clearApp = () => {
    setSelected(null);
    setFiles({});
    setPreviews({});
    setResults({});
    navigate('/application-checker', { replace: true });
  };

  const runValidation = useCallback(async (slot, file) => {
    const result = await validateAgainstSlot(file, slot);
    setResults((prev) => ({ ...prev, [slot.id]: result }));
    return result;
  }, []);

  const handleFile = async (slot, file) => {
    if (!file) return;

    // Basic guard
    const maxBytes = 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      setResults((prev) => ({
        ...prev,
        [slot.id]: {
          status: 'fail',
          summary: 'File exceeds 15 MB upload limit',
          issues: [
            {
              code: 'upload-limit',
              severity: 'fail',
              message: 'File is too large to process in browser',
              required: 'Under 15 MB',
              current: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            },
          ],
          fixes: [],
          analysis: null,
        },
      }));
      return;
    }

    setBusySlot(slot.id);
    try {
      if (previews[slot.id]) URL.revokeObjectURL(previews[slot.id]);
      const url = URL.createObjectURL(file);
      setFiles((prev) => ({ ...prev, [slot.id]: file }));
      setPreviews((prev) => ({ ...prev, [slot.id]: url }));
      await runValidation(slot, file);
    } catch (e) {
      setResults((prev) => ({
        ...prev,
        [slot.id]: {
          status: 'fail',
          summary: e.message || 'Analysis failed',
          issues: [
            {
              code: 'error',
              severity: 'fail',
              message: e.message || 'Could not analyze file',
              required: 'Valid image',
              current: 'Error',
            },
          ],
          fixes: [],
          analysis: null,
        },
      }));
    } finally {
      setBusySlot(null);
    }
  };

  const removeFile = (slotId) => {
    if (previews[slotId]) URL.revokeObjectURL(previews[slotId]);
    setFiles((prev) => {
      const n = { ...prev };
      delete n[slotId];
      return n;
    });
    setPreviews((prev) => {
      const n = { ...prev };
      delete n[slotId];
      return n;
    });
    setResults((prev) => {
      const n = { ...prev };
      delete n[slotId];
      return n;
    });
  };

  const downloadFile = (slot) => {
    const file = files[slot.id];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    // Keep a sensible filename
    const ext = file.name.includes('.') ? file.name.split('.').pop() : 'jpg';
    a.download = `${slot.id}-ready.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const applySmartFix = async (slot) => {
    const file = files[slot.id];
    if (!file) return;
    setBusySlot(slot.id);
    try {
      let fixed;
      if (slot.type === 'photo') {
        fixed = await smartFixPhoto(file, {
          width: slot.width,
          height: slot.height,
          maxSize: slot.maxSizeKb,
          bgColor: '#ffffff',
          format: 'jpeg',
        });
      } else {
        fixed = await smartFixSignature(file, {
          width: slot.width || 140,
          height: slot.height || 60,
          maxSize: slot.maxSizeKb || 20,
        });
      }
      const outFile = new File([fixed.blob], `${slot.id}-fixed.jpg`, {
        type: 'image/jpeg',
      });
      await handleFile(slot, outFile);
    } catch (e) {
      alert(e.message || 'Auto-fix failed. Try the dedicated tools.');
      setBusySlot(null);
    }
  };

  const applyCompress = async (slot, targetKb) => {
    const file = files[slot.id];
    if (!file) return;
    setBusySlot(slot.id);
    try {
      const fixed = await compressToExactKB(file, targetKb, 1);
      const outFile = new File([fixed.blob], `${slot.id}-compressed.jpg`, {
        type: 'image/jpeg',
      });
      await handleFile(slot, outFile);
    } catch (e) {
      alert(e.message || 'Compression failed');
      setBusySlot(null);
    }
  };

  const applyResize = async (slot) => {
    const file = files[slot.id];
    if (!file || !slot.width || !slot.height) return;
    setBusySlot(slot.id);
    try {
      const resized = await resizeImageSmart(file, slot.width, slot.height, {
        mode: slot.type === 'signature' ? 'contain' : 'cover',
        bgColor: '#ffffff',
        format: 'jpeg',
        quality: 0.92,
      });
      let blob = resized.blob;
      if (slot.maxSizeKb && resized.size > slot.maxSizeKb) {
        const c = await compressToExactKB(blob, slot.maxSizeKb, 1.5);
        blob = c.blob;
      }
      const outFile = new File([blob], `${slot.id}-resized.jpg`, { type: 'image/jpeg' });
      await handleFile(slot, outFile);
    } catch (e) {
      alert(e.message || 'Resize failed');
      setBusySlot(null);
    }
  };

  const runFix = async (slot, fix) => {
    if (fix.action === 'smart-fix') return applySmartFix(slot);
    if (fix.action === 'compress') return applyCompress(slot, fix.targetKb || slot.maxSizeKb);
    if (fix.action === 'resize') return applyResize(slot);
    if (fix.action === 'convert-jpg') return applyResize(slot);
    if (fix.action === 'background') {
      // Open BG remover with guidance; still offer smart fix
      return applySmartFix(slot);
    }
    // Fallback: navigate to tool
    const params = new URLSearchParams();
    if (fix.width) params.set('w', fix.width);
    if (fix.height) params.set('h', fix.height);
    if (fix.targetKb) params.set('target', fix.targetKb);
    window.open(`${fix.tool}?${params.toString()}`, '_blank');
  };

  const fixEverything = async () => {
    if (!selected) return;
    setFixAllBusy(true);
    try {
      for (const slot of selected.slots) {
        const r = results[slot.id];
        if (!files[slot.id]) continue;
        if (r && r.status === 'pass') continue;
        if (r && r.fixes?.length) {
          const preferred =
            r.fixes.find((f) => f.action === 'smart-fix') || r.fixes[0];
          if (preferred.action === 'smart-fix') await applySmartFix(slot);
          else if (preferred.action === 'compress')
            await applyCompress(slot, preferred.targetKb || slot.maxSizeKb);
          else if (preferred.action === 'resize' || preferred.action === 'convert-jpg')
            await applyResize(slot);
        } else if (slot.width && slot.height) {
          await applySmartFix(slot);
        }
      }
    } finally {
      setFixAllBusy(false);
    }
  };

  const onDrop = (e, slot) => {
    e.preventDefault();
    setDragSlot(null);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(slot, f);
  };

  const seoTitle = selected
    ? `${selected.name} Photo & Signature Checker – FormPhoto`
    : 'Application Upload Checker – Photo Signature Document';
  const seoDesc = selected
    ? `Check your ${selected.name} photo, signature and documents against size and dimension requirements. Fix issues in one click. Private browser processing.`
    : 'Check application photos, signatures and documents against official size limits. Fix problems in one click. Works offline in your browser.';

  const allPassed =
    readiness &&
    readiness.total > 0 &&
    readiness.ready === readiness.total &&
    selected?.slots.every((s) => {
      if (!s.required) return true;
      return results[s.id]?.status === 'pass' || results[s.id]?.status === 'warning';
    }) &&
    selected?.slots.filter((s) => s.required).every((s) => results[s.id]);

  return (
    <div className="checker-page">
      <SEOHead
        title={seoTitle}
        path={
          selected
            ? `/application/${selected.id}-photo-signature-checker`
            : '/application-checker'
        }
        description={seoDesc}
        keywords={`${selected?.name || 'exam'} photo size, signature size, application upload checker, form photo requirements`}
      />

      <header className="checker-hero">
        <h1>{selected ? `${selected.name} Photo & Signature Upload Checker` : 'Application Photo & Signature Upload Checker'}</h1>
        <p>
          Select your exam or job application (SSC, UPSC, IBPS, NEET, Passport and more), upload the
          required photo and signature files, and we&apos;ll validate them against official size and
          dimension rules — then help you fix anything that doesn&apos;t pass. Fully private; files
          never leave your browser.
        </p>
        <div className="privacy-badge">🔒 Processed in your browser · files never uploaded</div>
      </header>

      {!selected && (
        <section>
          <div className="checker-step">Step 1</div>
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.15rem' }}>
            What are you applying for?
          </h2>
          <div className="app-search-wrap">
            <input
              className="app-search"
              type="search"
              placeholder="Search application (SSC, UPSC, NEET, IBPS…)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search applications"
            />
          </div>
          <div className="category-chips" role="list">
            <button
              type="button"
              className={`chip ${!category ? 'active' : ''}`}
              onClick={() => setCategory(null)}
            >
              All
            </button>
            {APPLICATION_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="app-list">
            {filtered.map((app) => (
              <button
                key={app.id}
                type="button"
                className="app-card"
                onClick={() => selectApp(app)}
              >
                <strong>{app.name}</strong>
                <span>{app.organization}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p style={{ gridColumn: '1/-1', color: 'var(--color-text-secondary)' }}>
                No applications match. Try another search.
              </p>
            )}
          </div>
        </section>
      )}

      {selected && (
        <>
          <div className="selected-app-bar">
            <div>
              <h2>{selected.name}</h2>
              <div className="selected-app-meta">
                {selected.organization}
                {selected.year ? ` · ${selected.year}` : ''}
                {' · '}
                Requirements {selected.confidence === 'estimated' ? 'estimated' : 'last verified'}{' '}
                {selected.lastVerified}
                {selected.officialUrl && (
                  <>
                    {' · '}
                    <a href={selected.officialUrl} target="_blank" rel="noopener noreferrer">
                      Official source
                    </a>
                  </>
                )}
              </div>
            </div>
            <button type="button" className="change-app-btn" onClick={clearApp}>
              Change application
            </button>
          </div>

          {selected.confidence === 'estimated' && (
            <p className="disclaimer" style={{ marginTop: 0 }}>
              These sizes are typical for this category. Confirm the exact limits in your state or
              board notification before submitting.
            </p>
          )}

          {readiness && Object.keys(files).length > 0 && (
            <div className="readiness-card">
              <div
                className={`readiness-score ${
                  readiness.score >= 100 ? 'pass' : readiness.score >= 70 ? 'warn' : 'fail'
                }`}
                aria-label={`Readiness score ${readiness.score} out of 100`}
              >
                {readiness.score}
              </div>
              <div className="readiness-info">
                <h3>Application Readiness</h3>
                <p>
                  {readiness.ready}/{readiness.total} files ready · {readiness.label}
                </p>
              </div>
              {readiness.score < 100 && (
                <button
                  type="button"
                  className="fix-all-btn"
                  onClick={fixEverything}
                  disabled={fixAllBusy}
                >
                  {fixAllBusy ? 'Fixing…' : '⚡ Fix Everything'}
                </button>
              )}
            </div>
          )}

          {allPassed && (
            <div className="success-banner">
              <h2>🎉 Your files look ready</h2>
              <p>
                {readiness.ready}/{readiness.total} required files meet the listed limits. Always
                re-check the official instructions before you submit.
              </p>
            </div>
          )}

          <div className="checker-step">Step 2 · Upload &amp; check</div>
          <div className="slot-grid">
            {selected.slots.map((slot) => {
              const result = results[slot.id];
              const status = result?.status || (files[slot.id] ? 'empty' : 'empty');
              const busy = busySlot === slot.id;

              return (
                <article
                  key={slot.id}
                  className={`slot-card ${result ? `status-${result.status}` : ''}`}
                >
                  <div className="slot-header">
                    <div>
                      <h3>
                        {slot.label}
                        {slot.required ? '' : ' (optional)'}
                      </h3>
                      <div className="slot-req">
                        {(slot.formats || []).map((f) => f.toUpperCase()).join(' / ')}
                        {slot.minSizeKb != null && slot.maxSizeKb != null
                          ? ` · ${slot.minSizeKb}–${slot.maxSizeKb} KB`
                          : slot.maxSizeKb
                            ? ` · max ${slot.maxSizeKb} KB`
                            : ''}
                        {slot.width && slot.height ? ` · ${slot.width}×${slot.height} px` : ''}
                        {slot.notes ? ` · ${slot.notes}` : ''}
                      </div>
                    </div>
                    <span className={`status-pill ${result ? result.status : 'empty'}`}>
                      {busy ? 'Checking…' : result ? statusLabel[result.status] : statusLabel.empty}
                    </span>
                  </div>

                  {!files[slot.id] ? (
                    <div
                      className={`slot-drop ${dragSlot === slot.id ? 'dragging' : ''}`}
                      onClick={() => inputRefs.current[slot.id]?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragSlot(slot.id);
                      }}
                      onDragLeave={() => setDragSlot(null)}
                      onDrop={(e) => onDrop(e, slot)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          inputRefs.current[slot.id]?.click();
                        }
                      }}
                    >
                      <strong>Upload {slot.label}</strong>
                      <span>Tap to choose · drag &amp; drop · camera on phone</span>
                      <input
                        ref={(el) => {
                          inputRefs.current[slot.id] = el;
                        }}
                        type="file"
                        accept={
                          slot.type === 'pdf'
                            ? 'application/pdf'
                            : 'image/jpeg,image/jpg,image/png,image/webp'
                        }
                        capture={slot.type === 'photo' ? 'user' : undefined}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFile(slot, f);
                          e.target.value = '';
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="slot-preview-row">
                        {previews[slot.id] && (
                          <img
                            className="slot-preview"
                            src={previews[slot.id]}
                            alt={`${slot.label} preview`}
                          />
                        )}
                        <div className="slot-meta">
                          {result?.analysis && (
                            <>
                              <div>
                                <strong>
                                  {result.analysis.width}×{result.analysis.height} px
                                </strong>
                                {' · '}
                                {result.analysis.sizeKb.toFixed(1)} KB
                              </div>
                              <div>{result.summary}</div>
                            </>
                          )}
                          <div className="slot-actions">
                            <button
                              type="button"
                              className="download-btn"
                              onClick={() => downloadFile(slot)}
                            >
                              Download
                            </button>
                            <button
                              type="button"
                              className="remove-btn"
                              onClick={() => removeFile(slot.id)}
                            >
                              Remove &amp; replace
                            </button>
                          </div>
                        </div>
                      </div>

                      {result?.issues?.length > 0 && (
                        <ul className="issue-list">
                          {result.issues.map((issue, idx) => (
                            <li key={idx} className={issue.severity}>
                              <strong>
                                {issue.severity === 'fail' ? '❌' : '⚠️'} {issue.message}
                              </strong>
                              <span className="vals">
                                Required: {issue.required} · Current: {issue.current}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {result?.status === 'pass' && (
                        <div className="pass-row">
                          <p className="pass-msg">✅ Looks compliant with the listed limits</p>
                          <button
                            type="button"
                            className="download-btn primary-download"
                            onClick={() => downloadFile(slot)}
                          >
                            Download fixed file
                          </button>
                        </div>
                      )}

                      {result?.fixes?.length > 0 && (
                        <div className="fix-row">
                          {result.fixes.slice(0, 3).map((fix) => (
                            <button
                              key={fix.id}
                              type="button"
                              className={`fix-btn ${fix.action === 'smart-fix' ? '' : 'secondary'}`}
                              disabled={busy}
                              onClick={() => runFix(slot, fix)}
                            >
                              {busy ? 'Working…' : fix.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </article>
              );
            })}
          </div>

          <p className="disclaimer">
            Validation uses exact file size and pixel checks, plus optional quality hints. FormPhoto
            cannot guarantee acceptance by any board or portal. Always follow the current official
            notification. Prefer our{' '}
            <Link to="/photo-resizer">Photo Resizer</Link> and{' '}
            <Link to="/signature-resizer">Signature Resizer</Link> if you need manual control.
          </p>
        </>
      )}
    </div>
  );
}
