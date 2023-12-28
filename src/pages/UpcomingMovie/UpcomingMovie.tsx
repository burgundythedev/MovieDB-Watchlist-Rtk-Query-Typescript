import { useState, useEffect, useRef } from "react";
import Slider from "../../components/Slider/Slider";
import FilterGenre from "../../components/Filter/FilterGenre";
import {
  useFetchUpcomingDataQuery,
  useFetchVideosQuery,
} from "../../store/fetchDataSlice";
import {
  UpcomingMovies,
  formatFullDate,
  formatYear,
  genreIdToName,
} from "../../models";
import "./UpcomingMovie.scss";
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
import Loader from "../../components/UI/Loader";

const UpcomingMovie = () => {
  const {
    data: upcomingData,
    isLoading,
    isError,
  } = useFetchUpcomingDataQuery();
  const dispatch = useDispatch();
  
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<UpcomingMovies[]>([]);
  const [selectedItem, setSelectedItem] = useState<UpcomingMovies | null>(
    filteredItems[0] || null
  );
  const [isGrid, setIsGrid] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const watchlistItems: WatchlistItem[] = useSelector(selectWatchlistItems);

  const watchlistTotalItems = useSelector(
    (state: { watchlist: { totalItems: number } }) => state.watchlist.totalItems
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
    if (upcomingData && upcomingData.results.length > 0) {
      const filtered = upcomingData.results.filter(
        (movie: { genre_ids: number[] }) =>
          !selectedGenre || movie.genre_ids.includes(selectedGenre)
      );
      setFilteredItems(filtered);
      setSelectedItem(filtered[0] || null);
    }
  }, [upcomingData, selectedGenre]);

  const handleSliderSelect = (index: number) => {
    if (index >= 0) {
      setSelectedItem(filteredItems[index] || null);
    } else {
      setIsGrid(!isGrid);
    }
  };

  useEffect(() => {
    const isInWatchlist =
      watchlistTotalItems > 0 && selectedItem
        ? watchlistItems.some((item) => item.id === selectedItem.id)
        : false;

    setIsInWatchlist(isInWatchlist);
  }, [watchlistTotalItems, selectedItem, watchlistItems]);

  const handleGenreSelect = (genre: number | null) => {
    setSelectedGenre(genre);

    const filtered =
      upcomingData?.results.filter(
        (movie: { genre_ids: number[] }) =>
          !genre || movie.genre_ids.includes(genre)
      ) || [];
    setFilteredItems(filtered);

    const selectedIndex = filtered.findIndex((item) => item === selectedItem);

    setSelectedItem(filtered[selectedIndex >= 0 ? selectedIndex : 0] || null);
  };

  const handleAddToWL = (movie: UpcomingMovies) => {
    setIsInWatchlist(!isInWatchlist);
    dispatch(
      addToWatchlist({
        ...movie,
      })
    );
  };

  const handleWatchTrailer = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isLoading || !upcomingData) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching upcoming movie data</div>;
  }

  if (!upcomingData.results.length) {
    return <div>No data</div>;
  }

  return (
    <div className="upcoming">
      {windowWidth >= 712 && selectedItem && selectedItem.backdrop_path && (
        <img
          className="upcoming__background"
          src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
          alt={selectedItem.title as string}
        />
      )}
      <div className="upcoming__gen-container">
        <div className="upcoming__f-d-container">
          <div className="upcoming__f-d-box">
            <div className="upcoming__filter">
              <FilterGenre<UpcomingMovies>
                items={upcomingData.results}
                onSelectGenre={handleGenreSelect}
              />
            </div>
            <div className="upcoming__details-container">
              {selectedItem && (
                <div className="upcoming__details">
                  <h2 className="upcoming__title">
                    {selectedItem.title}{" "}
                    <span className="upcoming__date">
                      ({formatYear(selectedItem.release_date)})
                    </span>
                  </h2>
                  <p className="upcoming__overview">{selectedItem.overview}</p>
                  <div className="upcoming__details-divers">
                    <div className="upcoming__genres">
                      <img
                        className="upcoming__icon "
                        src={genre}
                        alt="icon-details"
                      />
                      {selectedItem.genre_ids.map((genreId, index) => (
                        <span className="upcoming__genre-item" key={genreId}>
                          &nbsp; {genreIdToName[genreId]}
                          {index < selectedItem.genre_ids.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div className="upcoming__vote-details">
                      <span className="upcoming__vote">
                        <img
                          className="upcoming__icon "
                          src={star}
                          alt="icon-details"
                        />
                        {selectedItem.vote_average}
                      </span>
                      <span className="upcoming__vote">
                        <img
                          className="upcoming__icon "
                          src={count}
                          alt="icon-details"
                        />
                        {selectedItem.vote_count}
                      </span>
                      <span className="upcoming__vote">
                        <img
                          className="upcoming__icon "
                          src={calendar}
                          alt="icon-details"
                        />
                        {formatFullDate(selectedItem.release_date)}
                      </span>
                    </div>
                  </div>
                  <div className="upcoming__button-container">
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
        <div className="upcoming__slider-container">
          {windowWidth < 712 && selectedItem && selectedItem.backdrop_path && (
            <img
              className="upcoming__background-responsive"
              src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
              alt={selectedItem.title as string}
            />
          )}
          <Slider
            slides={filteredItems}
            visibleItemsNumber={windowWidth < 712 ? 1 : isGrid ? 20 : 5}
            selectedSlide={selectedItem}
            onSelectItem={handleSliderSelect}
            isGrid={isGrid}
          >
            {(movie: UpcomingMovies) => (
              <div key={movie.id} className="upcoming__movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={`upcoming__img ${
                    selectedItem === movie ? "upcoming__selected" : ""
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
      <div className="upcoming__title-overlay">
        {selectedItem && (
          <h2 className="upcoming__selected-title">{selectedItem.title}</h2>
        )}
      </div>
    </div>
  );
};

export default UpcomingMovie;
