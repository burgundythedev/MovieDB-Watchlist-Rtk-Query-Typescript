import "./Watchlist.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { WatchlistItem, deleteFromWatchlist } from "../../store/watchlistSlice";
import Button from "../../components/UI/Button";
import { Movie, TVShow } from "../../models";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const isMovie = (item: WatchlistItem): item is Movie => {
  return "title" in item;
};

const isTVShow = (item: WatchlistItem): item is TVShow => {
  return "name" in item;
};

const Watchlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchlistItems = useSelector(
    (state: RootState) => state.watchlist.items
  );
  const handleRemove = (item: WatchlistItem) => {
    dispatch(deleteFromWatchlist(item));
  };

  const navigateTo = () => {
    navigate("/");
  };
  return (
    <div className="watchlist">
      <div className="watchlist__container">
        <div className="watchlist__button-title">
          <h1 className="watchlist__title">Watchlist</h1>
          <Button onClick={navigateTo} type="back" children="Back To Home" />
        </div>
        <div className="watchlist__list">
          {watchlistItems.length > 0 ? (
            <ul className="watchlist__list-items">
              {watchlistItems.map((item: WatchlistItem) => (
                <li key={item.id} className="watchlist__item">
                  <NavLink
                    to={
                      isMovie(item)
                        ? `/movies/${item.id}`
                        : `/tvshows/${item.id}`
                    }
                  >
                    {item.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                        alt="poster"
                        className="watchlist__poster"
                      />
                    )}
                  </NavLink>
                  <span className="watchlist__name">
                    {isMovie(item)
                      ? (item as Movie).title
                      : isTVShow(item)
                      ? (item as TVShow).name
                      : ""}
                  </span>
                  <Button
                    type="remove"
                    children="Remove"
                    onClick={() => handleRemove(item)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="watchlist__empty">Your watchlist is empty.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Watchlist;
