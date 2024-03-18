import React,{useEffect,useState} from 'react'
import {likeSearvice} from '../../apiServices/like';
import { assetService } from '../../apiServices/asset';
import { followerSearvice } from "../../apiServices/follower";
import { useDispatch,useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { Link } from 'react-router-dom';

export default function ShowImageDetails({showImageDeatil,setShowImageDetails,image}) {
    const [imageDetails, setImageDetails] = useState(null);
    const isFollowedByMe = imageDetails? imageDetails.owner.isFollowedByMe : false;
    const isLikedByMe = imageDetails? imageDetails.isLikedByMe : false;
    const user = useSelector(state=>state.auth.userData);
    const dispatch = useDispatch();

    const toggleLike = async () => {
        const isLiked = isLikedByMe;
        const likesCount = imageDetails.likesCount;
        setImageDetails({...imageDetails,likesCount:isLiked ? likesCount-1 : likesCount+1,isLikedByMe:!isLikedByMe});
        const response =  await likeSearvice.toggleLikeAsset({assetId:image._id});
        if(response.status>=400){
            dispatch(addNotification({type:"error",text:response.message}));
            setImageDetails({...imageDetails,likesCount:likesCount,isLikedByMe:isLiked});
        }
    }

    const toggleFollow = async () => {
        const isFollow = isFollowedByMe;
        const followersCount = imageDetails.owner.followersCount;
        setImageDetails({...imageDetails,owner:{...imageDetails.owner,followersCount:isFollow ? followersCount-1 : followersCount+1,isFollowedByMe:!isFollowedByMe}})
        const response = await followerSearvice.toggleFollow({username:imageDetails.owner.username});
        if(response.status>=400){
            dispatch(addNotification({type:"error",text:response.message}));
            setImageDetails({...imageDetails,owner:{...imageDetails.owner,followersCount:followersCount,isFollowedByMe:isFollow}});
        }
    }
    
    const handleOutsideClick = (event) => {
        if (showImageDeatil && !event.target.closest('.menu-container')) {
          setShowImageDetails(false);
        }
      };
    
      // Adding event listener for clicks outside menu
      useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

      useEffect(() => {
        assetService.getAssetById({assetId:image._id})
        .then(response=>{
            if(response.status<400 && response.data){
                setImageDetails(response.data);
            } else{
                dispatch(addNotification({type:"error",text:response.message}));
            }
        })
      },[]);

  return (
    <div className='half_transparent min-h-screen w-screen fixed top-0 left-0 z-20 grid place-content-center'>
        <div className='GB-cointainer p-1 menu-container'>
            <div className='bg-gray-950 rounded-md'>
                <div className='flex flex-col items-center rounded-md'>
                    <img src={image.assetURL} 
                    className='rounded-md sm:max-w-[75vw!important] md:max-w-[65vw!important] lg:max-w-[50vw!important] m-[0!important] 
                     max-h-[80vh]' 
                    alt='image asset' />
                        <p className='block text-left w-full font-semibold sm:font-bold text-lg px-2 md:px-3 py-2'>
                            {image.title}
                        </p>
                    {imageDetails &&
                    <div className='flex flex-nowrap justify-between overflow-x-auto px-2 md:px-3 py-2 w-full'>
                        <div className='flex flex-nowrap justify-start m-0 p-0'>
                            <Link to={`/${imageDetails.owner.username}`} className='m-0 p-0 mr-2 md:mr-3'>
                            <img src={imageDetails.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_40/")} alt="LOGO"
                            className='h-10 w-[40px!important] m-[0!important] rounded-full'
                            />
                            </Link>
                            <p className='flex flex-col m-0 p-0'>
                                <Link to={`/${imageDetails.owner.username}`}
                                className='text-[14px] md:text-[16px] font-semibold hover:underline'
                                >{imageDetails.owner.fullName}</Link>
                                <span className='text-gray-400 text-[12px]'
                                >{imageDetails.owner.followersCount} Followers</span>
                            </p>
                            {
                                user && user._id !== imageDetails.owner._id &&
                                <button onClick={toggleFollow} title={isFollowedByMe ? "Unfollow" : "Follow"}
                                className={`rounded-full px-4 h-8 ${isFollowedByMe ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-500"} text-[12px] mt-2 text-white ml-2 font-semibold` }
                                >
                                {isFollowedByMe ? "Following" : "Follow"}
                                </button>
                            }
                        </div>
                        <div className='flex flex-nowrap'>
                            <button onClick={toggleLike}
                            title={isLikedByMe ? "Unlike" : "Like"}
                            className='mt-3'
                            >
                                {
                                    isLikedByMe ? 
                                    <img alt='like' 
                                    className='w-[32px!important] m-[0!important] h-8 hover:scale-125 transition-transform
                                     duration-300 ease-in-out'
                                    src='https://res.cloudinary.com/dvrpvl53d/image/upload/q_40/v1709992461/8294893_n5a1la.png'/>
                                    :<span 
                                    className='material-symbols-outlined scale-125 hover:scale-150 transition-transform duration-300 ease-in-out'>
                                        favorite 
                                    </span>
                                }
                            </button>
                            <span className='ml-2 block mt-3'>
                                {imageDetails.likesCount}
                            </span>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
        <button
        className='material-symbols-outlined fixed top-1 right-1 text-white z-30 bg-slate-800 rounded-md border border-white'
        >
            close
        </button>
    </div>
  )
}
