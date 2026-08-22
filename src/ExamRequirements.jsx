import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { PRESETS, CATEGORIES } from '../utils/presets';
import './ExamRequirements.css';

export default function ExamRequirements() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRESETS.filter((p) => {
      const catOk = p.category === activeCategory;
      if (!q) return catOk;
      const hay = `${p.name} ${p.id} ${p.photo?.description || ''}`.toLowerCase();
      return catOk && hay.includes(q);
    });
  }, [activeCategory, search]);

  return (
    <div className="exam-req-page">
      <SEOHead
        title="Photo Size Requirements for All Indian Exams – UPSC SSC NEET JEE"
        path="/exam-requirements"
        keywords="UPSC photo size, SSC photo size, NEET photo size, JEE photo size, IBPS photo size, passport photo size India, form photo requirements"
        description="Complete photo and signature size chart for UPSC, SSC, IBPS, SBI, RRB, NEET, JEE, CUET, GATE, CAT, Passport and more. Exact pixels and KB limits."
      />

      <header className="exam-req-header">
        <h1>Photo &amp; Signature Size Requirements for Indian Exams</h1>
        <p className="exam-req-sub">
          Exact pixel dimensions and file size limits for UPSC, SSC, IBPS, SBI, RRB, NEET, JEE,
          CUET, GATE, CAT, Passport and other Indian government exams, entrance tests and ID
          documents. Always double-check the official notification for the latest rules.
        </p>
        <div className="exam-req-search-wrap">
          <input
            type="search"
            className="exam-req-search"
            placeholder="Search exam (e.g. UPSC, NEET, IBPS)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search exams"
          />
        </div>
      </header>

      <div className="exam-req-tabs" role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            className={`exam-req-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="exam-req-grid">
        {filtered.length === 0 && (
          <p className="exam-req-empty">No exams match your search in this category.</p>
        )}
        {filtered.map((preset) => (
          <article key={preset.id} className="exam-req-card">
            <div className="exam-req-card-top">
              <span className="exam-req-icon" aria-hidden="true">
                {preset.icon}
              </span>
              <div>
                <h2 className="exam-req-name">{preset.name}</h2>
                <span className="exam-req-cat-badge">{preset.category}</span>
              </div>
            </div>

            {preset.photo && (
              <div className="exam-req-block">
                <h3>Photo</h3>
                <ul>
                  <li>
                    <span>Size</span>
                    <strong>
                      {preset.photo.width} × {preset.photo.height} px
                    </strong>
                  </li>
                  <li>
                    <span>File size</span>
                    <strong>
                      {preset.photo.minSize}–{preset.photo.maxSize} KB
                    </strong>
                  </li>
                  <li>
                    <span>Format</span>
                    <strong>{(preset.photo.format || 'jpeg').toUpperCase()}</strong>
                  </li>
                  <li>
                    <span>Background</span>
                    <strong>White / light</strong>
                  </li>
                </ul>
                <p className="exam-req-note">{preset.photo.description}</p>
              </div>
            )}

            {preset.signature && (
              <div className="exam-req-block">
                <h3>Signature</h3>
                <ul>
                  <li>
                    <span>Size</span>
                    <strong>
                      {preset.signature.width} × {preset.signature.height} px
                    </strong>
                  </li>
                  <li>
                    <span>File size</span>
                    <strong>
                      {preset.signature.minSize}–{preset.signature.maxSize} KB
                    </strong>
                  </li>
                  <li>
                    <span>Format</span>
                    <strong>{(preset.signature.format || 'jpeg').toUpperCase()}</strong>
                  </li>
                </ul>
                <p className="exam-req-note">{preset.signature.description}</p>
              </div>
            )}

            <div className="exam-req-actions">
              <Link
                to={`/photo-resizer?preset=${preset.id}`}
                className="exam-req-btn primary"
              >
                Resize photo
              </Link>
              {preset.signature && (
                <Link
                  to={`/signature-resizer?preset=${preset.id}`}
                  className="exam-req-btn secondary"
                >
                  Resize signature
                </Link>
              )}
              <Link
                to={`/compress?target=${preset.photo?.maxSize || 50}`}
                className="exam-req-btn secondary"
              >
                Compress to {preset.photo?.maxSize || 50} KB
              </Link>
            </div>
          </article>
        ))}
      </div>

      <aside className="exam-req-disclaimer">
        <strong>Note:</strong> Sizes above follow common portal requirements. Exam boards
        occasionally update rules. Confirm dimensions and KB limits in the current official
        notification before submitting your application.
      </aside>
    </div>
  );
}
