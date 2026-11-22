import { z } from 'zod';

export const TipTapNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    text: z.string().optional(),
    content: z.array(TipTapNodeSchema).optional(),
    attrs: z.record(z.string(), z.any()).optional(),
    marks: z
      .array(
        z.object({
          type: z.string(),
          attrs: z.record(z.string(), z.any()).optional(),
        })
      )
      .optional(),
  })
);

export const TipTapDocSchema = z.object({
  type: z.literal('doc').default('doc'),
  content: z.array(TipTapNodeSchema).optional().default([]),
});

export type TipTapDoc = z.infer<typeof TipTapDocSchema>;
export type TipTapNode = z.infer<typeof TipTapNodeSchema>;
