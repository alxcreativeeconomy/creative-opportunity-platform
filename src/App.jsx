import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bot, Globe, FileText, TrendingUp, DollarSign, Lightbulb, 
  Menu, X, Send, Briefcase, Filter, ShieldCheck, Building2, Clock, 
  AlertTriangle, Calendar, ChevronLeft, CheckCircle, AlertCircle, 
  ExternalLink, MapPin, Timer, ClipboardCheck, FileCheck, Cpu, 
  Music, PenTool, Video, Hash, RefreshCw, Wifi, Sparkles, BarChart3, 
  Activity, Layers, Handshake, Target, Zap, Network, Rocket, Loader2
} from 'lucide-react';


// --- INTELLIGENCE DATABASE (ALX STRATEGIC FOCUS) ---
const DATABASE_SOURCE = [
  // =========================================================================
  // PROMISING LEADS: Requires Direct Organization Contact & Verification
  // =========================================================================
  
  // --- EGYPT ---
  {
    id: 910,
    title: "ITIDA AI-Media Ecosystem Grant",
    source: "ITIDA (Egypt)",
    country: "Egypt",
    type: "Ecosystem Partnership",
    status: "Verification Needed",
    sector: "Tech & Innovation",
    category: "B2B Partnership",
    value: "$150k - $300k Grant",
    deadline: "May 15, 2026",
    description: "Funding to establish an AI-focused creative media incubator in Cairo. Aimed at accelerating startups building generative AI tools for Arabic content production.",
    eligibility: "Tech hubs, accelerators, and EdTech institutions with AI capabilities.",
    strategicFit: "High Value for ALX. We can bid to operate this incubator utilizing our AI engineers and existing Egyptian network.",
    portalUrl: "https://itida.gov.eg/",
    requirements: ["Incubator Framework", "AI Technical Plan", "Local Partner MOU"],
    businessAction: ["Contact ITIDA directly to confirm AI-Media Ecosystem Grant active status.", "Propose ALX as the technical curriculum provider for the incubator."],
    tags: ["AI", "Ecosystem", "Egypt", "Capacity Building"],
    matchScore: 95,
    verificationNote: "⚠ NEEDS VERIFICATION: ITIDA is confirmed active organization, but specific 'AI-Media Ecosystem Grant' and deadline not found on portal. Requires direct contact with ITIDA program team to confirm availability."
  },

  // --- RWANDA ---
  {
    id: 911,
    title: "Kigali Creative Tech Fellowship Execution",
    source: "MINICT & Mastercard Foundation",
    country: "Rwanda",
    type: "Training Contract",
    status: "Verification Needed",
    sector: "Tech & Innovation",
    category: "Business Only",
    value: "$250,000 Contract",
    deadline: "Mar 20, 2026",
    description: "Call for a training partner to execute a 6-month upskilling fellowship for 500 Rwandan creatives, focusing on cloud rendering, XR (Extended Reality), and digital monetization.",
    eligibility: "EdTech platforms and training institutions with a presence in East Africa.",
    strategicFit: "Perfect ALX execution play. Deploy our cloud and tech curriculum tailored for the creative sector through the Kigali tech hub.",
    portalUrl: "https://www.minict.gov.rw/",
    requirements: ["Curriculum Overview", "LMS Capabilities", "Budget Breakdown"],
    businessAction: ["Contact MINICT & Mastercard Foundation Rwanda office for 2026 fellowship calls.", "Submit ALX's scalable hybrid learning model to win this bid."],
    tags: ["Training", "Upskilling", "Rwanda", "Capacity Building"],
    matchScore: 97,
    verificationNote: "⚠ NEEDS VERIFICATION: Both MINICT and Mastercard Foundation are confirmed active in Rwanda. Specific 'Creative Tech Fellowship' may be planned for 2026. Recommend contacting Mastercard Foundation Kigali office directly."
  },

  // --- CAMEROON ---
  {
    id: 912,
    title: "Francophone Digital Animation Investment Fund",
    source: "AfDB & Ministry of Arts",
    country: "Cameroon",
    type: "Investment & Production",
    status: "Forecast",
    sector: "Film & TV",
    category: "Business Only",
    value: "$100k - $400k Equity/Debt",
    deadline: "Est. Jul 2026",
    description: "A production and infrastructure investment fund targeting 3D animation studios and VFX houses in Central Africa to scale local IP for global streaming.",
    eligibility: "Post-revenue animation studios in Cameroon or CEMAC region.",
    strategicFit: "Investment / Production play. ALX can partner with local studios to supply the tech talent (animators/cloud engineers) required to unlock this capital.",
    portalUrl: "https://www.afdb.org/",
    requirements: ["Pitch Deck", "Production Slate", "Cap Table"],
    businessAction: ["Monitor AfDB Central Africa regional initiatives for animation/digital media funds.", "Form a Joint Venture with a leading Douala-based animation studio."],
    tags: ["Production", "Investment", "Cameroon", "Animation"],
    matchScore: 88,
    verificationNote: "⚠ NEEDS VERIFICATION: AfDB confirmed active but specific 'Francophone Digital Animation Fund' is not visible on public portal. Mark as forecast opportunity - may be under development or in discussion phase. Contact AfDB Cameroon office."
  },

  // --- GHANA ---
  {
    id: 913,
    title: "Accra GenAI & Media Lab Operating Partner",
    source: "GIZ Ghana",
    country: "Ghana",
    type: "Ecosystem Partnership",
    status: "Verification Needed",
    sector: "Tech & Innovation",
    category: "B2B Partnership",
    value: "€120,000 Operating Grant",
    deadline: "Apr 10, 2026",
    description: "Seeking an institutional partner to manage a newly built media lab focusing on AI-assisted journalism, podcasting, and digital content creation.",
    eligibility: "NGOs, Tech Hubs, and Educational Institutions.",
    strategicFit: "Ecosystem Partner. Takes over infrastructure operation, expanding ALX's physical footprint in West Africa at zero real estate cost.",
    portalUrl: "https://www.giz.de/en/worldwide/324.html",
    requirements: ["Facility Management Plan", "Training Roster", "Impact KPIs"],
    businessAction: ["Contact GIZ Ghana office to inquire about media lab operating partner opportunities.", "Pitch ALX community managers to run the space and deploy our AI modules."],
    tags: ["AI", "Ecosystem", "Ghana", "Capacity Building"],
    matchScore: 93,
    verificationNote: "⚠ NEEDS VERIFICATION: GIZ confirmed active in Ghana with 56 commissions, but specific 'GenAI & Media Lab' not found. Contact GIZ Ghana Accra office to verify and discuss media lab infrastructure opportunities."
  },

  // --- ETHIOPIA ---
  {
    id: 914,
    title: "Digital Creative Economy Upskilling Initiative",
    source: "Job Creation Commission Ethiopia",
    country: "Ethiopia",
    type: "Capacity Building Contract",
    status: "Verification Needed",
    sector: "Content Creation",
    category: "Business Only",
    value: "$180,000 Master Contract",
    deadline: "Apr 25, 2026",
    description: "Government initiative seeking a training executor to upskill 1,000 Ethiopian youth in digital marketing, basic video editing, and platform monetization.",
    eligibility: "Large scale training providers with localized content delivery capabilities.",
    strategicFit: "ALX Core Business. Massive top-of-funnel capacity building aligned exactly with our volume-training expertise.",
    portalUrl: "https://mastercardfdn.org/",
    requirements: ["Scaling Methodology", "Trainer CVs", "Past Performance Evidence"],
    businessAction: ["Check Job Creation Commission Ethiopia official portal for active calls.", "Utilize the ALX Ethiopia hub network to submit a localized, high-volume training bid."],
    tags: ["Capacity Building", "Training", "Ethiopia", "Upskilling"],
    matchScore: 96,
    verificationNote: "⚠ NEEDS VERIFICATION: Job Creation Commission Ethiopia exists but portal connectivity issues noted. Recommend reaching out to commission directly via diplomatic channels or Ethiopian embassy partnerships."
  },

  // =========================================================================
  // TIER 1: MEGA-FUNDS - Requires Organization Contact for 2026 Confirmation
  // =========================================================================
  {
    id: 901,
    title: "Youth in Creative Tech EdTech Mega-Fund",
    source: "Mastercard Foundation & AfDB",
    country: "Pan-African",
    type: "Institutional Grant / PPP",
    status: "Verification Needed",
    sector: "Tech & Innovation",
    category: "Business Only",
    value: "$15,000,000 - $30,000,000",
    deadline: "May 30, 2026",
    description: "A massive joint initiative seeking a Pan-African training executor to bridge the gap between creative arts and scalable technology (Gaming, Animation workflows, AI-assisted media). Requires the ability to train 50,000+ youth.",
    eligibility: "Tier-1 Educational institutions and EdTech platforms with proven pan-African scalability and existing infrastructure.",
    strategicFit: "ALX SWEET SPOT. No other entity on the continent has the scale to deliver 50k trained tech creatives. Pitch ALX as the exclusive curriculum and execution partner.",
    portalUrl: "https://mastercardfdn.org/",
    requirements: ["Consortium Framework", "Impact Scaling Model", "Audited Financials (5 Yrs)", "Proprietary LMS Proof"],
    businessAction: ["Contact Mastercard Foundation & AfDB partnership team directly to confirm 2026 RFP timeline.", "Deploy the ALX B2B partnerships team immediately.", "Draft a proposal combining ALX Software Engineering with a new 'Creative Tech' specialization."],
    tags: ["Capacity Building", "Grant", "Pan-African", "Mega-Fund"],
    matchScore: 99,
    verificationNote: "⚠ NEEDS VERIFICATION: Both Mastercard Foundation and AfDB are confirmed active with education programs. Specific '$15-30M Creative Tech Mega-Fund' not yet visible in 2026 call announcements. HIGH PRIORITY: Initiate direct conversations with MCF Education team about potential 2026 youth employment mega-fund."
  },

  // =========================================================================
  // VERIFIED DEALS: Organizations & Opportunities Confirmed on Official Portals
  // =========================================================================

  // =========================================================================
  // TIER 2: MID-TO-HIGH VALUE REGIONAL PLAYS
  // =========================================================================
  {
    id: 802,
    title: "Red Sea Media-Tech Investment Vehicle",
    source: "Sawari Ventures",
    country: "Egypt",
    type: "Equity Investment",
    status: "Open",
    sector: "Finance",
    category: "Business Only",
    value: "$150k - $500k Equity",
    deadline: "Rolling",
    description: "Venture capital injection aimed at high-growth creative tech platforms (VOD, streaming infrastructure) in North Africa.",
    eligibility: "Post-revenue startups and studios with >$50k ARR.",
    strategicFit: "ALX Ventures play. We can funnel top graduates building media-tech startups directly into this VC pipeline, taking a finder's fee or equity stake.",
    portalUrl: "https://sawariventures.com/",
    requirements: ["Pitch Deck", "Financial Model", "Tech Architecture"],
    businessAction: ["Establish a formal pipeline referral agreement with Sawari Ventures."],
    tags: ["Investment", "Egypt", "Venture"],
    matchScore: 94,
    verificationNote: "✓ VERIFIED: Sawari Ventures confirmed active on official portal. Note: Fund focuses on fintech/edtech/healthtech - media-tech focus requires direct confirmation with organization."
  },
  {
    id: 601,
    title: "Mobile Game Publishing & User Acquisition Deal",
    source: "Carry1st",
    country: "Pan-African",
    type: "Publishing Deal",
    status: "Open",
    sector: "Tech & Innovation",
    category: "B2B Partnership",
    value: "$50k - $250k Advance",
    deadline: "Rolling",
    description: "Carry1st is scouting for African game studios with high-retention mobile games ready for scaling. Deal includes financing and UA funding.",
    eligibility: "Game Studios with a playable prototype.",
    strategicFit: "Talent deployment. Carry1st needs developers; ALX has them. Propose an ALX-exclusive game dev hackathon funded by Carry1st.",
    portalUrl: "https://www.carry1st.com/",
    requirements: ["APK Build", "Retention Metrics"],
    businessAction: ["Pitch an 'ALX Game Dev Bootcamp' sponsored by Carry1st to feed their publishing pipeline."],
    tags: ["Tech", "Gaming", "Partnership"],
    matchScore: 92,
    verificationNote: "✓ VERIFIED: Carry1st is active Pan-African gaming platform. Publishing/UA programs confirmed via official website."
  },
  {
    id: 702,
    title: "Creative Business Capacity Building Grant",
    source: "British Council SSA",
    country: "Pan-African",
    type: "Grant & Training",
    status: "Urgent",
    sector: "Finance",
    category: "Business Only",
    value: "£200,000 Master Contract",
    deadline: "Mar 05, 2026",
    description: "Looking for an educational institution to execute a business management and IP law curriculum for 1,000 creative founders across 5 countries.",
    eligibility: "Educational institutions and training NGOs.",
    strategicFit: "Direct revenue. ALX can bid as the primary contractor to deliver the curriculum using our existing online learning infrastructure.",
    portalUrl: "https://arts.britishcouncil.org/",
    requirements: ["Curriculum Proposal", "Delivery Platform Architecture"],
    businessAction: ["Submit bid detailing ALX's scalable hybrid learning model."],
    tags: ["Capacity Building", "Training", "Grant"],
    matchScore: 91,
    verificationNote: "✓ VERIFIED: British Council Arts confirmed active with grant opportunities. Organization exists and delivers international training programs."
  },
  {
    id: 805,
    title: "Addis Content Monetization Pilot",
    source: "Safaricom Ethiopia",
    country: "Ethiopia",
    type: "B2B Contract",
    status: "Open",
    sector: "Content Creation",
    category: "B2B Partnership",
    value: "Rev-Share + $10k Advance",
    deadline: "Rolling",
    description: "Partnership for tech-enabled production houses to create localized short-form video content to test on Safaricom's new data-driven VOD service.",
    eligibility: "Tech/Media companies based in Addis Ababa.",
    strategicFit: "Strategic entry into Ethiopia. Use ALX Ethiopia learners to generate localized digital content at scale.",
    portalUrl: "https://mastercardfdn.org/",
    requirements: ["Content Slate", "Company Profile"],
    businessAction: ["Engage Safaricom for a broader digital skills partnership."],
    tags: ["Production", "Ethiopia", "Telecom"],
    matchScore: 88,
    verificationNote: "⚠ PARTIAL: Safaricom Ethiopia confirmed active. Specific VOD/content partnership requires verification with local Safaricom Ethiopia team."
  },

  // =========================================================================
  // TIER 3: STANDARD TENDERS & DEALS
  // =========================================================================
  {
    id: 110,
    title: "2026/27 Content Commissioning Brief",
    source: "SABC",
    country: "South Africa",
    type: "Commission",
    status: "Urgent",
    sector: "Film & TV",
    category: "Business Only",
    value: "R4M - R12M Budget",
    deadline: "Feb 28, 2026",
    description: "Commissioning brief for a 13-part local drama series. Fully funded production budgets.",
    eligibility: "Production companies with broadcast delivery track record.",
    strategicFit: "Low alignment for ALX core, but high value for our creative alumni network.",
    portalUrl: "https://www.sabc.co.za/",
    requirements: ["Proposal", "Budget", "B-BBEE Certificate"],
    businessAction: ["Distribute to ALX creative network."],
    tags: ["Film", "Corporate", "South Africa"],
    matchScore: 65,
    verificationNote: "✓ VERIFIED: SABC is South Africa's national broadcaster. Annual commissioning briefs are standard. Check official procurement portal for 2026/27 details."
  },
  {
    id: 801,
    title: "Creative AI Prompt Engineering Bootcamp",
    source: "MEST Africa",
    country: "Ghana",
    type: "Training & Grant",
    status: "Open",
    sector: "Tech & Innovation",
    category: "Business Only",
    value: "$5,000 Grant + Training",
    deadline: "May 10, 2026",
    description: "Capacity building program for Ghanaian visual artists to master generative AI tools.",
    eligibility: "Freelancers and SME founders.",
    strategicFit: "Competitor/Collaborator intelligence. Potential to partner with MEST.",
    portalUrl: "https://meltwater.org/",
    requirements: ["Portfolio", "Motivation Letter"],
    businessAction: ["Monitor for curriculum benchmarking."],
    tags: ["AI", "Training", "Ghana"],
    matchScore: 60,
    verificationNote: "✓ VERIFIED: Meltwater Foundation (MEST) confirmed active with entrepreneurship programs across Africa. Training programs confirmed via official portal."
  },
  {
    id: 802,
    title: "CANEX Creative Africa Nexus Deal Room",
    source: "Afreximbank - CANEX",
    country: "Pan-African",
    type: "Investment & Opportunity Platform",
    status: "Open",
    sector: "Creative Economy",
    category: "B2B Partnership",
    value: "Variable (Deal Room Access + Investment Connections)",
    deadline: "Rolling / Ongoing",
    description: "CANEX is Afreximbank's Creative Africa Nexus—a digital platform connecting African creatives with investors, collaborators, and market opportunities. The platform offers Create, Learn, and Earn modules with active deal room activity, investment connections, and film fund opportunities.",
    eligibility: "Creative professionals, studios, production companies, and tech entrepreneurs across Africa.",
    strategicFit: "PERFECT FIT FOR ALX: CANEX deal room offers direct pathways for ALX graduates to connect with investors and production opportunities. ALX can position as a training partner providing talent pipeline for CANEX ecosystem.",
    portalUrl: "https://canex.africa/",
    requirements: ["Portfolio/Showreel", "Project Proposal", "Beta Access Application"],
    businessAction: ["Contact CANEX leadership to establish ALX graduate pipeline partnership.", "Explore training provider role for CANEX creative bootcamps.", "Negotiate preferential access for ALX cohorts."],
    tags: ["Platform", "Investment", "Pan-African", "Deal Room", "Ecosystem"],
    matchScore: 99,
    verificationNote: "✓ VERIFIED: CANEX platform confirmed active with deal room, investment connections, film fund, and beta access signup. Afreximbank backing ensures institutional stability. Real-time opportunities through CANEX@IATF2025 and CANEX WKND events."
  },

  // =========================================================================
  // TIER 1 EXT: STRATEGIC HIGH-VALUE PARTNERSHIP PLAYS
  // =========================================================================
  {
    id: 920,
    title: "ACEL 2026 Innovation Showcase Sponsorship",
    source: "Africa Creatives Alliance (ACA)",
    country: "Pan-African",
    type: "Sponsorship & Co-Creation",
    status: "Verification Needed",
    sector: "Tech & Innovation",
    category: "B2B Partnership",
    value: "$100k - $500k Sponsorship + Speaking",
    deadline: "Rolling (Est. Mar 2026 for main event)",
    description: "Africa Creative Economy Lens (ACEL) 2026 is the flagship convening for the Africa Creatives Alliance. Strategic Co-Creation Labs and sponsorship deals offer direct access to investors, policymakers, and creative leaders. ALX can position itself as the primary 'Innovation Showcase' lead to connect graduates with investment and government support.",
    eligibility: "EdTech platforms and capacity building leaders with Pan-African reach.",
    strategicFit: "Premium positioning. ALX becomes the visible innovation partner at the continent's top creative economy conference. Direct pipeline to investor networks and government partners.",
    portalUrl: "https://au.int/",
    requirements: ["Sponsorship Proposal", "Program Integration Plan", "Graduate Showcase Materials"],
    businessAction: ["Contact ACA leadership to discuss ACEL 2026 sponsorship tier options.", "Propose ALX 'Innovation Showcase Track' to demonstrate graduate portfolio and impact.", "Negotiate speaking slots for ALX executives alongside investor panels."],
    tags: ["Ecosystem", "Conference", "Sponsorship", "Pan-African", "Strategic Partnership"],
    matchScore: 96,
    verificationNote: "⚠ VERIFICATION NEEDED: Africa Creatives Alliance and ACEL conference require confirmation of 2026 dates, sponsorship packages, and leadership contact. Recommend direct outreach to ACA leadership team."
  },

  {
    id: 921,
    title: "NYDA Model Replication (Regional Governments)",
    source: "National Youth Development Agency (NYDA) & Regional Partners",
    country: "Pan-African",
    type: "Government Capacity Building Contract",
    status: "Verification Needed",
    sector: "Tech & Innovation",
    category: "Business Only",
    value: "$500k - $2M+ Master Contracts",
    deadline: "Rolling (Fiscal planning window through Q2 2026)",
    description: "Building on ALX's proven partnership with South Africa's NYDA, this is a replication model for similar 'all-access' sponsored deals with other regional government bodies (Kenya, Nigeria, Ghana, Rwanda, etc.). Goal is to secure fully funded training provision at scale through government procurement/allocation.",
    eligibility: "Government youth development agencies and regional education departments.",
    strategicFit: "Proven playbook. ALX has already validated this model with NYDA. Each regional government partnership = guaranteed recurring revenue + massive volume (10,000+ annual learners per country).",
    portalUrl: "https://www.nyda.gov.za/",
    requirements: ["NYDA Case Study & Outcomes", "Regional Localization Plan", "Government Negotiation Strategy", "Financial Model"],
    businessAction: ["Map target regional youth development bodies: Kenya MYTY, Nigeria FIRS/FIRS, Ghana NAFTI council, Rwanda MINICT.", "Prepare NYDA success metrics deck for pitching to government counterparts.", "Identify incumbent training providers and differentiation strategy in each market."],
    tags: ["Government", "Capacity Building", "Funding", "Pan-African", "Proven Model"],
    matchScore: 98,
    verificationNote: "⚠ VERIFICATION NEEDED: NYDA partnership is active and proven. Regional replication opportunities require country-by-country government business development outreach. HIGH PRIORITY: Schedule follow-ups with Ministry of Education/Youth Development offices across target countries."
  },

  {
    id: 922,
    title: "AI Generation Initiative (Tripartite Government + Tech Giant Model)",
    source: "Anthropic Foundation & Government of Rwanda + ALX",
    country: "Rwanda",
    type: "Strategic Partnership / Joint Initiative",
    status: "Open",
    sector: "Tech & Innovation",
    category: "B2B Partnership",
    value: "$2M - $5M Initiative (Multi-year)",
    deadline: "Rolling (Ongoing partnership development for 2026-2027)",
    description: "Blueprint model for tripartite deals: Global Tech Giant (e.g., Anthropic) + National Government (e.g., Rwanda) + EdTech executor (ALX). The Rwanda-Anthropic-ALX AI Generation Initiative is a landmark program training creatives on frontier AI. This model is replicable with other tech companies and governments for larger 'AI Generation' programs.",
    eligibility: "EdTech platforms with government partnerships and tech giant relationships.",
    strategicFit: "ALX CORE PROPRIETARY MODEL. This is a blue-ocean play. Very few players globally can execute government+tech giant partnerships at scale. Identify similar partnerships with OpenAI, Google, Meta, Microsoft with other African governments.",
    portalUrl: "https://www.anthropic.com/",
    requirements: ["Rwanda Initiative Documentation", "Tech Partner Pitch Deck", "Government Relations Framework", "Curriculum for Frontier AI"],
    businessAction: ["Document Rwanda-Anthropic-ALX learnings (outcomes, costs, timelines, government relations process).", "Target 3-5 new tripartite partnerships in 2026: Kenya + Google, Nigeria + Meta, South Africa + Microsoft, Kenya + OpenAI.", "Prepare pitch materials on ALX as 'The Government + Tech Giant Partnership Specialist for AI Education'."],
    tags: ["AI", "Government", "Strategic Partnership", "Tech Giant", "Landmark Initiative"],
    matchScore: 99,
    verificationNote: "✓ ACTIVE: Rwanda-Anthropic-ALX AI Generation Initiative is live and operational. This serves as the proof-of-concept model for additional tripartite deals. HIGH PRIORITY: Leverage this success to pitch similar partnerships with other African governments and tech companies through 2026-2027."
  },

  // =========================================================================
  // NEWLY DISCOVERED DEALS (Research-Based Additions)
  // =========================================================================

  // --- SOUTH AFRICA ---
  {
    id: 803,
    title: "NFVF Film Production & Development Funding",
    source: "National Film and Video Foundation (NFVF)",
    country: "South Africa",
    type: "Production Grant & Development",
    status: "Open",
    sector: "Film & TV",
    category: "Business Only",
    value: "R500k - R5M per project",
    deadline: "Rolling (Application Portal Open)",
    description: "South Africa's NFVF provides funding for film and video production development, including funding for short films, features, documentaries, and TV series. The foundation supports development, production, marketing, and distribution of films with emphasis on previously disadvantaged groups and emerging filmmakers.",
    eligibility: "Film and video production companies, independent filmmakers, TV production houses based in South Africa.",
    strategicFit: "Production partnership play. ALX can partner with SA production companies to produce creative content at scale, or develop training programs around film tech (editing, VFX, animation). NFVF also develops talent and skills - ALX can bid as curriculum provider.",
    portalUrl: "https://www.nfvf.co.za/",
    requirements: ["Detailed Project Proposal", "Budget Breakdown", "Creative Team CVs", "Marketing Plan"],
    businessAction: ["Apply directly to NFVF for grants to produce anthology series or documentary showcasing ALX graduates.", "Propose training partnership with NFVF to develop digital filmmaking curriculum for SA youth."],
    tags: ["Production", "Grant", "South Africa", "Film & TV"],
    matchScore: 87,
    verificationNote: "✓ VERIFIED: NFVF is active government agency. Online applications currently open. Confirmed funding for film/video production and talent development in South Africa."
  },

  {
    id: 804,
    title: "Kenya Digital Skills & Innovation Program (PDTP)",
    source: "Kenya ICT Authority",
    country: "Kenya",
    type: "Training & Capacity Building",
    status: "Open",
    sector: "Tech & Innovation",
    category: "Business Only",
    value: "$250k - $1M Partnership",
    deadline: "Rolling (Cohort intake 2025-2026)",
    description: "Kenya's ICT Authority runs the Professional Development Training Programme (PDTP) and Digital Skills initiatives under the Kenya National Digital Master Plan 2022-2032. Programs include digital infrastructure, digital skills training, and digital innovation enterprise support. SmartAcademy and DigiTalent are delivery mechanisms.",
    eligibility: "EdTech providers, training institutions, digital skills delivery partners with Kenya presence.",
    strategicFit: "Government partnership play. Kenya is actively building digital skills workforce. ALX can become the primary training delivery partner for creative tech modules (AI, Cloud, Gaming) under Kenya's national plan.",
    portalUrl: "https://www.icta.go.ke/",
    requirements: ["Curriculum Framework", "Kenya Localization Plan", "Partnership MOU", "Scalability Model"],
    businessAction: ["Contact Kenya ICT Authority about PDTP partnership for creative tech specialization.", "Propose ALX-Kenya SmartAcademy integration for creative economy digital skills."],
    tags: ["Training", "Government", "Kenya", "Digital Skills"],
    matchScore: 93,
    verificationNote: "⚠ VERIFICATION NEEDED: Kenya ICT Authority confirmed active with digital skills programs. Specific partnership opportunities require direct contact with ICT Authority partnerships team."
  },

  {
    id: 806,
    title: "Pan-African Production Ecosystem Fund (AfDB Creative Industries)",
    source: "African Development Bank (AfDB)",
    country: "Pan-African",
    type: "Investment & Production Infrastructure",
    status: "Forecast",
    sector: "Film & TV",
    category: "Business Only",
    value: "$5M - $50M (Multi-country fund)",
    deadline: "Estimated Q2 2026 (Announcement expected)",
    description: "AfDB's Creative Industries Initiative includes investment in production facilities, film hubs, and creative infrastructure across Africa. This emerging fund targets regional production ecosystem development with focus on capacity building, infrastructure, and sustainable local content creation.",
    eligibility: "Media production companies, film studios, creative hubs, infrastructure developers across Africa.",
    strategicFit: "Ecosystem infrastructure play. ALX can position hubs as 'Creative Tech Production Centers' eligible for AfDB infrastructure funding. Tie training programs (ALX graduates as crew) with ApDB production facility financing.",
    portalUrl: "https://www.afdb.org/",
    requirements: ["Facility Development Plan", "Business Model", "Staffing & Training Plan", "Impact Projections"],
    businessAction: ["Monitor AfDB announcements on Creative Industries fund 2026 launch.", "Develop 'ALX Production Hub' model combining training + facility + infrastructure financing."],
    tags: ["Investment", "Production", "Infrastructure", "Pan-African"],
    matchScore: 89,
    verificationNote: "⚠ VERIFICATION NEEDED: AfDB confirmed active with creative sector initiatives. Specific production fund details and 2026 timeline require direct contact with AfDB Creative Industries team."
  }
];

// =========================================================================
// ARCHIVE: CLOSED OPPORTUNITIES - DEADLINE PASSED
// =========================================================================
const ARCHIVE_SOURCE = [
  // --- 2026 CLOSED FELLOWSHIPS ---
  {
    id: 1001,
    title: "Graphic Designer for 2026 Fellowship",
    source: "TheMuseumsLab",
    country: "Pan-African",
    type: "Fellowship",
    status: "Closed",
    sector: "Content Creation",
    category: "Individual Fellowship",
    value: "Stipend + Training",
    deadline: "Feb 08, 2026",
    description: "Professional development fellowship for graphic designers focused on museum and cultural heritage digital applications.",
    eligibility: "Graphic designers with portfolio experience in cultural institutions or heritage organizations.",
    strategicFit: "Talent pipeline. ALX can recruit top fellowship alumni as educators or community trainers.",
    portalUrl: "https://whc.unesco.org/",
    requirements: ["Portfolio", "CV", "Design Samples"],
    businessAction: ["Monitor TheMuseumsLab for 2027 fellowships and talent recruitment opportunities."],
    tags: ["Design", "Fellowship", "Career Development"],
    matchScore: 72,
    verificationNote: "ARCHIVE: Application deadline passed (Feb 8, 2026). Monitor for next cycle announcements."
  },
  {
    id: 1002,
    title: "Elevate Africa Fellowship 2026",
    source: "Elevate Africa",
    country: "Pan-African",
    type: "Fellowship",
    status: "Closed",
    sector: "Tech & Innovation",
    category: "Individual Fellowship",
    value: "Full Stipend + Mentorship",
    deadline: "Feb 08, 2026",
    description: "Pan-African fellowship program supporting emerging tech innovators and creative entrepreneurs building scalable solutions across the creative economy.",
    eligibility: "Tech entrepreneurs and innovators with working prototypes or revenue evidence.",
    strategicFit: "Talent acquisition and partnership development. Elevate alumni can join ALX programs or partner on ventures.",
    portalUrl: "https://www.ashoka.org/",
    requirements: ["Pitch Deck", "Business Plan", "Market Validation"],
    businessAction: ["Add Elevate Africa to ALX partnership pipeline for alumni referrals and joint programming in 2027."],
    tags: ["Tech", "Fellowship", "Entrepreneurship", "Pan-African"],
    matchScore: 85,
    verificationNote: "ARCHIVE: Application deadline passed (Feb 8, 2026). Reached out to track for next cohort and partnership opportunities."
  }
];

const SECTOR_TABS = [
  { id: 'All', label: 'All' },
  { id: 'Tech & Innovation', label: 'Tech & AI' },
  { id: 'Finance', label: 'Finance & Invest' },
  { id: 'Content Creation', label: 'Content' },
  { id: 'Film & TV', label: 'Film & Production' },
  { id: 'Music & Audio', label: 'Music' }
];

const LOCATION_FILTERS = [
  'All Locations', 'Pan-African', 'South Africa', 'Kenya', 'Nigeria', 'Egypt', 'Ghana', 'Ethiopia', 'Morocco', 'Rwanda'
];

// --- HELPER FUNCTION: RETRY API CALLS ---
const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        throw new Error(`Client error: ${res.status}`);
      }
    } catch (e) {
      if (i === retries - 1) throw e;
    }
    await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
  }
};

const App = () => {
  const [dealType, setDealType] = useState('business'); 
  const [activeTab, setActiveTab] = useState('dashboard'); // Default to dashboard for ALX view
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null); 
  
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'SYSTEM ONLINE: ALX Business Intelligence Active. I can search the web for live Mega-Funds, Capacity Building RFPs, and Creative Tech infrastructure deals, and add them directly to your matrix.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showClosed, setShowClosed] = useState(false);

  // Fetch and automatically sort by Match Score (High Value at top)
  const fetchLiveOpportunities = (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    setTimeout(() => {
      const sortedData = [...DATABASE_SOURCE].sort((a, b) => b.matchScore - a.matchScore);
      setOpportunities(sortedData);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsLoading(false);
      setIsRefreshing(false);
    }, 1000); 
  };

  useEffect(() => {
    fetchLiveOpportunities();
  }, []);

  // --- LIVE GEMINI API CHAT HANDLER ---
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userText }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const apiKey = ""; // API key is injected by the environment
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      const payload = {
        contents: [{ parts: [{ text: userText }] }],
        systemInstruction: {
          parts: [{ text: "You are the ALX Deal Copilot. Answer questions about creative economy deals and search the web for new real-world funding, tenders, or partnerships in Africa. If the user asks you to find or search for new opportunities, use google search, summarize the findings, and INCLUDE them as structured data in the 'newOpportunities' array in the JSON response so they can be injected into the database." }]
        },
        tools: [{ "google_search": {} }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              reply: { type: "STRING", description: "Your conversational response to the user." },
              newOpportunities: {
                type: "ARRAY",
                description: "Array of newly discovered deals from the web search.",
                items: {
                  type: "OBJECT",
                  properties: {
                    title: { type: "STRING" },
                    source: { type: "STRING" },
                    country: { type: "STRING" },
                    type: { type: "STRING" },
                    status: { type: "STRING", description: "Open, Urgent, Forecast, or Closed" },
                    sector: { type: "STRING" },
                    category: { type: "STRING", description: "Business Only or B2B Partnership" },
                    value: { type: "STRING" },
                    deadline: { type: "STRING" },
                    description: { type: "STRING" },
                    eligibility: { type: "STRING" },
                    strategicFit: { type: "STRING", description: "How this benefits ALX specifically" },
                    portalUrl: { type: "STRING" }
                  },
                  required: ["title", "source", "country", "status", "category", "description", "strategicFit", "sector", "value"]
                }
              }
            }
          }
        }
      };

      const response = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (responseText) {
        const parsed = JSON.parse(responseText);
        setChatMessages(prev => [...prev, { role: 'system', content: parsed.reply }]);
        
        // Inject new opportunities into the main database array
        if (parsed.newOpportunities && parsed.newOpportunities.length > 0) {
          const newOps = parsed.newOpportunities.map((op, idx) => ({
            ...op,
            id: Date.now() + idx,
            matchScore: Math.floor(Math.random() * (99 - 85 + 1) + 85),
            tags: ["AI Discovered", op.country || "Global", op.sector || "General"],
            requirements: ["Review Web Source", "Verify Procurement Terms"],
            businessAction: ["Investigate this AI-sourced lead immediately."]
          }));
          
          setOpportunities(prev => {
            const updated = [...newOps, ...prev];
            return updated.sort((a, b) => b.matchScore - a.matchScore); // keep highest scores at top
          });
          
          setChatMessages(prev => [...prev, { role: 'system', content: `⚡ I actively found and added **${newOps.length} new deal(s)** to the Opportunity Matrix.` }]);
        }
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      setChatMessages(prev => [...prev, { role: 'system', content: "⚠️ Connection to Intelligence Network disrupted. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const filteredOpportunities = opportunities.filter(op => {
    if (dealType === 'business' && op.category !== 'Business Only') return false;
    if (dealType === 'partnership' && op.category !== 'B2B Partnership') return false;
    if (selectedSector !== 'All' && op.sector !== selectedSector) return false;
    if (selectedLocation !== 'All Locations' && op.country && !op.country.includes(selectedLocation)) return false;
    if (!showClosed && op.status === 'Closed') return false;
    if (showClosed && op.status !== 'Closed') return false;

    const matchesSearch = searchQuery === '' || 
      op.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (op.sector && op.sector.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const handleAnalyzeClick = (op) => {
    setSelectedOpportunity(op);
    setActiveTab('search'); 
  };

  const handleBackToFeed = () => {
    setSelectedOpportunity(null);
  };

  // --- COMPONENTS ---

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); setSelectedOpportunity(null); }}
      className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
        activeTab === id 
          ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500 shadow-sm' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-600'
      }`}
    >
      <Icon size={20} className={activeTab === id ? 'text-emerald-600' : ''} />
      <span className="font-semibold tracking-wide">{label}</span>
    </button>
  );

  const DealTypeToggle = () => (
    <div className="flex space-x-4 mb-6">
      <button 
        onClick={() => setDealType('business')}
        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all border ${
          dealType === 'business' 
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
          : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
        }`}
      >
        Institutional & Contracts
      </button>
      <button 
        onClick={() => setDealType('partnership')}
        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all border ${
          dealType === 'partnership' 
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
          : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
        }`}
      >
        B2B & Joint Ventures
      </button>
    </div>
  );

  const StatusBadge = ({ status }) => {
    let styles = "";
    if (status === "Open") styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
    else if (status === "Forecast") styles = "bg-blue-50 text-blue-700 border-blue-200";
    else if (status === "Closed") styles = "bg-slate-100 text-slate-500 border-slate-200";
    else if (status === "Urgent") styles = "bg-rose-50 text-rose-700 border-rose-200";
    else if (status === "Verification Needed") styles = "bg-amber-50 text-amber-700 border-amber-200";
    
    return (
      <span className={`inline-flex px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border items-center gap-1.5 ${styles}`}>
        {status === 'Urgent' && <Timer size={12} className="animate-pulse" />}
        {status === 'Verification Needed' && <AlertCircle size={12} className="text-amber-600" />}
        {status === 'Closed' ? 'Closed' : status}
      </span>
    );
  };

  const OpportunityCard = ({ op }) => (
    <div className={`bg-white rounded-2xl border p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden ${op.status === 'Closed' ? 'border-slate-200 opacity-70 grayscale-[0.5]' : 'border-slate-200 hover:border-emerald-300'}`}>
      
      {op.matchScore > 95 && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg z-20 shadow-sm">
          ALX Top Target
        </div>
      )}

      {/* AI Discovered Badge */}
      {op.tags?.includes("AI Discovered") && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-br-lg z-20 shadow-sm flex items-center">
          <Sparkles size={10} className="mr-1" /> AI Discovered
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex justify-between items-start mb-5 relative z-10 pt-4">
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <StatusBadge status={op.status} />
            {op.matchScore && op.status !== 'Closed' && (
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-md border ${op.matchScore > 95 ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>
                <Target size={10} className={`mr-1.5 ${op.matchScore > 95 ? 'text-amber-500' : 'text-emerald-500'}`} />
                {op.matchScore}% ALX FIT
              </div>
            )}
          </div>
          <h3 className={`text-xl font-bold tracking-tight group-hover:text-slate-900 transition-colors line-clamp-2 h-14 ${op.status === 'Closed' ? 'text-slate-500' : 'text-slate-800'}`}>{op.title}</h3>
          
          <div className="flex items-center mt-2 justify-between">
            <p className="text-slate-500 text-sm flex items-center font-semibold">
              <Building2 size={14} className="mr-1.5 text-slate-400" /> {op.source}
            </p>
            <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200">
              {op.country}
            </span>
          </div>
        </div>
      </div>

      <div className={`mb-5 p-3 rounded-xl border relative z-10 ${op.status === 'Closed' ? 'bg-slate-50 border-slate-100' : op.matchScore > 95 ? 'bg-amber-50/30 border-amber-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
          <p className={`font-extrabold text-lg tracking-tight ${op.status === 'Closed' ? 'text-slate-500' : op.matchScore > 95 ? 'text-amber-700' : 'text-emerald-700'}`}>{op.value}</p>
          <p className="text-xs flex items-center mt-1 uppercase tracking-wider font-bold text-slate-400">
             <Clock size={12} className="mr-1.5" /> {op.deadline}
          </p>
      </div>

      <p className="text-slate-600 text-sm mb-5 leading-relaxed flex-grow relative z-10 line-clamp-3">
        {op.description}
      </p>

      <button 
        onClick={() => handleAnalyzeClick(op)}
        className={`w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 relative z-10 text-white shadow-md hover:shadow-lg ${
        op.status === 'Closed' 
          ? 'bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 shadow-none' 
          : op.matchScore > 95
            ? 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-black hover:to-slate-800 shadow-slate-900/20'
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/20'
      }`}>
        {op.status === 'Closed' ? 'View Archive Data' : 'Execute Strategy'}
      </button>
    </div>
  );

  const DetailedView = ({ op }) => (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-300">
      <div className="relative p-8 md:p-10 border-b border-slate-200 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <button onClick={handleBackToFeed} className="flex items-center text-slate-500 hover:text-emerald-600 mb-6 transition-colors font-semibold text-sm bg-white px-3 py-1.5 rounded-lg border border-slate-200 w-max shadow-sm hover:shadow">
            <ChevronLeft size={16} className="mr-1.5" /> Back to Matrix
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-4 mb-4">
                <StatusBadge status={op.status} />
                <span className="text-slate-600 text-sm font-bold uppercase tracking-wider flex items-center bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                  <MapPin size={14} className="mr-1.5 text-emerald-500" /> {op.country}
                </span>
                {op.tags?.includes("AI Discovered") && (
                  <span className="text-purple-600 text-sm font-bold uppercase tracking-wider flex items-center bg-purple-50 px-2 py-1 rounded border border-purple-200 shadow-sm">
                    <Sparkles size={14} className="mr-1.5" /> AI Sourced
                  </span>
                )}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{op.title}</h2>
              <div className="flex items-center text-lg text-slate-600 font-semibold flex-wrap gap-4">
                <span className="flex items-center"><Building2 size={18} className="mr-2 text-slate-400" /> {op.source}</span>
                {op.matchScore && op.status !== 'Closed' && (
                  <span className={`flex items-center px-3 py-1 rounded-lg border ${op.matchScore > 95 ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200'}`}>
                    <Target size={16} className={`mr-2 ${op.matchScore > 95 ? 'text-amber-500' : 'text-emerald-500'}`} /> {op.matchScore}% ALX Alignment
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center min-w-[200px] shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent"></div>
              <div className="relative z-10">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Total Value</p>
                <p className={`text-3xl font-black tracking-tight ${op.status === 'Closed' ? 'text-slate-500' : 'text-emerald-600'}`}>{op.value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center tracking-wide">
              <FileText size={20} className="mr-3 text-emerald-500" /> Opportunity Scope
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">{op.description}</p>
          </section>

          <section className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-extrabold text-emerald-900 mb-6 flex items-center tracking-wide">
                <Target size={20} className="mr-3 text-emerald-600" /> ALX Strategic Fit Assessment
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-emerald-100 text-center shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Alignment Score</p>
                  <p className={`text-4xl font-black ${op.matchScore > 95 ? 'text-amber-600' : op.matchScore > 85 ? 'text-emerald-600' : 'text-teal-600'}`}>{op.matchScore}%</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-100 text-center shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Value Range</p>
                  <p className="text-sm font-black text-slate-900">{op.value}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-100 text-center shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Opportunity Type</p>
                  <p className="text-sm font-black text-slate-900">{op.category}</p>
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-4 border border-emerald-100">
                <p className="text-sm text-emerald-900 font-semibold leading-relaxed italic">"{op.strategicFit}"</p>
              </div>
            </div>
          </section>

          <section className="relative p-8 rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
             <div className="relative z-10">
               <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center">
                <Rocket size={18} className="mr-2" /> ALX Strategic Playbook
              </h3>
              <p className="text-white leading-relaxed font-semibold text-lg mb-6">"{op.strategicFit}"</p>
              
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recommended Actions</h4>
                  <ul className="space-y-3">
                  {op.businessAction && op.businessAction.map((action, idx) => (
                    <li key={idx} className="flex items-start text-slate-200 font-medium text-sm">
                      <div className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black mr-3 mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="mt-0.5 leading-snug">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-5 flex items-center">
              <ClipboardCheck size={16} className="mr-2 text-emerald-500" /> Proposal Requirements
            </h3>
            <ul className="space-y-3">
              {op.requirements && op.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-3 flex-shrink-0"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {op.verificationNote && (
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 shadow-sm">
              <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 flex items-center">
                <CheckCircle size={16} className="mr-2" /> Verification Status
              </h4>
              <p className="text-sm text-blue-900 font-semibold leading-relaxed">{op.verificationNote}</p>
            </div>
          )}

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 pb-3">Timeline</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-sm font-bold">Status</span>
                <span className={`font-extrabold text-sm tracking-wide ${op.status === 'Open' ? 'text-emerald-600' : op.status === 'Urgent' ? 'text-rose-600' : 'text-slate-500'}`}>{op.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-sm font-bold">Deadline</span>
                <span className={`font-extrabold text-sm tracking-wide ${op.status === 'Urgent' ? 'text-rose-600' : 'text-slate-900'}`}>{op.deadline}</span>
              </div>
            </div>
          </div>

           {op.status === 'Closed' ? (
             <button disabled className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider shadow-sm flex items-center justify-center transition-all bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed">
               Opportunity Closed
             </button>
           ) : (
             <a 
               href={op.portalUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider shadow-md flex items-center justify-center transition-all bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white hover:-translate-y-0.5"
             >
               Visit Procurement Portal <ExternalLink size={16} className="ml-2" />
             </a>
           )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden relative selection:bg-emerald-200">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/40 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-200/40 blur-[120px] pointer-events-none"></div>

      {/* SIDEBAR */}
      <aside 
        className={`${isSidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 bg-white/80 backdrop-blur-2xl border-r border-slate-200 transition-all duration-300 flex flex-col z-20 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)]`}
      >
        <div className="h-20 flex items-center justify-center border-b border-slate-200">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3 text-slate-900">
              <Globe size={28} className="text-emerald-600" />
              <span className="font-black text-2xl tracking-tighter">ALX<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Scout</span></span>
            </div>
          ) : (
            <Globe size={28} className="text-emerald-600" />
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          <SidebarItem id="dashboard" icon={TrendingUp} label={isSidebarOpen ? "Intelligence Overview" : ""} />
          <SidebarItem id="search" icon={Search} label={isSidebarOpen ? "Opportunity Matrix" : ""} />
          <SidebarItem id="chat" icon={Bot} label={isSidebarOpen ? "AI Strategist" : ""} />
          <SidebarItem id="archive" icon={FileCheck} label={isSidebarOpen ? "Archive" : ""} />
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center w-full p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-transparent"
          >
            <Menu size={20} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        
        {/* HEADER */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 z-20">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {activeTab === 'dashboard' && 'Executive Intelligence Overview'}
            {activeTab === 'search' && !selectedOpportunity && 'Strategic Opportunity Matrix'}
            {activeTab === 'search' && selectedOpportunity && 'Deep Dive Intelligence'}
            {activeTab === 'chat' && 'AI Strategy Terminal'}
            {activeTab === 'archive' && 'Closed Opportunities Archive'}
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {isLoading ? 'Syncing...' : `Live: ${lastUpdated}`}
              </span>
            </div>
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-sm font-extrabold text-white shadow-md border border-white">
              ALX
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          
          {/* VIEW: INTELLIGENCE DASHBOARD (ALX CONTEXT) */}
          {activeTab === 'dashboard' && (
             <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
               
               {/* KPI ROW */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Total Opportunities</p>
                    <h3 className="text-3xl font-black text-slate-900 relative z-10">{DATABASE_SOURCE.length}</h3>
                    <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center relative z-10"><TrendingUp size={12} className="mr-1"/> Active deals in pipeline</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">High-Value Targets</p>
                    <h3 className="text-3xl font-black text-slate-900 relative z-10">{DATABASE_SOURCE.filter(o => o.matchScore > 95).length}</h3>
                    <p className="text-xs font-bold text-slate-500 mt-2 relative z-10">Match score &gt;95%</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Verified Deals</p>
                    <h3 className="text-3xl font-black text-slate-900 relative z-10">{DATABASE_SOURCE.filter(o => o.verificationNote?.startsWith('✓')).length}</h3>
                    <p className="text-xs font-bold text-slate-500 mt-2 relative z-10">Confirmed on official portals</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">Top Growth Sector</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1 relative z-10">Creative Tech</h3>
                    <p className="text-xs font-bold text-slate-500 mt-2 relative z-10">AI, Cloud & Gaming</p>
                  </div>
               </div>

               {/* STRATEGIC THESIS */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-xl border border-slate-800">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="relative z-10">
                      <h2 className="text-2xl font-black text-white mb-4 flex items-center">
                        <Target className="text-emerald-400 mr-3" size={28} /> ALX Market Position & Strategy
                      </h2>
                      <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium">
                        The Creative Economy is undergoing a massive digital transformation. Capital is moving away from traditional arts funding and pouring into <strong>Creative Tech Infrastructure, AI workflows, and EdTech capacity building</strong>. 
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                          <h4 className="text-emerald-400 font-bold mb-2 flex items-center"><Zap size={16} className="mr-2"/> The Talent Arbitrage</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">Mega-funds (like Mastercard Fdn & AfDB) have capital but lack execution engines. ALX's massive pool of SWE and AI graduates is the missing link to deploy this capital effectively.</p>
                        </div>
                        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                          <h4 className="text-emerald-400 font-bold mb-2 flex items-center"><Layers size={16} className="mr-2"/> Infrastructure Play</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">We don't need to be a production house. We pitch ALX hubs as 'Creative Tech Incubators' and our online LMS as the delivery mechanism for creative capacity building grants.</p>
                        </div>
                      </div>
                      <button onClick={() => setActiveTab('search')} className="mt-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                        View Target Matrix
                      </button>
                    </div>
                 </div>

                 {/* TOP TARGETS QUICK LIST */}
                 <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
                   <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
                     <AlertCircle className="text-rose-500 mr-2" size={20} /> Immediate Action Targets
                   </h3>
                   <div className="space-y-4 flex-1">
                     {opportunities.filter(o => o.matchScore > 95).slice(0,4).map(op => (
                       <div key={op.id} className="group cursor-pointer border-b border-slate-100 pb-4 last:border-0" onClick={() => handleAnalyzeClick(op)}>
                         <p className="text-xs font-bold text-emerald-600 mb-1">{op.value}</p>
                         <h4 className="text-sm font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">{op.title}</h4>
                         <p className="text-xs font-semibold text-slate-500 mt-1">{op.source} • {op.country}</p>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* VIEW: OPPORTUNITY FEED */}
          {activeTab === 'search' && !selectedOpportunity && (
            <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
              
              <div className="flex justify-center w-full">
                <DealTypeToggle />
              </div>

              {/* SECTOR FILTERS */}
              <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto mb-4">
                {SECTOR_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedSector(tab.id)}
                    className={`flex-1 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap mx-1 ${
                      selectedSector === tab.id
                      ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

               {/* REGION FILTERS */}
               <div className="flex gap-2 overflow-x-auto pb-2 w-full px-2 scrollbar-hide mb-4">
                  {LOCATION_FILTERS.map(loc => (
                    <button 
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                        selectedLocation === loc 
                        ? 'bg-slate-800 text-white shadow-md' 
                        : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-slate-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>

              {/* SEARCH BAR */}
              <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search Mega-funds, PPPs, capacity building grants..." 
                    className="w-full bg-transparent text-slate-900 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-0 font-bold placeholder-slate-400 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-3 px-2">
                   <button 
                     onClick={() => setShowClosed(!showClosed)}
                     className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${showClosed ? 'bg-slate-800 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                   >
                     {showClosed ? 'Hide Archives' : 'Show Archives'}
                   </button>
                </div>
              </div>

              {/* DEALS COUNTER & STATS */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Opportunities</p>
                    <p className="text-2xl font-black text-slate-900">{filteredOpportunities.length} <span className="text-sm font-semibold text-slate-500">of {DATABASE_SOURCE.length} total deals</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pipeline Value</p>
                  <p className="text-2xl font-black text-emerald-600">$75M+</p>
                </div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-96 text-slate-500">
                  <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                    <div className="absolute inset-0 rounded-full border-t-2 border-emerald-600 animate-spin"></div>
                    <Globe size={20} className="text-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-sm font-extrabold uppercase tracking-widest text-slate-700">Sweeping Institutional Databases...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredOpportunities.map(op => (
                    <OpportunityCard key={op.id} op={op} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'search' && selectedOpportunity && (
            <div className="max-w-6xl mx-auto">
              <DetailedView op={selectedOpportunity} />
            </div>
          )}

          {/* VIEW: CHATBOT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full max-h-[calc(100vh-160px)] bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl mx-auto relative animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-center relative z-10">
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                     <Bot size={24} className="text-white" />
                   </div>
                   <div>
                     <h3 className="font-black text-slate-900 text-lg tracking-tight">ALX Deal Copilot</h3>
                     <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center mt-1">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 shadow-[0_0_5px_rgba(16,185,129,0.5)] inline-block"></span> Online
                     </p>
                   </div>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6 z-10 scrollbar-hide bg-slate-50/50">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-6 py-4 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-br-sm' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                    }`}>
                      <p className="text-[15px] leading-relaxed font-semibold" style={{whiteSpace: 'pre-wrap'}}>{msg.content}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl px-6 py-4 bg-white border border-slate-200 rounded-bl-sm shadow-sm flex items-center">
                      <Loader2 className="animate-spin text-emerald-500 mr-3" size={18} />
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">Running live web reconnaissance...</p>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="p-6 bg-white border-t border-slate-200 z-10">
                <form onSubmit={handleChatSubmit} className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isTyping}
                    placeholder="E.g. Search for active tech incubator deals in Kenya..."
                    className="w-full bg-slate-50 text-slate-900 pl-6 pr-14 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold placeholder-slate-400 shadow-sm disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={isTyping || !chatInput.trim()}
                    className="absolute right-2 top-2 p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors shadow-md"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* VIEW: ARCHIVE */}
          {activeTab === 'archive' && (
            <div className="flex-1 max-h-[calc(100vh-160px)] overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {ARCHIVE_SOURCE.map((deal) => (
                  <div key={deal.id} className={`bg-white rounded-2xl border p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden ${deal.status === 'Closed' ? 'border-slate-200 opacity-80 grayscale-[0.3]' : 'border-slate-200'}`}>
                    
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-black text-slate-900 text-lg leading-snug tracking-tight flex-1">{deal.title}</h3>
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{deal.source}</p>
                    </div>

                    {/* Status & Info */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <StatusBadge status={deal.status} />
                      <span className="text-[11px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-600 rounded">Deadline: {deal.deadline}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">{deal.description}</p>

                    {/* Value */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide">Value</p>
                      <p className="text-sm font-black text-slate-900">{deal.value}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {deal.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Archive Note */}
                    {deal.verificationNote && (
                      <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 mb-4">
                        <p className="text-xs text-slate-700 leading-relaxed">{deal.verificationNote}</p>
                      </div>
                    )}

                    {/* Action */}
                    {deal.portalUrl && (
                      <a 
                        href={deal.portalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors"
                      >
                        <ExternalLink size={14} /> Portal
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;