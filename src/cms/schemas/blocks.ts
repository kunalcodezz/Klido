import { z } from 'zod';
import { BlockStylesSchema, BlockAnimationsSchema, BlockResponsiveSchema } from './styles';

export const CmsBlockSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  type: z.string(),
  props: z.record(z.string(), z.any()).default({}),
  styles: BlockStylesSchema.optional().default({}),
  animations: BlockAnimationsSchema.optional(),
  responsive: BlockResponsiveSchema.optional(),
  locked: z.boolean().optional().default(false),
  visible: z.boolean().optional().default(true),
});

export const CmsSectionSchema = CmsBlockSchema;

export const PageTreeSchema = z.object({
  version: z.number().default(1),
  sections: z.array(CmsSectionSchema).default([]),
});

export type CmsBlock = z.infer<typeof CmsBlockSchema>;
export type CmsSection = z.infer<typeof CmsSectionSchema>;
export type PageTree = z.infer<typeof PageTreeSchema>;
