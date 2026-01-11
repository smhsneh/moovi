import { useEffect, useState } from "react";
import { searchMovies } from "../services/omdbapi";
import MovieRow from "../components/movierow";
import SearchBar from "../components/searchbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  // Fetch multiple rows on load (API only)
  useEffect(() => {
    async function loadRows() {
      const queries = [
        { title: "New & Trending", q: "avengers" },
        { title: "Action Hits", q: "mission" },
        { title: "Marvel Picks", q: "marvel" },
        { title: "Batman Universe", q: "batman" },
        { title: "Sci-Fi Worlds", q: "star" },
      ];

      const results = await Promise.all(
        queries.map(async (row) => {
          const movies = await searchMovies(row.q);
          return { title: row.title, movies };
        })
      );

      setRows(results);
    }

    loadRows();
  }, []);

  // Search logic
  useEffect(() => {
    if (query.length < 3) {
      setSearchResults([]);
      setError("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const movies = await searchMovies(query);
        setSearchResults(movies);
      } catch (err) {
        setSearchResults([]);
        setError(err.message);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#111111] text-white px-8 pt-8">
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl mb-8 tracking-wide">
          Discover
        </h1>

        <SearchBar value={query} onChange={setQuery} />
      </div>

      {error && (
        <p className="text-gray-400 mb-6">
          {error}
        </p>
      )}

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <MovieRow title="Search Results" movies={searchResults} />
      ) : (
        rows.map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            movies={row.movies}
          />
        ))
      )}
    </div>
  );
}
