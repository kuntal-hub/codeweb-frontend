import React,{memo} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "../cssFiles/utils.css";
import { removeNotification } from '../store/notificationSlice.js';

export default memo(function Notifications() {
    const dispatch = useDispatch();
    const notifications = useSelector((state)=>state.notifications.notifications);
  return (
    <div className='fixed top-0 left-0 right-0 h-auto w-screen bg-transparent z-20'>
        {notifications.map((notification,index)=>(
            notification.text.trim()!==""? <p key={index} className={`flex flex-nowrap justify-between w-72 sm:w-80 md:w-96 ${notification.type} rounded-md`}>
                <span className='w-[85%]'>{notification.text}</span> <button onClick={()=>dispatch(removeNotification(index))}
                 className='material-symbols-outlined w-[15%]'>close</button>
            </p>:"")
        )}
    </div>
  )
})
