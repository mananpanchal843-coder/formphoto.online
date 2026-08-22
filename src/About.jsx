import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import './LegalPages.css';

export default function About() {
  return (
    <div className="legal-page">
      <SEOHead
        title="About FormPhoto – Free Photo Tools for Indian Forms"
        path="/about"
        description="FormPhoto is a free, privacy-first photo and signature resizer built for Indian students and job applicants. UPSC, SSC, IBPS, NEET, JEE, Passport and more."
        keywords="about formphoto, free photo resizer India, UPSC photo tool"
      />
      <h1>About FormPhoto</h1>
      <p className="legal-updated">Made in India · Free for everyone</p>

      <p>
        FormPhoto helps millions of Indian students and job seekers prepare perfect photos and
        signatures for government exams and applications—without installing software or uploading
        files to unknown servers.
      </p>

      <div className="legal-card">
        <h2 style={{ marginTop: 0 }}>Our mission</h2>
        <p style={{ marginBottom: 0 }}>
          Make form photo requirements simple, private, and free. Every tool runs in your browser
          so your documents never leave your device.
        </p>
      </div>

      <h2>What we offer</h2>
      <ul>
        <li>
          <Link to="/photo-resizer">Photo Resizer</Link> – exact pixel size for UPSC, SSC, IBPS,
          NEET, JEE, Passport and more
        </li>
        <li>
          <Link to="/signature-resizer">Signature Resizer</Link> – bank and exam signature formats
        </li>
        <li>
          <Link to="/compress">Compress Photo</Link> – hit exact KB limits (20KB, 50KB, 100KB…)
        </li>
        <li>
          <Link to="/background-remover">Background Remover</Link> – clean white or transparent
          backgrounds
        </li>
        <li>
          <Link to="/image-to-pdf">Image to PDF</Link> and <Link to="/pdf-compress">PDF Compress</Link>
        </li>
      </ul>

      <h2>Why privacy matters</h2>
      <p>
        Application photos are sensitive. Unlike many online tools, FormPhoto processes everything
        locally in your browser. We never see or store your images. Read our{' '}
        <Link to="/privacy">Privacy Policy</Link> for full details.
      </p>

      <h2>Who it’s for</h2>
      <ul>
        <li>UPSC / State PSC aspirants</li>
        <li>SSC, Railway, Banking (IBPS, SBI) candidates</li>
        <li>NEET, JEE, CUET students</li>
        <li>Passport, visa, and Aadhaar photo needs</li>
        <li>Anyone who needs a quick, correct form photo</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Feedback and suggestions are welcome on our <Link to="/contact">Contact page</Link>.
      </p>
    </div>
  );
}
