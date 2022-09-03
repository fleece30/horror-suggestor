import React, { useState, useEffect, useRef } from "react";
import _isEmpty from "lodash/isEmpty";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _map from "lodash/map";
import _uniqueId from "lodash/uniqueId";
import withState from "../../Containers/withState/withState";
import SIMILAR_MOVIE_ACTIONS from "./SimilarMovie.action";
import { SIMILAR_MOVIE_ACTIONS_TYPES } from "./SimilarMovies.constant";
import { Button } from "../Button/Button";

import "./SimilarMovies.scss";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";

const movieData = require("../../Assets/movies.json");

const SimilarMovies = (props) => {
  const { isLoaded, movieResults, movieDetails, onAction } = props;

  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showingSuggestions, setShowingSuggestions] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const selectedId = useRef(0);

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
    setShowLoader(true);
    onAction(
      SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION,
      selectedId.current
    );
  };

  useEffect(() => {
    if (!_isEmpty(movieResults)) {
      onAction(
        SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION,
        movieResults
      );
      setShowLoader(false);
    }
  }, [movieResults]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderRows = (movies, header) => {
    return (
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
                return <MovieCard movie={movie} key={_uniqueId} />;
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
                key={_uniqueId()}
                className="title"
                onClick={() => {
                  setSearchterm(movie.title);
                  setSuggestions([]);
                  setShowingSuggestions(false);
                  selectedId.current = movie.tmdbId;
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
      {showLoader ? Loader() : null}
    </div>
  );
};

export default withState(SimilarMovies, SIMILAR_MOVIE_ACTIONS);
