import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
// import { userRows } from "../../../dummyData"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { activeUserAPI, deleteUserAPI } from "../../../API/users.api";
import userSlice from "../../../store/slice/userSlice";
import { toast } from "react-toastify";

const UserList = () => {
    const {users, error, success} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
          field: 'name',
          headerName: 'Username',
          width: 250,
          renderCell:(params) => {
              return (
                  <div className="user-list__user">
                      <img src={params.row.avatar} alt="" className="user-list__img" />
                        {params.row.username}
                  </div>
              )
          }
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
          editable: true,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 200,
            editable: true,
          },
        {
            field: 'active',
            headerName: 'Status',
            width: 70,
            editable: true,
            renderCell: (params) => {
                return (
                  <div className="product-list__product">
                    {params.row.active ? "active" : "disable"}
                  </div>
                );
            }
        },
        {
            field: 'vip',
            headerName: 'Vip user',
            width: 70,
            editable: true,
            renderCell: (params) => {
                return (
                  <div className="product-list__product">
                    {params.row.vip ? "VIP" : "Normal"}
                  </div>
                );
            }
        },
        {
          field: 'billing',
          headerName: 'Transactions',
          sortable: false,
          width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 180,
            renderCell: (params) => {
                return (
                    <div className="user-list__action">
                        <Link to={"/admin/users/" + params.row.id}>
                            <button className="user-list__button--edit">Edit</button>
                        </Link>
                        <button className="product-list__button--edit" onClick={() => handelActiveUser(params.row.id, params.row.active)}>{params.row.active ? "Enable" : "Active"}</button>
                        <DeleteOutline onClick={() => handleDelete(params.row.id)} className="user-list__button--remove" />
                    </div>
                )
            }
        }
      ];
      useEffect(() => {
        if (error) {
          toast.error(error)
        }
        if (success) {
          toast.success(success)
        }
        dispatch(userSlice.actions.refreshErrorAndSuccess())
      },[error, success])
    
      const handelActiveUser = (id, status)=> {
        activeUserAPI(id, status, dispatch)
      }
      const handleDelete = (id) => {
        deleteUserAPI(id, dispatch)
    }

    return (
        <div className="user-list">
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={9}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}

export default UserList
