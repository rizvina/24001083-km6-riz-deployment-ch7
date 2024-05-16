import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movieID: null,
  currentPage: 1,
  query: "",
  sortBy: "newest",
};

const movieSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {
    setupComing: (state, action) => {
      state.movies = action.payload;
    },
    setMovieId: (state, action) => {
      state.movieID = action.payload;
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

export const { setupComing, setMovieId, setQuery, setCurrentPage, setSortBy } =
  movieSlice.actions;

export default movieSlice.reducer;
