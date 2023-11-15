import { useFetchTVShowByIdQuery } from "../../store/fetchDataSlice";
import { useParams } from "react-router-dom";
import "./TvShowDetails.scss";

const TvShowDetails = () => {
  const { id } = useParams();
  const { data: tvShowDetails, error } = useFetchTVShowByIdQuery(
    Number(id) || 0
  );

  if (error) {
    return (
      <div className="tv-show-details__error">
        Error fetching TV show details
      </div>
    );
  }

  if (!tvShowDetails) {
    return <div className="tv-show-details__loading">Loading...</div>;
  }

  return (
    <div className="tv-show-details">
      <h1 className="tv-show-details__title">{tvShowDetails.name}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
        alt={tvShowDetails.name}
        className="tv-show-details__img"
      />
      <div className="tv-show-details__overview">
        <h2>Overview</h2>
        <p>{tvShowDetails.overview}</p>
      </div>
      <div className="tv-show-details__details">
        <p>
          <strong>First Air Date:</strong> {tvShowDetails.first_air_date}
        </p>
        <p>
          <strong>Vote Average:</strong> {tvShowDetails.vote_average}
        </p>
        <p>
          <strong>Vote Count:</strong> {tvShowDetails.vote_count}
        </p>
        <p>
          <strong>Popularity:</strong> {tvShowDetails.popularity}
        </p>
      </div>
    </div>
  );
};

export default TvShowDetails;
