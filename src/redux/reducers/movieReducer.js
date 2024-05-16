import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: [],
  topMovies: [],
  nowplaying: [],
  upcoming: [],
  trailerr: [],
  trendingMovies: [],
  people: [],
  selectedMovieId: null, //
  movies: [],
  movieDetail: null,
  currentPage: 1,
  query: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topMovies = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      state.nowplaying = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcoming = action.payload;
    },
    setTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    setPeople: (state, action) => {
      state.people = action.payload;
    },
    setMovieId: (state, action) => {
      state.selectedMovieId = action.payload; // Mengatur selectedMovieId dari payload action
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const {
  setPopularMovies,
  setTopRatedMovies,
  setNowPlayingMovies,
  setUpcomingMovies,
  setTrailerplay,
  setTrendingMovies,
  setPeople,
  setMovieId,
  setMovies,
  setMovieDetail,
  setCurrentPage,
  setQuery,
} = movieSlice.actions;

export default movieSlice.reducer;
