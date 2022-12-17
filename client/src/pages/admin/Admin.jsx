import React, { useEffect } from 'react'
import TopBar from "../../components/topBar/TopBar"
import SideBar from "../../components/sideBar/SideBar"
import "./admin.css"
import { Outlet } from 'react-router-dom'
import { getUsersAPI } from '../../API/users.api'
import { useDispatch } from 'react-redux'
import { getBillingsAPI } from '../../API/billing.api'
import { getReviewsAPI } from '../../API/reviews.api'

const Admin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getUsersAPI(dispatch);
    getBillingsAPI(dispatch)
    getReviewsAPI(dispatch)
  }, []);
  
  return (
    <>
      <TopBar />
      <div className="container" >
        <SideBar />
        <Outlet />
        </div>
    </>
  )
}

export default Admin
