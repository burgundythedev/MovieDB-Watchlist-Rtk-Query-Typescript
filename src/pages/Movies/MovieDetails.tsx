import { useFetchMovieByIdQuery } from "../../components/store/fetchDataSlice";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movieDetails, error } = useFetchMovieByIdQuery(
    Number(id) as number
  );

  if (error) {
    return <div className="movie-details__error">Error fetching movie details</div>;
  }

  if (!movieDetails) {
    return <div className="movie-details__loading">Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h1 className="movie-details__title">{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className="movie-details__img"
      />
      <div className="movie-details__overview">
        <h2>Overview</h2>
        <p>{movieDetails.overview}</p>
      </div>
      <div className="movie-details__details">
        <p>
          <strong>Release Date:</strong> {movieDetails.release_date}
        </p>
        <p>
          <strong>Vote Average:</strong> {movieDetails.vote_average}
        </p>
        <p>
          <strong>Vote Count:</strong> {movieDetails.vote_count}
        </p>
        <p>
          <strong>Popularity:</strong> {movieDetails.popularity}
        </p>
     
      </div>
    </div>
  );
};

export default MovieDetails;
