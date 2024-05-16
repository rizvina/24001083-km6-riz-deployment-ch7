import React, { useState, useEffect } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import GoogleLogin from "./GoogleLogin";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import bgr from "../assets/bgr.jpg";
import { setToken } from "../redux/reducers/authReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;
  const validEmailDomain =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|info)$/;

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    if (!newEmail.trim()) {
      setEmailError("Email tidak boleh kosong");
    } else if (!emailRegex.test(newEmail)) {
      setEmailError("Format email tidak valid");
    } else if (newEmail.length > 50) {
      setEmailError("Panjang email tidak boleh lebih dari 50 karakter");
    } else if (!validEmailDomain.test(newEmail)) {
      setEmailError("Email harus memiliki domain yang valid");
    } else {
      setEmailError(null);
    }

    setEmail(newEmail);
  };

  const handleEmailBlur = (event) => {
    const newEmail = event.target.value;

    if (!newEmail.trim()) {
      setEmailError("Email tidak boleh kosong");
    } else if (!emailRegex.test(newEmail)) {
      setEmailError("Format email tidak valid");
    } else if (newEmail.length > 50) {
      setEmailError("Panjang email tidak boleh lebih dari 50 karakter");
    } else if (!validEmailDomain.test(newEmail)) {
      setEmailError("Email harus memiliki domain yang valid");
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    if (!newPassword.trim()) {
      setPasswordError("Password tidak boleh kosong");
    } else if (newPassword.length < 4 || newPassword.length > 60) {
      setPasswordError("Sandi harus berisi antara 4 hingga 60 karakter");
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Sandi harus mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka. Pastikan juga untuk tidak menggunakan karakter spesial."
      );
    } else {
      setPasswordError(null);
    }
    setPassword(newPassword);
  };

  const handlePasswordBlur = (event) => {
    const newPassword = event.target.value;

    if (!newPassword.trim()) {
      setPasswordError("Password tidak boleh kosong");
    } else if (newPassword.length < 4 || newPassword.length > 60) {
      setPasswordError("Sandi harus berisi antara 4 hingga 60 karakter");
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Sandi harus mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka. Pastikan juga untuk tidak menggunakan karakter spesial."
      );
    } else {
      setPasswordError(null);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validasi format email
    if (!emailRegex.test(email)) {
      setEmailError("Format email tidak valid");
      alert("Login gagal: Format email tidak valid");
      return;
    }

    // Validasi panjang email
    if (email.length > 50) {
      setEmailError("Panjang email tidak boleh lebih dari 50 karakter");
      alert("Login gagal: Panjang email tidak boleh lebih dari 50 karakter");
      return;
    }

    // Validasi domain email
    if (!validEmailDomain.test(email)) {
      setEmailError("Email harus memiliki domain yang valid");
      alert("Login gagal: Domain email tidak valid. Silakan periksa kembali.");
      return;
    }

    // Validasi panjang sandi
    if (password.length < 4 || password.length > 60) {
      setPasswordError("Sandi harus berisi antara 4 hingga 60 karakter");
      alert("Login gagal: Sandi harus berisi antara 4 hingga 60 karakter");
      return;
    }

    // Validasi format sandi
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Sandi harus mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka. Pastikan juga untuk tidak menggunakan karakter spesial."
      );
      alert(
        "Login gagal: Sandi harus mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka. Pastikan juga untuk tidak menggunakan karakter spesial."
      );
      return;
    }
    dispatch(login(email, password, navigate));
  };

  // Definisikan fungsi handleBack di sini
  const handleHome = () => {
    navigate("/");
    dispatch(setToken(null));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgr})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="absolute bg-white opacity-80 py-12 shadow sm:rounded-lg flex flex-col sm:flex-row items-stretch justify-center gap-8">
        <form
          className="h-full w-full sm:w-3/4 lg:w-2/4 max-w-xl object-cover sm:rounded-lg mx-auto"
          style={{ height: "auto", width: "500px" }}
          onSubmit={handleSubmit}
        >
          {/* <form
          className="h-full w-full sm:w-3/4 lg:w-2/4 max-w-xl object-cover sm:rounded-lg mx-auto"
          style={{ height: "auto", width: "500px" }}
          onSubmit={(event) => {
            event.preventDefault(); // Menambahkan preventDefault di sini
            handleSubmit(event);
          }}
        > */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Login to your account
          </h2>

          {/* Tambahkan tombol back di sini */}
          <div className="flex items-center mb-4 mx-4">
            <button
              onClick={handleHome}
              className="text-sm text-gray-700 font-medium flex items-center"
            >
              <IoArrowBackSharp className="mr-1" /> Home
            </button>
          </div>

          <div className="mb-4 mx-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              required
              value={email}
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown} // Tambahkan ini
              placeholder="Enter email"
              className={`mt-1 appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none sm:text-sm focus:ring-gray-800 focus:border-gray-800 ${
                emailError ? "border-red-500" : ""
              }`}
              style={{ borderWidth: "2px" }}
            />

            {emailError && (
              <div className="text-red-500 text-sm mt-1">
                <IoCloseCircle className="inline-block h-5 w-5 mr-1" />
                {emailError}
              </div>
            )}
          </div>
          <div className="mt-4 mb-6 mx-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown} // Tambahkan ini
                placeholder="Enter password"
                className={`mt-1 appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none sm:text-sm focus:ring-gray-800 focus:border-gray-800 ${
                  passwordError ? "border-red-500" : ""
                }`}
                style={{ borderWidth: "2px" }}
              />

              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-3 flex items-center h-full text-gray-400 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <IoEyeSharp className="h-5 w-5" />
                ) : (
                  <FaEyeSlash className="h-5 w-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <div className="text-red-500 text-sm mt-1">
                <IoCloseCircle className="inline-block h-5 w-5 mr-1" />
                {passwordError}
              </div>
            )}
          </div>
          <div className="justify start text-sm mx-4">
            <span className="font-medium text-red-600 hover:text-red-500">
              Belum punya akun?
            </span>

            {/* Memberikan jarak horizontal */}
            <span style={{ margin: "0 2px" }}></span>

            <Link
              to="/register"
              className="font-bold text-gray-600 hover:text-red-500"
            >
              Daftar sekarang{" "}
            </Link>
          </div>

          <div className="mt-6 mx-4">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-extrabold text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
            >
              LOGIN
            </button>
          </div>
          {/* Teks "atau" dengan garis horizontal */}
          <div className="mt-4 mx-4 text-center flex items-center">
            <div className="w-full border-t border-gray-500"></div>
            <p className="text-sm text-gray-700 mx-4 font-bold">ATAU</p>
            <div className="w-full border-t border-gray-500"></div>
          </div>

          <div className="mt-4 mx-4">
            <GoogleLogin buttonText="Login With Google" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
