import MovieCard from "./moviecard";

export default function MovieRow({ title, movies }) {
  return (
    <section className="mb-16">
      <h2
  className="text-2xl md:text-3xl mb-8 tracking-widest text-white"
  style={{ fontFamily: "Share Tech" }}
>
  {title}
</h2>

      <div
        className="
          grid gap-6
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
}
