import React, { useState, useEffect } from "react";
import "./SimilarMovies.scss";
import { Button } from "../Components/Button";
import axios from "axios";

const movieData = require("./movies.json");
export default function SimilarMovies() {
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setAnimating] = useState(false);

  useEffect(() => {
    setSuggestions(
      movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      )
    );
    return () => {};
  }, [searchTerm]);

  const fetchRecommendations = () => {
    setMovieResults([]);
    setMovieDetails([]);
    if (!isAnimating) setAnimating(true);
    const limitedTerm = searchTerm.replace(" ", "+");
    axios
      .get(
        `https://getrec.herokuapp.com/getrecommendations?name=${limitedTerm}`
      )
      .then(({ data }) => {
        const cast_array = data[1].filter((val) => !data[0].includes(val));
        data.pop();
        data.push(cast_array);
        setMovieResults(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      for (var j in movieResults) {
        for (var i of movieResults[j]) {
          await axios
            .get(
              `https://api.themoviedb.org/3/movie/${i}?api_key=${process.env.REACT_APP_dbKey}`
            )
            .then(({ data }) => {
              setMovieDetails((movieDetails) => [...movieDetails, data]);
            })
            .catch((err) => console.log(err));
        }
      }
      setIsLoaded(true);
    };
    if (movieResults.length !== 0) getMovieDetails();
    return () => {};
  }, [movieResults]);

  return (
    <div>
      <div className={`search-field ${isAnimating ? "animating" : ""}`}>
        <input
          type="text"
          className={
            searchTerm !== "" && suggestions.length !== 0 ? "textPresent" : ""
          }
          value={searchTerm}
          onChange={(e) => setSearchterm(e.target.value)}
        />
        <div
          className="suggestions"
          style={{
            display:
              suggestions.length === 0 ||
              suggestions.length === movieData.length
                ? "none"
                : "block",
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
                }}
              >
                {movie.title}
              </div>
            );
          })}
        </div>
        <Button text="Search" onClick={() => fetchRecommendations()} />
      </div>
      <div className="movie-results">
        <h2>More like {searchTerm}</h2>
        <div>
          {!isLoaded
            ? ""
            : movieDetails.slice(0, 10).map((movie, index) => {
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
        <h2>From the people who brought you {searchTerm}</h2>
        <div>
          {!isLoaded
            ? ""
            : movieDetails.slice(10, 20).map((movie, index) => {
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
                        {movie.overview.length > 300
                          ? movie.overview.substring(0, 300) + "..."
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
    </div>
  );
}
