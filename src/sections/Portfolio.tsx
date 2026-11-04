import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { CountUp } from 'countup.js';
import VanillaTilt from 'vanilla-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stat1 = useRef<HTMLSpanElement>(null);
  const stat2 = useRef<HTMLSpanElement>(null);
  const stat3 = useRef<HTMLSpanElement>(null);
  const stat4 = useRef<HTMLSpanElement>(null);

  const creatorPlacements = [
    {
      handle: '@style_curator',
      title: 'Packaging & Product Unboxing',
      quote: 'Clean craftsmanship and unit quality.',
      image: '/src/assets/images/creator_ugc_lifestyle_1793541111707.jpg',
      url: 'https://www.instagram.com/reel/DbP_zloyIXk/'
    },
    {
      handle: '@urban_sanctuary',
      title: 'Artisan Workshop Review',
      quote: 'Direct brand adoption with zero fluff.',
      image: '/src/assets/images/creator_ugc_artisan_1793541111804.jpg',
      url: 'https://www.instagram.com/reel/Dazr8B-qAcl/'
    },
    {
      handle: '@modern_essentials',
      title: 'Everyday Minimalist EDC Feature',
      quote: 'Real utility with high customer retention.',
      image: '/src/assets/images/zegore_leather_accessories_1793541111684.jpg',
      url: 'https://www.instagram.com/reel/DZZ2Ye6tczI/'
    },
    {
      handle: '@aesthetic_living',
      title: 'Ceramic Stoneware Styling',
      quote: 'Organic resonance and rapid conversion.',
      image: '/src/assets/images/hashi_ceramics_home_1793541111377.jpg',
      url: 'https://www.instagram.com/reel/DbP_zloyIXk/'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let splitInstance: SplitType | null = null;
    const ctx = gsap.context(() => {
      // SplitType headline reveal
      if (headlineRef.current) {
        splitInstance = new SplitType(headlineRef.current, { types: 'lines' });
        if (splitInstance.lines) {
          splitInstance.lines.forEach((line) => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          gsap.from(splitInstance.lines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            },
          });
        }
      }

      // CountUp stats on scroll enter
      ScrollTrigger.create({
        trigger: '#portfolio-stats',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (stat1.current) new CountUp(stat1.current, 4.2, { decimalPlaces: 1, suffix: 'x', duration: 1.6 }).start();
          if (stat2.current) new CountUp(stat2.current, 18, { suffix: 'M+', duration: 1.8 }).start();
          if (stat3.current) new CountUp(stat3.current, 3.1, { decimalPlaces: 1, suffix: 'x', duration: 1.7 }).start();
          if (stat4.current) new CountUp(stat4.current, 92, { suffix: '%', duration: 1.5 }).start();
        }
      });

      // Staggered work items
      gsap.from('.work-project-row', {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work-project-container',
          start: 'top 75%',
        }
      });
    }, sectionRef);

    // Vanilla Tilt on mockups (desktop only, pointer fine)
    const isDesktop = window.innerWidth >= 768 && window.matchMedia('(pointer: fine)').matches;
    const tiltNodes = document.querySelectorAll<HTMLElement>('.tilt-container');
    if (isDesktop && tiltNodes.length > 0) {
      VanillaTilt.init(Array.from(tiltNodes), {
        max: 4,
        speed: 400,
        glare: false,
        scale: 1.01,
      });
    }

    return () => {
      ctx.revert();
      if (splitInstance) splitInstance.revert();
      tiltNodes.forEach((node) => {
        const tiltObj = (node as unknown as { vanillaTilt?: { destroy: () => void } }).vanillaTilt;
        if (tiltObj) tiltObj.destroy();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-[72px] lg:py-32 bg-transparent relative z-10 border-t border-[#D5E0EC]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-8 bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-[2px] border border-[#D5E0EC]/60">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] font-medium text-[#5B6B7F] block mb-3">
              02 / Work & Results
            </span>
            <h2
              ref={headlineRef}
              className="font-serif text-[32px] sm:text-[56px] font-normal text-[#0F1B2D] leading-[1.08] tracking-[-0.02em] mb-4"
            >
              Selected client engagements and results.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#5B6B7F] max-w-[60ch]">
              Operational transformations and customer acquisition deployments for independent consumer brands in India.
            </p>
          </div>
        </div>

        {/* Results Metrics Bar with CountUp.js */}
        <div id="portfolio-stats" className="border border-[#D5E0EC] bg-white/95 backdrop-blur-xs rounded-[2px] p-6 sm:p-8 mb-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span ref={stat1} className="font-mono text-[32px] font-normal text-[#0F1B2D] block mb-1 tabular-nums">
              4.2x
            </span>
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F]">
              Peak Blended ROAS
            </span>
          </div>
          <div>
            <span ref={stat2} className="font-mono text-[32px] font-normal text-[#0F1B2D] block mb-1 tabular-nums">
              18M+
            </span>
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F]">
              Organic UGC Views
            </span>
          </div>
          <div>
            <span ref={stat3} className="font-mono text-[32px] font-normal text-[#0F1B2D] block mb-1 tabular-nums">
              3.1x
            </span>
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F]">
              Contribution Margin Lift
            </span>
          </div>
          <div>
            <span ref={stat4} className="font-mono text-[32px] font-normal text-[#0F1B2D] block mb-1 tabular-nums">
              92%
            </span>
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F]">
              Dispatch SLA Fulfilled
            </span>
          </div>
        </div>

        {/* Rows: Each brand project structured on 12-column grid with subtle Tilt */}
        <div className="work-project-container space-y-6 mb-20">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="work-project-row p-6 sm:p-8 rounded-[2px] bg-white/95 backdrop-blur-xs border border-[#D5E0EC] grid grid-cols-12 gap-8 items-start transition-all duration-200 hover:border-[#2F7FD1]"
            >
              {/* Left Column: Image with strict 4:5 aspect ratio, 2px radius, hairline border & subtle Vanilla Tilt */}
              <div className="col-span-12 md:col-span-4 lg:col-span-4">
                <div className="tilt-container aspect-[4/5] w-full overflow-hidden border border-[#D5E0EC] rounded-[2px] bg-white transition-shadow duration-300">
                  <img
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Title, Category, Description, Deliverables */}
              <div className="col-span-12 md:col-span-8 lg:col-span-8 flex flex-col justify-between h-full">
                <div>
                  <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F] block mb-2">
                    {project.segment} · {project.badge}
                  </span>
                  <h3 className="font-serif text-[32px] font-normal text-[#0F1B2D] mb-2">
                    {project.name}
                  </h3>
                  <p className="text-[14px] font-medium text-[#0F1B2D] mb-4">
                    {project.category}
                  </p>
                  <p className="text-[16px] leading-[1.6] text-[#5B6B7F] max-w-[60ch] mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#D5E0EC]">
                  <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F] block mb-3">
                    Scope Delivered
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="text-[14px] text-[#0F1B2D] flex items-center gap-2">
                        <span className="text-[#5B6B7F] text-[12px]">—</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Creator Placements Row with Swiper Carousel */}
        <div className="pt-12 border-t border-[#D5E0EC]">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[12px] uppercase font-sans tracking-[0.08em] text-[#5B6B7F] font-medium">
              Monthly Creator Placements
            </span>
            {/* Minimal Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="swiper-prev-btn"
                className="w-10 h-10 border border-[#D5E0EC] rounded-[2px] bg-white flex items-center justify-center text-[#0F1B2D] hover:border-[#2F7FD1] hover:text-[#2F7FD1] transition-colors cursor-pointer"
                aria-label="Previous creator placement"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                id="swiper-next-btn"
                className="w-10 h-10 border border-[#D5E0EC] rounded-[2px] bg-white flex items-center justify-center text-[#0F1B2D] hover:border-[#2F7FD1] hover:text-[#2F7FD1] transition-colors cursor-pointer"
                aria-label="Next creator placement"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '#swiper-prev-btn',
              nextEl: '#swiper-next-btn',
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            grabCursor
            className="pb-4"
          >
            {creatorPlacements.map((creator, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="h-full flex flex-col p-4 bg-white border border-[#D5E0EC] rounded-[2px] transition-all duration-200 hover:-translate-y-1 hover:border-[#2F7FD1]">
                  <div className="aspect-[1/1] w-full overflow-hidden border border-[#D5E0EC] rounded-[2px] bg-[#EEF4FA] mb-4">
                    <img
                      src={creator.image}
                      alt={creator.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="font-mono text-[12px] text-[#2F7FD1] block mb-1">
                    {creator.handle}
                  </span>
                  <h4 className="font-serif text-[16px] font-normal text-[#0F1B2D] mb-1">
                    {creator.title}
                  </h4>
                  <p className="text-[14px] text-[#5B6B7F] mb-4 line-clamp-2">
                    "{creator.quote}"
                  </p>
                  <a
                    href={creator.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] text-[#0F1B2D] hover:text-[#2F7FD1] flex items-center gap-1.5 mt-auto transition-colors"
                  >
                    <span>View placement</span>
                    <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
