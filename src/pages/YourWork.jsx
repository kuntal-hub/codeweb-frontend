import React,{useEffect} from 'react'
import { NavLink, Outlet,useNavigate } from "react-router-dom"

export default function YourWork() {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === '/your-work' || window.location.pathname === '/your-work/') {
      navigate('webs')
    }
  }, [window.location.pathname])
  
  return (
    <div className='text-white bg-gray-950'>
      <div className='mx-2 md:mx-4 flex flex-nowrap justify-start border-b-2 border-b-blue-600 pb-[2px] pt-4 hdfkhdg'>
        <NavLink to='webs'
          className={`${({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? "active" : ""
          }}
                 font-semibold text-sm min-[350px]:text-lg px-3 pt-1 text-gray-500 hover:underline`}
        >Webs</NavLink>

        <NavLink to='collections'
          className={`${({ isActive, isPending }) => {
            return isPending ? "pending" : isActive ? "active" : ""
          }}
                 font-semibold text-sm min-[350px]:text-lg px-3 pt-1 text-gray-500 hover:underline`}
        >Collections</NavLink>
      </div>
      <Outlet />
    </div>
  )
}
