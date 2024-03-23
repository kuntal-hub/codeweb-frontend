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
  Assets,
  ImageAssets,
  VideoAssets,
  AudioAssets,
  MyAssets,
  LikedAssets,
  WebDetails,
  Home,
  Trending,
  Following,
  YourWork,
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

      <Route path='assets/' element={
        <AuthLayout authentication={true}>
          <Assets/>
        </AuthLayout>
      } >
          
            <Route path='images' element={
              <AuthLayout authentication={true}>
                <ImageAssets/>
              </AuthLayout>
            } />
  
            <Route path='videos' element={
              <AuthLayout authentication={true}>
                <VideoAssets/>
              </AuthLayout>
            } />
  
            <Route path='audios' element={
              <AuthLayout authentication={true}>
                <AudioAssets/>
              </AuthLayout>
            } />

            <Route path='my' element={
              <AuthLayout authentication={true}>
                <MyAssets/>
              </AuthLayout>
            } />

            <Route path='liked' element={
              <AuthLayout authentication={true}>
                <LikedAssets/>
              </AuthLayout>
            } />
            
      </Route>

      <Route path='new-web' element={<NewWeb />} />

      <Route path='web/:webId' element={<EditWeb />} />

      <Route path='details/:webId' element={<WebDetails />} />

      <Route path='view-full/:webId' element={<ViewFullWeb />} />

      <Route path='' element={<Home />} >
              
            <Route path='' element={<Trending />} />

            <Route path='following' element={
              <AuthLayout authentication={true}>
                <Following/>
              </AuthLayout>
            } />
  
            <Route path='your-work' element={
              <AuthLayout authentication={true}>
                <YourWork/>
              </AuthLayout>
            } />

      </Route>

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
