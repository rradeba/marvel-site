import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';


const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const timestamp = Date.now();
const hash = md5(timestamp + privateKey + publicKey);


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

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const responses = await Promise.all(
          characterList.map(hero => 
            axios.get('https://gateway.marvel.com/v1/public/characters', {
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
        }).filter(Boolean); 

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
    <div className="comics-container">
  <h1 className="comics-title">Marvel Comics</h1>
  <div className="comics-grid">
    {comics.map((characterComics, index) => (
      <div className="comics-item" key={index}>
        <h2 className="comics-character-name">{characterComics.name}</h2>
        <div className="comics-list">
          {characterComics.comics.length > 0 ? (
            <ul className="comics-list-ul">
              {characterComics.comics.map((comic, i) => (
                <li className="comics-list-item" key={i}>
                  <h3 className="comics-title-item">{comic}</h3>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-comics-msg">No comics available for this character.</p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default CharacterList;
