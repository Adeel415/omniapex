/**
 * OmniApex — SEO Module
 * ─────────────────────
 * Injects meta tags, Open Graph, Twitter/X card, canonical URL,
 * and JSON-LD structured data from config. Call initSEO() on page load.
 */

(function () {
  "use strict";

  function setMeta(name, content, attr = "name") {
    if (!content) return;
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function setLink(rel, href) {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  }

  function injectJSONLD(schema) {
    const el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(el);
  }

  function getConfiguredSocialLinks() {
    const social = SITE_CONFIG.social || {};
    return Object.values(social).filter(url => url && url.trim().length > 0);
  }

  function buildOrganizationSchema() {
    const c      = SITE_CONFIG.company;
    const seo    = SITE_CONFIG.seo;
    const social = getConfiguredSocialLinks();

    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": c.name,
      "url": c.website,
      "description": seo.defaultDescription,
      "foundingPerson": { "@type": "Person", "name": c.founder },
      "areaServed": {
        "@type": "Country",
        "name": "United States",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "OmniApex Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Professional Roofing Services" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technology Services" } },
        ],
      },
    };

    if (c.phone) schema.telephone = c.phone;
    if (c.email) schema.email = c.email;
    if (social.length) schema.sameAs = social;

    return schema;
  }

  function buildWebSiteSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_CONFIG.seo.siteName,
      "url": SITE_CONFIG.company.website,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": SITE_CONFIG.company.website + "/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  function buildBreadcrumbSchema(crumbs) {
    if (!crumbs || crumbs.length < 2) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": crumbs.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": c.name,
        "item": SITE_CONFIG.company.website + c.url,
      })),
    };
  }

  function buildServiceSchema(name, description, url) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": name,
      "provider": {
        "@type": "Organization",
        "name": SITE_CONFIG.company.name,
        "url": SITE_CONFIG.company.website,
      },
      "description": description,
      "url": SITE_CONFIG.company.website + url,
      "areaServed": { "@type": "Country", "name": "United States" },
    };
  }

  function buildFAQSchema(faqs) {
    if (!faqs || !faqs.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };
  }

  /**
   * Main init function — call on each page with page-specific options.
   * @param {Object} opts
   * @param {string} opts.title
   * @param {string} opts.description
   * @param {string} opts.url          - page path, e.g. "/roofing.html"
   * @param {string} [opts.ogType]     - defaults to "website"
   * @param {string} [opts.ogImage]
   * @param {Array}  [opts.breadcrumbs]
   * @param {Array}  [opts.faqs]
   * @param {Object} [opts.service]    - { name, description } for service pages
   * @param {boolean}[opts.isHome]
   */
  function initSEO(opts = {}) {
    const cfg  = SITE_CONFIG;
    const seo  = cfg.seo;
    const c    = cfg.company;

    const title       = opts.title       || seo.defaultTitle;
    const description = opts.description || seo.defaultDescription;
    const pageURL     = c.website + (opts.url || "/");
    const ogType      = opts.ogType || "website";
    const ogImage     = opts.ogImage || seo.ogImage;

    // ── Document title ──────────────────────────────────────────────
    document.title = title;

    // ── Core meta ───────────────────────────────────────────────────
    setMeta("description", description);
    setMeta("robots", "index, follow");
    setMeta("author", c.founder);
    setMeta("language", seo.language);
    setMeta("theme-color", cfg.branding.primary);

    // ── Canonical ───────────────────────────────────────────────────
    setLink("canonical", pageURL);

    // ── Open Graph ──────────────────────────────────────────────────
    setMeta("og:type",        ogType,        "property");
    setMeta("og:title",       title,         "property");
    setMeta("og:description", description,   "property");
    setMeta("og:url",         pageURL,       "property");
    setMeta("og:site_name",   seo.siteName,  "property");
    setMeta("og:locale",      seo.locale,    "property");
    if (ogImage) setMeta("og:image", c.website + ogImage, "property");

    // ── Twitter / X Card ────────────────────────────────────────────
    setMeta("twitter:card",        "summary_large_image");
    setMeta("twitter:title",       title);
    setMeta("twitter:description", description);
    if (ogImage) setMeta("twitter:image", c.website + ogImage);

    // ── JSON-LD ─────────────────────────────────────────────────────
    if (opts.isHome) {
      injectJSONLD(buildWebSiteSchema());
    }
    injectJSONLD(buildOrganizationSchema());

    if (opts.service) {
      injectJSONLD(buildServiceSchema(opts.service.name, opts.service.description, opts.url));
    }

    if (opts.breadcrumbs) {
      const bc = buildBreadcrumbSchema(opts.breadcrumbs);
      if (bc) injectJSONLD(bc);
    }

    if (opts.faqs) {
      const faq = buildFAQSchema(opts.faqs);
      if (faq) injectJSONLD(faq);
    }
  }

  window.initSEO           = initSEO;
  window.buildFAQSchema    = buildFAQSchema;
  window.buildBreadcrumbSchema = buildBreadcrumbSchema;
})();
