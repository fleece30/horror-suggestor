import _get from "lodash/get";
import _map from "lodash/map";

import { fetchMovieData, fetchRecommendations } from "../../Services";
import { LIKE_TREE_ACTIONS_TYPES } from "./LikeTree.constant";
import movieData from "../../Assets/movies.json";

const fetchRandomMoviesAction = async (_, { setState }) => {
  const shuffledMovieData = _.sort(movieData, () => 0.5 - Math.random());
  const selectedMovies = _.slice(shuffledMovieData, 0, 10);

  const movies = await Promise.all(
    _map(selectedMovies, (movie) => fetchMovieData(_get(movie, "tmdbId")))
  );
  const movieDetails = _map(movies, (movie) => _get(movie, "data", {}));
  setState({
    isLoaded: true,
    movieDetails,
    seenMovies: movies,
    selectedIndices: [],
  });
};

const fetchRecommendationsAction = async ({ payload }, { setState }) => {
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
};

const LIKE_TREE_ACTIONS = {
  [LIKE_TREE_ACTIONS_TYPES.FETCH_RANDOM_MOVIE_IDS]: fetchRandomMoviesAction,
  [LIKE_TREE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION]:
    fetchRecommendationsAction,
};

export default LIKE_TREE_ACTIONS;
