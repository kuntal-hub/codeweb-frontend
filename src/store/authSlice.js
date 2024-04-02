import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  userData: null,
  refreshToken:localStorage.getItem("refreshToken"),
  accessToken:localStorage.getItem("accessToken"),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state,action)=>{
        state.status=true;
        state.userData=action.payload;
        state.refreshToken=localStorage.getItem("refreshToken");
        state.accessToken=localStorage.getItem("accessToken");
      },
      logout: (state)=>{
        state.status=false;
        state.userData=null;
        state.refreshToken=null;
        state.accessToken=null;
      },
    },
  })

  export const { login ,logout } = authSlice.actions;

  export default authSlice.reducer;
