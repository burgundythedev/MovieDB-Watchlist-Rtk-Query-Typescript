import Button from "../../components/UI/Button"; 
import {
  useFetchTVShowDataQuery,
  TVShow,
} from "../../components/Redux/fetchDataSlice";
import "./Shows.scss";
import { useWatchListDispatch } from "../../components/Redux/hooks";
import { addToWatchlist } from "../../components/Redux/watchlistSlice";

const PopTVShowList = () => {
  const dispatch = useWatchListDispatch();

  const { data: tvShowData, error } = useFetchTVShowDataQuery();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleAddToWL = (tvShow: TVShow) => {
    dispatch(addToWatchlist({ ...tvShow, source: 'PopTVShowList' }));
    console.log(tvShow);
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
              <p className="shows__release-date">
                First Air Date: {tvShow.first_air_date}
              </p>
              <p className="shows__vote">Vote Average: {tvShow.vote_average}</p>
              <Button
                onClick={() => handleAddToWL(tvShow)} 
                type="third"
                children="Add To Watchlist"
              />
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
