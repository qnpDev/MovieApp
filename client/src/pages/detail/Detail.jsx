import { ArrowBackOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import Rating  from "react-rating"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
// import "./watch.scss";
import { Player } from "video-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import request from "../../services/request";
import { path } from "../../API/apiPath";
import CustomModal from "../../components/CustomModal/CustomModal";
import moment from "moment/moment";
import { toast } from "react-toastify";

export default function Detail() {
  const {movie, auth} = useSelector((state) => state);
  const [curentMovie, setCurentMovie] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const reviewContentRef = useRef();
  const location = useLocation();
  const reviewIdRef = useRef();
  let movieId = location.pathname.split("/")[2];
  useEffect(()=>{
    if(movie.movies.length > 0) 
      setCurentMovie(movie?.movies?.find(item => item.id == movieId))
  }, [movie.movies])
  const saveReview = async () => {
    let content = reviewContentRef.current.value;
    if(content.trim() === "") return;
    let newMovie = {...curentMovie};
    const res = await request("POST", path.addReview, {body: {
      content,
      rating,
      movieId
    }})
    newMovie.reviews = [...newMovie.reviews, res];
    setCurentMovie(newMovie);
    reviewContentRef.current.value = "";
    setRating(0);
    toast.success("Review added successfully");
  }
  const showConfirmDelete = async (reviewId) => {
    setIsOpen(true);
    reviewIdRef.current = reviewId;
  }
  const deleteReview = async () => {
    const res = await request("DELETE", path.deleteReview(reviewIdRef.current));
    setIsOpen(false);
    let newMovie = {...curentMovie};
    newMovie.reviews = newMovie.reviews.filter(item => item.id !== reviewIdRef.current);
    setCurentMovie(newMovie);
    toast.success("Review deleted successfully");
  }

  return (
    <div className="homeUser">
      <Header></Header>
      <CustomModal title="Delete review" button="Delete" danger={true} isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={deleteReview}>
        Are you sure want to delete this reiew?
      </CustomModal>
      <main>
        <article>
          <section className="movie-detail">
            <div className="containerUser detail">
              <figure className="movie-detail-banner">
                <img src={curentMovie.imgTitle} onError={(e)=>e.target.src = "/images/movie-1.png"} alt="" />

                <button className="play-btn">
                  <ion-icon name="play-circle-outline"></ion-icon>
                </button>
              </figure>

              <div className="movie-detail-content">
                <p className="detail-subtitle">MOVIE</p>

                <h1 className="h1 detail-title">
                  {curentMovie.title}
                </h1>

                <div className="meta-wrapper">
                  <div className="badge-wrapper">
                  {curentMovie.vip && <div className="badge badge-fill">VIP</div>}

                    <div className="badge badge-outline">HD</div>
                  </div>

                  <div className="ganre-wrapper">
                    {curentMovie.categories?.map((item) => 
                      <a key={item.id} href="#">{item.name}</a>
                    )}
                  </div>

                  <div className="date-time">
                    <div>
                      <ion-icon name="calendar-outline"></ion-icon>

                      <time dateTime="2021">{curentMovie.year}</time>
                    </div>

                    <div>
                      <ion-icon name="time-outline"></ion-icon>

                      <time dateTime="PT115M">115 min</time>
                    </div>
                  </div>
                </div>

                <p className="storyline">
                  {curentMovie.description}
                </p>

                <div className="details-actions">
                  {/* <button className="share">
                    <ion-icon name="share-social"></ion-icon>

                    <span>Share</span>
                  </button> */}

                  {/* <div className="title-wrapper">
                    <p className="title">Prime Video</p>
                    <p className="text">Streaming Channels</p>
                  </div> */}
                  <Link to={`/watch/${curentMovie.id}`}>
                    <button className="btn btn-primary">
                      <ion-icon name="play"></ion-icon>
                      <span>Watch Now</span>
                    </button>
                  </Link>
                  {/* <Link to={`/watch/${curentMovie.id}`} > */}
                    <button className="btn btn-primary"  onClick={()=>setShowTrailer(true)}>
                      <ion-icon name="play"></ion-icon>
                      <span>View Trailer</span>
                    </button>
                  {/* </Link> */}
                </div>
               

              </div>
            </div>
            
            <div className={`trailer ${showTrailer ? "is-show" : ""}`}>
              <div className="trailer__overlay" onClick={()=>setShowTrailer(false)}></div>
              <div className="trailer__container">
                <Player>
                  <source src={curentMovie.trailer} onError={(e) => e.target.src="/video.mp4"} />
                </Player>
                </div>
              </div>
          </section>
          <section className="review containerUser">
            <h3>REVIEWS</h3>
            <div className="review__form">
              {/* <div className="review__form--avatar"> */}
              <h4>Add your reviews</h4>
              <div className="review__form--main">
                  <textarea name="" id="" cols="30" rows="10" placeholder="Enter your reviews...." ref={reviewContentRef}></textarea>
                  <div className="rating">
                  <span className="txt">Rating: </span>
                  <Rating emptySymbol={<AiFillStar className="star " />} onChange={(val)=>setRating(val)} fullSymbol={<AiFillStar className="star fill" />}></Rating>

                  </div>
                  
                  <button onClick={saveReview}>Save My Review</button>
              </div>
            </div>
            <div className="review__list">
              {curentMovie?.reviews?.length === 0 && <div className="empty">
                  Do not have any reviews yet
                </div>}
              {curentMovie?.reviews?.length > 0 && 
              curentMovie?.reviews?.map((review, index) => 
                <div key={review.id} className="review__item">
                  <div className="review__item--head">
                    <div className="review__item--avatar">
                      <img src={review.users.avatar} alt="" />
                    </div>
                    <div className="review__item--inf">
                    <div className="review__item--name">{review.users.name} <span className="review__item--star">{review.rating}/5⭐</span></div>
                    <div className="review__item--date">{moment(review.createdAt).format("LL")}</div>
                    </div>
                  </div>
                  <div className="review__item--content">
                    <p>{review.content}</p>
                  </div>
                  
                  {review?.users?.id == auth?.user?.id && <button className="btnDel" onClick={()=>showConfirmDelete(review.id)}>Xóa</button>}
                </div>
              )}
              
            </div>
          </section>
          {/* <MovieList movies={movies}></MovieList> */}
        </article>
      </main>
    </div>
  );
}

