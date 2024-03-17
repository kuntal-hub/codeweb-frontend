import React,{useState,useEffect,useRef} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { assetService } from '../apiServices/asset';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';
import CreateAudioAsset from '../components/assetComponents/CreateAudioAsset';
import AudioAssetCard from '../components/assetComponents/AudioAssetCard';
import AudioPlayer from '../components/assetComponents/AudioPlayer';

export default function AudioAssets() {
    const [audios, setAudios] = useState([])
    const [isCreateAudioAssetRendering, setIsCreateAudioAssetRendering] = useState(false)
    const [resData, setResData] = useState(null);
    const [page, setPage] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingAudio,setPlayingAudio] = useState(null);
    const [showaudioDeatil,setShowaudioDetails] = useState(false);
    const [currentTime,setCurrentTime] = useState(0);
    const audioEleRef = useRef(null);
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlParams = new URLSearchParams(window.location.search);
    document.title = "codeweb - Video Assets"

    const getPublicAssets = async (page) => {
        const limit = 20;
        if (!urlParams.has('query') || urlParams.get('query').trim() === "") {
            const response = await assetService.getAllPublicAssets({assetType:"audio",page:page,limit})
            if (response.status < 400 && response.data) {
                setResData(response.data)
                if (page === 1) {
                    setAudios(response.data.docs)
                } else {
                    setAudios([...audios,...response.data.docs])
                }
                setPage(page)
            } else{
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }else{
            const response = await assetService.searchFromPublicAssets({search:urlParams.get('query'),assetType:"audio",page:page,limit})
            if (response.status < 400 && response.data) {
                setResData(response.data)
                if (page === 1) {
                    setAudios(response.data.docs)
                } else {
                    setAudios([...audios,...response.data.docs])
                }
                setPage(page)
            } else{
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }
    }

    const search = (data) => {
        const search = data.search.trim().replaceAll(" ","+")
        if (data.search.trim() === "") {
            return navigate(`/assets/audios`)
        }
        navigate(`/assets/audios?query=${search}`)
    }

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

    useEffect(() => {
        getPublicAssets(1)
    }, [urlParams.get('query')])
    
  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
        <div className='px-2 md:px-4 flex flex-nowrap justify-between pt-2'>
            <div>
            <form onSubmit={handleSubmit(search)} className='flex flex-nowrap justify-start'>
                    <label
                    className='material-symbols-outlined text-white bg-gray-700 h-10 pt-2 px-3 rounded-l-full cursor-pointer'
                    htmlFor='searchAudioAssets'
                    >search</label>
                    <input 
                    type="search"
                    defaultValue={urlParams.get('query') ? urlParams.get('query') : "" }
                    id='searchAudioAssets'
                    placeholder='Search Audios'
                    {...register('search')}
                    className='h-10 py-1 px-3 bg-gray-700 text-white font-semibold rounded-r-full sm:w-96 lg:w-[450px]'
                    />
                </form>
            </div>
            <button onClick={()=>setIsCreateAudioAssetRendering(true)}
            className=' bg-green-600 hover:bg-green-600 font-semibold py-2 px-5 rounded-lg'>
                Create
            </button>
        </div>
        {
            resData ? audios.length > 0 ?
            <InfiniteScroll
            dataLength={audios.length}
            next={()=>getPublicAssets(page+1)}
            height={window.innerWidth<1024 ? window.innerHeight-166 : window.innerHeight-112}
            hasMore={resData.hasNextPage}
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
                            audioEleRef={audioEleRef} />
                        })
                    }
                
    
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Audios Found</h1> :
            <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
        }
        {
            isCreateAudioAssetRendering && <CreateAudioAsset 
            setAudios={setAudios} 
            setIsCreateAudioAssetRendering={setIsCreateAudioAssetRendering}
            isCreateAudioAssetRendering={isCreateAudioAssetRendering} />
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
