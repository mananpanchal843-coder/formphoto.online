import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { GUIDE_LIST } from '../data/guidePages';
import './GuidePage.css';

export default function GuidesIndex() {
  const byCategory = GUIDE_LIST.reduce((acc, g) => {
    (acc[g.category] = acc[g.category] || []).push(g);
    return acc;
  }, {});

  return (
    <div className="guides-index">
      <SEOHead
        title="Exam Photo & Signature Guides – SSC, UPSC, NEET, IBPS, RRB"
        path="/guides"
        description="Free guides on exam photo size, signature KB limits, rejection fixes, UPSC vs SSC, passport vs exam photo, and more. Practical steps with FormPhoto tools."
        keywords="exam photo guide, SSC photo guide, signature size guide, photo rejection fix, UPSC vs SSC photo"
      />
      <header className="guide-hero">
        <h1>Photo & signature guides for Indian exams</h1>
        <p className="guide-intro">
          Practical, up-to-date walkthroughs for SSC, UPSC, NEET, JEE, IBPS, SBI and Railway forms —
          plus fixes when uploads get rejected.
        </p>
      </header>
      {Object.entries(byCategory).map(([cat, items]) => (
        <section key={cat} className="guides-cat-block">
          <h2>{cat}</h2>
          <ul className="guides-index-list">
            {items.map((g) => (
              <li key={g.slug}>
                <Link to={`/${g.slug}`}>
                  <strong>{g.title}</strong>
                  <span>
                    {g.readMinutes} min read — {g.metaDescription.slice(0, 110)}…
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
