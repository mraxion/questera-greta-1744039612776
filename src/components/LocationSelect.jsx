import React from 'react';
import { motion } from 'framer-motion';

const LocationSelect = ({ locations, selectedLocation, onLocationSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {locations.map((location) => (
        <motion.button
          key={location}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLocationSelect(location)}
          className={`p-4 rounded-lg text-center transition-colors ${
            selectedLocation === location
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 hover:bg-purple-50'
          } shadow-md`}
        >
          {location.charAt(0).toUpperCase() + location.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};

export default LocationSelect;