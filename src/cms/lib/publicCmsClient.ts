import { supabase } from './supabase';
import {
  validateDesignTokens,
  validateSeoGlobal,
  validateFooterConfig,
  validatePageTree,
} from './schemaValidator';
import type { PageTree } from '../schemas/blocks';
import type { DesignTokens, SeoGlobal, FooterConfig } from '../schemas/validation';

export interface PublicSiteBundle {
  designTokens: DesignTokens;
  seoGlobal: SeoGlobal;
  footerConfig: FooterConfig;
  navigation: {
    header: any[];
    footerPractice: any[];
    footerEngage: any[];
    footerLegal: any[];
  };
  redirects: Array<{ source_path: string; destination_path: string; status_code: number }>;
  collections: {
    services: any[];
    brands: any[];
    projects: any[];
    testimonials: any[];
  };
}

export interface PublishedPagePayload {
  page: {
    id: string;
    slug: string;
    title: string;
    page_type: string;
    seo_title: string;
    seo_description: string;
    og_image_url: string;
    canonical_url: string;
    no_index: boolean;
  };
  tree: PageTree;
}

export async function fetchPublicSiteBundle(): Promise<PublicSiteBundle> {
  try {
    const [settingsRes, navRes, redirectsRes, servicesRes, brandsRes, projectsRes, testimonialsRes] =
      await Promise.all([
        supabase.from('site_settings').select('*'),
        supabase.from('navigation_items').select('*').eq('is_visible', true).order('display_order'),
        supabase.from('redirects').select('*').eq('is_active', true),
        supabase.from('services').select('*').eq('is_visible', true).order('display_order'),
        supabase.from('brands').select('*').eq('is_visible', true).order('display_order'),
        supabase.from('projects').select('*').eq('is_visible', true).order('display_order'),
        supabase.from('testimonials').select('*').eq('is_visible', true).order('display_order'),
      ]);

    const settingsMap = new Map<string, any>();
    if (settingsRes.data) {
      (settingsRes.data as any[]).forEach((s) => settingsMap.set(s.setting_key, s.setting_value));
    }

    const designTokens = validateDesignTokens(settingsMap.get('design_system'));
    const seoGlobal = validateSeoGlobal(settingsMap.get('seo_global'));
    const footerConfig = validateFooterConfig(settingsMap.get('footer_config'));

    const allNav = (navRes.data as any[]) || [];
    const navigation = {
      header: allNav.filter((n) => n.location === 'header'),
      footerPractice: allNav.filter((n) => n.location === 'footer_practice'),
      footerEngage: allNav.filter((n) => n.location === 'footer_engage'),
      footerLegal: allNav.filter((n) => n.location === 'footer_legal'),
    };

    return {
      designTokens,
      seoGlobal,
      footerConfig,
      navigation,
      redirects: (redirectsRes.data as any[]) || [],
      collections: {
        services: (servicesRes.data as any[]) || [],
        brands: (brandsRes.data as any[]) || [],
        projects: (projectsRes.data as any[]) || [],
        testimonials: (testimonialsRes.data as any[]) || [],
      },
    };
  } catch (error) {
    console.warn('[CMS] Failed to fetch public site bundle, falling back to local defaults:', error);
    return {
      designTokens: validateDesignTokens({}),
      seoGlobal: validateSeoGlobal({}),
      footerConfig: validateFooterConfig({}),
      navigation: { header: [], footerPractice: [], footerEngage: [], footerLegal: [] },
      redirects: [],
      collections: { services: [], brands: [], projects: [], testimonials: [] },
    };
  }
}

export async function fetchPublishedPageBySlug(
  slug: string,
  _seoGlobal?: SeoGlobal
): Promise<PublishedPagePayload | null> {
  try {
    const cleanSlug = slug === '' ? '/' : slug.startsWith('/') ? slug : `/${slug}`;

    const { data: pageData, error: pageErr } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', cleanSlug)
      .eq('status', 'published')
      .not('published_revision_id', 'is', null)
      .maybeSingle();

    const page = pageData as any;

    if (pageErr || !page || !page.published_revision_id) {
      return null;
    }

    const { data: revData, error: revErr } = await supabase
      .from('page_revisions')
      .select('content_json')
      .eq('id', page.published_revision_id)
      .single();

    const rev = revData as any;

    if (revErr || !rev) {
      return null;
    }

    const tree = validatePageTree(rev.content_json);

    // Extract SEO metadata from seo_metadata jsonb or top-level columns
    const seoMeta = page.seo_metadata || {};
    const seoTitle = seoMeta.seoTitle || page.seo_title || page.title;
    const seoDescription = seoMeta.metaDescription || page.seo_description || '';
    const ogImageUrl = seoMeta.ogImage || page.og_image_url || '';
    const canonicalUrl = seoMeta.canonicalUrl || page.canonical_url || '';
    const noIndex = seoMeta.robotsIndex === false || page.no_index === true;

    return {
      page: {
        id: page.id,
        slug: page.slug,
        title: page.title,
        page_type: page.page_type,
        seo_title: seoTitle,
        seo_description: seoDescription,
        og_image_url: ogImageUrl,
        canonical_url: canonicalUrl,
        no_index: noIndex,
      },
      tree,
    };
  } catch (err) {
    console.warn(`[CMS] Error fetching page for ${slug}:`, err);
    return null;
  }
}

export function resolveActiveRedirect(
  pathname: string,
  redirects: Array<{ source_path: string; destination_path: string; status_code: number }>
) {
  if (!redirects || redirects.length === 0) return null;
  const match = redirects.find((r) => r.source_path === pathname);
  return match || null;
}

export function resolvePublicPageSeo(
  page: PublishedPagePayload['page'] | null,
  seoGlobal: SeoGlobal
) {
  const title = page?.seo_title || page?.title || seoGlobal.defaultTitle || 'Klido';
  const description = page?.seo_description || seoGlobal.defaultMetaDescription;
  const canonical = page?.canonical_url || `${seoGlobal.siteUrl}${page?.slug || ''}`;
  const ogImage = page?.og_image_url || seoGlobal.defaultOgImage;

  return { title, description, canonical, ogImage };
}
