import request from "../services/request";
import planSlice from "../store/slice/planSlice";
import { path } from "./apiPath";

export const getPlansAPI = async (dispatch) => {
    dispatch(planSlice.actions.getPlansStart());
    try {
      const res = await request("GET", path.getPlans);
      // console.log(res)
      dispatch(planSlice.actions.getPlansSuccess(res));
    } catch (err) {
      dispatch(planSlice.actions.getPlansFailure({error_message: err.message}));
    }
  };
  
  //create
  export const createPlanAPI = async (plan, dispatch) => {
    dispatch(planSlice.actions.createPlanStart());
    if (!plan.name) {
      return dispatch(planSlice.actions.createPlanFailure({error_message: "Tên danh mục không hợp lệ!"}));
    }
    try {
      const res = await request("POST", path.createPlan, {body: plan});
      dispatch(planSlice.actions.createPlanSuccess(res));
    } catch (err) {
      dispatch(planSlice.actions.createPlanFailure({error_message: err.message}));
    }
  };

  export const updatePlanAPI = async (id, plan, dispatch) => {
    console.log(path.updatePlan(id))
    dispatch(planSlice.actions.updatePlanStart());
    if (plan.name === "") {
      return dispatch(planSlice.actions.updatePlanFailure({error_message: "Tên danh mục không hợp lệ!"}));
    }
    try {
      const res = await request("PUT", path.updatePlan(id), {body: plan});
      console.log(res)
      dispatch(planSlice.actions.updatePlanSuccess(res));
    } catch (err) {
      dispatch(planSlice.actions.updatePlanFailure({error_message: err.message}));
    }
  };
  
  //delete
  export const deletePlanAPI = async (id, dispatch) => {
    dispatch(planSlice.actions.deletePlanStart());
    try {
      await request("DELETE" , path.deletePlan(id));
      dispatch(planSlice.actions.deletePlanSuccess(id));
    } catch (err) {
      dispatch(planSlice.actions.deletePlanFailure({error_message: err.message}));
    }
  };