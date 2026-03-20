import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const VERIFIED_DATA = [
  // ── SOUTH AFRICA ──
  {
    id: 'mge_dsac_2026',
    title: 'Mzansi Golden Economy (MGE): Touring & Market Access',
    source: 'DSAC South Africa',
    country: 'South Africa',
    status: 'attention',
    badge: 'Window Closed',
    badgeType: 'amber',
    portalUrl: 'https://www.eservices.gov.za/',
    portalLive: true,
    verdict: 'Legitimate government fund — confirmed. However the 2026/27 application window opened 5 Dec 2025 and closed 1 Feb 2026 (extended deadline). The next window is expected to open ~Dec 2026. Portal link is live and correct.',
    action: 'Update status to Closed. Monitor for Dec 2026 window.',
  },
  {
    id: 'nfvf_funding_2026',
    title: 'NFVF: 2026/27 Comprehensive Film Funding',
    source: 'NFVF South Africa',
    country: 'South Africa',
    status: 'attention',
    badge: 'Deadline Passed',
    badgeType: 'red',
    portalUrl: 'https://www.nfvf.co.za/nfvf-call-for-submission-for-training-provider-grant-2026/',
    portalLive: true,
    verdict: 'Confirmed legitimate and active. The March 9 deadline has now passed. Important: the listing describes this as "Comprehensive Film Funding" but the actual open call was specifically for training providers — not production grants. Production funding cycles are separate.',
    action: 'Mark deadline as passed. Correct title to reflect Training Provider Grant scope.',
  },
  {
    id: 'nac_sa_2026',
    title: 'National Arts Council: 2026 Annual Project Funding',
    source: 'NAC South Africa',
    country: 'South Africa',
    status: 'expired',
    badge: 'Closed – Deadline Passed',
    badgeType: 'red',
    portalUrl: 'https://nac.praxisgms.co.za/',
    portalLive: true,
    verdict: 'Fully verified and legitimate. The March 13, 2026 deadline at 23:59 has now passed. Outcomes will be announced 29 May 2026. This deal should be marked Closed immediately.',
    action: 'Mark as Closed. Next cycle expected Feb 2027.',
  },

  // ── NIGERIA ──
  {
    id: 'cchub_edtech_2026',
    title: 'CcHUB EdTech Fellowship (Cohort 4)',
    source: 'CcHUB / Mastercard Foundation',
    country: 'Nigeria',
    status: 'verified',
    badge: 'Verified & Open',
    badgeType: 'green',
    portalUrl: 'https://futureoflearning.cchub.africa/',
    portalLive: true,
    verdict: 'Confirmed legitimate — CcHUB + Mastercard Foundation, $100k equity-free per startup, 12 selected. Open since 27 Feb 2026. Note: different sources cite March 30 or April 10 as the closing date. Official CcHUB page confirms April 10 as the authoritative deadline.',
    action: 'Correct deadline to April 10. Pipeline top EdTech projects now.',
  },
  {
    id: 'nigeria_idice_fund',
    title: 'iDICE: Creative Sector Investment Fund 2026',
    source: 'Bank of Industry (BOI)',
    country: 'Nigeria',
    status: 'verified',
    badge: 'Verified – Rolling',
    badgeType: 'green',
    portalUrl: 'https://www.boi.ng/',
    portalLive: true,
    verdict: 'BOI is legitimate and the iDICE programme ($617M) is real, backed by the World Bank and AfDB. Portal is live. No specific application deadline — engagement is via BOI directly. Database description is accurate.',
    action: 'No changes needed. Initiate BOI dialogue for graduate investment readiness.',
  },

  // ── KENYA ──
  {
    id: 'kenya_film_coproduction',
    title: 'KFC: Film Co-Production Funding',
    source: 'Kenya Film Commission (KFC)',
    country: 'Kenya',
    status: 'attention',
    badge: 'Needs Verification',
    badgeType: 'amber',
    portalUrl: 'https://kenyafilmcommission.go.ke/',
    portalLive: true,
    verdict: 'KFC is a legitimate government body and co-production funding is real. However the March 31, 2026 deadline could not be confirmed — the live site does not specify this date and the most recent dated call found was from 2020. Do not pipeline applicants until confirmed.',
    action: 'Direct outreach to KFC required before treating this deal as active.',
  },

  // ── ETHIOPIA ──
  {
    id: 'ethiopia_startup_fund',
    title: 'Ethiopia Startup Fund: 2 Billion Birr Pool',
    source: 'Ethiopian ICT Park',
    country: 'Ethiopia',
    status: 'verified',
    badge: 'Verified – Rolling',
    badgeType: 'green',
    portalUrl: 'https://ethiopianitpark.et/',
    portalLive: true,
    verdict: 'Legitimate and active. The 2 Billion Birr startup fund and tax incentive scheme is confirmed real. The "Startup Label" pathway via Ethiopian ICT Park is the correct entry point. Rolling windows through 2026.',
    action: 'No changes needed. Pipeline ALX Ethiopia graduates for Startup Labeling.',
  },

  // ── RWANDA ──
  {
    id: 'kigali_innovation_city',
    title: 'Kigali Innovation City: Tech-Creative Incentives',
    source: 'RDB Rwanda',
    country: 'Rwanda',
    status: 'verified',
    badge: 'Verified – Rolling',
    badgeType: 'green',
    portalUrl: 'https://rdb.rw/investment-opportunities/kigali-innovation-city/',
    portalLive: true,
    verdict: "Rwanda's $2B KIC ecosystem is confirmed active. 0% corporate tax holiday and subsidised office space for registered KIC startups. RDB portal is live and correct. Rolling intake windows throughout 2026.",
    action: "No changes needed. Establish ALX 'Scout Desk' at KIC.",
  },
  {
    id: 'rwanda_film_office_grants',
    title: 'Rwanda Film Office: Production & Post Grants',
    source: 'RDB Rwanda',
    country: 'Rwanda',
    status: 'attention',
    badge: 'Window Unconfirmed',
    badgeType: 'amber',
    portalUrl: 'https://rdb.rw/rwanda-film-office/',
    portalLive: true,
    verdict: 'RFO is legitimate and the RDB portal link is live. However the listed deadline ("Late 2025 / 2026 Window") is vague and no confirmed 2026 call for applications was found. The fund exists but the current cycle status is unclear.',
    action: 'Contact RDB Rwanda Film Office directly to confirm 2026 call is open.',
  },

  // ── PAN-AFRICAN ──
  {
    id: 'ifc_shewins_2026',
    title: 'IFC She Wins Africa: Scaling 1,000 Women Entrepreneurs',
    source: 'IFC',
    country: 'Pan-African',
    status: 'verified',
    badge: 'Verified – Expanding',
    badgeType: 'green',
    portalUrl: 'https://www.ifc.org/shewinsafrica',
    portalLive: true,
    verdict: 'Confirmed and very active. Phase 1 (100 women) closed Feb 5, 2026 in Lagos with $4M+ mobilised. Phase 2 expansion to 1,000 women announced Feb 6, 2026. No public portal yet for Phase 2 — enquiries via shewinsafrica@ifc.org.',
    action: 'Update to note Phase 2 enquiries via email. Pipeline women-led ALX startups immediately.',
  },
  {
    id: 'canex_africa',
    title: 'CANEX $2 Billion Creative Africa Nexus Fund',
    source: 'Afreximbank',
    country: 'Pan-African',
    status: 'verified',
    badge: 'Verified – Rolling',
    badgeType: 'green',
    portalUrl: 'https://canex.africa/',
    portalLive: true,
    verdict: "Afreximbank's CANEX fund is real, active, and well-funded. Portal is live. IMPACT 2026 cycle is ongoing. No issues found — the database entry is accurate.",
    action: 'No changes needed. Submit infrastructure pipeline proposal.',
  },
  {
    id: 'mip_africa_2026',
    title: 'MIP Africa 2026: B2B Content Market & Partnerships',
    source: 'MIP Africa',
    country: 'Pan-African (Cape Town)',
    status: 'verified',
    badge: 'Verified – Sept 2026',
    badgeType: 'green',
    portalUrl: 'https://www.mipafrica.com/',
    portalLive: true,
    verdict: 'MIP Africa is a real and well-established B2B content market. Portal is live and active. September 2026 cycle is consistent with their annual schedule in Cape Town.',
    action: "No changes needed. Plan 'ALX Creative Pavilion' sponsorship now.",
  },
  {
    id: 'next_narrative_africa_2026',
    title: 'Next Narrative Africa Fund (NNAF)',
    source: 'Next Narrative Africa',
    country: 'Pan-African',
    status: 'attention',
    badge: 'Between Cycles',
    badgeType: 'amber',
    portalUrl: 'https://nextnarrativeafricafund.com/',
    portalLive: true,
    verdict: 'Confirmed highly credible — $50M fund backed by Trevor Noah, Rapman, Thuso Mbedu among others. First slate of 9 grantees (from 2,000+ submissions) announced March 12, 2026. The database notes "submissions currently open" which is now inaccurate — the fund is between cycles.',
    action: "Update status to 'Between Cycles'. Watch site for next open call announcement.",
  },
  {
    id: 'africa_no_filter_2026',
    title: 'Africa No Filter (ANF) Grants',
    source: 'Africa No Filter',
    country: 'Pan-African',
    status: 'attention',
    badge: 'Value Incorrect',
    badgeType: 'amber',
    portalUrl: 'https://africanofilter.org/',
    portalLive: true,
    verdict: 'Legitimate and active. The Last Mile Film Fund is currently open at up to $10,000 per project — not $3,000 as listed. Micro-grants (Kekere) exist separately at $2,500. Access requires joining the African Narrative Collective first.',
    action: 'Correct grant value to $10,000 (Last Mile). Note Collective membership as prerequisite.',
  },
  {
    id: 'mtf_incubator_2026',
    title: 'MultiChoice Talent Factory (MTF)',
    source: 'MultiChoice',
    country: 'Pan-African',
    status: 'verified',
    badge: 'Verified – Rolling',
    badgeType: 'green',
    portalUrl: 'https://multichoicetalentfactory.com/',
    portalLive: true,
    verdict: 'Fully confirmed and active. MTF is one of the most established creative industry incubators on the continent, running since 2018. Fully-funded 12-month programme with annual intake windows. Portal is live.',
    action: 'No changes needed. Pipeline young ALX creatives into MTF cohorts.',
  },
  {
    id: 'ccf_diaspora_2026',
    title: 'Caribbean Culture Fund',
    source: 'CCF',
    country: 'Diaspora',
    status: 'attention',
    badge: 'Needs Verification',
    badgeType: 'amber',
    portalUrl: 'https://caribbeanculturefund.org/',
    portalLive: false,
    verdict: 'The fund concept is legitimate but the listed portal URL (caribbeanculturefund.org) could not be independently confirmed as live during verification. The Caribbean Culture Fund as described may have rebranded or moved. Recommend manual URL check before directing applicants.',
    action: 'Manually verify portal URL is live. Confirm fund is still operating under this name.',
  },

  // ── INTERNATIONAL ──
  {
    id: 'arts_council_uk_2026',
    title: 'Arts Council England: Four Nations International Fund',
    source: 'Arts Council England',
    country: 'UK / Global',
    status: 'expired',
    badge: 'Deadline Passed',
    badgeType: 'red',
    portalUrl: 'https://www.artscouncil.org.uk/',
    portalLive: true,
    verdict: 'Legitimate and confirmed. However the March 15, 2026 deadline has passed. The Arts Council England portal is live but this specific round has closed. Next round timing is not yet announced.',
    action: 'Mark as Closed. Monitor artscouncil.org.uk for next Four Nations round.',
  },
  {
    id: 'bfi_global_screen_2026',
    title: 'BFI: UK Global Screen Fund (International Co-production)',
    source: 'British Film Institute',
    country: 'UK / Global',
    status: 'verified',
    badge: 'Verified & Open',
    badgeType: 'green',
    portalUrl: 'https://www.bfi.org.uk/get-funding-support/uk-global-screen-fund',
    portalLive: true,
    verdict: 'Confirmed. Open since Feb 12, 2026. General deadline April 9 at midday. Fast Track deadline was March 12. Fund is expanding from £7M to £18M/year from 2026–29. Portal URL is correct and live.',
    action: 'No changes needed. Pipeline ALX film studios for UK partnerships before April 9.',
  },
  {
    id: 'red_sea_fund_2026',
    title: 'The Red Sea Fund',
    source: 'Red Sea Film Festival',
    country: 'Pan-African / MENA',
    status: 'attention',
    badge: 'Deadline Tomorrow',
    badgeType: 'red',
    portalUrl: 'https://redseafilmfest.com/',
    portalLive: true,
    verdict: 'Fully confirmed and live. Cycle 02 (Production Fund) runs March 6–21, 2026. Today is March 20 — deadline is tomorrow March 21. Cycle 03 (Development) opens May 6–21. The fund has backed 330+ projects with a $15M annual pool.',
    action: 'URGENT: Any ALX directors must submit today. Note Cycle 03 opens May 6.',
  },
  {
    id: 'idfa_bertha_2026',
    title: 'IDFA Bertha Fund',
    source: 'IDFA',
    country: 'Global South',
    status: 'attention',
    badge: 'Scope Mismatch',
    badgeType: 'amber',
    portalUrl: 'https://www.idfa.nl/en/fund/',
    portalLive: true,
    verdict: 'The IBF Europe – Minority Co-production strand (€40k max) is confirmed open with April 1 deadline. However the IBF Classic strand (direct filmmaker grant) merged its 2026 rounds into a single Feb 10 deadline — now passed. The database entry conflates both strands. The April 1 deal is specifically for European co-producers, not direct African filmmaker applications.',
    action: 'Clarify: April 1 is IBF Europe (co-producers only). IBF Classic has no more 2026 rounds.',
  },
  {
    id: 'mac_vc_2026',
    title: 'MaC Venture Capital: Pre-Seed & Seed',
    source: 'MaC Venture Capital',
    country: 'Global / Africa',
    status: 'verified',
    badge: 'Verified – Rolling',
    badgeType: 'green',
    portalUrl: 'https://macventurecapital.com/',
    portalLive: true,
    verdict: 'MaC VC is a well-established and legitimate venture fund known for backing culture-shifting tech companies. Portal is live. Proprietary deal flow means a warm introduction is essential — cold applications are rarely successful.',
    action: 'No changes needed. Leverage network for warm intros.',
  },
  {
    id: 'wbdm_mobility_2026',
    title: 'Mobility Grants Africa–Europe',
    source: 'WBDM / Africa-Europe',
    country: 'Africa / Europe',
    status: 'attention',
    badge: 'Next Cut-off Jun 15',
    badgeType: 'amber',
    portalUrl: 'https://www.wbdm.be/',
    portalLive: true,
    verdict: 'Confirmed and legitimate — Goethe-Institut / Africa-Europe Partnerships for Culture (€4,000 per mobility, up to 195 grants total). The March 15 cut-off has passed. Next cut-offs: June 15 and September 15, 2026. Note: the primary application portal is via Goethe-Institut, not WBDM (a Belgian design org that promotes the grant).',
    action: 'Update deadline to June 15. Add note that primary portal is Goethe-Institut.',
  },

  // ── ECOSYSTEM / VC ──
  {
    id: 'heva_ota_2026',
    title: 'Ota Growth Loan Facility',
    source: 'HEVA Fund',
    country: 'East Africa',
    status: 'verified',
    badge: 'Verified – Open',
    badgeType: 'green',
    portalUrl: 'https://www.hevafund.com/',
    portalLive: true,
    verdict: 'HEVA Fund is a well-respected creative economy financier in East Africa. The Ota Growth Loan facility is confirmed active and disbursing through December 31, 2026. Tailored for creative MSMEs with proven revenue. Portal is live.',
    action: 'No changes needed. Pipeline mature creative startups with revenue history.',
  },
  {
    id: 'proparco_crea_2026',
    title: 'CREA Fund (Guarantee Mechanism)',
    source: 'Proparco / European Union',
    country: 'Pan-African',
    status: 'verified',
    badge: 'Verified – Ongoing',
    badgeType: 'green',
    portalUrl: 'https://www.proparco.fr/',
    portalLive: true,
    verdict: 'Proparco is the private sector arm of Agence Française de Développement (AFD) — fully legitimate. The CREA guarantee mechanism is real and active, operating via local partner financial institutions. Portal is live.',
    action: 'No changes needed. Identify local partner banks for CREA-backed loans.',
  },
  {
    id: 'sony_innovation_africa',
    title: 'Sony Innovation Fund: Africa',
    source: 'Sony Ventures / IFC',
    country: 'Pan-African',
    status: 'attention',
    badge: 'Portal Mismatch',
    badgeType: 'amber',
    portalUrl: 'https://www.sonyinnovationfund.com/',
    portalLive: false,
    verdict: "The Sony Innovation Fund for Africa is a real initiative backed by Sony and IFC. However the listed portal URL (sonyinnovationfund.com) resolves to Sony's global innovation page which does not have a specific Africa programme entry point. Applications appear to go through IFC directly.",
    action: 'Update portal URL to IFC contact page. Confirm current intake status with IFC.',
  },
  {
    id: 'afdb_aestif_2026',
    title: 'African Education, Science, Technology & Innovation Fund (AESTIF)',
    source: 'AfDB',
    country: 'Pan-African',
    status: 'upcoming',
    badge: 'Not Yet Open',
    badgeType: 'gray',
    portalUrl: 'https://www.afdb.org/',
    portalLive: true,
    verdict: 'Confirmed as a real AfDB framework in development. Not yet open for applications — currently in the design/framework stage. The AfDB portal is live. This is a watch-and-wait deal with high future potential.',
    action: 'No action needed yet. Set a quarterly reminder to check AfDB announcements.',
  },

  // ── CLOSED / PAST ──
  {
    id: 'unesco_ifcd_2025',
    title: '16th International Fund for Cultural Diversity (IFCD)',
    source: 'UNESCO',
    country: 'Global',
    status: 'expired',
    badge: 'Closed – May 2025',
    badgeType: 'gray',
    portalUrl: 'https://en.unesco.org/creativity/ifcd/apply',
    portalLive: true,
    verdict: 'Fully legitimate — UNESCO IFCD is one of the most respected cultural funds globally. The 16th cycle closed May 21, 2025. The portal link is live and will host the 17th cycle call when it opens, typically in Q1 each year.',
    action: 'Monitor for 17th cycle opening, expected Q1 2027.',
  },
  {
    id: 'ford_justfilms_2025',
    title: 'JustFilms (General Operating & Core Support)',
    source: 'Ford Foundation',
    country: 'Global',
    status: 'expired',
    badge: 'Closed – Sept 2025',
    badgeType: 'gray',
    portalUrl: 'https://www.fordfoundation.org/work/our-grants/justfilms/',
    portalLive: true,
    verdict: 'Ford Foundation JustFilms is a highly credible operating grant for social-justice documentary organisations. Closed September 8, 2025. Ford Foundation does not have predictable open cycles — grants are largely by invitation or LOI. Portal is live.',
    action: 'Monitor. Prioritise relationship-building with Ford Foundation programme officers.',
  },
  {
    id: 'british_council_ceg_2025',
    title: 'Creative Economy Grants',
    source: 'British Council',
    country: 'Global',
    status: 'expired',
    badge: 'Closed – Oct 2025',
    badgeType: 'gray',
    portalUrl: 'https://www.britishcouncil.org/',
    portalLive: true,
    verdict: 'British Council Creative Economy Grants are legitimate and well-regarded. The 2025 cycle closed October 22, 2025. The main British Council portal is live. No confirmed 2026 cycle dates yet.',
    action: 'Monitor britishcouncil.org for 2026 cycle announcement.',
  },
  {
    id: 'if_connect_create_2025',
    title: 'Connect & Create (Creative Tandems & Mobility)',
    source: 'Institut Français',
    country: 'Global',
    status: 'expired',
    badge: 'Closed – Dec 2025',
    badgeType: 'gray',
    portalUrl: 'https://www.pro.institutfrancais.com/',
    portalLive: true,
    verdict: 'Institut Français is a legitimate French government cultural agency. Connect & Create closed in November–December 2025. The professional portal is live. A new cycle typically opens mid-year.',
    action: 'Monitor pro.institutfrancais.com for mid-2026 cycle opening.',
  },
  {
    id: 'creative_europe_coop_2025',
    title: 'European Cooperation Projects (Culture Strand)',
    source: 'Creative Europe',
    country: 'Europe & Partners',
    status: 'expired',
    badge: 'Closed – May 2025',
    badgeType: 'gray',
    portalUrl: 'https://culture.ec.europa.eu/',
    portalLive: true,
    verdict: 'Creative Europe is the EU flagship cultural funding programme — fully legitimate. The 2025 Culture Strand closed May 13, 2025. The EC culture portal is live. The 2026 cycle call is expected Q1 2026 and may already be open.',
    action: 'Check culture.ec.europa.eu immediately — 2026 cycle may already be open.',
  },
];

const BADGE_STYLES = {
  green:  { bg: 'bg-emerald-50',  text: 'text-emerald-700',  border: 'border-emerald-200' },
  amber:  { bg: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200'   },
  red:    { bg: 'bg-rose-50',     text: 'text-rose-700',     border: 'border-rose-200'    },
  gray:   { bg: 'bg-slate-100',   text: 'text-slate-500',    border: 'border-slate-200'   },
};

const STATUS_CONFIG = {
  verified: { dot: 'bg-emerald-500', label: 'Verified & Active' },
  attention: { dot: 'bg-amber-400',  label: 'Needs Attention'  },
  expired:   { dot: 'bg-rose-400',   label: 'Expired / Closed' },
  upcoming:  { dot: 'bg-slate-400',  label: 'Not Yet Open'     },
};

const SECTIONS = [
  { label: 'South Africa',      ids: ['mge_dsac_2026','nfvf_funding_2026','nac_sa_2026'] },
  { label: 'Nigeria',           ids: ['cchub_edtech_2026','nigeria_idice_fund'] },
  { label: 'Kenya',             ids: ['kenya_film_coproduction'] },
  { label: 'Ethiopia',          ids: ['ethiopia_startup_fund'] },
  { label: 'Rwanda',            ids: ['kigali_innovation_city','rwanda_film_office_grants'] },
  { label: 'Pan-African',       ids: ['ifc_shewins_2026','canex_africa','mip_africa_2026','next_narrative_africa_2026','africa_no_filter_2026','mtf_incubator_2026','ccf_diaspora_2026'] },
  { label: 'International',     ids: ['arts_council_uk_2026','bfi_global_screen_2026','red_sea_fund_2026','idfa_bertha_2026','mac_vc_2026','wbdm_mobility_2026'] },
  { label: 'Ecosystem & VC',    ids: ['heva_ota_2026','proparco_crea_2026','sony_innovation_africa','afdb_aestif_2026'] },
  { label: 'Closed / Past',     ids: ['unesco_ifcd_2025','ford_justfilms_2025','british_council_ceg_2025','if_connect_create_2025','creative_europe_coop_2025'] },
];

const dealMap = Object.fromEntries(VERIFIED_DATA.map(d => [d.id, d]));

const statusOrder = { attention: 0, expired: 1, verified: 2, upcoming: 3 };

const DealCard = ({ deal }) => {
  const [expanded, setExpanded] = useState(false);
  const badge = BADGE_STYLES[deal.badgeType];
  const sc = STATUS_CONFIG[deal.status];

  return (
    <div className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${expanded ? 'border-slate-300 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-4"
        onClick={() => setExpanded(e => !e)}
      >
        <span className={`mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full ${sc.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <p className="text-sm font-semibold text-slate-800 leading-snug">{deal.title}</p>
            <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
              {deal.badge}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{deal.source} · {deal.country}</p>
        </div>
        <span className="flex-shrink-0 mt-0.5 text-slate-300">
          {expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">{deal.verdict}</p>
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5">
            <span className="text-amber-500 mt-0.5 flex-shrink-0">→</span>
            <p className="text-xs font-semibold text-amber-800">{deal.action}</p>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={deal.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ExternalLink size={12}/> Visit Portal
            </a>
            {!deal.portalLive && (
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">⚠ Portal may be down</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const DealsReport = () => {
  const verified   = VERIFIED_DATA.filter(d => d.status === 'verified').length;
  const attention  = VERIFIED_DATA.filter(d => d.status === 'attention').length;
  const expired    = VERIFIED_DATA.filter(d => d.status === 'expired').length;
  const upcoming   = VERIFIED_DATA.filter(d => d.status === 'upcoming').length;

  const stats = [
    { label: 'Verified & Active', count: verified,  dot: 'bg-emerald-500' },
    { label: 'Needs Attention',   count: attention,  dot: 'bg-amber-400'  },
    { label: 'Expired / Closed',  count: expired,    dot: 'bg-rose-400'   },
    { label: 'Not Yet Open',      count: upcoming,   dot: 'bg-slate-400'  },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Deals Verification Report</h2>
        <p className="text-sm text-slate-400 mt-1">Manual intelligence check across all 31 deals · Last verified March 20, 2026</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full flex-shrink-0 ${s.dot}`} />
            <div>
              <p className="text-2xl font-black text-slate-800">{s.count}</p>
              <p className="text-xs text-slate-400 leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">Legend</span>
        {Object.entries(STATUS_CONFIG).map(([key, val]) => (
          <span key={key} className="flex items-center gap-1.5 text-xs text-slate-500 mr-3">
            <span className={`w-2 h-2 rounded-full ${val.dot}`}/>
            {val.label}
          </span>
        ))}
        <span className="text-xs text-slate-400 ml-auto hidden lg:block">Click any deal to expand the full verdict &amp; recommended action</span>
      </div>

      {/* Sections */}
      {SECTIONS.map(section => {
        const deals = section.ids
          .map(id => dealMap[id])
          .filter(Boolean)
          .sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9));

        return (
          <div key={section.label}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{section.label}</p>
            <div className="space-y-2">
              {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
            </div>
          </div>
        );
      })}

      {/* Footer note */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-bold text-slate-600">Verification methodology:</span> Each deal was cross-referenced against its official portal, recent news sources, and public announcements as of March 20, 2026. Portal availability was tested at time of report. Deal statuses may change — always confirm directly with the funding body before committing applicant resources.
        </p>
      </div>
    </div>
  );
};

export default DealsReport;