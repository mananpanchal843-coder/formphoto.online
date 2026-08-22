import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import './LegalPages.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mailto fallback – replace with form backend later if needed
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const subject = encodeURIComponent(`FormPhoto contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:support@formphoto.online?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="legal-page">
      <SEOHead
        title="Contact Us"
        path="/contact"
        description="Contact FormPhoto support. Questions about photo size, tools, or privacy? We are here to help."
      />
      <h1>Contact Us</h1>
      <p className="legal-updated">We usually reply within 1–2 business days</p>

      <p>
        Have a question about photo sizes, a tool issue, or partnership? Send a message below or
        email <a href="mailto:support@formphoto.online">support@formphoto.online</a>.
      </p>

      <div className="legal-card">
        {sent ? (
          <p style={{ color: 'var(--color-primary)', margin: 0 }}>
            Your email app should open with the message. If it doesn&apos;t, write to
            support@formphoto.online directly. Thank you!
          </p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="How can we help?"
              />
            </div>
            <button type="submit">Send message</button>
          </form>
        )}
      </div>

      <h2>Other links</h2>
      <ul>
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
        <li>
          <a href="/about">About FormPhoto</a>
        </li>
      </ul>
    </div>
  );
}
