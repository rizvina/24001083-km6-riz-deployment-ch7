import React from "react";
import "../AboutUs.css"; // Import file CSS untuk gaya tambahan
import movieImage from "../assets/nonton tv.jpg";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-800 to-red-900">
      <div className="bg-white rounded-lg shadow-lg p-12 space-y-8 max-w-4xl">
        <h2 className="text-7xl font-extrabold leading-relaxed text-red-700">
          WELCOME IMOVIE APP{" "}
        </h2>
        <div className="flex justify-center items-center space-x-8">
          <div className="rounded-full overflow-hidden border-8 border-red-700 w-80 h-80 flex-shrink-0">
            <img
              src={movieImage}
              alt="Nonton TV"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-800 text-2xl leading-relaxed">
            Selamat datang di iMovie App! Kami menyediakan informasi untuk
            menonton film yang unik dan memuaskan untuk Anda.
          </p>
        </div>
        <div className="text-center mt-8">
          <Link
            to="/"
            className="bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300"
          >
            Home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
