import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    billings: [],
    isFetching: false,
    error: null,
    success: null
  };

const billingSlice = createSlice({
    name: 'billingSlice',
    initialState,
    reducers: {
        getBillingsStart(state) {
            state.billings = []
            state.isFetching = true
            state.error = null
        },
        getBillingsSuccess(state, action) {
            state.billings = action.payload
            state.isFetching = false
            state.error = null
        },
        
        getBillingsFailure(state, action) {
            state.billings= []
            state.isFetching= false
            state.error= action.payload.error_message
        },
        
        createBillingStart(state) {
            state = {...state}
            state.isFetching = true
            state.error = null 
        },
        
        createBillingSuccess(state, action) {
            state.billings = [...state.billings, action.payload]
            state.isFetching = false
            state.error = null
            state.success = "Tạo thành công!"
        },
        
        createBillingFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        
        updateBillingStart(state) {
            state.isFetching = true
            state.error = null
        },
        
        updateBillingSuccess(state, action) {
            state.billings = state.billings.map(
                (movie) => movie.id === action.payload.id ? action.payload : movie
              )
              state.isFetching = false
              state.error = null
              state.success = "Cập nhật thành công!"
        },
        
        updateBillingFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        
        deleteBillingStart(state) {
                state.isFetching = true
                state.error = null
        },
        
        deleteBillingSuccess(state, action) {
            state.billings = state.billings.filter((movie) => movie.id !== action.payload)
            state.isFetching = false
            state.error = null
            state.success = "Xoá thành công!"
        },
        
        deleteBillingFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        refreshErrorAndSuccess(state) {
            state.error = null
            state.success = null
        }
    }
  })
  
export default billingSlice;