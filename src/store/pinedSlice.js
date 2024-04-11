import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pinedItems: [],
    resData: null,
    isNewItemAdded: false,
    showPinedItems: false
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
        setShowPinedItems(state, action) {
            state.showPinedItems = action.payload;
        },
        setIsNewItemAdded(state, action) {
            state.isNewItemAdded = action.payload;
        }
    }
});

export const { setPinedItems, setResData, setIsNewItemAdded, setShowPinedItems } = PinedSlice.actions;

export default PinedSlice.reducer;