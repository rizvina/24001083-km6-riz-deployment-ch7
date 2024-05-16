import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movieID: null,
  currentPage: 1,
  query: "",
  timeWindow: "week",
};

const movieSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    setTrending: (state, action) => {
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
    setTimeWindow: (state, action) => {
      state.timeWindow = action.payload;
    },
  },
});

export const {
  setTrending,
  setMovieId,
  setQuery,
  setCurrentPage,
  setTimeWindow,
} = movieSlice.actions;

export default movieSlice.reducer;
