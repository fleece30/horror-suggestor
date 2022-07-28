import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Components/Home/Home";
import Movie from "./Components/Movie/Movie";
import SimilarMovies from "./Components/SimilarMovies/SimilarMovies";
import LikeTree from "./Components/LikeTree/LikeTree";
<<<<<<< HEAD
=======
import Loader from "./Components/Loader/Loader";
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="randommovies" element={<Movie />} />
        <Route path="searchsimilar" element={<SimilarMovies />} />
        <Route path="liketree" element={<LikeTree />} />
<<<<<<< HEAD
=======
        <Route path="loader" element={<Loader />} />
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
      </Routes>
    </BrowserRouter>
  );
}

export default App;
