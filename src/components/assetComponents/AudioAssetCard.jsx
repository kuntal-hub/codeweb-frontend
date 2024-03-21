import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { assetService } from '../../apiServices/asset';
import UpdateAsset from './UpdateAsset';

export default memo(function AudioAssetCard({ 
    audio, 
    audioEleRef, 
    isPlaying, 
    setIsPlaying, 
    setPlayingAudio, 
    playingAudio, 
    copyOnly = false,
    getPublicAssets, 
}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);
    const [showUpdateAsset, setShowUpdateAsset] = useState(false);

    const deleteAsset = async () => {
        if (copyOnly) return;
        if (!window.confirm("Are you sure you want to delete this asset?")) return
        const response = await assetService.deleteAssetById({ assetId: audio._id })
        if (response.status < 400 && response.data) {
            dispatch(addNotification({ text: "Asset Deleted Succesfully!", type: "success" }))
            if (getPublicAssets) {
                getPublicAssets(1)
            } else {
                window.location.reload()
            }
        }
    }

    const play = () => {
        if (isPlaying && audioEleRef.current.src === audio.assetURL) {
            audioEleRef.current.pause();
            setIsPlaying(false);
        } else if (isPlaying && audioEleRef.current.src !== audio.assetURL) {
            audioEleRef.current.pause();
            audioEleRef.current.src = audio.assetURL;
            audioEleRef.current.play();
            setPlayingAudio(audio)
        } else if (!isPlaying) {
            if (audioEleRef.current.src !== audio.assetURL) {
                audioEleRef.current.src = audio.assetURL;
            }
            audioEleRef.current.play();
            setIsPlaying(true);
            setPlayingAudio(audio)
        }
    }

    const copyToClipBord = () => {
        window.navigator.clipboard.writeText(audio.assetURL)
        dispatch(addNotification({ text: "URL coppid Succesfully!", type: "success" }))
    }

    return (
        <>
        <div
            className='w-[90%] mx-auto flex flex-nowrap justify-between my-3 hover:scale-95 cursor-pointer 
             transition-all ease-in-out duration-300 bg-gray-700 hover:bg-gray-600 rounded-full py-2 px-4'>
            <div className='m-0 p-0 w-[90%] flex flex-nowrap justify-between' onClick={play}>
                <div className=' flex flex-col'>
                    <p className='text-md sm:text-lg font-semibold text-left ml-3 mb-1'>
                        {audio.title}
                    </p>
                    <div className='flex flex-nowrap justify-start'>
                        <Link to={`/${audio.owner.username}`}>
                            <img src={audio.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_32/")} alt="LOGO"
                                className='h-8 w-[32px!important] rounded-full'
                            />
                        </Link>
                        <Link to={`/${audio.owner.username}`} className='text-[13px] mt-1 text-gray-400 ml-2'>
                            {audio.owner.fullName}
                        </Link>
                    </div>
                </div>
                {
                    isPlaying && playingAudio.assetURL === audio.assetURL &&
                    <img src={"https://res.cloudinary.com/dvrpvl53d/image/upload/v1710678648/music-sounds_1_fhcnqc.gif"}
                        className='w-[70px] md:w-[150px] h-[40px]'
                        alt="Playing" />
                }
                <p className='w-[1px]'></p>
            </div>
            {copyOnly ?
                <button onClick={copyToClipBord} title='Copy URL'
                    className='material-symbols-outlined block scale-95 hover:scale-125 transition-all ease-in-out duration-300'
                >
                    content_copy
                </button> 
                :
                <div className='flex flex-col justify-center hoverableEle'>
                    <button className='material-symbols-outlined'>more_vert</button>
                    <div className='showingEle right-5 rounded-md bg-gray-900'>
                        <button onClick={copyToClipBord} title='Copy URL'
                            className='flex flix-nowrap justify-center text-[12px] font-semibold py-1 px-3 text-white hover:bg-gray-800 rounded-t-md w-full'>
                            Copy
                        </button>
                        {
                            user && user._id === audio.owner._id && 
                            <>
                        <button onClick={()=>setShowUpdateAsset(true)} title='Edit Asset'
                            className='flex flix-nowrap justify-center text-[12px] font-semibold py-1 px-3 text-white hover:bg-gray-800  w-full'>
                            Edit
                        </button>
                        <button title='Delete Asset' onClick={deleteAsset}
                            className='flex flix-nowrap justify-center text-[10px] font-semibold py-1 px-3 text-white hover:bg-gray-800 rounded-b-md'>
                            Delete
                        </button>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
                {showUpdateAsset && !copyOnly &&
                <UpdateAsset 
                showUpdateAsset={showUpdateAsset} 
                setShowUpdateAsset={setShowUpdateAsset} 
                asset={audio} 
                getPublicAssets={getPublicAssets} />}
        </>
    )
})
