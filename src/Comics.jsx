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

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        // Fetch characters and comics
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

        // Extract comic names for each character
        const comicsData = await Promise.all(
          responses.map(async (response) => {
            if (response.data && response.data.data.results.length > 0) {
              const character = response.data.data.results[0];
              // Fetch comics for the character
              const comicsResponse = await axios.get(`${character.resourceURI}/comics`, {
                params: {
                  ts: timestamp,
                  apikey: publicKey,
                  hash: hash
                }
              });

              // Get only the comic titles
              const comicTitles = comicsResponse.data.data.results.map(comic => comic.title);
              
              return {
                name: character.name,
                comics: comicTitles
              };
            } else {
              return { name: '', comics: [] };
            }
          })
        );

        setComics(comicsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
        setError(err);
        setLoading(false);
      }
    };

    fetchComics();
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

export default Comics;
