import React,{useEffect,useState} from 'react'
import {Link} from "react-router-dom"
import "../cssFiles/utils.css"
import UpdateAvatar from '../components/authComponents/UpdateAvatar';
import UpdateCover from '../components/authComponents/UpdateCover';
import UpdateUserDAta from '../components/authComponents/UpdateUserDAta';

export default function ProfileSettings() {
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(()=>{
    document.title = "Settings"
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
    script.onload = ()=>{
        setIsDisabled(false)
    }
    
},[])

  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
        <UpdateAvatar isDisabled={isDisabled}/>
        <UpdateCover isDisabled={isDisabled}/>
        <UpdateUserDAta />

        <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
            <div className='lg:w-[35%] w-full capitalize pr-4'>
                <h2 className=' w-full text-xl font-bold mb-1'>Organize Showcase</h2>
                <p>You can choose and arrange the Pens displayed on your profile.</p>
            </div>
            <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>
              <Link to={`/organize-showcase`}
                className=' w-48 block mx-auto bg-blue-500 text-white py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out text-center hover:bg-blue-600 hover:shadow-lg hover:scale-105 transform hover:duration-300'
              >
                Organize Showcase
              </Link>
            </div>
        </div>
    </div>
  )
}
