import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchupComingMovies,
  fetchTrendingMovies,
  fetchpeople,
} from "../redux/actions/movieActions";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  console.log("movie", movie);

  // Fungsi renderRatingStars digunakan untuk menghasilkan tampilan bintang rating berdasarkan nilai rating yang diberikan.
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
    return stars; // Kembalikan array yang berisi elemen-elemen bintang yang telah dibuat
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

const Moviecard = ({ title, movies }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const PeopleCard = ({ person }) => {
  const navigate = useNavigate();
  console.log("persom", person);

  // const handleClick = () => {
  //   navigate("/person-detail", { state: { id: person.id } });
  // };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      // onClick={handleClick}
    >
      {person.profile_path && (
        <img
          className="w-full h-auto"
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt=""
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2 text-white">{person.name}</h2>
        <p className="text-gray-300">{person.known_for_department}</p>
        <p className="text-gray-300">{person.popularity}</p>
      </div>
    </div>
  );
};

const PeopleCardGrid = ({ title, people }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {people?.map((person) => (
          <PeopleCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch(); // Dapatkan akses ke dispatch
  const token = useSelector((state) => state?.auth?.token);
  const topRatedMovies = useSelector((state) => state?.movie?.topMovies); // Sesuaikan dengan cara Anda menyimpan data top rated movies
  const nowPlayingMovies = useSelector((state) => state?.movie?.nowplaying);
  const popularMovies = useSelector((state) => state?.movie?.popularMovies);
  const upcomingMovies = useSelector((state) => state?.movie?.upcoming);
  const trendingMovies = useSelector((state) => state?.movie?.trendingMovies);
  const people = useSelector((state) => state?.movie?.people);
  console.log("people", people);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPopularMovies());
        dispatch(fetchTopRatedMovies());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchupComingMovies());
        dispatch(fetchTrendingMovies());
        dispatch(fetchpeople(1));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
    // Atur guliran ke bagian atas ketika komponen mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-red-800 min-h-screen">
      <Navbar />
      <div>
        {!token && ( // Tampilkan tautan LOGIN dan REGISTER jika pengguna belum login
          <div>
            {/* Header untuk pengguna yang belum login */}
            <Header />
            <div className="container mx-auto p-4">
              <div className="bg-red-500 text-white text-center py-4 rounded-lg shadow-lg">
                <p className="text-lg">
                  <span className="font-bold">Silakan masuk</span> atau{" "}
                  <span className="font-bold">daftar</span> untuk melihat
                  konten.{" "}
                  <Link to="/login" className="text-white font-bold underline">
                    Masuk
                  </Link>{" "}
                  atau{" "}
                  <Link
                    to="/register"
                    className="text-white font-bold underline"
                  >
                    Daftar
                  </Link>
                </p>
              </div>
            </div>
            <Footer />
          </div>
        )}
        {token && ( // Tampilkan tautan navigasi lainnya jika pengguna sudah login
          <div>
            <Header /> {/* Header untuk pengguna yang sudah login */}
            <div className="container mx-auto p-4">
              {/* Tampilkan konten film */}
              <div className="mb-20 mt-20">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Top Rated Movies
                  </h2>
                  <Link to="/all-top-rated" className="text-white mt-4 block">
                    View All Top Rated Movies
                  </Link>
                </div>
                <Moviecard movies={topRatedMovies} />
              </div>
              <div className="mb-20">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Now Playing Movies
                  </h2>
                  <Link to="/all-now-playing" className="text-white mt-4 block">
                    View All Now Playing Movies
                  </Link>
                </div>
                <Moviecard movies={nowPlayingMovies} />
              </div>
              <div className="mb-20">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Popular Movies
                  </h2>
                  <Link
                    to="/all-popular-movies"
                    className="text-white mt-4 block"
                  >
                    View All Popular Movies
                  </Link>
                </div>
                <Moviecard movies={popularMovies} />
              </div>
              <div className="mb-20">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Upcoming Movies
                  </h2>
                  <Link
                    to="/all-upcoming-movies"
                    className="text-white mt-4 block"
                  >
                    View All Upcoming Movies
                  </Link>
                </div>
                <Moviecard movies={upcomingMovies} />
              </div>
              <div className="mb-20">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Trending Movies
                  </h2>
                  <Link
                    to="/all-trending-movies"
                    className="text-white mt-4 block"
                  >
                    View All Trending Movies
                  </Link>
                </div>
                <Moviecard movies={trendingMovies} />
              </div>
              <div className="mb-20">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Popular People
                  </h2>
                  <Link to="/all-people" className="text-white mt-4 block">
                    View All Popular People
                  </Link>
                </div>
                <PeopleCardGrid people={people.slice(0, 8)} />
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
