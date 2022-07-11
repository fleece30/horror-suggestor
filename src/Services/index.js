import axios from 'axios';

const movieApiService = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 6000,
});

export const fetchMovieData = async movieId => await movieApiService.get(`movie/${movieId}?api_key=${process.env.REACT_APP_dbKey}&language=en-US`);
