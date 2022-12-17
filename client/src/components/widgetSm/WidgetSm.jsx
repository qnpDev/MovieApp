import { Visibility } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import "./widgetSm.css";
import request from "../../services/request";
import { path } from "../../API/apiPath";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { activeUserAPI } from "../../API/users.api";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    request("GET", path.getLatestUser)
      .then((res) => setUsers(res))
      .catch((err) => toast.error(err.message));
  }, []);
  const handelActiveUser = (id, status)=> {
    activeUserAPI(id, status, dispatch)
  }
  return (
    <div className="widget-sm">
      <span className="widget-sm--title">New members</span>
      <ul className="widget-sm__list">
        {users.map((user) => (
          <li key={user.id} className="widget-sm__list--item">
            <img
              src={user.avatar}
              alt=""
              className="widget-sm-img"
            />
            <div className="widget-sm-user">
              <span className="widget-sm-username">{user.name}</span>
              <span className="widget-sm-user--job">{user.email}</span>
            </div>
            <button className="product-list__button--edit" onClick={() => handelActiveUser(user.id, user.active)}>{user.active ? "Enable" : "Active"}</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
