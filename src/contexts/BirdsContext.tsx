import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockBirds } from '../data/mockBirds';

export interface Bird {
  id: string;
  koreanName: string;
  scientificName: string;
  imageUrl: string;
  description: string;
  locations: string[];
  seenDate?: Date;
  latitude?: number;
  longitude?: number;
}

interface BirdsContextType {
  allBirds: Bird[];
  myBirds: Bird[];
  recentBirds: Bird[];
  addBirdToMyCollection: (bird: Bird) => void;
  identifyBirdFromImage: (imageData: string) => Promise<Bird | null>;
}

const BirdsContext = createContext<BirdsContextType | undefined>(undefined);

export const BirdsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allBirds, setAllBirds] = useState<Bird[]>(mockBirds);
  const [myBirds, setMyBirds] = useState<Bird[]>([]);
  
  // Get recent birds - would be from all users in a real app
  const recentBirds = allBirds.slice(0, 5);

  const addBirdToMyCollection = (bird: Bird) => {
    const now = new Date();
    // Add the bird with the current date if not already in collection
    if (!myBirds.some(b => b.id === bird.id)) {
      setMyBirds([...myBirds, {...bird, seenDate: now}]);
    }
  };

  // Mock AI identification
  const identifyBirdFromImage = async (imageData: string): Promise<Bird | null> => {
    // In a real app, this would call an AI service
    // For now, just return a random bird from our collection
    return new Promise(resolve => {
      setTimeout(() => {
        const randomBird = allBirds[Math.floor(Math.random() * allBirds.length)];
        resolve(randomBird);
      }, 1500);
    });
  };

  return (
    <BirdsContext.Provider value={{ 
      allBirds, 
      myBirds, 
      recentBirds,
      addBirdToMyCollection,
      identifyBirdFromImage
    }}>
      {children}
    </BirdsContext.Provider>
  );
};

export const useBirds = (): BirdsContextType => {
  const context = useContext(BirdsContext);
  if (context === undefined) {
    throw new Error('useBirds must be used within a BirdsProvider');
  }
  return context;
};