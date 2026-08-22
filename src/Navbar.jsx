import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const navLinks = [
    { name: 'Photo Resizer', path: '/photo-resizer' },
    { name: 'Signature Resizer', path: '/signature-resizer' },
    { name: 'Compress Photo', path: '/compress' },
    { name: 'BG Remover', path: '/background-remover' },
    { name: 'Image → PDF', path: '/image-to-pdf' },
    { name: 'PDF Compress', path: '/pdf-compress' },
    { name: 'Exam Sizes', path: '/exam-requirements' },
    { name: 'Upload Checker', path: '/application-checker' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>FormPhoto <span className="logo-icon">📸</span></Link>
        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`} onClick={closeMobileMenu}>{link.name}</Link>
          ))}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">{theme === 'dark' ? '☀️' : '🌙'}</button>
        </div>
        <button className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle mobile menu" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? '✕' : '☰'}</button>
      </div>
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu} aria-hidden="true" />
    </nav>
  );
};

export default Navbar;
