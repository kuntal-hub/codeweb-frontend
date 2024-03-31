import React,{useEffect} from 'react'
import { NavLink, useParams, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProfileCollections() {
    const { username } = useParams()
    const user = useSelector(state => state.auth.userData)
    const navigate = useNavigate()

    useEffect(()=>{
        if (
            window.location.pathname === `/${username}/collections` || 
            window.location.pathname === `/${username}/collections/`
        ) {
            navigate(`/${username}/collections/popular`);
        }
    },[window.location.pathname])

    return (
        <div className='w-full m-0 p-0'>
            <div className='w-full py-2 bg-gray-800 border-t-4 border-t-gray-500 profileNavlinks flex flex-nowrap mb-2 overflow-x-auto'>
                
                <NavLink to='popular' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Popular</NavLink>

                <NavLink to='public' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Public</NavLink>

                {user && user.username === username && <NavLink to='private' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Private</NavLink>}

                <NavLink to='liked' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Liked</NavLink>
            </div>
            <Outlet />
        </div>
    )
}
