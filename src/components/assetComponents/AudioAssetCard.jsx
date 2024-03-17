import React,{memo} from 'react'
import { Link } from 'react-router-dom'

export default memo(function AudioAssetCard({ audio, audioEleRef, isPlaying, setIsPlaying, setPlayingAudio, playingAudio }) {
    
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

    return (
        <button onClick={play}
            className='w-[90%] mx-auto flex flex-nowrap justify-between my-3 bg-gray-700 rounded-full py-2 px-4'>
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
            <span className="material-symbols-outlined block mt-4">
                {!isPlaying? "play_circle":playingAudio.assetURL === audio.assetURL? "pause_circle":"play_circle"}
            </span>
        </button>
    )
})
