import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store/store.js';
import {Provider} from "react-redux";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {
  ErrorPage,
  Signup,
} from "./index.js";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} errorElement={<ErrorPage/>}>
      <Route path='signup' element={<Signup/>} />
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
