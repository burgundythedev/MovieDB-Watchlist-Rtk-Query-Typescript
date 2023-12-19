import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, TVShow, UpcomingMovies } from "../models";

export type WatchlistItem = Movie | TVShow | UpcomingMovies;

export interface WatchlistState {
  items: WatchlistItem[];
  totalItems: number;
}

const initialState: WatchlistState = {
  items: JSON.parse(
    localStorage.getItem("watchlist") || "[]"
  ) as WatchlistItem[],
  totalItems: JSON.parse(localStorage.getItem("watchlist") || "[]").length,
};
const storedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
initialState.items = storedWatchlist;
initialState.totalItems = storedWatchlist.length;
export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<WatchlistItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex === -1) {
        state.items.push({ ...action.payload });
      } else {
        state.items.splice(existingIndex, 1);
      }

      localStorage.setItem("watchlist", JSON.stringify(state.items));
      state.totalItems = state.items.length;
    },

    deleteFromWatchlist: (state, action: PayloadAction<WatchlistItem>) => {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.items = updatedItems;
      localStorage.setItem("watchlist", JSON.stringify(updatedItems));
      state.totalItems = updatedItems.length;
    },
  },
});

export const { addToWatchlist, deleteFromWatchlist } = watchlistSlice.actions;


export const selectWatchlistItems = (state: { watchlist: { items: WatchlistItem[] } }) => state.watchlist.items;

export const selectWatchlistTotalItems = (state: {
  watchlist: { totalItems: number };
}) => state.watchlist.totalItems;
