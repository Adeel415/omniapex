/**
 * OmniApex — App Module
 * ──────────────────────
 * Shared rendering utilities: service cards, scroll animations,
 * intersection observer, and general page setup.
 */

(function () {
  "use strict";

  // ── Render roofing service cards ────────────────────────────────
  function renderRoofingServices(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const services = SERVICES.roofing || [];
    container.innerHTML = services.map(s => `
      <article class="service-card" aria-label="${s.name}">
        ${s.badge ? `<div class="service-card__badge service-card__badge--urgent">${s.badge}</div>` : ""}
        <div class="service-card__icon" aria-hidden="true">
          ${getServiceIcon(s.icon)}
        </div>
        <h3 class="service-card__name">${s.name}</h3>
        <p class="service-card__description">${s.description}</p>
        <ul class="service-card__bullets" role="list">
          ${s.bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
        <a href="${s.href}" class="service-card__cta">${s.cta} →</a>
      </article>`).join("");
  }

  // ── Render tech service cards ───────────────────────────────────
  function renderTechServices(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // Delegated to pricing.js renderTechPricingCards
    if (typeof renderTechPricingCards === "function") {
      renderTechPricingCards(containerId);
    }
  }

  // ── Render FAQ ──────────────────────────────────────────────────
  function renderFAQ(containerId, faqs) {
    const container = document.getElementById(containerId);
    if (!container || !faqs) return;

    container.innerHTML = faqs.map((faq, i) => `
      <div class="faq-item">
        <button class="faq-question"
                aria-expanded="false"
                aria-controls="faq-answer-${i}"
                id="faq-btn-${i}">
          <span>${faq.question}</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="faq-answer"
             id="faq-answer-${i}"
             role="region"
             aria-labelledby="faq-btn-${i}">
          <div class="faq-answer__inner">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>`).join("");

    // Init accordion after rendering
    if (typeof initFAQAccordion === "function") {
      initFAQAccordion(containerId);
    }
  }

  // ── Scroll-reveal animations ─────────────────────────────────────
  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }

  // ── Smooth scroll for anchor links ───────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Update focus for accessibility
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  // ── Phone number from config ──────────────────────────────────────
  function injectPhoneLinks() {
    const phone = SITE_CONFIG.company.phone;
    if (!phone) return;
    document.querySelectorAll("[data-phone]").forEach(el => {
      el.textContent = phone;
      if (el.tagName === "A") {
        el.href = "tel:" + phone.replace(/\s/g, "");
      }
    });
  }

  // ── Inject company name from config ──────────────────────────────
  function injectCompanyData() {
    const c = SITE_CONFIG.company;
    document.querySelectorAll("[data-company-name]").forEach(el => {
      el.textContent = c.name;
    });
    document.querySelectorAll("[data-company-tagline]").forEach(el => {
      el.textContent = c.tagline;
    });
  }

  // ── Page init ─────────────────────────────────────────────────────
  function initPage() {
    renderNavigation();
    renderFooter();
    injectPhoneLinks();
    injectCompanyData();
    initScrollReveal();
    initSmoothScroll();
  }

  window.renderRoofingServices = renderRoofingServices;
  window.renderTechServices    = renderTechServices;
  window.renderFAQ             = renderFAQ;
  window.initScrollReveal      = initScrollReveal;
  window.initPage              = initPage;
})();
