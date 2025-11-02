import axios from "axios";

const API_KEY = "8587b2276929413c33fc2048ac2c771a";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (pages = 5) => {
  try {
    const allMovies = [];
    for (let page = 1; page <= pages; page++) {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page,
        },
      });
      allMovies.push(...response.data.results);
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Genres
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY, language: "en-US" },
    });
    return response.data.genres; 
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};
