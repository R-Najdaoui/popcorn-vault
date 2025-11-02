import axios from "axios";

const API_KEY = "8587b2276929413c33fc2048ac2c771a";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
