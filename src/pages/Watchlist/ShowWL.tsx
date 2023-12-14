import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useWatchListDispatch, useWatchListSelector } from "../../hooks/hooks";
import { WatchlistItem, deleteFromWatchlist } from "../../store/watchlistSlice";
import "./ShowWL.scss";
import { TVShow } from "../../models";

const ShowWL = () => {
  const dispatch = useWatchListDispatch();
  const navigate = useNavigate();
  const watchlistItems = useWatchListSelector((state) => state.watchlist.items);

  const tvShowItems = watchlistItems.filter(
    (item) => "source" in item && item.source === "PopTVShowList"
  );

  const handleDelete = (item: WatchlistItem) => {
    dispatch(deleteFromWatchlist(item));
  };

  const handleShowDetails = (item: TVShow) => {
    navigate(`/tvshows/${item.id}/watchlist-details`);
  };

  return (
    <div className="show-wl">
      <h1 className="show-wl__title">TV Shows Watchlist</h1>
      <ul className="show-wl__list">
        {tvShowItems.map((item: WatchlistItem) => (
          <li key={item.id} className="show-wl__item">
            {"poster_path" in item && (
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt="poster-show"
                className="show-wl__item-image"
              />
            )}
            <div className="show-wl__button-box">
              <Button
                onClick={() => handleDelete(item)}
                type="view"
                children="Delete"
              />
              <Button
                onClick={() => {
                  if ("id" in item) {
                    handleShowDetails(item as TVShow);
                  }
                }}
                type="view"
                children="View Details"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowWL;
