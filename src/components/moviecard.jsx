export default function MovieCard({ movie }) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="bg-card rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
      <img
        src={poster}
        alt={movie.Title}
        className="w-full h-[300px] object-cover"
      />

      <div className="p-3">
        <h3 className="font-heading text-lg">
          {movie.Title}
        </h3>
        <p className="text-secondary text-sm">
          {movie.Year}
        </p>
      </div>
    </div>
  );
}