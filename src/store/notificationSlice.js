import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notifications :[]
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      addNotification: (state,action)=>{
        state.notifications.push(action.payload);
      },
      removeNotification: (state,action)=>{
        state.notifications = state.notifications.filter((notification,index)=>index!==action.payload);
      }
    },
  })

  export const {addNotification, removeNotification } = notificationSlice.actions;

  export default notificationSlice.reducer;
