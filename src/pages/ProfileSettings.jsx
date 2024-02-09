import React,{useEffect,useState} from 'react'
import "../cssFiles/utils.css"
import UpdateAvatar from '../components/authComponents/UpdateAvatar';
import UpdateCover from '../components/authComponents/UpdateCover';

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
    <div className='w-full h-full overflow-auto bg-gray-950 pb-16'>
        <UpdateAvatar isDisabled={isDisabled}/>
        <UpdateCover isDisabled={isDisabled}/>
    </div>
  )
}
