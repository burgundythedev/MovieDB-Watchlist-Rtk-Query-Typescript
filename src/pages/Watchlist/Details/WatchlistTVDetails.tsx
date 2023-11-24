import { useFetchTVShowByIdQuery } from "../../../store/fetchDataSlice";
import { NavLink, useParams } from "react-router-dom";
import "../../TV/TvShowDetails.scss";
import rating from "../../../assets/rating.png";
import voteCount from "../../../assets/vote-count.png";
import Button from "../../../components/UI/Button";

const TvShowDetails = () => {
  const { id } = useParams<{ id: string }>();

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
      <div className="tv-show-details__title-box">
        <h1 className="tv-show-details__title">
          &#127902;&#65039; {tvShowDetails.name}
        </h1>
        <p className="tv-show-details__date">
          ({tvShowDetails.first_air_date})
        </p>
      </div>
      <div className="tv-show-details__image-details">
        <img
          src={`https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path}`}
          alt={tvShowDetails.name}
          className="tv-show-details__backdrop"
        />
        <img
          src={`https://image.tmdb.org/t/p/original${tvShowDetails.poster_path}`}
          alt={tvShowDetails.name}
          className="tv-show-details__poster"
        />
        <div className="tv-show-details__details">
          <div className="tv-show-details__details-items">
            <img
              src={rating}
              alt="ratinf-icon"
              className="tv-show-details__icon"
            />
            <strong className="tv-show-details__strong">Vote Average:</strong>
            <p className="tv-show-details__text">
              {tvShowDetails.vote_average}
            </p>
          </div>
          <div className="tv-show-details__details-items">
            <img
              src={voteCount}
              alt="vote-count"
              className="tv-show-details__icon"
            />
            <strong className="tv-show-details__strong">Vote Count:</strong>
            <p className="tv-show-details__text">{tvShowDetails.vote_count}</p>
          </div>
        </div>
        <div className="tv-show-details__overview">
          <p className="tv-show-details__description">
            {tvShowDetails.overview}
          </p>
        </div>
      </div>
      <div className="upcoming-movie-details__button-container">
        <NavLink to="/watchlist">
          <Button type="primary" children="← Back to Watchlist" />
        </NavLink>
      </div>
    </div>
  );
};

export default TvShowDetails;
