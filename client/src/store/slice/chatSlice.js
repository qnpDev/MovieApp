import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    isFetching: false,
    error: null,
    success: null
};

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        getChatsStart(state) {
            state.chats = []
            state.isFetching = true
            state.error = null
        },
        getChatsSuccess(state, action) {
            state.chats = action.payload
            state.isFetching = false
            state.error = null
        },
        
        getChatsFailure(state, action) {
            state.chats = []
            state.isFetching= false
            state.error= action.payload.error_message
        },
        
        updateChatStart(state) {
            state.isFetching = true
            state.error = null
        },
        
        deleteChatStart(state) {
                state.isFetching = true
                state.error = null
        },
        
        deleteChatSuccess(state, action) {
            state.chats = state.chats.filter((category) => category.id !== action.payload)
            state.isFetching = false
            state.error = null
            state.success = "Xoá thành công!"
        },
        
        deleteChatFailure(state, action) {
            state.isFetching = false
            state.error = action.payload.error_message
        },
        refreshErrorAndSuccess(state) {
            state.error = null
            state.success = null
        }
    }
  })
  
export default chatSlice;