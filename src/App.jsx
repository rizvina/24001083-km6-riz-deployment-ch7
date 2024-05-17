import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import AllTopRatedMovies from "./Pages/AllTopRatedMovies";
import AllNowPlayingMovies from "./Pages/AllNowPlayingMovies";
import MovieDetail from "./Pages/MovieDetail";
import Login from "./Pages/Login";
import GoogleLogin from "./Pages/GoogleLogin";
import AllPopularMovies from "./Pages/AllPopularMovies";
import AllUpcomingMovies from "./Pages/AllUpcomingMovies";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import AllTrendingMovies from "./Pages/AllTrendingMovies";
import AllPeople from "./Pages/AllPeople";
import PersonDetail from "./Pages/PersonDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./Components/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google" element={<GoogleLogin />} />
        <Route path="/register" element={<Register />} />
        {/* Melindungi rute-rute yang memerlukan login */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/all-top-rated" element={<AllTopRatedMovies />} />
        <Route path="/all-now-playing" element={<AllNowPlayingMovies />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
        <Route path="/person-detail" element={<PersonDetail />} />
        <Route path="/all-popular-movies" element={<AllPopularMovies />} />
        <Route path="/all-people" element={<AllPeople />} />
        <Route path="/all-upcoming-movies" element={<AllUpcomingMovies />} />
        <Route path="/all-trending-movies" element={<AllTrendingMovies />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <ToastContainer />{" "}
      {/* Tempatkan di sini untuk memastikan toast muncul di seluruh aplikasi */}
    </Router>
  );
}

export default App;
