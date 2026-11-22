import klidoLogoImg from '../assets/images/Klido_Logo.png';
import klidodeskImg from '../assets/images/klidodesk.png';
import hashiImg from '../assets/images/Hashi.png';
import saanjhImg from '../assets/images/saanjhbyriya.png';
import zegoreImg from '../assets/images/ZEGORE.png';

export interface PracticeArea {
  id: string;
  index: string;
  title: string;
  shortSummary: string;
  description: string;
  deliverables: string[];
  tooling: string[];
  cadence: string;
}

export interface ArchitectureModule {
  id: string;
  label: string;
  headline: string;
  summary: string;
  primaryMetricLabel: string;
  rows: {
    code: string;
    workstream: string;
    artifact: string;
    cadence: string;
  }[];
  governanceNote: string;
}

export interface AuditDomain {
  id: string;
  label: string;
  summary: string;
  checks: {
    id: string;
    title: string;
    detail: string;
    artifact: string;
  }[];
}

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'paid-acquisition',
    index: '01.',
    title: 'Paid Search & Social Acquisition',
    shortSummary: 'Structured campaign architecture, creative testing, and bid governance.',
    description:
      'We build and manage search, shopping, and paid social accounts with clean campaign segmentation, disciplined negative keyword lists, and weekly creative iteration tied directly to qualified pipeline.',
    deliverables: [
      'Account restructuring by intent tier and margin profile',
      'Weekly ad copy and static/motion creative test batches',
      'Search term mining, exclusion governance, and budget pacing',
      'Plain-language weekly performance memo with next-step actions',
    ],
    tooling: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Campaign Manager', 'Looker Studio'],
    cadence: 'Weekly optimization & creative review',
  },
  {
    id: 'technical-seo',
    index: '02.',
    title: 'Technical & Editorial SEO',
    shortSummary: 'Crawl architecture, search intent mapping, and durable organic content.',
    description:
      'Instead of publishing high-volume filler posts, we fix structural crawl bottlenecks, align landing pages to commercial search intent, and produce thorough editorial resources built to earn sustained visibility.',
    deliverables: [
      'Technical crawl audit, indexation cleanup, and schema markup',
      'Commercial and comparison keyword architecture mapped to URLs',
      'Editorial briefs and long-form product-led content production',
      'Internal linking architecture and search console monitoring',
    ],
    tooling: ['Google Search Console', 'Screaming Frog', 'Ahrefs', 'Schema.org'],
    cadence: 'Bi-weekly editorial sprints & technical QA',
  },
  {
    id: 'conversion-architecture',
    index: '03.',
    title: 'Conversion Architecture & Landing Systems',
    shortSummary: 'Dedicated acquisition landing pages, messaging hierarchy, and UX tests.',
    description:
      'Ad spend underperforms when traffic lands on generic homepages. We design and ship focused landing systems, interactive calculators, and friction-free lead flows engineered to clarify value in seconds.',
    deliverables: [
      'Message-match landing pages tailored by campaign intent',
      'Form friction audits, multi-step qualification, and routing UX',
      'Wireframes, copywriting, and production frontend implementation',
      'Controlled A/B split testing with documented hypotheses',
    ],
    tooling: ['Figma', 'React & Tailwind', 'PostHog', 'VWO / Optimizely'],
    cadence: 'Two-week design-to-ship cycles',
  },
  {
    id: 'measurement-attribution',
    index: '04.',
    title: 'Measurement & Attribution Infrastructure',
    shortSummary: 'Server-side tracking, CRM sync, and trustworthy source-of-truth reporting.',
    description:
      'Platform dashboards consistently over-report their own impact. We configure server-side event pipelines, strict UTM taxonomy, and CRM-backed conversion tracking so budget decisions rely on verified revenue signals.',
    deliverables: [
      'Server-side Google Tag Manager and Conversion API setup',
      'Standardized UTM governance and naming conventions across teams',
      'CRM lifecycle stage sync (lead to qualified opportunity)',
      'Executive reporting workbook focused on unit economics',
    ],
    tooling: ['GA4', 'Server-Side GTM', 'HubSpot / Salesforce', 'BigQuery'],
    cadence: 'Monthly telemetry audit & continuous monitoring',
  },
];

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  {
    id: 'paid-media',
    label: 'Paid Acquisition',
    headline: 'Intent-tiered campaign structure with zero overlap',
    summary:
      'Every ad group maps to a distinct commercial query or audience stage, eliminating internal bidding competition and keeping landing page messaging tightly aligned.',
    primaryMetricLabel: 'Primary unit: Cost per qualified pipeline action',
    rows: [
      {
        code: 'ACQ-01',
        workstream: 'Exact-Match High-Intent Search',
        artifact: 'Dedicated solution landing pages + exclusion matrix',
        cadence: 'Twice weekly',
      },
      {
        code: 'ACQ-02',
        workstream: 'Paid Social Creative Matrix',
        artifact: '3 narrative angles × 2 visual formats per sprint',
        cadence: 'Weekly sprint',
      },
      {
        code: 'ACQ-03',
        workstream: 'Competitor & Category Capture',
        artifact: 'Side-by-side comparison pages with transparent specs',
        cadence: 'Bi-weekly',
      },
      {
        code: 'ACQ-04',
        workstream: 'Budget Pacing & Bid Caps',
        artifact: 'Margin-calibrated target CPA guardrails',
        cadence: 'Daily check',
      },
    ],
    governanceNote: 'All ad accounts remain 100% owned and billed directly under your company entity.',
  },
  {
    id: 'search-seo',
    label: 'Search & Editorial',
    headline: 'Commercial intent architecture over volume publishing',
    summary:
      'We prioritize technical crawl clarity and high-intent comparison, integration, and use-case pages before expanding into broader educational coverage.',
    primaryMetricLabel: 'Primary unit: Non-branded organic conversions',
    rows: [
      {
        code: 'SEO-01',
        workstream: 'Crawl & Indexation Hygiene',
        artifact: 'Canonical rules, sitemap pruning, Core Web Vitals fixes',
        cadence: 'Month 1 baseline',
      },
      {
        code: 'SEO-02',
        workstream: 'Bottom-of-Funnel Hub Pages',
        artifact: 'Use-case, industry, and alternative landing architecture',
        cadence: 'Bi-weekly release',
      },
      {
        code: 'SEO-03',
        workstream: 'Editorial Brief & Subject Review',
        artifact: 'Structured outlines vetted with your internal specialists',
        cadence: 'Weekly',
      },
      {
        code: 'SEO-04',
        workstream: 'Internal Link Graph',
        artifact: 'Hub-and-spoke contextual linking across core money pages',
        cadence: 'Monthly audit',
      },
    ],
    governanceNote: 'Every article is researched and written with domain depth—no automated filler content.',
  },
  {
    id: 'conversion-ux',
    label: 'Conversion Design',
    headline: 'Hypothesis-driven landing systems built for clarity',
    summary:
      'We inspect session recordings, scroll drop-off, and form abandonment to systematically remove friction between the ad promise and the action.',
    primaryMetricLabel: 'Primary unit: Visitor-to-qualified-inquiry rate',
    rows: [
      {
        code: 'CNV-01',
        workstream: 'Above-the-Fold Value Audit',
        artifact: 'Headline clarity, visual proof pairing, single primary CTA',
        cadence: 'Sprint Week 1',
      },
      {
        code: 'CNV-02',
        workstream: 'Interactive Qualification Tools',
        artifact: 'Scope estimators and pricing logic embedded inline',
        cadence: 'Sprint Week 2–3',
      },
      {
        code: 'CNV-03',
        workstream: 'Form & Routing Friction Check',
        artifact: 'Field reduction, inline validation, calendar handoff',
        cadence: 'Continuous',
      },
      {
        code: 'CNV-04',
        workstream: 'Experiment Log & Archive',
        artifact: 'Documented hypothesis, sample size, and decision outcome',
        cadence: 'Bi-weekly review',
      },
    ],
    governanceNote: 'Every design change ships with tracked events and a documented test hypothesis.',
  },
  {
    id: 'attribution',
    label: 'Attribution & Data',
    headline: 'Server-side telemetry reconciled against CRM reality',
    summary:
      'Browser privacy rules break standard pixel setups. We connect server-side tagging directly to your CRM stages so marketing optimizes for closed business, not cheap clicks.',
    primaryMetricLabel: 'Primary unit: Verified CRM opportunity alignment',
    rows: [
      {
        code: 'DAT-01',
        workstream: 'Server-Side Tag Container',
        artifact: 'First-party domain collection + deduplicated CAPI events',
        cadence: 'Week 1–2 setup',
      },
      {
        code: 'DAT-02',
        workstream: 'UTM & Taxonomy Registry',
        artifact: 'Enforced campaign, adset, and creative naming schema',
        cadence: 'Enforced always',
      },
      {
        code: 'DAT-03',
        workstream: 'Offline Conversion Import',
        artifact: 'CRM qualified stage feedback pushed back to ad platforms',
        cadence: 'Automated daily',
      },
      {
        code: 'DAT-04',
        workstream: 'Weekly Operating Ledger',
        artifact: 'Spend, CAC, and pipeline stage summary in one clean view',
        cadence: 'Every Monday',
      },
    ],
    governanceNote: 'Zero black-box spreadsheets—every formula and raw data source is open to your team.',
  },
];

export const AUDIT_DOMAINS: AuditDomain[] = [
  {
    id: 'tracking',
    label: 'Tracking & Analytics',
    summary: 'Verifying that every conversion event fires once, carries clean source data, and reconciles with CRM records.',
    checks: [
      {
        id: 'trk-1',
        title: 'Event deduplication across client and server',
        detail: 'Confirm browser pixels and server-side Conversion APIs share matching event IDs so leads are never double-counted.',
        artifact: 'Tag Manager container export & event ID mapping sheet',
      },
      {
        id: 'trk-2',
        title: 'Cross-domain session persistence',
        detail: 'Ensure UTM parameters and click IDs survive redirects from marketing site to booking embeds or checkout subdomains.',
        artifact: 'Linker domain configuration & live network payload trace',
      },
      {
        id: 'trk-3',
        title: 'CRM hidden-field capture',
        detail: 'Audit lead forms to confirm first-touch and last-touch attribution fields populate reliably inside HubSpot or Salesforce.',
        artifact: 'Test lead trace from click through CRM record creation',
      },
      {
        id: 'trk-4',
        title: 'Consent mode & regional compliance',
        detail: 'Verify analytics and ad tags respect user consent state cleanly without breaking baseline aggregate reporting.',
        artifact: 'CMP signal audit & consent state verification log',
      },
    ],
  },
  {
    id: 'paid',
    label: 'Paid Media Hygiene',
    summary: 'Eliminating wasted ad spend caused by broad-match drift, overlapping audiences, and stale creative.',
    checks: [
      {
        id: 'paid-1',
        title: 'Search term vs. keyword drift analysis',
        detail: 'Inspect actual search queries triggering spend to isolate irrelevant broad-match bleed and build structured exclusion lists.',
        artifact: '90-day search query audit & shared negative keyword library',
      },
      {
        id: 'paid-2',
        title: 'Campaign consolidation & learning thresholds',
        detail: 'Merge fragmented ad sets that starve platform algorithms of conversion volume into clean, signal-rich structures.',
        artifact: 'Proposed account hierarchy diagram',
      },
      {
        id: 'paid-3',
        title: 'Landing page message-match review',
        detail: 'Check that every active ad headline aligns directly with the above-the-fold promise on its destination URL.',
        artifact: 'Ad-to-URL alignment matrix',
      },
      {
        id: 'paid-4',
        title: 'Placement & network exclusions',
        detail: 'Audit display expansion, audience networks, and low-intent placements that inflate click counts without pipeline impact.',
        artifact: 'Placement performance breakdown & exclusion rules',
      },
    ],
  },
  {
    id: 'seo',
    label: 'Technical SEO',
    summary: 'Ensuring search engines crawl, index, and understand your highest-value commercial pages without friction.',
    checks: [
      {
        id: 'seo-1',
        title: 'Index bloat and orphan URL cleanup',
        detail: 'Compare XML sitemaps against indexed URLs in Search Console to remove thin tag pages, duplicates, or staging leaks.',
        artifact: 'Full crawl export & indexation action plan',
      },
      {
        id: 'seo-2',
        title: 'Canonical and redirect chain repair',
        detail: 'Flatten multi-hop 301 chains and fix conflicting self-referencing canonicals across localized or parameterized URLs.',
        artifact: 'Redirect map & canonical verification list',
      },
      {
        id: 'seo-3',
        title: 'Commercial intent gap mapping',
        detail: 'Identify high-intent category, comparison, and integration queries where your site currently lacks dedicated pages.',
        artifact: 'Prioritized URL blueprint & content brief schedule',
      },
      {
        id: 'seo-4',
        title: 'Core Web Vitals & semantic heading order',
        detail: 'Audit LCP, CLS, and single-H1 semantic hierarchy across core acquisition templates.',
        artifact: 'Template-level performance & HTML structure checklist',
      },
    ],
  },
  {
    id: 'ux',
    label: 'Landing Page UX',
    summary: 'Removing cognitive friction and clarifying offer structure so qualified visitors convert with confidence.',
    checks: [
      {
        id: 'ux-1',
        title: 'Five-second value proposition clarity',
        detail: 'Evaluate whether a cold visitor immediately understands what you sell, who it serves, and what happens after clicking the CTA.',
        artifact: 'Annotated above-the-fold teardown',
      },
      {
        id: 'ux-2',
        title: 'Form field friction & error recovery',
        detail: 'Remove unnecessary required fields, clarify optional inputs, and ensure inline validation errors explain how to fix issues.',
        artifact: 'Revised form specification & field drop-off baseline',
      },
      {
        id: 'ux-3',
        title: 'Claim-to-evidence adjacency',
        detail: 'Ensure concrete product previews, specifications, or operational details sit immediately beside key claims rather than buried below.',
        artifact: 'Section hierarchy wireframe',
      },
      {
        id: 'ux-4',
        title: 'Mobile viewport usability check',
        detail: 'Test tap targets, sticky bar height, table legibility, and form keyboards on 375px mobile viewports.',
        artifact: 'Mobile viewport QA checklist',
      },
    ],
  },
];

export const OPERATING_BOUNDARIES = [
  {
    aspect: 'Account Ownership',
    klidoStandard: 'All ad accounts, tag containers, analytics properties, and domains stay 100% under your legal entity.',
    industryHabit: 'Agencies holding ad accounts or tracking pixels inside proprietary agency-owned containers.',
  },
  {
    aspect: 'Reporting Focus',
    klidoStandard: 'Weekly plain-English operating memos focused on qualified pipeline, unit cost, and next week’s tests.',
    industryHabit: 'Automated 40-page PDF decks filled with impressions, reach, and vanity engagement rates.',
  },
  {
    aspect: 'Contract Terms',
    klidoStandard: 'Clear 90-day foundation sprints or rolling monthly retainers with 30-day notice.',
    industryHabit: '12-month locked contracts designed around agency retention rather than performance.',
  },
  {
    aspect: 'Senior Involvement',
    klidoStandard: 'The strategists and designers scoping your system on Day 1 are the exact team executing weekly.',
    industryHabit: 'Senior partners pitching the account before handing daily work to junior coordinators.',
  },
];

export interface ClientBrand {
  index: string;
  name: string;
  scopes: string[];
  filterKeys: ('ops' | 'social' | 'influencer')[];
  description: string;
}

export const CLIENT_BRANDS: ClientBrand[] = [
  {
    index: '01.',
    name: 'HashiBusiness',
    scopes: ['Business ops'],
    filterKeys: ['ops'],
    description:
      'Helping businesses streamline their operations with smarter business solutions, efficient workflows, and a focus on sustainable growth.',
  },
  {
    index: '02.',
    name: 'Saanjh by Riya',
    scopes: ['Social', 'Ops', 'Influencer'],
    filterKeys: ['social', 'ops', 'influencer'],
    description:
      'A creative candle brand bringing warmth and elegance to everyday spaces through thoughtfully crafted candles and meaningful gifting experiences.',
  },
  {
    index: '03.',
    name: 'Zegore',
    scopes: ['Influencer', 'Social'],
    filterKeys: ['influencer', 'social'],
    description:
      'Building a distinctive brand presence through strategic digital solutions, creative positioning, and a focus on connecting with the right audience.',
  },
];

export const STUDIO_IMAGES = {
  logo: klidoLogoImg,
  hero: klidodeskImg,
  strategyDesk: klidodeskImg,
  studioInterior: klidodeskImg,
  brandDesk: klidodeskImg,
  brandHashi: hashiImg,
  brandSaanjh: saanjhImg,
  brandZegore: zegoreImg,
};

