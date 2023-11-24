import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UpcomingMovie from "./pages/UpcomingMovie/UpcomingMovie";
import Root from "./pages/Root/Root";
import Shows from "./pages/TV/Shows";
import Watchlist from "./pages/Watchlist/Watchlist";
import PopMovieList from "./pages/Movies/PopMovieList";
import MovieDetails from "./pages/Movies/MovieDetails";
import TvShowDetails from "./pages/TV/TvShowDetails";
import NotFound from "./pages/NotFound/NotFound";
import UpcomingMovieDetails from "./pages/UpcomingMovie/UpcomingMovieDetails";
import WatchlistUpDetails from "./pages/Watchlist/Details/WatchlistUpDetails";
import WatchlistTVDetails from "./pages/Watchlist/Details/WatchlistTVDetails";
import WatchlistMovieDetails from "./pages/Watchlist/Details/WatchlistMovieDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <UpcomingMovie />,
      },
      { path: "movies", element: <PopMovieList /> },
      { path: "tvshows", element: <Shows /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "tvshows/:id", element: <TvShowDetails /> },
      { path: "upcoming-movies/:id", element: <UpcomingMovieDetails /> },
      {
        path: "upcoming-movies/:id/watchlist-details",
        element: <WatchlistUpDetails />,
      },
      {
        path: "tvshows/:id/watchlist-details",
        element: <WatchlistTVDetails />,
      },
      {
        path: "movies/:id/watchlist-details",
        element: <WatchlistMovieDetails />,
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
