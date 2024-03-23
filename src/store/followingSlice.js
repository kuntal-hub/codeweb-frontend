import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    followings: [],
    followingResData: null,
}

export const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        setFollowings(state, action) {
            state.followings = action.payload;
        },
        setFollowingResData(state, action) {
            state.followingResData = action.payload;
        }
    }
});

export const { setFollowingResData,setFollowings } = followingSlice.actions;

export default followingSlice.reducer;