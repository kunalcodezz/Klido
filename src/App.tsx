import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Link, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ApproachPage } from './pages/ApproachPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import {
  fetchPublicSiteBundle,
  fetchPublishedPageBySlug,
  resolveActiveRedirect,
  resolvePublicPageSeo,
} from './cms/lib/publicCmsClient';
import { DesignTokenProvider } from './cms/providers/DesignTokenProvider';
import { GlobalSettingsProvider } from './cms/providers/GlobalSettingsProvider';
import { CMSDataProvider } from './cms/providers/CMSDataProvider';
import { PageRenderer } from './cms/blocks/PageRenderer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function NotFoundPage() {
  return (
    <section className="bg-[#F7F9FE] py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <p className="font-mono-tabular text-xs font-medium text-[#123FFF]">404</p>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#0D1126]">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#4A5268]">
          The page you requested is unavailable. Return to the main overview or view our
          services.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center rounded-lg bg-[#123FFF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0D31CC]"
          >
            Back to Home
          </Link>
          <Link
            to="/services"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-[#CFD6E6] bg-white px-4 py-2 text-sm font-medium text-[#0D1126] hover:bg-[#F7F9FE]"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Dynamic CMS Page Route Component
 * Resolves published page revisions from Supabase with fallback to static components.
 */
function CmsRouteHandler({
  fallbackComponent: FallbackComponent,
  slug,
}: {
  fallbackComponent?: React.ComponentType;
  slug?: string;
}) {
  const location = useLocation();
  const currentPath = slug !== undefined ? slug : location.pathname;

  const { data: bundle } = useQuery({
    queryKey: ['public-site-bundle'],
    queryFn: fetchPublicSiteBundle,
  });

  const { data: cmsPayload, isLoading } = useQuery({
    queryKey: ['published-page', currentPath],
    queryFn: () => fetchPublishedPageBySlug(currentPath, bundle?.seoGlobal),
    enabled: !!bundle,
  });

  // Handle active redirects
  if (bundle?.redirects) {
    const redirectMatch = resolveActiveRedirect(location.pathname, bundle.redirects);
    if (redirectMatch) {
      return <Navigate to={redirectMatch.destination_path} replace />;
    }
  }

  // Update dynamic SEO metadata
  useEffect(() => {
    if (bundle?.seoGlobal) {
      const seo = resolvePublicPageSeo(cmsPayload?.page || null, bundle.seoGlobal);
      document.title = seo.title;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      if (seo.description) {
        metaDesc.setAttribute('content', seo.description);
      }
    }
  }, [cmsPayload, bundle]);

  if (isLoading) {
    if (FallbackComponent) {
      return <FallbackComponent />;
    }
    return null;
  }

  if (cmsPayload && cmsPayload.tree && cmsPayload.tree.sections.length > 0) {
    return <PageRenderer tree={cmsPayload.tree} />;
  }

  if (FallbackComponent) {
    return <FallbackComponent />;
  }

  return <NotFoundPage />;
}

function MainAppLayout() {
  const { data: bundle } = useQuery({
    queryKey: ['public-site-bundle'],
    queryFn: fetchPublicSiteBundle,
  });

  const defaultDesignTokens = bundle?.designTokens || {
    colors: {
      primary: '#123FFF',
      primaryHover: '#0D31CC',
      accent: '#C2F81A',
      secondary: '#0D1126',
      text: '#0D1126',
      mutedText: '#4A5268',
      background: '#FFFFFF',
      surface: '#F7F9FE',
      border: '#E5E9F2',
    },
    layout: { containerMaxWidthPx: 1200, sectionSpacingPx: 80, gridGapPx: 24, globalRadiusPx: 16 },
    typography: {
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'DM Sans',
      monoFont: 'JetBrains Mono',
      baseSizePx: 16,
      headingLineHeight: 1.1,
      bodyLineHeight: 1.6,
      headingWeight: 700,
      bodyWeight: 400,
    },
    buttons: { radiusPx: 8, paddingX: 24, paddingY: 12 },
  };

  const defaultSeoGlobal = bundle?.seoGlobal || {
    siteName: 'Klido',
    siteUrl: 'https://www.klido.in',
    defaultTitle: 'Klido',
    defaultMetaDescription: '',
    defaultOgImage: '/klido_Logo.png',
    faviconUrl: '/favicon-48x48.png',
    robotsTxt: 'User-agent: *\nAllow: /',
  };

  const defaultFooterConfig = bundle?.footerConfig || {
    description: '',
    email: 'klidoagency@gmail.com',
    phone: '+91 9172569021',
    hours: 'Mon–Fri, 09:00–18:00',
    location: 'Remote Worldwide',
    tagline: '',
    instagramUrl: 'https://www.instagram.com/klidoagency',
    instagramHandle: '@klidoagency',
    copyrightText: 'Klido. All rights reserved.',
  };

  return (
    <CMSDataProvider
      bundle={
        bundle || {
          designTokens: defaultDesignTokens,
          seoGlobal: defaultSeoGlobal,
          footerConfig: defaultFooterConfig,
          navigation: { header: [], footerPractice: [], footerEngage: [], footerLegal: [] },
          redirects: [],
          collections: { services: [], brands: [], projects: [], testimonials: [] },
        }
      }
    >
      <DesignTokenProvider tokens={defaultDesignTokens}>
        <GlobalSettingsProvider seoGlobal={defaultSeoGlobal} footerConfig={defaultFooterConfig}>
          <div className="flex min-h-screen flex-col bg-white text-[#0D1126]">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#123FFF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              <Routes>
                <Route path="/" element={<CmsRouteHandler slug="/" fallbackComponent={HomePage} />} />
                <Route
                  path="/services"
                  element={<CmsRouteHandler slug="/services" fallbackComponent={ServicesPage} />}
                />
                <Route
                  path="/approach"
                  element={<CmsRouteHandler slug="/approach" fallbackComponent={ApproachPage} />}
                />
                <Route
                  path="/about"
                  element={<CmsRouteHandler slug="/about" fallbackComponent={AboutPage} />}
                />
                <Route
                  path="/contact"
                  element={<CmsRouteHandler slug="/contact" fallbackComponent={ContactPage} />}
                />
                <Route path="*" element={<CmsRouteHandler />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </GlobalSettingsProvider>
      </DesignTokenProvider>
    </CMSDataProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollManager />
        <MainAppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
