import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaBus, FaGlassCheers, FaCoffee, FaDumbbell } from 'react-icons/fa';
import { colors } from '../theme/colors';

const locationIcons = {
  library: FaBook,
  busStop: FaBus,
  nightclub: FaGlassCheers,
  cafe: FaCoffee,
  gym: FaDumbbell
};

const LocationCard = ({ location, isSelected, onClick, situationsCount }) => {
  const Icon = locationIcons[location] || FaBook;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-4 ${
        isSelected
          ? `${colors.button.primary} text-white`
          : `${colors.background.card} ${colors.background.cardHover}`
      } shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className="text-2xl" />
        <span className="text-sm font-medium bg-opacity-20 px-2 py-1 rounded-full bg-current">
          {situationsCount} situations
        </span>
      </div>
      <h3 className="text-lg font-semibold capitalize mb-1">
        {location.replace(/([A-Z])/g, ' $1').trim()}
      </h3>
    </motion.div>
  );
};

export default LocationCard;