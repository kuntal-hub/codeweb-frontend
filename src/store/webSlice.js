import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    html:"",
    css:"",
    js:"",
    title:"Untitled",
    description:"",
    cssLinks: [],
    jsLinks: [],
    htmlLinks: [],
    isPublic: true,
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
            state.isPublic = action.payload.isPublic
        },
        updateCssLinks: (state, action) => {
            state.cssLinks = action.payload
        },
        updateJsLinks: (state, action) => {
            state.jsLinks = action.payload
        },
        updateHtmlLinks: (state, action) => {
            state.htmlLinks = action.payload
        },
    },
  })

export const { chengeHtml, chengeCss, chengeJs, chengeTitleAndDesc, updateCssLinks, updateJsLinks, updateHtmlLinks } = webSlice.actions;

export default webSlice.reducer;
