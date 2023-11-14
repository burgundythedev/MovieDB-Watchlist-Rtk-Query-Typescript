import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, TVShow, UpcomingMovies } from "../../models";


export type WatchlistItem =
  | (Movie & { source: string })
  | (TVShow & { source: string })
  | (UpcomingMovies & { source: string });

export interface WatchlistState {
  items: WatchlistItem[];
  totalItems: number;
}

const initialState: WatchlistState = {
  items: JSON.parse(localStorage.getItem("watchlist") || "[]") as WatchlistItem[],
  totalItems: 0,
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (
      state,
      action: PayloadAction<WatchlistItem & { source: string }>
    ) => {
      const exists = state.items.some(
        (item) =>
          item.id === action.payload.id && item.source === action.payload.source
      );

      if (!exists) {
        state.items.push({ ...action.payload });
        state.totalItems = state.items.length; 
        localStorage.setItem("watchlist", JSON.stringify(state.items));
      }
    },
    deleteFromWatchlist: (
      state,
      action: PayloadAction<WatchlistItem & { source: string }>
    ) => {
      const updatedItems = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.source === action.payload.source
          )
      );

      state.items = updatedItems;
      state.totalItems = updatedItems.length; 
      localStorage.setItem("watchlist", JSON.stringify(updatedItems));
    },
  },
});

export const { addToWatchlist, deleteFromWatchlist } = watchlistSlice.actions;
export const selectWatchlistTotalItems = (state: { watchlist: { totalItems: number; }; }) => state.watchlist.totalItems;


