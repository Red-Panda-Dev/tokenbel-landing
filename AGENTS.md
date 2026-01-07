# TOKENBEL LANDING - PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-07 19:10:17 (Europe/Minsk)
**Commit:** 7b51c26
**Branch:** main

## OVERVIEW

Pure HTML + Tailwind CSS 4.1 static site built with Vite. Russian-language landing page for TokenBel token directory with GTM/Yandex analytics. Recently migrated from React + TypeScript to minimal dependency architecture. Alpine.js provides lightweight interactivity (declared but not yet used).

## STRUCTURE

```
tokenbel-landing/
├── index.html              # Main landing page (945 lines) - GTM/Yandex tracking
├── contacts/               # Contact page subdirectory
│   └── index.html          # Contact form (790 lines)
├── rss/                    # RSS feed page subdirectory
│   └── index.html          # RSS feed (633 lines)
├── 404/                    # 404 error page subdirectory
│   └── index.html          # Error page (538 lines)
├── public/                 # Static assets
│   ├── favicon.ico         # Site icon
│   └── robots.txt          # SEO configuration
├── static/                 # Additional static assets
├── vite.config.ts          # Multi-page build config
├── tailwind.config.ts      # Theme with HSL color system
├── postcss.config.js       # CSS processing
├── package.json            # Dependencies: Vite 5.4.19, Tailwind 4.1.18, Alpine.js 3.15.0
└── Makefile                # Legacy build script (references non-existent static/)
```

## WHERE TO LOOK

| Task                | Location                                                                 | Notes                                         |
| ------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| Add new page        | Create `new-dir/index.html`, update `vite.config.ts` rollupOptions.input | Multi-page setup requires build config update |
| Modify styles       | Use Tailwind utilities in HTML, extend theme in `tailwind.config.ts`     | CDN-based Tailwind 4.1, HSL color variables   |
| Add interactivity   | Alpine.js directives in HTML, or vanilla JS in `<script>` tags           | No React, no TypeScript in HTML               |
| Change dev port     | `vite.config.ts` server.port (currently 8080)                            | Host set to "::" (all interfaces)             |
| Analytics config    | `index.html` lines 4-22 (GTM, Yandex.RTB)                                | Google Tag Manager + Yandex ads               |
| Contact form logic  | `contacts/index.html`                                                    | Form validation via vanilla JS                |
| RSS feed generation | `rss/index.html`                                                         | XML RSS feed with token listings              |
| Build config        | `vite.config.ts` build.rollupOptions                                     | Output to `dist/`, multi-page input           |

## CONVENTIONS

**Deviations from standard Vite + Tailwind:**

- **Tailwind via CDN** (`https://cdn.tailwindcss.com`) instead of npm package in HTML files, but npm package exists for build-time processing
- **HSL color system** via CSS variables (`hsl(var(--primary))`) instead of direct Tailwind colors
- **No TypeScript in HTML** - pure HTML despite `.ts` config files
- **Multi-page rollup config** - manually list each entry point in `vite.config.ts`
- **Russian locale** - All content in Russian (`lang="ru"`, `ru-BY` meta tags)
- **Subdirectory-based pages** - Each page in its own subdirectory with `index.html`

**File Naming:**

- HTML pages: `subdir/index.html` (not `subdir.html`)
- Static assets: `public/` for web-accessible files, `static/` for build-time assets

## ANTI-PATTERNS (THIS PROJECT)

- **NO React** - Explicitly migrated away from React, do not reintroduce
- **NO TypeScript in HTML** - Keep HTML files pure (configs can be `.ts`)
- **NO npm Tailwind import** - Uses CDN in HTML (`<script src="https://cdn.tailwindcss.com">`)
- **NO test framework** - Static site has zero testing infrastructure (no Jest, Vitest, Cypress)
- **NO server-side logic** - Pure static site, no API routes or backend
- **NO hardcoded colors** - Always use HSL variables from `tailwind.config.ts`
- **NO type suppression** - Never use `@ts-ignore`, `as any` (though TS not used in HTML)

## UNIQUE STYLES

**Russian-Language Content:**

- All user-facing content in Russian
- Meta tags: `lang="ru"`, `og:locale="ru-BY"`, `name="language" content="ru"`

**Analytics Stack:**

- Google Tag Manager: `GTM-NZ6G8T8C`
- Yandex.RTB: Contextual advertising
- Both loaded in `<head>` of `index.html`

**Multi-Page Structure:**

- Each page in separate subdirectory: `/`, `/contacts/`, `/rss/`, `/404/`
- All have `index.html` (clean URLs)
- All registered in `vite.config.ts` rollupOptions

## BUILD SYSTEM

**Vite 5.4.19** - Multi-page static site generator

**Key config (`vite.config.ts`):**

- **Dev server**: `http://[::]:8080` (all interfaces)
- **Alias**: `@` → `./public`
- **Output**: `dist/` (cleared on each build)
- **Entry points**:
  - `main` → `index.html`
  - `contacts` → `contacts/index.html`
  - `rss` → `rss/index.html`
  - `not-found` → `404/index.html`

**Tailwind 4.1.18** - Content scanning: `./index.html` + `./contacts/**/*.html` + `./public/**/*.html`

**Container config:**

- Centered, 2rem padding
- 4xl breakpoint at 1400px

**HSL Color Variables:**

- Semantic: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- Component: `--border`, `--input`, `--ring`, `--card`, `--popover`
- Variants: `*-foreground` for text contrast colors

## COMMANDS

```bash
# Development (http://localhost:8080)
npm run dev
bun run dev

# Production build (outputs to dist/)
npm run build
bun run build

# Development build
npm run build:dev

# Preview production build
npm run preview
bun run preview
```

**Note:** `Makefile` exists but references non-existent `static/` directory - use npm/bun scripts instead.

## MIGRATION NOTES

**Removed (React → HTML migration):**

- All React dependencies (react, react-dom, @types/react)
- TypeScript files (`.tsx` components)
- Complex state management
- Component architecture

**Added/Changed:**

- Pure HTML structure (`index.html` in subdirectories)
- Tailwind CDN integration
- Alpine.js dependency (declared in package.json but not imported in HTML yet)
- Simplified Vite config (multi-page rollup)
- Russian-language content
- Analytics integration (GTM + Yandex)

## GOTCHAS

- **Tailwind content config** must include new HTML files for purging to work
- **Vite rollupOptions.input** must be updated when adding new pages (add new entry point)
- **Alpine.js dependency exists** but not imported in current HTML files (ready for future use)
- **No form backend** - contact form shows alert, doesn't submit anywhere
- **Dual Tailwind setup** - CDN in HTML + npm package in devDependencies (build-time processing)
- **Page URL structure** - `/contacts/` maps to `contacts/index.html`, NOT `/contacts.html`
- **Analytics loading** - GTM and Yandex.RTB scripts only in `index.html`, not in other pages
- **Makefile obsolete** - References non-existent `static/` directory, use npm/bun scripts
- **Language consistency** - All content must be in Russian, check `lang="ru"` and meta tags
- **Static asset paths** - Files in `public/` are root-accessible (e.g., `/favicon.ico`)

## DEPENDENCIES

**Runtime:** `alpinejs@^3.15.0` (declared, not used), `lovable-tagger@^1.1.13`

**Dev:** Vite 5.4.19, Tailwind 4.1.18, PostCSS 8.5.6, Prettier 3.7.4
