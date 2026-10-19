import React from 'react';
import { motion, MotionValue, useReducedMotion, useTransform } from 'motion/react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface StickyProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectDashboardVisual: React.FC<{
  visualType: ProjectItem['visualType'];
}> = ({ visualType }) => {
  switch (visualType) {
    case 'rag-hub':
      return (
        <div className="w-full h-full bg-[#0A0B0E] p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#D7E2EA]/10 pb-3 text-[11px] font-mono-tabular text-[#D7E2EA]/60">
            <span>RAG INSIGHTS WORKSPACE · PINECONE INDEX</span>
            <span>ILLUSTRATIVE PREVIEW</span>
          </div>

          <div className="grid grid-cols-12 gap-3 my-3 flex-1 items-stretch">
            {/* Conversational RAG Panel */}
            <div className="col-span-7 rounded-xl bg-[#12141A] border border-[#D7E2EA]/10 p-3.5 flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50">
                LangChain Query Synthesis
              </div>
              <div className="my-2 space-y-2">
                <div className="p-2 rounded-lg bg-[#1A1D26] text-[11px] text-[#D7E2EA]/85">
                  &ldquo;Summarize enterprise accounts with support escalations in Q3.&rdquo;
                </div>
                <div className="p-2.5 rounded-lg bg-[#22102B] border border-[#B600A8]/40 text-[11px] text-[#D7E2EA]">
                  <div className="font-semibold text-white mb-1">
                    Retrieved 14 Vector Chunks · Report Generated
                  </div>
                  <div className="text-[#D7E2EA]/75">
                    Automated synthesis reduced manual reporting workflow by 40% (project-reported).
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#D7E2EA]/50">
                <span>EMBEDDINGS: HUGGING FACE</span>
                <span>TOP-K: 5</span>
              </div>
            </div>

            {/* Vector Graph Visualization */}
            <div className="col-span-5 rounded-xl bg-[#12141A] border border-[#D7E2EA]/10 p-3 flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50">
                Semantic Node Graph
              </div>
              <svg viewBox="0 0 160 120" className="w-full h-28" fill="none" aria-hidden="true">
                <line x1="80" y1="60" x2="36" y2="30" stroke="#B600A8" strokeWidth="1.5" />
                <line x1="80" y1="60" x2="128" y2="34" stroke="#BBCCD7" strokeWidth="1.5" />
                <line x1="80" y1="60" x2="42" y2="94" stroke="#BBCCD7" strokeWidth="1.5" />
                <line x1="80" y1="60" x2="124" y2="92" stroke="#B600A8" strokeWidth="1.5" />
                <circle cx="80" cy="60" r="12" fill="#7621B0" stroke="#D7E2EA" strokeWidth="2" />
                <circle cx="36" cy="30" r="6" fill="#D7E2EA" />
                <circle cx="128" cy="34" r="6" fill="#B600A8" />
                <circle cx="42" cy="94" r="6" fill="#BBCCD7" />
                <circle cx="124" cy="92" r="6" fill="#D7E2EA" />
              </svg>
              <div className="text-[10px] font-mono-tabular text-[#D7E2EA]/60">
                COSINE SIMILARITY · 0.94
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/55 pt-2 border-t border-[#D7E2EA]/10">
            <span>Customer 360 Retrieval Architecture</span>
            <span className="font-mono-tabular">-40% Reporting Time (Reported)</span>
          </div>
        </div>
      );

    case 'vehicle-lpr':
      return (
        <div className="w-full h-full bg-[#0A0B0E] p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#D7E2EA]/10 pb-3 text-[11px] font-mono-tabular text-[#D7E2EA]/60">
            <span>YOLO + EASYOCR · VEHICLE &amp; PLATE PIPELINE</span>
            <span>ILLUSTRATIVE PREVIEW</span>
          </div>

          <div className="grid grid-cols-12 gap-3 my-3 flex-1 items-stretch">
            {/* CV Detection Viewport */}
            <div className="col-span-7 rounded-xl bg-[#11141B] border border-[#D7E2EA]/10 p-3.5 relative flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#D7E2EA]/60">
                <span>CAM_01 · LANE DETECTION</span>
                <span>CONF: 0.91</span>
              </div>

              <svg viewBox="0 0 220 110" className="w-full h-28 my-1" fill="none" aria-hidden="true">
                {/* Vehicle Bounding Box */}
                <rect
                  x="28"
                  y="14"
                  width="164"
                  height="82"
                  rx="4"
                  stroke="#BBCCD7"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  fill="rgba(215,226,234,0.03)"
                />
                {/* Vehicle Silhouette */}
                <path
                  d="M56 76 L68 38 H152 L164 76 Z"
                  fill="#1C212B"
                  stroke="#646973"
                  strokeWidth="1.5"
                />
                {/* License Plate OCR Bounding Box */}
                <rect
                  x="84"
                  y="56"
                  width="52"
                  height="16"
                  rx="2"
                  fill="#2B0E36"
                  stroke="#B600A8"
                  strokeWidth="2"
                />
                <text
                  x="110"
                  y="67"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  AP37·AI26
                </text>
              </svg>

              <div className="text-[10px] font-mono-tabular text-[#D7E2EA]/60">
                BBOX [28, 14, 192, 96] · CLASS: VEHICLE_SEDAN
              </div>
            </div>

            {/* OCR Readout Log */}
            <div className="col-span-5 rounded-xl bg-[#12141A] border border-[#D7E2EA]/10 p-3.5 flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50">
                EasyOCR Extraction Log
              </div>
              <div className="space-y-2 my-2 font-mono-tabular text-[11px]">
                <div className="p-2 rounded bg-[#1B1F29] border border-[#B600A8]/40 text-white">
                  PLATE: AP 37 AI 2026
                </div>
                <div className="p-2 rounded bg-[#161922] text-[#D7E2EA]/75">
                  PREPROCESS: BILATERAL + THRESH
                </div>
                <div className="p-2 rounded bg-[#161922] text-[#D7E2EA]/75">
                  REPORTED ACCURACY: 91%
                </div>
              </div>
              <div className="text-[10px] text-[#D7E2EA]/50">OpenCV + YOLO Pipeline</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/55 pt-2 border-t border-[#D7E2EA]/10">
            <span>Automated Vehicle &amp; Plate Recognition</span>
            <span className="font-mono-tabular">91% Accuracy (Reported)</span>
          </div>
        </div>
      );

    case 'fraud-churn':
      return (
        <div className="w-full h-full bg-[#0A0B0E] p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#D7E2EA]/10 pb-3 text-[11px] font-mono-tabular text-[#D7E2EA]/60">
            <span>XGBOOST · SCIKIT-LEARN · POWER BI TELEMETRY</span>
            <span>ILLUSTRATIVE PREVIEW</span>
          </div>

          <div className="grid grid-cols-12 gap-3 my-3 flex-1 items-stretch">
            <div className="col-span-7 rounded-xl bg-[#12141A] border border-[#D7E2EA]/10 p-3.5 flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50">
                Churn &amp; Anomaly Risk Distribution
              </div>
              <svg viewBox="0 0 220 100" className="w-full h-24 my-1" fill="none" aria-hidden="true">
                <line x1="16" y1="86" x2="204" y2="86" stroke="#646973" strokeWidth="1" />
                <rect x="28" y="52" width="22" height="34" rx="3" fill="#646973" />
                <rect x="62" y="38" width="22" height="48" rx="3" fill="#BBCCD7" />
                <rect x="96" y="22" width="22" height="64" rx="3" fill="#B600A8" />
                <rect x="130" y="44" width="22" height="42" rx="3" fill="#7621B0" />
                <rect x="164" y="30" width="22" height="56" rx="3" fill="#BE4C00" />
                <path
                  d="M28 48 C65 24, 110 18, 175 28"
                  stroke="#D7E2EA"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#D7E2EA]/65">
                <span>SQL FEATURE STORE</span>
                <span>ROC-AUC VALIDATED</span>
              </div>
            </div>

            <div className="col-span-5 rounded-xl bg-[#12141A] border border-[#D7E2EA]/10 p-3.5 flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50">
                Reported Model Outcomes
              </div>
              <div className="space-y-2.5 my-2">
                <div className="p-2.5 rounded-lg bg-[#1E1226] border border-[#B600A8]/35">
                  <div className="font-mono-tabular text-lg font-bold text-white">92%</div>
                  <div className="text-[10px] text-[#D7E2EA]/70">
                    Classification Accuracy (Reported)
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161922] border border-[#D7E2EA]/10">
                  <div className="font-mono-tabular text-lg font-bold text-[#D7E2EA]">15%</div>
                  <div className="text-[10px] text-[#D7E2EA]/70">
                    At-Risk Cohort Flagged (Reported)
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#D7E2EA]/50">Power BI Executive Views</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/55 pt-2 border-t border-[#D7E2EA]/10">
            <span>Fraud &amp; Customer Churn Intelligence</span>
            <span className="font-mono-tabular">92% Accuracy · 15% Cohort Flagged</span>
          </div>
        </div>
      );

    case 'face-emotion':
      return (
        <div className="w-full h-full bg-[#0A0B0E] p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#D7E2EA]/10 pb-3 text-[11px] font-mono-tabular text-[#D7E2EA]/60">
            <span>TENSORFLOW · OPENCV · DUAL-HEAD CNN</span>
            <span>ILLUSTRATIVE PREVIEW</span>
          </div>
          <div className="my-4 flex items-center justify-around gap-4">
            <svg viewBox="0 0 120 120" className="w-28 h-28" fill="none" aria-hidden="true">
              <polygon
                points="60,14 98,38 98,84 60,108 22,84 22,38"
                stroke="#BBCCD7"
                strokeWidth="1.5"
                fill="#141821"
              />
              <rect
                x="34"
                y="60"
                width="52"
                height="30"
                rx="6"
                fill="#271130"
                stroke="#B600A8"
                strokeWidth="1.8"
              />
              <circle cx="46" cy="46" r="4" fill="#D7E2EA" />
              <circle cx="74" cy="46" r="4" fill="#D7E2EA" />
            </svg>
            <div className="space-y-2 text-xs font-mono-tabular text-[#D7E2EA]/80">
              <div>MASK STATUS: COMPLIANT</div>
              <div>AFFECT: NEUTRAL / FOCUSED</div>
              <div className="text-white font-semibold">REPORTED ACCURACY: 94%</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/55 pt-2 border-t border-[#D7E2EA]/10">
            <span>Real-Time Face Mask &amp; Emotion Pipeline</span>
            <span className="font-mono-tabular">94% Accuracy (Reported)</span>
          </div>
        </div>
      );

    case 'zomato-suite':
    default:
      return (
        <div className="w-full h-full bg-[#0A0B0E] p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#D7E2EA]/10 pb-3 text-[11px] font-mono-tabular text-[#D7E2EA]/60">
            <span>DEEP LEARNING · SQL · POWER BI LOGISTICS</span>
            <span>ILLUSTRATIVE PREVIEW</span>
          </div>
          <div className="my-4 flex items-center justify-between gap-4 px-2">
            <svg viewBox="0 0 180 100" className="w-44 h-24" fill="none" aria-hidden="true">
              <path
                d="M20 80 Q65 20 110 55 T165 24"
                stroke="#B600A8"
                strokeWidth="2.5"
                fill="none"
              />
              <circle cx="20" cy="80" r="5" fill="#D7E2EA" />
              <circle cx="92" cy="44" r="5" fill="#B600A8" />
              <circle cx="165" cy="24" r="6" fill="#BE4C00" />
            </svg>
            <div className="space-y-1.5 text-xs font-mono-tabular text-[#D7E2EA]/80">
              <div className="text-white font-bold text-base">-12% DELIVERY TIME</div>
              <div>SQL Route &amp; Prep Analytics</div>
              <div>Project-Reported Outcome</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/55 pt-2 border-t border-[#D7E2EA]/10">
            <span>Zomato Intelligence Suite</span>
            <span className="font-mono-tabular">-12% Delivery Time (Reported)</span>
          </div>
        </div>
      );
  }
};

export const StickyProjectCard: React.FC<StickyProjectCardProps> = ({
  project,
  index,
  totalCards,
  scrollYProgress,
  onSelectProject,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const startScaleAt = index / totalCards;
  const targetScale = Math.max(0.9, 1 - (totalCards - 1 - index) * 0.035);
  const scale = useTransform(scrollYProgress, [startScaleAt, 1], [1, targetScale]);

  const stickyTopPx = 92 + index * 22;

  return (
    <div
      style={{ top: `${stickyTopPx}px` }}
      className="sticky w-full mb-12 md:mb-20 last:mb-0"
    >
      <motion.article
        style={{ scale: prefersReducedMotion ? 1 : scale }}
        className="w-full rounded-[2rem] md:rounded-[2.5rem] bg-[#13151A] border border-[#D7E2EA]/14 p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden transition-colors hover:border-[#D7E2EA]/28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Number, Category, Title, Description, Outcomes, Tech, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between font-inter">
            <div>
              {/* Top Row: Large Project Number (Space Grotesk) + Unboxed Category Label (Inter) */}
              <div className="flex items-baseline justify-between gap-4 border-b border-[#D7E2EA]/10 pb-4">
                <span className="font-space font-bold text-4xl sm:text-5xl text-gradient-metallic leading-none">
                  {project.number}
                </span>
                <span className="font-inter text-xs font-medium tracking-[0.2em] uppercase text-[#D7E2EA]/65">
                  {project.category}
                </span>
              </div>

              {/* Project Title (Sora secondary display heading) */}
              <h3 className="mt-6 font-sora font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[1.08] text-white">
                {project.title}
              </h3>

              {/* Description (Inter clean body text) */}
              <p className="mt-4 font-inter text-base sm:text-lg text-[#D7E2EA]/80 leading-relaxed">
                {project.description}
              </p>

              {/* Reported Project Outcomes (Unboxed Editorial List) */}
              <div className="mt-5 pt-4 border-t border-[#D7E2EA]/10">
                <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#D7E2EA]/50 mb-2">
                  PROJECT-REPORTED OUTCOMES
                </div>
                <ul className="space-y-1.5">
                  {project.reportedOutcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="text-sm font-medium text-[#D7E2EA] flex items-baseline gap-2.5"
                    >
                      <span aria-hidden="true" className="text-[#B600A8] font-bold">
                        —
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unboxed Technology Stack with Mid-Dot Separators */}
              <div className="mt-5 pt-4 border-t border-[#D7E2EA]/10">
                <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#D7E2EA]/50 mb-2">
                  TECHNOLOGIES
                </div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium text-[#D7E2EA]/90">
                  {project.technologies.map((tech, tIdx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {tIdx < project.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-[#D7E2EA]/35">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Actions (Inter medium-weight buttons) */}
            <div className="mt-8 pt-4 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="font-inter inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-medium tracking-[0.15em] uppercase text-white bg-accent-gradient hover:opacity-95 transition-all shadow-[0_0_24px_rgba(182,0,168,0.28)] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
              >
                <span>VIEW PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase text-[#D7E2EA] border border-[#D7E2EA]/25 hover:border-[#D7E2EA]/60 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>GITHUB REPOSITORY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Individual repository link not publicly published; visit GitHub profile for public code."
                  className="font-inter inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase text-[#D7E2EA]/40 border border-[#D7E2EA]/12 bg-[#0C0C0C]/50 cursor-not-allowed whitespace-nowrap shrink-0"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>GITHUB REPO UNAVAILABLE</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Interactive / Architectural Visual Preview */}
          <div className="lg:col-span-6 min-h-[270px] sm:min-h-[320px] rounded-2xl overflow-hidden border border-[#D7E2EA]/12 bg-[#0A0B0E] flex flex-col">
            <ProjectDashboardVisual visualType={project.visualType} />
          </div>
        </div>
      </motion.article>
    </div>
  );
};
