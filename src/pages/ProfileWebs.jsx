import React from 'react'
import { NavLink, useParams, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function ProfileWebs() {
    const { username } = useParams()
    const user = useSelector(state => state.auth.userData)
    const showcaseWebs = useSelector(state => state.profile.showcaseWebs)
    const navigate = useNavigate()

    useEffect(() => {
        if (showcaseWebs.length === 0) {
            navigate(`/${username}/popular`, { replace: true })
        }
    }, [username,showcaseWebs.length])

    return (
        <div className='w-full m-0 p-0'>
            <div className='w-full py-2 bg-gray-800 border-t-4 border-t-gray-500 profileNavlinks flex flex-nowrap mb-2 overflow-x-auto'>
                
                {showcaseWebs.length > 0 && <NavLink to='' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Showcase</NavLink>}

                <NavLink to='popular' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Popular</NavLink>

                <NavLink to='public' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Public</NavLink>

                {user.username === username && <NavLink to='private' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Private</NavLink>}

                <NavLink to='forked' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Forked</NavLink>

                <NavLink to='liked' className={`${({ isActive, isPending }) => {
                    return isPending ? "pending" : isActive ? "active" : ""
                }}
                 text-[16px] text-gray-500 font-semibold block px-3 py-[6px]`}>Liked</NavLink>
            </div>
            <Outlet />
        </div>
    )
}
