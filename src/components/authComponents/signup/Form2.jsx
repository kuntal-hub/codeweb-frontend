import React,{memo} from 'react'

export default memo(function Form2({usernameError,setUsername,username}) {
  return (
    <div>
        <label htmlFor="username" className='block mx-auto text-center font-semibold text-white text-lg mb-2'
        >username :</label>
        <input className='block w-[80vw] sm:w-[55vw] md:w-[50vw] lg:w-[40vw] mx-auto bg-gray-600 text-white rounded-xl outline-none px-3 py-3 text-sm' 
        required={true}
        placeholder='Enter Your username Here...'
        type="text" id='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <p className={`${usernameError === "Username Available!" ? "text-green-500":"text-red-500"} ml-2`}
        >{usernameError}</p>
    </div>
  )
});
