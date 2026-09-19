/**
 * OmniApex — Services & Pricing Data
 * ────────────────────────────────────
 * Add, remove, or edit services here.
 * To enable a discount: set discountEnabled: true and configure salePrice + dates.
 * Price shown is automatically calculated based on the current date.
 */

const SERVICES = {

  roofing: [
    {
      id: "roof-inspection",
      name: "Roof Inspection",
      icon: "search",
      description: "A thorough inspection of your roof's structure, materials, flashing, gutters, and drainage — with a detailed written report and photo documentation.",
      bullets: ["Visual and physical assessment", "Detailed written report", "Photo documentation", "Actionable recommendations"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Request Inspection",
      href: "contact.html?service=roof-inspection",
    },
    {
      id: "roof-repair",
      name: "Roof Repair",
      icon: "tool",
      description: "Fast, reliable repair for damaged shingles, flashing, seals, and structural issues — stopping leaks before they become costly problems.",
      bullets: ["Shingle and flashing repair", "Seal and membrane repair", "Gutter and fascia repair", "Leak source identification"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Get Repair Quote",
      href: "contact.html?service=roof-repair",
    },
    {
      id: "roof-replacement",
      name: "Roof Replacement",
      icon: "home",
      description: "Complete roof system replacement using durable materials suited to your property, climate, and budget — with professional installation from start to finish.",
      bullets: ["Full teardown and replacement", "Material selection guidance", "Shingle, metal, and flat roof options", "Disposal of old materials included"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Request Replacement Quote",
      href: "contact.html?service=roof-replacement",
    },
    {
      id: "roof-leak-repair",
      name: "Roof Leak Repair",
      icon: "droplet",
      description: "Precise diagnosis and repair of active roof leaks — protecting your home from water damage, mold, and structural deterioration.",
      bullets: ["Leak source detection", "Emergency response available", "Interior and exterior repair", "Moisture damage assessment"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Report a Leak",
      href: "contact.html?service=roof-leak",
    },
    {
      id: "shingle-roofing",
      name: "Shingle Roofing",
      icon: "layers",
      description: "Installation and replacement of asphalt and architectural shingles — the most popular roofing material in the US, combining affordability with proven durability.",
      bullets: ["Asphalt and architectural shingles", "Multiple color and style options", "High wind-resistance options", "Manufacturer warranty available"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Explore Shingle Options",
      href: "contact.html?service=shingle-roofing",
    },
    {
      id: "metal-roofing",
      name: "Metal Roofing",
      icon: "shield",
      description: "Long-lasting metal roof installation for residential and commercial properties — exceptional durability, energy efficiency, and resistance to extreme weather.",
      bullets: ["40–70 year lifespan", "Energy-efficient options", "Standing seam and metal shingle styles", "Excellent storm resistance"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Explore Metal Roofing",
      href: "contact.html?service=metal-roofing",
    },
    {
      id: "storm-damage",
      name: "Storm Damage Repair",
      icon: "cloud-lightning",
      description: "Rapid assessment and repair after hail, wind, or storm damage — including insurance claim documentation support.",
      bullets: ["Emergency response", "Insurance documentation support", "Hail and wind damage repair", "Full post-storm inspection"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Report Storm Damage",
      href: "contact.html?service=storm-damage",
    },
    {
      id: "roof-maintenance",
      name: "Roof Maintenance",
      icon: "calendar",
      description: "Scheduled maintenance programs that extend your roof's life, prevent costly damage, and keep your warranty valid.",
      bullets: ["Annual inspection programs", "Gutter cleaning and clearing", "Sealant refresh and caulking", "Priority service scheduling"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Schedule Maintenance",
      href: "contact.html?service=maintenance",
    },
    {
      id: "emergency-roofing",
      name: "Emergency Roofing",
      icon: "alert-triangle",
      description: "Rapid-response roofing assistance for urgent situations — temporary protection and priority scheduling to minimize damage to your property.",
      bullets: ["Fast response times", "Temporary weatherproofing", "Priority scheduling for repairs", "24/7 contact availability"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Emergency Contact",
      href: "contact.html?service=emergency",
      badge: "Urgent",
    },
  ],

  tech: [
    {
      id: "portfolio-website",
      name: "Portfolio Website",
      icon: "user",
      description: "A professional, responsive personal or business portfolio website that makes a strong first impression on clients, employers, and partners.",
      bullets: ["Mobile-first responsive design", "Contact form included", "SEO-optimized structure", "Fast load times"],
      price: 20,
      salePrice: 5,
      discountEnabled: false,
      discountStart: "",
      discountEnd: "",
      currency: "USD",
      cta: "Start Your Portfolio",
      href: "contact.html?service=portfolio-website",
      badge: "Most Popular",
    },
    {
      id: "business-website",
      name: "Business Website",
      icon: "briefcase",
      description: "A complete, professional website for your business — clear services, pricing, contact, and calls-to-action designed to convert visitors into customers.",
      bullets: ["Multi-page structure", "Custom design", "SEO-ready build", "Contact and quote forms"],
      price: 50,
      salePrice: null,
      discountEnabled: false,
      discountStart: "",
      discountEnd: "",
      currency: "USD",
      cta: "Build My Website",
      href: "contact.html?service=business-website",
    },
    {
      id: "landing-page",
      name: "Landing Page",
      icon: "layout",
      description: "A focused, high-converting landing page for a product, service, campaign, or launch — built to drive a single clear action.",
      bullets: ["Conversion-focused layout", "Fast and lightweight", "A/B test-ready structure", "Integrated lead capture"],
      price: 15,
      salePrice: null,
      discountEnabled: false,
      discountStart: "",
      discountEnd: "",
      currency: "USD",
      cta: "Create a Landing Page",
      href: "contact.html?service=landing-page",
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      icon: "smartphone",
      description: "Modern cross-platform mobile applications for iOS and Android — built with Flutter for native performance at a fraction of the cost of two separate apps.",
      bullets: ["iOS + Android from one codebase", "Clean modern UI", "API and backend integration", "App store submission support"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Discuss Your App",
      href: "contact.html?service=mobile-app",
    },
    {
      id: "automation",
      name: "Automation",
      icon: "zap",
      description: "Custom automation for repetitive business tasks — saving time, reducing errors, and letting your team focus on what matters.",
      bullets: ["Workflow automation", "Data processing scripts", "API integrations and connectors", "Scheduled task automation"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Automate My Business",
      href: "contact.html?service=automation",
    },
    {
      id: "custom-software",
      name: "Custom Software",
      icon: "code",
      description: "Purpose-built software tailored to your exact business requirements — from internal tools and dashboards to client-facing applications.",
      bullets: ["Requirements analysis included", "Scalable architecture", "Testing and QA", "Documentation and handover"],
      price: null,
      salePrice: null,
      discountEnabled: false,
      currency: "USD",
      cta: "Request a Quote",
      href: "contact.html?service=custom-software",
    },
  ],

  roofingFAQ: [
    {
      question: "When should I repair my roof instead of replacing it?",
      answer: "Repair is usually the right choice when damage is isolated — a few shingles, flashing around a chimney, or a small leak. Replacement makes more sense when your roof is over 20 years old, damage covers more than 30% of the surface, or recurring repairs are costing more than a replacement would over time. A professional inspection gives you the clearest picture.",
    },
    {
      question: "What does a roof inspection involve?",
      answer: "We examine the entire roof system: shingles or membrane surface, flashing and seals around penetrations, gutters and drainage, fascia and soffits, and the attic interior where accessible. You receive a written report with photos, a condition rating, and clear recommendations.",
    },
    {
      question: "What causes most roof leaks?",
      answer: "The majority of leaks originate at transition points — around chimneys, vents, skylights, and valleys — where flashing has cracked, lifted, or corroded. Worn or missing shingles, clogged gutters causing ice dams, and punctures from debris are also common. Identifying the true source (not just where water appears inside) is the critical first step.",
    },
    {
      question: "How quickly can OmniApex respond to storm damage?",
      answer: "We prioritize storm damage assessments and can typically schedule an inspection within 24–48 hours of contact. For actively compromised roofs, we can apply temporary weatherproofing to stop further damage until a full repair is arranged.",
    },
    {
      question: "Does OmniApex help with insurance claims?",
      answer: "Yes. We provide detailed documentation — photos, written reports, and material estimates — that supports your insurance claim. We work directly with homeowners through this process, though we do not act as public adjusters.",
    },
    {
      question: "How long does a full roof replacement take?",
      answer: "Most residential roof replacements are completed in one to three days, depending on the roof's size, pitch, and material. Commercial projects vary significantly. We provide a clear timeline estimate before any work begins.",
    },
  ],

  techFAQ: [
    {
      question: "How much does a portfolio website cost?",
      answer: "Our portfolio websites start at $20. Final pricing depends on the number of pages, custom features, and content requirements. For most individuals and freelancers, the standard package covers everything needed to make a strong professional impression.",
    },
    {
      question: "What do I need to provide to get started?",
      answer: "For a website, it helps to have your logo (or a preference for style), the text content you want, and any photos or references you like the look of. We can guide you through each of these — you do not need to have everything ready before reaching out.",
    },
    {
      question: "How long does development take?",
      answer: "A portfolio website typically takes 3–7 days. A business website takes 1–3 weeks. Mobile apps and custom software timelines depend on scope — we provide a detailed estimate after discussing your requirements.",
    },
    {
      question: "Do you build apps for both iOS and Android?",
      answer: "Yes. We build cross-platform mobile applications using Flutter, which means your app runs on both iOS and Android from a single codebase. This significantly reduces development time and cost compared to building two separate native apps.",
    },
    {
      question: "What kinds of business processes can be automated?",
      answer: "Common automation projects include: report generation from spreadsheets or databases, data transfer between systems that don't connect natively, email or notification workflows triggered by events, and scheduled data collection or processing tasks. If you're doing something repetitive more than a few times per week, it's worth discussing.",
    },
    {
      question: "Do you offer ongoing support after a project is complete?",
      answer: "Yes. We offer maintenance and support arrangements after project delivery. The scope and pricing depend on what the project requires — this is something we discuss and agree on before the project begins.",
    },
  ],
};

/**
 * Calculate the active price for a service.
 * Returns: { price, isOnSale, originalPrice, label }
 */
function getActivePrice(service) {
  if (!service.price) return { price: null, isOnSale: false, originalPrice: null, label: "Request a Quote" };

  const now = new Date();
  let isOnSale = false;

  if (service.discountEnabled && service.salePrice) {
    const start = service.discountStart ? new Date(service.discountStart) : null;
    const end   = service.discountEnd   ? new Date(service.discountEnd)   : null;
    const afterStart = !start || now >= start;
    const beforeEnd  = !end   || now <= end;
    isOnSale = afterStart && beforeEnd;
  }

  const activePrice = isOnSale ? service.salePrice : service.price;
  const currency    = service.currency === "USD" ? "$" : service.currency;

  return {
    price:         activePrice,
    isOnSale,
    originalPrice: isOnSale ? service.price : null,
    label:         `From ${currency}${activePrice}`,
    currency,
  };
}

window.SERVICES    = SERVICES;
window.getActivePrice = getActivePrice;
