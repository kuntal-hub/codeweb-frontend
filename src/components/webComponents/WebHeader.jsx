import React, { useState,memo } from 'react'
import { useSelector } from "react-redux";
import SimpleAuth from './SimpleAuth.jsx';
import { useSafeNavigate } from '../../hooks/useSafeNavigate.js';
import SetTitleDescpiption from './SetTitleDescpiption.jsx';
import {webService} from "../../apiServices/web.js"

export default memo(function WebHeader({setIndentationNo,hendleSaveWeb}) {
  const webTitle = useSelector(state => state.webs.title);
  const webDescription = useSelector(state => state.webs.description);
  const user = useSelector(state => state.auth.userData);
  const [showAuth, setShowAuth] = useState(false);
  const [showTitleDescpiption, setShowTitleDescpiption] = useState(false);
  const navigate = useSafeNavigate();

  const hendleSAveButtonClicked = () => {
    if(!user){
      setShowAuth(true);
      return;
    } 
    if (webTitle==="Untitled" || !webDescription) {
      setShowTitleDescpiption(true);
      return;
    }
    hendleSaveWeb();
  }

  const chengeWebView = async (no) => {
    setIndentationNo(no);
    if (user) {
      const res = await webService.chengeEditorView({indentation:no});
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
          <button className='block text-white text-[20px] md:text[24px] font-bold ml-1 mt-4 mb-1 md:ml-2 line-height-10-imp'
          onClick={()=>setShowTitleDescpiption(true)}
          >{webTitle}</button>
          {user ? <button onClick={()=>navigate(`/${user.username}`)}
           className='text-gray-300 text-[12px] pt-2 ml-1 md:ml-2 block'>{user.fullName}</button>
            : <p className='text-gray-300 text-[12px] pt-3 ml-1 md:ml-2 inline'>Captain Anonymous</p>
          }
        </div>
      </div>

      <div className='flex flex-nowrap justify-end'>
        <button onClick={hendleSAveButtonClicked}
          className='text-white material-symbols-outlined w-10 sm:w-14 h-11 p-2 my-[3px] md:mx-1 bg-green-500 mx-[2px] hover:bg-green-600 rounded-lg text-center'
          title='save chenges' >
          save
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

      {showAuth && <SimpleAuth setShowAuth={setShowAuth} />}
      {showTitleDescpiption && <SetTitleDescpiption setShowTitleDescpiption={setShowTitleDescpiption} />}

    </div>
  )
})
