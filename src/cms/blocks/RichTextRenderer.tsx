import React from 'react';
import type { TipTapDoc, TipTapNode } from '../schemas/tiptap';

function renderNode(node: TipTapNode, index: number): React.ReactNode {
  if (!node) return null;

  if (node.type === 'text') {
    let content: React.ReactNode = node.text || '';
    if (node.marks) {
      node.marks.forEach((mark: any) => {
        if (mark.type === 'bold') {
          content = <strong key="b">{content}</strong>;
        } else if (mark.type === 'italic') {
          content = <em key="i">{content}</em>;
        } else if (mark.type === 'strike') {
          content = <s key="s">{content}</s>;
        } else if (mark.type === 'link' && mark.attrs?.href) {
          content = (
            <a
              key="a"
              href={mark.attrs.href}
              target={mark.attrs.target || '_self'}
              rel="noopener noreferrer"
              className="text-[#123FFF] underline hover:text-[#0D31CC]"
            >
              {content}
            </a>
          );
        }
      });
    }
    return <React.Fragment key={index}>{content}</React.Fragment>;
  }

  const children = node.content?.map((child: any, i: number) => renderNode(child, i));

  switch (node.type) {
    case 'doc':
      return <div key={index}>{children}</div>;
    case 'paragraph':
      return <p key={index} className="mb-2 last:mb-0">{children}</p>;
    case 'heading': {
      const level = Number(node.attrs?.level) || 2;
      if (level === 1) return <h1 key={index} className="font-display font-bold mt-4 mb-2 text-3xl">{children}</h1>;
      if (level === 3) return <h3 key={index} className="font-display font-bold mt-4 mb-2 text-xl">{children}</h3>;
      if (level === 4) return <h4 key={index} className="font-display font-bold mt-4 mb-2 text-lg">{children}</h4>;
      return <h2 key={index} className="font-display font-bold mt-4 mb-2 text-2xl">{children}</h2>;
    }
    case 'bulletList':
      return <ul key={index} className="list-disc pl-5 my-2 space-y-1">{children}</ul>;
    case 'orderedList':
      return <ol key={index} className="list-decimal pl-5 my-2 space-y-1">{children}</ol>;
    case 'listItem':
      return <li key={index}>{children}</li>;
    default:
      return <div key={index}>{children}</div>;
  }
}

export function RichTextRenderer({
  doc,
  className = '',
}: {
  doc?: TipTapDoc | string | null;
  className?: string;
}) {
  if (!doc) return null;
  if (typeof doc === 'string') {
    return <div className={className}>{doc}</div>;
  }
  return <div className={className}>{doc.content?.map((child: any, i: number) => renderNode(child, i))}</div>;
}
