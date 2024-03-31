import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: null,
    privateWebs: [],
    publicWebs: [],
    popularWebs: [],
    forkedWebs: [],
    likedWebs: [],
    privateWebResData: null,
    publicWebresData: null,
    popularWebResData: null,
    forkedWebResData: null,
    likedWebResData: null,
    showcaseWebs: [],
    privateCollections: [],
    publicCollections: [],
    popularCollections: [],
    likedCollections: [],
    privateCollectionResData: null,
    publicCollectionResData: null,
    popularCollectionResData: null,
    likedCollectionResData: null,
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
        setPublicWebsResData(state, action) {
            state.publicWebresData = action.payload;
        },
        setPrivateWebsResData(state, action) {
            state.privateWebResData = action.payload;
        },
        setPopularWebsResData(state, action) {
            state.popularWebResData = action.payload;
        },
        setForkedWebsResData(state, action) {
            state.forkedWebResData = action.payload;
        },
        setLikedWebsResData(state, action) {
            state.likedWebResData = action.payload;
        },
        setShowcaseWebs(state, action) {
            state.showcaseWebs = action.payload;
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
        setPrivateCollectionsResData(state, action) {
            state.privateCollectionResData = action.payload;
        },
        setPublicCollectionsResData(state, action) {
            state.publicCollectionResData = action.payload;
        },
        setPopularCollectionsResData(state, action) {
            state.popularCollectionResData = action.payload;
        },
        setLikedCollectionsResData(state, action) {
            state.likedCollectionResData = action.payload;
        },

        resetAll(state,action) {
            state.profile = null;
            state.privateWebs = [];
            state.publicWebs = [];
            state.popularWebs = [];
            state.forkedWebs = [];
            state.likedWebs = [];
            state.privateWebResData = null;
            state.publicWebresData = null;
            state.popularWebResData = null;
            state.forkedWebResData = null;
            state.likedWebResData = null;
            state.showcaseWebs = [];
            state.privateCollections = [];
            state.publicCollections = [];
            state.popularCollections = [];
            state.likedCollections = [];
            state.privateCollectionResData = null;
            state.publicCollectionResData = null;
            state.popularCollectionResData = null;
            state.likedCollectionResData = null;
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
    setPublicWebsResData,
    setPrivateWebsResData,
    setPopularWebsResData,
    setForkedWebsResData,
    setLikedWebsResData,
    setShowcaseWebs,
    setPrivateCollections, 
    setPublicCollections, 
    setPopularCollections, 
    setLikedCollections,
    setPrivateCollectionsResData,
    setPublicCollectionsResData,
    setPopularCollectionsResData,
    setLikedCollectionsResData,
    resetAll
 } = profileSlice.actions;

export default profileSlice.reducer;