import request from "../services/request";
import userSlice from "../store/slice/userSlice"
import { path } from "./apiPath";

export const getUsersAPI = async (dispatch) => {
    dispatch(userSlice.actions.getUsersStart());
    try {
      const res = await request("GET", path.getUsers);
      dispatch(userSlice.actions.getUsersSuccess(res));
    } catch (err) {
      dispatch(userSlice.actions.getUsersFailure());
    }
  };
  
  //create
  export const createUserAPI = async (user, dispatch) => {
    dispatch(userSlice.actions.createUserStart());
    try {
      const res = await request("POST", path.createUser, {body: user});
      console.log(res)
      dispatch(userSlice.actions.createUserSuccess(res));
    } catch (err) {
      dispatch(userSlice.actions.createUserFailure({error_message: err.message}));
    }
  };

  //update
  export const updateUserAPI = async (id, user, dispatch) => {
    dispatch(userSlice.actions.updateUserStart());
    try {
      const res = await request("PUT", path.updateUser(id), {body: user});
      dispatch(userSlice.actions.updateUserSuccess(res));
    } catch (err) {
      dispatch(userSlice.actions.updateUserFailure({error_message: err.message}));
    }
  };

  export const activeUserAPI = async (id, status, dispatch) => {
    dispatch(userSlice.actions.updateUserStart());
    try {
      const res = await request("PUT", path.activeUser(id, status));
      dispatch(userSlice.actions.updateUserSuccess(res));
    } catch (err) {
      dispatch(userSlice.actions.updateUserFailure({error_message: err.message}));
    }
  };
  
  //delete
  export const deleteUserAPI = async (id, dispatch) => {
    dispatch(userSlice.actions.deleteUserStart());
    try {
      await request("DELETE", path.deleteUser(id));
      dispatch(userSlice.actions.deleteUserSuccess(id));
    } catch (err) {
      dispatch(userSlice.actions.deleteUserFailure({error_message: err.message}));
    }
  };