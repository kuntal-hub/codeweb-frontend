import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "./store/authSlice.js";
import { authServices } from "./apiServices/auth.js"
import RetroBG from './components/backgrounds/RetroBG.jsx';
import Header from './components/Header';
import Notifications from './components/Notifications';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authServices.getCurrentUser()
      .then((response) => {
        if (response.status >= 400 && response.data===null) {
          authServices.refreshAccessToken()
          .then(response2=>{
            if (response2.data && response2.status<400) {
              dispatch(login(response2.data));
            }
          })
        }else if(response.status<400 && response.data){
          dispatch(login(response.data));
        }
      })
      .finally(() => {
        setLoading(false);
      })
  },[] )

  return (
    <>
      {loading && <RetroBG text={"Loading..."} />}
      {!loading &&
        <>
          <Header />
          <Notifications />
          <main>
            <Outlet />
          </main>
        </>
      }
    </>
  )
}

export default App
