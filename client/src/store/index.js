import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import listSlice from "./slice/listSlice";
import movieSlice from "./slice/movieSlice";
import categorySlice from "./slice/categorySlice";
import planSlice from "./slice/planSlice";
import reviewSlice from "./slice/reviewSlice";
import chatSlice from "./slice/chatSlice";
import modalSlice from "./slice/modalSlice";
import userSlice from "./slice/userSlice";
import billingSlice from "./slice/billingSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        movie: movieSlice.reducer,
        list: listSlice.reducer,
        category: categorySlice.reducer,
        modal: modalSlice.reducer,
        plan: planSlice.reducer,
        review: reviewSlice.reducer,
        chat: chatSlice.reducer,
        billing: billingSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;