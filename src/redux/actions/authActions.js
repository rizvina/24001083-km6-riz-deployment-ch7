import axios from "axios";
import { setIsLoggedIn, setToken, setuserData } from "../reducers/authReducer";
import { useSelector } from "react-redux";

export const registerLoginWithGoogleAction =
  (accessToken, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
        { access_token: accessToken },
        { headers: { "Content-Type": "application/json" } }
      );
      // Menyimpan token dari respons dan memperbarui Redux store
      const { token } = response.data.data;
      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true after successful login
      // Mengarahkan pengguna ke halaman utama setelah login/registrasi berhasil
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
        return;
      }
      console.error("Error registering/login with Google:", error);
      alert(error.message);
    }
  };

export const registerUser =
  (email, name, password, confirmPassword, navigate) => async (dispatch) => {
    try {
      // Memeriksa apakah kata sandi cocok
      if (password !== confirmPassword) {
        return alert(
          "Registrasi gagal: Konfirmasi password tidak sesuai dengan password."
        );
      }
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          email: email,
          name: name,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Registrasi sukses!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        if (
          error.response.data &&
          error.response.data.message === "User has already registered"
        ) {
          alert(
            "Registrasi gagal: Email yang Anda masukkan sudah terdaftar. Silakan gunakan email lain."
          );
        } else {
          alert(
            "Registrasi gagal: Permintaan tidak valid. Pastikan data yang Anda masukkan benar."
          );
        }
      }
    }
  };

export const fetchUserData = (token) => async (dispatch) => {
  if (!token) return;
  try {
    const response = await axios.get(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }
    // Memperbarui di reducers dengan data pengguna
    const userData = response.data.data;
    dispatch(setuserData(userData));
  } catch (error) {
    alert(error.message);
  }
};

export const getUserData = (setIsLoggedIn) => async (dispatch) => {
  // Mendapatkan token dari auth

  const token = useSelector((state) => state?.auth?.token);
  try {
    // Memanggil fetchUserData untuk mengambil data pengguna
    const setuserData = await fetchUserData(token);
    if (setuserData) {
      fetchUserData(setuserData);
    } else {
      console.log("Failed to fetch user data");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    // Mengirim permintaan login ke server
    const response = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const token = response.data.data.token;
      // Memperbarui reducers dengan status login dan token
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(token));

      const userDataResponse = await axios.get(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = userDataResponse.data.data;
      // Menyimpan data pengguna di store Redux
      dispatch(setuserData(userData));
      alert(`Login sukses! Selamat datang, ${userData?.name}!`);

      // Mengarahkan pengguna ke halaman utama setelah login berhasil
      navigate("/");
    }
  } catch (error) {
    // Menangani kesalahan jika terjadi saat proses login
    if (error.response && error.response.status === 401) {
      alert("Email atau kata sandi yang dimasukkan salah");
    } else {
      alert("Terjadi kesalahan saat melakukan login. Mohon coba lagi.");
    }
  }
};
