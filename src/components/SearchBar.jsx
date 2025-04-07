import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { searchDatabase } from '../utils/search';

const SearchBar = ({ onLocationSelect, onSituationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.length >= 2) {
      const searchResults = searchDatabase(searchQuery);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleResultClick = (result) => {
    onLocationSelect(result.location);
    if (result.situation) {
      onSituationSelect(result.situation);
    }
    setQuery('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search locations, situations, or pickup lines..."
          className="w-full px-4 py-3 pl-12 pr-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleResultClick(result)}
                className="p-4 hover:bg-purple-50 cursor-pointer border-b last:border-b-0"
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-purple-700">
                      {result.location} {result.situation && `› ${result.situation}`}
                    </h4>
                    {result.line && (
                      <p className="text-sm text-gray-600 mt-1">{result.line}</p>
                    )}
                  </div>
                  <span className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full">
                    {result.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;