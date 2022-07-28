<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect, useRef } from "react";
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
import _isEmpty from "lodash/isEmpty";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _map from "lodash/map";
import withState from "../../Containers/withState/withState";
import SIMILAR_MOVIE_ACTIONS from "./SimilarMovie.action";
import { SIMILAR_MOVIE_ACTIONS_TYPES } from "./SimilarMovies.constant";
import { Button } from "../Button/Button";

import "./SimilarMovies.scss";
<<<<<<< HEAD
=======
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f

const movieData = require("../../Assets/movies.json");

const SimilarMovies = (props) => {
  const { isLoaded, movieResults, movieDetails, onAction } = props;

  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showingSuggestions, setShowingSuggestions] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
<<<<<<< HEAD
=======
  const [showLoader, setShowLoader] = useState(false);
  const selectedId = useRef(0);
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f

  const handleChange = (e) => {
    setSearchterm(e.target.value);
    const sugg = _filter(movieData, (movie) =>
      _includes(movie.title.toLowerCase(), e.target.value.toLowerCase())
    );
    setSuggestions(sugg);
    setShowingSuggestions(true);
  };

  const fetchRecommendations = () => {
    if (!isAnimating) setAnimating(true);
<<<<<<< HEAD
    onAction(
      SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION,
      searchTerm
=======
    setShowLoader(true);
    onAction(
      SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION,
      selectedId.current
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
    );
  };

  useEffect(() => {
<<<<<<< HEAD
    if (movieResults !== undefined && !_isEmpty(movieResults))
=======
    if (movieResults !== undefined && !_isEmpty(movieResults)) {
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
      onAction(
        SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION,
        movieResults
      );
<<<<<<< HEAD
=======
      setShowLoader(false);
    }
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
  }, [movieResults]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderRows = (movies, header) => {
    return (
<<<<<<< HEAD
      <div style={{ display: !_isEmpty(movies) ? "block" : "none" }}>
        <h2>{`${header} ${searchTerm}`}</h2>
        <div>
          {!isLoaded
            ? ""
            : _map(movies, (movie, index) => {
                return (
                  <div key={index} className="movie-card">
                    <img
                      alt=""
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      style={{
                        display: movie.poster_path === null ? "none" : "block",
                        width: "20rem",
                      }}
                    />
                    <div className="info">
                      <h4>{movie.title + " "}</h4>
                      <p>
                        {movie.overview.length > 250
                          ? movie.overview.substring(0, 250) + "..."
                          : movie.overview}
                      </p>
                      <div className="genres">
                        {movie.genres === undefined || movie.genres.length === 0
                          ? ""
                          : movie.genres?.map((genre, key) => {
                              return <span key={key}>{genre.name} | </span>;
                            })}
                      </div>
                      <a
                        href={`https://www.imdb.com/title/${movie.imdb_id}/parentalguide`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="button-grey">Parental Guide</button>
                      </a>
                    </div>
                  </div>
                );
=======
      <div
        style={{
          display: !_isEmpty(movies) ? "block" : "none",
        }}
      >
        <h2>{`${header} ${searchTerm}`}</h2>
        <div style={{ overflowY: "hidden" }}>
          {!isLoaded
            ? ""
            : _map(movies, (movie, index) => {
                return <MovieCard movie={movie} key={index} />;
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
              })}
        </div>
      </div>
    );
  };

  const renderSuggestionBox = () => {
    return (
      <div>
        <div
          className="suggestions suggestions-error"
          style={{
            display:
              showingSuggestions && _isEmpty(suggestions) ? "block" : "none",
          }}
        >
          <div className="title">No movies found</div>
        </div>
        <div
          className="suggestions"
          style={{
            display:
              showingSuggestions && !_isEmpty(suggestions) ? "block" : "none",
          }}
        >
          {suggestions.map((movie, index) => {
            return (
              <div
                key={index}
                className="title"
                onClick={() => {
                  setSearchterm(movie.title);
                  setSuggestions([]);
                  setShowingSuggestions(false);
<<<<<<< HEAD
=======
                  selectedId.current = movie.tmdbId;
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
                }}
              >
                {movie.title}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSearchField = () => {
    return (
      <div className={`search-field ${isAnimating ? "animating" : ""}`}>
        <input
          type="text"
          className={
            searchTerm !== "" && suggestions.length !== 0 ? "textPresent" : ""
          }
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        />
        {renderSuggestionBox()}
        <Button text="Search" onClick={() => fetchRecommendations()} />
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div>
        <div className="movie-results">
          {renderRows(movieDetails.slice(0, 10), "More like")}
          {renderRows(
            movieDetails.slice(10, movieDetails.length),
            "From the people who brought you"
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderSearchField()}
      {isLoaded ? renderResults() : null}
<<<<<<< HEAD
=======
      {showLoader ? Loader() : null}
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
    </div>
  );
};

export default withState(SimilarMovies, SIMILAR_MOVIE_ACTIONS);
