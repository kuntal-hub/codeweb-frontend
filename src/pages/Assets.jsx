import React,{useEffect} from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import MainContainer from '../components/MainContainer';

export default function Assets() {
    const navigate = useNavigate();
    document.title = "Assets";

    useEffect(() => {
        if (window.location.pathname === "/assets" || window.location.pathname === "/assets/") {
            navigate('/assets/images');
        }
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.type = "text/javascript";
        document.body.appendChild(script);
    }, []);

    return (
        <MainContainer>
            <div className='w-full h-full lg:flex lg:flex-nowrap text-white bg-gray-950'>
                <nav className='h-12 w-full lg:h-full lg:w-40 m-0 p-0 bg-gray-900 lg:py-6 px-4 lg:px-0 block'>
                    <ul className='flex flex-nowrap flex-row lg:flex-col'>
                        <li className='text-2xl font-bold font-mono p-2 hidden sm:block lg:text-center lg:mb-5'>Assets</li>

                        <li className='block ml-0 sm:ml-6 lg:ml-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='images' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>Images</NavLink>
                        </li>
                        <li className='block m-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='videos' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>Videos</NavLink>
                        </li>
                        <li className='block m-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='audios' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>Audios</NavLink>
                        </li>
                        <li className='block min-[490px]:hidden m-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='my' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>My</NavLink>
                        </li>
                        <li className='hidden min-[490px]:block m-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='my' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>My Assets</NavLink>
                        </li>
                        <li className='block m-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='liked' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>Liked</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='settings-page-cobtainer h-auto'>
                    <Outlet />
                </div>
            </div>
        </MainContainer>
    )
}

