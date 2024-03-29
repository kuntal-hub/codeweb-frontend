import React, { useState, useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { assetService } from '../../apiServices/asset';
import AudioAssetCard from '../assetComponents/AudioAssetCard';
import "../../cssFiles/assetCards.css";

export default function Audios() {
    const dispatch = useDispatch();
    const [audios, setAudios] = useState([])
    const [resData, setResData] = useState(null);
    const [page, setPage] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingAudio, setPlayingAudio] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const audioEleRef = useRef(null);
    const totalDuration = audioEleRef.current ? isNaN(audioEleRef.current.duration)?0:Math.floor(audioEleRef.current.duration) : 0;
    let currentMinutes, currentSeconds;
    let totalMinutes, totalSeconds;
    currentMinutes = Math.floor(currentTime / 60);
    currentSeconds = currentTime - (currentMinutes * 60);
    totalMinutes = Math.floor(totalDuration / 60);
    totalSeconds = totalDuration - (totalMinutes * 60);

    const getPublicAudios = async (page) => {
        const limit = 20;
        const response = await assetService.getAllPublicAssets({ assetType: "audio", page: page, limit })
        if (response.status < 400 && response.data) {
            setResData(response.data)
            if (page === 1) {
                setAudios(response.data.docs)
            } else {
                setAudios([...audios, ...response.data.docs])
            }
            setPage(page)
        } else {
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }


    const togglePlay = () => {
        if (isPlaying) {
            audioEleRef.current.pause()
            setIsPlaying(false)
        } else {
            audioEleRef.current.play();
            setIsPlaying(true)
        }
    }

    const playPriv = () => {
        if (!playingAudio || playingAudio.index === 0) return;
        audioEleRef.current.pause();
        audioEleRef.current.src = audios[playingAudio.index - 1].assetURL;
        audioEleRef.current.play();
        const audio = audios[playingAudio.index - 1]
        audio.index = playingAudio.index - 1
        setPlayingAudio(audio);
    }

    const playNext = () => {
        if (!playingAudio || playingAudio.index === audios.length - 1) return;
        audioEleRef.current.pause();
        audioEleRef.current.src = audios[playingAudio.index + 1].assetURL;
        audioEleRef.current.play();
        const audio = audios[playingAudio.index + 1]
        audio.index = playingAudio.index + 1;
        setPlayingAudio(audio);
    }

    useEffect(() => {
        getPublicAudios(1)
    }, [])


    return (
        <div className='w-full h-full-50px rounded-b-lg px-2 text-white relative'>
            {
                resData ? audios.length > 0 ?
                    <InfiniteScroll
                        dataLength={audios.length}
                        next={() => getPublicAudios(page + 1)}
                        height={window.innerHeight - 112}
                        hasMore={resData.hasNextPage}
                        loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
                        endMessage={
                            <p className='w-full text-center font-semibold my-4'>No More Data</p>
                        }
                    >

                        {
                            audios.map((audio, index) => {
                                audio.index = index;
                                return <AudioAssetCard
                                    key={index}
                                    audio={audio}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    playingAudio={playingAudio}
                                    setPlayingAudio={setPlayingAudio}
                                    audioEleRef={audioEleRef}
                                    copyOnly = {true} />
                            })
                        }


                    </InfiniteScroll> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Audios Found</h1> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
            }

            {
                playingAudio &&
                <div className='absolute bottom-0 left-0 w-full'>
                    <div className='bg-gray-950 px-5 sm:px-8 md:px-16 mx-auto'>
                        <div className='w-full'>
                            <div className='w-full flex flex-nowrap justify-between'>
                                <span className='text-[12px]'>{currentMinutes}:{currentSeconds}</span>
                                <span className='text-[12px]'>{totalMinutes}:{totalSeconds}</span>
                            </div>
                            <input type="range" className='w-full'
                                value={(currentTime / totalDuration) * 100}
                                onChange={(e) => {
                                    audioEleRef.current.currentTime = (e.target.value / 100) * totalDuration
                                }}
                            />
                        </div>

                        <div className='w-full flex flex-nowrap justify-center text-white pb-2'>
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
                </div>
            }

            <audio src="" ref={audioEleRef} className='hidden'
                onTimeUpdate={(e) => {
                    setCurrentTime(Math.floor(e.target.currentTime))
                    if (e.target.currentTime === e.target.duration) {
                        playNext();
                    }
                }}
            ></audio>
        </div>
    )
}
