import React,{useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Home() {
    const [activeTab, setActiveTab] = useState('trending');
    const user = useSelector(state => state.auth.userData);

    // useEffect(() => {
    //     if (window.location.pathname === '/' ) {
    //         setActiveTab('trending');
    //     } else if (window.location.pathname.includes("following")) {
    //         setActiveTab('following');
    //     } else if (window.location.pathname.includes("your-work")) {
    //         setActiveTab('your-work');
    //     }
    // }, [window.location.pathname]);

  return (
    <MainContainer>
        <div className='w-full h-full bg-gray-950'>
            <div className='w-full flex flex-nowrap justify-start px-1 md:px-3'>
                {user && <Link to='/following' onClick={() => setActiveTab('following')}
                className={`${activeTab==="following" ? "text-green-500 bg-gray-800":"text-white"} 
                 font-semibold text-sm min-[350px]:text-lg px-3 py-2 hover:underline`}
                >Following</Link>}

                <Link to='/' onClick={() => setActiveTab('trending')}
                className={`${activeTab==="trending" ? "text-green-500 bg-gray-800":"text-white"}
                 font-semibold text-sm min-[350px]:text-lg px-3 py-2 hover:underline`}
                >Trending</Link>

                {user && <Link to='/your-work' onClick={() => setActiveTab('your-work')}
                className={`${activeTab==="your-work" ? "text-green-500 bg-gray-800":"text-white"}
                 font-semibold text-sm min-[350px]:text-lg px-3 py-2 hover:underline`}
                >Your Work</Link>}
            </div><hr />
            <Outlet />
        </div>
    </MainContainer>
  )
}
