import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pinedItems: [],
    resData: null,
    isNewItemAdded: false
}

export const PinedSlice = createSlice({
    name: 'pinedItems',
    initialState,
    reducers: {
        setPinedItems(state, action) {
            state.pinedItems = action.payload;
        },
        setResData(state, action) {
            state.resData = action.payload;
        },
        setIsNewItemAdded(state, action) {
            state.isNewItemAdded = action.payload;
        }
    }
});

export const { setPinedItems, setResData, setIsNewItemAdded } = PinedSlice.actions;

export default PinedSlice.reducer;