import React from 'react';
import type { PageTree } from '../schemas/blocks';
import { SectionRenderer } from './SectionRenderer';

export function PageRenderer({ tree }: { tree: PageTree }) {
  if (!tree || !tree.sections || tree.sections.length === 0) {
    return null;
  }

  return (
    <div className="cms-page-root">
      {tree.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
