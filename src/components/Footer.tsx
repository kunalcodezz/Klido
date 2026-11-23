import { Link } from 'react-router-dom';
import { KlidoMark } from './Header';

export function Footer() {
  return (
    <footer className="border-t border-[#E5E9F2] bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-block">
              <KlidoMark />
            </Link>
            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-[#4A5268]">
              Independent digital marketing studio turning strong offers into clear
              positioning, considered campaigns, and practical systems for growth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="font-display text-sm font-semibold text-[#0D1126]">
                Pages
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#4A5268]">
                <li>
                  <Link
                    to="/"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/approach"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Approach
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-sm font-semibold text-[#0D1126]">
                Explore
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#4A5268]">
                <li>
                  <Link
                    to="/services#pricing"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Service Plans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services#scope-planner"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Scope Planner
                  </Link>
                </li>
                <li>
                  <Link
                    to="/approach#audit-matrix"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Audit Standards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    Start a project
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-display text-sm font-semibold text-[#0D1126]">
                Contact
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#4A5268]">
                <li>
                  <a
                    href="mailto:klidoagency@gmail.com"
                    className="transition-colors duration-150 hover:text-[#0D1126]"
                  >
                    klidoagency@gmail.com
                  </a>
                </li>
                <li>Mon–Fri, 09:00–18:00</li>
                <li>Remote Worldwide</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#E5E9F2] pt-6 text-xs text-[#6B7388] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Klido. All rights reserved.</p>
          <p>Client-owned accounts · Transparent weekly reporting</p>
        </div>
      </div>
    </footer>
  );
}
