
import Button from "../../components/UI/Button";
import {
  useFetchTVShowDataQuery,

} from "../../store/fetchDataSlice";
import { useNavigate } from "react-router-dom";
import "./Shows.scss";
import { useWatchListDispatch } from "../../hooks/hooks";
import { addToWatchlist } from "../../store/watchlistSlice";
import { TVShow } from "../../models";

const PopTVShowList = () => {
  const dispatch = useWatchListDispatch();
  const navigate = useNavigate();

  const { data: tvShowData, error } = useFetchTVShowDataQuery();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleAddToWL = (tvShow: TVShow) => {
    dispatch(addToWatchlist({ ...tvShow, source: 'PopTVShowList' }));
  };

  const handleTvShowDetails = (tvShow: TVShow) => {
    navigate(`/tvshows/${tvShow.id}`);
  };

  return (
    <div className="shows">
      <h1 className="shows__title">Popular TV Shows</h1>
      {error ? (
        <div className="shows__error-message">Error fetching data</div>
      ) : tvShowData && tvShowData.results ? (
        <ul className="shows__tv-show-list">
          {tvShowData.results.map((tvShow) => (
            <li key={tvShow.id} className="shows__tv-show-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                className="shows__img"
              />
              <h2 className="shows__tv-show-title">{tvShow.name}</h2>
              <p className="shows__overview">
                {truncateText(tvShow.overview, 80)}
              </p>
              <div className="shows__button-container">
                <Button
                  onClick={() => handleAddToWL(tvShow)}
                  type="view"
                  children="Add To Watchlist"
                />
                <Button
                  onClick={() => handleTvShowDetails(tvShow)}
                  type="view"
                  children="View Details"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="shows__loading-message">Loading...</p>
      )}
    </div>
  );
};

export default PopTVShowList;
