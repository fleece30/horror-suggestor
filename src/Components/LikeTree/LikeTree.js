import React, { useEffect, useRef, useState } from "react";
import _map from "lodash/map";
import withState from "../../Containers/withState/withState";
import { LIKE_TREE_ACTIONS_TYPES } from "./LikeTree.constant";
import LIKE_TREE_ACTIONS from "./LikeTree.action";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";
import { Button } from "../Button/Button";

import "./LikeTree.scss";

const LikeTree = (props) => {
  const { movieDetails, isLoaded = false, onAction } = props;
  const numberOfResults = useRef(16);
  const [seenMovies, setSeenMovies] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    onAction(LIKE_TREE_ACTIONS_TYPES.FETCH_RANDOM_MOVIE_IDS);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSuggestions = (movieId) => {
    numberOfResults.current = Math.floor(numberOfResults.current / 2);
    onAction(LIKE_TREE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION, {
      movieId,
      expectedLength: numberOfResults.current,
      seenMovies,
    });
    setSeenMovies([...seenMovies, ...movieDetails]);
  };

  const addIndexToState = (index) => {
    setSelectedIndices([...selectedIndices, seenMovies.length + index]);
  };

  const renderCards = () => {
    return (
      <div>
        <div className="selected-movies">
          {_map(movieDetails, (movie, index) => {
            return (
              <div
                key={index}
                className="movie-item"
                style={{
                  pointerEvents: movieDetails.length === 1 ? "none" : "auto",
                }}
                onClick={() => {
                  addIndexToState(index);
                  getSuggestions(movie.id);
                }}
              >
                <MovieCard movie={movie} index={index} />
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: movieDetails.length === 1 ? "flex" : "none",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <Button
            text={"Your Playlist"}
            onClick={() => {
              setSelectedIndices([...selectedIndices, seenMovies.length]);
              setSeenMovies([...seenMovies, ...movieDetails]);
              // addIndexToState(seenMovies.length);
            }}
          />
        </div>
      </div>
    );
  };

  return isLoaded ? renderCards() : Loader();
};

export default withState(LikeTree, LIKE_TREE_ACTIONS, {
  seenMovies: [],
  selectedIndices: [],
});
