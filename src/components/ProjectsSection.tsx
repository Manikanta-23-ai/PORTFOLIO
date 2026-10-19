import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from 'motion/react';
import { Github, X } from 'lucide-react';
import { PERSONAL_PROFILE, ProjectItem } from '../data/portfolioData';
import { getVisibleProjects } from '../utils/portfolioLogic';
import { FadeIn } from './FadeIn';
import { ProjectDashboardVisual, StickyProjectCard } from './StickyProjectCard';

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const visibleProjects = getVisibleProjects(viewMode);

  // Close project modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[2.75rem] md:rounded-t-[4rem] -mt-10 pt-24 pb-28 md:pt-32 md:pb-36 z-30 border-t border-[#D7E2EA]/10"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Heading & View Mode Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
          <FadeIn y={24}>
            <p className="font-inter text-xs font-medium tracking-[0.22em] uppercase text-[#D7E2EA]/60 mb-3">
              APPLIED AI · RAG · COMPUTER VISION · PREDICTIVE ANALYTICS
            </p>
            <h2
              className="font-space font-bold uppercase tracking-[-0.035em] leading-[0.92] text-gradient-metallic"
              style={{
                fontSize: 'clamp(2.4rem, 6.4vw, 5.5rem)',
                textWrap: 'balance',
              }}
            >
              SELECTED PROJECTS
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={16}>
            <div
              role="group"
              aria-label="Project archive toggle"
              className="font-inter inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[#15171D] border border-[#D7E2EA]/12"
            >
              <button
                type="button"
                onClick={() => setViewMode('featured')}
                className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'featured'
                    ? 'bg-accent-gradient text-white'
                    : 'text-[#D7E2EA]/70 hover:text-white'
                }`}
              >
                Selected Works (3)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'all'
                    ? 'bg-accent-gradient text-white'
                    : 'text-[#D7E2EA]/70 hover:text-white'
                }`}
              >
                Full Project Archive (5)
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Sticky-Stacking Project Cards Container */}
        <div ref={containerRef} className="relative">
          {visibleProjects.map((project, idx) => (
            <StickyProjectCard
              key={project.id}
              project={project}
              index={idx}
              totalCards={visibleProjects.length}
              scrollYProgress={scrollYProgress}
              onSelectProject={(item) => setSelectedProject(item)}
            />
          ))}
        </div>
      </div>

      {/* Project Architecture & Case Study Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="font-inter w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#14161C] border border-[#D7E2EA]/20 p-6 sm:p-10 text-[#D7E2EA] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#D7E2EA]/12 pb-5">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#B600A8]">
                  PROJECT {selectedProject.number} · {selectedProject.category}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1 font-sora font-bold text-2xl sm:text-3xl uppercase text-white"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close project details modal"
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full text-[#D7E2EA]/70 hover:text-white hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6 h-64 rounded-2xl overflow-hidden border border-[#D7E2EA]/12">
              <ProjectDashboardVisual visualType={selectedProject.visualType} />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold tracking-[0.16em] uppercase text-[#D7E2EA]/55 mb-2">
                  OVERVIEW
                </h4>
                <p className="text-base text-[#D7E2EA]/90 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-[0.16em] uppercase text-[#D7E2EA]/55 mb-2">
                  SYSTEM ARCHITECTURE &amp; IMPLEMENTATION
                </h4>
                <ul className="space-y-2">
                  {selectedProject.architectureHighlights.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[#D7E2EA]/85 flex items-baseline gap-2.5"
                    >
                      <span aria-hidden="true" className="text-[#B600A8] font-bold">
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-[0.16em] uppercase text-[#D7E2EA]/55 mb-2">
                  REPORTED PROJECT OUTCOMES
                </h4>
                <ul className="space-y-1.5">
                  {selectedProject.reportedOutcomes.map((outcome) => (
                    <li key={outcome} className="text-sm font-semibold text-white">
                      {outcome}
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs text-[#D7E2EA]/50">
                  Note: Figures reflect project-reported evaluation outcomes rather than external third-party benchmarks.
                </p>
              </div>

              <div className="pt-4 border-t border-[#D7E2EA]/12 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#D7E2EA]/70">
                  Stack: {selectedProject.technologies.join(' · ')}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL_PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#D7E2EA] border border-[#D7E2EA]/25 hover:border-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Visit GitHub Profile</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-accent-gradient cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
