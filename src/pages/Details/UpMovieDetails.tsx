import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import VideoModal from "../../components/UI/VideoModal";
import {
  useFetchMovieByIdQuery,
  useFetchVideosQuery,
} from "../../store/fetchDataSlice";

import star from "../../assets/star.png";
import videoPlay from "../../assets/video-play.png";
import calendar from "../../assets/calendar.png";
import addIcon from "../../assets/add.png";
import count from "../../assets/vote-count.png";
import genre from "../../assets/genre.png";
import "./Details.scss";
import { UpcomingMovies, formatFullDate, formatYear } from "../../models";
import {
  addToWatchlist,
  selectWatchlistTotalItems,
} from "../../store/watchlistSlice";
import { useDispatch, useSelector } from "react-redux";
const UpMovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const watchlistTotalItems = useSelector(selectWatchlistTotalItems);
  const { data: movie } = useFetchMovieByIdQuery(Number(id));
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { data: videoData } = useFetchVideosQuery(movie?.id || 0);
  const videoModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        videoModalRef.current &&
        !videoModalRef.current.contains(event.target as Node)
      ) {
        setIsVideoVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const isInWatchlist =
      watchlistTotalItems > 0 && movie
        ? localStorage.getItem("watchlist")?.includes(movie.id.toString())
        : false;

    setIsInWatchlist(isInWatchlist!);
  }, [watchlistTotalItems, movie]);
  const handleWatchTrailer = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }
  const handleAddToWatchlist = (movie: UpcomingMovies) => {
    setIsInWatchlist(!isInWatchlist);
    dispatch(addToWatchlist({ ...movie }));
  };

  return (
    <div className="details">
      <img
        className="details__background"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title as string}
      />
      <div className="details__gen-container">
        <div className="details__f-d-container">
          <div className="details__details-container">
            {movie && (
              <div className="details__details">
                <h2 className="details__title">
                  {movie.title}{" "}
                  <span className="details__date">
                    ({formatYear(movie.release_date)})
                  </span>
                </h2>
                <p className="details__overview">{movie.overview}</p>
                <div className="details__details-divers">
                  <div className="details__genres">
                    <img
                      className="details__icon "
                      src={genre}
                      alt="icon-details"
                    />
                    {movie.genres &&
                      movie.genres.map((genre, index) => (
                        <span className="details__genre-item" key={genre.id}>
                          &nbsp; {genre.name}
                          {index < movie.genres.length - 1 && ", "}
                        </span>
                      ))}
                  </div>
                  <div className="details__vote-details">
                    <span className="details__vote">
                      <img
                        className="details__icon "
                        src={star}
                        alt="icon-details"
                      />
                      {movie.vote_average}
                    </span>
                    <span className="details__vote">
                      <img
                        className="details__icon "
                        src={count}
                        alt="icon-details"
                      />
                      {movie.vote_count}
                    </span>
                    <span className="details__vote">
                      <img
                        className="details__icon "
                        src={calendar}
                        alt="icon-details"
                      />
                      {formatFullDate(movie.release_date)}
                    </span>
                  </div>
                </div>
                <div className="details__button-container">
                  <Button
                    onClick={() =>
                      handleAddToWatchlist(movie as UpcomingMovies)
                    }
                    type="view"
                    icon={addIcon}
                    children={
                      isInWatchlist
                        ? "Remove from Watchlist"
                        : "Add to Watchlist"
                    }
                  />
                  <Button
                    type="view"
                    icon={videoPlay}
                    children="Watch Trailer"
                    onClick={handleWatchTrailer}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="details__poster-box">
            <img
              className="details__poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title as string}
            />
          </div>
        </div>

        {isVideoVisible && videoData && (
          <div ref={videoModalRef}>
            <VideoModal
              onClose={handleWatchTrailer}
              videoKey={videoData.results[0]?.key}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpMovieDetails;
