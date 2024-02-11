import React,{useState,useEffect} from 'react'
import "../../cssFiles/utils.css";
import SimpleLogin from "./SimpleLogin.jsx";
import SimpleSignup from "./SimpleSignup.jsx";

export default function SimpleAuth({setShowAuth}) {
    const [isLoginRendered, setIsLoginRendered] = useState(true);
    const [isSignupRendered, setIsSignupRendered] = useState(false);
    

    useEffect(() => {

    })

  return (
    <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-30 grid place-content-center'>
        <div className='GB-cointainer p-1'>

        </div>
    </div>
  )
}
