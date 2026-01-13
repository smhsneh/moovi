import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [savedMovies, setSavedMovies] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("moovi_saved_movies");
    if (stored) {
      setSavedMovies(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "moovi_saved_movies",
      JSON.stringify(savedMovies)
    );
  }, [savedMovies]);

  function addMovie(movie, status) {
    setSavedMovies((prev) => {
      if (prev.find((m) => m.imdbID === movie.imdbID)) return prev;

      return [
        ...prev,
        {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
          Type: movie.Type,
          status,
          progress: 0,
          addedAt: Date.now(),
        },
      ];
    });
  }

  function removeMovie(imdbID) {
    setSavedMovies((prev) =>
      prev.filter((m) => m.imdbID !== imdbID)
    );
  }

  function isSaved(imdbID, status) {
    return savedMovies.some(
      (m) => m.imdbID === imdbID && m.status === status
    );
  }

  return (
    <MovieContext.Provider
      value={{
        savedMovies,
        addMovie,
        removeMovie,
        isSaved,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}
