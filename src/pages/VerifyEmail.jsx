import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../cssFiles/utils.css";
import RetroBG from '../components/backgrounds/RetroBG';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { authServices } from "../apiServices/auth.js";
import { addNotification } from '../store/notificationSlice.js';

export default function VerifyEmail() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(()=>{
        if (!urlParams.has('token')) {
            navigate('/error');
        } else {
            if (user.isVerified) {
                setLoading(false);
            } else {
                authServices.verifyEmail({token:urlParams.get('token')})
                .then(response=>{
                    if (response.status<400 && response.data) {
                        dispatch(login(response.data));
                        dispatch(addNotification({text:response.message, type:"success"}));
                        setLoading(false);
                    }else{
                        dispatch(addNotification({text:response.message, type:"error"}));
                        setLoading(false);
                    }
                })
            }
        }
    },[window.location.search])

    return loading ? <RetroBG text={"Verifying Your Email..."} /> :
        <div className='w-screen h-screen fixed top-0 left-0 right-0 z-10 bg-gray-800 grid place-content-center'>
            <div className='GB-cointainer p-1'>
                <div className='w-full h-auto bg-gray-800 p-8 md:p-12 lg:p-20'>
                    <p className='flex flex-nowrap justify-center pb-[6px] sm:px-2'>
                        <img src="./images__3_-removebg-preview-min.png"
                            alt="O"
                            className="w-12 h-12 m-0 p-0" />
                        <span
                            className='text-2xl font-bold text-white mt-2'
                        >CODEWEB</span>
                    </p>

                    <p className='text-white bold text-3xl'> Congratulations🎉 </p>
                    <p className='text-gray-300 font-semibold my-2 capitalize'>{user.isVerified? "Your email is already verified!":"your email is verified now✅"}</p>
                    <p className='text-center capitalize text-white font-semibold'>go to <Link to={"/"} className='text-blue-600 underline'>home</Link></p>
                </div>
            </div>
        </div>
}
