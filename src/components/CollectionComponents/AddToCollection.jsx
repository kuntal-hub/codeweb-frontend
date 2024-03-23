import React,{useState,useEffect} from 'react'
import { collectionService } from "../../apiServices/collection"
import { useSelector,useDispatch } from 'react-redux'
import { addNotification } from '../../store/notificationSlice'
import { useForm } from "react-hook-form"
import InfiniteScroll from 'react-infinite-scroll-component'
import CollectionCard from './CollectionCard'

export default function AddToCollection({showAddToCollection,setShowAddToCollection,webId}) {
    const [collections,setCollections] = useState([]);
    const [resData,setResData] = useState(null);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState('');
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const handleOutsideClick = (event) => {
        if (showAddToCollection && !event.target.closest('.menu-container')) {
          setShowAddToCollection(false);
        }
      };

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const getCollections = async (page)=>{
    const limit = 8;
    const response = await collectionService.getCollectionsCreatedByMe({queryParameters:`page=${page}&limit=${limit}`});
    if (response.status<400 && response.data) {
        setResData(response.data);
        if (page === 1) {
            setCollections(response.data.docs);
        } else {
            setCollections([...collections,...response.data.docs]);
        }
        setPage(page);
    } else {
        dispatch(addNotification({type:"error",text:response.message}))
    }
  }

  const searchCollections = async (page)=>{
    const limit = 8;
    const response = await collectionService.searchFromMyCollections({page,limit,search:search.trim()});
    if (response.status<400 && response.data) {
        setResData(response.data);
        if (page === 1) {
            setCollections(response.data.docs);
        } else {
            setCollections([...collections,...response.data.docs]);
        }
        setPage(page);
    } else {
        dispatch(addNotification({type:"error",text:response.message}))
    }
  }

    const createCollection = async (data)=>{
        if (!user) return alert("Please login to create collection");
        if (!data.name.trim()) return alert("Collection name is required");
        const response = await collectionService.createCollection({name:data.name});
        if (response.status<400 && response.data) {
            dispatch(addNotification({type:"success",text:"Collection Created"}));
            setCollections([response.data,...collections]);
        } else {
            dispatch(addNotification({type:"error",text:response.message}));
        }
    }

    useEffect(() => {
        if (!search.trim()) {
            getCollections(1);
        } else {
            const timeoutId = setTimeout(() => {
                searchCollections(1);
            }, 800);
            return () => clearTimeout(timeoutId);
        }
    },[search]);

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-40 half_transparent py-[14vh] text-white'>
        <div className='mx-auto h-[70vh] menu-container GB-cointainer p-1 w-full block sm:w-[80%] md:w-[60%] lg:w-[50%]'>
            <div className='h-full w-full bg-gray-950 rounded-md p-2 relative'>
                <div className='w-full flex flex-nowrap justify-center'>
                    <label htmlFor="mhdnsghjdgbcshc" 
                    className='material-symbols-outlined bg-gray-800 p-1 rounded-l-md'
                    >
                        search
                    </label>
                    <input 
                    type="text" 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    id='mhdnsghjdgbcshc'
                    className='w-[90%] md:w-[80%] lg:w-[70%] bg-gray-800 text-white rounded-r-md p-1 pl-2 outline-none'
                    placeholder='Search Collection...'
                    />
                </div>

                <div className='w-full p-2'>
                {
                resData ? collections.length > 0 ?
                    <InfiniteScroll
                        dataLength={collections.length}
                        next={() => search.trim() ? searchCollections(page + 1) : getCollections(page + 1)}
                        height={window.innerHeight*(2.8/5)}
                        hasMore={resData.hasNextPage}
                        loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
                        endMessage={
                            <p className='w-full text-center font-semibold my-5'>No More Collections</p>
                        }
                    >

                        {
                            collections.map((collection, index) => {
                                return <CollectionCard
                                key={collection._id}
                                collection={collection}
                                webId={webId}
                                />
                            })
                        }


                    </InfiniteScroll> :
                    <h1 className='text-center font-bold text-xl text-white mt-14'>😵 No Audios Found</h1> :
                    <h1 className='text-center font-bold text-xl text-white mt-14'>Loading...</h1>
            }
                </div>

                <div className='w-full absolute bottom-0 left-0'>
                    <form className='w-full flex flex-nowrap justify-center px-2 sm:px-4 py-2' onSubmit={handleSubmit(createCollection)}>
                        <input type="text" 
                        required={true}
                        {...register("name",{required:true})}
                        className='w-[86%] bg-gray-800 text-white p-1 pl-2 mr-1 rounded-md outline-none'
                        placeholder='Collection Name'
                        />
                        <button type='submit' 
                        className='bg-blue-600 hover:bg-blue-500 text-white font-semibold p-1 rounded-md px-2'>Create</button>
                    </form>
                </div>
            </div>
        </div>
        <button className='material-symbols-outlined fixed top-1 right-1 text-white z-30 bg-slate-800 rounded-md border border-white'>
        close
    </button>
    </div>
  )
}
