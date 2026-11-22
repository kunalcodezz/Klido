import React from 'react';
import { Footer } from '../../../components/Footer';
import type { CmsBlock } from '../../schemas/blocks';

export function ContainerBlock({ block, children }: { block: CmsBlock; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export function FooterBlock({ block }: { block: CmsBlock }) {
  // Suppress duplicate footer if main layout renders global Footer
  return null;
}

export function GridBlock({ block, children }: { block: CmsBlock; children?: React.ReactNode }) {
  const columns = block.props?.columns || 2;
  return (
    <div className={`grid gap-6 md:grid-cols-${columns}`}>
      {children}
    </div>
  );
}
