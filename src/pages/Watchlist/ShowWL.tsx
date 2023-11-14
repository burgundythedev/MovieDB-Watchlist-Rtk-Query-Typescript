import {
  useWatchListDispatch,
  useWatchListSelector,
} from "../../components/hooks/hooks";
import {
  WatchlistItem,
  deleteFromWatchlist,
} from "../../components/store/watchlistSlice";
import "./ShowWL.scss";

const ShowWL = () => {
  const dispatch = useWatchListDispatch();
  const watchlistItems = useWatchListSelector((state) => state.watchlist.items);

  const tvShowItems = watchlistItems.filter(
    (item) => "source" in item && item.source === "PopTVShowList"
  );

  const handleDelete = (item: WatchlistItem) => {
    dispatch(deleteFromWatchlist(item));
  };

  return (
    <div className="show-wl">
      <h1 className="show-wl__title">TV Shows Watchlist</h1>
      <ul className="show-wl__list">
        {tvShowItems.map((item: WatchlistItem) => (
          <li key={item.id} className="show-wl__item">
            {"name" in item && (
              <p className="show-wl__item-name">{item.name}</p>
            )}
            {"poster_path" in item && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt="poster-movie"
                className="show-wl__item-image"
              />
            )}
            <button
              onClick={() => handleDelete(item)}
              className="show-wl__item-button show-wl__item-button--delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowWL;
