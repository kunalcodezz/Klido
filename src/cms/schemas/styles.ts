import { z } from 'zod';

export const BlockStylesSchema = z.object({
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  paddingTop: z.string().optional(),
  paddingBottom: z.string().optional(),
  marginTop: z.string().optional(),
  marginBottom: z.string().optional(),
  borderRadius: z.string().optional(),
  borderWidth: z.string().optional(),
  borderColor: z.string().optional(),
  customClassName: z.string().optional(),
}).default({});

export const BlockAnimationsSchema = z.object({
  preset: z.string().default('none'),
  delayMs: z.number().default(0),
  durationMs: z.number().default(250),
  trigger: z.string().default('on-scroll'),
  disableOnMobile: z.boolean().default(true),
}).default({
  preset: 'none',
  delayMs: 0,
  durationMs: 250,
  trigger: 'on-scroll',
  disableOnMobile: true,
});

export const BlockResponsiveSchema = z.object({
  hideOnMobile: z.boolean().optional(),
  hideOnTablet: z.boolean().optional(),
  hideOnDesktop: z.boolean().optional(),
}).default({});

export type BlockStyles = z.infer<typeof BlockStylesSchema>;
export type BlockAnimations = z.infer<typeof BlockAnimationsSchema>;
export type BlockResponsive = z.infer<typeof BlockResponsiveSchema>;
