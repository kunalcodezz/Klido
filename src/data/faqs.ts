export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'marketing' | 'operations' | 'general';
}

export const faqsData: FAQItem[] = [
  {
    id: 'faq-ad-budget',
    question: 'How does the Meta Ads pricing work for different ad spend budgets?',
    answer: 'For brands spending under ₹1 Lakh in monthly ad spend, our agency management fee is fixed at ₹7,000/month. For brands spending above ₹1 Lakh, our fee is 10% of the total monthly ad budget. Note that your ad spend is paid directly by your brand to Meta—we never mark up media spend.',
    category: 'pricing'
  },
  {
    id: 'faq-influencer-barter',
    question: 'What is included in the Influencer Marketing package?',
    answer: 'The ₹6,000/month package covers complete campaign management and includes 10 barter creator collaboration placements per month (creator vetting, outreach, briefs, delivery tracking, and performance reporting). If you choose to hire paid creators or celebrity talent, their creator fees are paid directly and separately.',
    category: 'marketing'
  },
  {
    id: 'faq-operations-scope',
    question: 'What specific operational systems do you build for e-commerce brands?',
    answer: 'We map every SKU down to its Bill of Materials (BOM), landed cost, payment gateway fees, and packaging expenses to build your true Master P&L. We then create written Standard Operating Procedures (SOPs) for inventory intake, order packing, dispatch SLAs, and RTO return inspection so fulfillment runs without owner micromanagement.',
    category: 'operations'
  },
  {
    id: 'faq-contract-terms',
    question: 'Are there any long-term lock-in contracts?',
    answer: 'No. All services and combo packages are billed monthly in advance with zero lock-in contracts. We agree on the deliverables and scope in writing each month, allowing you to scale or adjust services as your seasonal cashflow demands.',
    category: 'pricing'
  },
  {
    id: 'faq-onboarding-speed',
    question: 'How quickly do we start after the initial discovery call?',
    answer: 'We begin within 72 hours of signing the scope. Day 1 is access and tracking setup, Day 2 is ad account structure and creator pipeline initiation, and Day 3 is operational audit commencement. You receive a dedicated tracker from week one.',
    category: 'general'
  },
  {
    id: 'faq-bundle-discount',
    question: 'Can I combine multiple services for bundled pricing?',
    answer: 'Yes! We offer curated bundles: Social Media + Influencer at ₹9,000/mo (save ₹2,000), Meta Ads + Influencer at ₹11,000/mo (save ₹2,000), Marketing Growth Stack at ₹15,000/mo (save ₹3,000), or our Complete Business Growth & Operations partnership at ₹25,000/mo covering all 4 core pillars.',
    category: 'pricing'
  }
];
