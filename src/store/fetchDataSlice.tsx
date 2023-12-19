import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Movie,
  MovieData,
  TVShow,
  TVShowData,
  UpcomingMovies,
  UpcomingMoviesData,
  VideoData,
} from "../models";

const apiKey: string = import.meta.env.VITE_REACT_APP_API_KEY;

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
    fetchUpcomingData: builder.query<UpcomingMoviesData, void>({
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
    fetchVideos: builder.query<VideoData, number>({
      query: (movie_id) => `movie/${movie_id}/videos?api_key=${apiKey}`,
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
  useFetchVideosQuery,
} = moviedbApi;
