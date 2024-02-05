import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../cssFiles/utils.css";

export default function Header() {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status);
  const user = useSelector(state => state.auth.userData);

  const toggleLeftMenu = () => {
    setShowLeftMenu(!showLeftMenu);
  }

  const toggleRightMenu = () => {
    setShowRightMenu(!showRightMenu);
  }

  const handleOutsideClick = (event) => {
    if ((showLeftMenu || showRightMenu) && !event.target.closest('.menu-container')) {
      setShowLeftMenu(false);
      setShowRightMenu(false);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate(`/search?q=${search.trim().replaceAll(" ","+").replaceAll("-","+")}`);
    }
  }

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showLeftMenu, showRightMenu]);

  return (
    <>
      <nav className='flex flex-nowrap bg-gray-800 h-[60px] justify-between'>
        <Link to={"/"} className='flex flex-nowrap w-auto h-full py-[6px] sm:px-2'>
          <img src="./images__3_-removebg-preview-min.png"
            alt="O"
            className="w-12 h-12 m-0 p-0" />
          <span
            className='text-2xl font-bold text-white hidden md:block mt-1'
          >CODEWEB</span>
        </Link>
        <button
          className='block md:hidden py-2 w-8 h-full menu-container'
          onClick={toggleLeftMenu}
        >
          <img src={showLeftMenu ? "./cross.png" : "./pngtree-list-vector-icon-png-image_4279414-removebg-preview-min.png"} alt="menu" />
        </button>

        <div className='flex flex-nowrap justify-center py-2 rounded-lg md:min-w-[55vw] min-w-[50vw]'>
        <label htmlFor="searchbox1" className='hidden sm:block sm:w-[15%] material-symbols-outlined text-white rounded-l-xl px-2 pt-3 bg-gray-600 md:w-[8%]'>search</label>
        <input className=' bg-gray-600 text-white rounded-r-xl outline-none px-2 sm:px-0 w-[85%] md:w-[92%] rounded-l-xl sm:rounded-l-none'
         type="search" name="search" value={search} id='searchbox1'
         onChange={(event)=> setSearch(event.target.value)}
         onKeyDown={handleSearch} placeholder="Search..."
         />
        </div>
         {(!authStatus && !user) ? 
          <div className='flex flex-nowrap py-2 justify-between mx-1 max-[390px]:w-[34vw]'>
            <Link to={"/signup"} className='bg-green-600 py-3 px-1 sm:px-2 sm:py-2 sm:text-[16px] font-semibold text-[12px] text-center rounded-lg'>
            Sign Up
            </Link>
            <Link className='bg-blue-500 py-3 text-white ml-[2px] md:mx-2 px-1 sm:px-2 sm:py-2 sm:text-[16px] font-semibold text-[12px] text-center rounded-lg' to={"/login"}>
            Log In
            </Link>
          </div>
         :
         <div className='flex flex-nowrap py-[6px] justify-between mx-1'>
         <button to={"/signup"} className='h-[48px] rounded-lg'>
         <img src="./istockphoto-1219927783-612x612.jpg" alt="img" className='w-full h-full rounded-lg' />
         </button>
         <Link className='h-[48px] ml-[2px] rounded-lg' to={"/login"}>
         <img src="./istockphoto-1219927783-612x612.jpg" alt="" className='w-full h-full rounded-lg'/>
         </Link>
       </div>
         }
      </nav>


      {showLeftMenu && (
        <div className='menu-container fixed top-[60px] left-0 w-auto h-auto md:hidden shadow-xl'>
          {(!authStatus && !user) ?
            <div className='p-4 bg-gray-800'>
              <p className='block text-[10px] font-sans font-bold text-gray-400 ml-2 mb-3'>
                TRY OUR ONLINE EDITOR
                </p>
                <Link className='gradient-border-cointainer' to={"/new-web"}>
                  <span
                  className='gradient-border-item block rounded-md bg-black text-white py-4 px-6 font-bold text-center'
                  >Start Coding</span>
                </Link>
                <Link to={"/trending"} className=' text-white font-semibold text-[16px] block mt-5 p-3 hover:bg-gray-950'>Trending</Link>
                <Link to={"/signup"} className=' text-white font-semibold text-[16px] block mb-5 p-3 hover:bg-gray-950'>Join Us</Link>
            </div> :


            <div className='p-4 bg-gray-800'>
                <p className='block text-[10px] font-sans font-bold text-gray-400 ml-2 mb-3'>
                CREATE NEW WEB
                </p>
                <Link className='gradient-border-cointainer' to={"/new-web"}>
                  <span
                  className='gradient-border-item block rounded-md bg-black text-white py-4 px-6 font-bold text-center'
                  >New Pen</span>
                </Link>
                <Link to={"/your-work"} className=' text-white font-semibold text-[16px] block mt-5 py-2 px-3 hover:bg-gray-900'>Your Work</Link>
                <Link to={"/following"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Following</Link>
                <Link to={"/trending"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Trending</Link>
                <Link to={"/assets"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Assets</Link>
                <Link to={"/following#interesting-people"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Interesting People</Link>
                <button className=' text-white font-semibold text-[16px] block mb-5 px-3 py-2 hover:bg-gray-900'>Pined Items</button>
            </div>}
        </div>
      )}
    </>
  )
}
