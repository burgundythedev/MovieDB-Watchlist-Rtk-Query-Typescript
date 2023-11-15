import Button from "../../components/UI/Button";
import { useFetchUpcomingDataQuery } from "../../store/fetchDataSlice";
import { addToWatchlist } from "../../store/watchlistSlice";
import { useWatchListDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { UpcomingMovies } from "../../models";
import wallpaper from "../../assets/cinema-wallpaper.jpg";

const Home = () => {
  const dispatch = useWatchListDispatch();
  const navigate = useNavigate();
  const {
    data: upcomingData,
    isLoading,
    isError,
  } = useFetchUpcomingDataQuery();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleAddToWL = (movie: UpcomingMovies) => {
    dispatch(
      addToWatchlist({
        ...movie,
        source: "UpcomingMovies",
      })
    );
  };

  const handleUpMovieDetails = (upMovie: UpcomingMovies) => {
    navigate(`/upcoming-movies/${upMovie.id}`);
  };

  if (isLoading) {
    return <div>Loading upcoming movie data...</div>;
  }

  if (isError) {
    return <div>Error fetching upcoming movie data</div>;
  }

  return (
    <div className="home">
      <img className="home__wallpaper" src={wallpaper} alt="Wallpaper" />
      <h1 className="home__title">Upcoming Movies</h1>
      <ul className="home__movie-list">
        {upcomingData?.results.slice(0, 4).map((upMovie: UpcomingMovies) => (
          <li key={upMovie.id} className="home__list-item">
            <h2 className="home__movie-title">
              {truncateText(upMovie.title, 20)}
            </h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${upMovie.poster_path}`}
              alt={upMovie.title}
              className="home__image"
            />
            <div className="home__button-container">
              <Button
                onClick={() => handleAddToWL(upMovie)}
                type="primary"
                children="Add to Watchlist"
              />
              <Button
                onClick={() => handleUpMovieDetails(upMovie)}
                type="primary"
                children="View Details"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
