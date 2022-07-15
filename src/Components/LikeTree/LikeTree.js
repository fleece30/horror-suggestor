import React, { useEffect } from "react";
import _isEmpty from "lodash/isEmpty";
import withState from "../../Containers/withState/withState";
import { LIKE_TREE_ACTIONS_TYPES } from "./LikeTree.constant";
import LIKE_TREE_ACTIONS from "./LikeTree.action";

import "./LikeTree.scss";

const LikeTree = (props) => {
  const { selectedMovies, movieResults, movieDetails, onAction } = props;

  useEffect(() => {
    onAction(LIKE_TREE_ACTIONS_TYPES.FETCH_RANDOM_MOVIE_IDS);
  }, []);

  const getSuggestions = (movieName = "Conjuring, The (2013)") => {
    onAction(LIKE_TREE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION, {
      movieName,
      expectedLength: 5,
    });
  };

  return (
    <div>
      {console.log(movieResults)}
      <button onClick={() => getSuggestions()}>yo</button>
    </div>
  );
};

export default withState(LikeTree, LIKE_TREE_ACTIONS);
