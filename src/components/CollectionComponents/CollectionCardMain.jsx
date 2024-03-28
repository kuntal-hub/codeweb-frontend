import React, { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { likeSearvice } from '../../apiServices/like'
import { followerSearvice } from '../../apiServices/follower'
import { savedCollectionService } from '../../apiServices/savedCollection'
import {addNotification} from "../../store/notificationSlice"

export default memo(function CollectionCardMain({ collection, addsaved = true }) {
    const user = useSelector(state => state.auth.userData);
    const [isFollowedByMe, setIsFollowedByMe] = useState(false);
    const [isLikedByMe, setIsLikedByMe] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [showOptions, setShowOptions] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsFollowedByMe(collection.owner.isFollowedByMe);
        setIsLikedByMe(collection.isLikedByMe);
        setLikesCount(collection.likesCount);
    }, []);

    const toggleLike = async () => {
        if(!user) return alert("Please login to like");
        const isLiked = isLikedByMe;
        const count = likesCount;
        setIsLikedByMe(!isLikedByMe);
        setLikesCount(isLiked ? count - 1 : count + 1);
        const response = await likeSearvice.toggleLikeCollection({collectionId: collection._id});
        if (response.status >= 400) {
            setIsLikedByMe(isLiked);
            setLikesCount(count);
        }
    }

    const toggleFollow = async () => {
        if(!user) return alert("Please login to follow");
        const isFollow = isFollowedByMe;
        setIsFollowedByMe(!isFollowedByMe);
        const response = await followerSearvice.toggleFollow({ username: collection.owner.username });
        if (response.status >= 400) {
            setIsFollowedByMe(isFollow);
        }
    }

    const saveCollection = async () => {
        if(!user) return alert("Please login to save");
        if(!addsaved) return ;
        const response = await savedCollectionService.saveCollection({collectionId: collection._id});
        if (response.status < 400 && response.data) {
            dispatch(addNotification({type:"success", text:"Collection Saved"}));
            setShowOptions(false);
        } else {
            dispatch(addNotification({type:"error", text:response.message}));
        }
    }

    const unsaveCollection = async () => {
        if(!user) return alert("Please login to unsave");
        if(addsaved) return ;
        const response = await savedCollectionService.unsaveCollection({collectionId: collection._id});
        if (response.status < 400 && response.data) {
            dispatch(addNotification({type:"success", text:"Collection Unsaved"}));
            setShowOptions(false);
        } else {
            dispatch(addNotification({type:"error", text:response.message}));
        }
    }

    const toggleSaved = () => {
        if(addsaved){
            saveCollection();
        } else {
            unsaveCollection();
        }
    }



    return (
        <div className='text-white w-full p-2 min-[450px]:p-3 hover:bg-gray-800 rounded-lg flex flex-col my-2
        normHoverableEle transition duration-6500 ease-in-out'>
            <div className='hoverableEle transition duration-6500 ease-in-out m-0 p-0'>
                <Link to={`/collection/${collection._id}`} className='flex w-full flex-wrap justify-center'>
                        <div className='w-[49%] bg-gray-700 mr-[1px] rounded-md'>
                            <img src={collection.webs[0]? collection.webs[0].image
                            :"https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"} 
                            alt="img"
                            className={`w-full ${!collection.webs[0] && "opacity-0"} rounded-md`} /></div>

                        <div className='w-[49%] bg-gray-700 ml-[1px] rounded-md'>
                            <img src={collection.webs[1]? collection.webs[1].image
                            :"https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"} 
                            alt="img"
                            className={`w-full ${!collection.webs[1] && "opacity-0"} rounded-md`} /></div>

                        <div className='w-[49%] bg-gray-700 mt-[2px] mr-[1px] rounded-md'>
                            <img src={collection.webs[2]? collection.webs[2].image
                            :"https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"} 
                            alt="img"
                            className={`w-full ${!collection.webs[2] && "opacity-0"} rounded-md`} /></div>

                        <div className='w-[49%] bg-gray-700 mt-[2px] ml-[1px] rounded-md'>
                            <img src={collection.webs[3]? collection.webs[3].image
                            :"https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"} 
                            alt="img"
                            className={`w-full ${!collection.webs[3] && "opacity-0"} rounded-md`} /></div>
                    </Link>
                <Link to={`/collection/${collection._id}`}
                className='absolute top-2 right-2 bg-gray-900 hover:bg-gray-800 p-1 rounded-md showingEle text-[13px] font-semibold'>
                    <p className='flex flex-nowrap justify-center'>
                    <span>{collection.websCount - collection.webs.length > 0 ? `+${collection.websCount - collection.webs.length} more` 
                    : "View All"} </span>
                    <span className="material-symbols-outlined scale-75">arrow_forward</span>
                    </p>
                </Link>
            </div>
            <div className='flex flex-nowrap justify-start py-4'>
                <Link to={`/${collection.owner.username}`}>
                <img src={collection.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_50/")} alt="avatar"
                    className='rounded-lg w-10 min-[550px]:w-[50px] lg:w-10 xl:w-[50px] h-auto' /></Link>
                <div className='flex flex-col ml-2 sm:ml-3'>
                    <p className='text-sm min-[550px]:text-lg font-bold overflow-hidden h-6'>{collection.name}</p>
                    <p className='flex flex-nowrap justify-start'>
                        <Link to={`/${collection.owner.username}`}
                            className='text-[12px] text-gray-400'>{collection.owner.fullName}</Link>
                        {user && user._id !== collection.owner._id &&
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


                        <Link to={`/collection/${collection._id}`}
                        className='flex flex-nowrap justify-start text-[12px] px-1 py-[2px] bg-gray-600 hover:bg-gray-700 rounded-md mx-1'>
                            <span className="material-symbols-outlined scale-75">remove_red_eye</span>
                            &nbsp;<span className='block mt-[2px]'>{collection.views}</span>
                        </Link>
                    </div>


                {user && showOptions &&
                    <div className='flex flex-col justify-center hoverableEle'>
                        <button className='material-symbols-outlined'>more_vert</button>
                        <div className='showingEle right-5 bottom-0 rounded-md bg-gray-700'>
                            
                            <button onClick={toggleSaved}
                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-600 rounded-b-md w-[160px] hover:rounded-md'>
                                <span className="material-symbols-outlined scale-75">{addsaved ? "library_add" : "remove_circle"}</span>
                                <span className='block mt-[2px]'>{addsaved ? "Save Collection" : "unsave Collection"}</span>
                            </button>
                        </div>
                    </div>}
                </div>


            </div>
            
        </div>
    )
})

