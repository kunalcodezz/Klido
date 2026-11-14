import step1Img from '../assets/images/process/step-01-consultation.jpg';
import step2Img from '../assets/images/process/step-02-strategy.jpg';
import step3Img from '../assets/images/process/step-03-execution.jpg';
import step4Img from '../assets/images/process/step-04-tracking.jpg';
import step5Img from '../assets/images/process/step-05-optimization.jpg';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation & Discovery',
    description: 'We understand your brand, goals, challenges and requirements.',
    image: step1Img,
    imageAlt: 'Consultation & Discovery desk with laptop, notebook, and Klido mug',
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We create a tailored growth plan with the right channels, creatives and operations.',
    image: step2Img,
    imageAlt: 'Growth plan checklist highlighting Meta Ads, Influencers, and Social Media',
  },
  {
    number: '03',
    title: 'Execution & Launch',
    description: 'We get to work, from content and campaigns to operations and setup.',
    image: step3Img,
    imageAlt: 'Studio camera and softbox lighting setup for content and campaign execution',
  },
  {
    number: '04',
    title: 'Tracking & Performance',
    description: 'We monitor results, analyze key metrics and share clear performance updates.',
    image: step4Img,
    imageAlt: 'Performance dashboard display tracking metrics, conversion curves, and ROAS',
  },
  {
    number: '05',
    title: 'Optimization & Growth',
    description: 'We refine, scale and optimize continuously for better, long-term results.',
    image: step5Img,
    imageAlt: 'Ascending pedestal blocks with upward lime trajectory arrow for optimization and growth',
  },
];

export function HowWeWorkSection() {
  return (
    <section
      id="how-we-work"
      className="relative scroll-mt-20 overflow-hidden border-b border-[#E5E9F2] bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Bottom-left signature neon lime glow matching brand visual language */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-[44%] bg-gradient-to-tr from-[#C2F81A]/55 via-[#C2F81A]/18 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-4 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/* Pill / Category indicator */}
              <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0D1126]">
                <span
                  className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
                  aria-hidden="true"
                />
                <span>Our Process</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-display mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#0D1126] sm:text-5xl lg:text-[3.25rem]">
                How We
                <br />
                Work
              </h2>

              {/* Subtitle */}
              <p className="mt-6 max-w-xs text-base leading-relaxed text-[#4A5268]">
                A clear, collaborative process that takes you from idea to impact.
              </p>
            </div>
          </div>

          {/* Right Column: Timeline & 5 Steps */}
          <div className="relative lg:col-span-8 xl:col-span-8">
            <div className="relative pl-7 sm:pl-9">
              {/* Continuous vertical timeline track */}
              <div
                aria-hidden="true"
                className="absolute left-[9px] top-4 bottom-8 w-[1.5px] bg-[#E5E9F2]"
              />

              {/* Steps list */}
              <div className="space-y-7 sm:space-y-8">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.number} className="relative group">
                    {/* Glowing timeline node dot */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-7 sm:-left-9 top-1.5 flex h-5 w-5 -translate-x-[calc(50%-1px)] items-center justify-center rounded-full border border-[#E5E9F2] bg-white shadow-xs"
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-[#C2F81A] ring-3 ring-[#C2F81A]/35" />
                    </div>

                    {/* Step Content: Text on left, Card on right */}
                    <div className="grid gap-4 sm:grid-cols-12 sm:items-center sm:gap-6">
                      {/* Left: Number, Title, Description */}
                      <div className="sm:col-span-6 lg:col-span-6">
                        <span className="font-mono-tabular text-xs font-semibold tracking-wider text-[#6B7388]">
                          {step.number}
                        </span>
                        <h3 className="font-display mt-0.5 text-lg font-bold tracking-tight text-[#0D1126] sm:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#4A5268]">
                          {step.description}
                        </p>
                      </div>

                      {/* Right: Rounded Image Card */}
                      <div className="sm:col-span-6 lg:col-span-6">
                        <div className="overflow-hidden rounded-2xl border border-[#E5E9F2] bg-[#FAFBFD] shadow-[0_10px_30px_-15px_rgba(13,17,38,0.06)] transition-all duration-200 group-hover:border-[#CFD6E6] group-hover:shadow-[0_14px_35px_-12px_rgba(13,17,38,0.1)]">
                          <img
                            src={step.image}
                            alt={step.imageAlt}
                            className="aspect-[3.59/1] w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
