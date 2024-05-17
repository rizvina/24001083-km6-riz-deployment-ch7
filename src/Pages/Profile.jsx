import React, { useState, useEffect } from "react";
import { fetchUserData } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import dayjs from "dayjs";

function ProfilePage() {
  const [showDetails, setShowDetails] = useState(false);
  const userData = useSelector((state) => state.auth.user);
  console.log("userData", userData);
  const token = useSelector((state) => state.auth.token);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      alert("Perlu login untuk akses halaman ini.");
      Navigate("/login");
    }
    dispatch(fetchUserData(token));
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="bg-gradient-to-b from-red-800 to-red-900 min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-red-700 to-red-900">
          <h2 className="text-lg font-semibold text-white">
            Welcome, {userData?.name}!
          </h2>
          <Link to="/" className="flex items-center text-sm text-white">
            <IoIosArrowBack className="mr-1" />
            Back
          </Link>
        </div>
        <div className="py-6 px-8">
          <div className="flex justify-center mb-6">
            {userData?.profilePicture ? (
              <img
                src={userData?.profilePicture}
                alt="Profile"
                className="rounded-full w-32 h-32"
              />
            ) : (
              <RiAccountCircleFill className="text-gray-400 w-32 h-32" />
            )}
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              {userData?.name}
            </h1>
            <p className="text-gray-600 text-sm mb-4">{userData?.email}</p>
          </div>
          <div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full mb-4 shadow-md"
            >
              {showDetails ? "Hide Details" : "Show Details"}
            </button>
            {showDetails && (
              <div className="bg-gray-200 rounded-lg p-6 shadow-md">
                <p className="text-2xl font-bold text-gray-800 mb-2 text-center">
                  USER DETAILS{" "}
                </p>
                <p className="text-gray-700">
                  <strong>Created:</strong>{" "}
                  {dayjs(userData?.createdAt).format("YYYY-MM-DD")}
                </p>
                {/* <p className="text-gray-700">
                  <strong>Created:</strong> {userData?.createdAt}
                </p> */}
                <p className="text-gray-700">
                  <strong>Email:</strong> {userData?.email}
                </p>
                <p className="text-gray-700">
                  <strong>Id:</strong> {userData?.id}
                </p>
                <p className="text-gray-700">
                  <strong>Name:</strong> {userData?.name}
                </p>
                <p className="text-gray-700">
                  <strong>Type:</strong> {userData?.type}
                </p>
                {/* Tambahkan informasi tambahan lainnya */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
