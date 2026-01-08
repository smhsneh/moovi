export default function MovieCard({ movie }) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/150x220?text=No+Image";

  return (
    <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
      <img
        src={poster}
        alt={movie.Title}
        width="100"
        height="150"
      />

      <div>
        <h3>{movie.Title}</h3>
        <p>Year: {movie.Year}</p>
        <p>Type: {movie.Type}</p>
      </div>
    </div>
  );
}