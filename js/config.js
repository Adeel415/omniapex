/**
 * OmniApex — Central Configuration
 * ─────────────────────────────────
 * Edit this file to update all business information site-wide.
 * No HTML editing required for content changes.
 */

const SITE_CONFIG = {
  company: {
    name: "OmniApex",
    founder: "Muhammad Adila Bith",
    tagline: "Smart Solutions. Real Results.",
    phone: "0343 54 21 27 6",
    phoneFormatted: "+1 (034) 354-2127", // Display format for US audiences
    email: "",                            // e.g. hello@omniapex.com
    website: "https://your-domain.com",  // Replace with actual domain
    serviceArea: "Across the United States",
  },

  social: {
    linkedin:             "",  // https://www.linkedin.com/company/omniapex
    facebook:             "",  // https://www.facebook.com/omniapex
    instagram:            "",  // https://www.instagram.com/omniapex
    x:                    "",  // https://x.com/omniapex
    youtube:              "",  // https://www.youtube.com/@omniapex
    whatsapp:             "",  // https://wa.me/XXXXXXXXXX
    googleBusinessProfile:"",  // https://g.page/omniapex
  },

  seo: {
    siteName:           "OmniApex",
    defaultTitle:       "OmniApex | Roofing & Technology Services",
    defaultDescription: "OmniApex delivers professional roofing solutions and affordable technology services across the United States — from roof repairs and replacements to websites, mobile apps, and custom software.",
    keywords: [
      "roofing services USA",
      "roof repair",
      "roof replacement",
      "technology services",
      "web development",
      "mobile app development",
      "custom software",
      "affordable tech services",
    ],
    locale:   "en_US",
    language: "en-US",
    ogImage:  "/assets/images/og-default.jpg",
  },

  pages: {
    home:         { url: "/",                  title: "OmniApex | Roofing & Technology Services",                            description: "OmniApex delivers professional roofing solutions and affordable technology services across the United States." },
    roofing:      { url: "/roofing.html",      title: "Roofing Services | OmniApex",                                         description: "Professional roofing services across the USA — roof inspection, repair, replacement, storm damage, and emergency roofing assistance." },
    techServices: { url: "/tech-services.html",title: "Technology Services | OmniApex",                                      description: "Affordable websites, mobile apps, automation, landing pages, and custom software built for individuals, startups, and small businesses." },
    contact:      { url: "/contact.html",      title: "Contact OmniApex | Request a Quote",                                  description: "Get in touch with OmniApex for a roofing quote or technology project consultation. Fast response guaranteed." },
    about:        { url: "/about.html",        title: "About OmniApex | Roofing & Tech Services",                            description: "OmniApex is a dual-service company offering professional roofing solutions and modern technology services across the United States." },
    privacy:      { url: "/privacy.html",      title: "Privacy Policy | OmniApex",                                           description: "OmniApex privacy policy — how we collect, use, and protect your information." },
  },

  branding: {
    primary:     "#1B4FD8",   // Deep blue — brand anchor
    primaryDark: "#0F3399",   // Darker blue for hover states
    accent:      "#3B7BF7",   // Bright blue — CTAs, highlights
    dark:        "#0A1628",   // Near-black navy — headings, footer
    midDark:     "#1E2D45",   // Mid-dark — secondary text backgrounds
    white:       "#FFFFFF",
    background:  "#F5F8FF",   // Extremely light blue-tinted background
    surface:     "#EDF2FF",   // Card / section tint
    border:      "#D0DCFF",   // Subtle blue border
    text:        "#1A2540",   // Primary body text
    textMuted:   "#5A6A85",   // Secondary / helper text
  },

  nav: {
    links: [
      { label: "Roofing",       href: "roofing.html" },
      { label: "Tech Services", href: "tech-services.html" },
      { label: "About",         href: "about.html" },
      { label: "Contact",       href: "contact.html" },
    ],
    cta: { label: "Get a Quote", href: "contact.html" },
  },

  // Contact form submission endpoint
  // Set this to your serverless function URL after deployment
  formEndpoint: "/.netlify/functions/contact",
};

// Make globally available
window.SITE_CONFIG = SITE_CONFIG;
