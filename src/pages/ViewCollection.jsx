import React, { useEffect, useState } from 'react'
import { Outlet, useParams, Link, useNavigate } from 'react-router-dom'
import MainContainer from '../components/MainContainer'
import { collectionService } from '../apiServices/collection';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../store/notificationSlice';
import { followerSearvice } from '../apiServices/follower';
import { likeSearvice } from '../apiServices/like';
import WebCard from '../components/webComponents/WebCard';
import WebLoadingCard from '../components/webComponents/WebLoadingCard';
import InfiniteScroll from 'react-infinite-scroll-component'
import { savedCollectionService } from '../apiServices/savedCollection';
import UpdateCollection from '../components/CollectionComponents/UpdateCollection';
import DeleteCollection from '../components/CollectionComponents/DeleteCollection';
import CollectionDetails from '../components/CollectionComponents/CollectionDetails';

export default function ViewCollection() {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState(null);
    const [webs, setWebs] = useState([]);
    const [resData, setResData] = useState(null);
    const [page, setPage] = useState(1);
    const [showUpdateCollection, setShowUpdateCollection] = useState(false);
    const [showDeleteCollectionComponent, setShowDeleteCollectionCoponent] = useState(false);
    const [showDetails,setShowDetails] = useState(false)
    const user = useSelector((state) => state.auth.userData)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCollectionWebs = async (page) => {
        const limit = 8;
        const response = await collectionService.getCollectionWebss({ collectionId, page, limit });
        if (response.status < 400 && response.data) {
            setResData(response.data);
            if (page === 1) {
                setWebs(response.data.docs);
            } else {
                setWebs([...webs, ...response.data.docs]);
            }
            setPage(page);
        } else {
            dispatch(addNotification({ text: response.message, type: 'error' }));
        }
    }


    const toggleFollow = async () => {
        const isFollow = collection?.owner.isFollowedByMe;
        const followersCount = collection?.owner.followersCount;
        setCollection((prev) => {
            return {
                ...prev,
                owner: {
                    ...prev.owner,
                    isFollowedByMe: !isFollow,
                    followersCount: isFollow ? followersCount - 1 : followersCount + 1
                }
            }
        })
        const response = await followerSearvice.toggleFollow({ username: collection.owner.username })
        if (response.status >= 400) {
            setCollection((prev) => {
                return {
                    ...prev,
                    owner: {
                        ...prev.owner,
                        isFollowedByMe: isFollow,
                        followersCount: followersCount
                    }
                }
            })
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const toggleLike = async () => {
        const isLiked = collection?.isLikedByMe;
        const likesCount = collection?.likesCount;
        setCollection((prev) => { return { ...prev, isLikedByMe: !isLiked, likesCount: isLiked ? likesCount - 1 : likesCount + 1 } })
        const response = await likeSearvice.toggleLikeCollection({ collectionId })
        if (response.status >= 400) {
            setCollection((prev) => { return { ...prev, isLikedByMe: isLiked, likesCount: likesCount } })
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const toggleSaved = async () => {
        if (!user) return alert("Please login to save");
        const response = await savedCollectionService.toggleSavedCollection({ collectionId: collection._id });
        if (response.status < 400 && response.data) {
            dispatch(addNotification({ type: "success", text: collection.isSaved ? "Collection Unsaved" : "Collection Saved" }));
            setCollection((prev) => { return { ...prev, isSaved: !collection.isSaved } })
        } else {
            dispatch(addNotification({ type: "error", text: response.message }));
        }
    }

    useEffect(() => {
        collectionService.getCollection({ collectionId })
            .then((res) => {
                if (res.status < 400 && res.data) {
                    setCollection(res.data)
                    getCollectionWebs(1)
                        .then(() => {
                            collectionService.incresaseViewCount({ collectionId })
                        })
                } else {
                    return navigate('/404');
                }
            })
    }, [collectionId]);


    return (
        <MainContainer>
            <div className='w-full h-full bg-gray-950 text-white px-2 pt-2 sm:px-4 md:px-6 xl:px-8 overflow-y-auto'>

                {collection &&
                    <div className='w-full p-2 bg-gray-800 rounded-t-md flex flex-wrap min-[500px]:flex-nowrap justify-between'>

                        <div className='flex flex-wrap justify-start'>
                            <Link to={`/${collection.owner.username}`}>
                                <img src={collection.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_40/")}
                                    alt="avatar"
                                    className='w-10 h-10 rounded-md' />
                            </Link>
                            <div className='mx-2'>
                                <button onClick={()=>setShowDetails(true)}
                                className='text-lg block font-bold md:text-[20px] leading-3' >
                                    {collection.name}
                                </button>
                                <div className='flex flex-nowrap justify-start mt-2'>
                                    <Link className='text-[11px] text-gray-400 block leading-5' to={`/${collection.owner.username}`}>
                                        {collection.owner.username}
                                    </Link>
                                    {user && user._id !== collection.owner._id &&
                                        <button onClick={toggleFollow}
                                            className={`${collection.owner.isFollowedByMe ? "border bg-gray-700 hover:bg-gray-800 text-white" : "bg-green-600 hover:bg-green-500"} py-[1px]
             rounded-md px-1 text-[12px] ml-1 font-semibold`}>
                                            {collection.owner.isFollowedByMe ? "Following" : "+Follow"}
                                        </button>}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-nowrap justify-end'>
                            {user && <>
                                <button onClick={toggleLike}
                                    title={collection.isLikedByMe ? "Unlike" : "Like"}
                                    className='leading-3 bg-gray-600 rounded-md p-2 hover:scale-110 hover:bg-gray-900
     transition-all duration-700 ease-in-out h-full'
                                >
                                    {
                                        collection.isLikedByMe ?
                                            <img alt='like'
                                                className='w-6 m-0 h-6 leading-3'
                                                src='https://res.cloudinary.com/dvrpvl53d/image/upload/q_40/v1709992461/8294893_n5a1la.png' />
                                            : <span
                                                className='material-symbols-outlined leading-3 scale-110'>
                                                favorite
                                            </span>
                                    }
                                </button>

                                <div className='flex flex-col justify-center hoverableEle'>
                                    <button
                                        className='material-symbols-outlined leading-3 bg-gray-600 rounded-md h-full p-2 hover:scale-110
           hover:bg-gray-900 transition-all duration-300 ease-in-out mx-1 md:mx-2'>
                                        more_horiz</button>
                                    <div className='showingEle right-3 top-10 rounded-md bg-gray-700'>
                                        <button onClick={()=>setShowDetails(true)}
                                            className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-600 rounded-b-md w-[160px] hover:rounded-md'>
                                            <span className="material-symbols-outlined scale-75">description</span>
                                            <span className='block mt-[2px]'>Description</span>
                                        </button>
                                        <button onClick={toggleSaved}
                                            className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-600 rounded-b-md w-[160px] hover:rounded-md'>
                                            <span className="material-symbols-outlined scale-75">{!collection.isSaved ? "library_add" : "remove_circle"}</span>
                                            <span className='block mt-[2px]'>{!collection.isSaved ? "Save Collection" : "unsave Collection"}</span>
                                        </button>
                                        {user && user._id === collection.owner._id && <>
                                            <button onClick={() => setShowUpdateCollection(true)}
                                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-white hover:bg-gray-800 rounded-b-md w-[160px] hover:rounded-md leading-3'>
                                                <span className="material-symbols-outlined scale-75">edit</span>
                                                <span className='block mt-1'>Edit Collection</span>
                                            </button>
                                            <button onClick={() => setShowDeleteCollectionCoponent(true)}
                                                className='flex flex-nowrap justify-center text-[11px] font-semibold py-1 px-1 text-red-500 hover:bg-gray-800 rounded-b-md w-[160px] hover:rounded-md leading-3'>
                                                <span className="material-symbols-outlined scale-75">delete</span>
                                                <span className='block mt-1'>Delete Collection</span>
                                            </button>
                                        </>}
                                    </div>
                                </div>
                            </>}

                        </div>

                    </div>}

                <div className='w-full bg-gray-950 m-0 p-0'>

                    {
                        resData ? webs.length > 0 ?
                            <InfiniteScroll
                                dataLength={webs.length}
                                next={() => getCollectionWebs(page + 1)}
                                height={window.innerHeight - 130}
                                hasMore={resData.hasNextPage}
                                loader={
                                    <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                                        <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                            <WebLoadingCard />
                                        </div>
                                        <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                            <WebLoadingCard />
                                        </div>
                                        <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                            <WebLoadingCard />
                                        </div>
                                        <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                            <WebLoadingCard />
                                        </div>
                                        <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                            <WebLoadingCard />
                                        </div>
                                        <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                            <WebLoadingCard />
                                        </div>
                                    </div>
                                }
                                endMessage={
                                    <p className='w-full text-center font-semibold my-4'>No More Data</p>
                                }
                            >
                                <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                                    {
                                        webs.map((web, index) => {
                                            return (
                                                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'
                                                    key={web._id}>
                                                    <WebCard web={web} />
                                                </div>)
                                        })
                                    }
                                </div>

                            </InfiniteScroll> :
                            <h1 className='text-center font-bold text-2xl text-white mt-32'>Your Collection Is Empty.</h1> :
                            <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                    <WebLoadingCard />
                                </div>
                                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                    <WebLoadingCard />
                                </div>
                                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                    <WebLoadingCard />
                                </div>
                                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                    <WebLoadingCard />
                                </div>
                                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                    <WebLoadingCard />
                                </div>
                                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                                    <WebLoadingCard />
                                </div>
                            </div>
                    }
                </div>
                {showUpdateCollection &&
                    <UpdateCollection
                        collection={collection}
                        setShowUpdateCollection={setShowUpdateCollection}
                        showUpdateCollection={showUpdateCollection}
                        setCollection={setCollection} />}
                {showDeleteCollectionComponent &&
                    <DeleteCollection
                        collectionId={collectionId}
                        showDeleteCollectionComponent={showDeleteCollectionComponent}
                        setShowDeleteCollectionCoponent={setShowDeleteCollectionCoponent} />}
                {showDetails && 
                <CollectionDetails
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                collection={collection} />}
            </div>
            <Outlet />
        </MainContainer>
    )
}
