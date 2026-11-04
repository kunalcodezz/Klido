export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  headline: string;
  description: string;
  deliverables: string[];
  startingPrice: number;
  priceNote?: string;
  badge?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'meta-ads',
    number: '01',
    name: 'Meta Ads',
    headline: 'High-Return Paid Acquisition',
    description: 'Build profitable advertising campaigns with strategic account setup, campaign structure, creatives and continuous optimisation.',
    deliverables: [
      'Account setup & tracking architecture',
      'Full campaign funnel structure',
      'High-converting ad creatives & hooks',
      'Weekly algorithmic optimisation',
      'Transparent weekly P&L & ROAS reporting'
    ],
    startingPrice: 7000,
    priceNote: 'Starting at ₹7,000/mo (Under ₹1L ad spend; 10% above ₹1L)'
  },
  {
    id: 'influencer-marketing',
    number: '02',
    name: 'Influencer Marketing',
    headline: 'Authentic Creator Advocacy',
    description: 'Connect with relevant creators and manage influencer campaigns from discovery to final deliverables.',
    deliverables: [
      'Niche creator discovery & audience vetting',
      'Outreach & barter negotiations',
      'Visual briefs & brand guidelines',
      '10 Barter creator placements per month',
      'Deliverable tracking & usage logging'
    ],
    startingPrice: 6000,
    priceNote: '₹6,000/mo includes 10 barter videos (Paid creator fees separate)'
  },
  {
    id: 'social-media',
    number: '03',
    name: 'Social Media',
    headline: 'Cohesive Brand Narrative',
    description: 'Build a consistent brand presence through planned content and social media communication.',
    deliverables: [
      'Strategic monthly content calendar',
      'Regular feed posts & aesthetic curation',
      'High-converting Instagram stories',
      'Brand communication & engagement tone',
      'Bio, link-in-bio & profile architecture'
    ],
    startingPrice: 5000,
    priceNote: '₹5,000/mo for regular feed & story execution'
  },
  {
    id: 'business-operations',
    number: '04',
    name: 'Business Operations',
    headline: 'Scalable Systems & Margin Defense',
    description: 'Build the operational foundation that transforms a home business into a scalable online brand.',
    deliverables: [
      'Granular SKU unit economics & true landed margins',
      'Costing & master P&L modeling',
      'Standard Operating Procedures (SOPs)',
      'Stock, inventory & reorder threshold rules',
      'Returns & RTO reduction workflows'
    ],
    startingPrice: 7000,
    priceNote: '₹7,000/mo for full operations & unit economics framework',
    badge: 'Operational Anchor'
  }
];
