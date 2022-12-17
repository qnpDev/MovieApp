import "./categories.css";
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
  createPlanAPI,
  deletePlanAPI,
  updatePlanAPI,
} from "../../../API/plans.api";
import { toast } from "react-toastify";
import planSlice from "../../../store/slice/planSlice";

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

const Plans = () => {
  const { plans, error, isFetching, success } = useSelector(
    (state) => state.plan
  );

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Tên gói cước",
      width: 280,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 300,
      editable: true,
    },
    {
      field: "price",
      headerName: "Giá cước",
      width: 300,
      editable: true,
    },
    {
      field: "days",
      headerName: "Thơi lượng gói cước",
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
    dispatch(planSlice.actions.refreshErrorAndSuccess());
  }, [error, success]);

  function handleClick() {
    if (edit) {
      updatePlanAPI(value.id, value, dispatch);
    } else {
      createPlanAPI(value, dispatch);
    }

    setOpen(false);
  }

  const handleDelete = (id) => {
    deletePlanAPI(id, dispatch);
  };

  const handleEdit = (id) => {
    const editValue = plans.find((el) => el.id === id);

    setEdit(true);
    setValue(editValue);
    setOpen(true);
  };
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]:
        (e.target.name === "days" || e.target.name === "price")
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  return (
    <>
      <div className="categories-list">
        <button className="categories-add--button" onClick={handleOpen}>
          Thêm gói cước
        </button>
        <DataGrid
          rows={plans}
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
            {!edit ? "Thêm gói cước" : "Sửa gói cước"}
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Tên gói cước"
            name="name"
            defaultValue={value?.name}
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Mô tả"
            name="description"
            defaultValue={value?.description}
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Giá"
            name="price"
            type="number"
            defaultValue={value?.price}
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Thời gian"
            name="days"
            type="number"
            defaultValue={value?.days}
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleChange}
          />
          <LoadingButton
            size="small"
            onClick={handleClick}
            loading={isFetching}
            loadingPosition="end"
            variant="contained"
          >
            {!edit ? "Tạo mới" : "Chỉnh sửa"}
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};

export default Plans;
