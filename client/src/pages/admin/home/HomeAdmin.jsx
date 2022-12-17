import "./home.css"

import FeatureInfo from "../../../components/featureInfo/FeatureInfo"
import Chart from "../../../components/chart/Chart"
// import { userData } from "../../../dummyData";
import WidgetSm from "../../../components/widgetSm/WidgetSm";
import WidgetLg from "../../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import request from "../../../services/request";
import { path } from "../../../API/apiPath";
import { toast } from "react-toastify";

const HomeAdmin = () => {
    const [analysis, setAnalysis] = useState([])
    useEffect(() => {
        request("GET", path.getTotalAnalysis)
          .then((res) => setAnalysis(res))
          .catch((err) => toast.error(err.message));
      }, []);
    return (
        <div className="home-admin">
            <FeatureInfo />
            <Chart data={analysis} title="Billing Analytics" dataKey="total" grid/>
            <div className="home-widgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}

export default HomeAdmin
