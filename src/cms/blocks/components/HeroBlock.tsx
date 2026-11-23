import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CampaignMap } from './InteractiveWidgets';
import { RichTextRenderer } from '../RichTextRenderer';
import type { CmsBlock } from '../../schemas/blocks';

export function HeroBlock({ block }: { block: CmsBlock }) {
  const props = (block.props || {}) as Record<string, any>;
  const eyebrow = String(props.eyebrow || 'Independent digital marketing studio');
  const headlinePrefix = String(props.headlinePrefix || 'Marketing that gives people a reason to ');
  const headlineAccent = String(props.headlineAccent || 'choose you');
  const primaryCta = (props.primaryCta || {
    label: "Tell us what you're building",
    href: '#contact',
  }) as { label?: string; href?: string };
  const secondaryCta = (props.secondaryCta || {
    label: 'See how we work',
    href: '#approach',
  }) as { label?: string; href?: string };
  const isMapVariant = props.variant === 'home-map' || !props.imageUrl;

  return (
    <section className="relative overflow-hidden border-b border-[#E5E9F2] bg-gradient-to-b from-[#FFFFFF] via-[#F9FAFE] to-[#F4F6FC]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-[42%] bg-gradient-to-bl from-[#C2F81A]/60 via-[#C2F81A]/20 to-transparent blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-[44%] bg-gradient-to-tr from-[#123FFF]/55 via-[#123FFF]/18 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#4A5268]">
              <span
                className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
                aria-hidden="true"
              />
              <span>{eyebrow}</span>
            </div>

            <h1 className="font-display mt-5 text-balance text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-[#0D1126] sm:text-5xl lg:text-[3.5rem]">
              {headlinePrefix}
              <span className="relative inline-block text-[#123FFF]">
                <span>{headlineAccent}</span>
                {props.showLimeUnderline !== false && (
                  <svg
                    className="pointer-events-none absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 240 12"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8.5C68 3.5 162 2.5 238 6.5"
                      stroke="#C2F81A"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
            </h1>

            <div className="mt-6 max-w-lg text-base leading-relaxed text-[#4A5268] sm:text-lg">
              {props.description ? (
                <RichTextRenderer doc={props.description} />
              ) : (
                <p>
                  Klido turns a strong offer into clear positioning, considered campaigns, and a practical system for growth.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {primaryCta?.href?.startsWith('#') ? (
                <a
                  href={primaryCta.href}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#123FFF] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC]"
                >
                  <span>{primaryCta.label || "Tell us what you're building"}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  to={primaryCta?.href || '/contact'}
                  className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#123FFF] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC]"
                >
                  <span>{primaryCta?.label || "Tell us what you're building"}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              )}

              {secondaryCta && (
                <Link
                  to={secondaryCta.href || '/approach'}
                  className="group inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[#0D1126] transition-colors duration-150 hover:text-[#123FFF]"
                >
                  <span>{secondaryCta.label || 'See how we work'}</span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-6">
            {isMapVariant ? (
              <CampaignMap />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#E5E9F2] shadow-lg">
                <img
                  src={String(props.imageUrl || '')}
                  alt={String(props.imageAlt || '')}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
