import React from "react";
import {Link} from "react-router-dom"

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src="/images/hero-bg.jpg" alt="" />
      </div>
      <div className="container hero__container">
        <div className="hero-content">
          <p className="hero-subtitle">Filmlane</p>

          <h1 className="h1 hero-title">
            Unlimited <strong>Movie</strong>, TVs Shows, & More.
          </h1>

          <div className="meta-wrapper">
            <div className="badge-wrapper">
              <div className="badge badge-fill">PG 18</div>

              <div className="badge badge-outline">HD</div>
            </div>

            <div className="ganre-wrapper">
              <a href="#">Romance,</a>

              <a href="#">Drama</a>
            </div>

            <div className="date-time">
              <div>
                <ion-icon name="calendar-outline"></ion-icon>

                <time datetTime="2022">2022</time>
              </div>

              <div>
                <ion-icon name="time-outline"></ion-icon>

                <time datetTime="PT128M">128 min</time>
              </div>
            </div>
          </div>

          <button className="btn btn-primary">
            <ion-icon name="play"></ion-icon>
            <Link to="/movies">
              <span>Watch now</span>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
