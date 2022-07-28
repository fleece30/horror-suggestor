import _get from "lodash/get";

import { fetchMovieData, fetchRecommendations } from "../../Services";
import { LIKE_TREE_ACTIONS_TYPES } from "./LikeTree.constant";
import movieData from "../../Assets/movies.json";

const fetchRandomMoviesAction = async (_, { setState }) => {
<<<<<<< HEAD
  const shuffledMovieData = movieData.sort(() => 0.5 - Math.random());
  const selectedMovies = shuffledMovieData.slice(0, 10);
  setState({ selectedMovies: selectedMovies });
};

const fetchReommendationsAction = async ({ payload }, { setState }) => {
  const { movieName, expectedLength } = payload;
  setState({ movieResults: [], movieDetails: [] });
  const limitedTerm = movieName.replace(" ", "+");
  const recommendations = await fetchRecommendations(limitedTerm);
  const recommendationsToSet = _get(recommendations, "data", {});
  setState({ movieResults: recommendationsToSet[0].slice(0, expectedLength) });
};

const fetchMoviesFromCodeAction = async ({ payload }, { setState }) => {
  let movies = [];
  for (var j in payload) {
    for (var i of payload[j]) {
      const movieData = await fetchMovieData(i);
      const movieDataToSet = _get(movieData, "data", {});
      movies.push(movieDataToSet);
    }
  }
  setState({ isLoaded: true, movieDetails: movies });
=======
  let movies = [];
  const shuffledMovieData = movieData.sort(() => 0.5 - Math.random());
  const selectedMovies = shuffledMovieData.slice(0, 10);
  for (var i of selectedMovies) {
    const movieData = await fetchMovieData(i.tmdbId);
    const movieDataToSet = _get(movieData, "data", {});
    movies.push(movieDataToSet);
  }
  setState({
    isLoaded: true,
    movieDetails: movies,
    seenMovies: movies,
    selectedIndices: [],
  });
};

const fetchReommendationsAction = async ({ payload }, { setState }) => {
  let movies = [];
  let items = 0;
  const { movieId, expectedLength, seenMovies } = payload;
  setState({ movieDetails: [] });
  const recommendations = await fetchRecommendations(movieId);
  const recommendationsToSet = _get(recommendations, "data", {});
  for (let i of recommendationsToSet[0]) {
    if (items === expectedLength) break;
    if (seenMovies.some((movie) => movie.id === i)) continue;
    items++;
    const movieData = await fetchMovieData(i);
    const movieDataToSet = _get(movieData, "data", {});
    movies.push(movieDataToSet);
  }
  setState({
    movieDetails: movies,
    isLoaded: true,
  });
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
};

const LIKE_TREE_ACTIONS = {
  [LIKE_TREE_ACTIONS_TYPES.FETCH_RANDOM_MOVIE_IDS]: fetchRandomMoviesAction,
<<<<<<< HEAD
  [LIKE_TREE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION]: fetchMoviesFromCodeAction,
=======
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
  [LIKE_TREE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION]:
    fetchReommendationsAction,
};

export default LIKE_TREE_ACTIONS;
