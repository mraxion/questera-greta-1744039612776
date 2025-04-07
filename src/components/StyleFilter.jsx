import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../data/pickupLines';
import { colors } from '../theme/colors';

const StyleFilter = ({ selectedStyle, onStyleSelect }) => {
  return (
    <div className="mb-6">
      <h3 className={`text-lg ${colors.text.secondary} mb-3`}>Choose your style:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(styles).map(([style, description]) => (
          <motion.button
            key={style}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStyleSelect(style)}
            className={`p-3 rounded-lg text-sm transition-all ${
              selectedStyle === style
                ? `${colors.button.primary} text-white shadow-lg`
                : `${colors.button.outline}`
            }`}
          >
            <div className="font-medium capitalize">{style}</div>
            <div className="text-xs mt-1 opacity-80">{description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StyleFilter;