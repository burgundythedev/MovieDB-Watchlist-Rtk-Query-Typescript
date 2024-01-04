import Button from "../../components/UI/Button";
import { useState, useEffect, useRef } from "react";
import Slider from "../../components/Slider/Slider";
import {
  useFetchTVShowDataQuery,
  useFetchVideosQuery,
} from "../../store/fetchDataSlice";
import {
  TVShow,
  formatFullDate,
  formatYear,
  genreIdToName,
} from "../../models";
import "./Shows.scss";
import VideoModal from "../../components/UI/VideoModal";
import { useDispatch, useSelector } from "react-redux";
import {
  WatchlistItem,
  addToWatchlist,
  deleteFromWatchlist,
  selectWatchlistItems,
} from "../../store/watchlistSlice";
import videoPlay from "../../assets/video-play.png";
import addIcon from "../../assets/add.png";
import count from "../../assets/vote-count.png";
import genre from "../../assets/genre.png";
import star from "../../assets/star.png";
import calendar from "../../assets/calendar.png";
import Loader from "../../components/UI/Loader";
import FilterGenre from "../../components/Filter/FilterGenre";

const PopTVShowList = () => {
  const dispatch = useDispatch();
  const watchlistItems: WatchlistItem[] = useSelector(selectWatchlistItems);

  const watchlistTotalItems = useSelector(
    (state: { watchlist: { totalItems: number } }) => state.watchlist.totalItems
  );

  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<TVShow[]>([]);
  const [selectedItem, setSelectedItem] = useState<TVShow | null>(
    filteredItems[0] || null
  );
  const [isGrid, setIsGrid] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { data: tvShowData, isLoading, isError } = useFetchTVShowDataQuery();
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
  const handleResizeBis = () => {
    const newWindowWidth = window.innerWidth;

    setIsGrid(newWindowWidth >= 1100);

    setWindowWidth(newWindowWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResizeBis);

    return () => {
      window.removeEventListener("resize", handleResizeBis);
    };
  }, []);
  useEffect(() => {
    if (tvShowData && tvShowData.results.length > 0) {
      const filtered = tvShowData.results.filter(
        (tvShow) => !selectedGenre || tvShow.genre_ids.includes(selectedGenre)
      );
      setFilteredItems(filtered);
      setSelectedItem(filtered[0] || null);
    }
  }, [tvShowData, selectedGenre]);

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
      setIsGrid(!isGrid);
    }
  };
  const handleGenreSelect = (genre: number | null) => {
    setSelectedGenre(genre);

    const filtered =
      tvShowData?.results.filter(
        (movie: { genre_ids: number[] }) =>
          !genre || movie.genre_ids.includes(genre)
      ) || [];
    setFilteredItems(filtered);

    const selectedIndex = filtered.findIndex((item) => item === selectedItem);

    setSelectedItem(filtered[selectedIndex >= 0 ? selectedIndex : 0] || null);
  };

  const handleAddToWL = (tvShow: TVShow) => {
    setIsInWatchlist(!isInWatchlist);

    if (isInWatchlist) {
      dispatch(deleteFromWatchlist(tvShow));
    } else {
      dispatch(addToWatchlist(tvShow));
    }
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
  if (isLoading || !tvShowData) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching TV show data</div>;
  }

  if (!tvShowData.results.length) {
    return <div>No data</div>;
  }

  return (
    <div className="show">
      {windowWidth >= 712 && selectedItem && selectedItem.backdrop_path && (
        <img
          className="show__background"
          src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
          alt={selectedItem.name as string}
        />
      )}
      <div className="show__gen-container">
        <div className="show__f-d-container">
          <div className="show__f-d-box">
            <div className="show__filter">
              <FilterGenre<TVShow>
                items={tvShowData.results}
                onSelectGenre={handleGenreSelect}
              />
            </div>
            <div className="show__details-container">
              {selectedItem && (
                <div className="show__details">
                  <h2 className="show__title">
                    {selectedItem.name}{" "}
                    <span className="show__date">
                      ({formatYear(selectedItem.first_air_date)})
                    </span>
                  </h2>
                  <p className="show__overview">{selectedItem.overview}</p>
                  <div className="show__details-divers">
                    <div className="show__genres">
                      <img
                        className="show__icon "
                        src={genre}
                        alt="icon-details"
                      />
                      {selectedItem.genre_ids.map((genreId, index) => (
                        <span className="show__genre-item" key={genreId}>
                          &nbsp; {genreIdToName[genreId]}
                          {index < selectedItem.genre_ids.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div className="show__vote-details">
                      <span className="show__vote">
                        <img
                          className="show__icon "
                          src={star}
                          alt="icon-details"
                        />
                        {selectedItem.vote_average}
                      </span>
                      <span className="show__vote">
                        <img
                          className="show__icon "
                          src={count}
                          alt="icon-details"
                        />
                        {selectedItem.vote_count}
                      </span>
                      <span className="show__vote">
                        <img
                          className="show__icon "
                          src={calendar}
                          alt="icon-details"
                        />
                        {formatFullDate(selectedItem.first_air_date)}
                      </span>
                    </div>
                  </div>
                  <div className="show__button-container">
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
        <div className="show__slider-container">
          {windowWidth < 712 && selectedItem && selectedItem.backdrop_path && (
            <img
              className="show__background-responsive"
              src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
              alt={selectedItem.name as string}
            />
          )}
          <Slider
            slides={filteredItems}
            visibleItemsNumber={windowWidth < 712 ? 1 : isGrid ? 20 : 5}
            selectedSlide={selectedItem}
            onSelectItem={handleSliderSelect}
            isGrid={isGrid}
          >
            {(show: TVShow) => (
              <div key={show.id} className="show__movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                  alt={show.name}
                  className={`show__img ${
                    selectedItem === show ? "show__selected" : ""
                  }`}
                  onClick={() => setSelectedItem(show)}
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
      <div className="show__title-overlay">
        {selectedItem && (
          <h2 className="show__selected-title">{selectedItem.name}</h2>
        )}
      </div>
    </div>
  );
};

export default PopTVShowList;
