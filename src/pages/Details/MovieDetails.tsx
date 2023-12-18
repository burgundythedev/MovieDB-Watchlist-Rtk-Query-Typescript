import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import VideoModal from "../../components/UI/VideoModal";
import { useFetchMovieByIdQuery, useFetchVideosQuery } from "../../store/fetchDataSlice";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import github from "../../assets/github.png";
import star from "../../assets/star.png";
import videoPlay from "../../assets/video-play.png";

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie } = useFetchMovieByIdQuery(Number(id));
  const [isVideoVisible, setIsVideoVisible] = useState(false);
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

  const handleWatchTrailer = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  if (!movie) {
    return <div>Loading...</div>; // You can show a loading indicator or handle the case where movie is undefined
  }

  return (
    <div className="popular">
      <img
        className="popular__background"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />

      <div className="popular__icon-container">
        <a
          href="https://github.com/burgundythedev?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="popular__icon" src={github} alt="icon-social" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="popular__icon" src={instagram} alt="icon-social" />
        </a>
        <a
          href="https://twitter.com/KeusKulte"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="popular__icon" src={twitter} alt="icon-social" />
        </a>
      </div>

      <div className="popular__details-container">
        <div className="popular__details">
          <h2 className="popular__title">{movie.title}</h2>
          <p className="popular__overview">{movie.overview}</p>
          <div className="popular__genres">
            {/* You can add genre-related code here if needed */}
          </div>
          <div className="popular__vote-details">
            <span className="popular__vote">
              <img
                className="popular__icon popular__icon--detail"
                src={star}
                alt="icon-details"
              />
              {movie.vote_average}
            </span>
            {/* You can add other vote-related code here if needed */}
          </div>
          <div className="popular__button-container">
            <Button
              type="view"
              icon={videoPlay}
              children="Watch Trailer"
              onClick={handleWatchTrailer}
            />
          </div>
        </div>
      </div>
      <div className="popular__title-overlay">
        {movie && <h2 className="popular__selected-title">{movie.title}</h2>}
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

export default MovieDetails;
