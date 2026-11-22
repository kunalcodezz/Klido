import React from 'react';
import type { CmsBlock } from '../schemas/blocks';
import { HeroBlock } from './components/HeroBlock';
import { TextBlock, HeadingBlock, ImageBlock } from './components/PrimitiveBlocks';
import {
  BrandsCollectionBlock,
  ServicesCollectionBlock,
  StudioCollectionBlock,
  HowWeWorkCollectionBlock,
  FaqCollectionBlock,
} from './components/CollectionBlocks';
import {
  ContactFormBlock,
  ScopePlannerBlock,
  CampaignMapBlock,
  InteractiveGlobeBlock,
} from './components/InteractiveBlocks';
import { FooterBlock, ContainerBlock } from './components/LayoutBlocks';

export const blockRegistry: Record<string, React.ComponentType<{ block: CmsBlock }>> = {
  hero: HeroBlock,
  'hero-block': HeroBlock,
  text: TextBlock,
  heading: HeadingBlock,
  image: ImageBlock,
  brands: BrandsCollectionBlock,
  'brands-section': BrandsCollectionBlock,
  'services-grid': ServicesCollectionBlock,
  pricing: ServicesCollectionBlock,
  'senior-studio': StudioCollectionBlock,
  studio: StudioCollectionBlock,
  statistics: HowWeWorkCollectionBlock,
  'how-we-work': HowWeWorkCollectionBlock,
  faq: FaqCollectionBlock,
  contact: ContactFormBlock,
  'contact-form': ContactFormBlock,
  'scope-planner': ScopePlannerBlock,
  'campaign-map': CampaignMapBlock,
  globe: InteractiveGlobeBlock,
  footer: FooterBlock,
  container: ContainerBlock,
};

export function getBlockComponent(type: string) {
  return blockRegistry[type] || null;
}
