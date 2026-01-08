const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query) {
  if (!query) return [];

  const response = await fetch(
    `${BASE_URL}?s=${query}&apikey=${API_KEY}`
  );

  const data = await response.json();

  if (data.Response === "True") {
    return data.Search;
  } else {
    throw new Error(data.Error);
  }
}