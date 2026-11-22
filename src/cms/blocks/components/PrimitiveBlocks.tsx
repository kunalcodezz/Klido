import React from 'react';
import { RichTextRenderer } from '../RichTextRenderer';
import type { CmsBlock } from '../../schemas/blocks';

export function TextBlock({ block }: { block: CmsBlock }) {
  const props = (block.props || {}) as Record<string, any>;
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      <RichTextRenderer doc={props.content} />
    </div>
  );
}

export function HeadingBlock({ block }: { block: CmsBlock }) {
  const props = (block.props || {}) as Record<string, any>;
  const level = Number(props.level) || 2;
  const text = String(props.text || '');

  if (level === 1) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold tracking-tight text-[#0D1126] text-3xl sm:text-4xl">{text}</h1>
      </div>
    );
  }
  if (level === 3) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h3 className="font-display font-bold tracking-tight text-[#0D1126] text-xl sm:text-2xl">{text}</h3>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <h2 className="font-display font-bold tracking-tight text-[#0D1126] text-2xl sm:text-3xl">{text}</h2>
    </div>
  );
}

export function ImageBlock({ block }: { block: CmsBlock }) {
  const props = (block.props || {}) as Record<string, any>;
  return (
    <figure className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-[#E5E9F2]">
        <img
          src={String(props.url || '')}
          alt={String(props.alt || '')}
          className="w-full h-auto object-cover"
        />
      </div>
      {props.caption && (
        <figcaption className="mt-2 text-xs text-[#6B7388]">{String(props.caption)}</figcaption>
      )}
    </figure>
  );
}
