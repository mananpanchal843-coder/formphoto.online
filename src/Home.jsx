import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AdUnit from '../components/AdUnit';
import { PRESETS, CATEGORIES } from '../utils/presets';
import './Home.css';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const FadeInSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    {
      q: "Is FormPhoto really free?",
      a: "Yes! FormPhoto is 100% free with no hidden charges, no watermarks, and no sign-up required."
    },
    {
      q: "Are my photos safe?",
      a: "Absolutely. All image processing happens locally in your browser. Your photos are never uploaded to any server."
    },
    {
      q: "What formats are supported?",
      a: "We support JPG, JPEG, and PNG formats. Output is primarily in JPEG format as required by most Indian forms."
    },
    {
      q: "Can I compress a photo to an exact file size?",
      a: "Yes! Our Compress Photo tool lets you specify any target size in KB, and we'll compress your image to within ±1KB of that target."
    },
    {
      q: "Which forms are supported?",
      a: "We support UPSC, SSC, IBPS, SBI, Railway (RRB), NEET, JEE, CUET, Passport, Visa, and Aadhaar with preset dimensions."
    },
    {
      q: "Do I need to install anything?",
      a: "No! FormPhoto runs entirely in your browser. No downloads, no installations."
    }
  ];

  return (
    <div className="home-container">
      <SEOHead
        title="Free Photo & Signature Resizer for Indian Forms | UPSC SSC NEET"
        path="/"
        keywords="photo resizer, signature resizer, compress photo, UPSC photo size, SSC photo size, IBPS photo size, NEET photo size, passport size photo maker, form photo India"
        description="Free online photo resizer, signature resizer and image compressor for Indian forms and exams. Exact UPSC, SSC, IBPS, NEET, JEE & Passport sizes. Private – runs in your browser."
        faqs={faqs}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        
        <div className="hero-content">
          <FadeInSection>
            <h1 className="hero-title">
              Prepare Your <span className="gradient-text">Photo & Signature</span><br/> for Any Indian Form
            </h1>
          </FadeInSection>
          
          <FadeInSection delay={100}>
            <p className="hero-subtitle">
              Resize, compress, and format your photos & signatures to exact specifications. Free, instant, and 100% private — your photos never leave your device.
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="hero-actions">
              <Link to="/photo-resizer" className="btn btn-primary btn-large">
                Get Started Free &rarr;
              </Link>
              <Link to="/compress" className="btn btn-secondary btn-large">
                Compress Photo
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-icon">📑</span>
                <span className="stat-text">11+ Form Presets</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">🎉</span>
                <span className="stat-text">100% Free</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-icon">🔒</span>
                <span className="stat-text">No Upload Required</span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Trusted By / Marquee */}
      <section className="trusted-section">
        <div className="trusted-container">
          <h2 className="section-title small">Works With All Major Indian Forms</h2>
          <div className="marquee-wrapper">
            <div className="marquee">
              <div className="marquee-content">
                <span className="badge">🏛️ UPSC</span>
                <span className="badge">📋 SSC</span>
                <span className="badge">🏦 IBPS</span>
                <span className="badge">🏦 SBI</span>
                <span className="badge">🚂 Railway</span>
                <span className="badge">🩺 NEET</span>
                <span className="badge">🔬 JEE</span>
                <span className="badge">🎓 CUET</span>
                <span className="badge">🛂 Passport</span>
                <span className="badge">✈️ Visa</span>
                <span className="badge">🪪 Aadhaar</span>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="marquee-content" aria-hidden="true">
                <span className="badge">🏛️ UPSC</span>
                <span className="badge">📋 SSC</span>
                <span className="badge">🏦 IBPS</span>
                <span className="badge">🏦 SBI</span>
                <span className="badge">🚂 Railway</span>
                <span className="badge">🩺 NEET</span>
                <span className="badge">🔬 JEE</span>
                <span className="badge">🎓 CUET</span>
                <span className="badge">🛂 Passport</span>
                <span className="badge">✈️ Visa</span>
                <span className="badge">🪪 Aadhaar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">Everything You Need, Right in Your Browser</h2>
          </FadeInSection>
          <div className="features-grid">
            <FadeInSection delay={100} className="feature-card glass-card">
              <div className="feature-icon">📐</div>
              <h3 className="feature-title">Photo Resizer</h3>
              <p className="feature-desc">Resize photos to exact pixel dimensions required by any form. Auto-detect requirements with one-click presets.</p>
              <Link to="/photo-resizer" className="feature-link">Try it &rarr;</Link>
            </FadeInSection>
            
            <FadeInSection delay={200} className="feature-card glass-card">
              <div className="feature-icon">✍️</div>
              <h3 className="feature-title">Signature Resizer</h3>
              <p className="feature-desc">Crop and resize signatures to precise dimensions. Clean up backgrounds for a professional look.</p>
              <Link to="/signature-resizer" className="feature-link">Try it &rarr;</Link>
            </FadeInSection>

            <FadeInSection delay={300} className="feature-card glass-card">
              <div className="feature-icon">🗜️</div>
              <h3 className="feature-title">Compress to Any KB</h3>
              <p className="feature-desc">Compress photos to ANY exact file size. Need exactly 47KB? We'll hit it within ±1KB.</p>
              <Link to="/compress" className="feature-link">Try it &rarr;</Link>
            </FadeInSection>

            <FadeInSection delay={400} className="feature-card glass-card">
              <div className="feature-icon">🪄</div>
              <h3 className="feature-title">Background Remover</h3>
              <p className="feature-desc">Remove white or light backgrounds from photos & signatures. Download transparent PNG for forms.</p>
              <Link to="/background-remover" className="feature-link">Try it &rarr;</Link>
            </FadeInSection>

            <FadeInSection delay={500} className="feature-card glass-card">
              <div className="feature-icon">📄</div>
              <h3 className="feature-title">Image → PDF</h3>
              <p className="feature-desc">Convert one or more images into a single PDF. Choose A4, Letter or fit-to-image pages.</p>
              <Link to="/image-to-pdf" className="feature-link">Try it &rarr;</Link>
            </FadeInSection>

            <FadeInSection delay={600} className="feature-card glass-card">
              <div className="feature-icon">📑</div>
              <h3 className="feature-title">PDF Compress</h3>
              <p className="feature-desc">Reduce PDF file size by smart page re-encoding. Perfect for email and form uploads.</p>
              <Link to="/pdf-compress" className="feature-link">Try it &rarr;</Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      <div className="container">
        <AdUnit enabled={false} slot="1111111111" />
      </div>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">3 Simple Steps</h2>
          </FadeInSection>
          <div className="steps-container">
            <FadeInSection delay={100} className="step-item">
              <div className="step-number">1</div>
              <div className="step-icon">📤</div>
              <h3 className="step-title">Upload Your Photo</h3>
              <p className="step-desc">Drag & drop or click to upload your photo or signature</p>
            </FadeInSection>
            
            <div className="step-connector"></div>
            
            <FadeInSection delay={200} className="step-item">
              <div className="step-number">2</div>
              <div className="step-icon">⚙️</div>
              <h3 className="step-title">Choose Your Form</h3>
              <p className="step-desc">Select from 11+ form presets or enter custom dimensions</p>
            </FadeInSection>

            <div className="step-connector"></div>

            <FadeInSection delay={300} className="step-item">
              <div className="step-number">3</div>
              <div className="step-icon">⬇️</div>
              <h3 className="step-title">Download Instantly</h3>
              <p className="step-desc">Get your perfectly formatted image ready to submit</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Form Presets */}
      <section className="presets-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">One-Click Presets for Every Form</h2>
          </FadeInSection>
          
          <FadeInSection delay={100}>
            <div className="tabs">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeInSection>

          <div className="presets-grid">
            {PRESETS.filter(p => p.category === activeCategory).map((preset, index) => (
              <FadeInSection key={preset.id} delay={100 + (index * 50)} className="preset-card glass-card">
                <div className="preset-header">
                  <span className="preset-icon">{preset.icon || '📄'}</span>
                  <h3 className="preset-name">{preset.name}</h3>
                </div>
                <div className="preset-details">
                  <div className="detail-row">
                    <span className="detail-label">Dimensions:</span>
                    <span className="detail-value">{preset.width}x{preset.height} px</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Max Size:</span>
                    <span className="detail-value">{preset.maxSizeKb} KB</span>
                  </div>
                </div>
                <Link to={`/photo-resizer?preset=${preset.id}`} className="btn btn-outline btn-full">
                  Use Preset &rarr;
                </Link>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection delay={200}>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/exam-requirements" className="btn btn-primary">
                View all exam photo sizes →
              </Link>
              <Link to="/application-checker" className="btn btn-outline" style={{ marginLeft: '0.75rem' }}>
                Application Upload Checker →
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">Why Choose FormPhoto?</h2>
          </FadeInSection>
          <div className="why-grid">
            <FadeInSection delay={100} className="why-card glass-card">
              <div className="why-icon">🔒</div>
              <h3 className="why-title">100% Private</h3>
              <p className="why-desc">Your photos never leave your device. All processing happens in your browser.</p>
            </FadeInSection>
            <FadeInSection delay={200} className="why-card glass-card">
              <div className="why-icon">⚡</div>
              <h3 className="why-title">Lightning Fast</h3>
              <p className="why-desc">No uploading, no waiting. Instant processing powered by your browser.</p>
            </FadeInSection>
            <FadeInSection delay={300} className="why-card glass-card">
              <div className="why-icon">🎯</div>
              <h3 className="why-title">Pixel Perfect</h3>
              <p className="why-desc">Exact dimensions and file sizes. Meets every form requirement precisely.</p>
            </FadeInSection>
            <FadeInSection delay={400} className="why-card glass-card">
              <div className="why-icon">💰</div>
              <h3 className="why-title">Completely Free</h3>
              <p className="why-desc">No hidden fees, no watermarks, no sign-up required. Free forever.</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <FadeInSection>
            <h2 className="section-title">Loved by Students & Professionals</h2>
          </FadeInSection>
          <div className="testimonials-grid">
            <FadeInSection delay={100} className="testimonial-card glass-card">
              <p className="quote">"Saved me so much hassle during UPSC registration. The photo was accepted on the first try!"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">Priya S.</h4>
                  <span className="author-title">UPSC Aspirant</span>
                </div>
                <div className="stars">⭐⭐⭐⭐⭐</div>
              </div>
            </FadeInSection>
            <FadeInSection delay={200} className="testimonial-card glass-card">
              <p className="quote">"Finally, a tool that compresses to exact KB. No more trial and error with random tools."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">Rahul K.</h4>
                  <span className="author-title">Bank PO Candidate</span>
                </div>
                <div className="stars">⭐⭐⭐⭐⭐</div>
              </div>
            </FadeInSection>
            <FadeInSection delay={300} className="testimonial-card glass-card">
              <p className="quote">"Used it for my passport application. Simple, fast, and the photo came out perfect."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">Anita M.</h4>
                  <span className="author-title">Student</span>
                </div>
                <div className="stars">⭐⭐⭐⭐⭐</div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container faq-container">
          <FadeInSection>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </FadeInSection>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <div 
                  className={`faq-item glass-card ${openFaq === index ? 'open' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <h3>{faq.q}</h3>
                    <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <FadeInSection>
            <h2 className="cta-title">Ready to Format Your Photos?</h2>
            <p className="cta-desc">Join thousands of students and professionals who trust FormPhoto</p>
            <Link to="/photo-resizer" className="btn btn-primary btn-large btn-glow">
              Start Now — It's Free &rarr;
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
