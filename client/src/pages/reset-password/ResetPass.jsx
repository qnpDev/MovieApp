import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "../../API/apiPath";
import Header from "../../components/Header/Header";
import request from "../../services/request";
import { useNavigate } from "react-router-dom";
export default function ResetPass() {
  const [password, setPassword] = React.useState("");
  const location = useLocation();
  let token = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const handleReset = async () => {
    if(!password) return toast.error("Please enter your new password")
    const res = await request("POST", path.verifyPath, {body: {token, password}})
    toast.success("Reset password successfully");
    navigate("/");
  }
  return (
    <>
      <div className="homeUser">
        <div className="containerUser">
          <div className="resetPass">
            <h3>Reset your password</h3>
            <div className="form-group">
              <label htmlFor="name">New password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button onClick={handleReset}>Save password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
