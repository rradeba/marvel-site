import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavBar'; 
import Home from './Home';
import BrowseCharacters from './BrowseCharacters';
import CharacterDetails from './CharacterDetails';
import Comics from './Comics';
import NotFound from './NotFound';

const Main = () => {
  return (
    <Router>
      <Navbar />
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-characters" element={<BrowseCharacters />} />
          <Route path="/character-details" element={<CharacterDetails />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
    
    </Router>
  );
};

export default Main;
