# CONTACT REFRESH - PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-06 20:46:38 (Europe/Minsk)  
**Commit:** 7b51c26  
**Branch:** main

## OVERVIEW

Pure HTML + Tailwind CSS 4.1 static site built with Vite. Recently migrated from React + TypeScript to minimal dependency architecture. Alpine.js provides lightweight interactivity.

## STRUCTURE

```
contact-refresh/
├── index.html              # Main landing page
├── public/
│   ├── contacts.html       # Contact page with form
│   ├── favicon.ico         # Site icon
│   ├── robots.txt          # SEO configuration
│   └── placeholder.svg     # Asset
├── vite.config.ts          # Multi-page build config
├── tailwind.config.ts      # Theme with HSL color system
├── postcss.config.js       # CSS processing
└── package.json            # Dependencies: Vite, Tailwind, Alpine.js
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new page | Create in `public/`, update `vite.config.ts` rollupOptions.input | Multi-page setup requires build config update |
| Modify styles | Use Tailwind utilities in HTML, extend theme in `tailwind.config.ts` | CDN-based Tailwind 4.1, HSL color variables |
| Add interactivity | Alpine.js directives in HTML, or vanilla JS in `<script>` tags | No React, no TypeScript |
| Change dev port | `vite.config.ts` server.port (currently 8080) | Host set to "::" (all interfaces) |
| Build config | `vite.config.ts` build.rollupOptions | Output to `dist/`, multi-page input |
| Contact form logic | `public/contacts.html` lines 105-116 | Currently shows alert, preventDefault blocks submit |

## CONVENTIONS

**Deviations from standard Vite + Tailwind:**
- **Tailwind via CDN** (`https://cdn.tailwindcss.com`) instead of npm package in HTML files, but npm package exists for build-time processing
- **HSL color system** via CSS variables (`hsl(var(--primary))`) instead of direct Tailwind colors
- **No TypeScript in HTML** - pure HTML despite `.ts` config files
- **Multi-page rollup config** - manually list each entry point in `vite.config.ts`
- **Alpine.js for interactivity** - declared in package.json but not imported in current HTML files

## ANTI-PATTERNS (THIS PROJECT)

- **NO React** - Explicitly migrated away from React, do not reintroduce
- **NO TypeScript in HTML** - Keep HTML files pure (configs can be `.ts`)
- **NO npm Tailwind import** - Uses CDN in HTML (`<script src="https://cdn.tailwindcss.com">`)
- **NO test framework** - Static site has zero testing infrastructure (no Jest, Vitest, Cypress)
- **NO server-side logic** - Pure static site, no API routes or backend

## BUILD SYSTEM

**Vite 5.4.19** - Multi-page static site generator

**Key config (`vite.config.ts`):**
- **Dev server**: `http://[::]:8080` (all interfaces)
- **Alias**: `@` → `./public`
- **Output**: `dist/` (cleared on each build)
- **Entry points**: 
  - `main` → `index.html`
  - `contacts` → `public/contacts.html`

**Tailwind 4.1** - Content scanning: `./index.html` + `./public/**/*.html`

## COMMANDS

```bash
# Development (http://localhost:8080)
npm run dev
bun run dev

# Production build (outputs to dist/)
npm run build
bun run build

# Preview production build
npm run preview
bun run preview
```

## MIGRATION NOTES

**Removed (React → HTML migration):**
- All React dependencies (react, react-dom, @types/react)
- TypeScript files (`.tsx` components)
- Complex state management
- Component architecture

**Added/Changed:**
- Pure HTML structure (`.html` files)
- Tailwind CDN integration
- Alpine.js dependency (declared but not yet used in HTML)
- Simplified Vite config (multi-page rollup)

## PAGES

**1. Home Page (`index.html`, 67 lines):**
- Project migration summary
- Navigation to contact page
- Minimal vanilla JS (console log on DOMContentLoaded)

**2. Contact Page (`public/contacts.html`, 118 lines):**
- Contact information (email, phone, address, hours)
- Contact form (name, email, subject, message)
- Form validation via vanilla JS (preventDefault + alert)
- SVG icons for contact methods

## GOTCHAS

- **Tailwind content config** must include new HTML files for purging to work
- **Vite rollupOptions.input** must be updated when adding new pages
- **Alpine.js dependency exists** but not imported in current HTML (future enhancement?)
- **No form backend** - contact form shows alert, doesn't submit anywhere
- **Dual Tailwind setup** - CDN in HTML + npm package in devDependencies (build-time processing)
- **public/ URL mapping** - `public/contacts.html` accessed as `/contacts.html` (Vite convention)
