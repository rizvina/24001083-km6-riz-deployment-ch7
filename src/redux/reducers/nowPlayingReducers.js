import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movieID: null,
  currentPage: 1,
  query: "",
  sortBy: "latest, oldest, title-asc, title-desc",
};

const movieSlice = createSlice({
  name: "playing",
  initialState,
  reducers: {
    setAllNowPlaying: (state, action) => {
      state.movies = action.payload; // Mengubah movies bukan allnowplaying
    },
    setMovieId: (state, action) => {
      state.movieID = action.payload; // Mengubah movieID
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setAllNowPlaying,
  setMovieId,
  setCurrentPage,
  setSortBy,
  setQuery,
} = movieSlice.actions;

export default movieSlice.reducer;
