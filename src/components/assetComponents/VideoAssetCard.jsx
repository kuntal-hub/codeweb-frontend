import React, { useState, memo } from 'react'
import { likeSearvice } from '../../apiServices/like';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { assetService } from '../../apiServices/asset';
import UpdateAsset from './UpdateAsset';

export default memo(function VideoAssetCard({ video, copyOnly = false, getPublicAssets }) {
    const [isLikedByMe, setIsLikedByMe] = useState(video.isLikedByMe);
    const [likesCount, setLikesCount] = useState(video.likesCount);
    const [showUpdateAsset, setShowUpdateAsset] = useState(false);
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

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

    const copyToClipBord = () => {
        window.navigator.clipboard.writeText(video.assetURL)
        dispatch(addNotification({ text: "URL coppid Succesfully!", type: "success" }))
    }

    const deleteAsset = async () => {
        if (copyOnly) return;
        if (!window.confirm("Are you sure you want to delete this asset?")) return
        const response = await assetService.deleteAssetById({ assetId: video._id })
        if (response.status < 400 && response.data) {
            dispatch(addNotification({ text: "Asset Deleted Succesfully!", type: "success" }))
            if (getPublicAssets) {
                getPublicAssets(1)
            } else {
                window.location.reload()
            }
        }
    }

    return (
        <div className=' mx-auto p-3 hover:bg-gray-600 bg-gray-700 w-full sm:w-[75%] my-4 rounded-lg lg:w-[65%] xl:w-[55%]'>
            <div className='m-0 p-0 hovarable relative'>
                <video
                    controls={true}
                    className='w-full h-auto transition-transform duration-300 ease-in-out cursor-pointer block rounded-lg'
                    src={video.assetURL.replace("upload/", "upload/q_80/")}></video>
                <button onClick={copyToClipBord} title='Copy URL'
                    className='material-symbols-outlined hidden absolute top-2 right-2 text-3xl text-white copyBtn bg-gray-700 p-2 rounded-md'
                >
                    content_copy
                </button>
                {
                    !copyOnly && user && user._id === video.owner._id &&
                    <button title='Edit Asset' onClick={() => setShowUpdateAsset(true)}
                        className='material-symbols-outlined hidden absolute top-10 scale-50 hover:scale-75 right-2 text-3xl 
         text-white copyBtn bg-gray-700 p-2 rounded-md'
                    >
                        edit
                    </button>
                }
                {
                    !copyOnly && user && user._id === video.owner._id &&
                    <button title='Delete Asset' onClick={deleteAsset}
                        className='material-symbols-outlined hidden absolute top-[68px] scale-50 hover:scale-75 right-2
         text-3xl bg-gray-700 p-2 rounded-md text-white copyBtn'
                    >
                        delete
                    </button>
                }
            </div>
            <div className='w-full flex justify-between flex-nowrapn p-2'>
                <div className=' flex flex-col'>
                    <p className='text-md sm:text-lg font-semibold text-left ml-1 mb-1'>
                        {video.title}
                    </p>
                    <div className='flex flex-nowrap justify-start'>
                        <Link to={`/${video.owner.username}`}>
                            <img src={video.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_32/")} alt="LOGO"
                                className='h-8 w-[32px!important] rounded-full'
                            />
                        </Link>
                        <Link to={`/${video.owner.username}`} className='text-[13px] mt-1 text-gray-400 ml-2'>
                            {video.owner.fullName}
                        </Link>
                    </div>
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
                    <span className='ml-2 block mt-6'>
                        {likesCount}
                    </span>
                </div>

            </div>
            {showUpdateAsset && !copyOnly &&
                <UpdateAsset 
                showUpdateAsset={showUpdateAsset} 
                setShowUpdateAsset={setShowUpdateAsset} 
                asset={video} 
                getPublicAssets={getPublicAssets} />}
        </div>
    )
})
