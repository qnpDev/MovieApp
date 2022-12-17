
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { categories } from "../../../dummyData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  deleteReviewAPI,
  updateReviewAPI,
} from "../../../API/reviews.api";
import { toast } from "react-toastify";
import reviewSlice from "../../../store/slice/reviewSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  p: 4,
};

const Reviews = () => {
  const { reviews, error, isFetching, success } = useSelector(
    (state) => state.review
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "content",
      headerName: "Nội dung",
      width: 380,
    },
    {
        field: "rating",
        headerName: "Đánh giá",
        width: 100,
        editable: true,
      },
    // {
    //     field: "movie",
    //     headerName: "Phim - Mã phim",
    //     width: 300,
    //     renderCell:(params) => {
    //         return (
    //             <div className="user-list__user">
    //                 {params.row.movie?.name + ' - ' + params.row.movie?.name}
    //             </div>
    //         )
    //     }
    // },
    {
        field: "user",
        headerName: "User - Email",
        width: 300,
        renderCell:(params) => {
            return (
                <div className="user-list__user">
                    {params.row.users?.name + ' - ' + params.row.users?.email}
                </div>
            )
        }
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
            <button
              className="categories-list__button--edit"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </button>

            <DeleteOutline
              onClick={() => handleDelete(params.row.id)}
              className="user-list__button--remove"
            />
          </div>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success)

    }
    dispatch(reviewSlice.actions.refreshErrorAndSuccess())
  }, [error, success]);

  function handleClick() {
    console.log(value)
      updateReviewAPI(value.id , value, dispatch);
      setOpen(false)
  }

  const handleDelete = (id) => {
    deleteReviewAPI(id, dispatch)
  };
  

  const handleEdit = (id) => {
    const editValue = reviews.find((el) => el.id === id);
    
    setValue(editValue);
    setOpen(true);
  };

  return (
    <>
      <div className="categories-list">
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={9}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            Sửa danh mục
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Nhận xét"
            defaultValue={value?.content}
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={(e) => setValue({...value, content: e.target.value })}
          />
          <TextField
            required
            id="outlined-required"
            label="Đánh giá"
            type="number"
            min="0"
            defaultValue={value?.rating}
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={(e) => setValue({...value, rating: Number(e.target.value) })}
          />
          <LoadingButton
            size="small"
            onClick={handleClick}
            loading={isFetching}
            loadingPosition="end"
            variant="contained"
          >
            Chỉnh sửa
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};

export default Reviews;
