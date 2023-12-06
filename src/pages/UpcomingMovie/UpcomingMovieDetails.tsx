import { useFetchUpcomingMovieByIdQuery } from "../../store/fetchDataSlice";
import { NavLink, useParams } from "react-router-dom";
import "./UpcomingMovieDetails.scss";
import rating from "../../assets/rating.png";
import voteCount from "../../assets/vote-count.png";
import Button from "../../components/UI/Button";
import { useWatchListDispatch } from "../../hooks/hooks";
import { addToWatchlist } from "../../store/watchlistSlice";
import { UpcomingMovies } from "../../models";
const UpcomingMovieDetails = () => {

  const { id } = useParams<{ id: string }>();
  const { data: upcomingMovieDetails, error } = useFetchUpcomingMovieByIdQuery(
    Number(id) || 0
  );
  const dispatch = useWatchListDispatch();
  const handleAddToWatchlist = (movie: UpcomingMovies) => {
    dispatch(
      addToWatchlist({
        ...movie,
        source: "UpcomingMovies",
      })
    );

  };
  if (error) {
    return (
      <div className="upcoming-movie-details__error">
        Error fetching upcoming movie details
      </div>
    );
  }

  if (!upcomingMovieDetails) {
    return <div className="upcoming-movie-details__loading">Loading...</div>;
  }

  return (
    <div className="upcoming-movie-details">
      <div className="upcoming-movie-details__title-box">
        <h1 className="upcoming-movie-details__title">
          &#127902;&#65039; {upcomingMovieDetails.title}
        </h1>
        <p className="upcoming-movie-details__date">
          ({upcomingMovieDetails.release_date})
        </p>
      </div>
      <div className="upcoming-movie-details__image-details">
        <img
          src={`https://image.tmdb.org/t/p/original${upcomingMovieDetails.backdrop_path}`}
          alt={upcomingMovieDetails.title}
          className="upcoming-movie-details__backdrop"
        />
        <img
          src={`https://image.tmdb.org/t/p/original${upcomingMovieDetails.poster_path}`}
          alt={upcomingMovieDetails.title}
          className="upcoming-movie-details__poster"
        />
        <div className="upcoming-movie-details__details">
          <div className="upcoming-movie-details__details-items">
            <img
              src={rating}
              alt="ratinf-icon"
              className="upcoming-movie-details__icon"
            />
            <strong className="upcoming-movie-details__strong">
              Vote Average:
            </strong>
            <p className="upcoming-movie-details__text">
              {upcomingMovieDetails.vote_average}
            </p>
          </div>
          <div className="upcoming-movie-details__details-items">
            <img
              src={voteCount}
              alt="vote-count"
              className="upcoming-movie-details__icon"
            />
            <strong className="upcoming-movie-details__strong">
              Vote Count:
            </strong>
            <p className="upcoming-movie-details__text">
              {upcomingMovieDetails.vote_count}
            </p>
          </div>
        </div>
        <div className="upcoming-movie-details__overview">
          <p className="upcoming-movie-details__description">
            {upcomingMovieDetails.overview}
          </p>
        </div>
      </div>
      <div className="upcoming-movie-details__button-box">
        <NavLink to="/">
          <Button type="primary" children="← Back to Home" />
        </NavLink>
        <Button
          onClick={() => handleAddToWatchlist(upcomingMovieDetails)}
          type="primary"
          children="Add to Watchlist"
        />
      </div>
    </div>
  );
};

export default UpcomingMovieDetails;
