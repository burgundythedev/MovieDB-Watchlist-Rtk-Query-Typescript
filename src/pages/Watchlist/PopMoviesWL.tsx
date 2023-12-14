import Button from "../../components/UI/Button";
import { useWatchListDispatch, useWatchListSelector } from "../../hooks/hooks";
import { Movie } from "../../models";
import { WatchlistItem, deleteFromWatchlist } from "../../store/watchlistSlice";
import "./PopMoviesWl.scss";
import { useNavigate } from "react-router-dom";

const PopMoviesWL = () => {
  const dispatch = useWatchListDispatch();
  const navigate = useNavigate();
  const watchlistItems = useWatchListSelector((state) => state.watchlist.items);

  const movieItems = watchlistItems
    .filter((item) => "source" in item && item.source === "PopMovieList")
    .filter(
      (item): item is WatchlistItem & { title: string; poster_path: string } =>
        "title" in item && "poster_path" in item
    );

  const handleDelete = (item: WatchlistItem) => {
    dispatch(deleteFromWatchlist(item));
  };

  const handleMovieDetails = (item: Movie) => {
    navigate(`/movies/${item.id}/watchlist-details`);
  };

  return (
    <div className="pop-movies-wl">
      <h1 className="pop-movies-wl__title">Popular Movies Watchlist</h1>
      <ul className="pop-movies-wl__list">
        {movieItems.map(
          (item: WatchlistItem & { title: string; poster_path: string }) => (
            <li key={item.id} className="pop-movies-wl__movie-item">
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt={item.title}
                  className="pop-movies-wl__img"
                />
              )}
              <div className="pop-movies-wl__button-box">
                <Button
                  onClick={() => handleDelete(item)}
                  type="view"
                  children="Delete"
                />
                <Button
                  onClick={() => {
                    if ("id" in item) {
                      handleMovieDetails(item as Movie);
                    }
                  }}
                  type="view"
                  children="View Details"
                />
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default PopMoviesWL;
