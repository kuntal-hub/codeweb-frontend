import React,{memo} from 'react'

export default memo(function Form1({fullName, setFullName, email, setEmail, fullNameError="", emailError=""}) {
  return (
    <div>
        <label htmlFor="fullName" className='block mx-auto text-center font-semibold text-white text-lg mb-2'
        >Full Name :</label>
        <input className='block w-[80vw] sm:w-[55vw] md:w-[50vw] lg:w-[40vw] mx-auto bg-gray-600 text-white rounded-xl outline-none px-3 py-3 text-sm' 
        required={true}
        placeholder='Enter Your Name Here...'
        type="text" id='fullName' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
        <p className='text-red-500 ml-2'
        >{fullNameError}</p>


        <label htmlFor="email" className='block mx-auto text-center font-semibold text-white text-lg mt-4 mb-2'
        >Email :</label>
        <input className='block w-[80vw] sm:w-[55vw] md:w-[50vw] lg:w-[40vw] mx-auto bg-gray-600 text-white rounded-xl outline-none px-3 py-3 text-sm' 
        required={true}
        placeholder='Enter Your Email Here...'
        type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <p className='text-red-500 ml-2'
        >{emailError}</p>
    </div>
  )
});
