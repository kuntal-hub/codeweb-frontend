import React,{useState,memo} from 'react'
import Input from "../utilComponents/Input.jsx"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {addNotification} from "../../store/notificationSlice.js"
import {authServices} from "../../apiServices/auth.js"


export default memo(function UpdatePassword() {
  const [isDisabaled, setIsDisabled] = useState(false)
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const oldPassword = data.oldPassword.trim();
    const newPassword = data.newPassword.trim();
    setCurrentPasswordError('')
    setNewPasswordError('')
    setIsDisabled(true)
    if (oldPassword === "") {
      setCurrentPasswordError("Password cannot be empty");
      return;
    }
    if(newPassword === ""){
      setNewPasswordError("Password cannot be empty")
      return
    }
    if(newPassword.length < 8){
      setNewPasswordError("Password must be at least 8 characters long")
      return
    }
    if(newPassword.includes(' ')){
      setNewPasswordError("Password cannot contain spaces")
      return
    }
    if (oldPassword===newPassword) {
      setNewPasswordError('New password is same as current password')
      return
      
    }

    const response = await authServices.chengePassword({oldPassword,newPassword});

    if(response.status<400 && response.data){
      dispatch(addNotification({text:response.message,type:'success'}))
      setIsDisabled(false)
    }else if(response.status>=400 && !response.data){
      dispatch(addNotification({text:response.message,type:'error'}))
      setIsDisabled(false)
    }
  }

  return (
    <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
      <div className='lg:w-[35%] w-full pr-4'>
        <h2 className=' w-full text-xl font-bold mb-1'>Update Password</h2>
        <p>Enter both fields to change your password.</p>
      </div>
      <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>
        <form className='w-ful lg:px-2' onSubmit={handleSubmit(onSubmit)}>

          <Input
            type="password"
            lable="Current Password :"
            placeholder="Enter Your Current Password"
            required={true}
            {...register("oldPassword")}
          /> <br />
          <p className='text-red-500 font-semibold text-sm'
          >{currentPasswordError}</p>
          <br />

          <Input
            type="password"
            lable="New Password :"
            placeholder="Enter New Password"
            required={true}
            {...register("newPassword")}
          /> <br />
          <p className='text-red-500 font-semibold text-sm'
          >{newPasswordError}</p>
          <br />

          <input type="submit" value="Chenge Password" readOnly={isDisabaled}
            className='bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          />
        </form>
      </div>
    </div>
  )
})
