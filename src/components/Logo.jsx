import React,{memo} from 'react'
import "../cssFiles/utils.css";

export default memo(function Logo() {
  return (
    <div className='GB-cointainer p-1'>
        <p className='flex flex-nowrap w-auto h-full py-[6px] sm:px-2 bg-black'>
          <img src="./images__3_-removebg-preview-min.png"
            alt="O"
            className="w-12 h-12 m-0 p-0" />
          <span
            className='text-2xl font-bold text-white mt-1'
          >CODEWEB</span>
        </p>
    </div>
  )
});
