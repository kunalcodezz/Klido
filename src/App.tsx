import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ApproachPage } from './pages/ApproachPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
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
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/approach" element={<ApproachPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
