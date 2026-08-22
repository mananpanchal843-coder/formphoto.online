import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-gradient-bar"></div>
      <div className="footer-content">
        <div className="footer-column brand-col">
          <Link to="/" className="footer-logo">
            FormPhoto <span className="logo-icon">📸</span>
          </Link>
          <p className="footer-description">
            Free photo &amp; signature tools for Indian forms and exams. 100% private — processing
            stays in your browser.
          </p>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              🐦
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              📷
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              📘
            </a>
          </div>
        </div>

        <div className="footer-column links-col">
          <h3 className="footer-heading">Tools</h3>
          <ul className="footer-links">
            <li>
              <Link to="/photo-resizer">Photo Resizer</Link>
            </li>
            <li>
              <Link to="/signature-resizer">Signature Resizer</Link>
            </li>
            <li>
              <Link to="/compress">Compress Photo</Link>
            </li>
            <li>
              <Link to="/background-remover">BG Remover</Link>
            </li>
            <li>
              <Link to="/image-to-pdf">Image → PDF</Link>
            </li>
            <li>
              <Link to="/pdf-compress">PDF Compress</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column links-col">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li>
              <Link to="/exam-requirements">Exam Photo Sizes</Link>
            </li>
            <li>
              <Link to="/application-checker">Upload Checker</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FormPhoto. All rights reserved.</p>
        <p>Made with ❤️ in India · Private by design</p>
      </div>
    </footer>
  );
};

export default Footer;
