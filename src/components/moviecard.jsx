import { useRef } from "react";
import { Heart, Bookmark } from "lucide-react";
import { useMovies } from "../context/moviecontext";

export default function MovieCard({ movie }) {
  const cardRef = useRef(null);
  const { addMovie, isSaved } = useMovies();

  const inWatchlist = isSaved(movie.imdbID, "watchlist");
  const inWishlist = isSaved(movie.imdbID, "wishlist");

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  return (
    <div className="group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          relative overflow-hidden rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          transition-transform duration-300
          will-change-transform
        "
        style={{
          transform: `
            perspective(900px)
            rotateX(var(--rx))
            rotateY(var(--ry))
          `,
        }}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
          className="w-full aspect-[2/3] object-cover"
        />

        {}
        <div className="absolute inset-0 p-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => addMovie(movie, "watchlist")}
            className={`p-3 rounded-full ${
              inWatchlist
                ? "bg-[#e07b5b] text-black"
                : "bg-black/60 text-white"
            }`}
          >
            <Heart size={20} />
          </button>

          <button
            onClick={() => addMovie(movie, "wishlist")}
            className={`p-3 rounded-full ${
              inWishlist
                ? "bg-[#e07b5b] text-black"
                : "bg-black/60 text-white"
            }`}
          >
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-[#f0f0f0] text-base font-medium">
          {movie.Title}
        </h3>
        <p className="text-[#cfcfcf] text-sm">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
}