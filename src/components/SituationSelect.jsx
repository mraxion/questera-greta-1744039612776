import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { situations } from '../data/pickupLines';
import SituationCard from './SituationCard';

const SituationSelect = ({ location, selectedSituation, onSituationSelect }) => {
  if (!location || !situations[location]) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl text-purple-700 mb-4 font-semibold">Available Situations:</h3>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {Object.entries(situations[location]).map(([key, description]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
            >
              <SituationCard
                situation={key}
                description={description}
                isSelected={selectedSituation === key}
                onClick={() => onSituationSelect(key)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SituationSelect;