import React from 'react';
import { BrandsSection, PricingSection, SeniorStudioSection, HowWeWorkSection, FAQSection } from './InteractiveWidgets';
import type { CmsBlock } from '../../schemas/blocks';

export function BrandsCollectionBlock({ block }: { block: CmsBlock }) {
  return <BrandsSection />;
}

export function ServicesCollectionBlock({ block }: { block: CmsBlock }) {
  return <PricingSection />;
}

export function StudioCollectionBlock({ block }: { block: CmsBlock }) {
  return <SeniorStudioSection />;
}

export function HowWeWorkCollectionBlock({ block }: { block: CmsBlock }) {
  return <HowWeWorkSection />;
}

export function FaqCollectionBlock({ block }: { block: CmsBlock }) {
  return <FAQSection />;
}
