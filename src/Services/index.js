import axios from "axios";

const movieApiService = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 6000,
});

const recommendationApiService = axios.create({
  baseURL: "https://getrec.herokuapp.com",
  timeout: 60000,
});

const fetchMovieData = async (movieId) =>
  await movieApiService.get(
    `movie/${movieId}?api_key=${process.env.REACT_APP_dbKey}&language=en-US`
  );
const fetchRecommendations = async (searchTerm) =>
<<<<<<< HEAD
  await recommendationApiService.get(`getrecommendations?name=${searchTerm}`);
=======
  await recommendationApiService.get(`getrecommendations?tmdbId=${searchTerm}`);
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f

export { fetchMovieData, fetchRecommendations };
