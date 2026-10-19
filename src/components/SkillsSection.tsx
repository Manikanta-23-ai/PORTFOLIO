import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { filterSkillCategories } from '../utils/portfolioLogic';
import { FadeIn } from './FadeIn';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const visibleCategories = filterSkillCategories(activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[2.75rem] md:rounded-t-[4rem] pt-24 pb-32 md:pt-32 md:pb-40 z-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header & Interactive Domain Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-[#0C0C0C]/12">
          <FadeIn y={24}>
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-[#0C0C0C]/55 mb-3">
              CAPABILITIES · FRAMEWORKS · INFRASTRUCTURE
            </p>
            <h2
              className="font-space font-bold uppercase tracking-[-0.035em] leading-[0.92] text-[#0C0C0C]"
              style={{
                fontSize: 'clamp(2.4rem, 6.4vw, 5.5rem)',
                textWrap: 'balance',
              }}
            >
              TECH STACK
            </h2>
          </FadeIn>

          {/* Interactive Filter Controls (Functional Segmented Buttons in Inter) */}
          <FadeIn delay={0.1} y={16}>
            <div
              role="group"
              aria-label="Filter technical categories"
              className="font-inter flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0C0C0C]/[0.05]"
            >
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-[#0C0C0C] text-white shadow-sm'
                    : 'text-[#0C0C0C]/70 hover:text-[#0C0C0C]'
                }`}
              >
                All Domains (6)
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-[#0C0C0C] text-white shadow-sm'
                      : 'text-[#0C0C0C]/70 hover:text-[#0C0C0C]'
                  }`}
                >
                  {cat.index}. {cat.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Numbered Vertical Typographic List Inspired by Reference Services Section */}
        <div className="divide-y divide-[#0C0C0C]/12">
          {visibleCategories.map((category, idx) => (
            <FadeIn key={category.id} delay={idx * 0.06} y={20}>
              <article className="group py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start hover:bg-[#0C0C0C]/[0.015] transition-colors px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-2xl">
                {/* Index + Category Title (Sora Secondary Heading) */}
                <div className="lg:col-span-5 flex items-baseline gap-5">
                  <span className="font-mono-tabular text-sm md:text-base font-semibold text-[#7621B0] shrink-0">
                    {category.index}.
                  </span>
                  <div>
                    <h3 className="font-sora text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#0C0C0C] group-hover:translate-x-1 transition-transform">
                      {category.title}
                    </h3>
                    <p className="font-inter mt-2 text-sm text-[#0C0C0C]/65 max-w-md leading-relaxed">
                      {category.summary}
                    </p>
                  </div>
                </div>

                {/* Unboxed Refined Typographic Skill Sequence (Inter) */}
                <div className="font-inter lg:col-span-7 lg:pl-6 flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
                  {category.skills.map((skill, sIdx) => (
                    <React.Fragment key={skill}>
                      <span className="text-base sm:text-lg md:text-xl font-semibold text-[#0C0C0C] tracking-tight">
                        {skill}
                      </span>
                      {sIdx < category.skills.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="text-[#0C0C0C]/30 font-light text-xl select-none"
                        >
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
