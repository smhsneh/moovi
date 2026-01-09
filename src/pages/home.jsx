import { useEffect, useState } from "react";
import { searchMovies, getDefaultMovies } from "../services/omdbapi";
import MovieCard from "../components/moviecard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMovies() {
      const results = await getDefaultMovies();
      setMovies(results);
    }
    loadMovies();
  }, []);

  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 4) {
      setMessage("Type at least 4 characters to search");
      return;
    }

    const results = await searchMovies(value);

    if (results.length === 0) {
      setMessage("Movie not found");
    } else {
      setMessage("");
    }

    setMovies(results);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {}
      <h1 className="font-heading text-4xl mb-2">
        Discover Movies
      </h1>
      <p className="text-secondary mb-6">
        Search and explore movies & series
      </p>

      {}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 rounded-lg bg-dark text-white placeholder-secondary outline-none focus:ring-2 focus:ring-accent"
      />

      {}
      {message && (
        <p className="text-secondary mb-6">{message}</p>
      )}

      {}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}