import "./login.scss";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { loginApi } from "../../API/auth.api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginApi({ username, password }, dispatch);
  };
  return (
    <div className="loginPage">
      <div className="loginPage__wrapper">
        <div className="loginPage__bg">
          <img src="/images/bg_login.jpg" alt="" />
        </div>
        <div className="loginPage__container">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="loginButton">
              Sign In
            </button>
            <span>
              New to Netflix?{" "}
              <b>
                {" "}
                <Link to="/register">Sign up now.</Link>{" "}
              </b>
            </span>
            <span>
              <Link to="/forgot-pass">Forgot password</Link>{" "}
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
