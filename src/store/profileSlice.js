import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: null,
    privateWebs: [],
    publicWebs: [],
    popularWebs: [],
    forkedWebs: [],
    likedWebs: [],
    privateCollections: [],
    publicCollections: [],
    popularCollections: [],
    likedCollections: [],
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
        setPrivateWebs(state, action) {
            state.privateWebs = action.payload;
        },
        setPublicWebs(state, action) {
            state.publicWebs = action.payload;
        },
        setPopularWebs(state, action) {
            state.popularWebs = action.payload;
        },
        setForkedWebs(state, action) {
            state.forkedWebs = action.payload;
        },
        setLikedWebs(state, action) {
            state.likedWebs = action.payload;
        },
        setPrivateCollections(state, action) {
            state.privateCollections = action.payload;
        },
        setPublicCollections(state, action) {
            state.publicCollections = action.payload;
        },
        setPopularCollections(state, action) {
            state.popularCollections = action.payload;
        },
        setLikedCollections(state, action) {
            state.likedCollections = action.payload;
        },
        resetAll(state,action) {
            state.profile = null;
            state.privateWebs = [];
            state.publicWebs = [];
            state.popularWebs = [];
            state.forkedWebs = [];
            state.likedWebs = [];
            state.privateCollections = [];
            state.publicCollections = [];
            state.popularCollections = [];
            state.likedCollections = [];
        }
    }
});

export const { 
    setProfile, 
    setPrivateWebs, 
    setPublicWebs, 
    setPopularWebs, 
    setForkedWebs, 
    setLikedWebs, 
    setPrivateCollections, 
    setPublicCollections, 
    setPopularCollections, 
    setLikedCollections,
    resetAll
 } = profileSlice.actions;

export default profileSlice.reducer;