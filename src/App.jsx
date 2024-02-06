import { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {login} from "./store/authSlice.js";
import {authServices} from "./apiServices/auth.js"
import RetroBG from './components/backgrounds/RetroBG.jsx';
import Header from './components/Header';
import Notifications from './components/Notifications';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((response)=>{
      if(response){
        dispatch(login(response));
      }
    })
  },[])

  return (
    <>
    <Header />
    <Notifications />
  <main>
    <Outlet />
  </main>
    </>
  )
}

export default App
