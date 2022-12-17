import "./movie.css";
import { Publish } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import movieSlice from "../../../store/slice/movieSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import storage from "../../../utils/firebase.util";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateMovieAPI } from "../../../API/movies.api";
import { useRef } from "react";

const Product = () => {
  const location = useLocation();
  //   const { lists } = useSelector((state) => state.list);
  const series = useSelector((state) =>
    state.list.lists.filter((el) => el.type === "series")
  );
  const { movies, success, error } = useSelector((state) => state.movie);
  const categories = useSelector((state) => state.category.categories);
  const id = location.pathname.split("/")[3];
  const movie = movies.find((movie) => movie.id === Number(id));

  const [updateMovie, setUpdateMovie] = useState({
    title: movie.title, 
    description: movie.description, 
    year: movie.year, 
    imgSm: movie.imgSm, 
    imgTitle: movie.imgTitle, 
    trailer: movie.trailer, 
    video: movie.video, 
    limitAge: movie.limitAge, 
    active: movie.active, 
    vip: movie.vip, 
    categories: movie.categories.map(el => el.id), 
    series: movie.series.id, 
  });
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const count = useRef(0)

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
    dispatch(movieSlice.actions.refreshErrorAndSuccess());
  }, [error, success]);

  const handleAutoCompleteChange = (e, value) => {
    setUpdateMovie({ ...updateMovie, categories: value.map((el) => el.id) });
  };

  const handleSelect = (e) => {
    setUpdateMovie({ ...updateMovie, [e.target.name]: Number(e.target.value) });
  };

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "active" || e.target.name === "vip") {
      value = value === "0" ? false : true;
    }
    if ([e.target.name] === "limitAge") {
      value = Number(value);
    }

    setUpdateMovie({ ...updateMovie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/videos/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdateMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const data = [];
    if (imgTitle) {
      data.push({ file: imgTitle, label: "imgTitle" });
      
    }
    if (imgSm) {
      data.push({ file: imgSm, label: "imgSm" });
    }

    if (trailer) {
      data.push({ file: trailer, label: "trailer" });
    }
    if (video) {
      data.push({ file: video, label: "video" });
    }

    upload(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovieAPI(movie.id, updateMovie, dispatch);
  };

  const dispatch = useDispatch();
  return (
    <div className="product">
      <div className="product__title-container">
        <h1 className="product--title">Edit Movie</h1>
      </div>
      <div className="product-top">
        <div className="product__right">
          <div className="product__info-top" style={{ display: "flex" }}>
            <img src={movie?.imgTitle} alt="" className="product-img" />
            <span className="product-name">{movie.title}</span>
          </div>
          <div className="product__info-bottom">
            <div className="product__info-item" style={{ width: "600px" }}>
              <div className="product__info-key">Id:</div>
              <div className="product__info-value">{movie.id}</div>
            </div>
            <div className="product__info-item" style={{ width: "600px" }}>
              <div className="product__info-key">Description:</div>
              <div className="product__info-value">{movie.description}</div>
            </div>
            <div className="product__info-item" style={{ width: "600px" }}>
              <div className="product__info-key">Categories:</div>
              <div className="product__info-value">
                {movie.categories.map((el) => el.name).toString()}
              </div>
            </div>
            <div className="product__info-item" style={{ width: "600px" }}>
              <div className="product__info-key">Year:</div>
              <div className="product__info-value">{movie.year}</div>
            </div>
            <div className="product__info-item" style={{ width: "600px" }}>
              <div className="product__info-key">Limit Age:</div>
              <div className="product__info-value">{movie.limitAge}+ </div>
            </div>
            <div className="product__info-item" style={{ width: "600px" }}>
              <div className="product__info-key">Series:</div>
              <div className="product__info-value">
                {movie.series.title || "Phim 1 tập"}{" "}
              </div>
            </div>
            <div className="product__info-item" style={{ width: "600px" }}>
              <div className="product__info-key">Status:</div>
              <div className="product__info-value">
                {movie.active ? "Active" : "Disable"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom">
        <form className="product-form">
          <div className="product__form-left">
            <div className="addProductItem">
              <label>Movie Title</label>
              <input
                type="text"
                onChange={handleChange}
                name="title"
                placeholder={movie.title}
              />
            </div>
            <div className="addProductItem">
              <label>Movie Description</label>
              <input
                type="text"
                onChange={handleChange}
                name="desc"
                placeholder={movie.description}
              />
            </div>
            <div className="addProductItem">
              <label>Year</label>
              <input
                type="text"
                onChange={handleChange}
                name="year"
                placeholder={movie.year}
              />
              {/* <label>Genre</label>
                        <input type="text" placeholder={movie.genre} /> */}
            </div>
            <div className="addProductItem">
              <label>Limit</label>
              <input
                type="text"
                onChange={handleChange}
                name="limitAge"
                placeholder={movie.limitAge}
              />
            </div>
            <div className="addProductItem">
              <label>
                Trailer: <a href={movie.trailer}>Xem trailer</a>
              </label>
              <input
                type="file"
                onChange={(e) => {setTrailer(e.target.files[0]); count.current = count.current +1}}
              />
            </div>
            <div className="addProductItem">
              <label>
                Video: <a href={movie.video}>Xem video</a>
              </label>
              <input
                type="file"
                onChange={(e) => {setVideo(e.target.files[0]);count.current = count.current +1}}
              />
            </div>
            <div className="addProductItem">
              <div className="addProductItem">
                <label>Categories</label>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  defaultValue={movie.categories}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Chọn danh mục"
                    />
                  )}
                  onChange={handleAutoCompleteChange}
                />
              </div>
              <div className="addProductItem">
                <label>Series</label>
                <select
                  name="series"
                  onChange={handleSelect}
                  defaultValue={movie.series?.id}
                >
                  <option>Chọn 1 </option>
                  {series.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="addProductItem">
              <label>Is VIP?</label>
              <select
                name="vip"
                id="isSeries"
                onChange={handleChange}
                defaultValue={movie.vip ? 1 : 0}
              >
                <option value="0">No</option>
                <option value="1" selected>
                  Yes
                </option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Status?</label>
              <select
                name="active"
                id="isSeries"
                onChange={handleChange}
                defaultValue={movie.active ? 1 : 0}
              >
                <option value="0">Disable</option>
                <option value="1" selected>
                  Active
                </option>
              </select>
            </div>
          </div>
          <div className="product__upload-right">
            <p>imgSM</p>
            <div className="product__upload">
              <img src={movie.imgSm} alt="" className="product-upload-img" />
              <label htmlFor="imgSm">
                <Publish className="product-upload--icon" />
              </label>
              <input
                type="file"
                id="imgSm"
                name="imgSm"
                onChange={(e) => {setImgSm(e.target.files[0]);count.current = count.current +1}}
                style={{ display: "none" }}
              />
            </div>
            <p>imgTitle</p>
            <div className="product__upload">
              <img src={movie.imgTitle} alt="" className="product-upload-img" />
              <label htmlFor="imgTitle">
                <Publish className="product-upload--icon" />
              </label>
              <input
                type="file"
                id="imgTitle"
                onChange={(e) => {setImgTitle(e.target.files[0]); count.current = count.current +1}}
                name="imgTitle"
                style={{ display: "none" }}
              />
            </div>
            {uploaded === count.current ? (
              <button className="add-product-button" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="add-product-button" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
