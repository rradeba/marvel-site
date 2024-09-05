import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavBar'; 
import Home from './Home';
import BrowseCharacters from './BrowseCharacters';
import CharacterDetails from './CharacterDetails';
import Comics from './Comics';

const TempMain = () => {
  return (
    <Router>
      <Navbar />
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-characters" element={<BrowseCharacters />} />
          <Route path="/character-details" element={<CharacterDetails />} />
          <Route path="/comics" element={<Comics />} />
        </Routes>
    
    </Router>
  );
};

export default TempMain;
