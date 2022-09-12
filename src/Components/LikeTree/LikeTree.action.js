import _get from "lodash/get";
import _map from "lodash/map";
import _sortBy from "lodash/sortBy";
import _slice from "lodash/slice";
import _reduce from "lodash/reduce";

import { fetchMovieData, fetchRecommendations } from "../../Services";
import { LIKE_TREE_ACTIONS_TYPES } from "./LikeTree.constant";
import movieData from "../../Assets/movies.json";

const fetchRandomMoviesAction = async (_, { setState }) => {
  const shuffledMovieData = _sortBy(movieData, () => 0.5 - Math.random());
  const selectedMovies = _slice(shuffledMovieData, 0, 10);

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
  const { movieId, expectedLength } = payload;
  setState({ movieDetails: [] });
  const recommendations = await fetchRecommendations(movieId, 20);
  const recommendationsToSet = _get(recommendations, "data", {});
  let movies = await _reduce(
    _sortBy(recommendationsToSet[0], () => 0.5 - Math.random()),
    async (acc, currentMovie) => {
      let accumulatorArray = await acc;
      const movieData = await fetchMovieData(currentMovie);
      const movieItem = _get(movieData, "data", {});
      accumulatorArray.push(movieItem);
      return accumulatorArray;
    },
    Promise.resolve([])
  );
  setState({
    movieDetails: _slice(movies, 0, expectedLength),
    isLoaded: true,
  });
};

const LIKE_TREE_ACTIONS = {
  [LIKE_TREE_ACTIONS_TYPES.FETCH_RANDOM_MOVIE_IDS]: fetchRandomMoviesAction,
  [LIKE_TREE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION]:
    fetchRecommendationsAction,
};

export default LIKE_TREE_ACTIONS;
