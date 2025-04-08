import { allSections } from '../data/sections';

export const getRandomSections = (count = 6) => {
  const sections = Object.entries(allSections);
  const shuffled = sections.sort(() => 0.5 - Math.random());
  return Object.fromEntries(shuffled.slice(0, count));
};