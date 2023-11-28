import { useState } from 'react';
import { MovieGenre, TVShowGenre } from '../../models';
import './SliderGenre.scss';
import selectArrow from '../../assets/select-filter.png';

const SliderGenre = ({ isTVShow = false }: { isTVShow?: boolean }) => {
  const genres = isTVShow ? Object.values(TVShowGenre) : Object.values(MovieGenre);
  const filteredGenres = genres.filter((genre) => typeof genre === 'number');

  const [selectedGenre, setSelectedGenre] = useState<null | number>(null);

  const handleGenreClick = (genre: string | TVShowGenre | MovieGenre) => {
    // Convert genre to number if it's a string
    const genreNumber = typeof genre === 'string' ? parseInt(genre, 10) : genre;
    
    setSelectedGenre((prevSelectedGenre) =>
      prevSelectedGenre === genreNumber ? null : genreNumber
    );
  };

  return (
    <div className="genre">
      <ul className="genre__list">
        {filteredGenres.map((genre) => (
          <li
            className={`genre__item ${selectedGenre === genre ? 'selected' : ''}`}
            key={genre}
            onClick={() => handleGenreClick(genre)}
          >
            <span className={selectedGenre === genre ? 'selected-text' : ''}>
              {isTVShow ? TVShowGenre[genre as number] : MovieGenre[genre as number]}
            </span>
            {selectedGenre === genre && (
              <img className="genre__arrow" src={selectArrow} alt="arrow-filter" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderGenre;
