import React,{useState,useRef} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import AudioAssetCard from './AudioAssetCard';
import AudioPlayer from './AudioPlayer';

export default function ShowMyAudioAssets({getAudioAssets,audios,audioResData,audioCurrentPage}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingAudio,setPlayingAudio] = useState(null);
    const [showaudioDeatil,setShowaudioDetails] = useState(false);
    const [currentTime,setCurrentTime] = useState(0);
    const audioEleRef = useRef(null);

    const togglePlay = ()=>{
        if (isPlaying) {
            audioEleRef.current.pause()
            setIsPlaying(false)
        } else {
            audioEleRef.current.play();
            setIsPlaying(true)
        }
    }

    const playPriv = ()=>{
        if(!playingAudio || playingAudio.index === 0) return;
        audioEleRef.current.pause();
        audioEleRef.current.src = audios[playingAudio.index -1].assetURL;
        audioEleRef.current.play();
        const audio = audios[playingAudio.index -1]
        audio.index = playingAudio.index -1
        setPlayingAudio(audio);
    }

    const playNext = ()=>{
        if(!playingAudio || playingAudio.index === audios.length-1) return;
        audioEleRef.current.pause();
        audioEleRef.current.src = audios[playingAudio.index + 1].assetURL;
        audioEleRef.current.play();
        const audio = audios[playingAudio.index + 1]
        audio.index = playingAudio.index + 1;
        setPlayingAudio(audio);
    }

  return (
    <div className='w-full py-1'>
        {
            audioResData ? audios.length > 0 ?
            <InfiniteScroll
            dataLength={audios.length}
            next={()=>getAudioAssets(audioCurrentPage+1)}
            height={window.innerWidth<1024 ? window.innerHeight-166 : window.innerHeight-112}
            hasMore={audioResData.hasNextPage}
            loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
            >
        
                    {
                        audios.map((audio,index)=>{
                            audio.index = index;
                            return <AudioAssetCard 
                            key={index} 
                            audio={audio}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            playingAudio={playingAudio}
                            setPlayingAudio={setPlayingAudio}
                            audioEleRef={audioEleRef}
                            getPublicAssets={getAudioAssets} />
                        })
                    }
                
    
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Audios Found</h1> :
            <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
        }

{
            playingAudio && 
            <div className='audioElement bg-gray-600 rounded-full'>
                <button onClick={()=>setShowaudioDetails(true)}
                className='w-full block text-center font-semibold py-1'>
                    {playingAudio.title}
                </button>
                <div className='w-full flex flex-nowrap justify-center text-white pb-2'>
                    <button onClick={playPriv}
                    className='material-symbols-outlined hover:scale-125 transition-transform duration-300 ease-in-out mx-2'>
                        skip_previous
                    </button>
                    <button onClick={togglePlay} 
                    className='material-symbols-outlined hover:scale-125 transition-transform duration-300 ease-in-out mx-2'>
                    {!isPlaying? "play_circle":"pause_circle"}
                    </button>
                    <button  onClick={playNext}
                    className='material-symbols-outlined hover:scale-125 transition-transform duration-300 ease-in-out mx-2'>
                        skip_next
                    </button>
                </div>
            </div>
        }
        {
            showaudioDeatil && 
            <AudioPlayer
            showaudioDeatil={showaudioDeatil}
            setShowaudioDetails={setShowaudioDetails}
            audio={playingAudio}
            togglePlay={togglePlay}
            playPriv={playPriv}
            playNext={playNext}
            totalDuration={isNaN(audioEleRef.current.duration)?0:Math.floor(audioEleRef.current.duration)}
            currentTime={currentTime}
            isPlaying={isPlaying}
            audioEleRef={audioEleRef}
            />
        }
        <audio src="" ref={audioEleRef} className='hidden'
        onTimeUpdate={(e)=>{
            if (showaudioDeatil) {
                setCurrentTime(Math.floor(e.target.currentTime))
            }
            if (e.target.currentTime === e.target.duration) {
                playNext();
            }
        }}
        ></audio>
    </div>
  )
}
