import React from 'react';
import { CERTIFICATIONS_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] py-24 md:py-36 border-t border-[#D7E2EA]/10 overflow-hidden"
    >
      {/* Subtle 3D Geometric Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-8 md:right-20 w-48 h-48 opacity-30 hidden lg:block animate-float-gentle"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow" fill="none">
          <polygon
            points="100,16 178,60 178,140 100,184 22,140 22,60"
            stroke="#BBCCD7"
            strokeWidth="1.5"
          />
          <polygon
            points="100,42 154,72 154,128 100,158 46,128 46,72"
            stroke="#B600A8"
            strokeWidth="1.5"
          />
          <line x1="100" y1="16" x2="100" y2="184" stroke="#646973" strokeWidth="1" />
          <line x1="22" y1="60" x2="178" y2="140" stroke="#646973" strokeWidth="1" />
          <line x1="178" y1="60" x2="22" y2="140" stroke="#646973" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 font-inter">
        <FadeIn y={24}>
          <p className="font-inter text-xs font-medium tracking-[0.22em] uppercase text-[#D7E2EA]/60 mb-3">
            ACADEMIC FOUNDATION &amp; PROFESSIONAL CREDENTIALS
          </p>
          <h2
            className="font-space font-bold uppercase tracking-[-0.035em] leading-[0.92] text-gradient-metallic"
            style={{
              fontSize: 'clamp(2.2rem, 5.8vw, 5.25rem)',
              textWrap: 'balance',
            }}
          >
            EDUCATION &amp; CERTIFICATIONS
          </h2>
        </FadeIn>

        {/* Education Feature Block */}
        <FadeIn delay={0.1} y={24} className="mt-14 md:mt-20">
          <div className="rounded-3xl bg-[#13151A] border border-[#D7E2EA]/14 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <p className="font-inter text-xs font-medium tracking-[0.18em] uppercase text-[#B600A8]">
                ACADEMIC QUALIFICATION
              </p>
              <div className="mt-3 font-space font-bold text-4xl sm:text-5xl text-gradient-metallic">
                {EDUCATION_DATA.completionYear}
              </div>
              <p className="mt-2 font-inter text-xs uppercase tracking-widest text-[#D7E2EA]/55">
                COMPLETION YEAR
              </p>
            </div>

            <div className="lg:col-span-8">
              <h3 className="font-sora font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white">
                {EDUCATION_DATA.degree}
              </h3>
              <p className="mt-2 font-inter text-lg sm:text-xl text-[#D7E2EA]/85 font-medium">
                {EDUCATION_DATA.institution}
              </p>

              <div className="mt-6 pt-6 border-t border-[#D7E2EA]/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EDUCATION_DATA.focusAreas.map((area) => (
                  <div
                    key={area}
                    className="font-inter text-sm text-[#D7E2EA]/75 flex items-baseline gap-2.5"
                  >
                    <span aria-hidden="true" className="text-[#B600A8] font-bold">
                      ·
                    </span>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Certifications Grid (6 Credentials from 2024) */}
        <div className="mt-16 md:mt-20">
          <FadeIn y={18}>
            <div className="flex items-baseline justify-between border-b border-[#D7E2EA]/12 pb-4 mb-8">
              <h3 className="font-sora text-lg sm:text-xl font-bold uppercase tracking-[0.12em] text-[#D7E2EA]">
                VERIFIED COURSEWORK &amp; CERTIFICATIONS
              </h3>
              <span className="font-mono-tabular text-xs text-[#D7E2EA]/55">
                06 CREDENTIALS · 2024
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <FadeIn key={cert.id} delay={idx * 0.06} y={20}>
                <article className="h-full rounded-2xl bg-[#121419] border border-[#D7E2EA]/12 p-6 sm:p-7 flex flex-col justify-between hover:border-[#D7E2EA]/35 transition-colors">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#D7E2EA]/55">
                      <span>{cert.issuer.toUpperCase()}</span>
                      <span>{cert.year}</span>
                    </div>
                    <h4 className="mt-4 font-sora font-bold text-lg sm:text-xl uppercase tracking-tight text-white leading-snug">
                      {cert.title}
                    </h4>
                  </div>

                  <p className="mt-6 pt-4 border-t border-[#D7E2EA]/8 font-inter text-xs font-medium tracking-wider uppercase text-[#D7E2EA]/60">
                    {cert.domain}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
