import {
  useWatchListDispatch,
  useWatchListSelector,
} from "../../components/hooks/hooks";
import {
  WatchlistItem,
  deleteFromWatchlist,
} from "../../components/store/watchlistSlice";
import "./PopMoviesWl.scss";

const PopMoviesWL = () => {
  const dispatch = useWatchListDispatch();
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

  return (
    <div className="pop-movies-wl">
      <h1 className="pop-movies-wl__title">Popular Movies Watchlist</h1>
      <ul className="pop-movies-wl__list">
        {movieItems.map(
          (item: WatchlistItem & { title: string; poster_path: string }) => (
            <li key={item.id} className="pop-movies-wl__movie-item">
              <p>{item.title}</p>
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="pop-movies-wl__img"
                />
              )}
              <button
                onClick={() => handleDelete(item)}
                className="pop-movies-wl__item-button pop-movies-wl__item-button--delete"
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default PopMoviesWL;
