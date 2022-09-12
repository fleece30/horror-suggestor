import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Components/Home/Home";
import Movie from "./Components/Movie/Movie";
import SimilarMovies from "./Components/SimilarMovies/SimilarMovies";
import LikeTree from "./Components/LikeTree/LikeTree";
import Loader from "./Components/Loader/Loader";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="randommovies" element={<Movie />} />
        <Route path="searchsimilar" element={<SimilarMovies />} />
        {/* <Route path="liketree" element={<LikeTree />} /> */}
        <Route path="loader" element={<Loader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
