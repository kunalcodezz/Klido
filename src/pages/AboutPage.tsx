import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { STUDIO_IMAGES } from '../data/klidoData';
import { ResilientImage } from '../components/ResilientImage';
import { BrandsSection } from '../components/BrandsSection';

const STUDIO_DISCIPLINES = [
  {
    role: 'Growth Strategy & Architecture',
    focus:
      'Channel prioritization, unit-economics modeling, positioning clarity, and quarterly experiment roadmaps.',
  },
  {
    role: 'Performance Media & Influencer Campaigns',
    focus:
      'Meta and Google campaign construction, creator partnerships, search query governance, and bid calibration.',
  },
  {
    role: 'Conversion & Editorial Design',
    focus:
      'Dedicated campaign landing pages, social media systems, product-led copywriting, and usability testing.',
  },
  {
    role: 'Business Operations & Analytics',
    focus:
      'Process optimisation, SKU costing, SOPs, server-side GTM deployment, and clean weekly reporting ledgers.',
  },
];

const OPERATING_PRINCIPLES = [
  {
    index: '01.',
    title: 'Measurement precedes spend',
    body: 'Scaling media budget on broken conversion tracking hides wasted spend. Every engagement validates event accuracy and CRM alignment first.',
  },
  {
    index: '02.',
    title: 'Design is part of acquisition',
    body: 'Ads do half the job; the landing experience closes the loop. Our strategists and designers work in the same sprint rather than separate silos.',
  },
  {
    index: '03.',
    title: 'Plain language over jargon',
    body: 'Marketing reports should explain what changed, why it moved, and what we are testing next—without hiding behind vanity metrics.',
  },
];

export function AboutPage() {
  return (
    <div>
      {/* Studio Intro */}
      <section className="border-b border-[#E5E9F2] bg-[#F7F9FE] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5268]">
              <span
                className="inline-block h-[3px] w-5 rounded-full bg-[#C2F81A]"
                aria-hidden="true"
              />
              <span>About Klido Studio</span>
            </div>
            <h1 className="font-display mt-3 text-balance text-3xl font-bold tracking-tight text-[#0D1126] sm:text-4xl lg:text-5xl">
              An independent studio built to connect analytical media with clear design.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#4A5268] sm:text-lg">
              Klido was founded around a straightforward observation: most companies split
              paid acquisition, social, influencer campaigns, operations, and analytics
              across disconnected vendors. We operate as one compact studio so strategy,
              operations, creative, and measurement move together.
            </p>
          </div>

          <div className="mt-10">
            <ResilientImage
              src={STUDIO_IMAGES.studioInterior}
              alt="Inside the Klido studio workspace in natural daylight with oak tables and birch shelving"
              aspectClassName="aspect-video"
              caption="Klido studio workspace · Working with consumer and B2B brands globally."
            />
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="border-b border-[#E5E9F2] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#0D1126] sm:text-3xl">
            Three principles guiding our work
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {OPERATING_PRINCIPLES.map((item, idx) => (
              <div
                key={item.index}
                className={`border-t-2 pt-6 ${
                  idx === 0 ? 'border-[#C2F81A]' : 'border-[#CFD6E6]'
                }`}
              >
                <span className="font-mono-tabular text-xs font-medium text-[#123FFF]">
                  {item.index}
                </span>
                <h3 className="font-display mt-2 text-lg font-semibold text-[#0D1126]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4A5268]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Work With */}
      <BrandsSection />

      {/* Studio Disciplines Directory */}
      <section className="bg-[#F7F9FE] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[#0D1126]">
                Core studio disciplines
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4A5268]">
                Every client account pairs senior practitioners across these four functions,
                keeping communication direct and execution accountable.
              </p>
            </div>

            <div className="divide-y divide-[#E5E9F2] rounded-2xl border border-[#E5E9F2] bg-white lg:col-span-8">
              {STUDIO_DISCIPLINES.map((discipline) => (
                <div
                  key={discipline.role}
                  className="grid gap-2 p-5 sm:grid-cols-12 sm:gap-6 sm:p-6"
                >
                  <h3 className="font-display text-base font-semibold text-[#0D1126] sm:col-span-5">
                    {discipline.role}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4A5268] sm:col-span-7">
                    {discipline.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E9F2] pt-8">
            <p className="text-sm text-[#4A5268]">
              Interested in partnering with Klido on your next growth phase?
            </p>
            <Link
              to="/contact"
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#123FFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0D31CC]"
            >
              <span>Tell us what you&apos;re building</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
