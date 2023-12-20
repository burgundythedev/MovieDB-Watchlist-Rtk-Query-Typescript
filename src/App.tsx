import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import UpcomingMovie from "./pages/UpcomingMovie/UpcomingMovie";
import PopMovieList from "./pages/Movies/PopMovieList";
import Shows from "./pages/TV/Shows";
import Watchlist from "./pages/Watchlist/Watchlist";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./components/Home/Home";
import MovieDetails from "./pages/Details/MovieDetails";
import UpMovieDetails from "./pages/Details/UpMovieDetails";
import ShowDetails from "./pages/Details/ShowDetails";


const App: React.FC = () => {
  return (
    <Router basename="/olivierbourgogne.com/">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upcoming-movies" element={<UpcomingMovie />} />
        <Route path="upcoming-movies/details/:id" element={<UpMovieDetails />} />
        <Route path="movies" element={<PopMovieList />} />
        <Route path="movies/details/:id" element={<MovieDetails />} />
        <Route path="tvshows" element={<Shows />} />
        <Route path="tvshows/details/:id" element={<ShowDetails />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
