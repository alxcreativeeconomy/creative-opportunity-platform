# GEMINI.md - Project Context & Instructions

## Project Overview
**ALXScout (ip-search)** is a specialized platform built for the ALX Creative Economy team to discover, track, and verify funding, grants, and partnership opportunities across the African creative landscape. It leverages AI to automate the discovery and validation of deals.

### Core Technologies
- **Frontend:** React 19, Vite, Tailwind CSS.
- **Icons:** Lucide React.
- **AI/Search:** 
  - **Google Gemini API** (`@google/generative-ai`): Used for analyzing scraped web content and extracting structured deal data.
  - **Serper API:** Used for live web searching to find new opportunities.
- **Deployment:** GitHub Pages (`gh-pages`).

## Strategic Partnerships & Education
**ALXScout** prioritizes institutional alliances that drive curriculum innovation and professional capacity building.

### Strategic Target Partners
- **Tech Giants:** Microsoft (ADC), Google (AI Research), Meta (Llama), Amazon (AWS Educate).
- **Entertainment Leaders:** Netflix (Pathways), Disney (Triggerfish Mentorship), Universal Music Group (IP Acquisition).
- **Multi-Lateral Bodies:** IFC (She Wins Africa), UNESCO (Aschberg), World Bank (CreatiFI), EU (Horizon Europe).

### Partnership Focus Areas
- **Curriculum Reform:** Industry-aligned degree and certificate rewriting for tech-creatives.
- **Vocational Traineeships:** "Below-the-line" technical training with global production studios.
- **Investment Readiness:** Preparing creative startups for VC and institutional private equity.
- **AI Integration:** Capacity building for GenAI, 3D technology, and prompt engineering in the creative sector.



### Inclusion Criteria
- **Institutional Scale:** Official government portals, multi-lateral banks (e.g., Afreximbank), and global corporate funds.
- **Reputable Small Grants:** Well-established international and regional funds (e.g., Prince Claus Fund, Goethe-Institut).
- **Scale Ranges:** 
    - **Large-Scale:** $50k - $50M+ (Infrastructure, VC, Institutional).
    - **Small-Scale:** $4k - $10k (Seed grants, mobility, individual awards).
- **Actionable:** Must provide a direct application portal or investment pipeline contact page.

### Exclusions
- **No Unofficial Sources:** Avoid third-party news blogs; use only primary institutional sources.
- **No Closed Windows:** Only display active, rolling, or forecast pipelines for the 2026/27 cycle.



## Building and Running
### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Deployment
```bash
npm run deploy
```

## Development Conventions
- **Styling:** Use Tailwind CSS utility classes. Avoid custom CSS unless necessary (keep `App.css` and `index.css` minimal).
- **Icons:** Use `lucide-react` for all UI icons.
- **State Management:** Currently handled via React `useState` and `useEffect` hooks in `App.jsx`.
- **API Keys:** Currently hardcoded in `App.jsx`. **TODO:** Migrate these to `.env` variables for security.

## Key Files
- `src/App.jsx`: The heart of the application. Contains the UI, business logic, and AI integration.
- `package.json`: Defines dependencies and scripts.
- `tailwind.config.js` & `postcss.config.js`: Tailwind configuration.
- `vite.config.js`: Vite build settings.

## Future Improvements / TODOs
- [ ] **Security:** Move `GEMINI_API_KEY` and `SERPER_API_KEY` to environment variables.
- [ ] **Refactoring:** Break down `App.jsx` into smaller, reusable components (e.g., `ScraperAgent`, `OpportunityMatrix`, `VerificationReport`).
- [ ] **Data Persistence:** Integrate Firebase (already in `package.json` but not fully utilized in `App.jsx`) for a real-time database of found deals.
- [ ] **Reliability:** Implement a more robust scraping solution than the public `allorigins` proxy.
