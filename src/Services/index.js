import axios from "axios";

const movieApiService = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 6000,
});

const recommendationApiService = axios.create({
  baseURL: "https://recommendationapi-production.up.railway.app",
  timeout: 60000,
});

const fetchMovieData = async (movieId) =>
  await movieApiService.get(
    `movie/${movieId}?api_key=${process.env.REACT_APP_dbKey}&language=en-US`
  );
const fetchRecommendations = async (searchTerm, resultCount) =>
  await recommendationApiService.get(
    `getrecommendations?tmdbId=${searchTerm}&resultCount=${resultCount}`
  );

export { fetchMovieData, fetchRecommendations };
