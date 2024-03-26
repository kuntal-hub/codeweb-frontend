import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { webService } from '../apiServices/web'
import { useDispatch, useSelector } from 'react-redux'
import Iframe from '../components/webComponents/Iframe'
import WebDEtails from '../components/webComponents/WebDEtails'
import { likeSearvice } from '../apiServices/like'
import {followerSearvice} from "../apiServices/follower"
import { addNotification } from '../store/notificationSlice'
import AddToCollection from '../components/CollectionComponents/AddToCollection'
import { authServices } from '../apiServices/auth'
import { setIsNewItemAdded } from '../store/pinedSlice'
import DeleteWeb from '../components/webComponents/DeleteWeb'
import UpdateWebDetails from '../components/webComponents/UpdateWebDetails'
import Editor from "@monaco-editor/react"
import "../cssFiles/editor.css";

export default function WebDetails() {
  const [webDetails, setWebDetails] = useState(null)
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [showDeleteWebComponent,setShowDeleteWebCoponent] = useState(false);
  const [showUpdateWebDetails, setShowUpdateWebDetails] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [fileName, setFileName] = useState('script.js');
  const navigate = useNavigate()
  const { webId } = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userData)

  const files = {
    'script.js': {
        name: 'script.js',
        language: 'javascript',
        value: webDetails? webDetails.js:"",
    },
    'style.css': {
        name: 'style.css',
        language: 'css',
        value: webDetails? webDetails.css:"",
    },
    'index.html': {
        name: 'index.html',
        language: 'html',
        value: webDetails? webDetails.html :"",
    },
};

const file = files[fileName];

  const handleOutsideClick = (event) => {
    if (window.location.pathname.includes("details") && webId && !event.target.closest('.menu-container')) {
      navigate("../");
    }
  };

  const toggleFollow = async () => {
    const isFollow = webDetails?.owner.isFollowedByMe;
    const followersCount = webDetails?.owner.followersCount;
    setWebDetails((prev) => {
      return { 
        ...prev, 
        owner: { ...prev.owner, 
                  isFollowedByMe: !isFollow, 
                  followersCount: isFollow ? followersCount - 1 : followersCount + 1 } }
    })
    const response = await followerSearvice.toggleFollow({username:webDetails.owner.username})
    if (response.status >= 400) {
      setWebDetails((prev) => {
        return { 
          ...prev, 
          owner: { ...prev.owner, 
                    isFollowedByMe: isFollow, 
                    followersCount: followersCount } }
      })
      dispatch(addNotification({ type: "error", text: response.message }))
    }
  }

  const toggleLike = async ()=>{
    const isLiked = webDetails?.isLikedByMe;
    const likesCount = webDetails?.likesCount;
    setWebDetails((prev)=>{return {...prev,isLikedByMe:!isLiked,likesCount:isLiked?likesCount-1:likesCount+1}})
    const response = await likeSearvice.toggleLikeWeb({webId})
    if (response.status>=400) {
      setWebDetails((prev)=>{return {...prev,isLikedByMe:isLiked,likesCount:likesCount}})
      dispatch(addNotification({type:"error",text:response.message}))
    }
  }

  const addToPined = async ()=>{
    if(!user) return alert("Please login to pin");
        const response = await authServices.addToPinedItems({webId});
        if (response.status<400 && response.data) {
            dispatch(addNotification({type:"success", text:"Web Added to Pined Items"}));
            dispatch(setIsNewItemAdded(true));
        } else {
            dispatch(addNotification({type:"error", text:response.message}));
        }
  }

  // Adding event listener for clicks outside menu
  useEffect(() => {
    if (!showAddToCollection && !showDeleteWebComponent && !showUpdateWebDetails) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showAddToCollection,showDeleteWebComponent,showUpdateWebDetails]);

  useEffect(() => {
    if (!webId) {
      navigate('/404')
    }

    webService.getWebById({ webId })
      .then(res => {
        if (res.status < 400 && res.data) {
          setWebDetails(res.data)
        } else {
          navigate('/404')
        }
      })

  }, [webId])
  return (
    <div className='w-screen one3_transparent h-screen overflow-y-auto text-white text-3xl fixed top-0 left-0'>
      <div className='GB-cointainer p-1 menu-container block mx-auto w-[94vw]  md:w-[80vw] lg:w-[70vw] my-24'>
        {webDetails ?
          <div className=' bg-gray-700 rounded-lg max-h-screen'>
            <div className='w-full p-2 bg-gray-800 rounded-t-md flex flex-wrap min-[500px]:flex-nowrap justify-between'>

              <div className='flex flex-nowrap justify-start'>
                <Link to={`/${webDetails.owner.username}`}>
                  <img src={webDetails.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_40/")}
                    alt="avatar"
                    className='w-10 h-10 rounded-md' />
                </Link>
                <p className='mx-2'>
                  <Link className='text-sm block' to={`/${webDetails.owner.username}`}>
                    {webDetails.owner.fullName}
                  </Link>
                  <Link className='text-[11px] text-gray-400 block leading-3' to={`/${webDetails.owner.username}`}>
                    {webDetails.owner.followersCount + " Followers"}
                  </Link>
                </p>
                {
                  user && user._id !== webDetails.owner._id &&
                  <button onClick={toggleFollow} title={webDetails.owner.isFollowedByMe ? "Unfollow" : "Follow"}
                    className={`rounded-full px-4 h-7 ${webDetails.owner.isFollowedByMe ?
                      "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-700"} 
                      text-[13px] mt-2 pt-[0!important] text-white font-semibold leading-3`}
                  >
                    {webDetails.owner.isFollowedByMe ? "Following" : "+Follow"}
                  </button>
                }
              </div>
              <div className='flex flex-nowrap justify-end'>
                {user &&<>
                <button onClick={toggleLike}
                  title={webDetails.isLikedByMe ? "Unlike" : "Like"}
                  className='leading-3 bg-gray-600 rounded-md p-2 hover:scale-110 hover:bg-gray-900
                   transition-all duration-700 ease-in-out h-full'
                >
                  {
                    webDetails.isLikedByMe ?
                      <img alt='like'
                        className='w-6 m-0 h-6 leading-3'
                        src='https://res.cloudinary.com/dvrpvl53d/image/upload/q_40/v1709992461/8294893_n5a1la.png' />
                      : <span
                        className='material-symbols-outlined leading-3 scale-110'>
                        favorite
                      </span>
                  }
                </button>

                <div className='flex flex-col justify-center hoverableEle'>
                        <button 
                        className='material-symbols-outlined leading-3 bg-gray-600 rounded-md h-full p-2 hover:scale-110
                         hover:bg-gray-900 transition-all duration-300 ease-in-out mx-1 md:mx-2'>
                          more_horiz</button>
                        <div className='showingEle right-3 top-10 rounded-md bg-gray-700'>
                        <button onClick={() => setShowAddToCollection(true)}
                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-800 rounded-t-md w-full hover:rounded-md leading-3'>
                                <span className="material-symbols-outlined scale-90">playlist_add</span>
                                <span className='block mt-1'>Add To Collection</span>
                            </button>
                            <button onClick={addToPined}
                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-800 rounded-b-md w-[160px] hover:rounded-md leading-3'>
                                <span className="material-symbols-outlined scale-75">library_add</span>
                                <span className='block mt-1'>Add To Pined</span>
                            </button>
                            {user && user._id === webDetails.owner._id && <>
                            <button onClick={() => setShowUpdateWebDetails(true)}
                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-800 rounded-b-md w-[160px] hover:rounded-md leading-3'>
                                <span className="material-symbols-outlined scale-75">edit</span>
                                <span className='block mt-1'>Edit Web</span>
                            </button>
                            <button onClick={() => setShowDeleteWebCoponent(true)}
                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-red-500 hover:bg-gray-800 rounded-b-md w-[160px] hover:rounded-md leading-3'>
                                <span className="material-symbols-outlined scale-75">delete</span>
                                <span className='block mt-1'>Delete Web</span>
                            </button>
                            </>}
                        </div>
                    </div>
                  </>}

                  <Link to={`/web/${webId}`}
                  className='leading-3 text-sm font-semibold bg-gray-600 rounded-md h-full p-2 hover:scale-110
                  hover:bg-gray-900 transition-all duration-300 ease-in-out'>
                  <span className='hidden md:inline-block pt-1'>View In Editor</span>
                  <span className='material-symbols-outlined md:hidden'>edit</span>
                  </Link>

              </div>

            </div>

                              
            <div className='w-full h-[70vh] rounded-b-md mb-1'>
              <div className='w-full flex flex-nowrap justify-between bg-gray-900 py-1 px-[2px]'>
                  <div className='flex flex-nowrap justify-start'>
                    <button onClick={()=>{
                      if (showCode && fileName!=="index.html") {
                        setFileName("index.html");
                      } else if(showCode && fileName==="index.html") {
                        setShowCode(false);
                      } else {
                        setShowCode(true);
                        setFileName("index.html");
                    }}}
                    className={`${(fileName==="index.html" && showCode)? "bg-gray-800":"bg-gray-700"}
                     text-[14px] px-2 rounded-md mx-[2px] w-16 hover:bg-gray-800`}>
                          HTML
                    </button>

                    <button onClick={()=>{
                      if (showCode && fileName!=="style.css") {
                        setFileName("style.css");
                      } else if(showCode && fileName==="style.css") {
                        setShowCode(false);
                      } else {
                        setShowCode(true);
                        setFileName("style.css");
                    }}}
                    className={`${(fileName==="style.css" && showCode)? "bg-gray-800":"bg-gray-700"}
                    text-[14px] px-2 rounded-md mx-[2px] w-16 hover:bg-gray-800`}>
                              CSS
                    </button>
                    
                    <button onClick={()=>{
                      if (showCode && fileName!=="script.js") {
                        setFileName("script.js");
                      } else if(showCode && fileName==="script.js") {
                        setShowCode(false);
                      } else {
                        setShowCode(true);
                        setFileName("script.js");
                    }}}
                    className={`${(fileName==="script.js" && showCode)? "bg-gray-800":"bg-gray-700"}
                    text-[14px] px-2 rounded-md mx-[2px] w-16 hover:bg-gray-800`}>
                              JS
                    </button>
                  </div>
                  <button onClick={()=>setShowCode(!showCode)}
                  className={` text-[14px] bg-gray-700 px-2 rounded-md mx-[2px] w-16 hover:bg-gray-800`}>
                              Result
                  </button>
              </div>

              <div className='w-full flex flex-nowrap justify-between h-[calc(100%-44px)]'>
                    {showCode && 
                    <div className='h-full w-full lg:w-[50%]'>
                    <Editor
                width="100%"
                height="100%"
                language={file.language}
                theme={"vs-dark"}
                value={file.value}
                readOnly={true}
                options={{
                    domReadOnly: true,
                    readOnly: true,
                    fontFamily: "Source Code Pro, monospace",
                    fontWeight: "500",
                    fontSize: "12px",
                    minimap: { enabled: false },
                    copyWithSyntaxHighlighting: true,
                    lineHeight: 18,
                    mouseWheelZoom: true,
                    showUnused: true,
                    wordWrap: "on",
                }}
            />
                    </div>}
                    <div 
                    className={`h-full w-full ${showCode? "hidden lg:block lg:w-[50%]":""}`}>
                      <Iframe web={webDetails} />
                    </div>
              </div>
            </div>


          </div>
          : <div className='bg-gray-800 grid place-content-center h-[80vh]'>
            <div className="loader"></div>
          </div>
        }

        {
          webDetails &&

          <WebDEtails web={webDetails} />

        }
      </div>
      {showAddToCollection && user &&
      <div className='text-sm'>
        <AddToCollection 
            webId={webId} 
            showAddToCollection={showAddToCollection} 
            setShowAddToCollection={setShowAddToCollection} />
      </div>
            }
      {webDetails && user && user._id === webDetails.owner._id &&
      <div className='text-sm'>
        {showDeleteWebComponent && !showUpdateWebDetails &&
        <DeleteWeb 
            webId={webId} 
            showDeleteWebComponent={showDeleteWebComponent} 
            setShowDeleteWebCoponent={setShowDeleteWebCoponent} />}
        {
          showUpdateWebDetails && !showDeleteWebComponent &&
          <UpdateWebDetails 
              web={webDetails} 
              setWebDetails={setWebDetails}
              showUpdateWebDetails={showUpdateWebDetails} 
              setShowUpdateWebDetails={setShowUpdateWebDetails} />
        }
      </div>
            }
    </div>
  )
}
