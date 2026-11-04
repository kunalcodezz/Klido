export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  segment: string;
  badge: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  deliverables: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 'hashi',
    name: 'HASHI',
    category: 'Business Operations & Inventory Architecture',
    segment: 'Home & Living',
    badge: 'Operations Case',
    description: 'Taking a home business with 100+ SKUs to an online brand through process optimisation, costing and SOPs. Streamlined inventory, supplier logistics, and warehouse packing standards.',
    imageSrc: '/src/assets/images/hashi_ceramics_home_1793541111377.jpg',
    imageAlt: 'Hashi artisanal tableware and stoneware ceramics',
    deliverables: ['P&L Modeling', 'Fulfillment SOPs', 'SKU Unit Costing', 'Supplier Logistics']
  },
  {
    id: 'saanjh',
    name: 'SAANJH BY RIYA',
    category: 'Social Media, Operations & Influencer Marketing',
    segment: 'Luxury Apparel & Decor',
    badge: 'Full-Funnel Launch',
    description: 'Handcrafted luxury candles and decor from Pune. We manage social media, end-to-end business operations and influencer marketing, establishing consistent brand identity and customer loyalty.',
    imageSrc: '/src/assets/images/saanjh_luxury_candles_1793541111495.jpg',
    imageAlt: 'Saanjh by Riya handcrafted luxury candle and brass decor',
    deliverables: ['Creator Seeding', 'Brand Identity', 'Operations & Logistics', 'Packaging SOPs']
  },
  {
    id: 'zegore',
    name: 'ZEGORE',
    category: 'Influencer Marketing & Social Media',
    segment: 'Accessories',
    badge: 'Viral Seeding',
    description: 'Influencer campaigns and social media marketing for the brand. Connected with targeted male lifestyle creators to drive authentic brand adoption for luxury modern leather accessories.',
    imageSrc: '/src/assets/images/zegore_leather_accessories_1793541111684.jpg',
    imageAlt: 'Zegore luxury leather watch and handcrafted wallet',
    deliverables: ['Barter Creator Network', 'Product Placements', 'Creative Briefs', 'Social Content Grid']
  }
];
