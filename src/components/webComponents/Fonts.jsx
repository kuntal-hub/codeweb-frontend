import React from 'react'
import {fonts} from "../../utils/fonts"
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default function Fonts() {
    const dispatch = useDispatch();
  return (
    <div className='w-full h-full-50px rounded-b-lg overflow-y-auto text-white'>
        {
            fonts.map((font,index) => (
                <div key={index} className='w-full flex flex-nowrap justify-between p-5 overflow-x-auto'>
                    <input 
                    className={`${font.key} text-2xl w-full bg-gray-950 text-white border-none outline-none`}
                    type="text"
                    defaultValue="This Is Sample Text" />

                    <button onClick={() => {
                        navigator.clipboard.writeText(font.value);
                        dispatch(addNotification({ type: "success", text: "Font Family Copied Successfully!" }))
                    }}
                    className=' text-white bg-blue-600 hover:bg-blue-500 font-semibold px-3 rounded-lg'
                    >
                        Copy
                    </button>
                    
                </div>
            ))
        }
    </div>
  )
}
