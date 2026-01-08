import { useState } from "react";
import { searchMovies } from "../services/omdbapi";
import MovieCard from "../components/moviecard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setMovies([]);
      return;
    }

    try {
      setError("");
      const results = await searchMovies(value);
      setMovies(results);
    } catch (err) {
      setMovies([]);
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>home page works</h2>

      <input
        placeholder="search movie"
        value={query}
        onChange={handleChange}
      />

      {error && <p>{error}</p>}

      <div>
  {movies.map((movie) => (
    <MovieCard key={movie.imdbID} movie={movie} />
  ))}
</div>
    </div>
  );
}