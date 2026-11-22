import { z } from 'zod';
import { PageTreeSchema } from '../schemas/blocks';
import { DesignTokensSchema, SeoGlobalSchema, FooterConfigSchema } from '../schemas/validation';

export function validatePageTree(data: unknown) {
  const result = PageTreeSchema.safeParse(data);
  if (!result.success) {
    console.warn('[CMS] Invalid page tree structure, falling back to default:', result.error);
    return { version: 1, sections: [] };
  }
  return result.data;
}

export function validateDesignTokens(data: unknown) {
  const result = DesignTokensSchema.safeParse(data);
  if (!result.success) {
    return DesignTokensSchema.parse({});
  }
  return result.data;
}

export function validateSeoGlobal(data: unknown) {
  const result = SeoGlobalSchema.safeParse(data);
  if (!result.success) {
    return SeoGlobalSchema.parse({});
  }
  return result.data;
}

export function validateFooterConfig(data: unknown) {
  const result = FooterConfigSchema.safeParse(data);
  if (!result.success) {
    return FooterConfigSchema.parse({});
  }
  return result.data;
}
