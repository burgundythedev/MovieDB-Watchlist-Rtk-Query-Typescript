import { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import { useFetchUpcomingDataQuery } from "../../store/fetchDataSlice";
import {
  UpcomingMovies,
  formatFullDate,
  formatYear,
  genreIdToName,
} from "../../models";
import "./UpcomingMovie.scss";
import voteCount from "../../assets/vote-count.png";
import star from "../../assets/star.png";
import genreIcon from "../../assets/genre.png";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button";
import SliderGenre from "../../components/Slider/SliderGenre";

const UpcomingMovie = () => {
  const {
    data: upcomingData,
    isLoading,
    isError,
  } = useFetchUpcomingDataQuery();

  const [selectedItem, setSelectedItem] = useState<UpcomingMovies | null>(null);

  useEffect(() => {
    if (upcomingData && upcomingData.results.length > 0) {
      setSelectedItem(upcomingData.results[0]);
    }
  }, [upcomingData]);

  const handleSliderSelect = (index: number) => {
    setSelectedItem(upcomingData?.results[index] || null);
  };

  if (isLoading) {
    return <div>Loading upcoming movie data...</div>;
  }

  if (isError || !upcomingData) {
    return <div>Error fetching upcoming movie data</div>;
  }

  if (!upcomingData.results.length) {
    return <div>No upcoming movies available</div>;
  }
console.log(upcomingData)
  return (
    <div className="upcoming">
      <Header />
      <img
        className="upcoming__background"
        src={`https://image.tmdb.org/t/p/original${selectedItem?.backdrop_path}`}
        alt={selectedItem?.title}
      />
      <div className="upcoming__filter">
        <SliderGenre/>
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
            <div className="upcoming__genres">
              <img
                className="upcoming__icon upcoming__icon--genre"
                src={genreIcon}
                alt="genre-icon"
              />
              {selectedItem.genre_ids.map((genreId, index) => (
                <span key={genreId}>
                  {genreIdToName[genreId]}
                  {index < selectedItem.genre_ids.length - 1 && ", "}
                </span>
              ))}
            </div>
            <div className="upcoming__vote-details">
              <div className="upcoming__count">
                <span>{selectedItem.vote_average}</span>
                <img className="upcoming__icon" src={star} alt="polls-icon" />
              </div>
              <div className="upcoming__count">
                <span>{selectedItem.vote_count}</span>
                <img
                  className="upcoming__icon"
                  src={voteCount}
                  alt="polls-icon"
                />
              </div>
              <span className="upcoming__vote">
                {formatFullDate(selectedItem.release_date)}
              </span>
            </div>
            <div className="upcoming__button-container">
              <Button type="view" children="Add to watchlist" />
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
          slides={upcomingData.results}
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
