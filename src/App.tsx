// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import UpcomingMovie from "./pages/UpcomingMovie/UpcomingMovie";
import PopMovieList from "./pages/Movies/PopMovieList";
import Shows from "./pages/TV/Shows";
import Watchlist from "./pages/Watchlist/Watchlist";
import WatchlistUpDetails from "./pages/Watchlist/Details/WatchlistUpDetails";
import WatchlistTVDetails from "./pages/Watchlist/Details/WatchlistTVDetails";
import WatchlistMovieDetails from "./pages/Watchlist/Details/WatchlistMovieDetails";
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

        <Route
          path="upcoming-movies/:id/watchlist-details"
          element={<WatchlistUpDetails />}
        />
        <Route
          path="tvshows/:id/watchlist-details"
          element={<WatchlistTVDetails />}
        />
        <Route
          path="movies/:id/watchlist-details"
          element={<WatchlistMovieDetails />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    
    </Router>
  );
};

export default App;
