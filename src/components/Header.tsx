import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import klidoLogo from '../assets/images/Klido_Logo.png';

interface NavItem {
  label: string;
  to: string;
  matchPath: string;
  matchHash?: string;
  matchDefaultHome?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Services', to: '/', matchPath: '/', matchDefaultHome: true },
  { label: 'Studio', to: '/about', matchPath: '/about' },
  { label: 'Work', to: '/#work', matchPath: '/', matchHash: '#work' },
  { label: 'Pricing', to: '/#pricing', matchPath: '/', matchHash: '#pricing' },
];

export function KlidoMark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-[#123FFF] text-white shadow-xs"
        aria-hidden="true"
      >
        <img
          src={klidoLogo}
          alt="Klido logo"
          className="h-full w-full object-cover"
        />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-[#0D1126]">
        klido
      </span>
    </span>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 48) {
        setIsScrolled(false);
        setIsCollapsed(false);
      } else {
        setIsScrolled(true);
        if (delta > 6) {
          setIsCollapsed(true);
        } else if (delta < -6) {
          setIsCollapsed(false);
        }
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavItemActive = (item: NavItem) => {
    if (item.matchHash) {
      return location.pathname === item.matchPath && location.hash === item.matchHash;
    }
    if (item.matchDefaultHome) {
      return (
        (location.pathname === '/' && !location.hash) ||
        location.pathname === '/services'
      );
    }
    return location.pathname === item.matchPath;
  };

  const handleNavClick = (item: NavItem) => {
    if (item.to === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showExpandedLinks = !isScrolled || !isCollapsed || mobileOpen;

  return (
    <header className="pointer-events-none sticky top-0 z-40 h-18 w-full">
      <div
        className={`pointer-events-auto mx-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? `translate-y-3 rounded-full border border-[#E5E9F2]/90 bg-white/80 backdrop-blur-md shadow-[0_14px_38px_-12px_rgba(13,17,38,0.14)] ${
                showExpandedLinks
                  ? 'h-14 w-[calc(100%-2rem)] max-w-[820px] px-4 sm:px-6'
                  : 'h-14 w-[calc(100%-2rem)] max-w-[380px] px-4 sm:px-5'
              }`
            : 'h-18 w-full rounded-none border-b border-[#E5E9F2] bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div
          className={`mx-auto flex h-full items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'max-w-full gap-4' : 'max-w-[1200px] gap-8 px-4 sm:px-6 lg:px-8'
          }`}
        >
          {/* Zone 1: Brand mark */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="shrink-0 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123FFF]"
          >
            <KlidoMark />
          </Link>

          {/* Zone 2: Morphing navigation links (collapses on downward scroll, restores on upward scroll or top) */}
          <nav
            aria-label="Primary navigation"
            aria-hidden={!showExpandedLinks}
            className={`hidden items-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex ${
              showExpandedLinks
                ? 'max-w-[480px] gap-7 opacity-100 lg:gap-8'
                : 'pointer-events-none max-w-0 gap-0 opacity-0'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  tabIndex={showExpandedLinks ? 0 : -1}
                  onClick={() => handleNavClick(item)}
                  className={`shrink-0 whitespace-nowrap py-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123FFF] ${
                    active
                      ? 'border-b-2 border-[#123FFF] text-[#0D1126]'
                      : 'border-b-2 border-transparent text-[#4A5268] hover:text-[#0D1126]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Start a project CTA (black background, white text) + mobile menu toggle */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/contact"
              className="group hidden shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#101735] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123FFF] sm:inline-flex"
            >
              <span>Start a project</span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`inline-flex items-center justify-center border border-[#E5E9F2] bg-white text-[#101735] transition-colors duration-150 hover:bg-[#F7F9FE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF] md:hidden ${
                isScrolled ? 'h-10 w-10 rounded-full' : 'h-11 w-11 rounded-lg'
              }`}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`pointer-events-auto border border-[#E5E9F2] bg-white/95 px-4 py-4 backdrop-blur-md md:hidden ${
            isScrolled
              ? 'mx-auto mt-5 w-[calc(100%-2rem)] rounded-2xl shadow-[0_18px_40px_-14px_rgba(13,17,38,0.16)]'
              : 'border-x-0 border-t-0 shadow-sm'
          }`}
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => handleNavClick(item)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors duration-150 ${
                    active
                      ? 'bg-[#EEF2FF] text-[#123FFF]'
                      : 'text-[#0D1126] hover:bg-[#F7F9FE]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 flex items-center justify-center border-t border-[#E5E9F2] pt-3">
              <Link
                to="/contact"
                className="group inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#101735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
              >
                <span>Start a project</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
