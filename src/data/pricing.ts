export interface PricingServiceOption {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  highlight?: string;
}

export interface PricingBundle {
  id: string;
  name: string;
  tagline: string;
  serviceIds: string[];
  bundlePrice: number;
  originalPrice: number;
  savings: number;
  recommended?: boolean;
  features: string[];
}

export const PRICING_SERVICES: PricingServiceOption[] = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    subtitle: 'Strategic campaigns, weekly optimisation & reporting',
    price: 7000,
    highlight: '₹7,000 / mo'
  },
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing',
    subtitle: '10 Barter video collaborations per month + outreach',
    price: 6000,
    highlight: '₹6,000 / mo'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    subtitle: 'Consistent brand presence, content calendar & stories',
    price: 5000,
    highlight: '₹5,000 / mo'
  },
  {
    id: 'business-operations',
    name: 'Business Operations',
    subtitle: 'Unit economics, costing, P&L, SOPs & stock workflows',
    price: 7000,
    highlight: '₹7,000 / mo'
  }
];

export const PRICING_BUNDLES: PricingBundle[] = [
  {
    id: 'bundle-social-influencer',
    name: 'Social Media + Influencer',
    tagline: 'Organic brand proof & creator velocity',
    serviceIds: ['social-media', 'influencer-marketing'],
    bundlePrice: 9000,
    originalPrice: 11000,
    savings: 2000,
    features: [
      'Complete content grid & stories',
      '10 Barter creator placements monthly',
      'Unified aesthetic & creator briefs',
      'Deliverable management & reporting'
    ]
  },
  {
    id: 'bundle-ads-influencer',
    name: 'Meta Ads + Influencer',
    tagline: 'Direct customer acquisition engine',
    serviceIds: ['meta-ads', 'influencer-marketing'],
    bundlePrice: 11000,
    originalPrice: 13000,
    savings: 2000,
    features: [
      'High-converting ad account structure',
      '10 Barter creators feeding ad creative',
      'Whitelisted creator assets for ads',
      'Weekly performance & ROAS audit'
    ]
  },
  {
    id: 'bundle-growth-stack',
    name: 'Meta Ads + Influencer + Social Media',
    tagline: 'Total marketing command stack',
    serviceIds: ['meta-ads', 'influencer-marketing', 'social-media'],
    bundlePrice: 15000,
    originalPrice: 18000,
    savings: 3000,
    recommended: false,
    features: [
      'Omnichannel marketing synchronisation',
      'Creative pipeline from creators to ads',
      'Social proof compounding across channels',
      'Dedicated marketing sprint meetings'
    ]
  },
  {
    id: 'bundle-complete-partnership',
    name: 'Complete Business Growth & Operations',
    tagline: 'All 4 Services: Marketing + Operations & P&L Guardrails',
    serviceIds: ['meta-ads', 'influencer-marketing', 'social-media', 'business-operations'],
    bundlePrice: 25000,
    originalPrice: 25000,
    savings: 0,
    recommended: true,
    features: [
      'End-to-end e-commerce management',
      'Customer acquisition (Ads + Creators + Social)',
      'Operational guardrails (Unit economics + SOPs)',
      'Master P&L modeling & landed cost audits',
      'Priority leadership slack & weekly check-ins'
    ]
  }
];

export const HOW_WE_START_STEPS = [
  {
    step: 1,
    title: 'Intro call',
    desc: 'We learn about your brand, your numbers and what you want to fix.'
  },
  {
    step: 2,
    title: '30-day start',
    desc: 'We agree the scope in writing and begin with the plan you picked.'
  },
  {
    step: 3,
    title: 'Monthly review',
    desc: "One report and one call each month on what worked and what's next."
  }
];

export const COMMERCIAL_TERMS = [
  {
    title: 'Meta Ads Budget Rule',
    desc: '₹7,000/month for accounts spending under ₹1 Lakh in monthly ad spend. Above ₹1 Lakh: 10% of total ad budget.'
  },
  {
    title: 'Influencer Barter vs Paid',
    desc: 'Package includes 10 barter creator coordination videos per month. Paid creator fees (if any) are direct and separate.'
  },
  {
    title: 'Direct Platform Spend',
    desc: "Ad spend is paid directly by your brand to Meta. Agency fee covers strategy, execution, creative, and optimisation."
  },
  {
    title: 'Billing Cycle',
    desc: 'Billed monthly in advance with zero long-term lock-in contracts. Transparent scope agreed in writing.'
  }
];

export const AGENCY_CONTACT = {
  email: 'info@klidio.com',
  instagram: '@klidioagency',
  instagramUrl: 'https://instagram.com/klidioagency',
  phone: '9172569021',
  phoneDisplay: '+91 91725 69021',
  whatsappMessageBase: 'Hi Klido team, I would like to explore your growth & operations plan for my brand.',
  hubs: 'Bengaluru · Mumbai (Serving brands across India)'
};
