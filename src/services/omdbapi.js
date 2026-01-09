const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}`
  );
  const data = await res.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search;
}

export async function getDefaultMovies() {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=batman`
  );
  const data = await res.json();

  return data.Search || [];
}