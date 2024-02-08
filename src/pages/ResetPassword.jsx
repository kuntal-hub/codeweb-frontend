import React, { useEffect, useState } from 'react';
import "../cssFiles/utils.css";
import Form3 from '../components/authComponents/signup/Form3.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authServices } from "../apiServices/auth.js";
import { addNotification } from '../store/notificationSlice.js';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const handelResetPassword = async () => {
    setConfirmPasswordError("");
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be atleast 8 characters long");
      return;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password cannot be empty");
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setLoading(true);
    const response = await authServices.resetPasswrod({newPassword:password.trim(),token:urlParams.get('token')});
    if (response.status<400 && response.data) {
      dispatch(addNotification({ text: response.message, type: "success" }));
      setLoading(false);
      navigate('/login');
    } else if(response.status>=400 && !response.data){
      dispatch(addNotification({ text: response.message, type: "error" }));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!urlParams.has('token')) {
        navigate('/error');
    }
  }, [window.location.search])

  return (
    <div className='w-screen h-screen fixed top-0 left-0 right-0 z-10 bg-gray-800 grid place-content-center'>
      <div className='GB-cointainer p-1'>
        <div className='w-full h-auto bg-gray-800 p-8 md:p-12'>
          <p className='flex flex-nowrap justify-center pb-[6px] sm:px-2 mb-6'>
            <img src="./images__3_-removebg-preview-min.png"
              alt="O"
              className="w-12 h-12 m-0 p-0" />
            <span
              className='text-2xl font-bold text-white mt-2'
            >CODEWEB</span>
          </p>

          <Form3 password={password} setPassword={setPassword}
            confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} passwordError={passwordError}
            setPasswordError={setPasswordError} confirmPasswordError={confirmPasswordError} text="New Password" />

            <button className='text-center block w-40 mx-auto py-3 px-4 text-white font-semibold mt-10 bg-blue-600 hover:bg-blue-500 rounded-lg'
            onClick={handelResetPassword}
            disabled={loading}
            >
              {loading ? <p className='text-center mx-auto'>
                <img src="Gear-0.6s-200px (2).gif" alt="loading" className="w-6 h-6 inline-block" /> Resetting...
              </p> : "Reset Password"}
            </button>

        </div>
      </div>
    </div>
  )
}
