import {
  UpcomingMovies,
  useFetchUpcomingDataQuery,
} from "../../components/Redux/fetchDataSlice";
import Button from "../UI/Button";
import "./Home.scss";
import IMAGES from "../UI/Images/Images";
import { addToWatchlist } from "../Redux/watchlistSlice";
import { useWatchListDispatch } from "../Redux/hooks";

const Home = () => {
  const dispatch = useWatchListDispatch();
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
  if (isLoading) {
    return <div>Loading upcoming movie data...</div>;
  }

  if (isError) {
    return <div>Error fetching upcoming movie data</div>;
  }
  const handleAddToWL = (movie: UpcomingMovies) => {
    dispatch(addToWatchlist({ ...movie, source: 'UpcomingMovies' }));
    console.log(movie)
  };
  return (
    <div className="home">
      <img className="home__wallpaper" src={IMAGES.image1} />
      <h1 className="home__title">Upcoming Movies</h1>

      <ul className="home__movie-list">
        {upcomingData?.results.slice(0, 4).map((movie: UpcomingMovies) => (
          <li key={movie.id} className="home__list-item">
            <h2 className="home__movie-title">
              {truncateText(movie.title, 20)}
            </h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="home__image"
            />
            <Button
              onClick={() => handleAddToWL(movie)}
              type="primary"
              children="Add to Watchlist"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
