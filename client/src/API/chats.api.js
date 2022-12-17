import request from "../services/request";
import chatSlice from "../store/slice/chatSlice"
import { path } from "./apiPath";

export const getChatsAPI = async (dispatch) => {
  dispatch(chatSlice.actions.getChatsStart());
  try {
    const res = await request("GET", path.getChats);
    // console.log("get lists", res)
    dispatch(chatSlice.actions.getChatsSuccess(res));
  } catch (err) {
    dispatch(chatSlice.actions.getChatsFailure({error_message: err}));
  }
};

//delete
export const deleteChatAPI = async (id, dispatch) => {
  dispatch(chatSlice.actions.deleteChatStart());
  try {
    await request("DELETE" , path.deleteChat(id));
    dispatch(chatSlice.actions.deleteChatSuccess(id));
  } catch (err) {
    dispatch(chatSlice.actions.deleteChatFailure({error_message: err.message}));
  }
};