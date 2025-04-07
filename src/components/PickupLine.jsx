import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCopy, FaCheck } from 'react-icons/fa';

const PickupLine = ({ line }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(line);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-lg mb-4"
    >
      <p className="text-lg text-gray-800 mb-4">{line}</p>
      <div className="flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`transition-colors ${
            liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
          }`}
        >
          <FaHeart className="text-xl" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          className="text-gray-400 hover:text-purple-500 transition-colors"
        >
          {copied ? <FaCheck className="text-xl text-green-500" /> : <FaCopy className="text-xl" />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PickupLine;