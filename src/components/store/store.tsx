import { configureStore } from "@reduxjs/toolkit";
import { moviedbApi } from "../Redux/fetchDataSlice";
import { watchlistSlice } from "../Redux/watchlistSlice";

const store = configureStore({
  reducer: {
    [moviedbApi.reducerPath]: moviedbApi.reducer,
    watchlist: watchlistSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviedbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
