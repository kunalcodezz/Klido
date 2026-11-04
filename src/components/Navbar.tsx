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
        backgroundColor: 'rgba(3, 4, 7, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/8 transition-colors duration-200"
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
            className="w-8 h-8 rounded-[8px] object-cover border border-white/10 shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-serif text-[22px] text-[#F4F6FA] tracking-[-0.02em] font-normal relative">
            Klido
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4FF24] transition-all duration-200 group-hover:w-full" />
          </span>
        </a>

        {/* Desktop Navigation with Framer Motion layoutId lime underline */}
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
                className={`relative py-1 transition-colors duration-150 ease-out cursor-pointer ${
                  isActive ? 'text-[#F4F6FA] font-medium' : 'text-[#9AA3B2] hover:text-[#F4F6FA]'
                }`}
              >
                <span>{link.name}</span>
                {showLine && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4FF24]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Contact Button (Solid #1558C9, white text, 2px radius, hover #1A66E0, 44px height) */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={() => handleNavClick('contact', '#contact')}
            className="h-11 px-6 rounded-[2px] bg-[#1558C9] hover:bg-[#1A66E0] text-white text-[14px] font-medium leading-none cursor-pointer transition-colors duration-150 ease-out shadow-xs flex items-center justify-center"
          >
            <span>Contact</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F4F6FA] focus:outline-none cursor-pointer"
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
            className="md:hidden bg-[#0B0F18]/95 backdrop-blur-md border-b border-white/8 px-6 py-6 space-y-4 overflow-hidden"
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
                    className={`text-[14px] py-1 transition-colors ${
                      isActive ? 'text-[#F4F6FA] font-medium' : 'text-[#9AA3B2]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-white/8">
              <button
                type="button"
                onClick={() => handleNavClick('contact', '#contact')}
                className="w-full h-11 rounded-[2px] bg-[#1558C9] hover:bg-[#1A66E0] text-white text-[14px] font-medium transition-colors cursor-pointer"
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
