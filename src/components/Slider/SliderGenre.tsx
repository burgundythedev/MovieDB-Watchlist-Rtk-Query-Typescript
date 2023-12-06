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
  const [selectedGenre, setSelectedGenre] = useState<number>(-1);

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
      const selectedIndex = filteredGenres.indexOf(selectedGenre);
      setStart(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [selectedGenre, filteredGenres]);

  const handleGenreClick = (
    genre: string | TVShowGenre | MovieGenre | number
  ) => {
    const genreNumber = typeof genre === "string" ? parseInt(genre, 10) : genre;

    setSelectedGenre((prevSelectedGenre) =>
      prevSelectedGenre === genreNumber ? -1 : genreNumber
    );

    let firstItemWithGenre: T | null = null;

    if (genreNumber === -1) {
      firstItemWithGenre = items.length > 0 ? items[0] : null;
      onSelectGenre(null, firstItemWithGenre);
    } else {
      firstItemWithGenre =
        items.find(
          (item) =>
            item.genre_ids.includes(genreNumber) &&
            typeof item.genre_ids[0] === "number"
        ) || null;

      if (!firstItemWithGenre) {
        firstItemWithGenre =
          items.find(
            (item) =>
              item.genre_ids[0] === genreNumber &&
              typeof item.genre_ids[0] === "number"
          ) || null;
      }

      onSelectGenre(genreNumber, firstItemWithGenre);
    }
  };

  const handleArrowClick = (isUpArrow: boolean) => {
    const currentIndex =
      selectedGenre !== null ? filteredGenres.indexOf(selectedGenre) : -1;

    let nextIndex = isUpArrow ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex < 0) {
      nextIndex = filteredGenres.length - 1;
    } else if (nextIndex >= filteredGenres.length) {
      nextIndex = 0;
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
          className={`genre__item ${selectedGenre === -1 ? "all-selected" : ""}`}
          onClick={() => handleGenreClick(-1)}
        >
          <span className={selectedGenre === -1 ? "selected-text" : ""}>
            All
          </span>
        </li>
        {filteredGenres.slice(start, start + 1).map((genre) => (
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
      </ul>
      <img
        className="genre__arrow genre__arrow--down"
        src={arrowDown}
        alt="arrowdown"
        onClick={() => handleArrowClick(false)}
      />
    </div>
  );
};

export default SliderGenre;
