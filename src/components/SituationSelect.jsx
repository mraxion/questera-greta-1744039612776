import React from 'react';
import { motion } from 'framer-motion';
import { situations } from '../data/pickupLines';

const SituationSelect = ({ location, selectedSituation, onSituationSelect }) => {
  if (!location || !situations[location]) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg text-purple-700 mb-3">Choose the situation:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(situations[location]).map(([key, description]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSituationSelect(key)}
            className={`p-4 rounded-lg transition-all ${
              selectedSituation === key
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/80 text-purple-600 hover:bg-purple-50'
            }`}
          >
            <div className="font-medium">{description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SituationSelect;