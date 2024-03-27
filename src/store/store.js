import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import notificationSlice from "./notificationSlice";
import webSlice from "./webSlice";
import editorOptionSlice from "./editorOptionSlice";
import trendingSlice from "./trendingSlice";
import followingSlice from "./followingSlice";
import pinedSlice from "./pinedSlice";
import yourWorkSlice from "./yourWorkSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        notifications:notificationSlice,
        webs:webSlice,
        editorOption:editorOptionSlice,
        trending:trendingSlice,
        following:followingSlice,
        pinedItems:pinedSlice,
        yourWork:yourWorkSlice,
    }
});

export default store;
