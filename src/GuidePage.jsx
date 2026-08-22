import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getGuideBySlug, GUIDE_LIST } from '../data/guidePages';
import './GuidePage.css';

export default function GuidePage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const guide = getGuideBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const moreGuides = GUIDE_LIST.filter((g) => g.slug !== guide.slug).slice(0, 5);

  return (
    <article className="guide-page">
      <SEOHead
        title={guide.title}
        path={`/${guide.slug}`}
        description={guide.metaDescription}
        keywords={guide.keywords}
        faqs={guide.faqs}
        type="article"
        publishedTime={guide.updated}
        modifiedTime={guide.updated}
      />

      <header className="guide-hero">
        <p className="guide-meta">
          <span className="guide-cat">{guide.category}</span>
          <span>·</span>
          <span>{guide.readMinutes} min read</span>
          <span>·</span>
          <span>Updated {guide.updated}</span>
        </p>
        <h1>{guide.h1}</h1>
        <p className="guide-intro">{guide.intro}</p>
      </header>

      <div className="guide-body">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="guide-section">
            <h2>{section.h2}</h2>
            {section.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            {section.steps && (
              <ol className="guide-steps">
                {section.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
            {section.table && (
              <div className="guide-table-wrap">
                <table className="guide-table">
                  <thead>
                    <tr>
                      {section.table.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {guide.faqs?.length > 0 && (
          <section className="guide-section">
            <h2>FAQ</h2>
            <div className="guide-faq-list">
              {guide.faqs.map((faq, i) => (
                <div key={i} className={`guide-faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="guide-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {faq.q}
                    <span aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <div className="guide-faq-a">{faq.a}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {guide.relatedTools?.length > 0 && (
          <section className="guide-section">
            <h2>Related tools & pages</h2>
            <ul className="guide-related">
              {guide.relatedTools.map((t) => (
                <li key={t.to}>
                  <Link to={t.to}>{t.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {moreGuides.length > 0 && (
          <section className="guide-section">
            <h2>More guides</h2>
            <ul className="guide-more">
              {moreGuides.map((g) => (
                <li key={g.slug}>
                  <Link to={`/${g.slug}`}>
                    <strong>{g.title}</strong>
                    <span>
                      {g.category} · {g.readMinutes} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
