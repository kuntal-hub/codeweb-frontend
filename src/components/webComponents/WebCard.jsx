import React, { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { likeSearvice } from '../../apiServices/like'
import { followerSearvice } from '../../apiServices/follower'
import { authServices } from '../../apiServices/auth'
import {addNotification} from "../../store/notificationSlice"
import AddToCollection from '../CollectionComponents/AddToCollection'
import {setPinedItems,setIsNewItemAdded} from "../../store/pinedSlice"

export default memo(function WebCard({ web, addPined = true, collectionId=null }) {
    const user = useSelector(state => state.auth.userData);
    const [isFollowedByMe, setIsFollowedByMe] = useState(false);
    const [isLikedByMe, setIsLikedByMe] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [addToPined, setAddToPined] = useState(true);
    const [showAddToCollection, setShowAddToCollection] = useState(false);
    const pinedItems = useSelector(state => state.pinedItems.pinedItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsFollowedByMe(web.owner.isFollowedByMe);
        setIsLikedByMe(web.isLikedByMe);
        setLikesCount(web.likesCount);
        setAddToPined(addPined);
    }, []);

    const toggleLike = async () => {
        if(!user) return alert("Please login to like");
        const isLiked = isLikedByMe;
        const count = likesCount;
        setIsLikedByMe(!isLikedByMe);
        setLikesCount(isLiked ? count - 1 : count + 1);
        const response = await likeSearvice.toggleLikeWeb({webId: web._id});
        if (response.status >= 400) {
            setIsLikedByMe(isLiked);
            setLikesCount(count);
        }
    }

    const toggleFollow = async () => {
        if(!user) return alert("Please login to follow");
        const isFollow = isFollowedByMe;
        setIsFollowedByMe(!isFollowedByMe);
        const response = await followerSearvice.toggleFollow({ username: web.owner.username });
        if (response.status >= 400) {
            setIsFollowedByMe(isFollow);
        }
    }

    const togglePined = async () => {
        if(!user) return alert("Please login to pin");
        if (addToPined) {
            const response = await authServices.addToPinedItems({webId: web._id});
            if (response.status<400 && response.data) {
                dispatch(addNotification({type:"success", text:"Web Added to Pined Items"}));
                setAddToPined(false);
                dispatch(setIsNewItemAdded(true));
            } else {
                dispatch(addNotification({type:"error", text:response.message}));
            }
        } else{
            const response = await authServices.removePinedItem({webId: web._id});
            if (response.status<400 && response.data) {
                dispatch(addNotification({type:"success", text:"Web Removed from Pined Items"}));
                if (!addPined) {
                    return dispatch(setPinedItems(pinedItems.filter(item=>item._id !== web._id)));
                }
                setAddToPined(true);
            } else {
                dispatch(addNotification({type:"error", text:response.message}));
            }
        }
    }

    return (
        <div className='text-white w-full p-2 min-[450px]:p-3 hover:bg-gray-800 rounded-lg flex flex-col my-2
        normHoverableEle transition duration-6500 ease-in-out'>
            <div className='hoverableEle transition duration-6500 ease-in-out m-0 p-0'>
                <Link to={`/web/${web._id}`}><img src={web.image} alt="img" className='w-full rounded-lg' /></Link>
                <Link to={`details/${web._id}`}
                className='material-symbols-outlined absolute top-2 right-2 bg-gray-600 hover:bg-gray-700 p-1 rounded-md showingEle'>
                    fullscreen
                </Link>
            </div>
            <div className='flex flex-nowrap justify-start py-4'>
                <img src={web.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_50/")} alt="avatar"
                    className='rounded-lg w-10 min-[550px]:w-[50px] lg:w-10 xl:w-[50px] h-auto' />
                <div className='flex flex-col ml-2 sm:ml-3'>
                    <p className='text-sm min-[550px]:text-lg font-bold overflow-hidden h-6'>{web.title}</p>
                    <p className='flex flex-nowrap justify-start'>
                        <Link to={`/${web.owner.username}`}
                            className='text-[12px] text-gray-400'>{web.owner.fullName}</Link>
                        {user && user._id !== web.owner._id &&
                            <button onClick={toggleFollow}
                                className={`${isFollowedByMe ? "border bg-gray-800 hover:bg-gray-700 text-white" :
                                    "bg-green-600 hover:bg-green-500"} py-[2px] rounded-md px-1 text-[12px] ml-2 font-semibold`}>
                                {isFollowedByMe ? "Following" : "+Follow"}
                            </button>}
                    </p>
                </div>
            </div>
            <div className='normShowingEle transition duration-500 ease-in-out'>
                <div className='flex flex-nowrap justify-between w-full'>
                    <div className='flex flex-nowrap justify-start'>
                        <button onClick={toggleLike}
                        className='flex flex-nowrap justify-start text-[12px] px-1 py-[2px] bg-gray-600 hover:bg-gray-700 rounded-md mx-1'>
                            {
                                isLikedByMe? 
                                <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/v1709992461/8294893_n5a1la.png" alt="Likeed" 
                                className='w-5 h-5'/> :
                                <span className="material-symbols-outlined scale-75">favorite</span>
                            }
                            &nbsp;<span className='block mt-[2px]'>{likesCount}</span>
                        </button>

                        <Link to={`/details/${web._id}#comments`}
                        className='flex flex-nowrap justify-start text-[12px] px-1 py-[2px] bg-gray-600 hover:bg-gray-700 rounded-md mx-1'>
                            <span className="material-symbols-outlined scale-75">comment</span>
                            &nbsp;<span className='block mt-[2px]'>{web.commentsCount}</span>
                        </Link>

                        <Link to={`/view-full/${web._id}`}
                        className='flex flex-nowrap justify-start text-[12px] px-1 py-[2px] bg-gray-600 hover:bg-gray-700 rounded-md mx-1'>
                            <span className="material-symbols-outlined scale-75">remove_red_eye</span>
                            &nbsp;<span className='block mt-[2px]'>{web.views}</span>
                        </Link>
                    </div>


                {user &&
                    <div className='flex flex-col justify-center hoverableEle'>
                        <button className='material-symbols-outlined'>more_vert</button>
                        <div className='showingEle right-5 bottom-0 rounded-md bg-gray-700'>
                            {addPined &&
                            <button onClick={()=>setShowAddToCollection(true)}
                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-600 rounded-t-md w-full hover:rounded-md'>
                                <span className="material-symbols-outlined scale-75">{!collectionId?"playlist_add":"remove_circle"}</span>
                                <span className='block mt-[2px] '>{!collectionId?"Add To Collection":"Remove From Collection"}</span>
                            </button>}
                            <button onClick={togglePined}
                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-600 rounded-b-md w-[160px] hover:rounded-md'>
                                <span className="material-symbols-outlined scale-75">{addToPined ? "library_add" : "remove_circle"}</span>
                                <span className='block mt-[2px]'>{addToPined ? "Add To Pined" : "Remove From Pined"}</span>
                            </button>
                        </div>
                    </div>}
                </div>


            </div>
            {showAddToCollection &&
            <AddToCollection 
            webId={web._id} 
            showAddToCollection={showAddToCollection} 
            setShowAddToCollection={setShowAddToCollection} />}
        </div>
    )
})
