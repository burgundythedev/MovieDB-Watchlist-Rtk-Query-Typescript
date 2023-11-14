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
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
  };
  
  export type TVShow = {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
  };
  export type UpcomingMovies = {
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
  };