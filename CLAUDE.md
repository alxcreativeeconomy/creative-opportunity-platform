# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Serve dist/ locally
npm run lint       # Run ESLint
npm run deploy     # Build + deploy to GitHub Pages
```

## Environment Setup

Copy `.env.example` to `.env` and populate:
```
VITE_GEMINI_API_KEY=...
VITE_SERPER_API_KEY=...
```

## Architecture

**ALXScout** is a React + Vite app for the ALX Creative Economy team to discover and track funding/grant/partnership opportunities across African creative industries. Deployed to GitHub Pages at `/creative-opportunity-platform/`.

### Data Layer

- `src/data/opportunities.js` — Static array of 100+ hardcoded opportunity records (the primary database)
- `src/data/registry.js` — `VERIFICATION_REGISTRY` object mapping opportunity IDs to verification status and evidence links

Firebase is in `package.json` but **not implemented** — it's a future TODO for real-time persistence.

### State & Filtering (App.jsx)

`App.jsx` is the central state hub. All filtering is done in-component via React hooks:
- Filter pipeline: region → status (excludes "Closed") → sector → location → verification level → search query
- `selectedOpportunity` controls whether the detail view (`VerificationReport`) or list view (`OpportunityMatrix`) is shown

### AI & Scraping (src/utils/)

- `src/utils/scraper.js`: `searchGoogle()` hits the Serper API, `scrapeWebsite()` uses `allorigins.win` as a CORS proxy to extract page text (capped at 3000 chars)
- `src/utils/ai.js`: `validateWithAI()` sends scraped content to Gemini 2.0 Flash and expects a structured JSON response with deal metadata

### Component Tree

```
App.jsx
├── Sidebar (nav tabs: dashboard / search / deals-report)
├── Header
├── FilterBar (search + sector/location/verification dropdowns)
├── Dashboard | OpportunityMatrix | DealsReport  ← tab-controlled
│   └── OpportunityCard
├── VerificationReport (detail view, shown when selectedOpportunity is set)
│   ├── StatusBadge
│   └── VerificationBadge
└── Footer (disclaimer)
```

### Key TODOs (from GEMINI.md)

- Break up `App.jsx` into smaller components
- Replace hardcoded `opportunities.js` with Firebase real-time database
- Move API keys to `.env` (partially done — keys need populating)
- Implement more robust scraping (current proxy is unreliable)
