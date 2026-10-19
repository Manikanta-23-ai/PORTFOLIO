import React, { useState } from 'react';
import { ArrowUpRight, Github, SlidersHorizontal } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/portfolioData';
import { FadeIn } from './FadeIn';
import { MagneticElement } from './MagneticElement';
import { NeuralMode, ThreeDHero } from './ThreeDHero';

export const HeroSection: React.FC = () => {
  const [neuralMode, setNeuralMode] = useState<NeuralMode>('lattice');
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [controlsOpen, setControlsOpen] = useState<boolean>(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA] pt-22 pb-8 md:pt-24 md:pb-10 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Ambient Background Radial Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 46%, rgba(118, 33, 176, 0.14) 0%, rgba(12, 12, 12, 0) 75%)',
        }}
      />

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between relative z-10">
        {/* Top Oversized Gradient Headline (Space Grotesk) */}
        <FadeIn y={20} duration={0.8} className="w-full pt-1 md:pt-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-inter text-[11px] font-medium tracking-[0.24em] uppercase text-[#D7E2EA]/60">
              AI ENGINEER · GENERATIVE AI DEVELOPER · DATA SCIENCE
            </span>
          </div>
          <h1
            className="font-space font-bold uppercase tracking-[-0.04em] leading-[0.9] text-gradient-metallic select-none text-center w-full"
            style={{
              fontSize: 'clamp(2.2rem, 7.6vw, 7.4rem)',
              textWrap: 'balance',
            }}
          >
            {PERSONAL_PROFILE.heroHeading}
          </h1>
        </FadeIn>

        {/* Center 3D Neural Metallic Sculpture */}
        <FadeIn
          delay={0.12}
          duration={0.9}
          y={16}
          className="relative my-auto py-1 flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-[660px] mx-auto">
            <ThreeDHero activeMode={neuralMode} explodedFactor={explodedFactor} />
          </div>

          {/* Discreet Collapsible 3D Topology Control Bar (Bottom-Centered, Zero Viewport Occlusion) */}
          <div className="mt-1 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setControlsOpen((prev) => !prev)}
              aria-expanded={controlsOpen}
              className="font-inter inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[0.14em] uppercase text-[#D7E2EA]/75 hover:text-white border border-[#D7E2EA]/15 bg-[#141418]/90 backdrop-blur-sm transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>{controlsOpen ? 'Hide 3D Core Controls' : 'Inspect 3D Neural Core'}</span>
            </button>

            {controlsOpen && (
              <div className="font-inter mt-2.5 px-4 py-2.5 rounded-2xl bg-[#141418]/95 border border-[#D7E2EA]/15 flex flex-wrap items-center justify-center gap-4 text-xs shadow-2xl">
                <div className="flex items-center gap-1.5" role="group" aria-label="3D Neural Topology">
                  {(['lattice', 'transformer', 'rag'] as NeuralMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setNeuralMode(mode)}
                      className={`px-3 py-1 rounded-lg uppercase tracking-wider text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        neuralMode === mode
                          ? 'bg-accent-gradient text-white'
                          : 'text-[#D7E2EA]/70 hover:text-white bg-[#0C0C0C]'
                      }`}
                    >
                      {mode === 'lattice'
                        ? 'Neural Lattice'
                        : mode === 'transformer'
                          ? 'Attention Ring'
                          : 'RAG Cluster'}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#D7E2EA]/80 whitespace-nowrap">
                  <span>Layer Spread</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={explodedFactor}
                    onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
                    aria-label="Exploded layer spread"
                    className="w-24 accent-[#B600A8] cursor-pointer"
                  />
                </label>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Bottom Split Row: Lower-Left Subtitle (Sora + Inter) + Lower-Right Primary & Secondary CTAs */}
        <div className="w-full pt-4 border-t border-[#D7E2EA]/12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <FadeIn delay={0.22} y={18} className="max-w-lg">
            <p className="font-sora text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-white tracking-tight">
              &ldquo;{PERSONAL_PROFILE.heroSubtitle}&rdquo;
            </p>
            <p className="font-inter mt-2 text-xs sm:text-sm font-normal leading-relaxed text-[#D7E2EA]/70">
              Architecting Retrieval-Augmented Generation pipelines, real-time Computer Vision systems, and predictive ML models.
            </p>
            <p className="font-inter mt-1.5 text-[11px] font-medium tracking-[0.16em] uppercase text-[#D7E2EA]/50">
              {PERSONAL_PROFILE.location} · Diploma in CSE (2026)
            </p>
          </FadeIn>

          <FadeIn
            delay={0.3}
            y={18}
            className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-start md:justify-end"
          >
            <MagneticElement strength={0.22}>
              <a
                href="#contact"
                className="font-inter inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-white bg-accent-gradient hover:opacity-95 transition-all shadow-[0_0_28px_rgba(182,0,168,0.35)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
              >
                <span>LET&apos;S CONNECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticElement>

            <MagneticElement strength={0.18}>
              <a
                href={PERSONAL_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile of Manikanta Banavathu"
                className="font-inter inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-[#D7E2EA] border border-[#D7E2EA]/25 hover:border-white hover:text-white bg-[#131519]/90 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
            </MagneticElement>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
