import React,{useState,memo} from 'react';
import {authServices} from "../../apiServices/auth.js";
import {useDispatch,useSelector} from "react-redux"
import {addNotification} from "../../store/notificationSlice.js"

export default memo(function RequestVerifyEmail() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [emailSentCount, setEmailSentCount] = useState(0)
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.userData)
  
  const RequestVerifyEmail = async () => {
    setIsDisabled(true)
    if(user.isVerified){
        dispatch(addNotification({text:'Your email is already verified',type:'warning'}))
        return
    }
    if(emailSentCount>=3){
        dispatch(addNotification({text:'You have reached the maximum limit of sending email verification',type:'error'}))
        return
    }
    const response = await authServices.requestVeryficationEmail({});
    if(response.status<400 && response.data){
        setEmailSentCount(emailSentCount+1)
        dispatch(addNotification({text:response.message,type:'success'}))
        setIsDisabled(false)
    }else if(response.status>=400 && !response.data){
        dispatch(addNotification({text:response.message,type:'error'}))
        setIsDisabled(false)
    }
  }

  return (
    <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
    <div className='lg:w-[35%] w-full capitalize pr-4'>
        <h2 className=' w-full text-xl font-bold mb-1'>Verify Email</h2>
        <p className=' capitalize'>It helps us to authenticate you and also increase your credibility</p>
    </div>
    <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>
      {!user.isVerified &&
      <button onClick={RequestVerifyEmail} disabled={isDisabled}
      className=' w-56 block mx-auto bg-blue-500 text-white py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out text-center hover:bg-blue-600 hover:shadow-lg hover:scale-105 transform hover:duration-300'
    >
      Send Verification Email 
    </button>
      }
      {user.isVerified && "✅ Your email is already verified"}
    </div>
</div>
  )
})
