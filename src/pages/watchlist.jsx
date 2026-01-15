import { useMovies } from "../context/moviecontext";
import MovieRow from "../components/movierow";

export default function Watchlist() {
  const { movies } = useMovies();

  const watchlist = movies.filter(
    (m) => m.status === "watchlist"
  );

  return (
    <div className="pl-72 pr-16 pt-24 text-white">
      <h1 className="text-3xl mb-10 text-[#f5f5f5]">
        Your Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">
          No movies added yet.
        </p>
      ) : (
        <MovieRow movies={watchlist} />
      )}
    </div>
  );
}
