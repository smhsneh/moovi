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

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;

    card.style.boxShadow = `
      ${-rotateY}px ${rotateX}px 40px rgba(224,123,91,0.35)
    `;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

    card.style.boxShadow = `
      0 0 40px rgba(224,123,91,0.25)
    `;
  }

  return (
    <div className="group relative">
      {/* CARD */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="
          relative overflow-hidden rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          transition-transform duration-200
          will-change-transform
        "
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
          className="w-full aspect-[2/3] object-cover"
        />

        {/* ACTION BUTTONS */}
        <div
          className="
            absolute inset-0
            flex items-end justify-between
            p-4
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          {/* Watchlist */}
          <button
            onClick={() => addMovie(movie, "watchlist")}
            className={`
              p-3 rounded-full
              backdrop-blur-md
              transition
              ${
                inWatchlist
                  ? "bg-[#e07b5b] text-black"
                  : "bg-black/60 text-white hover:bg-[#e07b5b]/80"
              }
            `}
          >
            <Heart size={20} />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => addMovie(movie, "wishlist")}
            className={`
              p-3 rounded-full
              backdrop-blur-md
              transition
              ${
                inWishlist
                  ? "bg-[#e07b5b] text-black"
                  : "bg-black/60 text-white hover:bg-[#e07b5b]/80"
              }
            `}
          >
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      {/* TEXT */}
      <div className="mt-3 space-y-1">
        <h3 className="text-[#f5f5f5] text-base md:text-lg font-medium">
          {movie.Title}
        </h3>
        <p className="text-[#d6d6d6] text-sm">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
}