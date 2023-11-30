import { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import SliderGenre from "../../components/Slider/SliderGenre";
import { useFetchUpcomingDataQuery } from "../../store/fetchDataSlice";
import { UpcomingMovies, formatFullDate, genreIdToName } from "../../models";
import "./UpcomingMovie.scss";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../../store/watchlistSlice";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import imdb from "../../assets/imdb.png";
import videoPlay from "../../assets/video-play.png";
import addIcon from "../../assets/add.png"
const UpcomingMovie = () => {
  const {
    data: upcomingData,
    isLoading,
    isError,
  } = useFetchUpcomingDataQuery();
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<UpcomingMovies[]>([]);
  const [selectedItem, setSelectedItem] = useState<UpcomingMovies | null>(
    filteredItems[0] || null
  );

  useEffect(() => {
    if (upcomingData && upcomingData.results.length > 0) {
      const filtered = upcomingData.results.filter(
        (movie) => !selectedGenre || movie.genre_ids.includes(selectedGenre)
      );
      setFilteredItems(filtered);
      setSelectedItem(filtered[0] || null);
    }
  }, [upcomingData, selectedGenre]);

  const handleSliderSelect = (index: number) => {
    setSelectedItem(filteredItems[index] || null);
  };

  const handleGenreSelect = (
    genre: number | null,
    firstMovie: UpcomingMovies | null
  ) => {
    setSelectedGenre(genre);

    const filtered =
      upcomingData?.results.filter(
        (movie) => !genre || movie.genre_ids.includes(genre)
      ) || [];
    setFilteredItems(filtered);
    setSelectedItem(firstMovie || filtered[0] || null);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError || !upcomingData) {
    return <div>Error fetching upcoming movie data</div>;
  }

  if (!upcomingData.results.length) {
    return <div>No data</div>;
  }

  const handleAddToWL = (movie: UpcomingMovies) => {
    dispatch(
      addToWatchlist({
        ...movie,
        source: "UpcomingMovies",
      })
    );
  };

  return (
    <div className="upcoming">
      <div className="upcoming__linear">
        <Header />
      </div>
      <img
        className="upcoming__background"
        src={`https://image.tmdb.org/t/p/original${selectedItem?.backdrop_path}`}
        alt={selectedItem?.title}
      />
      <div className="upcoming__filter">
        <SliderGenre<UpcomingMovies>
          items={upcomingData.results}
          onSelectGenre={handleGenreSelect}
        />
      </div>

      <div className="upcoming__icon-container">
        <img className="upcoming__icon" src={imdb} alt="icon-social" />
        <img className="upcoming__icon" src={instagram} alt="icon-social" />
        <img className="upcoming__icon" src={twitter} alt="icon-social" />
      </div>

      <div className="upcoming__details-container">
        {selectedItem && (
          <div className="upcoming__details">
            <h2 className="upcoming__title">
              {selectedItem.title}{" "}
              <span className="upcoming__date">
                ({formatFullDate(selectedItem.release_date)})
              </span>
            </h2>
            <p className="upcoming__overview">{selectedItem.overview}</p>
            <div className="upcoming__genres">
              {selectedItem.genre_ids.map((genreId, index) => (
                <span key={genreId}>
                  {genreIdToName[genreId]}
                  {index < selectedItem.genre_ids.length - 1 && ", "}
                </span>
              ))}
            </div>
            <div className="upcoming__vote-details">
              <span className="upcoming__vote">
                {formatFullDate(selectedItem.release_date)}
              </span>
            </div>
            <div className="upcoming__button-container">
              <Button
                onClick={() => handleAddToWL(selectedItem)}
                type="view"
                icon={addIcon}
                children="Add to watchlist"
              />
              <Button type="view" icon={videoPlay} children="Watch Trailer" />
            </div>
          </div>
        )}
      </div>
      <div className="upcoming__title-overlay">
        {selectedItem && (
          <h2 className="upcoming__selected-title">{selectedItem.title}</h2>
        )}
      </div>
      <div className="upcoming__slider-container">
        <Slider
          slides={filteredItems}
          visibleItemsNumber={4}
          selectedSlide={selectedItem}
          onSelectItem={handleSliderSelect}
        >
          {(movie: UpcomingMovies) => (
            <div key={movie.id} className="upcoming__movie-item">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className={`upcoming__img ${
                  selectedItem === movie ? "upcoming__selected" : ""
                }`}
                onClick={() => setSelectedItem(movie)}
              />
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default UpcomingMovie;
