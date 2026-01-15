import { useEffect, useState, useRef } from "react";
import { searchMovies } from "../services/omdbapi";
import MovieRow from "../components/movierow";
import SearchBar from "../components/searchbar";
import ticketImg from "../assets/movie-ticket.png.png";

export default function Home() {
  const ticketRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

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

  function handleTicketMove(e) {
    const card = ticketRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  }

  function handleTicketLeave() {
    const card = ticketRef.current;
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#000000",
        backgroundImage: "linear-gradient(to left, #5c120b, #000000)",
      }}
    >
      <div className="mb-24 pt-24 pb-20 px-12 flex items-center justify-between gap-16">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <h1
            className="text-6xl md:text-7xl tracking-[0.35em] mb-10"
            style={{ fontFamily: "Share Tech" }}
          >
            <span className="text-[#f5f5f5]">MOOVI</span>
          </h1>

          <SearchBar value={query} onChange={setQuery} />

          <div className="flex flex-wrap gap-4 mt-10">
            {["Action", "Sci-Fi", "Drama", "Thriller", "Fantasy", "Romance"].map(
              (cat) => (
                <div
                  key={cat}
                  className="
                    px-8 py-4 rounded-full
                    bg-white/10 backdrop-blur-lg
                    border border-[#e07b5b]/30
                    text-[#f5f5f5]
                    cursor-pointer
                    transition-all duration-300
                    hover:bg-[#e07b5b]/20
                    hover:border-[#e07b5b]
                    hover:shadow-[0_0_20px_rgba(224,123,91,0.35)]
                  "
                >
                  {cat}
                </div>
              )
            )}
          </div>
        </div>

        {}
        <div
          ref={ticketRef}
          onMouseMove={handleTicketMove}
          onMouseLeave={handleTicketLeave}
          className="
            hidden lg:block
            will-change-transform
            transition-transform duration-300
          "
          style={{
            transform: `
              perspective(900px)
              rotateX(var(--rx))
              rotateY(var(--ry))
              translateY(-6px)
            `,
          }}
        >
          <img
            src={ticketImg}
            alt="Movie ticket"
            className="
              w-[550px]
              opacity-90
              select-none
              drop-shadow-[0_0_40px_rgba(224,123,91,0.35)]
            "
          />
        </div>
      </div>

      {error && <p className="text-gray-400 mb-6">{error}</p>}

      {}
      <div className="px-6 md:px-12 lg:px-16 pb-24">
        {searchResults.length > 0 ? (
          <MovieRow title="Search Results" movies={searchResults} />
        ) : (
          rows.map((row) => (
            <MovieRow key={row.title} title={row.title} movies={row.movies} />
          ))
        )}
      </div>
    </div>
  );
}