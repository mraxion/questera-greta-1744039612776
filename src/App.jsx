import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pickupLines, situations, styles } from './data/pickupLines';
import LocationSelect from './components/LocationSelect';
import StyleFilter from './components/StyleFilter';
import SituationSelect from './components/SituationSelect';
import PickupLine from './components/PickupLine';
import GenerateOptions from './components/GenerateOptions';
import { generatePickupLine } from './services/openai';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('');
  const [currentLine, setCurrentLine] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const locations = Object.keys(pickupLines);

  const getRandomLine = () => {
    if (selectedLocation && selectedStyle && selectedSituation) {
      const lines = pickupLines[selectedLocation].situations[selectedSituation][selectedStyle];
      const randomIndex = Math.floor(Math.random() * lines.length);
      setCurrentLine(lines[randomIndex]);
    }
  };

  const handleGenerateAI = async () => {
    if (selectedLocation && selectedStyle && selectedSituation) {
      setIsLoading(true);
      try {
        const generatedLine = await generatePickupLine(
          selectedLocation,
          situations[selectedLocation][selectedSituation],
          styles[selectedStyle]
        );
        setCurrentLine(generatedLine);
      } catch (error) {
        console.error('Error generating AI pickup line:', error);
        setCurrentLine("Sorry, I couldn't generate a line right now. Try the preset ones!");
      } finally {
        setIsLoading(false);
      }
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
            <GenerateOptions
              onGenerate={getRandomLine}
              onGenerateAI={handleGenerateAI}
              isLoading={isLoading}
            />
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