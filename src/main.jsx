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
  ForgotPassWord,
  ResetPassword,
  Settings,
  ProfileSettings,
  AccountSettings,
  NewWeb,
  EditorSettings,
  EditWeb,
  ViewFullWeb,
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

      <Route path='forgot-password' element={
        <AuthLayout authentication={false}>
          <ForgotPassWord/>
        </AuthLayout>
      } />

      <Route path='reset-password' element={
        <AuthLayout authentication={false}>
          <ResetPassword/>
        </AuthLayout>
      } />

      <Route path='settings/' element={
        <AuthLayout authentication={true}>
          <Settings/>
        </AuthLayout>
      }> 

          <Route path='profile' element={
            <AuthLayout authentication={true}>
              <ProfileSettings/>
            </AuthLayout>
          } />

          <Route path='account' element={
            <AuthLayout authentication={true}>
              <AccountSettings/>
            </AuthLayout>
          } />

          <Route path='editor' element={
            <AuthLayout authentication={true}>
              <EditorSettings/>
            </AuthLayout>
          } />
      </Route>

      <Route path='new-web' element={<NewWeb />} />

      <Route path='web/:webId' element={<EditWeb />} />

      <Route path='view-full/:webId' element={<ViewFullWeb />} />

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
