import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plans: [],
    isFetching: false,
    error: null,
    success: null
};

const planSlice = createSlice({
    name: 'planSlice',
    initialState,
    reducers: {
        getPlansStart(state) {
            state.plans = []
            state.isFetching = true
            state.error = null
        },
        getPlansSuccess(state, action) {
            state.plans = action.payload
            state.isFetching = false
            state.error = null
        },
        
        getPlansFailure(state, action) {
            state.plans = []
            state.isFetching= false
            state.error= action.payload.error_message
        },
        
        createPlanStart(state) {
            state.isFetching = true
            state.error = null 
        },
        
        createPlanSuccess(state, action) {
            state.plans = [...state.plans, action.payload]
            state.isFetching = false
            state.error = null
            state.success = "Tạo thành công!"
        },
        
        createPlanFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        
        updatePlanStart(state) {
            state.isFetching = true
            state.error = null
        },
        
        updatePlanSuccess(state, action) {
            state.plans = state.plans.map(
                (category) => category.id === action.payload.id ? action.payload : category
              )
              state.isFetching = false
              state.error = null
              state.success = "Cập nhật thành công!"
        },
        
        updatePlanFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        
        deletePlanStart(state) {
                state.isFetching = true
                state.error = null
        },
        
        deletePlanSuccess(state, action) {
            state.plans = state.plans.filter((category) => category.id !== action.payload)
            state.isFetching = false
            state.error = null
            state.success = "Xoá thành công!"
        },
        
        deletePlanFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        refreshErrorAndSuccess(state) {
            state.error = null
            state.success = null
        }
    }
  })
  
export default planSlice;