import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import notificationSlice from "./notificationSlice";
import webSlice from "./webSlice";
import editorOptionSlice from "./editorOptionSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        notifications:notificationSlice,
        webs:webSlice,
        editorOption:editorOptionSlice
    }
});

export default store;
