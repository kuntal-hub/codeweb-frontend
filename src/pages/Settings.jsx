import React,{useEffect} from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import MainContainer from '../components/MainContainer';

export default function Settings() {

    return (
        <MainContainer>
            <div className='w-full h-full lg:flex lg:flex-nowrap text-white bg-gray-950'>
                <nav className='h-12 w-full lg:h-full lg:w-40 m-0 p-0 bg-gray-900 lg:py-6 px-4 lg:px-0 block'>
                    <ul className='flex flex-nowrap flex-row lg:flex-col'>
                        <li className='text-2xl font-bold font-mono p-2 block lg:text-center lg:mb-5'>Settings</li>

                        <li className='block ml-6 lg:ml-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='profile' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>Profile</NavLink>
                        </li>
                        <li className='block m-0 p-0 lg:text-center hover:bg-gray-700 hover:text-white text-gray-400'>
                            <NavLink to='account' className={`${({ isActive, isPending })=>{
                                return isPending ? "pending" : isActive ? "active" : ""
                            }}
                            text-lg font-semibold block px-3 py-[8px]`}>Account</NavLink>
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
