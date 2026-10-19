import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0C0C0C]/85 backdrop-blur-md border-b border-[#D7E2EA]/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark (Space Grotesk) */}
        <a
          href="#hero"
          className="font-space text-base md:text-lg font-bold tracking-[0.14em] uppercase text-white hover:text-[#D7E2EA] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
        >
          {PERSONAL_PROFILE.name}
        </a>

        {/* Zone 2: 4 Clean Single-Line Text Navigation Links (Space Grotesk small uppercase labels) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-10 lg:gap-12"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-space text-xs font-medium tracking-[0.22em] uppercase text-[#D7E2EA]/75 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#B600A8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Inter medium-weight button) */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href="#contact"
            className="font-inter inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase text-white bg-accent-gradient hover:opacity-95 transition-all shadow-[0_0_24px_rgba(182,0,168,0.3)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
          >
            <span>LET&apos;S CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2.5 text-[#D7E2EA] hover:text-white focus-visible:outline-2 focus-visible:outline-[#B600A8]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#0C0C0C]/95 backdrop-blur-lg border-b border-[#D7E2EA]/15 px-6 py-6 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="font-space text-sm font-semibold tracking-[0.2em] uppercase text-[#D7E2EA] hover:text-white py-2 border-b border-[#D7E2EA]/10"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="font-inter mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-medium tracking-[0.14em] uppercase text-white bg-accent-gradient"
          >
            <span>LET&apos;S CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>
      )}
    </header>
  );
};
