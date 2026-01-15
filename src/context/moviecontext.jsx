import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem("watchlist")) || []);
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  function addMovie(movie, type) {
    if (type === "watchlist") {
      const updated = [...watchlist, movie];
      setWatchlist(updated);
      localStorage.setItem("watchlist", JSON.stringify(updated));
    }

    if (type === "wishlist") {
      const updated = [...wishlist, movie];
      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  }

  function isSaved(id, type) {
    const list = type === "watchlist" ? watchlist : wishlist;
    return list.some((m) => m.imdbID === id);
  }

  return (
    <MovieContext.Provider value={{ watchlist, wishlist, addMovie, isSaved }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}