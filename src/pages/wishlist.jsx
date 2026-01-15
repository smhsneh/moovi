import { useMovies } from "../context/moviecontext";
import MovieRow from "../components/movierow";

export default function Wishlist() {
  const { movies } = useMovies();

  const wishlist = movies.filter(
    (m) => m.status === "wishlist"
  );

  return (
    <div className="pl-72 pr-16 pt-24 text-white">
      <h1 className="text-3xl mb-10 text-[#f5f5f5]">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400">
          No movies saved yet.
        </p>
      ) : (
        <MovieRow movies={wishlist} />
      )}
    </div>
  );
}
