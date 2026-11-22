import { z } from 'zod';
import { PageTreeSchema } from './blocks';

export const DesignTokensSchema = z.object({
  colors: z.object({
    primary: z.string().default('#123FFF'),
    primaryHover: z.string().default('#0D31CC'),
    accent: z.string().default('#C2F81A'),
    secondary: z.string().default('#0D1126'),
    text: z.string().default('#0D1126'),
    mutedText: z.string().default('#4A5268'),
    background: z.string().default('#FFFFFF'),
    surface: z.string().default('#F7F9FE'),
    border: z.string().default('#E5E9F2'),
  }).default({
    primary: '#123FFF',
    primaryHover: '#0D31CC',
    accent: '#C2F81A',
    secondary: '#0D1126',
    text: '#0D1126',
    mutedText: '#4A5268',
    background: '#FFFFFF',
    surface: '#F7F9FE',
    border: '#E5E9F2',
  }),
  layout: z.object({
    containerMaxWidthPx: z.number().default(1200),
    sectionSpacingPx: z.number().default(80),
    gridGapPx: z.number().default(24),
    globalRadiusPx: z.number().default(16),
  }).default({
    containerMaxWidthPx: 1200,
    sectionSpacingPx: 80,
    gridGapPx: 24,
    globalRadiusPx: 16,
  }),
  typography: z.object({
    headingFont: z.string().default('Plus Jakarta Sans'),
    bodyFont: z.string().default('DM Sans'),
    monoFont: z.string().default('JetBrains Mono'),
    baseSizePx: z.number().default(16),
    headingLineHeight: z.number().default(1.1),
    bodyLineHeight: z.number().default(1.6),
    headingWeight: z.number().default(700),
    bodyWeight: z.number().default(400),
  }).default({
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'DM Sans',
    monoFont: 'JetBrains Mono',
    baseSizePx: 16,
    headingLineHeight: 1.1,
    bodyLineHeight: 1.6,
    headingWeight: 700,
    bodyWeight: 400,
  }),
  buttons: z.object({
    radiusPx: z.number().default(8),
    paddingX: z.number().default(24),
    paddingY: z.number().default(12),
  }).default({
    radiusPx: 8,
    paddingX: 24,
    paddingY: 12,
  }),
});

export const SeoGlobalSchema = z.object({
  siteName: z.string().default('Klido'),
  siteUrl: z.string().default('https://www.klido.in'),
  defaultTitle: z.string().default('Klido'),
  defaultMetaDescription: z.string().default(''),
  defaultOgImage: z.string().default('/klido_Logo.png'),
  faviconUrl: z.string().default('/favicon-48x48.png'),
  robotsTxt: z.string().default('User-agent: *\nAllow: /'),
});

export const FooterConfigSchema = z.object({
  description: z.string().default(''),
  email: z.string().default('klidoagency@gmail.com'),
  phone: z.string().default('+91 9172569021'),
  hours: z.string().default('Mon–Fri, 09:00–18:00'),
  location: z.string().default('Remote Worldwide'),
  tagline: z.string().default(''),
  instagramUrl: z.string().default('https://www.instagram.com/klidoagency'),
  instagramHandle: z.string().default('@klidoagency'),
  copyrightText: z.string().default('Klido. All rights reserved.'),
});

export type DesignTokens = z.infer<typeof DesignTokensSchema>;
export type SeoGlobal = z.infer<typeof SeoGlobalSchema>;
export type FooterConfig = z.infer<typeof FooterConfigSchema>;
export { PageTreeSchema };
