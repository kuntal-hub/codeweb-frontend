import React from 'react'
import MainContainer from '../components/MainContainer'
import { Outlet, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Home() {
    const user = useSelector(state => state.auth.userData);

  return (
    <MainContainer>
        <div className='w-full h-full bg-gray-950'>
            <div className='w-full flex flex-nowrap justify-start px-1 md:px-3 homeMenu text-white'>
                {user && <NavLink to='/following'
                className={`${({ isActive, isPending })=>{
                    return isPending ? "pending" : isActive ? "active" : ""
                }} 
                 font-semibold text-sm min-[350px]:text-lg px-3 py-2 hover:underline`}
                >Following</NavLink>}

                <NavLink to='/'
                className={`${({ isActive, isPending })=>{
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 font-semibold text-sm min-[350px]:text-lg px-3 py-2 hover:underline`}
                >Trending</NavLink>

                {user && <NavLink to='/your-work' 
                className={`${({ isActive, isPending })=>{
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 font-semibold text-sm min-[350px]:text-lg px-3 py-2 hover:underline`}
                >Your Work</NavLink>}
            </div><hr />
            <Outlet />
        </div>
    </MainContainer>
  )
}
