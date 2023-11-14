import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root/Root";
import Shows from "./pages/TV/Shows";
import Watchlist from "./pages/Watchlist/Watchlist";
import PopMovieList from "./pages/Movies/PopMovieList";
import MovieDetails from "./pages/Movies/MovieDetails";
import TvShowDetails from "./pages/TV/TvShowDetails";
import NotFound from "./pages/NotFound/NotFound";
import UpcomingMovieDetails from "./pages/Home/UpcomingMovieDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "movies", element: <PopMovieList /> },
      { path: "tvshows", element: <Shows /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "tvshows/:id", element: <TvShowDetails /> },
      { path: "upcoming-movies/:id", element: <UpcomingMovieDetails /> }, // Move UpcomingMovieDetails outside the children array
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
