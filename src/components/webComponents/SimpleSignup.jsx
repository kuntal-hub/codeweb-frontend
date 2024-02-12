import React, { memo, useState, useEffect } from 'react';
import Input from "../utilComponents/Input.jsx";
import { authServices } from "../../apiServices/auth.js";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { addNotification } from "../../store/notificationSlice.js";
import { useForm } from "react-hook-form"

export default memo(function SimpleSignup({setShowAuth}) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isDisabaled, setIsDisabled] = useState(false)
  const [username, setUsername] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [fullNameError, setFullNameError] = useState('')

  function isValidUsername(inputString) {
    // Check if the string starts or ends with "-"
    if (inputString.startsWith('-') || inputString.endsWith('-')) {
      setUsernameError("Username cannot start or end with '-'");
      return false;
    }
    // Check if the string contains spaces, special characters (except "-"), or capital letters
    if (/[\sA-Z!@#$%^&*()_+={}[\]:;<>,.?~\\\/]/.test(inputString)) {
      setUsernameError("Username cannot contain spaces, special characters, or capital letters");
      return false;
    }
    // Check if the string starts with a number
    if (/^\d/.test(inputString)) {
      setUsernameError("Username cannot start with a number");
      return false;
    }
    // If all conditions are met, return true
    return true;
  }

  useEffect(() => {
    setUsernameError("");
    if (username.trim().length < 4) {
      setUsernameError("Username must be atleast 4 characters long");
    } else if (isValidUsername(username.trim())) {
      const timeOut = setTimeout(() => {
        authServices.checkUsernameAvailablity({ username: username.trim() })
          .then(response => {
            if (response) {
              setUsernameError("Username Available!");
            } else {
              setUsernameError("Username already taken");
            }
          })
      }, 800);
      return () => clearTimeout(timeOut);
    }
  }, [username]);


  const submit = async (data) => {
    const { fullName, email, password } = data;
    setIsDisabled(true);
    if (fullName.trim().length < 3) {
      setFullNameError("Full Name must be atleast 3 characters long");
      setIsDisabled(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Invalid Email Address");
      setIsDisabled(false);
      return;
    }
    if (password.trim().length < 8) {
      setPasswordError("Password must be atleast 8 characters long");
      setIsDisabled(false);
      return;
    }
    if (usernameError !== "Username Available!") {
      setIsDisabled(false);
      return;
    }
    if(password.trim().includes(' ')){
      setPasswordError("Password cannot contain spaces");
      setIsDisabled(false);
      return;
    }
    const res = await authServices.createUser({
      fullName: fullName.trim(),
      email: email.trim(),
      password: password.trim(),
      username: username.trim()
    });
    if (res.status<400 && res.data) {
      dispatch(login(res.data));
      dispatch(addNotification({ text: res.message, type: "success" }));
      setShowAuth(false);
    } else if(res.status>=400 && res.data){
      dispatch(addNotification({ text: res.message, type: "error" }));
      setIsDisabled(false);
    }

  }

  return (
    <div className='p-3 mt-5 overflow-auto'>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          lable="Full Name :"
          placeholder="Enter Your Full Name"
          required={true}
          {...register("fullName", { required: true })}
        /> <br />
        <p className='text-red-500 font-semibold text-sm'
        >{fullNameError}</p> <br />


        <label htmlFor="username324242"
        className='text-white font-semibold block mb-1'
        >Username :</label>
        <input type="text" 
        className='bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
        id='username324242'
        placeholder='Enter Your Username'
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        /> <br />
        <p className={`${usernameError==="Username Available!"?"text-green-500":"text-red-500"} font-semibold text-sm`}
        >{usernameError}</p> <br />

        <Input
          type="email"
          lable="Email :"
          placeholder="Enter Your Email"
          required={true}
          {...register("email", { required: true })}
        /> <br />
        <p className='text-red-500 font-semibold text-sm'
        >{emailError}</p> <br />

        <Input
          type="password"
          lable="Password :"
          placeholder="choose your password"
          required={true}
          {...register("password", { required: true })}
        /> <br />
        <p className='text-red-500 font-semibold text-sm'
        >{passwordError}</p> <br />

        <input type="submit" value="Create Account" readOnly={isDisabaled}
          className='bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        />
      </form>
    </div>
  )
})
