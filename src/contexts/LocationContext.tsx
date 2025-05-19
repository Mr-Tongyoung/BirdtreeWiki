import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockLocations } from '../data/mockLocations';

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  birdsCount: number;
  usersCount: number;
  lastActivity: Date;
}

interface LocationContextType {
  currentLocation: Location | null;
  nearbyLocations: Location[];
  setCurrentLocation: (location: Location | null) => void;
  selectLocationById: (id: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>(mockLocations);

  // Select location by ID
  const selectLocationById = (id: string) => {
    const location = nearbyLocations.find(loc => loc.id === id);
    if (location) {
      setCurrentLocation(location);
    }
  };

  // Simulate getting the user's location
  useEffect(() => {
    // In a real app, you would use the Geolocation API here
    // and calculate nearby locations based on the user's position
    const defaultLocation = nearbyLocations[0];
    setCurrentLocation(defaultLocation);
  }, []);

  return (
    <LocationContext.Provider value={{ 
      currentLocation, 
      nearbyLocations, 
      setCurrentLocation,
      selectLocationById
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};