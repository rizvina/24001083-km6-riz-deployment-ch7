import axios from "axios";
import { setMovieId, setTrending } from "../reducers/trendingReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getTrendMovies = (currentPage, timeWindow) => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${API_KEY}&page=${currentPage}`
    );
    dispatch(setTrending(response.data.results));
    console.log("response.data.results", response.data.results);
  } catch (error) {
    console.error("Error fetching popular movies: ", error);
  }
};

export const selectMovie = (movieId) => async (dispatch) => {
  try {
    dispatch(setMovieId(movieId));
  } catch (err) {
    console.error("Error selecting movie: ", err);
  }
};

export const searchMovies = (query, currentPage) => async (dispatch) => {
  try {
    const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );
    // Memeriksa apakah ada hasil yang ditemukan
    if (response.data.results.length === 0) {
      // Menampilkan alert jika tidak ada hasil yang ditemukan
      toast.error("Tidak ada film dengan judul ini");
    } else {
      dispatch(setTrending(response.data.results));
    }
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};
