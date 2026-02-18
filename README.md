# Contact Refresh - Pure HTML + Tailwind 4.1 Project

🔗 **[Лендинг — tokenbel.info](https://tokenbel.info/)** | **[Агрегатор токенов — dashboard.tokenbel.info](https://dashboard.tokenbel.info/)**

## Project Overview

This project has been successfully migrated from a React + Vite + TypeScript setup to a pure HTML + Tailwind CSS 4.1 static site.

## Project Structure

```
/
├── public/                  # Static assets and additional HTML pages
│   ├── contacts.html        # Contact page
│   ├── favicon.ico          # Favicon
│   └── ...                  # Other static assets
├── index.html              # Main HTML file
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Project dependencies
```

## Technologies Used

- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1** - Utility-first CSS framework (via CDN)
- **Alpine.js** - Lightweight JavaScript framework for interactivity
- **HTML5** - Pure HTML structure

## Getting Started

### Prerequisites

- Node.js (v18+) or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd contact-refresh

# Install dependencies
bun install
# or
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
bun run dev
# or
npm run dev

# Server will start at http://localhost:8080
```

### Building for Production

```bash
# Build for production
bun run build
# or
npm run build

# Preview production build
bun run preview
# or
npm run preview
```

## Project Features

✅ **Pure HTML + Tailwind CSS** - No React dependencies

✅ **Fast build times** - Vite-powered optimization

✅ **Responsive design** - Mobile-first approach

✅ **Easy to maintain** - Simple file structure

✅ **Production ready** - Optimized assets

## Available Pages

- **Home Page** (`index.html`) - Main landing page
- **Contact Page** (`public/contacts.html`) - Contact form and information

## Customization

### Adding New Pages

1. Create a new HTML file in the `public/` directory
2. Add the page to the `vite.config.ts` rollupOptions.input
3. Use Tailwind CSS classes for styling

### Styling

The project uses Tailwind CSS 4.1 via CDN. You can:

- Use utility classes directly in HTML
- Add custom CSS in `<style>` tags
- Extend Tailwind configuration in `tailwind.config.ts`

## Deployment

The project can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3
- Any static file hosting

### Example Deployment

```bash
# Build for production
bun run build

# Deploy the dist/ folder to your hosting provider
```

## Migration Summary

This project was successfully migrated from:
- **React 18** → **Pure HTML**
- **TypeScript** → **JavaScript**
- **Complex build system** → **Simple Vite setup**
- **Multiple dependencies** → **Minimal dependencies**

## Support

For any issues or questions, please open an issue on the GitHub repository.
