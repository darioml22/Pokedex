import React, { useState } from 'react';
import './Pokedex.css';


const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  bug: '#a8b820',
  normal: '#a8a878',
};

function Pokedex({ page, pokemons, loadMorePokemons, loadPreviousPokemons }) {

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  
  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closePopup = () => {
    setSelectedPokemon(null);
  };
  const getColor = (pokemon) => {
    const type = pokemon.types[0]?.type.name;
    return typeColors[type] || '#ccc';
  };
  
  return (
    <div>
      <div className="pokedex-grid">
        {pokemons.map((pokemon) => {    
          const bgColor = getColor(pokemon);

          return (
            <div key={pokemon.id} className="pokemon-card" style={{ backgroundColor: bgColor  }} onClick={() => handlePokemonClick(pokemon)}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <p><strong>Type: </strong>{pokemon.types.map(t => t.type.name).join(', ')}</p>
            </div>
          );
        })}
      </div>

      {selectedPokemon && (
        <div className="popup" onClick={closePopup}>
          <div
            className="popup-content"
            style={{ backgroundColor: getColor(selectedPokemon) }}
          >
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p>Height: {selectedPokemon.height} decimetres</p>
            <p>Weight: {selectedPokemon.weight} hectograms</p>
            <p>Types: {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
            <p>Abilities: {selectedPokemon.abilities.map(a => a.ability.name).join(', ')}</p>
          </div>
        </div>
      )}

      <div className="horizontal">
        <button className="button" onClick={loadPreviousPokemons}>Previous</button>
        <div className="page">{page}</div>
        <button className="button" onClick={loadMorePokemons}>Next</button>
      </div>
    </div>
  );
}

export default Pokedex;
