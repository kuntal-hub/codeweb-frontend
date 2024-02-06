import React,{useState,useCallback,useEffect} from 'react'
import { Link } from 'react-router-dom';
import "../cssFiles/utils.css";
import Form1 from '../components/authComponents/signup/Form1';
import Form2 from '../components/authComponents/signup/Form2';
import Form3 from '../components/authComponents/signup/Form3';
import {authServices} from "../apiServices/auth.js";
import { useSelector,useDispatch } from 'react-redux';
import {login} from "../store/authSlice.js";
import {addNotification} from "../store/notificationSlice.js";
import RetroBG from '../components/backgrounds/RetroBG.jsx';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [isForm1Rendered, setIsForm1Rendered] = useState(true);
    const [isForm2Rendered, setIsForm2Rendered] = useState(false);
    const [isForm3Rendered, setIsForm3Rendered] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const user = useSelector(state => state.auth.userData);
    document.title = "Signup";

    const handleBAck =()=>{
      if(isForm2Rendered){
        setIsForm1Rendered(true);
        setIsForm2Rendered(false);
        setIsForm3Rendered(false);
      }
      else if(isForm3Rendered){
        setIsForm2Rendered(true);
        setIsForm3Rendered(false);
        setIsForm1Rendered(false);
      }
    }

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

    const handleNext =()=>{
      if (!isForm2Rendered && !isForm3Rendered) {
        setEmailError("");
        setFullNameError("");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim()==="") {
          setEmailError("Email cannot be empty");
          return;
        }
        if (!emailRegex.test(email.trim())) {
          setEmailError("Invalid Email Address");
          return;
        }
        if (fullName.trim() === "") {
          setFullNameError("Full Name cannot be empty");
          return;
        }
        setIsForm1Rendered(false);
        setIsForm2Rendered(true);
        setIsForm3Rendered(false);
        if(username==="") setUsername(fullName.trim().replaceAll(" ","-").toLowerCase());
      }else if(isForm2Rendered && !isForm3Rendered && !isForm1Rendered){
        if (username.length<4 || usernameError!=="Username Available!") {
          return;
        }
        setIsForm1Rendered(false);
        setIsForm2Rendered(false);
        setIsForm3Rendered(true);
      } else if(isForm3Rendered && !isForm2Rendered && !isForm1Rendered){
        setConfirmPasswordError("");
        setLoading(false);
        if(passwordError!==""){
          return;
        }
        if (password.trim() === "") {
          setPasswordError("Password cannot be empty");
          return;
        }
        if (password.length<8) {
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
        authServices.createUser({
          fullName:fullName.trim(),
          email:email.trim(),
          username:username.trim(),
          password:password.trim()
        }).then(response=>{
          if (response) {
            dispatch(login(response));
            dispatch(addNotification({text:"Account Created Successfully",type:"success"}));
            setLoading(false);
            setIsForm1Rendered(false);
            setIsForm2Rendered(false);
            setIsForm3Rendered(false);
          }else{
            dispatch(addNotification({text:"Email already Exists",type:"error"}));
            setLoading(false);
          }
        });
      }
    }

    useEffect(()=>{
      setUsernameError("");
      if (username.trim().length<4) {
        setUsernameError("Username must be atleast 4 characters long");
      }else if (isValidUsername(username.trim())) {
        const timeOut = setTimeout(() => {
          authServices.checkUsernameAvailablity({username:username.trim()})
          .then(response=>{
            if (response) {
              setUsernameError("Username Available!");
            } else {
              setUsernameError("Username already taken");
            }
          })
        }, 800);
        return () => clearTimeout(timeOut);
      }
    },[username])

    useEffect(()=>{
      if (authStatus && user) {
        navigate("/");
      }
    },[authStatus,user])

  return (
    <>
    {loading && <RetroBG text={"Creating Account..."}/>}
    {!loading &&
        <div className='m-0 p-0 w-screen h-screen grid place-content-center bg-gray-900'>
        <div className='GB-cointainer p-1'>
          <div className='w-full h-auto bg-gray-800 p-5'>
            
          <p className='flex flex-nowrap justify-center py-[6px] sm:px-2'>
            <img src="./images__3_-removebg-preview-min.png"
              alt="O"
              className="w-12 h-12 m-0 p-0" />
            <span
              className='text-2xl font-bold text-white mt-1'
            >CODEWEB</span>
          </p>
  
          <p className='text-sm font-semibold text-gray-400 mt-1 text-center mb-5'>Already have any account? &#160;
          <Link to='/login' className='text-blue-400 underline'
           > Login</Link></p>
  
            {(isForm1Rendered && !isForm2Rendered && !isForm3Rendered) &&  
              <Form1 fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} emailError={emailError}
               fullNameError={fullNameError}/>}
  
  
            {(isForm2Rendered && !isForm1Rendered && !isForm3Rendered) && <Form2 username={username} setUsername={setUsername}
            usernameError={usernameError}/>}
  
            {(isForm3Rendered && !isForm1Rendered && !isForm2Rendered) && <Form3 password={password} setPassword={setPassword}
            confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} passwordError={passwordError}
            setPasswordError={setPasswordError} confirmPasswordError={confirmPasswordError} />}
  
  
            <div className='flex justify-between flex-nowrap px-2 mt-8'>
            <button className={`bg-green-600 ${isForm1Rendered? "opacity-0":""} rounded-lg py-2 px-5 font-semibold hover:underline`}
            disabled={isForm1Rendered}
            onClick={handleBAck}
            >Back</button>
            <button className={`bg-blue-600 rounded-lg py-2 px-5 text-white font-semibold hover:underline`}
            onClick={handleNext}
            >{isForm3Rendered? "Create Account" : "Next"}</button>
          </div>
            
          </div>
        </div>
      </div>
    }
    </>
  )
}
