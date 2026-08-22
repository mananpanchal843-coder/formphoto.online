import React, { useState } from 'react';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getExamLandingBySlug } from '../data/examLandingPages';
import './ExamLandingPage.css';

export default function ExamLandingPage() {
  const { slug: paramSlug } = useParams();
  const location = useLocation();
  const slug = paramSlug || location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const page = getExamLandingBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!page) {
    return <Navigate to="/exam-requirements" replace />;
  }

  const photoToolLink = `/photo-resizer?preset=${page.presetId}`;
  const sigToolLink = `/signature-resizer?preset=${page.presetId}`;
  const compressLink = '/compress';
  const checkerMap = {
    ssc: 'ssc-cgl',
    railway: 'rrb-ntpc',
    ibps: 'ibps-po',
    upsc: 'upsc',
    neet: 'neet',
    'jee-main': 'jee-main',
  };
  const checkerLink = `/application/${checkerMap[page.presetId] || page.presetId}`;

  return (
    <div className="exam-landing">
      <SEOHead
        title={page.fullTitle}
        path={`/${page.slug}`}
        description={page.metaDescription}
        keywords={page.keywords}
        faqs={page.faqs}
      />

      {/* Hero */}
      <header className="el-hero">
        <p className="el-eyebrow">
          {page.organization} · {page.year} cycle
        </p>
        <h1>{page.h1}</h1>
        <p className="el-lead">
          Exact pixel sizes, KB limits and background rules — plus a free browser tool pre-set for{' '}
          {page.examName}. Your files never leave this device.
        </p>
        <div className="el-hero-actions">
          <Link to={photoToolLink} className="el-btn el-btn-primary">
            Resize photo for {page.examName}
          </Link>
          <Link to={sigToolLink} className="el-btn el-btn-secondary">
            Resize signature
          </Link>
        </div>
        <p className="el-disclaimer">
          Always double-check the latest official notification on{' '}
          <a href={page.officialUrl} target="_blank" rel="noopener noreferrer">
            {page.officialUrl.replace(/^https?:\/\//, '')}
          </a>
          .
        </p>
      </header>

      {/* Specs cards */}
      <section className="el-section" aria-labelledby="specs-heading">
        <h2 id="specs-heading">Official-style requirements ({page.year})</h2>
        <div className="el-specs-grid">
          <article className="el-spec-card">
            <h3>📷 Photograph</h3>
            <ul className="el-spec-list">
              <li>
                <span>Dimensions</span>
                <strong>
                  {page.photo.width} × {page.photo.height} px
                </strong>
              </li>
              <li>
                <span>File size</span>
                <strong>
                  {page.photo.minKb} – {page.photo.maxKb} KB
                </strong>
              </li>
              <li>
                <span>Format</span>
                <strong>{page.photo.format}</strong>
              </li>
              <li>
                <span>Background</span>
                <strong>{page.photo.background}</strong>
              </li>
            </ul>
            <p className="el-spec-note">{page.photo.notes}</p>
            <Link to={photoToolLink} className="el-btn el-btn-primary el-btn-block">
              Open photo tool with {page.examName} preset
            </Link>
          </article>

          <article className="el-spec-card">
            <h3>✍️ Signature</h3>
            <ul className="el-spec-list">
              <li>
                <span>Dimensions</span>
                <strong>
                  {page.signature.width} × {page.signature.height} px
                </strong>
              </li>
              <li>
                <span>File size</span>
                <strong>
                  {page.signature.minKb} – {page.signature.maxKb} KB
                </strong>
              </li>
              <li>
                <span>Format</span>
                <strong>{page.signature.format}</strong>
              </li>
              <li>
                <span>Background</span>
                <strong>{page.signature.background}</strong>
              </li>
            </ul>
            <p className="el-spec-note">{page.signature.notes}</p>
            <Link to={sigToolLink} className="el-btn el-btn-secondary el-btn-block">
              Open signature tool
            </Link>
          </article>
        </div>

        {page.specialRules?.length > 0 && (
          <div className="el-rules">
            <h3>Special rules to remember</h3>
            <ul>
              {page.specialRules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Embedded tool CTAs */}
      <section className="el-section el-tools" aria-labelledby="tools-heading">
        <h2 id="tools-heading">Prepare your files now</h2>
        <p className="el-section-intro">
          Tools open with {page.examName} dimensions pre-selected where available. Process everything
          in your browser — nothing is uploaded to our servers.
        </p>
        <div className="el-tool-cards">
          <Link to={photoToolLink} className="el-tool-card">
            <span className="el-tool-icon">🖼️</span>
            <span className="el-tool-title">Photo resizer</span>
            <span className="el-tool-desc">
              {page.photo.width}×{page.photo.height} px · {page.photo.minKb}–{page.photo.maxKb} KB
            </span>
          </Link>
          <Link to={sigToolLink} className="el-tool-card">
            <span className="el-tool-icon">✒️</span>
            <span className="el-tool-title">Signature resizer</span>
            <span className="el-tool-desc">
              {page.signature.width}×{page.signature.height} px · {page.signature.minKb}–
              {page.signature.maxKb} KB
            </span>
          </Link>
          <Link to={compressLink} className="el-tool-card">
            <span className="el-tool-icon">🗜️</span>
            <span className="el-tool-title">Compress to exact KB</span>
            <span className="el-tool-desc">Hit strict size limits without guessing quality</span>
          </Link>
          <Link to={checkerLink} className="el-tool-card">
            <span className="el-tool-icon">✅</span>
            <span className="el-tool-title">Upload checker</span>
            <span className="el-tool-desc">Validate photo & signature against rules</span>
          </Link>
        </div>
      </section>

      {/* How to guide */}
      <section className="el-section" aria-labelledby="howto-heading">
        <h2 id="howto-heading">How to prepare the correct photo & signature</h2>
        <ol className="el-steps">
          {page.howTo.map((step, i) => (
            <li key={i}>
              <span className="el-step-num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Rejections */}
      <section className="el-section" aria-labelledby="reject-heading">
        <h2 id="reject-heading">Common rejection reasons & fixes</h2>
        <div className="el-reject-list">
          {page.rejections.map((item, i) => (
            <div key={i} className="el-reject-item">
              <p className="el-reject-reason">
                <strong>Problem:</strong> {item.reason}
              </p>
              <p className="el-reject-fix">
                <strong>Fix:</strong> {item.fix}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="el-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently asked questions</h2>
        <div className="el-faq-list">
          {page.faqs.map((faq, i) => (
            <div
              key={i}
              className={`el-faq-item ${openFaq === i ? 'open' : ''}`}
            >
              <button
                type="button"
                className="el-faq-q"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <span className="el-faq-icon" aria-hidden="true">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && <div className="el-faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section className="el-section el-related" aria-labelledby="related-heading">
        <h2 id="related-heading">Related tools & size charts</h2>
        <ul className="el-related-list">
          {page.related.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
          <li>
            <Link to="/exam-requirements">Full exam photo & signature size chart</Link>
          </li>
          <li>
            <Link to="/background-remover">Background remover</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
