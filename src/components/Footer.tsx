import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0C0C0C] text-[#D7E2EA] border-t border-[#D7E2EA]/10 py-10 font-inter">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-space font-bold text-base uppercase tracking-[0.14em] text-white">
            {PERSONAL_PROFILE.name}
          </p>
          <p className="font-inter text-xs text-[#D7E2EA]/60 mt-0.5">
            AI Engineer / Generative AI Developer · {PERSONAL_PROFILE.location}
          </p>
        </div>

        <div className="font-space flex flex-wrap items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-[#D7E2EA]/75">
          <a
            href={PERSONAL_PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            GITHUB
          </a>
          <a
            href={PERSONAL_PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            LINKEDIN
          </a>
          <a
            href={`mailto:${PERSONAL_PROFILE.email}`}
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            EMAIL
          </a>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          <p className="text-xs text-[#D7E2EA]/50 font-mono-tabular">
            &copy; {currentYear} {PERSONAL_PROFILE.name}
          </p>

          <a
            href="#hero"
            aria-label="Scroll back to top"
            className="font-inter inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase text-[#D7E2EA] border border-[#D7E2EA]/15 hover:border-[#D7E2EA]/50 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
