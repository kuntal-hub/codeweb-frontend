import React from 'react'
import {patterns} from "../../utils/patterns"
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default function Patterns() {
    const dispatch = useDispatch();
  return (
    <div className='w-full h-full-50px rounded-b-lg overflow-y-auto'>
        <p className='text-white font-semibold py-1 px-3'
        >Click to copy a pattern as an SVG background-image from  
        <a className='text-blue-600' href="https://heropatterns.com/"> Hero Patterns.</a></p>
        <div className='w-full flex flex-wrap justify-center px-5 py-3'>
            {
                patterns.map((pattern,index)=>{
                    return (
                        <button onClick={()=>{
                            navigator.clipboard.writeText(pattern)
                            dispatch(addNotification({ type: "success", text: "Copied Successfully!" }))
                        }}
                        key={index} className={`pattern${index} w-36 h-36 m-2 border-red-50 border hover:scale-110 transition duration-300 ease-in-out rounded-md`
                        }>

                        </button>
                    )
                })
            }
        </div>
    </div>
  )
}
