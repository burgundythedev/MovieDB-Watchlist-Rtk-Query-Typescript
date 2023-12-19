import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import VideoModal from "../../components/UI/VideoModal";
import {
  useFetchUpcomingMovieByIdQuery,
  useFetchVideosQuery,
} from "../../store/fetchDataSlice";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import github from "../../assets/github.png";
import star from "../../assets/star.png";
import videoPlay from "../../assets/video-play.png";
import watchlist from "../../assets/add.png";
import count from "../../assets/vote-count.png";
import genre from "../../assets/genre.png";
import "./Details.scss";
import {  UpcomingMovies, formatFullDate } from "../../models";
import {
  addToWatchlist,
  selectWatchlistTotalItems,
} from "../../store/watchlistSlice";
import { useDispatch, useSelector } from "react-redux";
const UpMovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const watchlistTotalItems = useSelector(selectWatchlistTotalItems);

  const { data: UpMovie } = useFetchUpcomingMovieByIdQuery(Number(id));
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { data: videoData } = useFetchVideosQuery(UpMovie?.id || 0);
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
      watchlistTotalItems > 0 && UpMovie
        ? localStorage.getItem("watchlist")?.includes(UpMovie.id.toString())
        : false;

    setIsInWatchlist(isInWatchlist!);
  }, [watchlistTotalItems, UpMovie]);
  const handleWatchTrailer = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  if (!UpMovie) {
    return <div>Loading...</div>;
  }
  const handleAddToWatchlist = (upMovie: UpcomingMovies) => {
    setIsInWatchlist(!isInWatchlist);
    dispatch(addToWatchlist({ ...upMovie }));
  };
  return (
    <div className="details">
      <img
        className="details__background"
        src={`https://image.tmdb.org/t/p/original${UpMovie.backdrop_path}`}
        alt={UpMovie.title}
      />

      <div className="details__icon-container">
        <a
          href="https://github.com/burgundythedev?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="details__icon" src={github} alt="icon-social" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="details__icon" src={instagram} alt="icon-social" />
        </a>
        <a
          href="https://twitter.com/KeusKulte"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="details__icon" src={twitter} alt="icon-social" />
        </a>
      </div>

      <div className="details__details-container">
        <div className="details__details">
          <h2 className="details__title">{UpMovie.title}</h2>
          <p className="details__overview">{UpMovie.overview}</p>
          <div className="details__genres">
            <img
              className="details__icon details__icon--detail"
              src={genre}
              alt="icon-details"
            />
            {UpMovie.genres.map((genre, index) => (
              <span className="details__genre-item" key={genre.id}>
                {genre.name}
                {index < UpMovie.genres.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div className="details__vote-details">
            <span className="details__vote">
              <img
                className="details__icon details__icon--detail"
                src={star}
                alt="icon-details"
              />
              {UpMovie.vote_average}
            </span>
            <span className="details__vote">
              <img
                className="details__icon details__icon--detail"
                src={count}
                alt="icon-details"
              />
              {UpMovie.vote_count}
            </span>
            <span className="details__vote">
              {formatFullDate(UpMovie.release_date)}
            </span>
          </div>
          <div className="details__button-container">
            <Button
              type="view"
              icon={watchlist}
              children={
                isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
              }
              onClick={() => handleAddToWatchlist(UpMovie)}
            />
            <Button
              type="view"
              icon={videoPlay}
              children="Watch Trailer"
              onClick={handleWatchTrailer}
            />
          </div>
        </div>
      </div>
      <div className="details__title-overlay">
        {UpMovie && <h2 className="details__selected-title">{UpMovie.title}</h2>}
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
  );
};

export default UpMovieDetails;
