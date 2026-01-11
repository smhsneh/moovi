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
  <div
  className="min-h-screen text-white px-8"
  style={{
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(224,123,91,0.80), transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(255,100,40,0.65), transparent 65%),
      radial-gradient(circle at 50% 90%, rgba(120,20,0,0.55), transparent 70%),
      linear-gradient(180deg, #0a0a0a, #111111 80%)
    `,
    backgroundBlendMode: "overlay, overlay, overlay, normal",
  }}
>

      {/* Header (no gradient now) */}
      <div className="mb-24 pt-24 pb-20 flex flex-col items-center text-center">
        <h1
          className="text-6xl md:text-7xl tracking-[0.35em] mb-10"
          style={{ fontFamily: "Share Tech" }}
        >
          <span className="text-[#e07b5b]">MOO</span>VI
        </h1>

        <SearchBar value={query} onChange={setQuery} />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[
            "Action",
            "Sci-Fi",
            "Drama",
            "Thriller",
            "Fantasy",
            "Romance",
          ].map((cat) => (
            <div
              key={cat}
              className="
                px-6 py-2
                rounded-full
                bg-white/5 backdrop-blur-md
                border border-white/10
                text-sm tracking-wide
                cursor-pointer
                transition
                hover:bg-[#e07b5b]/20
                hover:border-[#e07b5b]/40
                hover:text-[#e07b5b]
              "
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-gray-400 mb-6">{error}</p>}

      {/* Search Results or Home Rows */}
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