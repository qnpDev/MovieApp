import { MailOutline, PermIdentity, Publish } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import "./user.css";
import { useRef } from "react";
import storage from "../../../utils/firebase.util"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { updateUserAPI } from "../../../API/users.api";
import userSlice from "../../../store/slice/userSlice";

const ROLES = ["ROLE_USER", "ROLE_ADMIN"];

const User = () => {
  const location = useLocation();
  const { users, success, error } = useSelector((state) => state.user);
  const [avt, setAvt] = useState(null);
  const id = location.pathname.split("/")[3];
  const [user, setUser] = useState(
    users.find((user) => user.id === Number(id))
  );
  //   const avtU = useRef(user.avatar);

  const [updateUser, setUpdateUser] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    vip: user.vip,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (!avt) {
      // setAvt(null)
      // setUser({...user, avatar: avtU.current})
      return;
    }

    const objectUrl = URL.createObjectURL(avt);
    setUser({ ...user, avatar: objectUrl });

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [avt]);
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success(success)
    }
    dispatch(userSlice.actions.refreshErrorAndSuccess())
  },[error, success])
  const upload = () => {
    const fileName = new Date().getTime() + avt.name;
    const storageRef = ref(storage, `/avatar/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, avt);
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
        dispatch(userSlice.actions.updateUserFailure({error_message: "Có lỗi khi tải hình ảnh lên!"}))
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   setUpdateUser({...setUpdateUser, avatar: downloadURL});
          updateUserAPI(user.id, {...updateUser, avatar: downloadURL}, dispatch)
        });
      }
    );
  };
  const handleChange = (e) => {
    let value = e.target.value;
    if ( e.target.name === "vip") {
        value = value === "0" ? false : true;
      }

    setUpdateUser({ ...updateUser, [e.target.name]: value });
  };
  const handleAutoCompleteChange = (e, value) => {
    setUpdateUser({ ...updateUser, role: value.map((el) => el) });
  };
  const handleUpdate = (e) => {
    e.preventDefault()
    upload()
  };
  return (
    <div className="user">
      <div className="user__container">
        <div className="user-show">
          <div className="user-show__top">
            <img src={user.avatar} alt="" className="user-show--img" />
            <div className="user-show__top--title">
              <div className="user-show--username">{user.name}</div>
            </div>
          </div>
          <div className="user-show__bottom">
            <span className="user-show--title">Account Details</span>
            <div className="user-show__info">
              <PermIdentity className="user-show__icon" />
              <span className="user-show__info--title">{user.username}</span>
            </div>

            <span className="user-show--title">Contact Details</span>
            <div className="user-show__info">
              <MailOutline className="user-show__icon" />
              <span className="user-show__info--title">{user.email}</span>
            </div>
            <div className="user-show__info">
              <MailOutline className="user-show__icon" />
              <span className="user-show__info--title">
                {user.vip ? "VIP account" : "Normal Account"}
              </span>
            </div>
          </div>
        </div>
        <div className="user-update">
          <span className="user-update--title">Edit</span>
          <form className="user-update__form">
            <div className="user-update-left">
              <div className="user-update--item">
                <label htmlFor="">Full name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder={user.name}
                  name="name"
                  className="user-update--input"
                />
              </div>
              <div className="user-update--item">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder={user.email}
                  name="email"
                  className="user-update--input"
                />
              </div>

              <div className="addProductItem">
                <label>Roles</label>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={ROLES}
                  getOptionLabel={(option) => option}
                  defaultValue={user.roles?.split(",") || []}
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
              {/* <div className="addProductItem">
              <label>VIP Account</label>
              <select
                name="vip"
                id="isSeries"
                onChange={handleChange}
                defaultValue={user.vip ? 1 : 0}
              >
                <option value="0">No</option>
                <option value="1" selected>
                  Yes
                </option>
              </select>
              </div> */}
            </div>
            <div className="user-update__right">
              <div className="user-update-upload">
                <img src={user.avatar} alt="" className="user-update--img" />
                <label htmlFor="avt">
                  <Publish className="user-update--icon" />
                </label>
                <input
                  type="file"
                  id="avt"
                  style={{ display: "none" }}
                  onChange={(e) => setAvt(e.target.files[0])}
                />
              </div>
              
              <button className="user-update__button" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
