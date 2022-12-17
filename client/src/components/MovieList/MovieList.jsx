import React from "react";
import { Link } from "react-router-dom";

export default function MovieList({movies}) {
  return (
    <section className="MovieListContainer">
      <div className="MovieListWrapper">
        <ul className="moviesList">
          {movies.length === 0 && <h1 className="empty">Không có phim nào</h1>}
          {movies.length > 0 && movies.map((movie, _) => (
            <li key={movie.id + Math.random()} className="moviesItem">
              {movie.vip && (<div className="moviesItem__vip"><span>VIP</span></div>)}
              <div>
                <Link to={`/detail/${movie.id}`} className="moviesItem__banner">
                  <figure>
                    <img src={movie.imgTitle} onError={(e) => e.target.src = "/images/movie-1.png"} alt="" />
                  </figure>
                </Link>
                <div className="moviesItem__title">
                  <Link to={`/detail/${movie.id}`}>
                    <h3>{movie.title}</h3>
                  </Link>
                  <time dateTime={movie.year}>{movie.year}</time>
                </div>
                <div className="moviesItem__meta">
                  <div className="age">
                    <ion-icon name="time-outline"></ion-icon>
                    <time dateTime="PT122M">more than <strong>{movie.limitAge}</strong> age</time>
                  </div>
                  <div className="rating">
                    <ion-icon name="star"></ion-icon>
                    <data>4 star</data>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
