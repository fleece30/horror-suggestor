import React, { useState, useEffect } from "react";
import _isEmpty from "lodash/isEmpty";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _map from "lodash/map";
import withState from "../../Containers/withState/withState";
import SIMILAR_MOVIE_ACTIONS from "./SimilarMovie.action";
import { SIMILAR_MOVIE_ACTIONS_TYPES } from "./SimilarMovies.constant";
import { Button } from "../Button/Button";

import "./SimilarMovies.scss";

const movieData = require("../../Assets/movies.json");

const SimilarMovies = (props) => {
  const { isLoaded, movieResults, movieDetails, onAction } = props;

  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showingSuggestions, setShowingSuggestions] = useState(false);
  const [isAnimating, setAnimating] = useState(false);

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
    onAction(
      SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION,
      searchTerm
    );
  };

  useEffect(() => {
    if (movieResults !== undefined && !_isEmpty(movieResults))
      onAction(
        SIMILAR_MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION,
        movieResults
      );
  }, [movieResults]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderRows = (movies, header) => {
    return (
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
    </div>
  );
};

export default withState(SimilarMovies, SIMILAR_MOVIE_ACTIONS);
