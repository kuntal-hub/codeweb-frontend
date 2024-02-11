import React, { useState } from 'react'
import Input from "../utilComponents/Input.jsx";
import { authServices } from "../../apiServices/auth.js";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { addNotification } from "../../store/notificationSlice.js";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';

export default function SimpleLogin({ setShowAuth }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isDisabaled, setIsDisabled] = useState(false)

  const submit = async (data) => {
    const res = await authServices.login({ identifier: data.identifier, password: data.password });
    if (res.status < 400 && res.data) {
      dispatch(login(res.data))
      dispatch(addNotification({ text: res.message, type: 'success' }))
      setShowAuth(false)
    } else if (res.status >= 400 && !res.data) {
      dispatch(addNotification({ text: res.message, type: 'error' }))
      setIsDisabled(false)
    }
  }

  return (
    <div className='p-3 mt-5'>
      <form onSubmit={handleSubmit(submit)} >
        <Input
          type='text'
          lable='Username or Email :'
          placeholder='Enter username or email'
          required={true}
          {...register('identifier', { required: true })}
        /> <br /><br />

        <Input
          type='password'
          lable='Password :'
          placeholder='Enter your password'
          required={true}
          {...register('password', { required: true })}
        /> <br /><br />

        <div className='flex flex-nowrap justify-between'>
          <input type="submit" value="Login" readOnly={isDisabaled}
            className='bg-blue-500 text-white font-semibold py-3 px-5 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          />
          <Link to={"/forgot-password"} className=' hover:text-blue-500'>Forget Password</Link>
        </div>
      </form>
    </div>
  )
}
