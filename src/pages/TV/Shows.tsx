import Button from "../../components/UI/Button";
import { useState, useEffect, useRef } from "react";
import Slider from "../../components/Slider/Slider";
import SliderGenre from "../../components/Filter/FilterGenre";
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
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import github from "../../assets/github.png";
import videoPlay from "../../assets/video-play.png";
import addIcon from "../../assets/add.png";
import count from "../../assets/vote-count.png";
import genre from "../../assets/genre.png";
import star from "../../assets/star.png";
import Loader from "../../components/UI/Loader";

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
    setSelectedItem(filteredItems[index] || null);
  };

  const handleGenreSelect = (
    genre: number | null,
    firstTVShow: TVShow | null
  ) => {
    setSelectedGenre(genre);

    const filtered =
      tvShowData?.results.filter(
        (tvShow) => !genre || tvShow.genre_ids.includes(genre)
      ) || [];
    setFilteredItems(filtered);
    setSelectedItem(firstTVShow || filtered[0] || null);
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

  if (isLoading || !tvShowData) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching popular TV show data</div>;
  }

  if (!tvShowData.results.length) {
    return <div>No data</div>;
  }

  return (
    <div className="shows">
      <img
        className="shows__background"
        src={`https://image.tmdb.org/t/p/original${selectedItem?.backdrop_path}`}
        alt={selectedItem?.name}
      />
      <div className="shows__filter">
        <SliderGenre<TVShow>
          items={tvShowData.results}
          onSelectGenre={handleGenreSelect}
        />
      </div>
      <div className="shows__icon-container">
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

      <div className="shows__details-container">
        {selectedItem && (
          <div className="shows__details">
            <h2 className="shows__title">
              {selectedItem.name}{" "}
              <span className="shows__date">
                ({formatYear(selectedItem.first_air_date)})
              </span>
            </h2>
            <p className="shows__overview">{selectedItem.overview}</p>
            <div className="shows__genres">
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
            <div className="shows__vote-details">
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
                {formatFullDate(selectedItem.first_air_date)}
              </span>{" "}
            </div>
            <div className="shows__button-container">
              <Button
                onClick={() => handleAddToWL(selectedItem)}
                type="view"
                icon={addIcon}
                children={
                  isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
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
      <div className="shows__title-overlay">
        {selectedItem && (
          <h2 className="shows__selected-title">{selectedItem.name}</h2>
        )}
      </div>
      <div className="shows__slider-container">
        <Slider
          slides={filteredItems}
          visibleItemsNumber={4}
          selectedSlide={selectedItem}
          onSelectItem={handleSliderSelect}
        >
          {(tvShow: TVShow) => (
            <div key={tvShow.id} className="shows__tv-show-item">
              <img
                src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`}
                alt={tvShow.name}
                className={`shows__img ${
                  selectedItem === tvShow ? "shows__selected" : ""
                }`}
                onClick={() => setSelectedItem(tvShow)}
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

export default PopTVShowList;
