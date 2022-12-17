/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";

import UserList from "../pages/admin/userList/UserList";
import User from "../pages/admin/user/User";

import Movie from "../pages/admin/movie/Movie";
import MovieList from "../pages/admin/movieList/MovieList";
import AddMovie from "../pages/admin/addMovie/AddMovie";
import Billings from "../pages/admin/billings/Billing";

import Series from "../pages/admin/series/Series";
import ListSeries from "../pages/admin/listSeries/ListSeries";
import AddSeries from "../pages/admin/addSeries/AddSeries";

import Login from "../pages/login/Login";
import {
  CheckLogin,
  ProtectedUserRoute,
  ProtectedAdminRoute,
} from "./protected";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/home/Home";
import HomeAdmin from "../pages/admin/home/HomeAdmin";
// import Watch from "../pages/watch/Watch";
import Register from "../pages/register/Register";
import Admin from "../pages/admin/Admin";
import Categories from "../pages/admin/categories/Categories";
import Plans from "../pages/admin/plans/Plans";
import Detail from "../pages/detail/Detail";
import Watch from "../pages/watch/Watch";
import Movies from "../pages/movies/Movies";
import BuyVip from "../pages/buy-vip/BuyVip";
import Chat from "../pages/chat/Chat";
import SeriesUser from "../pages/series/Series";
import Payment from "../pages/payment/Payment";
import ResetPass from "../pages/reset-password/ResetPass";
import ForgotPass from "../pages/forgot-pass/ForgotPass";
import Reviews from "../pages/admin/reviews/Reviews";

const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <CheckLogin>
        <Login />
      </CheckLogin>
    ),
  },
  {
    path: "register",
    element: (
      <CheckLogin>
        <Register />
      </CheckLogin>
    ),
  },
  {
    path: "forgot-pass",
    element: (
      <CheckLogin>
        <ForgotPass />
      </CheckLogin>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <Admin />
      </ProtectedAdminRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomeAdmin />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "plans",
        element: <Plans />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/:userId",
        element: <User />,
      },
      {
        path: "movies",
        element: <MovieList />,
      },
      {
        path: "billings",
        element: <Billings />,
      },
      {
        path: "movies/:id",
        element: <Movie />,
      },
      {
        path: "new-movie",
        element: <AddMovie />,
      },
      {
        path: "series",
        element: <ListSeries />,
      },
      {
        path: "series/:id",
        element: <Series />,
      },
      {
        path: "new-series",
        element: <AddSeries />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedUserRoute>
        <Home />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/watch/*",
    //     element: <Watch />,
    //   },
    // ],
  },
  {
    path: "/watch/*",
    element: (
      <ProtectedUserRoute>
        <Watch />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail/*",
    element: (
      <ProtectedUserRoute>
        <Detail />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/movies",
    element: (
      <ProtectedUserRoute>
        <Movies />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/buy-vip",
    element: (
      <ProtectedUserRoute>
        <BuyVip />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: (
      <ProtectedUserRoute>
        <Payment />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedUserRoute>
        <Chat />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/series",
    element: (
      <ProtectedUserRoute>
        <SeriesUser />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password/*",
    element: (
        <ResetPass />
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
