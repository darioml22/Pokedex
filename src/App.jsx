import './App.css';
import Navbar from './components/navbar';
import Pokedex from './components/Pokedex';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [page, setPage] = useState(1);

  const fetchPokemons = async (startId) => {
    const promises = [];
    for (let i = startId; i < startId + 20; i++) {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }
    const results = await Promise.all(promises);
    setPokemons(results.map(res => res.data));
  };

  useEffect(() => {
    fetchPokemons(nextId);
  }, []);

  const loadMorePokemons = () => {
    setNextId(prevId => prevId + 20);
    fetchPokemons(nextId + 20);
    setPage(prevPage => prevPage + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const loadPreviousPokemons = () => {
    if (nextId > 20) {
      setNextId(prevId => prevId - 20);
      fetchPokemons(nextId - 20);
      setPage(prevPage => Math.max(prevPage - 1, 1));
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };


  return (
    <Router>
    <div className="App" >
      <header className="App-header">
      <div className="horizontal">
        <div className="column_left">
          <h1 className="title">Pokedex</h1>
              <Navbar />
          </div>
        <div className="column_right">
        <Routes>
              <Route path="/app" element={
                <div className="vertical">
                  <h1 className="title">Pokemons</h1>
                  <Pokedex
                    page={page}
                    pokemons={pokemons}
                    loadMorePokemons={loadMorePokemons}
                    loadPreviousPokemons={loadPreviousPokemons}
                  />
                </div>
              }/>
              
              <Route path="/about" element={
                <div className="vertical">
                  <h1 className="title">About</h1>
                  <p className = "pokemonText">The Pokémon franchise revolves around 1,025 fictional species of collectable monsters, 
                    each having unique designs, skills, and powers. Conceived by Satoshi Tajiri in early 1989, 
                    Pokémon (or Pocket Monsters) are fictional creatures that inhabit the fictional Pokémon World. 
                    The designs for the multitude of species can draw inspiration from anything such as animals, plants, 
                    and mythological creatures. Many Pokémon are capable of evolving into more powerful species, 
                    while others can undergo form changes and achieve similar results. Originally, only a handful of artists led by Ken Sugimori designed Pokémon. 
                    However, by 2013 a team of 20 artists worked together to create new species designs. 
                    Sugimori and Hironobu Yoshida lead the team and determine the final designs..</p>
                </div>
              }/>
            </Routes>
          </div>
      </div>  
      </header>
    </div>
    </Router>
  );
}

export default App;
