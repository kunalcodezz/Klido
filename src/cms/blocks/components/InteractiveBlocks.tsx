import React from 'react';
import { ContactSection, ScopePlanner, CampaignMap, InteractiveGlobe } from './InteractiveWidgets';
import type { CmsBlock } from '../../schemas/blocks';

export function ContactFormBlock({ block }: { block: CmsBlock }) {
  return <ContactSection id={block.props?.id || 'start-project'} />;
}

export function ScopePlannerBlock({ block }: { block: CmsBlock }) {
  return (
    <section className="border-t border-[#E5E9F2] bg-[#F7F9FE] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <ScopePlanner />
      </div>
    </section>
  );
}

export function CampaignMapBlock({ block }: { block: CmsBlock }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <CampaignMap />
    </div>
  );
}

export function InteractiveGlobeBlock({ block }: { block: CmsBlock }) {
  return (
    <div className="mx-auto max-w-[420px] aspect-square">
      <InteractiveGlobe />
    </div>
  );
}
