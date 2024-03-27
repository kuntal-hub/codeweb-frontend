import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    yourWorkWebs : [],
    yourWorkWebsResData : null,
    yourWorkWebsENV:{
        search:"",
        view:"all",
        sortBy:"createdAt",
        sortOrder:"desc",
    },
    yourWorkCollections : [],
    yourWorkCollectionsResData : null,
    yourWorkCollectionsENV:{
        search:"",
        view:"all",
        sortBy:"createdAt",
        sortOrder:"desc",
    },
}

export const yourWorkSlice = createSlice({
    name: 'yourWork',
    initialState,
    reducers: {
        setYourWorkWebs: (state, action) => {
            state.yourWorkWebs = action.payload;
        },
        setYourWorkWebsResData: (state, action) => {
            state.yourWorkWebsResData = action.payload;
        },
        setYourWorkWebsENV: (state, action) => {
            state.yourWorkWebsENV = action.payload;
        },
        resetYourWorkWebs: (state,action) => {
            state.yourWorkWebs = [];
            state.yourWorkWebsResData = null;
            state.yourWorkWebsENV = {
                search:"",
                view:"all",
                sortBy:"createdAt",
                sortOrder:"desc",
            }
        },
        setYourWorkCollections: (state, action) => {
            state.yourWorkCollections = action.payload;
        },
        setYourWorkCollectionsResData: (state, action) => {
            state.yourWorkCollectionsResData = action.payload;
        },
        setYourWorkCollectionsENV: (state, action) => {
            state.yourWorkCollectionsENV = action.payload;
        },
        resetYourWorkCollections: (state,action) => {
            state.yourWorkCollections = [];
            state.yourWorkCollectionsResData = null;
            state.yourWorkCollectionsENV = {
                search:"",
                view:"all",
                sortBy:"createdAt",
                sortOrder:"desc",
            }
        },
    }
});

export const { 
    setYourWorkCollections,
    setYourWorkCollectionsENV,
    setYourWorkCollectionsResData,
    setYourWorkWebs,
    setYourWorkWebsENV,
    setYourWorkWebsResData,
    resetYourWorkCollections,
    resetYourWorkWebs,
} = yourWorkSlice.actions;

export default yourWorkSlice.reducer;