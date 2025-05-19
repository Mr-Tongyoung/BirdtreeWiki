import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserType {
  id: string;
  nickname: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  birdsSeen: number;
  spotsVisited: number;
  joinedDate: Date;
  status: 'online' | 'away' | 'offline';
}

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  updateNickname: (nickname: string) => void;
  addExperience: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Guest user data
const guestUser: UserType = {
  id: 'guest-' + Math.random().toString(36).substring(2, 9),
  nickname: '탐조객' + Math.floor(Math.random() * 1000),
  level: 1,
  experience: 0,
  nextLevelExp: 100,
  birdsSeen: 0,
  spotsVisited: 0,
  joinedDate: new Date(),
  status: 'online'
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(guestUser);

  const updateNickname = (nickname: string) => {
    if (user) {
      setUser({ ...user, nickname });
    }
  };

  const addExperience = (amount: number) => {
    if (user) {
      let newExp = user.experience + amount;
      let newLevel = user.level;
      let nextExp = user.nextLevelExp;
      
      // Simple leveling logic
      while (newExp >= nextExp) {
        newExp -= nextExp;
        newLevel++;
        nextExp = Math.floor(nextExp * 1.5);
      }
      
      setUser({
        ...user,
        experience: newExp,
        level: newLevel,
        nextLevelExp: nextExp
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateNickname, addExperience }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};