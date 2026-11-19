import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { PRACTICE_AREAS, STUDIO_IMAGES } from '../data/klidoData';
import { ResilientImage } from '../components/ResilientImage';
import { ScopePlanner } from '../components/ScopePlanner';

export function ServicesPage() {
  return (
    <div>
      {/* Page Header Split */}
      <section className="border-b border-[#E5E9F2] bg-[#F7F9FE] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
                <span
                  className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span className="uppercase tracking-wider">YOUR PARTNER IN DIGITAL GROWTH</span>
              </div>
              <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-[#0D1126] sm:text-4xl lg:text-5xl">
                We turn ambitious brands into brands people remember.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4A5268]">
                From brand positioning and performance marketing to creative campaigns and business operations, Klido brings everything together to help businesses build a stronger presence and grow with purpose.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#scope-planner"
                  className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#123FFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC]"
                >
                  <span>Build Your Scope Outline</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <Link
                  to="/approach"
                  className="inline-flex min-h-[46px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-[#CFD6E6] bg-white px-5 py-2.5 text-sm font-medium text-[#0D1126] transition-colors duration-150 hover:bg-[#F7F9FE]"
                >
                  See Operating Standards
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ResilientImage
                src={STUDIO_IMAGES.strategyDesk}
                alt="Strategist desk with layout sketchpad, metal pen, and espresso on a limestone surface"
                aspectClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Numbered Services Breakdown */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-[#E5E9F2] border-y border-[#E5E9F2]">
            {PRACTICE_AREAS.map((area) => (
              <article
                key={area.id}
                id={area.id}
                className="scroll-mt-24 py-10 sm:py-12"
              >
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <span className="font-mono-tabular text-sm font-medium text-[#123FFF]">
                      {area.index}
                    </span>
                    <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-[#0D1126]">
                      {area.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#4A5268] sm:text-base">
                      {area.description}
                    </p>
                    <p className="mt-4 text-xs font-medium text-[#6B7388]">
                      Cadence · {area.cadence}
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                    <div className="rounded-xl border border-[#E5E9F2] bg-[#F7F9FE] p-5">
                      <h3 className="font-display text-sm font-semibold text-[#0D1126]">
                        Core Deliverables
                      </h3>
                      <ul className="mt-3.5 space-y-2.5 text-sm text-[#4A5268]">
                        {area.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#123FFF]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl border border-[#E5E9F2] bg-white p-5">
                      <div>
                        <h3 className="font-display text-sm font-semibold text-[#0D1126]">
                          Primary Stack &amp; Tooling
                        </h3>
                        <ul className="mt-3.5 space-y-2 text-sm text-[#4A5268]">
                          {area.tooling.map((tool) => (
                            <li
                              key={tool}
                              className="border-b border-[#E5E9F2] pb-2 last:border-b-0 last:pb-0"
                            >
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-5 pt-3">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123FFF] hover:text-[#0D31CC]"
                        >
                          <span>Discuss {area.title.split(' ')[0]} scope</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Scope Planner Section */}
      <section className="border-t border-[#E5E9F2] bg-[#F7F9FE] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <ScopePlanner />
        </div>
      </section>
    </div>
  );
}
