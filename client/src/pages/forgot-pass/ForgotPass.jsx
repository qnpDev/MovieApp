import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { loginApi } from "../../API/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import request from "../../services/request";
import { path } from "../../API/apiPath";

export default function ForgotPass() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !email ) {
      toast.error("Please fill all field!")
      return
    }
    const res = await request("POST", path.resetPass, {body: {
      email,
      username,
      path: window.location.origin + "/reset-password"
    }});
    navigate("/login")
    toast.success("Please check your email to reset password")

  };
  return (
    <div className="loginPage">
      <div className="loginPage__wrapper">
        <div className="loginPage__bg">
          <img src="/images/bg_login.jpg" alt="" />
        </div>
        <div className="loginPage__container">
          <form onSubmit={handleSubmit}>
            <h1>Forgot password</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="loginButton">
              Reset password
            </button>
            <span>
              Have an account?
              <b>
                {" "}
                <Link to="/login">Login now.</Link>{" "}
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
  );
}
