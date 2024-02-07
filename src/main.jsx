import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store/store.js';
import {Provider} from "react-redux";
import AuthLayout from './components/AuthLayout.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {
  ErrorPage,
  Signup,
  Login,
  VerifyEmail,
} from "./index.js";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} errorElement={<ErrorPage/>}>
      <Route path='signup' element={
        <AuthLayout authentication={false}>
          <Signup/>
        </AuthLayout>
      } />

      <Route path='login' element={
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      } />

      <Route path='verify-email' element={
        <AuthLayout authentication={true}>
          <VerifyEmail/>
        </AuthLayout>
      } />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
