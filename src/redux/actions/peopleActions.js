import axios from "axios";
import { setPeople } from "../reducers/peopleReducer";

export const getAllPeople = (currentPage) => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );
    dispatch(setPeople(response.data.results));
  } catch (error) {
    console.error("Error fetching people movies: ", error);
  }
};
