import { useEffect, useState } from "react";
import axios from "axios";
import { allMoviesContext } from "../Context";
import SearchBar from "../components/SearchBar";

const GetData = ({ show, allMoviesStore }) => {
  // console.log(allMoviesStore);
  const [allMovies, setAllMovies] = useState([]);
  const [userSearch, setUserSearch] = useState([]);

  const temp = window.localStorage.getItem("search");
  console.log(typeof temp);

  const handleChange = (e) => {
    window.localStorage.setItem("search", e.target.value);
    setUserSearch(e.target.value);
  };

  const fetchData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=9093f808553ef07633a201098e8b95c2&query=${userSearch}&language=fr-FR`
      )
      .then((res) => setAllMovies(res.data.results));
  };

  useEffect(() => fetchData(), [userSearch]);

  return (
    <allMoviesContext.Provider value={allMovies}>
      {show && <SearchBar value={userSearch} onChange={handleChange} />}
    </allMoviesContext.Provider>
  );
};

export default GetData;
