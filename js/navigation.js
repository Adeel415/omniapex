/**
 * OmniApex — Navigation Module
 * ─────────────────────────────
 * Renders sticky navigation, mobile hamburger menu,
 * and injects social links from config.
 */

(function () {
  "use strict";

  const SOCIAL_META = {
    linkedin:              { label: "LinkedIn",              icon: "linkedin" },
    facebook:              { label: "Facebook",              icon: "facebook" },
    instagram:             { label: "Instagram",             icon: "instagram" },
    x:                     { label: "X (Twitter)",           icon: "x-twitter" },
    youtube:               { label: "YouTube",               icon: "youtube" },
    whatsapp:              { label: "WhatsApp",              icon: "whatsapp" },
    googleBusinessProfile: { label: "Google Business",       icon: "google" },
  };

  function getSocialIcon(key) {
    const icons = {
      linkedin:  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      facebook:  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
      instagram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
      "x-twitter": `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
      youtube:   `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
      whatsapp:  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
      google:    `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>`,
    };
    return icons[key] || `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>`;
  }

  function renderSocialLinks(container, size = "md") {
    if (!container) return;
    const social = SITE_CONFIG.social || {};
    const links  = Object.entries(social).filter(([, url]) => url && url.trim());

    if (!links.length) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = links.map(([key, url]) => {
      const meta = SOCIAL_META[key] || { label: key, icon: key };
      return `
        <a href="${url}"
           class="social-link social-link--${size}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="${meta.label}"
           title="${meta.label}">
          ${getSocialIcon(meta.icon)}
        </a>`;
    }).join("");
  }

  function renderNavigation() {
    const cfg  = SITE_CONFIG;
    const nav  = cfg.nav;
    const current = window.location.pathname.split("/").pop() || "index.html";

    const navHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <header class="site-header" id="site-header" role="banner">
        <nav class="nav-container" aria-label="Main navigation">
          <a href="index.html" class="nav-logo" aria-label="${cfg.company.name} — Home">
            <span class="nav-logo__mark" aria-hidden="true">◆</span>
            <span class="nav-logo__name">${cfg.company.name}</span>
          </a>

          <ul class="nav-links" role="list">
            ${nav.links.map(link => {
              const isActive = current === link.href || current === link.href.replace(".html", "") || (current === "" && link.href === "index.html");
              return `<li><a href="${link.href}" class="nav-link${isActive ? " nav-link--active" : ""}" ${isActive ? 'aria-current="page"' : ""}>${link.label}</a></li>`;
            }).join("")}
          </ul>

          <div class="nav-actions">
            <a href="${nav.cta.href}" class="btn btn--primary btn--sm">${nav.cta.label}</a>
            <button class="nav-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
              <span class="nav-toggle__bar"></span>
              <span class="nav-toggle__bar"></span>
              <span class="nav-toggle__bar"></span>
            </button>
          </div>
        </nav>

        <div class="mobile-menu" id="mobile-menu" aria-hidden="true" role="dialog" aria-label="Mobile navigation">
          <ul class="mobile-nav-links" role="list">
            ${nav.links.map(link => `<li><a href="${link.href}" class="mobile-nav-link">${link.label}</a></li>`).join("")}
            <li class="mobile-nav-cta"><a href="${nav.cta.href}" class="btn btn--primary">${nav.cta.label}</a></li>
          </ul>
        </div>
      </header>`;

    const wrapper = document.getElementById("nav-root");
    if (wrapper) wrapper.innerHTML = navHTML;

    // Sticky header behavior
    const header = document.getElementById("site-header");
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      if (current > 80) {
        header.classList.add("site-header--scrolled");
      } else {
        header.classList.remove("site-header--scrolled");
      }
      lastScroll = current;
    }, { passive: true });

    // Mobile toggle
    const toggle   = document.querySelector(".nav-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen);
        mobileMenu.setAttribute("aria-hidden", !isOpen);
        toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      // Close on link click
      mobileMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          mobileMenu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          mobileMenu.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        });
      });

      // Close on Escape
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
          mobileMenu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          mobileMenu.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
          toggle.focus();
        }
      });
    }
  }

  function renderFooter() {
    const cfg  = SITE_CONFIG;
    const c    = cfg.company;
    const year = new Date().getFullYear();

    const footerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="footer-inner">
          <div class="footer-brand">
            <a href="index.html" class="footer-logo" aria-label="${c.name} — Home">
              <span class="footer-logo__mark" aria-hidden="true">◆</span>
              <span class="footer-logo__name">${c.name}</span>
            </a>
            <p class="footer-tagline">${c.tagline}</p>
            <div class="footer-social" aria-label="Social media links" id="footer-social"></div>
          </div>

          <nav class="footer-nav" aria-label="Footer navigation">
            <div class="footer-col">
              <h3 class="footer-col__title">Services</h3>
              <ul role="list">
                <li><a href="roofing.html">Roofing</a></li>
                <li><a href="roofing.html#services">Roof Repair</a></li>
                <li><a href="roofing.html#services">Roof Replacement</a></li>
                <li><a href="tech-services.html">Web Development</a></li>
                <li><a href="tech-services.html#services">Mobile Apps</a></li>
                <li><a href="tech-services.html#services">Automation</a></li>
                <li><a href="tech-services.html#services">Custom Software</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3 class="footer-col__title">Company</h3>
              <ul role="list">
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="contact.html">Get a Quote</a></li>
                <li><a href="privacy.html">Privacy Policy</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3 class="footer-col__title">Contact</h3>
              <ul role="list" class="footer-contact-list">
                ${c.phone ? `<li><a href="tel:${c.phone.replace(/\s/g,"")}">📞 ${c.phone}</a></li>` : ""}
                ${c.email ? `<li><a href="mailto:${c.email}">✉ ${c.email}</a></li>` : ""}
                <li><span>Service area: ${c.serviceArea}</span></li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="footer-bottom">
          <p>© ${year} ${c.name}. All rights reserved.</p>
          <p>Founded by ${c.founder}</p>
        </div>
      </footer>`;

    const wrapper = document.getElementById("footer-root");
    if (wrapper) {
      wrapper.innerHTML = footerHTML;
      renderSocialLinks(document.getElementById("footer-social"), "sm");
    }
  }

  window.renderNavigation = renderNavigation;
  window.renderFooter     = renderFooter;
  window.renderSocialLinks = renderSocialLinks;
})();
