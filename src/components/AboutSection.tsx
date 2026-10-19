import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/portfolioData';
import { AnimatedText } from './AnimatedText';
import { FadeIn } from './FadeIn';
import { MagneticElement } from './MagneticElement';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA] py-28 md:py-36 flex items-center justify-center overflow-hidden"
    >
      {/* Four Continuously Animated 3D-Inspired Computational Corner Objects */}
      {/* Top-Left: Neural Graph Tetrahedron */}
      <div
        aria-hidden="true"
        className="hidden sm:flex pointer-events-none absolute top-14 left-8 md:left-16 w-28 h-28 md:w-36 md:h-36 items-center justify-center opacity-65 animate-float-gentle"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow" fill="none">
          <defs>
            <linearGradient id="cornerMetal1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#B600A8" />
            </linearGradient>
          </defs>
          <polygon
            points="60,12 106,88 14,88"
            stroke="url(#cornerMetal1)"
            strokeWidth="2"
            fill="rgba(215,226,234,0.04)"
          />
          <line x1="60" y1="12" x2="60" y2="62" stroke="#BBCCD7" strokeWidth="1.5" />
          <line x1="14" y1="88" x2="60" y2="62" stroke="#BBCCD7" strokeWidth="1.5" />
          <line x1="106" y1="88" x2="60" y2="62" stroke="#B600A8" strokeWidth="1.5" />
          <circle cx="60" cy="62" r="5" fill="#D7E2EA" />
        </svg>
      </div>

      {/* Top-Right: Data Structure Gyroscopic Torus Lattice */}
      <div
        aria-hidden="true"
        className="hidden sm:flex pointer-events-none absolute top-14 right-8 md:right-16 w-28 h-28 md:w-36 md:h-36 items-center justify-center opacity-65 animate-float-gentle"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-reverse-slow" fill="none">
          <circle
            cx="60"
            cy="60"
            r="42"
            stroke="#BBCCD7"
            strokeWidth="2"
            strokeDasharray="8 5"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="44"
            ry="18"
            transform="rotate(35 60 60)"
            stroke="#B600A8"
            strokeWidth="2"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="44"
            ry="18"
            transform="rotate(-35 60 60)"
            stroke="#38BDF8"
            strokeWidth="1.8"
          />
          <circle cx="60" cy="60" r="8" fill="#7621B0" stroke="#D7E2EA" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom-Left: Computational Geometry Octahedron */}
      <div
        aria-hidden="true"
        className="hidden sm:flex pointer-events-none absolute bottom-14 left-8 md:left-16 w-28 h-28 md:w-36 md:h-36 items-center justify-center opacity-65 animate-float-gentle"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-reverse-slow" fill="none">
          <polygon
            points="60,10 104,60 60,110 16,60"
            stroke="#BBCCD7"
            strokeWidth="2"
            fill="rgba(182,0,168,0.06)"
          />
          <line x1="16" y1="60" x2="104" y2="60" stroke="#646973" strokeWidth="1.5" />
          <line x1="60" y1="10" x2="60" y2="110" stroke="#B600A8" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="4.5" fill="#38BDF8" />
        </svg>
      </div>

      {/* Bottom-Right: ML Tensor Matrix Cube */}
      <div
        aria-hidden="true"
        className="hidden sm:flex pointer-events-none absolute bottom-14 right-8 md:right-16 w-28 h-28 md:w-36 md:h-36 items-center justify-center opacity-65 animate-float-gentle"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow" fill="none">
          <polygon
            points="60,16 100,38 100,82 60,104 20,82 20,38"
            stroke="#D7E2EA"
            strokeWidth="2"
            fill="rgba(215,226,234,0.04)"
          />
          <polyline points="20,38 60,60 100,38" stroke="#B600A8" strokeWidth="1.8" />
          <line x1="60" y1="60" x2="60" y2="104" stroke="#BBCCD7" strokeWidth="1.8" />
          <circle cx="60" cy="60" r="5" fill="#B600A8" />
        </svg>
      </div>

      {/* Centered Editorial Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 flex flex-col items-center">
        <FadeIn y={24}>
          <p className="font-inter text-xs font-medium tracking-[0.22em] uppercase text-[#D7E2EA]/55 mb-3">
            ENGINEERING PROFILE · AI &amp; MACHINE LEARNING
          </p>
          <h2
            className="font-space font-bold uppercase tracking-[-0.035em] leading-[0.92] text-gradient-metallic"
            style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5.75rem)',
              textWrap: 'balance',
            }}
          >
            ABOUT ME
          </h2>
        </FadeIn>

        <div className="mt-10 md:mt-14 max-w-3xl">
          <AnimatedText
            text={PERSONAL_PROFILE.aboutCopy}
            className="font-sora text-lg sm:text-xl md:text-2xl font-medium leading-[1.6] text-[#D7E2EA] tracking-tight"
          />
        </div>

        {/* Location & Academic Summary Line (Inter compact uppercase metadata) */}
        <FadeIn delay={0.15} y={16} className="mt-8">
          <p className="font-inter text-xs font-medium tracking-[0.18em] uppercase text-[#D7E2EA]/60">
            {PERSONAL_PROFILE.location}
            <span aria-hidden="true" className="mx-3">
              ·
            </span>
            <span>AANM &amp; VVRSR Polytechnic (CSE, 2026)</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.25} y={20} className="mt-10 md:mt-12">
          <MagneticElement strength={0.22}>
            <a
              href="#projects"
              className="font-inter inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-medium tracking-[0.15em] uppercase text-white bg-accent-gradient hover:opacity-95 transition-all shadow-[0_0_28px_rgba(182,0,168,0.3)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
            >
              <span>EXPLORE MY PROJECTS</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
          </MagneticElement>
        </FadeIn>
      </div>
    </section>
  );
};
