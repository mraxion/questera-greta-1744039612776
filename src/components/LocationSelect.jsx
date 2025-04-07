import React from 'react';
import { situations } from '../data/pickupLines';
import LocationCard from './LocationCard';

const LocationSelect = ({ locations, selectedLocation, onLocationSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {locations.map((location) => (
        <LocationCard
          key={location}
          location={location}
          isSelected={selectedLocation === location}
          onClick={() => onLocationSelect(location)}
          situationsCount={Object.keys(situations[location]).length}
        />
      ))}
    </div>
  );
};

export default LocationSelect;