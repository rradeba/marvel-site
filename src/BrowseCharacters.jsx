import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

// API keys and configuration
const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const timestamp = Date.now();
const hash = md5(timestamp + privateKey + publicKey);

// Marvel heroes to fetch
const characterList = [
    "Iron Man",
    "Thor",
    "Captain America",
    "Black Panther",
    "Doctor Strange",
    "Hulk",
    "Magneto",
    "Wolverine",
    "Daredevil"
];

const MarvelCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCharacters = async () => {
        try {
          const responses = await Promise.all(
            characterList.map(hero => 
              axios.get(`https://gateway.marvel.com/v1/public/characters`, {
                params: {
                  ts: timestamp,
                  apikey: publicKey,
                  hash: hash,
                  name: hero
                }
              })
            )
          );
          const data = responses.map(response => {
            if (response.data && response.data.data.results.length > 0) {
              return response.data.data.results[0];
            } else {
              return null;
            }
          }).filter(Boolean); // Filters out any null values
  
          setCharacters(data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching data:', err.response ? err.response.data : err.message);
          setError(err);
          setLoading(false);
        }
      };
  
      fetchCharacters();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div className="container">
        <h1 className="h1">Marvel Characters</h1>
        <div className="grid">
          {characters.map(character => (
            character && (
              <div className="grid-item" key={character.id}>
                <div className="text-container">
                  <h2 className="h2">{character.name}</h2>
                </div>
                <img className="img"
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                  alt={character.name} 
                  style={{ width: '100%' }}
                />
              </div>
            )
          ))}
        </div>
      </div>
    );
};

export default MarvelCharacters;
