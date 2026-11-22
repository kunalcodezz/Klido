import React from 'react';
import type { CmsBlock } from '../schemas/blocks';
import { getBlockComponent } from './registry';
import { compileBlockStyles, compileBlockClassNames } from './styleCompiler';

export function BlockResolver({ block }: { block: CmsBlock }) {
  if (!block || block.visible === false) return null;

  const Component = getBlockComponent(block.type);
  if (!Component) {
    console.warn(`[CMS] Unknown block type: "${block.type}"`);
    return null;
  }

  const styles = compileBlockStyles(block.styles);
  const className = compileBlockClassNames(block.styles, block.animations, block.responsive);

  return (
    <div style={styles} className={className || undefined} id={block.id}>
      <Component block={block} />
    </div>
  );
}
