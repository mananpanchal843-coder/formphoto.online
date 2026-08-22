import React from 'react';
import SEOHead from './SEOHead';
import './LegalPages.css';

export default function Terms() {
  return (
    <div className="legal-page">
      <SEOHead
        title="Terms of Service"
        path="/terms"
        description="Terms of Service for FormPhoto – free online photo resizer, signature resizer and image tools for Indian forms."
      />
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: August 19, 2026</p>

      <p>
        By using FormPhoto (formphoto.online), you agree to these Terms of Service. If you do not agree,
        please do not use the site.
      </p>

      <h2>1. Service description</h2>
      <p>
        FormPhoto provides free, browser-based tools to resize photos and signatures, compress
        images and PDFs, remove backgrounds, and convert images to PDF—primarily for Indian
        government forms, exams, and applications.
      </p>

      <h2>2. Free use</h2>
      <p>
        The tools are free to use. We may display advertisements to support the service. We reserve
        the right to change features or introduce limits in the future.
      </p>

      <h2>3. Your responsibilities</h2>
      <ul>
        <li>You are responsible for the images and files you process</li>
        <li>You must have the right to use any content you upload/process</li>
        <li>You must not use the service for illegal or harmful purposes</li>
        <li>You should verify final photo dimensions and file sizes against official form requirements</li>
      </ul>

      <h2>4. No warranty</h2>
      <p>
        Tools are provided &quot;as is&quot;. We do not guarantee that output will always match a
        particular exam board&apos;s requirements, as rules can change. Always check the official
        notification for the latest photo/signature specifications.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        FormPhoto is not liable for rejected applications, exam form issues, or any damages arising
        from use of the tools. Processing happens on your device; we do not control or store your files.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The FormPhoto name, design, and code are protected. You may not copy or resell the service
        as your own.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these terms. Continued use after changes means you accept the updated terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        For questions: <a href="mailto:support@formphoto.online">support@formphoto.online</a> or{' '}
        <a href="/contact">Contact page</a>.
      </p>
    </div>
  );
}
