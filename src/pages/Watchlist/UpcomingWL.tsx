import { useWatchListDispatch, useWatchListSelector } from "../../hooks/hooks";
import { WatchlistItem, deleteFromWatchlist } from "../../store/watchlistSlice";
import "./UpcomingWL.scss";

const UpcomingWL = () => {
  const dispatch = useWatchListDispatch();
  const watchlistItems = useWatchListSelector((state) => state.watchlist.items);

  const upcomingMoviesItems = watchlistItems.filter(
    (item) => "source" in item && item.source === "UpcomingMovies"
  );

  const handleDelete = (item: WatchlistItem) => {
    dispatch(deleteFromWatchlist(item));
  };

  return (
    <div className="upcoming-wl">
      <h1 className="upcoming-wl__title">Upcoming Watchlist</h1>
      <ul className="upcoming-wl__list">
        {upcomingMoviesItems.map((item: WatchlistItem) => (
          <li key={item.id} className="upcoming-wl__item">
            {"title" in item && (
              <p className="upcoming-wl__item-title">{item.title}</p>
            )}
            {"poster_path" in item && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt="poster-movie"
                className="upcoming-wl__item-image"
              />
            )}
            <button
              onClick={() => handleDelete(item)}
              className="upcoming-wl__item-button upcoming-wl__item-button--delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingWL;
