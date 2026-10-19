import React from 'react';

interface SceneFallbackProps {
  mode?: 'loading' | 'fallback';
}

export const SceneFallback: React.FC<SceneFallbackProps> = ({ mode = 'fallback' }) => {
  return (
    <div
      role="img"
      aria-label={
        mode === 'loading'
          ? 'Initializing 3D neural sculpture'
          : 'Animated geometric neural network structure'
      }
      data-testid="scene-fallback"
      className="w-full h-[290px] sm:h-[350px] lg:h-[390px] flex flex-col items-center justify-center relative z-10 select-none"
    >
      <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center animate-float-gentle">
        {/* Outer rotating orbital ring */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full animate-spin-slow"
          fill="none"
        >
          <defs>
            <linearGradient id="fallbackChrome" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#B600A8" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="162"
            stroke="url(#fallbackChrome)"
            strokeWidth="2"
            strokeDasharray="10 8"
            strokeOpacity="0.65"
          />
          <circle cx="200" cy="38" r="7" fill="#D7E2EA" />
          <circle cx="362" cy="200" r="6" fill="#B600A8" />
          <circle cx="38" cy="200" r="6" fill="#38BDF8" />
        </svg>

        {/* Counter-rotating inner gyroscopic structure */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full animate-spin-reverse-slow"
          fill="none"
        >
          <ellipse
            cx="200"
            cy="200"
            rx="145"
            ry="68"
            transform="rotate(-32 200 200)"
            stroke="#D7E2EA"
            strokeWidth="2.5"
            strokeOpacity="0.8"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="145"
            ry="68"
            transform="rotate(38 200 200)"
            stroke="#B600A8"
            strokeWidth="2"
            strokeOpacity="0.7"
          />
          <polygon
            points="200,88 296,144 296,256 200,312 104,256 104,144"
            stroke="#94A3B8"
            strokeWidth="2"
            fill="rgba(215, 226, 234, 0.04)"
          />
          <line x1="200" y1="88" x2="200" y2="312" stroke="#646973" strokeWidth="1.5" />
          <line x1="104" y1="144" x2="296" y2="256" stroke="#646973" strokeWidth="1.5" />
          <line x1="296" y1="144" x2="104" y2="256" stroke="#646973" strokeWidth="1.5" />
        </svg>

        {/* Central metallic neural core */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white via-[#94A3B8] to-[#3B0764] shadow-[0_0_45px_rgba(182,0,168,0.45)] border border-white/40" />
      </div>

      {mode === 'loading' && (
        <p className="mt-2 font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#D7E2EA]/60">
          Initializing 3D Neural Core...
        </p>
      )}
    </div>
  );
};
