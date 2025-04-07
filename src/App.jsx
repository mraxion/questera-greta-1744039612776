import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pickupLines } from './data/pickupLines';
import LocationSelect from './components/LocationSelect';
import StyleFilter from './components/StyleFilter';
import SituationSelect from './components/SituationSelect';
import PickupLine from './components/PickupLine';
import { FaRandom } from 'react-icons/fa';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('');
  const [currentLine, setCurrentLine] = useState('');

  const locations = Object.keys(pickupLines);

  const getRandomLine = () => {
    if (selectedLocation && selectedStyle && selectedSituation) {
      const lines = pickupLines[selectedLocation].situations[selectedSituation][selectedStyle];
      const randomIndex = Math.floor(Math.random() * lines.length);
      setCurrentLine(lines[randomIndex]);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSelectedSituation('');
    setCurrentLine('');
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setCurrentLine('');
  };

  const handleSituationSelect = (situation) => {
    setSelectedSituation(situation);
    setCurrentLine('');
  };

  const canGenerate = selectedLocation && selectedStyle && selectedSituation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center text-purple-800 mb-8"
        >
          Pick-up Line Generator
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl mb-8"
        >
          <h2 className="text-xl text-purple-700 mb-4">Choose your location:</h2>
          <LocationSelect
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
          
          {selectedLocation && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <SituationSelect
                  location={selectedLocation}
                  selectedSituation={selectedSituation}
                  onSituationSelect={handleSituationSelect}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <StyleFilter
                  selectedStyle={selectedStyle}
                  onStyleSelect={handleStyleSelect}
                />
              </motion.div>
            </>
          )}
        </motion.div>

        {canGenerate && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <button
              onClick={getRandomLine}
              className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center mx-auto space-x-2 shadow-lg"
            >
              <FaRandom className="mr-2" />
              <span>Generate Pick-up Line</span>
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {currentLine && <PickupLine key={currentLine} line={currentLine} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;