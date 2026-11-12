export interface BeforeAfterCategory {
  id: string;
  name: string;
  tagline: string;
  before: {
    label: string;
    sublabel: string;
    image: string;
  };
  after: {
    label: string;
    sublabel: string;
    image: string;
  };
}

export const BEFORE_AFTER_CATEGORIES: BeforeAfterCategory[] = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    tagline: 'High-Converting Ad Architecture',
    before: {
      label: 'BEFORE',
      sublabel: 'Poorly designed, unoptimized creative',
      image: '/HEROANIM/badmeta.png',
    },
    after: {
      label: 'AFTER',
      sublabel: 'Professionally designed, conversion-focused creative',
      image: '/HEROANIM/goodmeta.png',
    },
  },
  {
    id: 'social-media',
    name: 'Social Media',
    tagline: 'Cohesive Editorial Brand Architecture',
    before: {
      label: 'BEFORE',
      sublabel: 'Inconsistent feed & basic creatives',
      image: '/HEROANIM/Badsocialmedia.png',
    },
    after: {
      label: 'AFTER',
      sublabel: 'Consistent branding & premium creatives',
      image: '/HEROANIM/Goodsocialmedia.png',
    },
  },
  {
    id: 'operations',
    name: 'Business Operations',
    tagline: 'Granular Unit Economics & Margin Defense',
    before: {
      label: 'BEFORE',
      sublabel: 'Manual spreadsheets & disorganized workflows',
      image: '/HEROANIM/Badbusinessoperation.png',
    },
    after: {
      label: 'AFTER',
      sublabel: 'Structured workflows & centralized management',
      image: '/HEROANIM/goodbusinessoperation.png.png',
    },
  },
];
