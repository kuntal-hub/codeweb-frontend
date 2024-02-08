import React, { useState } from 'react';
import "../cssFiles/utils.css";
import { useDispatch } from 'react-redux';
import { authServices } from "../apiServices/auth.js";
import { addNotification } from '../store/notificationSlice.js';

export default function ForgotPassWord() {
    const [loading, setLoading] = useState(false);
    const [emailSendCount, setEmailSendCount] = useState(0);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();

    const handelClick = async () => {
        setEmailError("");
        setLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === "") {
          setEmailError("Email cannot be empty");
          setLoading(false);
          return;
        }
        if (!emailRegex.test(email.trim())) {
          setEmailError("Invalid Email Address");
          setLoading(false);
          return;
        }
        const response = await authServices.requestForgotPasswordEmail({email:email.trim()});
        if (response.status<400 && response.data) {
            dispatch(addNotification({text:response.message,type:"success"}));
            setEmailSendCount(emailSendCount+1);
            setLoading(false);
        } else if(response.status>=400 && !response.data){
            dispatch(addNotification({text:response.message,type:"error"}));
            setLoading(false);
        }
    }

    return (
        <div className='w-screen h-screen fixed top-0 left-0 right-0 z-10 bg-gray-800 grid place-content-center'>
            <div className='GB-cointainer p-1'>
                <div className='w-full h-auto bg-gray-800 p-8 md:p-12'>

                    <p className='flex flex-nowrap justify-center pb-[6px] sm:px-2'>
                        <img src="./images__3_-removebg-preview-min.png"
                            alt="O"
                            className="w-12 h-12 m-0 p-0" />
                        <span
                            className='text-2xl font-bold text-white mt-2'
                        >CODEWEB</span>
                    </p>

                    <label htmlFor="email" className='block mx-auto text-center font-semibold text-white text-lg mt-4 mb-2'
                    >Email :</label>
                    <input className='block w-[80vw] sm:w-[55vw] md:w-[50vw] lg:w-[35vw] mx-auto bg-gray-600 text-white rounded-xl outline-none px-3 py-3 text-sm'
                        required={true}
                        placeholder='Enter Your Email Here...'
                        type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className='text-red-500 ml-2'
                    >{emailError}</p>

                    <div className='flex flex-nowrap justify-between mt-6'>
                        <p className={`flex flex-nowrap justify-start ${(loading || emailSendCount>=3) || "opacity-0"}`}>
                            {emailSendCount<3 && <img src="./Spinner-1s-200px (1).gif" alt="Sending..." className='block w-12' />}
                            <span className='block text-gray-300 mt-3 font-semibold w-[70%]'>
                                {emailSendCount>=3 ? "You have reached the limit of sending email" : "Sending Reset Email..."}
                            </span>
                        </p>
                        <button className='bg-blue-600 hidden md:block text-white font-semibold py-3 px-3 rounded-lg hover:bg-blue-500'
                        disabled={loading || emailSendCount>=3}
                        onClick={handelClick}
                        >
                            {loading ? "Sending..." : emailSendCount>0 ? "Resend Link" : "Send Reset Link"}
                        </button>

                        <button className='bg-blue-600 block md:hidden text-white font-semibold py-3 px-3 rounded-lg hover:bg-blue-500'
                        disabled={loading || emailSendCount>=3}
                        onClick={handelClick}
                        >
                            {loading ? "Sending..." : emailSendCount>0 ? "Resend" : "Send Email"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
