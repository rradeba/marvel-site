import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavigationLink'; 
import Home from './Home';
import BrowseCharacters from './BrowseCharacters';
import CharacterDetails from './CharacterDetails';
import Comics from './Comics';

const Main = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-characters" element={<BrowseCharacters />} />
          <Route path="/character-details" element={<CharacterDetails />} />
          <Route path="/comics" element={<Comics />} />
        </Routes>
      </main>
    </Router>
  );
};

export default Main;
