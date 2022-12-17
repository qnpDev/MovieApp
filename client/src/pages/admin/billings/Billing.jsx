// import "./categories.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { categories } from "../../../dummyData";
// import socketIO from 'socket.io-client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBillingAPI, deleteBillingAPI } from "../../../API/billing.api";
import { toast } from "react-toastify";
import categorySlice from "../../../store/slice/categorySlice";
// const socket = socketIO.connect('http://localhost:1701');

const Billings = () => {
  const { billings, error, success } = useSelector((state) => state.billing);
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Tên gói cước",
      width: 280,
      renderCell: (params) => {
        return <div className="user-list__user">{params.row.plan.name}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Tổng tiền",
      width: 300,
      editable: true,
    },
    {
      field: "payment",
      headerName: "Phương thức",
      width: 300,
      editable: true,
    },
    {
      field: "code",
      headerName: "CODE",
      width: 300,
      editable: true,
    },
    {
      field: "user",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        return <div className="user-list__user">{params.row.users.email}</div>;
      },
    },
    {
      field: "confirmed",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        return <div className="user-list__user">{params.row.confirmed ? "Hoàn thành" : "Chờ xử lý"}</div>;
      },
    },
    {
      field: "plan",
      headerName: "Gói đăng kí",
      width: 300,
      renderCell: (params) => {
        return <div className="user-list__user">{params.row.plan.name}</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày khởi tạo",
      width: 300,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="categories-list__action">
            {!params.row.confirmed && (
              <button
                className="categories-list__button--edit"
                onClick={() => handleConfirm(params.row.id)}
              >
                Confirm
              </button>
            )}

            <DeleteOutline
              onClick={() => handleDelete(params.row.id)}
              className="user-list__button--remove"
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
    dispatch(categorySlice.actions.refreshErrorAndSuccess());
  }, [error, success]);

  function handleConfirm(id) {
    updateBillingAPI(id, dispatch);
    // setTimeout(()=> {
    //   socket.emit("")
    // }, 1000)
  }

  const handleDelete = (id) => {
    deleteBillingAPI(id, dispatch);
  };

  return (
    <>
      <div className="categories-list">
        <DataGrid
          rows={billings}
          columns={columns}
          pageSize={9}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default Billings;
