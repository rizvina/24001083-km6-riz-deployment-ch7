import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  playTrailer,
  fetchMovieDetail,
  fetchMovieCredits,
} from "../redux/actions/movieActions";
import { IoArrowBack } from "react-icons/io5";
import {
  setMovieCredits,
  setMovieDetail,
} from "../redux/reducers/movieReducer";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

export default function MovieDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const movieCredits = useSelector((state) => state?.movie?.movieCredits);
  const movieDetail = useSelector((state) => state?.movie?.movieDetail);

  useEffect(() => {
    dispatch(setMovieDetail(null));
    dispatch(setMovieCredits(null));
    dispatch(fetchMovieDetail(location?.state?.id));
    dispatch(fetchMovieCredits(location.state.id));
    window.scrollTo({ top: 0 }); // Menggulir halaman ke atas dengan efek halus
    if (!token) {
      alert("Perlu login untuk akses halaman ini.");
      navigate("/login");
    }
  }, [dispatch, location.state.id, token, navigate]);

  // Function to go back
  const handleBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };

  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-500 bg-blend-multiply h-auto"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetail?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-20 gap-10 items-center backdrop-blur-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`}
            alt={movieDetail?.title}
            className="w-auto h-auto rounded-lg"
          />
          <div className="text-white" key={movieDetail?.id}>
            <div className="bg-red-700 rounded-lg p-8 text-white">
              <h2 className="text-5xl font-extrabold mb-4 uppercase">
                {movieDetail?.title}
              </h2>
              <p className="text-lg mb-6">{movieDetail?.overview}</p>
              <div className="grid grid-cols-2 gap-4 text-white-400 font-bold">
                <div>
                  <p className="mb-2 uppercase">Release Date:</p>
                  <p className="font-normal">{movieDetail?.release_date}</p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Vote Average:</p>
                  <p className="font-normal">
                    {parseFloat(movieDetail?.vote_average).toFixed(1)}/10
                  </p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Popularity:</p>
                  <p className="font-normal">{movieDetail?.popularity}</p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Votes:</p>
                  <p className="font-normal">{movieDetail?.vote_count}</p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Duration:</p>
                  <p className="font-normal">{movieDetail?.runtime} minutes</p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Language:</p>
                  <p className="font-normal">
                    {movieDetail?.spoken_languages
                      ?.map((lang) => lang.name)
                      .join(", ")}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="mb-2 uppercase">Genres:</p>
                  <div className="flex flex-wrap gap-2">
                    {movieDetail?.genres?.map((genre, index) => (
                      <p
                        key={index}
                        className="font-normal rounded-full p-2 border bg-opacity-50"
                        style={{ border: "2px solid rgba(0, 0, 0, 0.5)" }} // Menambahkan garis tepi dengan warna background yang sama
                      >
                        {genre.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-10 mr-2">
                <button
                  className="relative overflow-hidden px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none transition-transform transform-gpu hover:scale-105"
                  onClick={() => {
                    dispatch(playTrailer(movieDetail.id));
                  }}
                >
                  <span className="absolute inset-0 bg-white opacity-25 transition-opacity duration-300"></span>
                  <FaPlay className="mr-2" />
                  Trailer
                </button>
                <div className="mt-10 mr-2">
                  <span
                    className="flex items-center cursor-pointer"
                    onClick={handleBack}
                  >
                    <IoArrowBack className="mr-2" /> Back
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
          <h2 className="text-5xl font-extrabold mb-10 text-white">
            ALL CASTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movieCredits?.cast?.map((credit) => (
              <div
                key={credit.id}
                className="bg-red-700 rounded-lg overflow-hidden shadow-lg"
              >
                {credit.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                    alt={credit.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-300 flex justify-center items-center">
                    <span className="text-white">No Image Available</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {credit.name}
                  </h3>
                  <p className="text-base text-gray-300">{credit.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
