import './App.css';
import React, { useState } from 'react';

const MoviesList = () => {
  // Initialize state with a list of movies, their descriptions, and genres
  const [movies, setMovies] = useState([
    { title: "Dark Knight", description: "Batman sequel, featuring electric Joker performance by Heath Ledger", genre: 'Action' },
    { title: "Slumdog Millionaire", description: "A story about an Indian orphan who wins a game show and finds love", genre: 'Drama' },
    { title: "Shawshank Redemption", description: "The adventures of a falsely imprisoned accountant who breaks free.", genre: 'Drama' },
    { title: "Interstellar", description: "A riveting film about space exploration", genre: 'Sci-Fi' },
    { title: "Django Unchained", description: "A Tarantino film about a freed slave searching for his wife.", genre: 'Action' },
    { title: "Saving Private Ryan", description: "A WW2 action film about a battalion in search of a lost soldier.", genre: 'Action' },
    { title: "Mad Max: Fury Road", description: "Electric hero film in a desert post-apocalyptic setting.", genre: 'Action' },
    { title: "Inside Out", description: "Animated film about emotional development as we grow up.", genre: 'Animation' }
  ]);

  const [showDescription, setShowDescription] = useState(false);
  const [showGenre, setShowGenre] = useState('All'); 

  const toggleView = () => {
    setShowDescription(!showDescription);
  };

  const toggleGenre = () => {
    setShowGenre(showGenre === 'All' ? 'Action' : 'All');
  };

  const removeMovie = (title) => {
    setMovies(movies.filter(movie => movie.title !== title));
  };

  const filteredMovies = showGenre === 'All' ? movies : movies.filter(movie => movie.genre === showGenre);

  return (
    <div>
      <button onClick={toggleView}>
        {showDescription ? 'Show Movies List' : 'Show Movie Descriptions'}
      </button>
      <button onClick={toggleGenre}>
        {showGenre === 'All' ? 'Show Action Movies' : 'Show All Movies'}
      </button>
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.title}>
            <strong>{movie.title}</strong>
            {showDescription && `: ${movie.description}`}
            <button onClick={() => removeMovie(movie.title)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
