import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviews: [],
    isFetching: false,
    error: null,
    success: null
};

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {
        getReviewsStart(state) {
            state.reviews = []
            state.isFetching = true
            state.error = null
        },
        getReviewsSuccess(state, action) {
            state.reviews = action.payload
            state.isFetching = false
            state.error = null
        },
        
        getReviewsFailure(state, action) {
            state.reviews = []
            state.isFetching= false
            state.error= action.payload.error_message
        },
        
        updateReviewStart(state) {
            state.isFetching = true
            state.error = null
        },
        
        updateReviewSuccess(state, action) {
            state.reviews = state.reviews.map(
                (category) => category.id === action.payload.id ? action.payload : category
              )
              state.isFetching = false
              state.error = null
              state.success = "Cập nhật thành công!"
        },
        
        updateReviewFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        
        deleteReviewStart(state) {
                state.isFetching = true
                state.error = null
        },
        
        deleteReviewSuccess(state, action) {
            state.reviews = state.reviews.filter((category) => category.id !== action.payload)
            state.isFetching = false
            state.error = null
            state.success = "Xoá thành công!"
        },
        
        deleteReviewFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        refreshErrorAndSuccess(state) {
            state.error = null
            state.success = null
        }
    }
  })
  
export default reviewSlice;