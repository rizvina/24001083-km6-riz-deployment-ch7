import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonDetail } from "../redux/actions/movieActions";
import { IoArrowBack } from "react-icons/io5";
import { setPersonDetail } from "../redux/reducers/movieReducer";

export default function PersonDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const personDetail = useSelector((state) => state?.movie?.personDetail);
  //   const movieCredits = useSelector((state) => state?.movie?.movieCredits);

  useEffect(() => {
    const personId = location?.state?.id;
    if (personId) {
      dispatch(fetchPersonDetail(personId));
    }
    if (!token) {
      alert("Perlu login untuk akses halaman ini.");
      navigate("/login");
    }
    window.scrollTo({ top: 0 }); // Menggulir halaman ke atas dengan efek halus
  }, [dispatch, location, navigate, token]);

  useEffect(() => {
    dispatch(setPersonDetail(null));
  }, [dispatch]); // Memuat ulang detail film saat ID berubah

  // Function to go back
  const handleBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };

  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-500 bg-blend-multiply h-auto"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${personDetail?.profile_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-20 gap-10 items-center backdrop-blur-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${personDetail?.profile_path}`}
            alt={personDetail?.name}
            className="w-auto h-auto rounded-lg"
          />
          <div className="text-white" key={personDetail?.id}>
            <div className="bg-red-700 rounded-lg p-8 text-white">
              <h2 className="text-5xl font-extrabold mb-4 uppercase">
                {personDetail?.name}
              </h2>
              <p className="text-lg mb-6">{personDetail?.biography}</p>
              <div className="grid grid-cols-2 gap-4 text-white-400 font-bold">
                <div>
                  <p className="mb-2 uppercase">Birthday:</p>
                  <p className="font-normal">{personDetail?.birthday}</p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Known For:</p>
                  <p className="font-normal">
                    {personDetail?.known_for_department}
                  </p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Place of Birth:</p>
                  <p className="font-normal">{personDetail?.place_of_birth}</p>
                </div>
                <div>
                  <p className="mb-2 uppercase">Popularity:</p>
                  <p className="font-normal">{personDetail?.popularity}</p>
                </div>
              </div>
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
    </div>
  );
}
