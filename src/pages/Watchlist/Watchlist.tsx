import "./Watchlist.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { WatchlistItem, deleteFromWatchlist } from "../../store/watchlistSlice";
import Button from "../../components/UI/Button";
import { Movie, TVShow } from "../../models";
import { NavLink } from "react-router-dom";
import screen from "../../assets/screen.png";
import camera from "../../assets/camera.png";
import eye from "../../assets/eye.png";
import popcorn from "../../assets/popcorn.png";
import started from "../../assets/wallpaper-trial.jpg";
const isMovie = (item: WatchlistItem): item is Movie => {
  return "title" in item;
};

const isTVShow = (item: WatchlistItem): item is TVShow => {
  return "name" in item;
};

const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlistItems = useSelector(
    (state: RootState) => state.watchlist.items
  );
  const handleRemove = (item: WatchlistItem) => {
    dispatch(deleteFromWatchlist(item));
  };
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 3) + "...";
    }
  };
  return (
    <div className="watchlist">
      <div className="watchlist__container">
        <div className="watchlist__list-container">
          <div className="watchlist__button-title">
            <h1 className="watchlist__title">Watchlist</h1>
            <div className="watchlist__icon-box">
              <img src={screen} alt="poster" className="watchlist__icon" />
              <img src={camera} alt="poster" className="watchlist__icon" />
              <img src={eye} alt="poster" className="watchlist__icon" />
              <img src={popcorn} alt="poster" className="watchlist__icon" />
            </div>
          </div>
          <div className="watchlist__list">
            {watchlistItems.length > 0 ? (
              <ul className="watchlist__list-items">
                {watchlistItems.map((item: WatchlistItem) => (
                  <li key={item.id} className="watchlist__item">
                    <NavLink
                      to={
                        isMovie(item)
                          ? `/movies/details/${item.id}`
                          : `/tvshows/details/${item.id}`
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
                      {truncateText(
                        isMovie(item)
                          ? (item as Movie).title
                          : isTVShow(item)
                          ? (item as TVShow).name
                          : "",
                        25
                      )}
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
        <div className="watchlist__trial">
          <div className="home__trial">
            <img
              className="home__trial-background"
              src={started}
              alt="wallpaper-started"
            />
            <div className="home__trial-container">
              <div className="home__trial-title-wrapper">
                <h2 className="home__trial-title">
                  Trial start first 30 days.
                </h2>
                <p className="home__trial-text">
                  Enter your email to create or restart your membership.
                </p>
              </div>

              <form action="" className="home__trial-form">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="home__email-field"
                />
                <Button type="get-started" children="Get Started" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
