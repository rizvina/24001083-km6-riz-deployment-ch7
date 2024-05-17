import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getupComing,
  searchMovies,
  selectMovie,
} from "../redux/actions/upcomingActions";
import {
  setCurrentPage,
  setQuery,
  setSortBy,
} from "../redux/reducers/upcomingReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const renderRatingStars = (rating) => {
    const stars = [];
    const numStars = Math.round(rating / 2);
    for (let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  const handleClick = () => {
    navigate("/movie-detail", { state: { id: movie.id } });
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      onClick={handleClick}
    >
      <img
        className="w-full h-auto"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2 text-white">{movie.title}</h2>
        <p className="text-gray-300">Release date: {movie.release_date}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {renderRatingStars(movie.vote_average)}
            <span className="text-white ml-1">
              {movie?.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllUpcomingMovies = () => {
  const currentPage = useSelector((state) => state.up.currentPage);
  const query = useSelector((state) => state.up.query);
  const sortBy = useSelector((state) => state.up.sortBy);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.up.movies);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getupComing(1));
    dispatch(setCurrentPage(1));
    window.scrollTo({ top: 0 }); // Menggulir halaman ke atas dengan efek halus
    if (!token) {
      alert("Perlu login untuk akses halaman ini.");
      navigate("/login");
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(setQuery(""));
    dispatch(setSortBy(""));
    dispatch(setCurrentPage(1)); // Reset currentPage to 1 when clearing search
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Silakan masukkan judul di pencarian.");
      return;
    }
    dispatch(setCurrentPage(1)); // Reset currentPage to 1 for new search
    dispatch(searchMovies(query, 1));
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(setCurrentPage(1));
      dispatch(getupComing(1));
    }
    dispatch(setQuery(e.target.value));
  };

  const loadMore = (direction) => {
    let newPage;
    if (direction === "next") {
      newPage = currentPage + 1;
    } else if (direction === "previous" && currentPage > 1) {
      newPage = currentPage - 1;
    } else {
      // Jika direction tidak valid atau currentPage adalah 1 dan direction adalah 'previous', jangan lakukan apa-apa
      return;
    }

    // Perbarui currentPage dengan nilai yang baru
    dispatch(setCurrentPage(newPage));

    if (query.trim() !== "") {
      dispatch(searchMovies(query, newPage));
    } else {
      // Panggil action creator untuk mengambil data dengan currentPage yang baru
      dispatch(getupComing(newPage));
    }
    // Atur fokus kembali ke elemen pertama setelah memuat data baru
    window.scrollTo({ top: 0 }); // Menggulir halaman ke atas dengan efek halus
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    dispatch(setSortBy(newSortBy));
    dispatch(setCurrentPage(1));
    if (query.trim() !== "") {
      dispatch(searchMovies(query, 1, newSortBy));
    } else {
      dispatch(getupComing(1, newSortBy));
    }
  };

  const renderMovies = () => {
    let sortedMovies = [...movies];

    if (sortBy === "newest") {
      sortedMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }

    return query.length >= 3 && movies.length !== 0 ? movies : sortedMovies;
  };

  return (
    <div className="bg-red-800">
      <Navbar />
      <ToastContainer /> {/* Ini adalah komponen ToastContainer */}
      <div className="container mx-auto p-4">
        <div className="mb-40"></div>
        <div className="flex justify-between items-center mb-6">
          <div className="">
            <form onSubmit={handleSubmit} className="flex justify-start">
              <input
                type="text"
                placeholder="Search Movie"
                value={query}
                onChange={handleChange}
                className="rounded-xl h-8 bg-[#3a3333] text-white w-96 px-2"
              />
              <button
                type="submit"
                className="bg-orange-400 px-2 py-1 rounded-lg ml-2 text-white"
              >
                Search
              </button>
            </form>
          </div>
          <div>
            <label className="text-white mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-900 text-white border border-gray-700 rounded-md px-2 py-1"
            >
              <option value="newest">Newest Only</option>
            </select>
          </div>
          <h1 className="text-4xl text-center font-bold text-white">
            ALL UPCOMING MOVIES
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {renderMovies().map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              onClick={() => {
                dispatch(selectMovie(movie.id));
                navigate("/movie-detail");
              }}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {/* Elemen untuk memuat halaman sebelumnya */}
          {currentPage > 1 && (
            <div
              onClick={() => loadMore("previous")} // Memanggil loadMore dengan argumen 'previous'
              className="bg-blue-400 text-white py-3 px-6 rounded-full font-bold text-xl shadow-md hover:bg-blue-500 transition duration-300 mr-4 cursor-pointer"
            >
              Previous
            </div>
          )}
          {/* Elemen untuk memuat halaman berikutnya */}
          <div
            onClick={() => loadMore("next")} // Memanggil loadMore dengan argumen 'next'
            className="bg-yellow-400 text-white py-3 px-6 rounded-full font-bold text-xl shadow-md hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Next
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllUpcomingMovies;
