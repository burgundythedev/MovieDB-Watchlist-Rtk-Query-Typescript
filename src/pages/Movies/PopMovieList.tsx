import { useState, useEffect, useRef } from "react";
import Slider from "../../components/Slider/Slider";
import {
  useFetchPopularMovieDataQuery,
  useFetchVideosQuery,
} from "../../store/fetchDataSlice";
import { Movie, formatFullDate, formatYear, genreIdToName } from "../../models";
import "./PopMovieList.scss";
import Button from "../../components/UI/Button";
import VideoModal from "../../components/UI/VideoModal";
import { useDispatch, useSelector } from "react-redux";
import {
  WatchlistItem,
  addToWatchlist,
  selectWatchlistItems,
} from "../../store/watchlistSlice";
import videoPlay from "../../assets/video-play.png";
import addIcon from "../../assets/add.png";
import count from "../../assets/vote-count.png";
import genre from "../../assets/genre.png";
import star from "../../assets/star.png";
import calendar from "../../assets/calendar.png";
import FilterGenre from "../../components/Filter/FilterGenre";

const PopMovieList = () => {
  const {
    data: movieData,
    isLoading,
    isError,
  } = useFetchPopularMovieDataQuery();
  const dispatch = useDispatch();
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<Movie[]>([]);
  const [selectedItem, setSelectedItem] = useState<Movie | null>(
    filteredItems[0] || null
  );
  const [isGrid, setIsGrid] = useState(false);
  const [windowResize, setWindowResize] = useState<number>(window.innerWidth);

  const { data: videoData } = useFetchVideosQuery(selectedItem?.id || 0);

  const videoModalRef = useRef<HTMLDivElement | null>(null);
  const watchlistItems: WatchlistItem[] = useSelector(selectWatchlistItems);

  const watchlistTotalItems = useSelector(
    (state: { watchlist: { totalItems: number } }) => state.watchlist.totalItems
  );



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
      videoModalRef.current = null;
    };
  }, [videoModalRef]);
  const handleResizeBis = () => {
    const newWindowWidth = window.innerWidth;

    setIsGrid(newWindowWidth >= 1100);

    setWindowResize(newWindowWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResizeBis);

    return () => {
      window.removeEventListener("resize", handleResizeBis);
    };
  }, [windowResize]);
  useEffect(() => {
    if (movieData && movieData.results.length > 0) {
      const filtered = movieData.results.filter(
        (movie) => !selectedGenre || movie.genre_ids.includes(selectedGenre)
      );
      setFilteredItems(filtered);
      setSelectedItem(filtered[0] || null);
    }
  }, [movieData, selectedGenre]);
  useEffect(() => {
    const isInWatchlist =
      watchlistTotalItems > 0 && selectedItem
        ? watchlistItems.some((item) => item.id === selectedItem.id)
        : false;

    setIsInWatchlist(isInWatchlist);
  }, [watchlistTotalItems, selectedItem, watchlistItems]);
  const handleSliderSelect = (index: number) => {
    if (index >= 0) {
      setSelectedItem(filteredItems[index] || null);
    } else {
      if (isGrid !== !isGrid) {
        setIsGrid(!isGrid);
      }
    }
  };

  const handleGenreSelect = (genre: number | null) => {
    setSelectedGenre(genre);

    const filtered =
      movieData?.results.filter(
        (movie: { genre_ids: number[] }) =>
          !genre || movie.genre_ids.includes(genre)
      ) || [];
    setFilteredItems(filtered);

    const selectedIndex = filtered.findIndex((item) => item === selectedItem);

    setSelectedItem(filtered[selectedIndex >= 0 ? selectedIndex : 0] || null);
  };

  const handleAddToWL = (movie: Movie) => {
    setIsInWatchlist(!isInWatchlist);
    dispatch(
      addToWatchlist({
        ...movie,
      })
    );
  };

  const handleResize = () => {
    setWindowResize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowResize]);
  const handleWatchTrailer = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  if (isLoading || !movieData) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error fetching popular movie data</div>;
  }

  if (!movieData.results.length) {
    return <div>No data</div>;
  }

  return (
    <div className="popular">
      {windowResize >= 712 && selectedItem && selectedItem.backdrop_path && (
        <img
          className="popular__background"
          src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
          alt={selectedItem.title as string}
        />
      )}
      <div className="popular__gen-container">
        <div className="popular__f-d-container">
          <div className="popular__f-d-box">
            <div className="popular__filter">
              <FilterGenre<Movie>
                items={movieData.results}
                onSelectGenre={handleGenreSelect}
              />
            </div>
            <div className="popular__details-container">
              {selectedItem && (
                <div className="popular__details">
                  <h2 className="popular__title">
                    {selectedItem.title}{" "}
                    <span className="popular__date">
                      ({formatYear(selectedItem.release_date)})
                    </span>
                  </h2>
                  <p className="popular__overview">{selectedItem.overview}</p>
                  <div className="popular__details-divers">
                    <div className="popular__genres">
                      <img
                        className="popular__icon "
                        src={genre}
                        alt="icon-details"
                      />
                      {selectedItem.genre_ids.map((genreId, index) => (
                        <span className="popular__genre-item" key={genreId}>
                          &nbsp; {genreIdToName[genreId]}
                          {index < selectedItem.genre_ids.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div className="popular__vote-details">
                      <span className="popular__vote">
                        <img
                          className="popular__icon "
                          src={star}
                          alt="icon-details"
                        />
                        {selectedItem.vote_average}
                      </span>
                      <span className="popular__vote">
                        <img
                          className="popular__icon "
                          src={count}
                          alt="icon-details"
                        />
                        {selectedItem.vote_count}
                      </span>
                      <span className="popular__vote">
                        <img
                          className="popular__icon "
                          src={calendar}
                          alt="icon-details"
                        />
                        {formatFullDate(selectedItem.release_date)}
                      </span>
                    </div>
                  </div>
                  <div className="popular__button-container">
                    <Button
                      onClick={() => handleAddToWL(selectedItem)}
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
          </div>
        </div>
        <div className="popular__slider-container">
          {windowResize < 712 && selectedItem && selectedItem.backdrop_path && (
            <img
              className="popular__background-responsive"
              src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
              alt={selectedItem.title as string}
            />
          )}
          <Slider
            slides={filteredItems}
            visibleItemsNumber={windowResize < 712 ? 1 : isGrid ? 20 : 5}
            selectedSlide={selectedItem}
            onSelectItem={handleSliderSelect}
            isGrid={isGrid}
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
      </div>
      {isVideoVisible && selectedItem && videoData && (
        <div ref={videoModalRef}>
          <VideoModal
            onClose={handleWatchTrailer}
            videoKey={videoData?.results[0]?.key}
          />
        </div>
      )}
      <div className="popular__title-overlay">
        {selectedItem && (
          <h2 className="popular__selected-title">{selectedItem.title}</h2>
        )}
      </div>
    </div>
  );
};

export default PopMovieList;
