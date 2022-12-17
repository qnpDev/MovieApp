import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMoviesAPI } from "../../API/movies.api";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import MovieList from "../../components/MovieList/MovieList";
import { getCategoriesAPI } from "../../API/categories.api";
import CustomModal from "../../components/CustomModal/CustomModal";

const Home = () => {
  
  
  return (
    <div className="homeUser">
      <Header></Header>
      <CustomModal></CustomModal>
      <main>
        <article>
          <Hero></Hero>
          {/* <MovieList></MovieList> */}
        </article>
      </main>
    </div>
  );
};

export default Home;
