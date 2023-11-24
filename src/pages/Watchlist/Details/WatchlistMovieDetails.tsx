import { useFetchMovieByIdQuery } from "../../../store/fetchDataSlice";
import { NavLink, useParams } from "react-router-dom";
import "../../Movies/MovieDetails.scss";

import rating from "../../../assets/rating.png";
import voteCount from "../../../assets/vote-count.png";
import Button from "../../../components/UI/Button";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movieDetails, error } = useFetchMovieByIdQuery(Number(id) || 0);

  if (error) {
    return (
      <div className="movie-details__error">Error fetching movie details</div>
    );
  }

  if (!movieDetails) {
    return <div className="movie-details__loading">Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details__title-box">
        <h1 className="movie-details__title">
          &#127902;&#65039; {movieDetails.title}
        </h1>
        <p className="movie-details__date">({movieDetails.release_date})</p>
      </div>
      <div className="movie-details__image-details">
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          className="movie-details__backdrop"
        />
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="movie-details__poster"
        />
        <div className="movie-details__details">
          <div className="movie-details__details-items">
            <img
              src={rating}
              alt="ratinf-icon"
              className="movie-details__icon"
            />
            <strong className="movie-details__strong">Vote Average:</strong>
            <p className="movie-details__text">{movieDetails.vote_average}</p>
          </div>
          <div className="movie-details__details-items">
            <img
              src={voteCount}
              alt="vote-count"
              className="movie-details__icon"
            />
            <strong className="movie-details__strong">Vote Count:</strong>
            <p className="movie-details__text">{movieDetails.vote_count}</p>
          </div>
        </div>
        <div className="movie-details__overview">
          <p className="movie-details__description">{movieDetails.overview}</p>
        </div>
      </div>
      <div className="movie-details__button-container">
        <NavLink to="/watchlist">
          <Button type="primary" children="← Back to Watchlist" />
        </NavLink>
      </div>
    </div>
  );
};

export default MovieDetails;
