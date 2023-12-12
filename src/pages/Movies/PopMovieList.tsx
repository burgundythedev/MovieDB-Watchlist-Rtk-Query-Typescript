import { useState, useEffect, useRef } from "react";
import Slider from "../../components/Slider/Slider";
import SliderGenre from "../../components/Slider/SliderGenre";
import {
  useFetchPopularMovieDataQuery,
  useFetchVideosQuery,
} from "../../store/fetchDataSlice";
import { Movie, formatFullDate, genreIdToName } from "../../models";
import "./PopMovieList.scss";
import Button from "../../components/UI/Button";
import VideoModal from "../../components/UI/VideoModal";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../../store/watchlistSlice";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import github from "../../assets/github.png";
import videoPlay from "../../assets/video-play.png";
import addIcon from "../../assets/add.png";
import count from "../../assets/vote-count.png";
import genre from "../../assets/genre.png";
import star from "../../assets/star.png";
import Loader from "../../components/UI/Loader";

const PopMovieList = () => {
  const {
    data: movieData,
    isLoading,
    isError,
  } = useFetchPopularMovieDataQuery();
  const dispatch = useDispatch();
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<Movie[]>([]);
  const [selectedItem, setSelectedItem] = useState<Movie | null>(
    filteredItems[0] || null
  );

  const { data: videoData } = useFetchVideosQuery(selectedItem?.id || 0);

  const videoModalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      videoModalRef.current &&
      !videoModalRef.current.contains(event.target as Node)
    ) {
      setIsVideoVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (movieData && movieData.results.length > 0) {
      const filtered = movieData.results.filter(
        (movie) => !selectedGenre || movie.genre_ids.includes(selectedGenre)
      );
      setFilteredItems(filtered);
      setSelectedItem(filtered[0] || null);
    }
  }, [movieData, selectedGenre]);

  const handleSliderSelect = (index: number) => {
    setSelectedItem(filteredItems[index] || null);
  };

  const handleGenreSelect = (
    genre: number | null,
    firstMovie: Movie | null
  ) => {
    setSelectedGenre(genre);

    const filtered =
      movieData?.results.filter(
        (movie) => !genre || movie.genre_ids.includes(genre)
      ) || [];
    setFilteredItems(filtered);
    setSelectedItem(firstMovie || filtered[0] || null);
  };

  const handleAddToWL = (movie: Movie) => {
    dispatch(
      addToWatchlist({
        ...movie,
        source: "PopMovieList",
      })
    );
  };

  const handleWatchTrailer = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  if (isLoading || !movieData) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching popular movie data</div>;
  }

  if (!movieData.results.length) {
    return <div>No data</div>;
  }

  return (
    <div className="popular">
      <img
        className="popular__background"
        src={`https://image.tmdb.org/t/p/original${selectedItem?.backdrop_path}`}
        alt={selectedItem?.title}
      />
      <div className="popular__filter">
        <SliderGenre<Movie>
          items={movieData.results}
          onSelectGenre={handleGenreSelect}
        />
      </div>
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
        {selectedItem && (
          <div className="popular__details">
            <h2 className="popular__title">{selectedItem.title}</h2>
            <p className="popular__overview">{selectedItem.overview}</p>
            <div className="popular__genres">
              <img
                className="popular__icon popular__icon--detail"
                src={genre}
                alt="icon-details"
              />
              {selectedItem.genre_ids.map((genreId, index) => (
                <span className="popular__genre-item" key={genreId}>
                  {genreIdToName[genreId]}
                  {index < selectedItem.genre_ids.length - 1 && ", "}
                </span>
              ))}
            </div>
            <div className="popular__vote-details">
              <span className="popular__vote">
                <img
                  className="popular__icon popular__icon--detail"
                  src={star}
                  alt="icon-details"
                />
                {selectedItem.vote_average}
              </span>
              <span className="popular__vote">
                <img
                  className="popular__icon popular__icon--detail"
                  src={count}
                  alt="icon-details"
                />
                {selectedItem.vote_count}
              </span>
              <span className="popular__vote">
                {formatFullDate(selectedItem.release_date)}
              </span>
            </div>
            <div className="popular__button-container">
              <Button
                onClick={() => handleAddToWL(selectedItem)}
                type="view"
                icon={addIcon}
                children="Add to watchlist"
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
      <div className="popular__title-overlay">
        {selectedItem && (
          <h2 className="popular__selected-title">{selectedItem.title}</h2>
        )}
      </div>
      <div className="popular__slider-container">
        <Slider
          slides={filteredItems}
          visibleItemsNumber={4}
          selectedSlide={selectedItem}
          onSelectItem={handleSliderSelect}
        >
          {(movie: Movie) => (
            <div key={movie.id} className="popular__movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className={`popular__img ${
                  selectedItem === movie ? "popular__selected" : ""
                }`}
                onClick={() => setSelectedItem(movie)}
                loading="lazy"
              />
            </div>
          )}
        </Slider>
      </div>

      {isVideoVisible && selectedItem && videoData && (
        <div ref={videoModalRef}>
          <VideoModal
            onClose={handleWatchTrailer}
            videoKey={videoData?.results[0]?.key}
          />
        </div>
      )}
    </div>
  );
};

export default PopMovieList;
