import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomModal from "../CustomModal/CustomModal";
import { RxDropdownMenu } from "react-icons/rx"
import { toast } from "react-toastify";
import storage from "../../utils/firebase.util";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import request from "../../services/request";
import { path } from "../../API/apiPath";
import authSlice from "../../store/slice/authSlice";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { getMe } from "../../API/auth.api";

export default function Header() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  const [showConfirmReset, setShowConfirmReset] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [avatar, setAvatar] = React.useState(null)
  const [showMenu, setShowMenu] = React.useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const menuRef = React.useRef()
  const upload = () => {
    const fileName = new Date().getTime() + avatar[0].name;
    const storageRef = ref(storage, `/avatar/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          startUpdateInfo(downloadURL)
        });
      }
    );
  };
  const startUpdateInfo = async (avatar_link) => {
    const res = await request("PUT", path.updateInfoUser, {body: {
      name,
      email,
      avatar: avatar_link
    }})
    setIsOpen(false)
    toast.success("Update data successfully")
    setEmail("")
    setName("")
    getMe(dispatch)
    setAvatar(null)
  }
  const handleUpdateInfo = () => {
    if(!name || !email) {
      toast.error("Please enter your name and email")
      return;
    }
    upload()
  }
  const resetPass = async () => {
    // const res = await request("POST", path.resetPass, {body: {
    //   email: auth.user.email,
    //   username: auth.user.username,
    //   path: window.location.origin + "/reset-password"
    // }});
    setShowConfirmReset(false)
    if(!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all field")
      return
    }
    if(newPassword != confirmPassword) {
      toast.error("Confirm password not match")
      return
    }
    try {
      const res = await request("POST", path.changePassword, {body: {
        oldPassword,
        newPassword
      }})
      setShowConfirmReset(false)
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success("Your password has been changed!")
      handleLogout()
    }catch(err) {
      toast.error(err.message)
      // console.log()
    }
  }
  const handleLogout = () => {
    dispatch(authSlice.actions.logout())
    navigate("/login")
  }

  useOnClickOutside(menuRef, () => setShowMenu(false));
  
  return (
    <>
      <CustomModal title="Change my information" isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={()=>handleUpdateInfo()}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter your email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="" >Avatar</label>
          <input type="file" name="file" onChange={(e) => setAvatar(e.target.files) }/>
        </div>
      </CustomModal>
      <CustomModal title="Change password" isOpen={showConfirmReset} setIsOpen={setShowConfirmReset} handleSubmit={resetPass} button="Update">
        <div className="form-group">
          <label htmlFor="name">Old password</label>
          <input type="password" name="name" placeholder="Enter your old password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="name">New password</label>
          <input type="password" name="name" placeholder="Enter your new password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Confirm password</label>
          <input type="password" name="name" placeholder="Enter confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>
      </CustomModal>
      <header className="headerUser">
        <nav className="navbarUser">
          <ul className="NavList">
            <li><NavLink to="/" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Home</NavLink></li>
            <li><NavLink to="/movies" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Movies</NavLink></li>
            <li><NavLink to="/series" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Series</NavLink></li>
            <li><NavLink to="/chat" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Chat</NavLink></li>
            <li><NavLink to="/buy-vip" className={({isActive}) => isActive ? "navbarLink active" : "navbarLink"}>Buy VIP</NavLink></li>
            {/* {auth.user.} */}
            {auth?.user?.roles?.includes("ROLE_ADMIN") && <li><NavLink to="/admin" className="navbarLink">Admin Page</NavLink></li>}
          </ul>
          <div className="NavBarRight">
            <span className="NavBarName">
              Hello <b> {auth?.user?.name || "Anonymous"} </b> {auth?.user?.vip && <span className="vip">VIP</span>}
            </span>
            <span className="NavBarMenu" ref={menuRef}>
              <span className="ico" onClick={()=>setShowMenu(prev => !prev)}>
              <RxDropdownMenu></RxDropdownMenu>
              </span>
              <div className={`NavBarMenu__wrapper ${showMenu ? "active" : ""}`}>
                <div className="NavBarMenu__item">
                  <span onClick={() => setIsOpen(true)}>Change info</span>
                </div>
                <div className="NavBarMenu__item">
                  <span onClick={() => setShowConfirmReset(true)}>Change password</span>
                </div>
                <div className="NavBarMenu__item">
                  <span onClick={()=> handleLogout()}>Logout</span>
                </div>
              </div>
            </span>
            {/* <li><span className="changeinfo" onClick={() => setIsOpen(true)}>Change info</span></li>
            <li><span className="changeinfo" onClick={() => setShowConfirmReset(true)}>Reset password</span></li>
            <li><button onClick={handleLogout} className="navbarLink">Logout</button></li> */}
          </div>
        </nav>
      </header>
    </>
  );
}
