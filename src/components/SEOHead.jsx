import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://formphoto.online';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.svg`;

const cleanTitle = (value) => value.replace(/\s*\|\s*FormPhoto\s*$/i, '').trim();

const SEOHead = ({
  title,
  description,
  path = '',
  keywords = '',
  type = 'website',
  faqs = null,
  noindex = false,
  image = DEFAULT_IMAGE,
  publishedTime = null,
  modifiedTime = null,
}) => {
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  const url = `${BASE_URL}${normalizedPath}`;
  const fullTitle = /formphoto/i.test(title) ? title : `${title} | FormPhoto`;
  const pageName = cleanTitle(fullTitle);

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FormPhoto',
    url: BASE_URL,
    applicationCategory: 'UtilitiesApplication',
    applicationSubCategory: 'Image Editing',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled',
    description:
      'Free browser-based photo, signature, image compression and document tools for Indian forms, exams and applications.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Photo resizing to exact pixel dimensions',
      'Signature resizing for application forms',
      'Image compression to target KB limits',
      'Indian exam and application presets',
      'Background removal',
      'Image to PDF conversion',
      'PDF compression',
      'Client-side browser processing',
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FormPhoto',
    url: BASE_URL,
    logo: DEFAULT_IMAGE,
    description: 'Browser-based photo and document tools for Indian forms and applications.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FormPhoto',
    url: BASE_URL,
    inLanguage: 'en-IN',
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    url,
    description,
    isPartOf: { '@type': 'WebSite', name: 'FormPhoto', url: BASE_URL },
    inLanguage: 'en-IN',
  };

  if (publishedTime) webpageSchema.datePublished = publishedTime;
  if (modifiedTime) webpageSchema.dateModified = modifiedTime;

  const breadcrumbSchema = path
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageName,
            item: url,
          },
        ],
      }
    : null;

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="FormPhoto" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="FormPhoto — free photo and signature tools for Indian forms" />
      <meta property="og:image:type" content="image/svg+xml" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="FormPhoto — free photo and signature tools for Indian forms" />

      <meta name="author" content="FormPhoto" />
      <meta name="application-name" content="FormPhoto" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="format-detection" content="telephone=no" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <script type="application/ld+json">{JSON.stringify(webApplicationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
    </Helmet>
  );
};

export default SEOHead;
