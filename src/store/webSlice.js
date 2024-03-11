import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    html:"",
    css:"",
    js:"",
    title:"Untitled",
    description:"",
    cssLinks: [],
    jsLinks: [],
}

export const webSlice = createSlice({
    name: 'webs',
    initialState,
    reducers: {
        chengeHtml: (state, action) => {
            state.html = action.payload
        },
        chengeCss: (state, action) => {
            state.css = action.payload
        },
        chengeJs: (state, action) => {
            state.js = action.payload
        },
        chengeTitleAndDesc: (state, action) => {
            state.title = action.payload.title
            state.description = action.payload.description
        },
        updateCssLinks: (state, action) => {
            state.cssLinks = action.payload
        },
        updateJsLinks: (state, action) => {
            state.jsLinks = action.payload
        },
    },
  })

export const { chengeHtml, chengeCss, chengeJs, chengeTitleAndDesc, updateCssLinks, updateJsLinks } = webSlice.actions;

export default webSlice.reducer;
