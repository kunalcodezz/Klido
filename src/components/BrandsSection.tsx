import {
  ArrowUpRight,
  Instagram,
  Layers,
  Megaphone,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import { STUDIO_IMAGES } from '../data/klidoData';

export function BrandsSection() {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 overflow-hidden border-b border-[#E5E9F2] bg-gradient-to-b from-[#FFFFFF] via-[#F9FAFE] to-[#F5F7FC] py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle top-right lime and bottom-left cobalt accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-[42%] bg-gradient-to-bl from-[#C2F81A]/50 via-[#C2F81A]/15 to-transparent blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-[44%] bg-gradient-to-tr from-[#123FFF]/45 via-[#123FFF]/12 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 text-sm font-medium text-[#4A5268]">
            <span
              className="inline-block h-[3px] w-6 rounded-full bg-[#C2F81A]"
              aria-hidden="true"
            />
            <span>Brands we work with</span>
          </div>

          <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.025em] text-[#0D1126] sm:text-4xl lg:text-[2.75rem]">
            Partners in{' '}
            <span className="text-[#123FFF]">
              real{' '}
              <span className="relative inline-block">
                <span>growth</span>
                <svg
                  className="pointer-events-none absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 180 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C52 3.5 124 2.5 178 6.5"
                    stroke="#C2F81A"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5268]">
            A closer look at the brands we&apos;re building with — from operations to
            marketing, we help businesses grow online and beyond.
          </p>
        </div>

        {/* Top 2-Card Row: Hashi + Saanjh by Riya */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Card 1: Hashi */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#E5E9F2] bg-white p-4 shadow-[0_18px_45px_-20px_rgba(13,17,38,0.08)] sm:p-5">
            <div className="grid gap-5 sm:grid-cols-12 sm:items-stretch">
              <div className="sm:col-span-5">
                <div className="h-56 overflow-hidden rounded-xl border border-[#E5E9F2] bg-[#F4ECE2] sm:h-full sm:min-h-[230px]">
                  <img
                    src={STUDIO_IMAGES.brandHashi}
                    alt="Hashi home essentials kraft shipping box on a sunlit oak table"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between sm:col-span-7">
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#EDE3D6] bg-[#F5EDE3] font-serif text-xs font-semibold text-[#0D1126]"
                      aria-hidden="true"
                    >
                      Hashi
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-[#0D1126]">
                        Hashi
                      </h3>
                      <p className="text-xs font-medium text-[#6B7388]">Business ops</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#4A5268]">
                    Taking a home business with 100+ SKUs to an online brand: process
                    optimisation, costing and SOPs. Meta ads and influencer marketing start
                    in November.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-[#E5E9F2] border-t border-[#E5E9F2] pt-3.5 text-xs font-medium text-[#0D1126]">
                  <div className="flex items-center gap-1.5 pr-2">
                    <TrendingUp
                      className="h-3.5 w-3.5 shrink-0 text-[#4A5268]"
                      aria-hidden="true"
                    />
                    <span className="truncate">100+ SKUs</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 px-2">
                    <Layers
                      className="h-3.5 w-3.5 shrink-0 text-[#4A5268]"
                      aria-hidden="true"
                    />
                    <span className="truncate">Ops &amp; SOPs</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 pl-2">
                    <Megaphone
                      className="h-3.5 w-3.5 shrink-0 text-[#4A5268]"
                      aria-hidden="true"
                    />
                    <span className="truncate">Meta Ads (Nov)</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: Saanjh by Riya */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#E5E9F2] bg-white p-4 shadow-[0_18px_45px_-20px_rgba(13,17,38,0.08)] sm:p-5">
            <div className="grid gap-5 sm:grid-cols-12 sm:items-stretch">
              <div className="sm:col-span-5">
                <div className="h-56 overflow-hidden rounded-xl border border-[#E5E9F2] bg-[#36281E] sm:h-full sm:min-h-[230px]">
                  <img
                    src={STUDIO_IMAGES.brandSaanjh}
                    alt="Saanjh by Riya handcrafted luxury candle burning on a warm wood table"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between sm:col-span-7">
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-[#EDE3D6] bg-[#F7EFE6] font-serif text-[10px] leading-tight font-semibold text-[#5C3A21]"
                      aria-hidden="true"
                    >
                      <span>Saanjh</span>
                      <span className="text-[8px] font-normal">by Riya</span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-[#0D1126]">
                        Saanjh by Riya
                      </h3>
                      <p className="text-xs font-medium text-[#6B7388]">
                        Social, ops, influencer
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#4A5268]">
                    Handcrafted luxury candles and decor from Pune. We run social media,
                    end-to-end business operations and influencer marketing.
                  </p>
                </div>

                <div className="mt-5">
                  <a
                    href="https://www.instagram.com/saanjhbyriya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#0D1126] bg-white px-4 py-2 text-xs font-semibold text-[#0D1126] transition-colors duration-150 hover:bg-[#0D1126] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123FFF]"
                  >
                    <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>View on Instagram</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Bottom Full-Width Row: Zegore */}
        <article className="mt-6 rounded-2xl border border-[#E5E9F2] bg-white p-4 shadow-[0_18px_45px_-20px_rgba(13,17,38,0.08)] sm:p-5">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-3">
              <div className="h-28 overflow-hidden rounded-xl border border-[#E5E9F2] bg-[#161922] sm:h-32">
                <img
                  src={STUDIO_IMAGES.brandZegore}
                  alt="Zegore matte black ballistic-nylon travel pouch with lime zipper accent"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex items-center gap-3.5 lg:col-span-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0D1126] text-white"
                aria-hidden="true"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 14L14.5 4.5M14.5 4.5H8M14.5 4.5V11"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-[#0D1126]">
                  Zegore
                </h3>
                <p className="text-xs font-medium text-[#6B7388]">Influencer, social</p>
              </div>
            </div>

            <div className="border-[#E5E9F2] lg:col-span-3 lg:border-l lg:pl-6">
              <p className="text-sm leading-relaxed text-[#4A5268]">
                Influencer campaigns and social media marketing for the brand.
              </p>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#E5E9F2] border-t border-[#E5E9F2] pt-4 text-xs font-medium text-[#0D1126] lg:col-span-3 lg:border-t-0 lg:pt-0">
              <div className="flex items-center gap-2 pr-3">
                <Megaphone
                  className="h-4 w-4 shrink-0 text-[#4A5268]"
                  aria-hidden="true"
                />
                <span>Influencer Campaigns</span>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <Smartphone
                  className="h-4 w-4 shrink-0 text-[#4A5268]"
                  aria-hidden="true"
                />
                <span>Social Media</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
