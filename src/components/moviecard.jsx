export default function MovieCard({ movie }) {
  return (
    <div className="group">
      <div
        className="
          relative overflow-hidden rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10 group-hover:border-[#e07b5b]/40
          transition-all duration-300
          group-hover:scale-[1.03]
          group-hover:shadow-[0_0_40px_rgba(224,123,91,0.45)]
        "
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
          className="w-full aspect-[2/3] object-cover"
        />
      </div>

      {/* Movie info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium leading-tight group-hover:text-[#e07b5b] transition">
          {movie.Title}
        </h3>
        <p className="text-xs text-[#77615a]">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
}