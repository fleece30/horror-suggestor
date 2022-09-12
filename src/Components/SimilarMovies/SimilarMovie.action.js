import _get from "lodash/get";
import _uniq from "lodash/uniq";
import _flatten from "lodash/flatten";
import _reduce from "lodash/reduce";

import { fetchMovieData, fetchRecommendations } from "../../Services";
import { SIMILAR_MOVIE_ACTIONS_TYPES } from "./SimilarMovies.constant";

const fetchRecommendationsAction = async ({ payload }, { setState }) => {
  setState({ movieResults: [], movieDetails: [] });
  const recommendations = await fetchRecommendations(
    payload.movieId,
    payload.resultCount
  );
  const recommendationsToSet = _uniq(
    _flatten(_get(recommendations, "data", {}))
  );

  setState({ movieResults: recommendationsToSet });
};

const fetchMoviesFromCodeAction = async ({ payload }, { setState }) => {
  let movies = await _reduce(
    payload,
    async (acc, currentMovie) => {
      let accumulatorArray = await acc;
      const movieData = await fetchMovieData(currentMovie);
      const movieItem = _get(movieData, "data", {});
      accumulatorArray.push(movieItem);
      return accumulatorArray;
    },
    Promise.resolve([])
  );
  setState({ isLoaded: true, movieDetails: movies });
};

const SIMILAR_MOVIE_ACTIONS = {
  [SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION]:
    fetchRecommendationsAction,
  [SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION]:
    fetchMoviesFromCodeAction,
};

export default SIMILAR_MOVIE_ACTIONS;
