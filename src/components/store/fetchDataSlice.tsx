import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

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

export const moviedbApi = createApi({
  reducerPath: "moviedbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (builder) => ({
    fetchPopularMovieData: builder.query<MovieData, void>({
      query: () => `discover/movie?sort_by=popularity.desc&api_key=${apiKey}`,
    }),
    fetchTVShowData: builder.query<TVShowData, void>({
      query: () =>
        `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&without_genres=string&api_key=${apiKey}`,
    }),
    fetchUpcomingData: builder.query<UpcomingCineData, void>({
      query: () => `movie/upcoming?language=en-US&page=2&api_key=${apiKey}`,
    }),

    fetchMovieById: builder.query<Movie, number>({
      query: (id) => `movie/${id}?language=en-US&api_key=${apiKey}`,
    }),

    fetchTVShowById: builder.query<TVShow, number>({
      query: (id) => `tv/${id}?language=en-US&api_key=${apiKey}`,
    }),

    fetchUpcomingMovieById: builder.query<UpcomingMovies, number>({
      query: (id) => `movie/${id}?language=en-US&api_key=${apiKey}`,
    }),
    
  }),
});

export const {
  useFetchPopularMovieDataQuery,
  useFetchTVShowDataQuery,
  useFetchUpcomingDataQuery,
  useFetchMovieByIdQuery,
  useFetchTVShowByIdQuery,
  useFetchUpcomingMovieByIdQuery,
} = moviedbApi;
