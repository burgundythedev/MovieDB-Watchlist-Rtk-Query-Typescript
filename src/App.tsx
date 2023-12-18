import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import UpcomingMovie from "./pages/UpcomingMovie/UpcomingMovie";
import PopMovieList from "./pages/Movies/PopMovieList";
import Shows from "./pages/TV/Shows";
import Watchlist from "./pages/Watchlist/Watchlist";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./components/Home/Home";


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="upcoming-movies" element={<UpcomingMovie />} />
        <Route path="movies" element={<PopMovieList />} />
        <Route path="tvshows" element={<Shows />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    
    </Router>
  );
};

export default App;
