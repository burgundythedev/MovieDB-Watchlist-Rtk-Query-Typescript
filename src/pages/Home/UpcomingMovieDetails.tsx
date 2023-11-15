import { useFetchUpcomingMovieByIdQuery } from "../../store/fetchDataSlice";
import { useParams } from "react-router-dom";
import "./UpcomingMovieDetails.scss";

const UpcomingMovieDetails = () => {
  const { id } = useParams();
  const { data: upcomingMovieDetails, error } = useFetchUpcomingMovieByIdQuery(
    Number(id) || 0
  );

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
      <h1 className="upcoming-movie-details__title">
        {upcomingMovieDetails.title}
      </h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${upcomingMovieDetails.poster_path}`}
        alt={upcomingMovieDetails.title}
        className="upcoming-movie-details__img"
      />
      <div className="upcoming-movie-details__overview">
        <h2>Overview</h2>
        <p>{upcomingMovieDetails.overview}</p>
      </div>
      <div className="upcoming-movie-details__details">
        <p>
          <strong>Release Date:</strong> {upcomingMovieDetails.release_date}
        </p>
        <p>
          <strong>Vote Average:</strong> {upcomingMovieDetails.vote_average}
        </p>
        <p>
          <strong>Vote Count:</strong> {upcomingMovieDetails.vote_count}
        </p>
        <p>
          <strong>Popularity:</strong> {upcomingMovieDetails.popularity}
        </p>
      </div>
    </div>
  );
};

export default UpcomingMovieDetails;
