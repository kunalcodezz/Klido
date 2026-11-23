import React from 'react';
import type { CmsBlock } from '../schemas/blocks';
import { getBlockComponent } from './registry';
import { compileBlockStyles, compileBlockClassNames } from './styleCompiler';

const TYPE_TO_ANCHOR_ID: Record<string, string> = {
  hero: 'home',
  'hero-block': 'home',
  'services-grid': 'services',
  pricing: 'services',
  statistics: 'approach',
  'how-we-work': 'approach',
  'senior-studio': 'about',
  studio: 'about',
  contact: 'contact',
  'contact-form': 'contact',
};

export function BlockResolver({ block }: { block: CmsBlock }) {
  if (!block || block.visible === false) return null;

  const Component = getBlockComponent(block.type);
  if (!Component) {
    console.warn(`[CMS] Unknown block type: "${block.type}"`);
    return null;
  }

  const styles = compileBlockStyles(block.styles);
  const className = compileBlockClassNames(block.styles, block.animations, block.responsive);
  const anchorId = TYPE_TO_ANCHOR_ID[block.type] || block.id;

  return (
    <div style={styles} className={`scroll-mt-24 ${className || ''}`} id={anchorId}>
      <Component block={block} />
    </div>
  );
}
