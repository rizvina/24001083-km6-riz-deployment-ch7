import React, { useEffect, useState } from "react";
import "../App.css";
import { FaPlay } from "react-icons/fa";
import Navbar from "../Components/Navbar"; // Import komponen Navbar
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPopularMovies, playTrailer } from "../redux/actions/movieActions";

export default function Home() {
  const [currentMovie, setCurrentMovie] = useState(0);
  const movies = useSelector((state) => state.movie.popularMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, []);

  useEffect(() => {
    // Set interval untuk mengubah currentMovie setiap 2 detik
    const interval = setInterval(() => {
      setCurrentMovie((prevMovie) => (prevMovie + 1) % movies.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="carousel-container">
        <div className="carousel">
          {/* Menggunakan method map untuk menampilkan setiap film dari state movies */}
          {movies.map((movie, index) => (
            <div
              key={index} // Set kunci unik untuk setiap elemen dalam daftar
              className={`carousel-slide ${
                index === currentMovie ? "show" : ""
              }`} // Menambahkan kelas "show" pada slide yang sedang ditampilkan
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
              }}
            >
              <div className="overlay flex flex-col mb-36 font-extrabold text-white">
                <h1 className="text-6xl whitespace-normal max-w-sm mb-3">
                  {movie.title} {/* Menampilkan judul film */}
                </h1>
                <p className="max-w-sm">{movie.overview.slice(0, 75)}... </p>

                <div className="left-0 p-4 mr-2">
                  {/* Tombol untuk memutar trailer */}
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500 flex items-center"
                    onClick={() =>
                      dispatch(playTrailer(movies[currentMovie].id))
                    }
                  >
                    <FaPlay className="mr-2" />
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
