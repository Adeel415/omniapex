/**
 * OmniApex — Contact / Quote Form Module
 * ────────────────────────────────────────
 * Handles form rendering, validation, submission, and UI states.
 * Submits to serverless function endpoint — no secrets in frontend.
 */

(function () {
  "use strict";

  // Pre-fill service dropdown from URL param
  function getURLParam(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  // ── Validation rules ────────────────────────────────────────────
  const VALIDATORS = {
    name:    v => v.trim().length >= 2                              ? "" : "Please enter your full name (at least 2 characters).",
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())     ? "" : "Please enter a valid email address.",
    phone:   v => v.trim() === "" || /^[\d\s\-\+\(\)\.]{7,20}$/.test(v.trim()) ? "" : "Please enter a valid phone number.",
    zip:     v => v.trim() === "" || /^\d{5}(-\d{4})?$/.test(v.trim())         ? "" : "Please enter a valid US ZIP code (e.g. 90210).",
    message: v => v.trim().length >= 10                            ? "" : "Please provide more detail (at least 10 characters).",
    service: v => v !== ""                                         ? "" : "Please select a service.",
  };

  function validate(name, value) {
    return VALIDATORS[name] ? VALIDATORS[name](value) : "";
  }

  // ── Show/clear field error ──────────────────────────────────────
  function showFieldError(field, message) {
    const wrapper = field.closest(".form-field");
    if (!wrapper) return;
    field.setAttribute("aria-invalid", "true");
    let err = wrapper.querySelector(".field-error");
    if (!err) {
      err = document.createElement("span");
      err.className  = "field-error";
      err.setAttribute("role", "alert");
      err.setAttribute("aria-live", "polite");
      wrapper.appendChild(err);
    }
    err.textContent = message;
  }

  function clearFieldError(field) {
    const wrapper = field.closest(".form-field");
    if (!wrapper) return;
    field.removeAttribute("aria-invalid");
    const err = wrapper.querySelector(".field-error");
    if (err) err.textContent = "";
  }

  // ── Set form state ──────────────────────────────────────────────
  function setFormState(form, state) {
    const btn      = form.querySelector("[data-submit]");
    const feedback = document.getElementById("form-feedback");
    if (!btn || !feedback) return;

    feedback.className  = "form-feedback";
    feedback.innerHTML  = "";
    feedback.removeAttribute("role");

    if (state === "loading") {
      btn.disabled     = true;
      btn.textContent  = "Sending…";
      btn.setAttribute("aria-busy", "true");
    } else if (state === "success") {
      btn.disabled     = false;
      btn.textContent  = "Send Message";
      btn.removeAttribute("aria-busy");
      feedback.classList.add("form-feedback--success");
      feedback.setAttribute("role", "status");
      feedback.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div>
          <strong>Message sent successfully.</strong>
          <p>Thank you for contacting OmniApex. We'll be in touch shortly.</p>
        </div>`;
      feedback.focus();
      form.reset();
      // Restore any URL-driven pre-fill
      const s = getURLParam("service");
      if (s) {
        const sel = form.querySelector('[name="service"]');
        if (sel) sel.value = s;
      }
    } else if (state === "error") {
      btn.disabled     = false;
      btn.textContent  = "Send Message";
      btn.removeAttribute("aria-busy");
      feedback.classList.add("form-feedback--error");
      feedback.setAttribute("role", "alert");
      feedback.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <div>
          <strong>Something went wrong.</strong>
          <p>Please try again or contact us directly${SITE_CONFIG.company.phone ? " at " + SITE_CONFIG.company.phone : ""}.</p>
        </div>`;
      feedback.focus();
    } else {
      // idle
      btn.disabled     = false;
      btn.textContent  = "Send Message";
      btn.removeAttribute("aria-busy");
    }
  }

  // ── Form init ───────────────────────────────────────────────────
  function initContactForm(formId = "contact-form") {
    const form = document.getElementById(formId);
    if (!form) return;

    // Pre-fill service from URL
    const preService = getURLParam("service");
    if (preService) {
      const sel = form.querySelector('[name="service"]');
      if (sel) sel.value = preService;
    }

    // Inline validation on blur
    form.querySelectorAll("[data-validate]").forEach(field => {
      field.addEventListener("blur", () => {
        const err = validate(field.name, field.value);
        err ? showFieldError(field, err) : clearFieldError(field);
      });
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
          const err = validate(field.name, field.value);
          err ? showFieldError(field, err) : clearFieldError(field);
        }
      });
    });

    // Submit
    let submitting = false;
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (submitting) return;

      // Validate all fields
      let hasError = false;
      form.querySelectorAll("[data-validate]").forEach(field => {
        const err = validate(field.name, field.value);
        if (err) {
          showFieldError(field, err);
          hasError = true;
        }
      });

      if (hasError) {
        const firstErr = form.querySelector("[aria-invalid='true']");
        if (firstErr) firstErr.focus();
        return;
      }

      submitting = true;
      setFormState(form, "loading");

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        const endpoint = SITE_CONFIG.formEndpoint || "/.netlify/functions/contact";
        const res = await fetch(endpoint, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(data),
        });

        if (res.ok) {
          setFormState(form, "success");
        } else {
          setFormState(form, "error");
        }
      } catch (err) {
        console.error("Form submission error:", err);
        setFormState(form, "error");
      } finally {
        submitting = false;
      }
    });
  }

  // ── FAQ accordion ───────────────────────────────────────────────
  function initFAQAccordion(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.querySelectorAll(".faq-item").forEach(item => {
      const btn    = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!btn || !answer) return;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Close all
        container.querySelectorAll(".faq-item.is-open").forEach(open => {
          open.classList.remove("is-open");
          open.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          open.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });

      btn.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  window.initContactForm  = initContactForm;
  window.initFAQAccordion = initFAQAccordion;
})();
