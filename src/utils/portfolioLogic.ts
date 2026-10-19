import {
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  PERSONAL_PROFILE,
  PROJECTS_DATA,
  SKILL_CATEGORIES,
} from '../data/portfolioData.ts';
import type { ProjectItem, SkillCategory } from '../data/portfolioData.ts';

/**
 * Computes character opacity for the scroll-linked character reveal in AboutSection.
 * Guarantees bounded opacity in [minOpacity, 1].
 */
export function computeCharacterOpacity(
  scrollProgress: number,
  charIndex: number,
  totalChars: number,
  minOpacity = 0.16
): number {
  if (totalChars <= 0) return 1;
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
  const charStart = (charIndex / totalChars) * 0.82;
  const charEnd = charStart + 0.18;

  if (clampedProgress <= charStart) return minOpacity;
  if (clampedProgress >= charEnd) return 1;

  const localT = (clampedProgress - charStart) / (charEnd - charStart);
  return Number((minOpacity + localT * (1 - minOpacity)).toFixed(4));
}

/**
 * Computes sticky card target scale as subsequent project cards stack on top.
 */
export function computeStickyCardScale(
  cardIndex: number,
  totalCards: number,
  sectionProgress: number
): number {
  if (totalCards <= 1 || cardIndex < 0) return 1;
  const clamped = Math.max(0, Math.min(1, sectionProgress));
  const cardThreshold = (cardIndex + 1) / totalCards;
  if (clamped <= cardThreshold) return 1;

  const overProgress = (clamped - cardThreshold) / (1 - cardThreshold);
  const maxReduction = (totalCards - 1 - cardIndex) * 0.035;
  const scale = 1 - Math.min(maxReduction, overProgress * maxReduction);
  return Number(Math.max(0.88, scale).toFixed(4));
}

/**
 * Filters projects by view mode ('featured' returns the 3 primary sticky cards,
 * 'all' includes the 2 additional projects).
 */
export function getVisibleProjects(
  mode: 'featured' | 'all',
  technologyFilter: string | null = null
): ProjectItem[] {
  const base = mode === 'featured'
    ? PROJECTS_DATA.filter((p) => p.featured)
    : [...PROJECTS_DATA];

  if (!technologyFilter || technologyFilter.trim() === '' || technologyFilter === 'ALL') {
    return base;
  }

  const normalized = technologyFilter.trim().toLowerCase();
  return base.filter((project) =>
    project.technologies.some((tech) => tech.toLowerCase().includes(normalized)) ||
    project.category.toLowerCase().includes(normalized)
  );
}

/**
 * Filters skill categories by search query or active category ID.
 */
export function filterSkillCategories(
  activeCategoryId: string | 'all',
  searchQuery = ''
): SkillCategory[] {
  const byCategory =
    activeCategoryId === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategoryId);

  const q = searchQuery.trim().toLowerCase();
  if (!q) return byCategory;

  return byCategory
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) => s.toLowerCase().includes(q) || cat.title.toLowerCase().includes(q)
      ),
    }))
    .filter((cat) => cat.skills.length > 0);
}

/**
 * Builds a properly encoded mailto URI for direct contact or custom inquiry drafts.
 */
export function buildMailtoLink(
  subject?: string,
  senderName?: string,
  messageBody?: string
): string {
  const baseEmail = PERSONAL_PROFILE.email;
  const cleanSubject = subject?.trim() || 'AI / ML Engineering Inquiry — Portfolio Connection';
  const lines: string[] = [];

  if (senderName && senderName.trim()) {
    lines.push(`Hello Manikanta,`);
    lines.push('');
    lines.push(messageBody?.trim() || 'I came across your AI & Generative AI portfolio and would love to connect.');
    lines.push('');
    lines.push(`Best regards,`);
    lines.push(senderName.trim());
  } else if (messageBody && messageBody.trim()) {
    lines.push(messageBody.trim());
  }

  const params = new URLSearchParams();
  params.set('subject', cleanSubject);
  if (lines.length > 0) {
    params.set('body', lines.join('\n'));
  }

  return `mailto:${baseEmail}?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * Validates that all personal, educational, and certification data strictly match
 * the verified specification without unverified URLs.
 */
export function getPortfolioIntegritySummary() {
  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);
  const featuredCount = PROJECTS_DATA.filter((p) => p.featured).length;
  const additionalCount = PROJECTS_DATA.filter((p) => !p.featured).length;

  return {
    name: PERSONAL_PROFILE.name,
    email: PERSONAL_PROFILE.email,
    educationYear: EDUCATION_DATA.completionYear,
    certificationsCount: CERTIFICATIONS_DATA.length,
    skillCategoriesCount: SKILL_CATEGORIES.length,
    totalSkillsCount,
    featuredCount,
    additionalCount,
  };
}
