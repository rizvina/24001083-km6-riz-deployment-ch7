import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import {
  setIsLoggedIn,
  setToken,
  setuserData,
} from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state?.auth?.token);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Konfirmasi sebelum logout
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      // Menghapus token dari local storage saat tombol logout diklik
      dispatch(setToken(null));
      // Mengatur state userData menjadi null setelah logout
      dispatch(setuserData(null));
      // Set status login menjadi false setelah logout
      dispatch(setIsLoggedIn(false));
      // Redirect ke halaman login atau halaman utama setelah logout
      navigate("/"); // Ganti dengan halaman tujuan yang sesuai
    }
  };

  return (
    <div className="flex items-start justify-start fixed top-0 left-0 right-0 z-40 bg-gray-800">
      <div className="flex justify-between px-6 py-3 items-center lg:px-10 w-full">
        <Link
          to="/"
          className="flex items-center text-yellow-400 font-bold lg:text-6xl text-lg"
        >
          <BiSolidMoviePlay className="mr-2" />
          <span>IMovie </span>
        </Link>
        <div className="hidden lg:flex justify-between items-center ml-2 w-2/3">
          <div className="flex w-full justify-end">
            {!token && ( // Tampilkan tautan LOGIN dan REGISTER jika pengguna belum login
              <>
                <Link
                  className="text-white font-bold text-md hover:text-gray-800 mt-4 mr-4 py-2 px-4 bg-red-600 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  to={`/login`}
                >
                  LOGIN
                </Link>
                <Link
                  className="text-white font-bold text-md hover:text-gray-800 mt-4 mr-4 py-2 px-4 bg-yellow-400 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  to={`/register`}
                >
                  REGISTER
                </Link>
              </>
            )}
            {token && ( // Tampilkan tautan navigasi lainnya jika pengguna sudah login
              <>
                <Link // Tampilkan tautan HOME jika pengguna sudah login
                  className="text-white text-md hover:text-yellow-400 px-4 py-2 mt-4"
                  to={`/`}
                >
                  HOME
                </Link>
                <Link
                  className="text-white text-md hover:text-yellow-400 px-4 py-2 mt-4"
                  to={`/all-now-playing`}
                >
                  NOW PLAYING
                </Link>
                <Link
                  className="text-white text-md hover:text-yellow-400 px-4 py-2 mt-4"
                  to={`/all-popular-movies`}
                >
                  POPULAR
                </Link>
                <div className="relative">
                  <button
                    className="text-white text-md hover:text-yellow-400 px-4 py-2 mt-4 mr-2 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    MORE
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 bg-gray-800 text-white py-2 mt-2 rounded-md shadow-lg">
                      <Link
                        to="/all-top-rated"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        TOP RATED
                      </Link>
                      <Link
                        to={`/all-upcoming-movies`}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        UPCOMING
                      </Link>
                      <Link
                        to={`/all-trending-movies`}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        TRENDING
                      </Link>
                      <Link
                        to={`/all-people`}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        PEOPLE
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex items-center px-4 mt-4 mr-4">
                  <Link to="/profile">
                    <RiAccountCircleFill className="text-white text-lg lg:text-3xl" />
                  </Link>
                </div>
                <Link // Tampilkan tautan logout jika pengguna sudah login
                  to="/"
                  onClick={handleLogout}
                  className="text-white font-bold text-md hover:text-gray-800 mt-4 py-2 px-4 bg-red-600 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  LOGOUT
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
