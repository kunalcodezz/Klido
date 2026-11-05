import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const navLinks = [
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hairline border & backdrop blur threshold
      setIsScrolled(currentScrollY > 40);

      // Smart hide on scroll down, show on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 6) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current - 6 || currentScrollY <= 80) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;

      // Active section detection
      const sections = ['services', 'work', 'process', 'pricing', 'faq', 'contact'];
      const scrollPosition = currentScrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + currentScrollY;
          const height = el.offsetHeight || (sectionId === 'services' || sectionId === 'work' || sectionId === 'process' ? window.innerHeight * 1.2 : 400);
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (currentScrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === 'contact' && onOpenContact) {
      onOpenContact();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{
        y: hidden ? -90 : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-[#E5EAF5] transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home', '#home');
          }}
          className="flex items-center gap-2.5 relative group"
        >
          <img
            src="/klido-logo.jpeg"
            alt="Klido Logo"
            className="w-8 h-8 rounded-[10px] object-cover border border-[#E5EAF5] shadow-xs transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-sans font-bold text-[20px] text-[#111827] tracking-tight relative">
            Klido
            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#3D5AFE] transition-all duration-200 group-hover:w-full" />
          </span>
        </a>

        {/* Desktop Navigation with Framer Motion layoutId electric-blue underline */}
        <nav
          className="hidden md:flex items-center gap-8 text-[14px]"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredSection === link.id;
            const showLine = isHovered || (!hoveredSection && isActive);

            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredSection(link.id)}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id, link.href);
                }}
                className={`relative py-1.5 transition-colors duration-150 ease-out cursor-pointer ${
                  isActive ? 'text-[#111827] font-semibold' : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                <span>{link.name}</span>
                {showLine && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3D5AFE] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Rounded Electric-Blue CTA (#3D5AFE) */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={() => handleNavClick('contact', '#contact')}
            className="h-11 px-6 rounded-full bg-[#3D5AFE] hover:bg-[#2F47D4] text-white text-[14px] font-medium leading-none cursor-pointer transition-all duration-150 ease-out shadow-sm shadow-[#3D5AFE]/25 hover:shadow-md hover:shadow-[#3D5AFE]/30 hover:-translate-y-0.5 flex items-center justify-center"
          >
            <span>Contact</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111827] focus:outline-none cursor-pointer rounded-lg hover:bg-[#F3F6FF]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#E5EAF5] px-6 py-6 space-y-4 overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id, link.href);
                    }}
                    className={`text-[14px] py-1.5 transition-colors ${
                      isActive ? 'text-[#111827] font-semibold' : 'text-[#64748B]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-[#E5EAF5]">
              <button
                type="button"
                onClick={() => handleNavClick('contact', '#contact')}
                className="w-full h-11 rounded-full bg-[#3D5AFE] hover:bg-[#2F47D4] text-white text-[14px] font-medium transition-colors cursor-pointer shadow-sm shadow-[#3D5AFE]/25"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
