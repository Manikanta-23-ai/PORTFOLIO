import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO, MarqueeTile } from '../data/portfolioData';

const TileIllustration: React.FC<{ kind: MarqueeTile['visualKind'] }> = ({ kind }) => {
  switch (kind) {
    case 'neural-graph':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <g stroke="#646973" strokeOpacity="0.45" strokeWidth="1.2">
            <line x1="65" y1="35" x2="175" y2="50" />
            <line x1="65" y1="35" x2="175" y2="85" />
            <line x1="65" y1="80" x2="175" y2="50" />
            <line x1="65" y1="80" x2="175" y2="115" />
            <line x1="65" y1="125" x2="175" y2="85" />
            <line x1="65" y1="125" x2="175" y2="115" />
            <line x1="175" y1="50" x2="290" y2="65" stroke="#B600A8" strokeOpacity="0.7" />
            <line x1="175" y1="85" x2="290" y2="65" />
            <line x1="175" y1="85" x2="290" y2="105" stroke="#B600A8" strokeOpacity="0.7" />
            <line x1="175" y1="115" x2="290" y2="105" />
          </g>
          {[35, 80, 125].map((cy, i) => (
            <circle key={`l1-${i}`} cx="65" cy={cy} r="9" fill="#1D2026" stroke="#BBCCD7" strokeWidth="2" />
          ))}
          {[50, 85, 115].map((cy, i) => (
            <circle
              key={`l2-${i}`}
              cx="175"
              cy={cy}
              r="11"
              fill={i === 1 ? '#B600A8' : '#1D2026'}
              stroke="#D7E2EA"
              strokeWidth="2"
            />
          ))}
          {[65, 105].map((cy, i) => (
            <circle key={`l3-${i}`} cx="290" cy={cy} r="10" fill="#7621B0" stroke="#D7E2EA" strokeWidth="2" />
          ))}
        </svg>
      );

    case 'rag-architecture':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <rect x="28" y="38" width="76" height="84" rx="8" fill="#15181E" stroke="#646973" strokeWidth="1.5" />
          <line x1="42" y1="58" x2="90" y2="58" stroke="#BBCCD7" strokeWidth="2" />
          <line x1="42" y1="74" x2="84" y2="74" stroke="#646973" strokeWidth="2" />
          <line x1="42" y1="90" x2="88" y2="90" stroke="#646973" strokeWidth="2" />
          <path d="M106 80 H142" stroke="#B600A8" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="180,36 222,60 222,100 180,124 138,100 138,60" fill="#1A1224" stroke="#B600A8" strokeWidth="1.8" />
          <circle cx="180" cy="80" r="14" fill="#7621B0" fillOpacity="0.4" stroke="#D7E2EA" strokeWidth="1.5" />
          <path d="M224 80 H256" stroke="#BBCCD7" strokeWidth="2" />
          <rect x="256" y="44" width="78" height="72" rx="10" fill="#15181E" stroke="#D7E2EA" strokeWidth="1.5" />
          <path d="M270 68 H318 M270 84 H308 M270 98 H296" stroke="#BBCCD7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'cv-detection':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <rect x="34" y="28" width="170" height="104" rx="8" fill="#13161B" stroke="#646973" strokeDasharray="5 3" strokeWidth="1.5" />
          <path d="M34 46 V28 H52 M186 28 H204 V46 M34 114 V132 H52 M186 132 H204 V114" stroke="#B600A8" strokeWidth="2.5" />
          <rect x="64" y="64" width="110" height="40" rx="6" fill="#1E232B" stroke="#BBCCD7" strokeWidth="1.5" />
          <rect x="88" y="82" width="62" height="16" rx="3" fill="#2A0F33" stroke="#B600A8" strokeWidth="1.5" />
          <rect x="224" y="38" width="106" height="84" rx="8" fill="#14171D" stroke="#646973" strokeWidth="1.2" />
          <line x1="238" y1="60" x2="312" y2="60" stroke="#D7E2EA" strokeWidth="2.5" />
          <line x1="238" y1="80" x2="298" y2="80" stroke="#B600A8" strokeWidth="2.5" />
          <line x1="238" y1="100" x2="306" y2="100" stroke="#646973" strokeWidth="2" />
        </svg>
      );

    case 'genai-console':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <rect x="32" y="26" width="296" height="108" rx="12" fill="#121419" stroke="#646973" strokeWidth="1.5" />
          <rect x="48" y="44" width="140" height="22" rx="6" fill="#1D212A" />
          <rect x="110" y="76" width="198" height="40" rx="8" fill="#23122B" stroke="#B600A8" strokeWidth="1.2" />
          <line x1="126" y1="92" x2="284" y2="92" stroke="#D7E2EA" strokeWidth="2" />
          <line x1="126" y1="104" x2="236" y2="104" stroke="#BBCCD7" strokeWidth="1.5" />
        </svg>
      );

    case 'vector-search':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <circle cx="180" cy="80" r="56" stroke="#646973" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx="180" cy="80" r="32" stroke="#B600A8" strokeOpacity="0.6" />
          <line x1="180" y1="80" x2="215" y2="54" stroke="#D7E2EA" strokeWidth="1.6" />
          <line x1="180" y1="80" x2="146" y2="62" stroke="#D7E2EA" strokeWidth="1.6" />
          <line x1="180" y1="80" x2="196" y2="112" stroke="#B600A8" strokeWidth="1.6" />
          <circle cx="180" cy="80" r="7" fill="#B600A8" />
          <circle cx="215" cy="54" r="5" fill="#D7E2EA" />
          <circle cx="146" cy="62" r="5" fill="#D7E2EA" />
          <circle cx="196" cy="112" r="5" fill="#BBCCD7" />
          <circle cx="105" cy="110" r="4" fill="#646973" />
          <circle cx="262" cy="96" r="4" fill="#646973" />
        </svg>
      );

    case 'agent-workflow':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <rect x="135" y="22" width="90" height="32" rx="8" fill="#23112B" stroke="#B600A8" strokeWidth="1.5" />
          <rect x="44" y="96" width="84" height="36" rx="8" fill="#15181F" stroke="#BBCCD7" strokeWidth="1.5" />
          <rect x="138" y="96" width="84" height="36" rx="8" fill="#15181F" stroke="#BBCCD7" strokeWidth="1.5" />
          <rect x="232" y="96" width="84" height="36" rx="8" fill="#15181F" stroke="#BBCCD7" strokeWidth="1.5" />
          <path d="M180 54 V75 M180 75 H86 V96 M180 75 V96 M180 75 H274 V96" stroke="#646973" strokeWidth="1.6" />
        </svg>
      );

    case 'data-dashboard':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <path d="M36 126 H324" stroke="#646973" strokeWidth="1.5" />
          <rect x="56" y="78" width="28" height="48" rx="4" fill="#646973" />
          <rect x="104" y="54" width="28" height="72" rx="4" fill="#BBCCD7" />
          <rect x="152" y="38" width="28" height="88" rx="4" fill="#B600A8" />
          <rect x="200" y="64" width="28" height="62" rx="4" fill="#7621B0" />
          <path d="M56 72 C104 42, 160 32, 224 58 C264 74, 290 40, 316 30" stroke="#D7E2EA" strokeWidth="2.5" fill="none" />
        </svg>
      );

    case 'python-pipeline':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          {[42, 140, 238].map((x, idx) => (
            <g key={x}>
              <rect
                x={x}
                y="48"
                width="80"
                height="64"
                rx="10"
                fill="#15181E"
                stroke={idx === 1 ? '#B600A8' : '#BBCCD7'}
                strokeWidth="1.6"
              />
              <circle cx={x + 40} cy="80" r="12" stroke="#D7E2EA" strokeWidth="1.5" />
            </g>
          ))}
          <line x1="122" y1="80" x2="140" y2="80" stroke="#B600A8" strokeWidth="2" />
          <line x1="220" y1="80" x2="238" y2="80" stroke="#B600A8" strokeWidth="2" />
        </svg>
      );

    case 'ml-telemetry':
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <polygon points="110,32 156,58 156,108 110,132 64,108 64,58" stroke="#BBCCD7" strokeWidth="1.6" fill="#151920" />
          <polygon points="110,48 140,66 140,98 110,116 80,98 80,66" stroke="#B600A8" strokeWidth="1.4" />
          <rect x="190" y="42" width="132" height="12" rx="6" fill="#1F242D" />
          <rect x="190" y="42" width="118" height="12" rx="6" fill="#B600A8" />
          <rect x="190" y="72" width="132" height="12" rx="6" fill="#1F242D" />
          <rect x="190" y="72" width="96" height="12" rx="6" fill="#BBCCD7" />
          <rect x="190" y="102" width="132" height="12" rx="6" fill="#1F242D" />
          <rect x="190" y="102" width="110" height="12" rx="6" fill="#7621B0" />
        </svg>
      );

    case 'compute-cluster':
    default:
      return (
        <svg viewBox="0 0 360 160" className="w-full h-full" fill="none" aria-hidden="true">
          <rect x="48" y="34" width="264" height="24" rx="6" fill="#161920" stroke="#646973" strokeWidth="1.5" />
          <rect x="48" y="68" width="264" height="24" rx="6" fill="#1C1424" stroke="#B600A8" strokeWidth="1.5" />
          <rect x="48" y="102" width="264" height="24" rx="6" fill="#161920" stroke="#646973" strokeWidth="1.5" />
          <line x1="72" y1="46" x2="180" y2="46" stroke="#BBCCD7" strokeWidth="3" />
          <line x1="72" y1="80" x2="230" y2="80" stroke="#D7E2EA" strokeWidth="3" />
          <line x1="72" y1="114" x2="156" y2="114" stroke="#BBCCD7" strokeWidth="3" />
        </svg>
      );
  }
};

const MarqueeCard: React.FC<{ tile: MarqueeTile }> = ({ tile }) => (
  <article className="w-[300px] sm:w-[360px] h-[215px] sm:h-[235px] shrink-0 rounded-2xl bg-[#121317] border border-[#D7E2EA]/12 p-5 flex flex-col justify-between select-none hover:border-[#D7E2EA]/30 transition-colors">
    <div className="flex items-center justify-between gap-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#D7E2EA]/60">
      <span className="truncate">{tile.category}</span>
      <span className="text-[#D7E2EA]/40 shrink-0">SYSTEM VISUAL</span>
    </div>

    <div className="my-1 h-[112px] w-full rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/8 overflow-hidden flex items-center justify-center">
      <TileIllustration kind={tile.visualKind} />
    </div>

    <div>
      <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#D7E2EA] truncate">
        {tile.title}
      </h3>
      <p className="text-xs text-[#D7E2EA]/55 truncate">{tile.caption}</p>
    </div>
  </article>
);

export const TechMarquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // First row moves right as visitor scrolls; second row moves left
  const rowOneX = useTransform(scrollYProgress, [0, 1], ['-18%', '4%']);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], ['4%', '-18%']);

  const repeatedRowOne = [...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE];
  const repeatedRowTwo = [...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO];

  return (
    <section
      ref={sectionRef}
      aria-label="AI and Software Engineering Architecture Visuals"
      className="relative w-full py-16 md:py-24 bg-[#0C0C0C] overflow-hidden border-b border-[#D7E2EA]/8"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D7E2EA]/60">
          DOMAINS · ARCHITECTURES · INTELLIGENT WORKFLOWS
        </p>
        <p className="text-xs text-[#D7E2EA]/45">
          Illustrative AI/ML system diagrams &amp; computational workflows
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Row 1: Moves Right on Scroll */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x: prefersReducedMotion ? '0%' : rowOneX }}
            className="flex items-center gap-6 will-change-transform px-6"
          >
            {repeatedRowOne.map((tile, idx) => (
              <MarqueeCard key={`${tile.id}-r1-${idx}`} tile={tile} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moves Left on Scroll */}
        <div className="w-full overflow-hidden">
          <motion.div
            style={{ x: prefersReducedMotion ? '0%' : rowTwoX }}
            className="flex items-center gap-6 will-change-transform px-6"
          >
            {repeatedRowTwo.map((tile, idx) => (
              <MarqueeCard key={`${tile.id}-r2-${idx}`} tile={tile} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
