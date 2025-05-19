import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { BirdsProvider } from './contexts/BirdsContext';
import { LocationProvider } from './contexts/LocationContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import EncyclopediaPage from './pages/EncyclopediaPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <UserProvider>
        <LocationProvider>
          <BirdsProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col font-noto">
              <Navigation />
              <div className="flex-1 w-full max-w-screen-2xl mx-auto px-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/encyclopedia" element={<EncyclopediaPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </div>
            </div>
          </BirdsProvider>
        </LocationProvider>
      </UserProvider>
    </Router>
  );
}

export default App;