import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trendings: [],
    trendingResData: null,
}

export const trendingSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
        setTrendings(state, action) {
            state.trendings = action.payload;
        },
        setTrendingResData(state, action) {
            state.trendingResData = action.payload;
        }
    }
});

export const { setTrendingResData,setTrendings } = trendingSlice.actions;

export default trendingSlice.reducer;