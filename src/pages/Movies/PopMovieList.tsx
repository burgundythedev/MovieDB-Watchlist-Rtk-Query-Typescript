import { useFetchPopularMovieDataQuery } from "../../store/fetchDataSlice";
import { useNavigate } from "react-router-dom";
import { useWatchListDispatch } from "../../hooks/hooks";
import { addToWatchlist } from "../../store/watchlistSlice";
import Button from "../../components/UI/Button";
import "./PopMovieList.scss";
import { Movie } from "../../models";

const PopMovieList = () => {
  const navigate = useNavigate();
  const dispatch = useWatchListDispatch();
  const { data: movieData, error } = useFetchPopularMovieDataQuery();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleAddToWL = (movie: Movie) => {
    dispatch(
      addToWatchlist({
        ...movie,
        source: "PopMovieList",
      })
    );
  };

  const handleMovieDetails = (movie: Movie) => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className="popular">
      <h1 className="popular__title">Popular Movies</h1>
      {error ? (
        <div className="popular__error-message">Error fetching data</div>
      ) : movieData && movieData.results ? (
        <ul className="popular__movie-list">
          {movieData.results.slice(0, 10).map((movie) => (
            <li key={movie.id} className="popular__movie-item">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="popular__img"
              />
              <h2 className="popular__movie-title">{movie.title}</h2>
              <p className="popular__overview">
                {truncateText(movie.overview, 80)}
                <Button
                  onClick={() => handleMovieDetails(movie)}
                  type="view"
                  children="View Details"
                />
              </p>
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
