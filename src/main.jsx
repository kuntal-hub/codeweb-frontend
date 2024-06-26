import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store/store.js';
import { Provider } from "react-redux";
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
  YourWorkCollections,
  YourWorkWebs,
  ViewCollection,
  ExplorePeople,
  Search,
  Profile,
  ProfileCollections,
  ProfileWebs,
  ProfilePopularWebs,
  ProfilePublicWebs,
  ProfilePrivateWeb,
  ProfileForkedWeb,
  PrifileLikedWeb,
  ProfilepopularCollection,
  ProfilePublicCollections,
  ProfilePrivateCollections,
  ProfileLikedColection,
  ProfileSavedCollection,
  OrganizeShowcase,
} from "./index.js";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route path='signup' element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      } />

      <Route path='login' element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      } />

      <Route path='verify-email' element={
        <AuthLayout authentication={true}>
          <VerifyEmail />
        </AuthLayout>
      } />

      <Route path='forgot-password' element={
        <AuthLayout authentication={false}>
          <ForgotPassWord />
        </AuthLayout>
      } />

      <Route path='reset-password' element={
        <AuthLayout authentication={false}>
          <ResetPassword />
        </AuthLayout>
      } />

      <Route path='settings/' element={
        <AuthLayout authentication={true}>
          <Settings />
        </AuthLayout>
      }>

        <Route path='' element={
          <AuthLayout authentication={true}>
            <ProfileSettings />
          </AuthLayout>
        } />

        <Route path='profile' element={
          <AuthLayout authentication={true}>
            <ProfileSettings />
          </AuthLayout>
        } />

        <Route path='account' element={
          <AuthLayout authentication={true}>
            <AccountSettings />
          </AuthLayout>
        } />

        <Route path='editor' element={
          <AuthLayout authentication={true}>
            <EditorSettings />
          </AuthLayout>
        } />
      </Route>

      <Route path='assets/' element={
        <AuthLayout authentication={true}>
          <Assets />
        </AuthLayout>
      } >

        <Route path='' element={
          <AuthLayout authentication={true}>
            <ImageAssets />
          </AuthLayout>
        } />

        <Route path='images' element={
          <AuthLayout authentication={true}>
            <ImageAssets />
          </AuthLayout>
        } />

        <Route path='videos' element={
          <AuthLayout authentication={true}>
            <VideoAssets />
          </AuthLayout>
        } />

        <Route path='audios' element={
          <AuthLayout authentication={true}>
            <AudioAssets />
          </AuthLayout>
        } />

        <Route path='my' element={
          <AuthLayout authentication={true}>
            <MyAssets />
          </AuthLayout>
        } />

        <Route path='liked' element={
          <AuthLayout authentication={true}>
            <LikedAssets />
          </AuthLayout>
        } />

      </Route>

      <Route path='new-web' element={<NewWeb />} />

      <Route path='web/:webId' element={<EditWeb />} />

      <Route path='view-full/:webId' element={<ViewFullWeb />} />

      <Route path='search/' element={<Search />} >
        <Route path='details/:webId' element={<WebDetails />} />
      </Route>

      <Route path=':username/' element={<Profile />} >

        <Route path='' element={<ProfileWebs />} >

          <Route path='popular/' element={<ProfilePopularWebs />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='public/' element={<ProfilePublicWebs />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='private/' element={<ProfilePrivateWeb />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='forked/' element={<ProfileForkedWeb />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='liked/' element={<PrifileLikedWeb />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

        </Route>

        <Route path='webs/' element={<ProfileWebs />} >

          <Route path='popular/' element={<ProfilePopularWebs />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='public/' element={<ProfilePublicWebs />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='private/' element={<ProfilePrivateWeb />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='forked/' element={<ProfileForkedWeb />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

          <Route path='liked/' element={<PrifileLikedWeb />} >
            <Route path='details/:webId' element={<WebDetails />} />
          </Route>

        </Route>



        <Route path='collections/' element={<ProfileCollections />} >

            <Route path='popular' element={<ProfilepopularCollection />} />

            <Route path='public' element={<ProfilePublicCollections />} />

            <Route path='private' element={<ProfilePrivateCollections />} />

            <Route path='liked' element={<ProfileLikedColection />} />

            <Route path='saved' element={<ProfileSavedCollection />} />

        </Route>

      </Route>


      <Route path='organize-showcase' element={
        <AuthLayout authentication={true}>
          <OrganizeShowcase />
        </AuthLayout>
      } />


      <Route path='explore-profiles' element={
        <AuthLayout authentication={true}>
          <ExplorePeople />
        </AuthLayout>
      } />

      <Route path='collection/:collectionId/' element={<ViewCollection />} >
        <Route path='details/:webId' element={<WebDetails />} />
      </Route>

      <Route path='' element={<Home />} >

        <Route path='' element={<Trending />} >
          <Route path='details/:webId' element={<WebDetails />} />
        </Route>


        <Route path='following/' element={
          <AuthLayout authentication={true}>
            <Following />
          </AuthLayout>
        } >
          <Route path='details/:webId' element={
            <AuthLayout authentication={true}>
              <WebDetails />
            </AuthLayout>
          } />
        </Route>

        <Route path='your-work/' element={
          <AuthLayout authentication={true}>
            <YourWork />
          </AuthLayout>
        } >
          <Route path='webs/' element={
            <AuthLayout authentication={true}>
              <YourWorkWebs />
            </AuthLayout>
          } >
            <Route path='details/:webId' element={
              <AuthLayout authentication={true}>
                <WebDetails />
              </AuthLayout>
            } />
          </Route>

          <Route path='collections' element={
            <AuthLayout authentication={true}>
              <YourWorkCollections />
            </AuthLayout>
          } />

        </Route>

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
