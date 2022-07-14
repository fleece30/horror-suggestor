import _get from "lodash/get";

import { fetchMovieData, fetchRecommendations } from "../../Services";
import { SIMILAR_MOVIE_ACTIONS_TYPES } from "./SimilarMovies.constant";

const fetchReommendationsAction = async ({ payload }, { setState }) => {
  setState({ movieResults: [], movieDetails: [] });
  const limitedTerm = payload.replace(" ", "+");
  const recommendations = await fetchRecommendations(limitedTerm);
  const recommendationsToSet = _get(recommendations, "data", {});
  const nonDuplicates = recommendationsToSet[1].filter(
    (id) => !recommendationsToSet[0].includes(id)
  );
  recommendationsToSet.pop();
  recommendationsToSet.push(nonDuplicates);
  setState({ movieResults: recommendationsToSet });
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
};

const SIMILAR_MOVIE_ACTIONS = {
  [SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION]:
    fetchReommendationsAction,
  [SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION]:
    fetchMoviesFromCodeAction,
};

export default SIMILAR_MOVIE_ACTIONS;
