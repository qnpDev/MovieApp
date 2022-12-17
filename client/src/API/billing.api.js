import request from "../services/request";
import billingSlice from "../store/slice/billingSlice"
import { path } from "./apiPath";

export const getBillingsAPI = async (dispatch) => {
    dispatch(billingSlice.actions.getBillingsStart());
    try {
      const res = await request("GET", path.getAdminBillings);
      dispatch(billingSlice.actions.getBillingsSuccess(res));
    } catch (err) {
      dispatch(billingSlice.actions.getBillingsFailure());
    }
  };

  //update
  export const updateBillingAPI = async (id, dispatch) => {
    dispatch(billingSlice.actions.updateBillingStart());
    try {
      const res = await request("PUT", path.confirmAdminBilling(id));
      dispatch(billingSlice.actions.updateBillingSuccess(res));
    } catch (err) {
      dispatch(billingSlice.actions.updateBillingFailure({error_message: err.message}));
    }
  };
  
  //delete
  export const deleteBillingAPI = async (id, dispatch) => {
    dispatch(billingSlice.actions.deleteBillingStart());
    try {
      await request("DELETE", path.deleteAdminBilling(id));
      dispatch(billingSlice.actions.deleteBillingSuccess(id));
    } catch (err) {
      dispatch(billingSlice.actions.deleteBillingFailure({error_message: err.message}));
    }
  };