import React from 'react';
import { motion } from 'framer-motion';

const SituationCard = ({ situation, description, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-4 ${
        isSelected
          ? 'bg-purple-600 text-white shadow-lg'
          : 'bg-white hover:bg-purple-50 border border-purple-100'
      } transition-all`}
    >
      <h4 className="font-medium mb-1">{description}</h4>
      <p className="text-sm opacity-80">
        Click to generate pickup lines for this situation
      </p>
    </motion.div>
  );
};

export default SituationCard;