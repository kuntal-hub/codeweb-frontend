import React, { useState,memo } from 'react'
import "../../cssFiles/utils.css";
import SimpleLogin from "./SimpleLogin.jsx";
import SimpleSignup from "./SimpleSignup.jsx";

export default memo(function SimpleAuth({ setShowAuth }) {
    const [isLoginRendered, setIsLoginRendered] = useState(true);
    const [isSignupRendered, setIsSignupRendered] = useState(false);

    const chengeComponent = () => {
        setIsLoginRendered(!isLoginRendered);
        setIsSignupRendered(!isSignupRendered);
    }

    return (
        <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-20 grid place-content-center'>
            <div className='GB-cointainer p-1'>
                <div className='bg-gray-900 text-white p-5 overflow-auto'>
                    <button onClick={() => setShowAuth(false)}
                    className='block material-symbols-outlined text-right w-full text-white'>
                        close
                    </button>
                    <h1 className='text-3xl md:text-[40px] text-center font-bold mb-3'>Hold Up!</h1>
                    <p className='text-gray-400'>
                        You’ll have to Log In or Sign Up (for free!) to save your Web.
                    </p>
                    <p className='text-gray-400'>
                        Don’t worry! All your work will be saved to your account.
                    </p>
                    {isLoginRendered && <SimpleLogin setShowAuth={setShowAuth} />}
                    {isSignupRendered && <SimpleSignup setShowAuth={setShowAuth} />}
                    <br />
                    <button className='text-center block mx-auto' onClick={chengeComponent}>
                        <span className='text-gray-400'>
                            {isLoginRendered ? 'Don’t have an account?' : 'Already have an account?'}
                        </span>
                        <span className='text-blue-500 cursor-pointer'>
                            {isLoginRendered ? ' Sign Up' : ' Log In'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
})
