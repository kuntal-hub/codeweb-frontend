import React, { useState,memo } from 'react'
import { likeSearvice } from '../../apiServices/like';

export default memo(function VideoAssetCard({ video }) {
    const [isLikedByMe, setIsLikedByMe] = useState(video.isLikedByMe);
    const [likesCount, setLikesCount] = useState(video.likesCount);

    const toggleLike = async () => {
        const isLiked = isLikedByMe;
        const totalLikes = likesCount;
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        setIsLikedByMe(!isLikedByMe);
        const response = await likeSearvice.toggleLikeAsset({ assetId: video._id });
        if (response.status >= 400) {
            setLikesCount(totalLikes);
            setIsLikedByMe(isLiked);
        }
    }

    return (
        <div className=' mx-auto p-3 hover:bg-gray-600 bg-gray-700 w-full sm:w-[75%] my-4 rounded-lg lg:w-[65%] xl:w-[55%]'>
            <video
                controls={true}
                className='w-full h-auto transition-transform duration-300 ease-in-out cursor-pointer block rounded-lg'
                src={video.assetURL.replace("upload/", "upload/q_80/")}></video>
            <div className='w-full flex justify-between flex-nowrapn p-2'>
                <p className='text-lg font-semibold'>
                    {video.title}
                </p>
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
                        {likesCount}
                    </span>
                </div>

            </div>
        </div>
    )
})
