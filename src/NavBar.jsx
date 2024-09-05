import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" end activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/browse-characters" activeClassName="active">Browse Characters</NavLink>
        </li>
        <li>
          <NavLink to="/character-details" activeClassName="active">Character Details</NavLink>
        </li>
        <li>
          <NavLink to="/comics" activeClassName="active">Comics</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
