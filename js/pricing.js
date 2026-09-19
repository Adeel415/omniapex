/**
 * OmniApex — Pricing Module
 * ──────────────────────────
 * Renders pricing cards from SERVICES config.
 * Automatically displays active price (or sale price if in discount window).
 */

(function () {
  "use strict";

  function formatPrice(service) {
    const p = getActivePrice(service);
    if (!p.price) {
      return `<span class="price-label">Request a Quote</span>`;
    }

    let html = `<div class="price-display">`;

    if (p.isOnSale && p.originalPrice) {
      html += `<span class="price-original">${p.currency}${p.originalPrice}</span>`;
    }

    html += `<div class="price-main">
               <span class="price-from">From</span>
               <span class="price-amount">${p.currency}${p.price}</span>
             </div>`;

    if (p.isOnSale) {
      html += `<span class="price-badge">Sale</span>`;
    }

    html += `</div>`;
    return html;
  }

  function renderTechPricingCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const services = SERVICES.tech || [];
    container.innerHTML = services.map(s => {
      const p       = getActivePrice(s);
      const hasPrice = !!p.price;

      return `
        <article class="pricing-card${s.badge ? " pricing-card--featured" : ""}" aria-label="${s.name} — ${hasPrice ? "From $" + p.price : "Custom pricing"}">
          ${s.badge ? `<div class="pricing-card__badge">${s.badge}</div>` : ""}

          <div class="pricing-card__icon" aria-hidden="true">
            ${getServiceIcon(s.icon)}
          </div>

          <h3 class="pricing-card__name">${s.name}</h3>
          <p class="pricing-card__description">${s.description}</p>

          <ul class="pricing-card__bullets" role="list">
            ${s.bullets.map(b => `<li>${b}</li>`).join("")}
          </ul>

          <div class="pricing-card__footer">
            <div class="pricing-card__price">
              ${formatPrice(s)}
            </div>
            <a href="${s.href}" class="btn ${s.badge ? "btn--primary" : "btn--outline"} btn--full">${s.cta}</a>
          </div>
        </article>`;
    }).join("");
  }

  function getServiceIcon(name) {
    const icons = {
      user:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      briefcase:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
      layout:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
      smartphone:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
      zap:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      code:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      search:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      tool:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      home:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      droplet:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      layers:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      shield:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      "cloud-lightning": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`,
      calendar:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      "alert-triangle": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    };
    return icons[name] || icons.code;
  }

  window.renderTechPricingCards = renderTechPricingCards;
  window.getServiceIcon         = getServiceIcon;
  window.formatPrice            = formatPrice;
})();
