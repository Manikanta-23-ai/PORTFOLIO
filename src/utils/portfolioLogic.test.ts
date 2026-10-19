import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoLink,
  computeCharacterOpacity,
  computeStickyCardScale,
  filterSkillCategories,
  getPortfolioIntegritySummary,
  getVisibleProjects,
} from './portfolioLogic.ts';

test('portfolio integrity matches exact Manikanta Banavathu specification', () => {
  const summary = getPortfolioIntegritySummary();
  assert.equal(summary.name, 'Manikanta Banavathu');
  assert.equal(summary.email, 'banavathumanikanta23@gmail.com');
  assert.equal(summary.educationYear, '2026');
  assert.equal(summary.certificationsCount, 6);
  assert.equal(summary.skillCategoriesCount, 6);
  assert.equal(summary.totalSkillsCount, 26);
  assert.equal(summary.featuredCount, 3);
  assert.equal(summary.additionalCount, 2);
});

test('computeCharacterOpacity transitions smoothly from minOpacity to 1', () => {
  const startOpacity = computeCharacterOpacity(0, 0, 100, 0.16);
  assert.equal(startOpacity, 0.16);

  const midOpacity = computeCharacterOpacity(0.5, 50, 100, 0.16);
  assert.ok(midOpacity > 0.16 && midOpacity < 1);

  const endOpacity = computeCharacterOpacity(1, 99, 100, 0.16);
  assert.equal(endOpacity, 1);
});

test('computeStickyCardScale reduces earlier card scale as scroll progresses', () => {
  const initialScale = computeStickyCardScale(0, 3, 0.1);
  assert.equal(initialScale, 1);

  const stackedScale = computeStickyCardScale(0, 3, 1.0);
  assert.ok(stackedScale < 1 && stackedScale >= 0.88);

  const lastCardScale = computeStickyCardScale(2, 3, 1.0);
  assert.equal(lastCardScale, 1);
});

test('getVisibleProjects separates 3 featured sticky projects and 2 additional projects', () => {
  const featured = getVisibleProjects('featured');
  assert.equal(featured.length, 3);
  assert.equal(featured[0].title, 'CUSTOMER 360 GENAI INSIGHTS HUB');
  assert.equal(featured[1].title, 'LICENSE PLATE & VEHICLE MONITORING');
  assert.equal(featured[2].title, 'FRAUD & CHURN INTELLIGENCE PLATFORM');

  const allProjects = getVisibleProjects('all');
  assert.equal(allProjects.length, 5);

  const cvProjects = getVisibleProjects('all', 'OpenCV');
  assert.equal(cvProjects.length, 3);
});

test('filterSkillCategories filters by category id and search query accurately', () => {
  const all = filterSkillCategories('all');
  assert.equal(all.length, 6);

  const genaiOnly = filterSkillCategories('genai-agents');
  assert.equal(genaiOnly.length, 1);
  assert.ok(genaiOnly[0].skills.includes('LangChain'));

  const pineconeSearch = filterSkillCategories('all', 'Pinecone');
  assert.equal(pineconeSearch.length, 1);
  assert.deepEqual(pineconeSearch[0].skills, ['Pinecone']);
});

test('buildMailtoLink constructs valid encoded mailto URI', () => {
  const link = buildMailtoLink('AI Engineer Role', 'Alex Founder', 'Let us discuss RAG systems.');
  assert.ok(link.startsWith('mailto:banavathumanikanta23@gmail.com?'));
  assert.ok(link.includes('subject=AI%20Engineer%20Role'));
  assert.ok(link.includes('Alex%20Founder'));
});
