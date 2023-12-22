import { useState, useEffect, useMemo } from "react";
import { MovieGenre, TVShowGenre } from "../../models";
import "./FilterGenre.scss";
import filter from "../../assets/filter.png";
type FilterItem = {
  genre_ids: number[];
};

type FilterGenreProps<T extends FilterItem> = {
  items: T[];
  isTVShow?: boolean;
  onSelectGenre: (genre: number | null, firstItem: T | null) => void;
};

const FilterGenre = <T extends FilterItem>({
  items,
  isTVShow = false,
  onSelectGenre,
}: FilterGenreProps<T>) => {
  const genres = isTVShow
    ? Object.values(TVShowGenre)
    : Object.values(MovieGenre);

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const uniqueGenreIds = useMemo(
    () => Array.from(new Set(items.flatMap((item) => item.genre_ids))),
    [items]
  );

  const filteredGenres = useMemo(
    () => [
      -1,
      ...genres.filter((genre) => uniqueGenreIds.includes(genre as number)),
    ],
    [genres, uniqueGenreIds]
  );

  useEffect(() => {
    if (selectedGenre !== null) {
      const genreNumber = selectedGenre === -1 ? null : selectedGenre;
      const firstItemWithGenre =
        genreNumber !== null
          ? items.find(
              (item) =>
                item.genre_ids.includes(genreNumber) &&
                typeof item.genre_ids[0] === "number"
            ) || null
          : items.length > 0
          ? items[0]
          : null;
      onSelectGenre(genreNumber, firstItemWithGenre);
    }
  }, [selectedGenre, items, onSelectGenre]);

  return (
    <div className="genre">
      <img className="genre__icon " src={filter} alt="icon-filter" />
      <select
        className="genre__select"
        value={selectedGenre === null ? "" : selectedGenre}
        onChange={(e) =>
          setSelectedGenre(e.target.value === "" ? null : +e.target.value)
        }
      >
        <option className="genre__option" value="-1">
          All
        </option>
        {filteredGenres.map((genre) => (
          <option
            key={genre}
            className={`genre__option ${
              isTVShow ? "tv-show-genre" : "movie-genre"
            }`}
            value={genre}
          >
            {isTVShow ? (
              <span className="tv-show-genre-text">
                {TVShowGenre[genre as number]}
              </span>
            ) : (
              <span className="movie-genre-text">
                {MovieGenre[genre as number]}
              </span>
            )}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterGenre;
