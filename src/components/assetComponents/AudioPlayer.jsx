import React, { useEffect, useState } from 'react'
import { likeSearvice } from '../../apiServices/like';
import { assetService } from '../../apiServices/asset';
import { followerSearvice } from "../../apiServices/follower";
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { Link } from 'react-router-dom';

export default function AudioPlayer({ 
    showaudioDeatil, 
    setShowaudioDetails, 
    audio, 
    playNext, 
    playPriv, 
    togglePlay, 
    totalDuration,
    currentTime,
    isPlaying,
    audioEleRef,
 }) {
    const [audioDetails, setAudioDetails] = useState(null);
    const isFollowedByMe = audioDetails ? audioDetails.owner.isFollowedByMe : false;
    const isLikedByMe = audioDetails ? audioDetails.isLikedByMe : false;
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
        let currentMinutes, currentSeconds;
        let totalMinutes, totalSeconds;
        currentMinutes = Math.floor(currentTime / 60);
        currentSeconds = currentTime - (currentMinutes * 60);
        totalMinutes = Math.floor(totalDuration / 60);
        totalSeconds = totalDuration - (totalMinutes * 60);

    const toggleLike = async () => {
        const isLiked = isLikedByMe;
        const likesCount = audioDetails.likesCount;
        setAudioDetails({ ...audioDetails, likesCount: isLiked ? likesCount - 1 : likesCount + 1, isLikedByMe: !isLikedByMe });
        const response = await likeSearvice.toggleLikeAsset({ assetId: audio._id });
        if (response.status >= 400) {
            dispatch(addNotification({ type: "error", text: response.message }));
            setAudioDetails({ ...audioDetails, likesCount: likesCount, isLikedByMe: isLiked });
        }
    }

    const toggleFollow = async () => {
        const isFollow = isFollowedByMe;
        const followersCount = audioDetails.owner.followersCount;
        setAudioDetails({ ...audioDetails, owner: { ...audioDetails.owner, followersCount: isFollow ? followersCount - 1 : followersCount + 1, isFollowedByMe: !isFollowedByMe } })
        const response = await followerSearvice.toggleFollow({ username: audioDetails.owner.username });
        if (response.status >= 400) {
            dispatch(addNotification({ type: "error", text: response.message }));
            setAudioDetails({ ...audioDetails, owner: { ...audioDetails.owner, followersCount: followersCount, isFollowedByMe: isFollow } });
        }
    }

    const handleOutsideClick = (event) => {
        if (showaudioDeatil && !event.target.closest('.menu-container')) {
            setShowaudioDetails(false);
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
        assetService.getAssetById({ assetId: audio._id })
            .then(response => {
                if (response.status < 400 && response.data) {
                    // response.data.index = audio.index;
                    setAudioDetails(response.data);
                } else {
                    dispatch(addNotification({ type: "error", text: response.message }));
                }
            })
    }, [audio]);

    return (
        <div className='half_transparent min-h-screen w-screen fixed top-0 left-0 z-20 grid place-content-center'>
            <div className='GB-cointainer p-1 menu-container'>
                <div className='bg-gray-950 rounded-md'>
                    <div className='flex flex-col items-center rounded-md'>
                        <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/v1710646937/buniboo-and-bearuloo-piano_l7sv80.gif"
                            className='w-[220px] sm:w-[240px] md:w-[280px] lg:w-[320px] mx-[8vw] block mb-7'
                            alt='audio asset' />
                        <p className='block text-center w-full font-semibold sm:font-bold text-lg px-2 md:px-3 py-2'>
                            {audio.title}
                        </p>
                        <div className='w-full px-8 flex flex-col'>
                            <div className='w-full flex flex-nowrap justify-between'>
                                <span className='text-[12px]'>{currentMinutes}:{currentSeconds}</span>
                                <span className='text-[12px]'>{totalMinutes}:{totalSeconds}</span>
                            </div>
                            <input type="range" className='w-full'
                            value={(currentTime / totalDuration) * 100}
                            onChange={(e)=>{
                                audioEleRef.current.currentTime = (e.target.value / 100) * totalDuration
                            }}
                            />
                            <div className='w-full flex flex-nowrap justify-center text-white pb-2 my-3'>
                                <button onClick={playPriv}
                                    className='material-symbols-outlined hover:scale-125 transition-transform duration-300 ease-in-out mx-2'>
                                    skip_previous
                                </button>
                                <button onClick={togglePlay}
                                    className='material-symbols-outlined hover:scale-125 transition-transform duration-300 ease-in-out mx-2'>
                                    {!isPlaying ? "play_circle" : "pause_circle"}
                                </button>
                                <button onClick={playNext}
                                    className='material-symbols-outlined hover:scale-125 transition-transform duration-300 ease-in-out mx-2'>
                                    skip_next
                                </button>
                            </div>
                        </div>
                        {audioDetails &&
                            <div className='flex flex-nowrap justify-between overflow-x-auto px-2 md:px-3 py-2 w-full'>
                                <div className='flex flex-nowrap justify-start m-0 p-0'>
                                    <Link to={`/${audioDetails.owner.username}`} className='m-0 p-0 mr-2 md:mr-3'>
                                        <img src={audioDetails.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_40/")} alt="LOGO"
                                            className='h-10 w-[40px!important] m-[0!important] rounded-full'
                                        />
                                    </Link>
                                    <p className='flex flex-col m-0 p-0'>
                                        <Link to={`/${audioDetails.owner.username}`}
                                            className='text-[14px] md:text-[16px] font-semibold hover:underline'
                                        >{audioDetails.owner.fullName}</Link>
                                        <span className='text-gray-400 text-[12px]'
                                        >{audioDetails.owner.followersCount} Followers</span>
                                    </p>
                                    {
                                        user && user._id !== audioDetails.owner._id &&
                                        <button onClick={toggleFollow} title={isFollowedByMe ? "Unfollow" : "Follow"}
                                            className={`rounded-full px-4 h-8 ${isFollowedByMe ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-500"} text-[12px] mt-2 text-white ml-2 font-semibold`}
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
                                                    src='https://res.cloudinary.com/dvrpvl53d/image/upload/q_40/v1709992461/8294893_n5a1la.png' />
                                                : <span
                                                    className='material-symbols-outlined scale-125 hover:scale-150 transition-transform duration-300 ease-in-out'>
                                                    favorite
                                                </span>
                                        }
                                    </button>
                                    <span className='ml-2 block mt-3'>
                                        {audioDetails.likesCount}
                                    </span>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
