import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    editorOption: {
        theme:"vs-dark",
        indentation:1,
        fontSize:"15px",
        fontWeight:"500",
        formatOnType:true,
        minimap:false,
        lineHeight:20,
        mouseWheelZoom:true,
        wordWrap:"on"
    }
}

export const editorOptionSlice = createSlice({
    name: 'editorOption',
    initialState,
    reducers: {
        setEditorOption(state, action) {
            state.editorOption = action.payload;
        }
    }
});

export const { setEditorOption } = editorOptionSlice.actions;

export default editorOptionSlice.reducer;