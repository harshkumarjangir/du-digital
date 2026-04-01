import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoData, defaultSEO, BASE_URL, DEFAULT_OG_IMAGE } from '../../data/seoData';

/**
 * SEO component that automatically manages <head> meta tags
 * based on the current route. Reads from seoData mapping.
 * Place once in App.jsx — it auto-updates on every route change.
 */
const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/\/$/, '') || '/';

    // Look up SEO data: exact match → base path for dynamic routes → default
    const seo = seoData[pathname] || getBaseSEO(pathname) || defaultSEO;

    const title = seo.title || defaultSEO.title;
    const description = seo.description || defaultSEO.description;
    const url = `${BASE_URL}${location.pathname}`;
    const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
    const ogType = seo.ogType || 'website';

    // Title
    document.title = title;

    // Standard meta
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow');

    // Canonical
    setLink('canonical', url);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', ogType);

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
  }, [location.pathname]);

  return null;
};

/**
 * For dynamic routes like /investor-relation/:slug, /blog/:id, /events/:id
 * fall back to the base path's SEO data.
 */
function getBaseSEO(pathname) {
  if (pathname.startsWith('/investor-relation/')) return seoData['/investor-relation'];
  if (pathname.startsWith('/blog/')) return seoData['/blogs'];
  if (pathname.startsWith('/events/')) return seoData['/events'];
  if (pathname.startsWith('/swifttravels/')) return seoData['/swifttravels'];
  return null;
}

/**
 * Set or create a <meta> tag in <head>
 */
function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/**
 * Set or create a <link> tag in <head>
 */
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default SEO;
