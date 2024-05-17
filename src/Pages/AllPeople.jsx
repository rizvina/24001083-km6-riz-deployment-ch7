import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { fetchpeople, searchPerson } from "../redux/actions/movieActions";
import { setCurrentPage, setQuery } from "../redux/reducers/movieReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PeopleCard = ({ person }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/person-detail", { state: { id: person.id } });
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      onClick={handleClick}
    >
      {person.profile_path && (
        <img
          className="w-full h-auto"
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt=""
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2 text-white">{person.name}</h2>
        <p className="text-gray-300">{person.known_for_department}</p>
        <p className="text-gray-300">{person.popularity}</p>
      </div>
    </div>
  );
};

const PeopleCardGrid = ({ title, people }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {people?.map((person) => (
          <PeopleCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

const AllPeople = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state?.movie?.currentPage);
  const query = useSelector((state) => state?.movie?.query);
  const token = useSelector((state) => state.auth.token);
  const people = useSelector((state) => state?.movie?.people);

  useEffect(() => {
    dispatch(fetchpeople(1)); // currentPage disini harus diambil dari state Redux atau dihitung sesuai dengan kebutuhan
    window.scrollTo({ top: 0 }); // Menggulir halaman ke atas dengan efek halus
    if (!token) {
      alert("Perlu login untuk akses halaman ini.");
      navigate("/login");
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(setCurrentPage(1)); // Reset currentPage to 1 when clearing search
    dispatch(setQuery(""));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Silahkan masukkan nama di pencarian.");
      return;
    }
    dispatch(setCurrentPage(1)); // Reset currentPage to 1 for new search
    dispatch(searchPerson(query, 1));
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(setCurrentPage(1));
      dispatch(fetchpeople(1)); // Menghapus hasil pencarian sebelumnya
    }
    dispatch(setQuery(e.target.value)); // Mengatur nilai pencarian yang baru
  };

  const loadMore = (direction) => {
    let newPage;
    if (direction === "next") {
      newPage = currentPage + 1;
    } else if (direction === "previous" && currentPage > 1) {
      newPage = currentPage - 1;
    } else {
      // Jika direction tidak valid atau currentPage adalah 1 dan direction adalah 'previous', jangan lakukan apa-apa
      return;
    }

    // Perbarui currentPage dengan nilai yang baru
    dispatch(setCurrentPage(newPage));
    if (query.trim() !== "") {
      dispatch(searchPerson(query, newPage));
    } else {
      // Panggil aksi Redux untuk mengambil data baru dari API
      dispatch(fetchpeople(newPage)); // Perhatikan bahwa Anda perlu mengirimkan nomor halaman baru ke aksi fetchpeople
    }
    // Atur fokus kembali ke elemen pertama setelah memuat data baru
    window.scrollTo({ top: 0 }); // Menggulir halaman ke atas dengan efek halus
  };

  return (
    <div className="bg-red-800">
      <Navbar />
      <ToastContainer /> {/* Ini adalah komponen ToastContainer */}
      <div className="container mx-auto p-4">
        <div className="mb-40 mt-20"> </div>
        <div className="flex justify-between items-center mb-6">
          <div className="">
            <form onSubmit={handleSubmit} className="flex justify-start">
              <input
                type="text"
                placeholder="Search Name"
                value={query}
                onChange={handleChange}
                className="rounded-xl h-8 bg-[#3a3333] text-white w-96 px-2"
              />
              <button
                type="submit"
                className="bg-orange-400 px-2 py-1 rounded-lg ml-2 text-white"
              >
                Search
              </button>
            </form>
          </div>
          <h1 className="text-4xl text-center font-bold text-white">
            ALL POPULAR PEOPLE
          </h1>
        </div>{" "}
        <PeopleCardGrid people={people} />
        <div className="flex justify-center mt-8">
          {/* Elemen untuk memuat halaman sebelumnya */}
          {currentPage > 1 && (
            <div
              onClick={() => loadMore("previous")} // Memanggil loadMore dengan argumen 'previous'
              className="bg-blue-400 text-white py-3 px-6 rounded-full font-bold text-xl shadow-md hover:bg-blue-500 transition duration-300 mr-4 cursor-pointer"
            >
              Previous
            </div>
          )}
          {/* Elemen untuk memuat halaman berikutnya */}
          <div
            onClick={() => loadMore("next")} // Memanggil loadMore dengan argumen 'next'
            className="bg-yellow-400 text-white py-3 px-6 rounded-full font-bold text-xl shadow-md hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Next
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllPeople;
