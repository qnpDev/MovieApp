import "./app.scss"
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMoviesAPI } from './API/movies.api'
import { getCategoriesAPI } from './API/categories.api'
import { getListsAPI } from "./API/lists.api";
// import { getAllPlanAPI } from "./API/plan.api";
import { getPlansAPI } from "./API/plans.api";
import { getMe } from "./API/auth.api";

const App = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => {
    getMoviesAPI(dispatch);
    getCategoriesAPI(dispatch)
    getListsAPI(dispatch)
    getPlansAPI(dispatch)
  }, [auth]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;