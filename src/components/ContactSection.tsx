import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/portfolioData';
import { buildMailtoLink } from '../utils/portfolioLogic';
import { FadeIn } from './FadeIn';
import { MagneticElement } from './MagneticElement';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [draftPrepared, setDraftPrepared] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrepareMailto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) {
      setValidationError('Please enter a brief message before opening your email draft.');
      return;
    }
    setValidationError('');
    setDraftPrepared(true);
    const mailtoUri = buildMailtoLink(subject, senderName, message);
    window.location.href = mailtoUri;
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] py-28 md:py-36 border-t border-[#D7E2EA]/12 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 font-inter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Headline, Supporting Copy, and Direct Profile Links */}
          <div className="lg:col-span-7">
            <FadeIn y={24}>
              <p className="font-inter text-xs font-medium tracking-[0.22em] uppercase text-[#D7E2EA]/60 mb-4">
                GET IN TOUCH · COLLABORATIONS &amp; OPPORTUNITIES
              </p>
              <h2
                className="font-space font-bold uppercase tracking-[-0.035em] leading-[0.92] text-gradient-metallic"
                style={{
                  fontSize: 'clamp(2.3rem, 6.2vw, 5.4rem)',
                  textWrap: 'balance',
                }}
              >
                LET&apos;S BUILD SOMETHING INTELLIGENT.
              </h2>
            </FadeIn>

            <FadeIn delay={0.1} y={20}>
              <p className="font-inter mt-8 text-lg sm:text-xl md:text-2xl text-[#D7E2EA]/85 max-w-2xl leading-relaxed">
                Interested in AI, machine learning, Generative AI, or building useful software?
                Let&apos;s connect and explore what we can create.
              </p>
            </FadeIn>

            {/* Primary Email & Copy Action */}
            <FadeIn delay={0.2} y={20} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticElement strength={0.2}>
                <a
                  href={`mailto:${PERSONAL_PROFILE.email}`}
                  className="font-inter inline-flex items-center gap-3 px-7 py-4 rounded-full text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-white bg-accent-gradient hover:opacity-95 transition-all shadow-[0_0_28px_rgba(182,0,168,0.3)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B600A8]"
                >
                  <Mail className="w-4 h-4" />
                  <span>{PERSONAL_PROFILE.email}</span>
                </a>
              </MagneticElement>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
                className="font-inter inline-flex items-center gap-2 px-5 py-4 rounded-full text-xs font-medium tracking-[0.14em] uppercase text-[#D7E2EA] border border-[#D7E2EA]/20 hover:border-[#D7E2EA]/60 bg-[#13151A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>EMAIL COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </FadeIn>

            {/* External Profile Links */}
            <FadeIn
              delay={0.28}
              y={20}
              className="mt-10 pt-8 border-t border-[#D7E2EA]/12 flex flex-wrap items-center gap-6"
            >
              <a
                href={PERSONAL_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-space inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#D7E2EA] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB PROFILE</span>
                <ArrowUpRight className="w-4 h-4 text-[#B600A8]" />
              </a>

              <a
                href={PERSONAL_PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-space inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#D7E2EA] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN PROFILE</span>
                <ArrowUpRight className="w-4 h-4 text-[#B600A8]" />
              </a>
            </FadeIn>
          </div>

          {/* Right Column: Direct Mailto Draft Composer (Never discards submissions silently) */}
          <FadeIn delay={0.2} y={24} className="lg:col-span-5 w-full">
            <form
              onSubmit={handlePrepareMailto}
              noValidate
              className="rounded-3xl bg-[#13151A] border border-[#D7E2EA]/14 p-7 sm:p-9 space-y-5"
            >
              <div>
                <h3 className="font-sora font-bold text-xl uppercase tracking-tight text-white">
                  COMPOSE DIRECT EMAIL DRAFT
                </h3>
                <p className="mt-1 text-xs text-[#D7E2EA]/60">
                  Opens your default email client pre-addressed to{' '}
                  <span className="text-[#D7E2EA]">{PERSONAL_PROFILE.email}</span>.
                </p>
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold tracking-wider uppercase text-[#D7E2EA]/75 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/15 px-4 py-3 text-sm text-white placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#B600A8]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold tracking-wider uppercase text-[#D7E2EA]/75 mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="AI / ML Engineering Opportunity"
                  className="w-full rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/15 px-4 py-3 text-sm text-white placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#B600A8]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold tracking-wider uppercase text-[#D7E2EA]/75 mb-2"
                >
                  Message <span className="text-[#B600A8]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="Share project details, role information, or collaboration ideas..."
                  className="w-full rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/15 px-4 py-3 text-sm text-white placeholder:text-[#D7E2EA]/35 focus:outline-none focus:border-[#B600A8] resize-none"
                />
                {validationError && (
                  <p role="alert" className="mt-2 text-xs text-rose-400">
                    {validationError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-xs font-bold tracking-[0.16em] uppercase text-white bg-accent-gradient hover:opacity-95 transition-opacity cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>OPEN IN EMAIL CLIENT</span>
              </button>

              {draftPrepared && (
                <p role="status" className="text-xs text-emerald-400 text-center">
                  Email draft prepared for {PERSONAL_PROFILE.email}.
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
