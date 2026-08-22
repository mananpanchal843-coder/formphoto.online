import React from 'react';
import SEOHead from '../components/SEOHead';
import './LegalPages.css';

export default function Privacy() {
  return (
    <div className="legal-page">
      <SEOHead
        title="Privacy Policy"
        path="/privacy"
        description="FormPhoto Privacy Policy. Learn how we handle your data. All photo processing happens in your browser – we never upload or store your images."
        keywords="formphoto privacy policy, photo resizer privacy"
      />
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: August 19, 2026</p>

      <p>
        FormPhoto (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website formphoto.online.
        This Privacy Policy explains how we collect, use, and protect information when you use our free photo tools.
      </p>

      <h2>1. Images and files you process</h2>
      <p>
        <strong>All image and PDF processing happens entirely in your browser.</strong> Your photos,
        signatures, and documents are never uploaded to our servers. We do not store, view, or share
        the files you resize, compress, or convert.
      </p>

      <h2>2. Information we may collect</h2>
      <ul>
        <li>
          <strong>Usage data:</strong> anonymous analytics (pages visited, device type, approximate
          location) via tools such as Google Analytics, if enabled.
        </li>
        <li>
          <strong>Cookies:</strong> essential cookies for theme preference and site function.
          Advertising cookies may be used if Google AdSense is active on the site.
        </li>
        <li>
          <strong>Contact:</strong> if you email us, we receive the email address and message you send.
        </li>
      </ul>

      <h2>3. Google AdSense and advertising</h2>
      <p>
        We may use Google AdSense to display ads. Google and its partners use cookies to serve ads
        based on your prior visits to this or other websites. You can opt out of personalized
        advertising by visiting{' '}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        .
      </p>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior
        visits. Google&apos;s use of advertising cookies enables it and its partners to serve ads
        based on visits to this site and/or other sites on the Internet.
      </p>

      <h2>4. How we use information</h2>
      <ul>
        <li>To operate and improve FormPhoto</li>
        <li>To understand aggregate usage patterns</li>
        <li>To display relevant advertisements (when AdSense is enabled)</li>
        <li>To respond to support requests</li>
      </ul>

      <h2>5. Data sharing</h2>
      <p>
        We do not sell your personal data. We may share anonymous aggregate statistics. Advertising
        partners (e.g. Google) may receive cookie-based data as described in their own policies.
      </p>

      <h2>6. Data security</h2>
      <p>
        Because file processing is client-side, your images never leave your device through our
        service. We use HTTPS for the website itself.
      </p>

      <h2>7. Children&apos;s privacy</h2>
      <p>
        FormPhoto is intended for general audiences, including students preparing for exams. We do
        not knowingly collect personal information from children under 13.
      </p>

      <h2>8. Your choices</h2>
      <ul>
        <li>Clear cookies in your browser at any time</li>
        <li>Use browser extensions or settings to block ads/trackers</li>
        <li>Opt out of personalized ads via Google Ads Settings</li>
      </ul>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
        the top will change when we do.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about privacy? Email us at{' '}
        <a href="mailto:privacy@formphoto.online">privacy@formphoto.online</a> or use our{' '}
        <a href="/contact">Contact page</a>.
      </p>
    </div>
  );
}
