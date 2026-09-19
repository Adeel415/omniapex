# OmniApex Website

Professional website for OmniApex — roofing and technology services.

**Stack:** HTML5 · CSS3 · Vanilla JavaScript · Netlify Functions

---

## Project Structure

```
omniapex/
│
├── index.html              ← Homepage (service selection gateway)
├── roofing.html            ← Roofing services page
├── tech-services.html      ← Technology services page
├── contact.html            ← Contact & quote form
├── about.html              ← About page
├── privacy.html            ← Privacy policy
│
├── css/
│   ├── style.css           ← Design tokens, typography, all components
│   ├── responsive.css      ← Mobile-first breakpoints
│   └── animations.css      ← Motion (respects prefers-reduced-motion)
│
├── js/
│   ├── config.js           ← ✏️  ALL business info lives here
│   ├── services.js         ← ✏️  All service data and pricing
│   ├── seo.js              ← Injects meta tags, JSON-LD, Open Graph
│   ├── navigation.js       ← Nav, footer, social links
│   ├── pricing.js          ← Pricing display and discount logic
│   ├── contact.js          ← Form validation, submit, FAQ accordion
│   └── app.js              ← Service cards, scroll reveal, page init
│
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   ├── images/             ← Add your photos here
│   └── logo/               ← Add your logo files here
│
├── netlify/
│   └── functions/
│       └── contact.js      ← Serverless email handler
│
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── netlify.toml
├── .env.example
├── .gitignore
└── README.md
```

---

## Quick Edits

### How to change the company phone number

Open `js/config.js` and update:

```javascript
company: {
  phone: "0343 54 21 27 6",
```

The phone appears automatically everywhere on the site.

---

### How to change the email address

Open `js/config.js` and update:

```javascript
company: {
  email: "hello@omniapex.com",
```

---

### How to add social media profiles

Open `js/config.js` and fill in any profile URLs:

```javascript
social: {
  linkedin:  "https://www.linkedin.com/company/omniapex",
  facebook:  "https://www.facebook.com/omniapex",
  instagram: "",  // Leave empty to hide
  x:         "",
  youtube:   "",
  whatsapp:  "https://wa.me/13435421276",
  googleBusinessProfile: "",
},
```

Social icons automatically appear where URLs are set, and are hidden where they're blank. No HTML changes needed.

---

### How to change a service description

Open `js/services.js`. Find the service by its `id` and edit:

```javascript
{
  id: "roof-inspection",
  name: "Roof Inspection",
  description: "Your updated description here.",
  bullets: [
    "Point one",
    "Point two",
    "Point three",
    "Point four",
  ],
},
```

---

### How to change a tech service price

Open `js/services.js` and find the service under `tech: [...]`:

```javascript
{
  id: "portfolio-website",
  price: 20,         // Normal price (USD)
  salePrice: 5,      // Sale price (only used when discount is active)
  discountEnabled: false,
```

The price displays automatically as `From $20`.

---

### How to create a limited-time discount

Open `js/services.js`. For the service you want to discount:

```javascript
{
  id: "portfolio-website",
  price: 20,
  salePrice: 5,
  discountEnabled: true,
  discountStart: "2025-07-01",   // ISO date string. Leave "" for no start limit.
  discountEnd:   "2025-07-31",   // ISO date string. Leave "" for no end limit.
},
```

When the current date is within the range:
- The sale price ($5) is shown in green
- The original price ($20) shows as strikethrough
- A "Sale" badge appears automatically

When the dates expire, the normal price returns automatically — no manual changes needed.

---

### How to set the domain (for SEO and canonical URLs)

Open `js/config.js`:

```javascript
company: {
  website: "https://omniapex.com",  // Replace with your real domain
},
```

Also update `sitemap.xml` — replace all instances of `https://your-domain.com` with your real domain.

And update `robots.txt`:

```
Sitemap: https://omniapex.com/sitemap.xml
```

---

## Deploying to Netlify

### First deployment

1. Push the project folder to a GitHub repository
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Publish directory: `.`
   - Build command: *(leave empty)*
5. Click "Deploy"

---

### Setting up the contact form email

After deployment:

1. Go to Netlify Dashboard → Your Site → **Environment Variables**
2. Add these four variables:

| Variable | Value |
|---|---|
| `EMAIL_PROVIDER` | `resend` |
| `EMAIL_API_KEY` | Your Resend API key |
| `EMAIL_TO` | Your Gmail address |
| `EMAIL_FROM` | `noreply@your-domain.com` |

3. **Resend setup:**
   - Create a free account at [resend.com](https://resend.com)
   - Add and verify your domain at Resend → Domains
   - Create an API key at Resend → API Keys
   - Copy the API key into Netlify's environment variables

4. Redeploy the site (Netlify Dashboard → Deploys → Trigger deploy)

5. Test by submitting the contact form on your live site

> **Alternative:** Use SendGrid instead of Resend. Set `EMAIL_PROVIDER=sendgrid` and use a SendGrid API key. The function supports both.

---

## SEO Setup Checklist

After deployment:

- [ ] Replace `https://your-domain.com` in `sitemap.xml` with your real domain
- [ ] Replace the domain in `robots.txt` sitemap line
- [ ] Replace the domain in `js/config.js` → `company.website`
- [ ] Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] Connect [Google Analytics](https://analytics.google.com) (add tracking script to each HTML page `<head>`)
- [ ] Create and connect a [Google Business Profile](https://business.google.com) if eligible
- [ ] Add the Google Business Profile URL to `js/config.js` → `social.googleBusinessProfile`

---

## Replacing Placeholder Images

Images should be placed in `assets/images/`. To add them:

1. Save your image in `assets/images/` (use `.webp` format for best performance)
2. Reference in HTML: `<img src="/assets/images/your-image.webp" alt="Descriptive alt text" loading="lazy">`
3. For images in the hero/above fold, use `loading="eager"` instead of `lazy`

**Recommended image sizes:**
- Hero background: 1920×1080px (WebP, ~100-200KB)
- Service images: 800×600px (WebP, ~40-80KB)
- OG/social preview: 1200×630px (JPG, ~100KB)

---

## Connecting Google Business Profile

1. Create or claim your listing at [business.google.com](https://business.google.com)
2. Complete verification (usually a postcard to your address)
3. Once verified, copy the profile URL
4. Add it to `js/config.js`:

```javascript
social: {
  googleBusinessProfile: "https://g.page/omniapex",
},
```

5. This URL is also added to the JSON-LD `sameAs` list automatically for schema.org signals

---

## Updating the Sitemap

When you add new pages:

1. Open `sitemap.xml`
2. Add a new `<url>` block:

```xml
<url>
  <loc>https://omniapex.com/new-page.html</loc>
  <lastmod>2025-06-01</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

3. Re-submit the sitemap in Google Search Console

---

## Adding a New Tech or Roofing Service

Open `js/services.js`. Add a new object to the `roofing` or `tech` array:

```javascript
{
  id: "new-service",          // Unique ID (used in URL params)
  name: "New Service",
  icon: "tool",               // Icon name (see pricing.js for full list)
  description: "What this service includes.",
  bullets: [
    "Bullet one",
    "Bullet two",
  ],
  price: 50,                  // null for "Request a Quote"
  salePrice: null,
  discountEnabled: false,
  discountStart: "",
  discountEnd: "",
  currency: "USD",
  cta: "Get Started",
  href: "/contact.html?service=new-service",
},
```

The card renders automatically on the relevant service page. No HTML changes needed.

---

## Maintenance Notes

**Configuration:** Everything in `js/config.js` and `js/services.js`

**No HTML editing** is needed for:
- Business name, phone, email
- Social media links
- Service names, descriptions, bullets
- Prices and discounts
- SEO metadata (titles and descriptions are in config)

**HTML editing** is needed for:
- Adding entirely new page sections
- Structural layout changes
- Adding a new page

---

## Tech Stack Notes

- No build process — open HTML files directly in a browser for development
- Netlify handles serverless functions automatically from the `netlify/functions/` folder
- The site uses `prefers-reduced-motion` to disable animations for users who need it
- All forms use native HTML validation plus JS inline validation — no libraries
- Fonts load from Google Fonts CDN; the fallback stack is `system-ui, -apple-system, sans-serif`
