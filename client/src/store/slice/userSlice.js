import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isFetching: false,
    error: null,
    success: null
  };

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        getUsersStart(state) {
            state.users = []
            state.isFetching = true
            state.error = null
        },
        getUsersSuccess(state, action) {
            state.users = action.payload
            state.isFetching = false
            state.error = null
        },
        
        getUsersFailure(state, action) {
            state.users= []
            state.isFetching= false
            state.error= action.payload.error_message
        },
        
        createUserStart(state) {
            state = {...state}
            state.isFetching = true
            state.error = null 
        },
        
        createUserSuccess(state, action) {
            state.users = [...state.users, action.payload]
            state.isFetching = false
            state.error = null
            state.success = "Tạo thành công!"
        },
        
        createUserFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        
        updateUserStart(state) {
            state.isFetching = true
            state.error = null
        },
        
        updateUserSuccess(state, action) {
            state.users = state.users.map(
                (movie) => movie.id === action.payload.id ? action.payload : movie
              )
              state.isFetching = false
              state.error = null
              state.success = "Cập nhật thành công!"
        },
        
        updateUserFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        
        deleteUserStart(state) {
                state.isFetching = true
                state.error = null
        },
        
        deleteUserSuccess(state, action) {
            state.users = state.users.filter((movie) => movie.id !== action.payload)
            state.isFetching = false
            state.error = null
            state.success = "Xoá thành công!"
        },
        
        deleteUserFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        refreshErrorAndSuccess(state) {
            state.error = null
            state.success = null
        }
    }
  })
  
export default userSlice;