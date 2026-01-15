const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}`
  );

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data.Search || [];
}