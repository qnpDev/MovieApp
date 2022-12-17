import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { useEffect, useState } from "react"
import "./featureInfo.css"
import request from "../../services/request";
import { path } from "../../API/apiPath";
import { toast } from "react-toastify";

const FeatureInfo = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalMovie, setTotalMovie] = useState(0);
    const [totalMovieActive, setTotalMovieActive] = useState(0);

    useEffect(() => {
        request("GET", path.getTotalBilling)
          .then((res) => setTotalAmount(res))
          .catch((err) => toast.error(err.message));
      }, []);
    
      useEffect(() => {
        request("GET", path.getTotalMovie)
          .then((res) => setTotalMovie(res))
          .catch((err) => toast.error(err.message));
      }, []);
    
      useEffect(() => {
        request("GET", path.getTotalMovieActive)
          .then((res) => setTotalMovieActive(res))
          .catch((err) => toast.error(err.message));
      }, []);
    
    return (
        <div className="featured">
            <div className="featured--item">
                <span className="featured--title">Doanh thu</span>
                <div className="featured__money-container">
                    <span className="featured__money">{totalAmount}</span>
                    {/* <span className="featured__money--rate">
                        -22
                        <ArrowDownward className="featured__icon"/>
                    </span> */}
                </div>
                {/* <span className="featured-sub">Compared to last month</span> */}
            </div>
            <div className="featured--item">
                <span className="featured--title">Tổng số phim</span>
                <div className="featured__money-container">
                    <span className="featured__money">{totalMovie}</span>
                    {/* <span className="featured__money--rate">
                        -2
                        <ArrowDownward className="featured__icon negative"/>
                    </span> */}
                </div>
                {/* <span className="featured-sub">Compared to last month</span> */}
            </div>
            <div className="featured--item">
                <span className="featured--title">Tổng số phim đang hoạt động</span>
                <div className="featured__money-container">
                    <span className="featured__money">{totalMovieActive}</span>
                    {/* <span className="featured__money--rate">
                        +22
                        <ArrowUpward className="featured__icon"/>
                    </span> */}
                </div>
                {/* <span className="featured-sub">Compared to last month</span> */}
            </div>
        </div>
    )
}

export default FeatureInfo
