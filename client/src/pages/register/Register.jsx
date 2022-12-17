/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.scss";
import { toast } from "react-toastify";
import { registerApi } from "../../API/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Register() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {error, registerSuccess} = useSelector((state) => state.auth)

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (registerSuccess) {
      toast.success("Đăng kí thành công! Đăng nhập để tiếp tục.");
      navigate("/login")
    }
  }, [error, registerSuccess])

  const handleFinish = async (e) => {
    e.preventDefault();
    await registerApi({ 
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        email: emailRef.current.value, 
        name: nameRef.current.value 
      }, dispatch);
  };
  return (
    <>
      
      <div className="loginPage">
      <div className="loginPage__wrapper">
        <div className="loginPage__bg">
          <img src="/images/bg_login.jpg" alt="" />
        </div>
        <div className="loginPage__container">
          <form onSubmit={handleFinish}>
            <h1>Sign Up</h1>
            <input type="text" placeholder="Your email" ref={emailRef} />
            <input type="text" placeholder="Your username" ref={usernameRef} />
            <input type="text" placeholder="Your name" ref={nameRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <span>
              Have Netflix account?{" "}
              <b>
                {" "}
                <Link to="/login">Sign in now.</Link>{" "}
              </b>
            </span>
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <b>Learn more</b>.
            </small>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
