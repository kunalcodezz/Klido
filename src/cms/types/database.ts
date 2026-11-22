export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
export type PageType = 'home' | 'standard' | 'landing' | 'legal' | 'custom';
export type PageStatus = 'draft' | 'in_review' | 'published' | 'archived';
export type RevisionStatus = 'draft' | 'published' | 'archived';
export type ServiceKind = 'plan' | 'practice_area';
export type BrandLayoutVariant = 'card' | 'wide';
export type NavigationLocation = 'header' | 'footer_practice' | 'footer_engage' | 'footer_legal';

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: Json;
          is_public: boolean;
          description: string;
          updated_at: string;
          updated_by: string | null;
        };
      };
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          page_type: PageType;
          status: PageStatus;
          seo_title: string;
          seo_description: string;
          og_image_url: string;
          canonical_url: string;
          no_index: boolean;
          published_revision_id: string | null;
          draft_revision_id: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      page_revisions: {
        Row: {
          id: string;
          page_id: string;
          revision_number: number;
          content_json: Json;
          status: RevisionStatus;
          created_at: string;
          created_by: string | null;
          published_at: string | null;
          change_summary: string;
        };
      };
      navigation_items: {
        Row: {
          id: string;
          location: NavigationLocation;
          parent_id: string | null;
          label: string;
          href: string;
          is_external: boolean;
          is_cta: boolean;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      redirects: {
        Row: {
          id: string;
          source_path: string;
          destination_path: string;
          status_code: number;
          is_active: boolean;
          notes: string;
          created_at: string;
          updated_at: string;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string;
          description: string;
          service_kind: ServiceKind;
          price_display: string;
          original_price_display: string;
          discount_label: string;
          billing_period: string;
          image_asset_id: string | null;
          features: Json;
          deliverables: Json;
          tooling: Json;
          mapped_disciplines: Json;
          cadence: string;
          cta_label: string;
          cta_url: string;
          is_featured: boolean;
          is_visible: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      brands: {
        Row: {
          id: string;
          slug: string;
          name: string;
          logo_asset_id: string | null;
          preview_asset_id: string | null;
          description: string;
          scopes: Json;
          filter_keys: Json;
          website_url: string;
          instagram_url: string;
          layout_variant: BrandLayoutVariant;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          client_name: string;
          summary: string;
          description: string;
          category: string;
          cover_asset_id: string | null;
          gallery_asset_ids: Json;
          external_url: string;
          metrics: Json;
          is_featured: boolean;
          is_visible: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_designation: string;
          company_name: string;
          quote: string;
          avatar_asset_id: string | null;
          project_id: string | null;
          service_id: string | null;
          is_featured: boolean;
          is_visible: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
