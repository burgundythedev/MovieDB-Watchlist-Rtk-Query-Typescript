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

const UpcomingMovie = () => {
  const {
    data: upcomingData,
    isLoading,
    isError,
  } = useFetchUpcomingDataQuery();

  const [selectedItem, setSelectedItem] = useState<UpcomingMovies | null>(
    null
  );

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

  return (
    <div className="upcoming">
      <img
        className="upcoming__background"
        src={`https://image.tmdb.org/t/p/original${selectedItem?.backdrop_path}`}
        alt={selectedItem?.title}
      />
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
              {selectedItem.genre_ids.map((genreId, index) => (
                <span key={genreId}>
                  {genreIdToName[genreId]}
                  {index < selectedItem.genre_ids.length - 1 && ", "}
                </span>
              ))}
            </div>
            <div className="upcoming__vote-details">
              <span className="upcoming__vote">
                {selectedItem.vote_average}/10
              </span>
              <span className="upcoming__vote">{selectedItem.popularity}</span>
              <span className="upcoming__vote">
                {formatFullDate(selectedItem.release_date)}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="upcoming__title-overlay">
        {selectedItem && <h2 className="upcoming__selected-title">{selectedItem.title}</h2>}
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
