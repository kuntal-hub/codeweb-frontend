import React, { useState,memo } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { addNotification } from '../../store/notificationSlice.js';
import { useSafeNavigate } from '../../hooks/useSafeNavigate.js';
import SetTitleDescpiption from './SetTitleDescpiption.jsx';
import {followerSearvice} from "../../apiServices/follower.js"
import {webService} from "../../apiServices/web.js"
import { likeSearvice } from '../../apiServices/like.js';

export default memo(function WebHeader({setIndentationNo,hendleSaveWeb,web}) {
  const webTitle = useSelector(state => state.webs.title);
  const dispatch = useDispatch();
  const webDescription = useSelector(state => state.webs.description);
  const user = useSelector(state => state.auth.userData);
  const [showTitleDescpiption, setShowTitleDescpiption] = useState(false);
  const [isFollowing,setIsFollowing] = useState(web.owner.isFollowedByMe);
  const [isLikedByMe,setIsLikedByMe] = useState(web.isLikedByMe);
  const [isFollowButtonDisabled,setIsFollowButtonDisabled] = useState(false);
  const navigate = useSafeNavigate();

  const hendleSAveButtonClicked = () => {
    if (webTitle==="Untitled" || !webDescription) {
      setShowTitleDescpiption(true);
      return;
    }
    hendleSaveWeb();
  }

  const ToggLelikeWeb = async ()=>{
    setIsLikedByMe(!isLikedByMe);
    await likeSearvice.toggleLikeWeb({webId:web._id});
  }

  const chengeWebView = async (no) => {
    setIndentationNo(no);
    if (user) {
      const res = await webService.chengeEditorView({indentation:no});
      if(res.status>=400){
        dispatch(addNotification({type:"error",text:res.message}))
      } else {
        dispatch(addNotification({type:"info",text:res.message}))
      }
    }
  }

  const toggleFollow = async ()=>{
    setIsFollowButtonDisabled(true)
    const res = await followerSearvice.toggleFollow({username:web.owner.username});
    if (res.status<400 && res.data) {
      setIsFollowing(!isFollowing);
      setIsFollowButtonDisabled(false)
    } else {
      dispatch(addNotification({type:"error",text:res.message}))
      setIsFollowButtonDisabled(false)
    }
  }

  return (
    <div className='w-full h-[50px] bg-gray-700 m-0 p-0 flex flex-nowrap justify-between'
      style={{ fontFamily: 'Poppins, sans-serif !important' }}
    >
      <div className='flex flex-nowrap'>
        <button className='h-[50px]' onClick={()=>navigate("/")}>
          <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/q_30/v1707462949/images__3_-removebg-preview_muaeav.png" alt=""
            className='h-[48px] block' />
        </button>
        <div className='m-0 p-0'>
          <button className='block text-white text-[20px] md:text[24px] font-bold ml-1 mt-3 mb-1 md:ml-2 line-height-10-imp'
          onClick={()=>setShowTitleDescpiption(true)}
          disabled={!user || user._id !== web.owner._id}
          >{webTitle}</button>

          <div className='flex flex-nowrap justify-start mt-3  ml-1 md:ml-2'>
            <button onClick={()=>navigate(`/${web.owner.username}`)}
            className='text-gray-300 text-[12px] block'>
              {web.owner.fullName}
            </button>
            {user && user._id !== web.owner._id && 
            <button onClick={toggleFollow}
            disabled={isFollowButtonDisabled}
            className={`${isFollowing ? "border bg-gray-500 hover:bg-gray-600 text-white":"bg-green-600 hover:bg-green-500"} py-[2px]
             rounded-md px-1 text-[12px] ml-1 font-semibold`}>
              {isFollowing? "Following":"+Follow"}
            </button>}
          </div>
        </div>
      </div>

      <div className='flex flex-nowrap justify-end'>

      {user && user._id === web.owner._id &&
        <button onClick={hendleSAveButtonClicked}
          className='text-white material-symbols-outlined w-10 sm:w-14 h-11 p-2 my-[3px] md:mx-1 bg-green-500 mx-[2px] hover:bg-green-600 rounded-lg text-center'
          title='save chenges' >
          save
        </button>}

        <button onClick={ToggLelikeWeb}
        className='w-10 sm:w-11 h-11 p-2 my-[3px] mr-1 bg-gray-300 mx-[2px] rounded-lg text-center hover:bg-gray-400'
        title={isLikedByMe? "Dislike Web":"Like Web"}>
          <img className='w-full h-full'
          src={isLikedByMe? "https://res.cloudinary.com/dvrpvl53d/image/upload/v1709992461/8294893_n5a1la.png":
          "https://res.cloudinary.com/dvrpvl53d/image/upload/v1709992461/130195_lsk7as.png"} alt="like" />
        </button>

        <div className="dropdown hidden lg:block">
          <div className="my-[3px] w-11 p-2 bg-yellow-300 rounded-md">
          <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/q_25/v1707650466/WhatsApp_Image_2024-02-11_at_4.49.52_PM_dsyaex.jpg" alt="" className='w-8' />
          </div>
          <div className="dropdown-content">

            <button className='w-11 p-2'onClick={()=>chengeWebView(1)} >
            <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/q_25/v1707650466/WhatsApp_Image_2024-02-11_at_4.48.29_PM_sfeilr.jpg" alt="" className='w-8' />
            </button>

            <button className='w-11 p-2'onClick={()=>chengeWebView(2)} >
            <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/q_25/v1707650466/WhatsApp_Image_2024-02-11_at_4.49.52_PM_dsyaex.jpg" alt="" className='w-8' />
            </button>

            <button className='w-11 p-2'onClick={()=>chengeWebView(3)} >
            <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/q_25/v1707650466/WhatsApp_Image_2024-02-11_at_4.48.26_PM_tbhfqw.jpg" alt="" className='w-8' />
            </button>



          </div>
        </div>
          {user?
        <button onClick={()=>navigate("/settings/editor")}
          className='block text-white material-symbols-outlined w-10 sm:w-14 md:mx-1 h-11 p-2 my-[3px] bg-blue-500 mx-[2px] hover:bg-blue-600 rounded-lg text-center'
          title='Editor settings' >
          settings
        </button>:
        <button onClick={()=>navigate("/signup")}
         className='hidden md:block h-11 my-[3px] mx-[2px] p-2 md:mx-1 rounded-lg text-white font-semibold text-sm bg-green-600 hover:bg-green-500'>
        Sign up
        </button>
        }


        {user?
          <button onClick={()=>navigate(`/${user.username}`)}
            className='block w-11 h-11 my-[3px] mr-1 ml-[2px] rounded-lg md:ml-1 md:mr-2' >
            <img src={user.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_80/")} alt="" className='w-ll rounded-lg' />
          </button>:
          <button onClick={()=>navigate("/login")}
           className='block h-11 my-[3px] mr-1 ml-[2px] md:ml-1 md:mr-2 p-2 rounded-lg text-white font-semibold text-sm bg-blue-600 hover:bg-blue-500'>
          Log in
          </button>
          }
      </div>

      {showTitleDescpiption && <SetTitleDescpiption setShowTitleDescpiption={setShowTitleDescpiption} 
      showTitleDescpiption={showTitleDescpiption} />}

    </div>
  )
})

