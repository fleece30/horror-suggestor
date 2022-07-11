import _get from 'lodash/get';

import { fetchMovieData } from '../../Services';
import { MOVIE_ACTIONS_TYPES } from './Movie.constant';
import movieData from '../../Assets/movies.json';

const fetchMovieDataAction = async (_, { setState }) => {
    const randomIndex = Math.floor(Math.random() * movieData.length);
    const movieId = movieData[randomIndex].tmdbId;
    const selectedMovieData = await fetchMovieData(movieId);
    const movieDataToSet = _get(selectedMovieData, 'data', {});
    setState({ movie: movieDataToSet });
};

const MOVIE_ACTIONS = {
    [MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION]: fetchMovieDataAction,
};

export default MOVIE_ACTIONS;
