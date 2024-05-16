import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
  //   movieID: null,
  currentPage: 1,
  query: "",
  //   sortBy: "latest",
};

const movieSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
    },
    // setMovieId: (state, action) => {
    //   state.movieID = action.payload;
    // },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // setSortBy: (state, action) => {
    //   state.sortBy = action.payload;
    // },
  },
});

export const { setPeople, setQuery, setCurrentPage } = movieSlice.actions;

export default movieSlice.reducer;
