import { useState, useEffect, useMemo } from "react";
import { MovieGenre, TVShowGenre } from "../../models";
import "./SliderGenre.scss";

import arrowDown from "../../assets/arrow-down.png";
import arrowUp from "../../assets/arrow-up.png";

type SliderItem = {
  genre_ids: number[];
};

type SliderGenreProps<T extends SliderItem> = {
  items: T[];
  isTVShow?: boolean;
  onSelectGenre: (genre: number | null, firstItem: T | null) => void;
};

const SliderGenre = <T extends SliderItem>({
  items,
  isTVShow = false,
  onSelectGenre,
}: SliderGenreProps<T>) => {
  const genres = isTVShow
    ? Object.values(TVShowGenre)
    : Object.values(MovieGenre);

  const [start, setStart] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<null | number>(null);

  // Extract unique genre IDs from the provided list of items
  const uniqueGenreIds = useMemo(
    () => Array.from(new Set(items.flatMap((item) => item.genre_ids))),
    [items]
  );

  // Filter genres based on unique genre IDs
  const filteredGenres = useMemo(
    () => [
      -1,
      ...genres.filter((genre) => uniqueGenreIds.includes(genre as number)),
    ],
    [genres, uniqueGenreIds]
  );

  useEffect(() => {
    // Update start index when selectedGenre changes
    if (selectedGenre !== null) {
      const selectedIndex = filteredGenres.indexOf(selectedGenre);
      setStart(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [selectedGenre, filteredGenres]);

  const handleGenreClick = (
    genre: string | TVShowGenre | MovieGenre | number
  ) => {
    const genreNumber = typeof genre === "string" ? parseInt(genre, 10) : genre;

    setSelectedGenre((prevSelectedGenre) =>
      prevSelectedGenre === genreNumber ? null : genreNumber
    );

    let firstItemWithGenre: T | null = null;

    if (genreNumber === -1) {
      // If "No Filter" is selected, choose the first item
      firstItemWithGenre = items.length > 0 ? items[0] : null;
    } else {
      // Otherwise, find the first item with the selected genre
      firstItemWithGenre =
        items.find(
          (item) =>
            item.genre_ids.includes(genreNumber) &&
            typeof item.genre_ids[0] === "number"
        ) || null;
    }

    onSelectGenre(genreNumber === -1 ? null : genreNumber, firstItemWithGenre);
  };

  const handleArrowClick = (isUpArrow: boolean) => {
    const currentIndex =
      selectedGenre !== null ? filteredGenres.indexOf(selectedGenre) : -1;

    let nextIndex = isUpArrow ? currentIndex - 1 : currentIndex + 1;

    // Handle circular navigation
    if (nextIndex < 0) {
      nextIndex = filteredGenres.length - 1; // Go to the last item
    } else if (nextIndex >= filteredGenres.length) {
      nextIndex = 0; // Go to the first item
    }

    const nextGenre = filteredGenres[nextIndex];

    if (nextGenre !== undefined) {
      handleGenreClick(nextGenre);
    }
  };

  return (
    <div className="genre">
      <img
        className="genre__arrow genre__arrow--up"
        src={arrowUp}
        alt="arrowUp"
        onClick={() => handleArrowClick(true)}
      />
      <ul className="genre__list">
        <li
          className={`genre__item no-filter`}
          onClick={() => handleGenreClick(-1)}
        >
          <span className={selectedGenre === -1 ? "selected-text" : ""}>
            No Filter
          </span>
        </li>
        {filteredGenres.slice(start, start + 2).map((genre) => (
          <li
            className={`genre__item ${
              selectedGenre === genre ? "selected" : ""
            }`}
            key={genre}
            onClick={() => handleGenreClick(genre)}
          >
            <span className={selectedGenre === genre ? "selected-text" : ""}>
              {isTVShow
                ? TVShowGenre[genre as number]
                : MovieGenre[genre as number]}
            </span>
          </li>
        ))}
        <img
          className="genre__arrow genre__arrow--down"
          src={arrowDown}
          alt="arrowdown"
          onClick={() => handleArrowClick(false)}
        />
      </ul>
    </div>
  );
};

export default SliderGenre;
