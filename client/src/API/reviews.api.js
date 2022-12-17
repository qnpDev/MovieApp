import request from "../services/request";
import reviewSlice from "../store/slice/reviewSlice"
import { path } from "./apiPath";


export const getReviewsAPI = async (dispatch) => {
  dispatch(reviewSlice.actions.getReviewsStart());
  try {
    const res = await request("GET", path.getAdminReviews);
    dispatch(reviewSlice.actions.getReviewsSuccess(res));
  } catch (err) {
    dispatch(reviewSlice.actions.getReviewsFailure());
  }
};

// export const addReviewAPI = async (dispatch) => {
//   dispatch(reviewSlice.actions.getReviewsStart());
//   try {
//     const res = await request("GET", path.getReviews);
//     dispatch(reviewSlice.actions.getReviewsSuccess(res));
//   } catch (err) {
//     dispatch(reviewSlice.actions.getReviewsFailure());
//   }
// };

export const updateReviewAPI = async (id, review, dispatch) => {
  dispatch(reviewSlice.actions.updateReviewStart());
  try {
    const res = await request("PUT", path.updateAdminReview(id), {body: review});
    console.log(res)
    dispatch(reviewSlice.actions.updateReviewSuccess(res));
  } catch (err) {
    dispatch(reviewSlice.actions.updateReviewFailure({error_message: err.message}));
  }
};

//delete
export const deleteReviewAPI = async (id, dispatch) => {
  dispatch(reviewSlice.actions.deleteReviewStart());
  try {
    await request("DELETE" , path.deleteAdminReview(id));
    dispatch(reviewSlice.actions.deleteReviewSuccess(id));
  } catch (err) {
    dispatch(reviewSlice.actions.deleteReviewFailure({error_message: err.message}));
  }
};