import React from 'react';
import { motion } from 'framer-motion';
import { FaRandom, FaRobot } from 'react-icons/fa';
import { colors } from '../theme/colors';

const GenerateOptions = ({ onGenerate, onGenerateAI, isLoading }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onGenerate}
        className={`${colors.button.primary} text-white px-8 py-3 rounded-full transition-colors flex items-center justify-center space-x-2 shadow-lg`}
      >
        <FaRandom className="mr-2" />
        <span>Use Preset Line</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onGenerateAI}
        disabled={isLoading}
        className={`${colors.button.secondary} text-white px-8 py-3 rounded-full transition-colors flex items-center justify-center space-x-2 shadow-lg ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        <FaRobot className="mr-2" />
        <span>{isLoading ? 'Generating...' : 'Generate with AI'}</span>
      </motion.button>
    </div>
  );
};

export default GenerateOptions;