import React, { memo, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { logout } from '../../store/authSlice'
import { addNotification } from '../../store/notificationSlice'
import { authServices } from '../../apiServices/auth'
import Input from '../utilComponents/Input'

export default memo(function DeleteAccount({ setIsDeleteAccountComponentRendered, isDeleteAccountComponentRendered }) {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOutsideClick = (event) => {
    if (isDeleteAccountComponentRendered && !event.target.closest('.menu-container')) {
      setIsDeleteAccountComponentRendered(false);
    }
  };

// Adding event listener for clicks outside menu
useEffect(() => {
document.addEventListener('mousedown', handleOutsideClick);
return () => {
  document.removeEventListener('mousedown', handleOutsideClick);
};
}, []);

  const onSubmit = async (data) => {
    const password = data.password.trim();
    const confermation = confirm('Are you sure you want to delete your account?');
    if (!confermation) return;

    if (password === '') {
      dispatch(addNotification({ text: 'Password is required', type: 'error' }))
      return;
    }
    if(password.includes(' ')) {
      dispatch(addNotification({ text: 'Password cannot contain spaces', type: 'error' }))
      return;
    }

    const response = await authServices.deleteUser({password:password});

    if(response.status<400 && response.data) {
      dispatch(logout());
      dispatch(addNotification({ text: response.message, type: 'success' }))
      setIsDeleteAccountComponentRendered(false);
      navigate('/');
    } else if(response.status>=400 && !response.data) {
      dispatch(addNotification({ text: response.message, type: 'error' }))
      setIsDeleteAccountComponentRendered(false);
    }

  }

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-30 grid place-content-center half_transparent'>
      <div className=' border-red-600 border-8 rounded-lg p-4 bg-black w-[90vw] sm:w-[80vw] md:w-[65vw] lg:w-[50vw] menu-container'>
        <h1 className='text-3xl font-bold font-mono'>MEGA Warning!</h1>
        <p className='mb-3'>
          You are going to delete absolutely everything you've ever done in CodeWeb. Webs, Hearts, Comments, your profile... everything. even your assets.
        </p>
        <p className='mb-3'>
          This cannot be undone. Export anything you want to keep first.
        </p>
        <p className='mb-4'>
          If you're sure, enter your password to <strong>confirm.</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type='password' placeholder='Password'
            required={true}
            {...register("password", { required: true })}
          />
            <button type='submit'
              className='bg-red-600 rounded-lg py-3 px-5 float-left text-white font-semibold hover:bg-red-500 mt-6 mb-3'
            >I Understand, Please Delete My Account! 
            </button>
        </form>
            <button onClick={() => setIsDeleteAccountComponentRendered(false)}
              className='bg-green-600 rounded-lg py-3 px-5 font-semibold float-right hover:bg-green-500 mt-6 mb-3'
            >Cancel</button>
      </div>
    </div>
  )
})
