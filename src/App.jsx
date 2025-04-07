import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pickupLines, situations, styles } from './data/pickupLines';
import LocationSelect from './components/LocationSelect';
import StyleFilter from './components/StyleFilter';
import SituationSelect from './components/SituationSelect';
import PickupLine from './components/PickupLine';
import GenerateOptions from './components/GenerateOptions';
import SearchBar from './components/SearchBar';
import ApiKeyButton from './components/ApiKeyButton';
import ApiKeyModal from './components/ApiKeyModal';
import { generatePickupLine } from './services/openai';
import { colors } from './theme/colors';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('');
  const [currentLine, setCurrentLine] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const locations = Object.keys(pickupLines);
  const canGenerate = selectedLocation && selectedStyle && selectedSituation;

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
    setSelectedStyle('');
    setCurrentLine('');
  };

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
        if (error.message.includes('API key')) {
          setIsApiKeyModalOpen(true);
        }
        setCurrentLine(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.background.primary} py-8 px-4`}>
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-4xl font-bold text-center ${colors.text.primary} mb-8`}
        >
          Pick-up Line Generator
        </motion.h1>

        <SearchBar
          onLocationSelect={handleLocationSelect}
          onSituationSelect={handleSituationSelect}
        />

        <div className="grid gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${colors.background.card} backdrop-blur-sm rounded-xl p-6 shadow-xl`}
          >
            <h2 className={`text-xl ${colors.text.secondary} mb-4 font-semibold`}>
              Choose your location:
            </h2>
            <LocationSelect
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={handleLocationSelect}
            />
            
            {selectedLocation && (
              <AnimatePresence mode="wait">
                <SituationSelect
                  location={selectedLocation}
                  selectedSituation={selectedSituation}
                  onSituationSelect={handleSituationSelect}
                />
              </AnimatePresence>
            )}
          </motion.div>

          {selectedSituation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${colors.background.card} backdrop-blur-sm rounded-xl p-6 shadow-xl`}
            >
              <StyleFilter
                selectedStyle={selectedStyle}
                onStyleSelect={handleStyleSelect}
              />
            </motion.div>
          )}

          {canGenerate && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
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

      <ApiKeyButton onClick={() => setIsApiKeyModalOpen(true)} />
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </div>
  );
}

export default App;