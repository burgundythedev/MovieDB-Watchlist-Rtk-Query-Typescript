import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/Home/Home";
import Root from "./pages/Root/Root";
import Shows from "./pages/TV/Shows";
import Watchlist from "./pages/Watchlist/Watchlist";
import PopMovieList from "./pages/Movies/PopMovieList";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
