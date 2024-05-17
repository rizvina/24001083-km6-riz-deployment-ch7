import axios from "axios";

import { setAllNowPlaying, setMovieId } from "../reducers/nowPlayingReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllNowPlaying = (currentPage) => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );

    // Set daftar film yang sedang tayang menggunakan action creator setAllNowPlaying
    dispatch(setAllNowPlaying(response.data.results));
  } catch (error) {
    console.error("Error fetching now playing movies: ", error);
  }
};

// Fungsi untuk memilih film berdasarkan ID
export const selectMovie = (movieId) => async (dispatch) => {
  try {
    // Set ID film yang dipilih menggunakan action creator setMovieId
    dispatch(setMovieId(movieId));
  } catch (err) {
    // Tangani kesalahan jika terjadi
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
      // Set hasil pencarian sebagai daftar film yang sedang tayang menggunakan action creator setAllNowPlaying
      dispatch(setAllNowPlaying(response.data.results));
    }
  } catch (error) {
    console.log("Error fetching data: ", error);
    // Atau bisa juga menangani error fetching data dengan mengirim action creator yang mengatur state untuk menampilkan pesan ke pengguna
    // dispatch(setSearchError("Error fetching data. Please try again later."));
  }
};
