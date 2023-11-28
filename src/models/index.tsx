export type MovieData = {
  results: Movie[];
};
export type TVShowData = {
  results: TVShow[];
};
export type UpcomingCineData = {
  results: UpcomingMovies[];
};
export type Movie = {
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
};

export type TVShow = {
  id: number;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  backdrop_path: string;
};
export type UpcomingMovies = {
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  genre_ids: number[]; 
};
export enum MovieGenre {
  Action = 28,
  Adventure = 12,
  Animation = 16,
  Comedy = 35,
  Crime = 80,
  Documentary = 99,
  Drama = 18,
  Family = 10751,
  Fantasy = 14,
  History = 36,
  Horror = 27,
  Music = 10402,
  Mystery = 9648,
  Romance = 10749,
  SciFi = 878,
  TVMovie = 10770,
  Thriller = 53,
  War = 10752,
  Western = 37,
}

export enum TVShowGenre {
  ActionAdventure = 10759,
  Animation = 16,
  Comedy = 35,
  Crime = 80,
  Documentary = 99,
  Drama = 18,
  Family = 10751,
  Kids = 10762,
  Mystery = 9648,
  News = 10763,
  Reality = 10764,
  SciFiFantasy = 10765,
  Soap = 10766,
  Talk = 10767,
  WarPolitics = 10768,
  Western = 37,
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const formatYear = (dateString: string): string => {
  const year = new Date(dateString).getFullYear();
  return `${year}`;
};

export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};


export const genreIdToName = {
  ...MovieGenre,
};