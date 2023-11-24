import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useWatchListDispatch, useWatchListSelector } from "../../hooks/hooks";
import { UpcomingMovies } from "../../models";
import { WatchlistItem, deleteFromWatchlist } from "../../store/watchlistSlice";
import "./UpcomingWL.scss";

const UpcomingWL = () => {
  const dispatch = useWatchListDispatch();
  const navigate = useNavigate();
  const watchlistItems = useWatchListSelector((state) => state.watchlist.items);

  const upcomingMoviesItems = watchlistItems.filter(
    (item) => "source" in item && item.source === "UpcomingMovies"
  );

  const handleDelete = (item: WatchlistItem) => {
    dispatch(deleteFromWatchlist(item));
  };
  const handleUpMovieDetails = (item: UpcomingMovies) => {
    navigate(`/upcoming-movies/${item.id}/watchlist-details`);
  };
  return (
    <div className="upcoming-wl">
      <h1 className="upcoming-wl__title">Upcoming Movies Watchlist</h1>
      <ul className="upcoming-wl__list">
        {upcomingMoviesItems.map((item: WatchlistItem) => (
          <li key={item.id} className="upcoming-wl__item">
            {"poster_path" in item && (
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt="poster-movie"
                className="upcoming-wl__item-image"
              />
            )}
            <div className="upcoming-wl__button-box">
                <Button
                  onClick={() => {
                    if ("id" in item) {
                      handleUpMovieDetails(item as UpcomingMovies);
                    }
                  }}
                  type="primary"
                  children="View Details"
                />
                <Button
                  onClick={() => handleDelete(item)}
                  type="primary"
                  children="Delete"
                />
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingWL;
