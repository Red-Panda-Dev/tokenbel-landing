# TokenBel Landing Page - AI Assistant Guide

**Project:** TokenBel Landing Page  
**Type:** Static marketing website  
**Stack:** Vite 5.4.19 + Tailwind CSS 4.1.18 + Alpine.js 3.15.0 + Pure HTML5  
**Language:** Russian (ru-BY locale)  
**Last Updated:** 2026-01-07  
**Status:** Production-ready

> [!TIP]
> **Tips for using custom knowledge:**
>
> - **Start small.** Even a few lines can make a meaningful difference.
> - **Think of it as shared memory.** Everything written here is remembered and used in future edits.
> - **Keep it current.** Update it as the project evolves to stay aligned and relevant.

---

## 1. PROJECT OVERVIEW

**TokenBel** is a financial information platform providing data on tokens and companies in Belarus. This repository contains the **public-facing landing page** (marketing site), separate from the main `dashboard.tokenbel.info` dashboard application.

### Key Characteristics

- **Pure HTML static site** (no React, no TypeScript in HTML)
- **Minimal dependencies** (migrated from React + TypeScript)
- **Multi-page Vite build** with custom rollup configuration
- **Responsive design** (mobile-first, Tailwind-based)
- **Russian language** content with SEO/analytics integration
- **Alpine.js interactivity** for mobile menu and lightweight interactions
- **CDN + npm hybrid Tailwind** (Tailwind CDN in HTML, npm for build processing)

### Business Purpose

Drive traffic and conversions to the TokenBel dashboard by:

- Showcasing featured token offerings
- Highlighting partner companies
- Emphasizing platform advantages
- Providing navigation to authentication system

### Strategic Guidelines (Decision Making)

- **Prioritize Trust**: High credibility signals, transparent information, clear disclaimers.
- **Information Architecture over Features**: Focus on content clarity and navigation ease.
- **Minimal Data Collection**: Keep the site static; avoid unnecessary PII collection on the landing page.
- **Mobile-First refinement**: Ensure perfect usability for users on the go.
- **Telegram-Centric**: Primary conversion goal is often Telegram channel/bot subscription.
- **Avoid Complexity**: No React, no heavy frameworks, no real-time data on landing.
- **Decision Principle**: Prioritize performance and maintainability. If a feature requires a heavy library, find a lighter alternative (Alpine.js/Vanilla JS) or re-evaluate the need.
- **Pattern Consistency**: Always reuse established card and grid patterns to maintain visual harmony and reduce CSS bloat.
- **Future-Proofing**: Design for static deployment. If dynamic data is needed, fetch it via client-side APIs rather than introducing server-side rendering.

---

## 2. USER PERSONAS

Understanding our target audience helps in making design and content decisions.

### Persona 1: Андрей (Novice Investor)

- **Profile**: 28-40, IT professional/small business owner in Minsk.
- **Needs**: Clear yield comparisons, credibility indicators, educational content.
- **Pain Points**: Scattered information, fear of scams, complexity of financial terms.
- **Behavior**: Browses on mobile; trusts Russian-language content and Telegram.

### Persona 2: Елена (Experienced Investor)

- **Profile**: 35-55, existing token portfolio.
- **Needs**: Quick access to dashboard, statistics highlights, RSS feed for news.
- **Pain Points**: Manual tracking is tedious; needs high data density and reliable alerts.
- **Behavior**: Desktop user; values efficiency and deep analytics.

### Persona 3: Компания-эмитент (Token Issuer)

- **Profile**: CFO or marketing manager at a Belarusian company.
- **Needs**: Professional contact channel, visibility on platform, data correction process.
- **Pain Points**: Unclear how to update company data; needs to maintain professional image.
- **Behavior**: Arrives via search for their own company; values professional appearance.

---

## 3. TECHNOLOGY STACK

### Build & Server

| Tool               | Version | Purpose                                                   |
| ------------------ | ------- | --------------------------------------------------------- |
| **Vite**           | 5.4.19  | Lightning-fast dev server, multi-page build orchestration |
| **Node.js**        | 18+     | Runtime (required for npm/bun)                            |
| **Bun** (optional) | Latest  | Drop-in npm replacement (faster installs/builds)          |

### Styling

| Tool             | Version | Purpose                                             |
| ---------------- | ------- | --------------------------------------------------- |
| **Tailwind CSS** | 4.1.18  | Utility-first CSS framework (npm package for build) |
| **Tailwind CLI** | 4.1.18  | CSS processing via CLI                              |
| **PostCSS**      | 8.5.6   | CSS transformation pipeline                         |
| **Autoprefixer** | 10.4.21 | Vendor prefix automation                            |
| **PostCSS CLI**  | 11.0.1  | Command-line CSS processing                         |

### Interactivity

| Tool                   | Version | Purpose                                          |
| ---------------------- | ------- | ------------------------------------------------ |
| **Alpine.js**          | 3.15.0  | Lightweight JS framework (mobile menu, UI state) |
| **Alpine.js Collapse** | 3.15.0  | Collapse/expand animations                       |

### Development & Utilities

| Tool               | Version | Purpose                                                 |
| ------------------ | ------- | ------------------------------------------------------- |
| **Prettier**       | 3.7.4   | Code formatting (optional, not enforced)                |
| **lovable-tagger** | 1.1.13  | Component tagging in dev mode (Lovable.dev integration) |

### Analytics & Tracking

| Service                | Purpose                              |
| ---------------------- | ------------------------------------ |
| **Google Tag Manager** | Conversion tracking, event logging   |
| **Yandex.RTB**         | Russian market advertising context   |
| **Umami Analytics**    | Privacy-focused analytics            |
| **Simple Analytics**   | Secondary analytics with DNT support |

---

## 4. DESIGN ASSETS

To maintain visual consistency across the platform, follow these design rules.

### Color Palette (HSL-based)

The project uses a CSS-variable-driven HSL color system. Avoid hardcoded Tailwind colors (e.g., `blue-600`) for primary UI elements.

| Variable        | Usage                                  | HSL Example       |
| :-------------- | :------------------------------------- | :---------------- |
| `--background`  | Main page background                   | `0, 0%, 100%`     |
| `--foreground`  | Main text color                        | `210, 40%, 3.9%`  |
| `--primary`     | Primary buttons, links, highlights     | `210, 40%, 50%`   |
| `--secondary`   | Subtle accents, secondary buttons      | `210, 40%, 96.1%` |
| `--muted`       | Backgrounds for cards, disabled states | `210, 40%, 96.1%` |
| `--accent`      | Hover states, special highlights       | `210, 40%, 96.1%` |
| `--destructive` | Errors, delete actions                 | `0, 84.2%, 60.2%` |
| `--border`      | Dividers, card borders                 | `210, 40%, 89.8%` |

### Typography

- **Primary Font**: `Manrope` (Sans-serif)
- **Source**: Google Fonts (weights 400, 500, 600, 700)
- **Scale**:
  - Hero: `text-3xl sm:text-4xl lg:text-5xl`
  - Section Headings: `text-2xl sm:text-3xl`
  - Subheadings: `text-xl`
  - Body: `text-base` (default)
  - Small/Muted: `text-sm`

### Layout Rules

- **Container**: Max-width `1400px` (`4xl` breakpoint), centered with `mx-auto`, side padding `px-4 sm:px-8`.
- **Spacing**: Use standard Tailwind scale (base 4px). Common: `py-12 sm:py-20` for sections, `gap-6` for grids.
- **Grids**: Responsive by default. `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- **Shadows**: Subtle `shadow-sm` for default states, `shadow-lg` for hovers.
- **Border Radius**: Consistent `rounded-2xl` (1rem) for cards and main containers.

---

## 5. PROJECT STRUCTURE

```
tokenbel-landing/
├── index.html                    # Main landing page (home)
│
├── contacts/
│   └── index.html                # Contact page (mapped as /contacts/)
│
├── rss/
│   └── index.html                # RSS feed page (mapped as /rss/)
│
├── 404/
│   └── index.html                # 404 error page (mapped as /404/)
│
├── public/                        # Static assets (copied as-is to dist/)
│   ├── favicon.ico
│   ├── robots.txt                # SEO crawling directives
│   └── placeholder.svg
│
├── vite.config.ts                # Build configuration (multi-page setup)
├── tailwind.config.ts            # Tailwind theme + extensions
├── postcss.config.js             # PostCSS plugins pipeline
├── package.json                  # Dependencies & scripts
│
├── dist/                         # Build output (generated, .gitignore'd)
├── node_modules/                 # Packages (generated, .gitignore'd)
│
└── README.md                     # Original project README

```

### URL Mapping (Vite Multi-Page)

| Input File            | Output URL   | Purpose                                           |
| --------------------- | ------------ | ------------------------------------------------- |
| `index.html`          | `/`          | Homepage with hero, tokens, companies, advantages |
| `contacts/index.html` | `/contacts/` | Contact information + form                        |
| `rss/index.html`      | `/rss/`      | RSS feed (if applicable)                          |
| `404/index.html`      | `/404/`      | Not Found error page                              |

---

## 6. CODING CONVENTIONS

### HTML/Markup Standards

**Language & Structure:**

- **HTML5 doctype**: `<!doctype html>`
- **Language attribute**: `lang="ru"` (Russian)
- **Semantic elements**: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- **Accessibility**: ARIA labels (`aria-label`), semantic buttons, proper heading hierarchy

**Example (correct structure):**

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Page Title</title>
  </head>
  <body>
    <header><!-- Navigation --></header>
    <main>
      <section><!-- Content --></section>
    </main>
    <footer><!-- Links, copyright --></footer>
  </body>
</html>
```

**Image Handling:**

- Always include `alt` text for accessibility
- Use `loading="lazy"` for below-the-fold images
- Use `decoding="async"` for non-critical images
- Prefer external CDN URLs (static.tokenbel.info, fonts.googleapis.com)

```html
<img
  src="https://static.tokenbel.info/company/xxx/logo.png"
  alt="Company name and context"
  loading="lazy"
  decoding="async"
  class="max-h-16 w-auto object-contain"
/>
```

### Tailwind CSS Conventions

**Naming & Structure:**

- **Utility-first**: Apply Tailwind classes directly to elements
- **Breakpoints**: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `4xl:` (1400px custom)
- **Color system**: HSL via CSS variables (NOT hardcoded Tailwind colors)
- **Spacing**: Consistent use of Tailwind spacing scale (4px base)
- **Responsive pattern**: Mobile-first, then `sm:`, `md:`, `lg:`

**Color Variables (HSL-based):**

```css
/* In Tailwind config or HTML style tag */
--primary: 210, 40%, 50%; /* Used as hsl(var(--primary)) */
--secondary: 270, 45%, 50%;
--destructive: 0, 84%, 60%;
--muted: 210, 14%, 97%;
--background: 0, 0%, 100%;
--foreground: 210, 40%, 3.9%;
```

**Naming patterns (from existing code):**

- Container width: `container` (centered, 2rem padding, max 1400px)
- Responsive text: `text-xl sm:text-2xl lg:text-3xl`
- Cards: `rounded-2xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg`
- Gradients: `bg-gradient-to-br from-blue-50 to-indigo-50`
- Transitions: `transition-all duration-200` or `transition-colors duration-300`

**Example (correct Tailwind pattern):**

```html
<article
  class="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
>
  <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">Title</h3>
  <p class="text-gray-600 text-sm sm:text-base mb-4 flex-1 line-clamp-3">
    Description
  </p>
</article>
```

### Alpine.js Conventions

**Usage Pattern:**

- Use `x-data` to initialize component state
- Use `x-show` for conditional visibility
- Use `x-click` for event handling
- Use `x-cloak` to hide content until Alpine initializes
- Use `@click.outside` for dismissing overlays

**Example (mobile menu toggle):**

```html
<body x-data="{ mobileMenu: false }">
  <button @click="mobileMenu = !mobileMenu">
    <svg x-show="!mobileMenu">Menu icon</svg>
    <svg x-show="mobileMenu" x-cloak>Close icon</svg>
  </button>

  <div
    x-show="mobileMenu"
    x-collapse.duration.200ms
    @click.outside="mobileMenu = false"
  >
    <!-- Menu content -->
  </div>
</body>
```

### Formatting & Indentation

**HTML Indentation:**

- **2 spaces** per nesting level (NOT tabs)
- Consistent opening/closing tag alignment
- Attributes on separate lines if exceeding 80 characters

**Class attribute formatting:**

- One class per line if exceeding 80 characters total
- Group related classes: layout first, then colors, then interactions

```html
<!-- ✓ CORRECT -->
<div
  class="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
>
  Content
</div>

<!-- ✗ WRONG (inconsistent spacing) -->
<div class="bg-white   border border-gray-200  rounded-2xl p-4">Content</div>
```

---

## 7. BEST PRACTICES & PATTERNS

### Component Card Pattern (Reusable)

TokenBel uses consistent card components for tokens, companies, and advantages:

```html
<!-- Token/Company Card (with hover effect) -->
<article
  class="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
>
  <!-- Image Container -->
  <div
    class="h-24 sm:h-32 flex items-center justify-center mb-4 bg-gray-50 rounded-xl group-hover:bg-blue-50/50 transition-colors"
  >
    <img
      src="..."
      alt="Logo description"
      class="max-h-16 sm:max-h-24 w-auto object-contain"
      loading="lazy"
      decoding="async"
    />
  </div>

  <!-- Content -->
  <div class="flex-1 flex flex-col">
    <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
      Title
    </h3>
    <p class="text-gray-600 text-sm sm:text-base mb-4 flex-1 line-clamp-3">
      Description
    </p>

    <!-- Footer with Badge + Link -->
    <div
      class="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100"
    >
      <span
        class="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold"
      >
        22% BYN
      </span>
      <a
        href="..."
        class="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base hover:underline"
      >
        Подробнее →
      </a>
    </div>
  </div>
</article>
```

**Key patterns:**

- `flex flex-col` for vertical card layout
- `flex-1` on content wrapper to expand and push footer down
- `group` class with `group-hover:` for coordinated hover effects
- `line-clamp-2` / `line-clamp-3` for text truncation
- `border-t border-gray-100` for visual separation
- Responsive text sizes: `text-lg sm:text-xl lg:text-2xl`

### Responsive Grid Pattern

```html
<!-- 1 column mobile, 2 on tablet, 3 on desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  <!-- cards -->
</div>

<!-- Custom: 5 columns on 4xl screens, 2 on tablet -->
<div
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
>
  <!-- cards -->
</div>
```

### Section Wrapper Pattern

```html
<section id="section-id" class="py-12 sm:py-16 bg-white px-4">
  <div class="container mx-auto max-w-6xl">
    <!-- Header -->
    <div class="text-center mb-8 sm:mb-12">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
        Section Title
      </h2>
      <p class="text-gray-600 max-w-xl mx-auto">Subtitle/description</p>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- cards -->
    </div>

    <!-- CTA -->
    <div class="text-center mt-8">
      <a
        href="..."
        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg group"
      >
        All items
        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform">
          <!-- arrow -->
        </svg>
      </a>
    </div>
  </div>
</section>
```

### Navigation Pattern (Header)

- **Desktop nav**: Hidden on mobile (`hidden md:flex`)
- **Mobile nav**: Visible only on mobile, toggleable with Alpine
- **Mobile menu button**: Hidden on desktop (`md:hidden`)
- **Consistent spacing**: `px-4 py-2` or `px-4 py-3` for links
- **Hover states**: `hover:bg-gray-100` with `transition-colors`

---

## 8. ANTI-PATTERNS (DO NOT DO)

### CRITICAL Violations

❌ **NO React**

- Do NOT introduce React, React Router, or React-specific libraries
- This project intentionally removed React complexity
- Use pure HTML + Alpine.js for interactivity

❌ **NO TypeScript in HTML**

- Configuration files (`.ts`) can be TypeScript
- HTML files must be `.html` with vanilla JavaScript only
- No `.tsx` files, no TSX syntax in HTML

❌ **NO Type Suppression**

- Never use `as any`, `@ts-ignore`, `@ts-expect-error`
- If type issues arise in config, fix the underlying code
- Config file: `vite.config.ts`, `tailwind.config.ts` are typed with proper `Config` interfaces

❌ **NO Hardcoded Colors** (use HSL variables instead)

```html
<!-- ✗ WRONG -->
<div class="text-blue-600">Text</div>
<!-- Direct Tailwind color -->

<!-- ✓ CORRECT -->
<div class="text-primary">Text</div>
<!-- Uses CSS var --primary via theme -->
<!-- OR directly reference if needed -->
<span class="bg-blue-100 text-blue-700">Badge</span>
<!-- OK for semantic purposes -->
```

❌ **NO Form Submission Without Handling**

- Contact form currently shows alert + preventDefault
- If adding real submission: implement backend endpoint or third-party service
- Never leave form hanging

❌ **NO Tailwind via npm import in HTML**

- HTML files use **CDN** version only: `https://cdn.tailwindcss.com`
- Tailwind npm is for **build-time processing** only (PostCSS)
- Do NOT add `@tailwind` directives to HTML `<style>` tags

❌ **NO Mixing Utility + Custom CSS Anomalies**

```html
<!-- ✗ WRONG -->
<div class="px-4 py-2" style="padding: 100px;">Conflicting styles</div>

<!-- ✓ CORRECT -->
<div class="px-4 py-2">Use Tailwind only</div>
```

### Common Pitfalls

⚠️ **Missing alt text on images** → Accessibility failure

```html
<!-- ✗ WRONG -->
<img src="logo.png" />

<!-- ✓ CORRECT -->
<img src="logo.png" alt="TokenBel logo" />
```

⚠️ **Not updating `tailwind.config.ts` content** → Styles get purged

- When adding new `.html` files, add path to `content` array
- Example: Adding `privacy.html` → add `"./privacy/**/*.html"` to content

⚠️ **Not updating `vite.config.ts` rollupOptions.input** → New pages won't build

```typescript
// vite.config.ts
rollupOptions: {
  input: {
    main: path.resolve(__dirname, "index.html"),
    contacts: path.resolve(__dirname, "contacts/index.html"),
    // ADD NEW PAGES HERE
    newpage: path.resolve(__dirname, "newpage/index.html"),
  },
},
```

⚠️ **Alpine.js not initialized on elements** → State binding fails

```html
<!-- ✗ WRONG -->
<div x-show="isOpen">Content</div>
<!-- x-data missing -->

<!-- ✓ CORRECT -->
<div x-data="{ isOpen: false }">
  <button @click="isOpen = !isOpen">Toggle</button>
  <div x-show="isOpen">Content</div>
</div>
```

⚠️ **Using `x-cloak` without CSS** → Flash of unstyled content

```html
<!-- In <head> or external CSS -->
<style>
  [x-cloak] {
    display: none;
  }
</style>

<!-- Then use in HTML -->
<div x-cloak x-show="isOpen">Content won't flash</div>
```

---

## 9. BUILD & DEPLOYMENT WORKFLOW

### Development Workflow

```bash
# Install dependencies
npm install
# or
bun install

# Start dev server (http://localhost:8080)
npm run dev
# or
bun run dev

# Server auto-reloads on file changes
# Press 'r' to refresh, 'q' to quit
```

**Dev server features:**

- Hot Module Replacement (HMR) for instant CSS updates
- lovable-tagger plugin active (marks components for Lovable.dev)
- All multi-page routes accessible: `http://localhost:8080/`, `/contacts/`, `/rss/`, `/404/`

### Production Build

```bash
# Build for production (optimized output to dist/)
npm run build
# or
bun run build

# Preview production build locally
npm run preview

# Build in development mode (useful for debugging)
npm run build:dev
```

**Build output:**

- `dist/` directory with optimized HTML, CSS, JS
- Separate bundles for each page (main.html, contacts.html, etc.)
- CSS inlined/optimized by Tailwind
- JavaScript minified (Alpine.js only, no bundled framework)

### Deployment Targets

**Best hosting for static sites:**

- **Vercel** (recommended, auto-deploys on git push)
- **Netlify** (similar to Vercel)
- **GitHub Pages** (free, slow)
- **Cloudflare Pages** (fast, CDN included)
- **AWS S3 + CloudFront** (complex, high control)
- **Traditional hosting** (deploy `dist/` folder via FTP/SSH)

**Deployment steps (example - Vercel):**

```bash
# Connect repo to Vercel via GitHub
# Vercel auto-detects Vite and builds

# Or manual deploy:
npm run build
# Then upload dist/ folder to hosting
```

---

## 10. CONFIGURATION FILES EXPLAINED

### vite.config.ts

```typescript
export default defineConfig(({ mode }) => ({
  // Dev server config
  server: {
    host: "::", // Bind to all IPv4/IPv6 interfaces
    port: 8080, // Development port
  },

  // Plugins
  plugins: [
    mode === "development" && componentTagger(), // Lovable.dev integration
  ].filter(Boolean),

  // Build config
  build: {
    outDir: "dist", // Output directory
    emptyOutDir: true, // Clear dist/ before build
    rollupOptions: {
      input: {
        // Multi-page configuration
        main: path.resolve(__dirname, "index.html"),
        contacts: path.resolve(__dirname, "contacts/index.html"),
        rss: path.resolve(__dirname, "rss/index.html"),
        "404": path.resolve(__dirname, "404/index.html"),
      },
    },
  },
}));
```

**Key points:**

- `host: "::"` allows access from other machines
- `componentTagger()` only in development (Lovable.dev feature)
- Rollup input maps entry files to output names

### tailwind.config.ts

```typescript
export default {
  // Content scanning for CSS purging
  content: ["./index.html", "./contacts/**/*.html", "./public/**/*.html"],

  // Theme customization
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "4xl": "1400px", // Custom breakpoint
      },
    },
    extend: {
      colors: {
        // HSL-based colors via CSS variables
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more color definitions
      },
    },
  },

  plugins: [],
};
```

**Key points:**

- **Content paths** must include all `.html` files, or CSS gets purged
- **Colors use HSL variables** instead of hardcoded values
- **4xl breakpoint** for large screens (custom extension)
- **No plugins** currently (Typography plugin declared in package.json but not used)

### postcss.config.js

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

**Key points:**

- Tailwind PostCSS plugin processes `@tailwind` directives
- Autoprefixer adds vendor prefixes automatically
- Runs during build (vite build)

---

## 11. PERFORMANCE & OPTIMIZATION

### Current Optimizations

✅ **Image Optimization**

- External CDN images (static.tokenbel.info)
- Lazy loading: `loading="lazy"`
- Async decoding: `decoding="async"`
- Responsive sizing: `max-h-16 w-auto`

✅ **CSS Optimization**

- Tailwind CSS purges unused styles
- Build minification
- HSL color system reduces custom CSS size

✅ **JavaScript Optimization**

- Alpine.js (13KB gzipped) vs React (40KB+)
- No bundler overhead
- Only necessary interactivity (mobile menu)

✅ **Build Optimization**

- Vite produces minimal output
- Each page is separate (no single-page app bloat)
- CSS inlined/shared across pages

### Metrics to Monitor

| Metric                             | Target             | How to Check                          |
| ---------------------------------- | ------------------ | ------------------------------------- |
| **LCP (Largest Contentful Paint)** | < 2.5s             | PageSpeed Insights, Lighthouse        |
| **FID (First Input Delay)**        | < 100ms            | Web Vitals API                        |
| **CLS (Cumulative Layout Shift)**  | < 0.1              | Web Vitals API                        |
| **Bundle size**                    | < 100KB (CSS + JS) | Build output, webpack-bundle-analyzer |
| **Image size**                     | < 50KB per image   | ImageOptim, TinyPNG                   |

---

## 12. CONTENT & LOCALIZATION

### Language & Locale

- **Primary language**: Russian (Cyrillic)
- **HTML lang attribute**: `lang="ru"`
- **Locale**: `ru-BY` (Belarus)
- **Font**: Manrope (Google Fonts, wght 400 & 700)
- **Text direction**: LTR (left-to-right)

### Content Management

**Current approach**: Content hardcoded in HTML

**Considerations for scaling:**

- If adding more pages: Create content templates
- If multi-language: Use build-time variables or separate `.html` files per language
- If dynamic content: Consider static site generator (11ty, Hugo) or headless CMS

### SEO & Meta Tags

**Current implementation:**

- ✅ Open Graph meta tags (og:title, og:description, og:image)
- ✅ Twitter Card meta tags
- ✅ Schema.org JSON-LD (WebSite, Organization)
- ✅ Canonical URL: `rel="canonical"`
- ✅ Google Site Verification: `google-site-verification`
- ✅ robots.txt (in public/)
- ✅ Proper heading hierarchy (h1 → h2 → h3)

**Best practices:**

- Each page should have unique `<title>` and `og:description`
- Images for social sharing should be square (recommended 1200x1200px)
- Internal links use relative paths (`/contacts/`, not `https://tokenbel.info/contacts/`)

---

## 13. ANALYTICS & TRACKING

### Integrated Services

| Service                | Purpose                            | Integration               |
| ---------------------- | ---------------------------------- | ------------------------- |
| **Google Tag Manager** | Event tracking, conversion goals   | Script tag (GTM-NZ6G8T8C) |
| **Yandex.RTB**         | Russian market context advertising | Script tag                |
| **Umami Analytics**    | Privacy-focused analytics          | Script tag (website-id)   |
| **Simple Analytics**   | Secondary analytics, DNT support   | Script tag                |

### Event Tracking Examples

```html
<!-- GTM event on CTA button -->
<a
  href="..."
  class="..."
  onclick="dataLayer.push({'event': 'cta_click', 'button': 'login'})"
>
  Click me
</a>

<!-- Or let GTM auto-detect via class names -->
<button class="gtm-event-cta">Call to Action</button>
```

### Privacy Considerations

- Simple Analytics respects DNT (Do Not Track) header
- Umami is privacy-friendly, no cookie persistence
- Google Tag Manager: ensure consent banner if required by law
- Yandex: Russian market tracking (GDPR/local compliance needed)

---

## 14. SECURITY & COMPLIANCE

### Security Practices

- **Security Principle**: Fix root causes, not symptoms. Re-verify after every fix attempt.
- **Content Security Policy (CSP)**: Implement via meta tags to restrict script sources.
- **Subresource Integrity (SRI)**: Use `integrity` attributes for all CDN-hosted scripts (Alpine.js, etc.).
- **Referrer Policy**: Use `strict-origin-when-cross-origin` to protect user privacy.
- **No PII in URLs**: Avoid passing sensitive data in query parameters.
- **HTTPS Only**: Ensure all assets are loaded over HTTPS.

### Compliance Requirements

- **GDPR**: Provide cookie consent for non-essential tracking (GTM, Yandex). Ensure Privacy Policy is accessible.
- **Belarusian Data Law**: Comply with local personal data protection requirements.
- **Financial Disclaimer**: Must display a clear disclaimer that TokenBel provides information, not investment advice.
  > "Информация на сайте носит исключительно информационный характер и не является инвестиционной рекомендацией."
- **Advertising Transparency**: Clearly mark any advertising content (Yandex.RTB).

---

## 15. ADDING NEW PAGES

**Step-by-step guide:**

### 1. Create HTML File

```bash
# Create directory and file
mkdir -p about
touch about/index.html
```

### 2. Create Content

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>О нас – TokenBel</title>
    <!-- SEO meta tags -->
    <meta name="description" content="Learn about TokenBel..." />
    <meta property="og:title" content="О нас – TokenBel" />
    <!-- Link Alpine and Tailwind from CDN -->
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.0/dist/cdn.min.js"
    ></script>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <!-- Reuse header from main page, or create shared component -->
    <!-- Content here -->
  </body>
</html>
```

### 3. Update vite.config.ts

```typescript
rollupOptions: {
  input: {
    main: path.resolve(__dirname, "index.html"),
    contacts: path.resolve(__dirname, "contacts/index.html"),
    about: path.resolve(__dirname, "about/index.html"),  // ADD THIS
    // ... other pages
  },
},
```

### 4. Update tailwind.config.ts Content

```typescript
content: [
  "./index.html",
  "./contacts/**/*.html",
  "./about/**/*.html",  // ADD THIS
  "./public/**/*.html",
],
```

---

## 16. TROUBLESHOOTING

### Common Issues & Solutions

| Issue                      | Cause                                   | Solution                                                        |
| -------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| **Styles not applying**    | Tailwind content path missing           | Add file path to `tailwind.config.ts` content array             |
| **Page not accessible**    | Missing rollupOptions.input             | Add entry to `vite.config.ts` rollupOptions.input               |
| **Alpine.js not working**  | x-data missing or script not loaded     | Ensure Alpine script tag in `<head>`, add `x-data` to container |
| **Images not loading**     | Incorrect path or CDN down              | Use absolute URLs (https://...) for external images             |
| **CSS flashing (FOUC)**    | Alpine.js initializing before DOM ready | Add `[x-cloak] { display: none; }` CSS rule                     |
| **Build fails**            | Node.js version too old                 | Use Node.js 18+ or Bun                                          |
| **Hot reload not working** | Vite dev server issue                   | Try clearing .vite cache, restart dev server                    |

### Debug Checklist

Before deploying, verify:

- [ ] All links work (internal & external)
- [ ] All images load (check Network tab in DevTools)
- [ ] Mobile responsive (test on 320px, 768px, 1024px widths)
- [ ] Alpine interactions work (mobile menu toggle, etc.)
- [ ] Analytics events fire (check GTM/Umami dashboards)
- [ ] No console errors (`F12` → Console tab)
- [ ] Build succeeds: `npm run build` outputs to `dist/`
- [ ] No unused CSS in final bundle (run Lighthouse audit)

---

## 17. QUICK REFERENCE COMMANDS

```bash
# Setup & Installation
npm install               # Install all dependencies
npm ci                   # Clean install (for CI/CD)
bun install             # Using Bun package manager

# Development
npm run dev             # Start dev server (http://localhost:8080)
npm run build           # Optimize for production (creates dist/)
npm run build:dev       # Build in debug mode
npm run preview         # Preview built site locally (http://localhost:4173)

# Utilities
npx prettier --write .  # Format all files (optional)
npm list                # Show all dependencies
npm outdated            # Check for updates
npm update              # Update all packages
```

---

## 18. EXTERNAL REFERENCES & DOCUMENTATION

### Internal Tooling

- **Main Dashboard**: https://dashboard.tokenbel.info
- **Static Asset CDN**: https://static.tokenbel.info

### Official Docs

- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs/
- **Alpine.js**: https://alpinejs.dev/
- **PostCSS**: https://postcss.org/

### Learning Resources

- **Tailwind Tutorial**: https://tailwindcss.com/docs/installation
- **Alpine.js Examples**: https://codepen.io/alpinejs/
- **Vite Guide**: https://vitejs.dev/guide/

### Community

- **Tailwind Discord**: https://discord.gg/7NF8agSYS2
- **Alpine.js Discord**: https://discord.gg/SNxcwKnqYH

---

## 19. FUTURE ROADMAP & EXTENSIBILITY

### Planned Enhancements

- [ ] Newsletter signup form (backend integration)
- [ ] FAQ page with Alpine.js accordion
- [ ] Blog section (consider static site generator like 11ty)
- [ ] Dark mode toggle (extend Tailwind config)
- [ ] Internationalization (i18n for English, Belarusian)
- [ ] Contact form backend (Formspree, Netlify Forms, etc.)

### Scaling Considerations

**If adding dynamic content:**

- Use **11ty (Eleventy)** for static site generation from templates
- Consider **headless CMS** (Contentful, Strapi) for content management
- Keep the "no framework" philosophy

**If adding real backend logic:**

- Separate concerns: this repo = frontend only
- Backend API in separate repository (Express.js, Node.js, Python, etc.)
- Use fetch/AJAX to call backend endpoints

---

## 20. SUMMARY FOR AI ASSISTANTS

**When editing this project, remember:**

1. ✅ **Pure HTML** - no React, no TSX
2. ✅ **Tailwind + HSL variables** - use CSS variables for colors
3. ✅ **Alpine.js** - lightweight, minimal interactivity only
4. ✅ **Multi-page Vite** - update rollupOptions + tailwind.config when adding pages
5. ✅ **Mobile-first responsive** - design for 320px, then scale up
6. ✅ **Russian language** - keep all content in Russian
7. ✅ **SEO + Analytics** - maintain meta tags, tracking scripts
8. ✅ **Card components** - reuse the established card pattern
9. ✅ **Static deployment** - outputs to dist/, hosts on CDN/static services
10. ✅ **Performance** - lazy load images, minimize JS, purge CSS

**Forbidden:**

- ❌ No React
- ❌ No TypeScript in HTML files
- ❌ No type suppressions (`as any`, `@ts-ignore`)
- ❌ No hardcoded colors (use HSL variables)
- ❌ No incomplete form submissions

---

**End of AI Assistant Guide**  
**Generated:** 2026-01-07 19:15 UTC+3  
**Status: Complete & Production-Ready**
