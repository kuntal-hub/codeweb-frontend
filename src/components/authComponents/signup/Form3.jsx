import React,{useState,memo} from 'react'

export default memo(function Form3({password, setPassword, confirmPassword, setConfirmPassword, passwordError, setPasswordError,  confirmPasswordError,text="Password :"}) {
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    const hendlePasswordChange = (e)=>{
        if(e.target.value.includes(" ")){
            setPasswordError("Password cannot contain spaces");
        }else{
            setPasswordError("");
            setPassword(e.target.value);
        }
    }
  return (
    <div>
        <label htmlFor="password" className='block mx-auto text-center font-semibold text-white text-lg mb-2'
        >{text}</label>
        <div className='flex flex-nowrap w-[80vw] sm:w-[55vw] md:w-[50vw] lg:w-[35vw] mx-auto'>
        <input className='w-[85%] bg-gray-600 text-white rounded-l-xl outline-none px-3 py-3 text-sm' 
        required={true}
        placeholder='Choose Your Password Here...'
        type={showPassword? "text":"password"} id='password' value={password} onChange={hendlePasswordChange}/>
        <button className='material-symbols-outlined w-[15%] rounded-r-xl bg-gray-600 text-white outline-none px-3 py-3'
        onClick={()=>setShowPassword(!showPassword)}>
        {showPassword? "visibility_off":"visibility"}
        </button>
        </div>
        <p className='text-red-500 ml-2'
        >{passwordError}</p>


        <label htmlFor="confirmPassword" className='block mx-auto text-center font-semibold text-white text-lg mt-4 mb-2'
        >Confirm Password :</label>
        <div className='flex flex-nowrap w-[80vw] sm:w-[55vw] md:w-[50vw] lg:w-[35vw] mx-auto'>
        <input className='w-[85%] bg-gray-600 text-white rounded-l-xl outline-none px-3 py-3 text-sm' 
        required={true}
        placeholder='Confirm Your Password Here...'
        type={showConfirmPassword? "text":"password"} id='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <button className='material-symbols-outlined w-[15%] rounded-r-xl bg-gray-600 text-white outline-none px-3 py-3'
        onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
        {showConfirmPassword? "visibility_off":"visibility"}
        </button>
        </div>
        <p className='text-red-500 ml-2'
        >{confirmPasswordError}</p>
    </div>
  )
});
