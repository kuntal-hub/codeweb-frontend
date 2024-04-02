import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../cssFiles/utils.css";
import { authServices } from "../apiServices/auth.js"
import { logout } from '../store/authSlice';
import { addNotification } from '../store/notificationSlice.js';
import { useForm } from 'react-hook-form';
import CreateCollection from './CollectionComponents/CreateCollection.jsx';
import PinedItems from './webComponents/PinedItems.jsx';

export default function Header() {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [showPinedItems, setShowPinedItems] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status);
  const user = useSelector(state => state.auth.userData);
  const { register, handleSubmit } = useForm();
  const urlParams = new URLSearchParams(window.location.search);

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

  const handleSearch = (data) => {
    if (window.location.pathname === '/search' || window.location.pathname === '/search/') {
        urlParams.set('q', data.search.trim());
        navigate(`/search?${urlParams.toString()}`);
    } else {
        navigate(`/search?q=${data.search.trim().replaceAll(" ", "+")}`);
    }
  }

  const logoutUser = async () => {
    if (authStatus && user) {
      const response = await authServices.logout({ fromAllDevices: true });
      if (response) {
        localStorage.clear();
        dispatch(logout());
        dispatch(addNotification({ text: "You have been logged out", type: "success" }));
        navigate('/');
        window.location.reload();
      } else {
        dispatch(addNotification({ text: "An error occurred", type: "error" }));
      }
    } else {
      return;
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
      <nav className='flex flex-nowrap bg-gray-800 h-[60px] justify-between fixed top-0 left-0 right-0'>
        <Link to={"/"} className='flex flex-nowrap w-auto h-full py-[6px] sm:px-2'>
          <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/q_30/v1707462949/images__3_-removebg-preview_muaeav.png"
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
          <img src={showLeftMenu ? "https://res.cloudinary.com/dvrpvl53d/image/upload/q_20/v1707477839/cross_qb9y0k.png" : "https://res.cloudinary.com/dvrpvl53d/image/upload/q_20/v1707477839/pngtree-list-vector-icon-png-image_4279414-removebg-preview-min_hnf1ts.png"} alt="menu" />
        </button>

        <form onSubmit={handleSubmit(handleSearch)}
        className='flex flex-nowrap justify-center py-2 rounded-lg md:min-w-[55vw] min-w-[50vw]'>
          <label htmlFor="searchbox1" className='hidden sm:block sm:w-[15%] material-symbols-outlined text-white rounded-l-xl px-2 pt-3 bg-gray-600 md:w-[8%]'>search</label>
          <input className=' bg-gray-600 text-white rounded-r-xl outline-none px-2 sm:px-0 w-[85%] md:w-[92%] rounded-l-xl sm:rounded-l-none'
            type="search" 
            name="search" 
            {...register('search')}
            id='searchbox1'
            placeholder="Search..."
          />
        </form>
        {(!authStatus && !user) ?
          <div className='flex flex-nowrap py-2 justify-between mx-1 max-[390px]:w-[34vw]'>
            {(window.location.pathname !== '/signup' && window.location.pathname!=="/signup/") &&
              <Link to={"/signup"} className='bg-green-600 py-3 px-1 sm:px-2 sm:py-2 sm:text-[16px] font-semibold text-[12px] text-center rounded-lg'>
                Sign Up
              </Link>}
            {(window.location.pathname !== '/login'&& window.location.pathname !=="/login/") &&
              <Link className='bg-blue-500 py-3 text-white ml-[2px] md:mx-2 px-1 sm:px-2 sm:py-2 sm:text-[16px] font-semibold text-[12px] text-center rounded-lg' to={"/login"}>
                Log In
              </Link>}
          </div>
          :
          <div className='flex flex-nowrap py-[6px] justify-between mx-1'>
            <button onClick={() => setShowPinedItems(true)}
            className='h-[48px] rounded-lg'>
              <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/q_30/v1707463164/istockphoto-1219927783-612x612_fgnzjx.jpg" alt="img" className='w-full h-full rounded-lg' />
            </button>
            <button className='h-[48px] ml-[2px] sm:mx-2 rounded-lg menu-container' onClick={toggleRightMenu}>
              <img src={user.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_80/")} alt="" className='w-full h-full rounded-lg' />
            </button>
          </div>
        }
      </nav>


      {showLeftMenu && (
        <div className='menu-container fixed top-[60px] z-10 left-0 w-auto h-auto md:hidden shadow-xl'>
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
              <Link to={"/"} className=' text-white font-semibold text-[16px] block mt-5 p-3 hover:bg-gray-950'>Trending</Link>
              <Link to={"/signup"} className=' text-white font-semibold text-[16px] block mb-5 p-3 hover:bg-gray-950'>Join Us</Link>
            </div> :


            <div className='p-4 bg-gray-800'>
              <p className='block text-[10px] font-sans font-bold text-gray-400 ml-2 mb-3'>
                CREATE NEW
              </p>
              <div className='GB-cointainer bg-black p-1 w-36 mx-auto'>
                <div className='m-0 p-0 w-[136px]'>
                  <Link to={"/new-web"}
                    className='block text-center py-2 bg-gray-700 rounded-t-lg text-white hover:bg-black font-semibold'>
                    Web
                  </Link>
                  <button onClick={() => setShowCreateCollection(true)}
                    className='block w-full text-center py-2 bg-gray-700 rounded-b-lg text-white hover:bg-black font-semibold mt-1'>
                    Collection
                  </button>
                </div>
              </div>
              <Link to={"/your-work/webs"} className=' text-white font-semibold text-[16px] block mt-5 py-2 px-3 hover:bg-gray-900'>Your Work</Link>
              <Link to={"/following"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Following</Link>
              <Link to={"/"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Trending</Link>
              <Link to={"/assets"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Assets</Link>
              <Link to={"/explore-profiles"} className=' text-white font-semibold text-[16px] block py-2 px-3 hover:bg-gray-900'>Explore Profiles</Link>
              <button onClick={() => setShowPinedItems(true)}
              className=' text-white font-semibold w-full text-[16px] block mb-5 px-3 py-2 hover:bg-gray-900 text-left'>
                Pined Items</button>
            </div>}
        </div>
      )}


      {(showRightMenu && authStatus && user) && (
        <div className='menu-container fixed top-[60px] z-30 right-0 w-[150px] h-auto shadow-xl bg-gray-800 py-5'>
          <Link to={`/${user.username}`}
          className='text-white text-center font-semibold 
           text-[16px] py-[6px] px-4 flex flex-nowrap justify-center hover:bg-black'>
            <span className="material-symbols-outlined">account_circle</span>&nbsp;<span>My Profile</span>
          </Link>

          <Link to={"/your-work/webs"} 
          className='text-white mb-2 text-center font-semibold text-[16px] py-[6px] px-4 block hover:bg-black'>
            Your Work
          </Link><hr />

          <Link to={"/"} 
          className='text-white text-center font-semibold text-[16px] py-[6px] px-4 block hover:bg-black'>
            Trending
          </Link>

          <Link to={"/following"} 
          className='text-white mb-2 text-center font-semibold text-[16px] py-[6px] px-4 block hover:bg-black'>
            Following
          </Link><hr />

          <Link to={"/settings/profile"}
          className='text-white text-center font-semibold mt-2
           text-[16px] py-[6px] px-4 flex flex-nowrap justify-center hover:bg-black'>
            <span className='material-symbols-outlined mr-1'>settings</span><span>Settings</span>
          </Link>

          <button className='text-white font-semibold text-[16px] py-[6px] px-4 flex flex-nowrap justify-center hover:bg-black w-full'
            onClick={logoutUser}>
            <span className='material-symbols-outlined'>logout</span><span>Logout</span>
          </button>
        </div>
      )}

      <nav className='sight-nav bg-gray-800'>
        {authStatus && user ?
        <>
        <p className='block text-[10px] font-sans font-bold text-gray-400 ml-5 mb-3 mt-5'>
          CREATE NEW
        </p>
        <div className='GB-cointainer bg-black p-1 w-36 mx-auto'>
          <div className='m-0 p-0 w-[136px]'>
            <Link to={"/new-web"}
              className='block text-center py-2 bg-gray-700 rounded-t-lg text-white hover:bg-black font-semibold'>
              Web
            </Link>
            <button onClick={()=>setShowCreateCollection(true)}
              className='block w-full text-center py-2 bg-gray-700 rounded-b-lg text-white hover:bg-black font-semibold mt-1'>
              Collection
            </button>
          </div>
        </div>
        <Link to={"/your-work/webs"} className=' text-white font-semibold text-[16px] block mt-5 py-2 px-6 hover:bg-gray-900'>Your Work</Link>
        <Link to={"/following"} className=' text-white font-semibold text-[16px] block py-2 px-6 hover:bg-gray-900'>Following</Link>
        <Link to={"/"} className=' text-white font-semibold text-[16px] block py-2 px-6 hover:bg-gray-900'>Trending</Link>
        <Link to={"/assets"} className=' text-white font-semibold text-[16px] block py-2 px-6 hover:bg-gray-900'>Assets</Link>
        <Link to={"/explore-profiles"} className=' text-white font-semibold text-[16px] block py-2 px-6 hover:bg-gray-900'>
        Explore Profiles</Link>
        <button onClick={()=>setShowPinedItems(true)}
        className=' text-white font-semibold text-[16px] block mb-5 px-6 py-2 hover:bg-gray-900 w-full text-left'
        >Pined Items</button>
        </>
          :
        <>
        <p className='block text-[10px] font-sans font-bold text-gray-400 ml-4 mb-3 mt-6'>
                TRY OUR ONLINE EDITOR
              </p>
              <Link className='gradient-border-cointainer ml-3' to={"/new-web"}>
                <span
                  className='gradient-border-item block rounded-md bg-black text-white py-4 px-6 font-bold text-center'
                >Start Coding</span>
              </Link>
              <Link to={"/"} className=' text-white font-semibold text-[16px] ml-3 block mt-5 p-3 hover:bg-gray-950'>Trending</Link>
              <Link to={"/signup"} className=' text-white font-semibold text-[16px] ml-3 block mb-5 p-3 hover:bg-gray-950'>Join Us</Link>
        </>
        }
      </nav>
      {showCreateCollection && 
      <CreateCollection
      showCreateCollection={showCreateCollection}
      setShowCreateCollection={setShowCreateCollection} />}
      {showPinedItems &&
      <PinedItems
      showPinedItems={showPinedItems}
      setShowPinedItems={setShowPinedItems}
      />}
    </>
  )
}
