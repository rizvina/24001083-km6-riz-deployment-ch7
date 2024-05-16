import axios from "axios";
import {
  setPopularMovies,
  setTrailerplay,
  setMovieId,
  setTopRatedMovies,
  setNowPlayingMovies,
  setUpcomingMovies,
  setMovieDetail,
  setTrendingMovies,
  setPeople,
  setCurrentPage,
} from "../reducers/movieReducer";

export const fetchPopularMovies = () => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    // Memperbarui di reducers dengan daftar film populer
    dispatch(setPopularMovies(response.data.results.slice(0, 8)));
  } catch (error) {
    console.error("Error fetching popular movies: ", error);
  }
};

export const fetchTopRatedMovies = () => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`
    );
    // Memperbarui di reducers dengan daftar film top rated
    dispatch(setTopRatedMovies(response.data.results.slice(0, 8)));
  } catch (error) {
    console.error("Error fetching top rated movies: ", error);
  }
};

export const fetchNowPlayingMovies = () => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    dispatch(setNowPlayingMovies(response.data.results.slice(0, 8)));
  } catch (error) {
    console.error("Error fetching now playibng movies: ", error);
  }
};

export const fetchupComingMovies = () => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    dispatch(setUpcomingMovies(response.data.results.slice(0, 8)));
  } catch (error) {
    console.error("Error fetching upcomigs movies: ", error);
  }
};

export const fetchTrendingMovies = () => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day",
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    dispatch(setTrendingMovies(response.data.results.slice(0, 8))); // Menggunakan setTrendingMovies untuk mengatur nilai properti trend
  } catch (error) {
    console.error("Error fetching trending movies: ", error); // Memperbaiki pesan kesalahan
  }
};

// export const fetchpeople = (page) => async (dispatch) => {
//   const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`
//       // // `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
//       // `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
//     );
//     dispatch(setPeople(response.data.results));
//   } catch (error) {
//     console.error("Error fetching upcomigs movies: ", error);
//   }
// };

export const fetchpeople = (page) => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    dispatch(setPeople(response.data.results));
  } catch (error) {
    console.error("Error fetching popular people: ", error);
  }
};

// export const fetchpeople = (page) => async (dispatch) => {
//   const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`
//       // // `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
//       // `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
//     );
//     dispatch(setPeople(response.data.results));
//   } catch (error) {
//     console.error("Error fetching upcomigs movies: ", error);
//   }
// };

// export const fetchpeople = (page) => async (dispatch) => {
//   const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}&language=en-US`
//     );
//     dispatch(setPeople(response.data.results));
//     dispatch(setCurrentPage(page));
//   } catch (error) {
//     console.error("Error fetching people: ", error);
//   }
// };

export const fetchMovieDetail = (movieId) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`
      );
      dispatch(setMovieDetail(response.data));
    } catch (error) {
      console.error("Error fetching movie detail: ", error);
    }
  };
};

export const playTrailer = (movieId) => async (dispatch) => {
  try {
    const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en`
    );
    const videos = response.data.results;
    if (videos.length > 0) {
      const trailerKey = videos[0].key;
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
      // Memperbarui store Redux dengan trailer film
      dispatch(setTrailerplay(response.data.results));
    } else {
      console.log("Tidak ada trailer tersedia untuk film ini.");
    }
  } catch (err) {
    console.error("Error fetching trailer: ", err);
  }
};

export const selectMovie = (movieId) => async (dispatch) => {
  try {
    dispatch(setMovieId(movieId));
    dispatch(setTrailerplay(movieId));
  } catch (err) {
    console.error("Error selecting movie: ", err);
  }
};

export const searchPerson = (query, page) => async (dispatch) => {
  try {
    const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

    const response = await axios.get(
      // `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=${currentPage}`
      `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${API_KEY}&language=en-US&page=${page}`
    );

    // Memeriksa apakah ada hasil yang ditemukan
    if (response.data.results.length === 0) {
      // Menampilkan alert jika tidak ada hasil yang ditemukan
      alert("Tidak ada person dengan nama ini");
    } else {
      // Set hasil pencarian sebagai daftar film yang sedang tayang menggunakan action creator setAllNowPlaying
      dispatch(setPeople(response.data.results));
    }
  } catch (error) {
    console.log("Error fetching data: ", error);
    // Atau bisa juga menangani error fetching data dengan mengirim action creator yang mengatur state untuk menampilkan pesan ke pengguna
    // dispatch(setSearchError("Error fetching data. Please try again later."));
  }
};
