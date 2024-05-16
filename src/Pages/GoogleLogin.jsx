import { useGoogleLogin } from "@react-oauth/google";
import { registerLoginWithGoogleAction } from "../redux/actions/authActions";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(
        registerLoginWithGoogleAction(responseGoogle.access_token, navigate)
      ),
  });

  const handleGoogleLogin = () => {
    // Panggil fungsi loginWithGoogle() atau fungsi serupa di sini
    loginWithGoogle();
    // Tampilkan pesan alert setelah tombol diklik
    alert("Login dengan Google sukses!");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out border border-blue-700 shadow-md hover:shadow-lg"
          style={{ width: "250px", height: "40px" }}
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-2" />
          <span>{buttonText}</span>
        </button>
      </div>
    </>
  );
}

export default GoogleLogin;
