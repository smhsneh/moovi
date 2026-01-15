import MovieCard from "./moviecard";

export default function MovieRow({ title, movies }) {
  if (!Array.isArray(movies) || movies.length === 0) return null;

  return (
    <div className="mb-20">
      <h2 className="text-2xl text-[#f0f0f0] mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
