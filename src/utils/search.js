import { situations, pickupLines } from '../data/pickupLines';

// Search index for faster lookups
let searchIndex = null;

// Initialize search index
const initializeSearchIndex = () => {
  if (searchIndex) return;

  searchIndex = [];

  // Index locations and situations
  Object.entries(situations).forEach(([location, locationSituations]) => {
    // Add location
    searchIndex.push({
      type: 'location',
      location,
      searchText: location.toLowerCase(),
    });

    // Add situations for this location
    Object.entries(locationSituations).forEach(([situationKey, situationDesc]) => {
      searchIndex.push({
        type: 'situation',
        location,
        situation: situationKey,
        searchText: `${location} ${situationDesc}`.toLowerCase(),
      });
    });
  });

  // Index pickup lines
  Object.entries(pickupLines).forEach(([location, locationData]) => {
    Object.entries(locationData.situations || {}).forEach(([situation, styleLines]) => {
      Object.entries(styleLines).forEach(([style, lines]) => {
        lines.forEach(line => {
          searchIndex.push({
            type: 'line',
            location,
            situation,
            style,
            line,
            searchText: `${location} ${situation} ${line}`.toLowerCase(),
          });
        });
      });
    });
  });
};

// Fuzzy search function
const fuzzyMatch = (query, text) => {
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  let queryIdx = 0;
  let textIdx = 0;
  
  while (queryIdx < query.length && textIdx < text.length) {
    if (query[queryIdx] === text[textIdx]) {
      queryIdx++;
    }
    textIdx++;
  }
  
  return queryIdx === query.length;
};

// Main search function
export const searchDatabase = (query) => {
  if (!searchIndex) {
    initializeSearchIndex();
  }

  query = query.toLowerCase();
  const results = [];
  const seen = new Set();

  searchIndex.forEach(item => {
    if (fuzzyMatch(query, item.searchText)) {
      const key = `${item.type}-${item.location}-${item.situation || ''}-${item.line || ''}`;
      
      if (!seen.has(key)) {
        seen.add(key);
        
        const result = {
          type: item.type,
          location: item.location,
          situation: item.situation,
          style: item.style,
          line: item.line,
        };

        // Add situation description if available
        if (item.situation && situations[item.location]?.[item.situation]) {
          result.situationDesc = situations[item.location][item.situation];
        }

        results.push(result);
      }
    }
  });

  // Sort results by relevance (exact matches first)
  results.sort((a, b) => {
    const aExact = a.searchText?.includes(query) ? 0 : 1;
    const bExact = b.searchText?.includes(query) ? 0 : 1;
    return aExact - bExact;
  });

  return results.slice(0, 10); // Limit to top 10 results
};