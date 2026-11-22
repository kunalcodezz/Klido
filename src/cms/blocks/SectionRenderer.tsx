import React from 'react';
import type { CmsSection } from '../schemas/blocks';
import { BlockResolver } from './BlockResolver';

export function SectionRenderer({ section }: { section: CmsSection }) {
  if (!section || section.visible === false) return null;
  return <BlockResolver block={section} />;
}
