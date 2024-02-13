import React,{useId,forwardRef,memo,useState} from 'react'

export default memo(forwardRef(function Select({label,options,
    labelClass="text-white font-semibold block text-xl w-[30%]",
    selectClass="text-gray-900 bg-gray-300 font-semibold p-2 rounded-lg w-[70%] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
    ...props},ref) {
    const id = useId()

  return (
    <div className='flex flex-nowrap justify-center m-0 p-0'>
    <label htmlFor={id}
    className={labelClass}
    >{label}</label>
    <select id={id} className={selectClass} {...props} ref={ref} >
    {options.map((option,index)=><option key={index} value={option} >{option}</option>)}
    </select>
    </div>
  )
}))
