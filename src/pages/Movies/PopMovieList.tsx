import {
  Movie,
  useFetchPopularMovieDataQuery,
} from "../../components/Redux/fetchDataSlice";
import { useWatchListDispatch } from "../../components/Redux/hooks";
import { addToWatchlist } from "../../components/Redux/watchlistSlice";
import Button from "../../components/UI/Button";
import "./PopMovieList.scss";

const PopMovieList = () => {
  const dispatch = useWatchListDispatch();
  const { data: movieData, error } = useFetchPopularMovieDataQuery();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };


const handleAddToWL = (movie: Movie) => {
  dispatch(addToWatchlist({ ...movie, source: 'PopMovieList' }));
};


  return (
    <div className="popular">
      <h1 className="popular__title">Popular Movies</h1>
      {error ? (
        <div className="popular__error-message">Error fetching data</div>
      ) : movieData && movieData.results ? (
        <ul className="popular__movie-list">
          {movieData.results.map((movie) => (
            <li key={movie.id} className="popular__movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="popular__img"
              />
              <h2 className="popular__movie-title">{movie.title}</h2>
              <p className="popular__overview">
                {truncateText(movie.overview, 80)}
              </p>
              <p className="popular__release-date">
                Release Date: {movie.release_date}
              </p>
              <p className="popular__vote">{movie.vote_average}</p>
              <p className="popular__vote">{movie.popularity}</p>
              <Button
                onClick={() => handleAddToWL(movie)}
                type="secondary"
                children="Add To Watchlist"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="home__loading-message">Loading...</p>
      )}
    </div>
  );
};

export default PopMovieList;
