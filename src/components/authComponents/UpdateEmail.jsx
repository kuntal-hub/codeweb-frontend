import React,{useState,memo} from 'react'
import Input from "../utilComponents/Input.jsx"
import {useForm} from "react-hook-form"
import {login} from "../../store/authSlice.js"
import {addNotification} from "../../store/notificationSlice.js"
import {useSelector,useDispatch} from "react-redux"
import {authServices} from "../../apiServices/auth.js"

export default memo(function UpdateEmail() {
    const [isDisabaled, setIsDisabled] = useState(true)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const { register, handleSubmit } = useForm();
    const user = useSelector(state=>state.auth.userData)
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        setIsDisabled(true)
        setEmailError('')
        setPasswordError('')
        const password = data.password.trim();
        const email = data.email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === "") {
          setEmailError("Email cannot be empty");
          setIsDisabled(false)
          return;
        }
        if (!emailRegex.test(email.trim())) {
          setEmailError("Invalid Email Address");
          setIsDisabled(false)
          return;
        }
        if (email === user.email) {
            setEmailError('Email is same as current email')
            setIsDisabled(false)
            return
        }
        if (password.trim() === "") {
          setPasswordError("Password cannot be empty");
          setIsDisabled(false)
          return;
        }
        if(password.length < 8){
            setPasswordError("Password must be at least 8 characters long")
            setIsDisabled(false)
            return
        }
        const response = await authServices.chengeEmail({email,password});

        if(response.status<400 && response.data){
            dispatch(login(response.data))
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
                <h2 className=' w-full text-xl font-bold mb-1'>Chenge Email</h2>
                <p>This is where all notifications will be sent, including lost password requests.</p>
            </div>
            <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>
                <form className='w-ful lg:px-2' onSubmit={handleSubmit(onSubmit)}>

                    <Input
                        type="email"
                        lable="New Email :"
                        placeholder="Enter New Email Address"
                        required={true}
                        {...register("email")}
                    /> <br /> 
                    <p className='text-red-500 font-semibold text-sm'
                    >{emailError}</p>
                    <br />

                    <Input
                        type="password"
                        lable="Password :"
                        placeholder="Enter Your Password"
                        required={true}
                        {...register("password")}
                    /> <br /> 
                    <p className='text-red-500 font-semibold text-sm'
                    >{passwordError}</p>
                    <br />

                    <input type="submit" value="Chenge Email" readOnly={isDisabaled}
                        className='bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    />
                </form>
            </div>
        </div>
    )
})
