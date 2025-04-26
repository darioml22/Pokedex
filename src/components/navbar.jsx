import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/app">Pokedex</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar;
