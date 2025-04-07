import React from 'react';
import { motion } from 'framer-motion';
import { FaKey } from 'react-icons/fa';

const ApiKeyButton = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      title="Set OpenAI API Key"
    >
      <FaKey className="text-xl" />
    </motion.button>
  );
};

export default ApiKeyButton;