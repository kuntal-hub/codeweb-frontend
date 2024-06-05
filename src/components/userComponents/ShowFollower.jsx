import React, { useEffect, useState } from 'react'
import FollowerCard from './FollowerCard'
import { followerSearvice } from '../../apiServices/follower';
import { useDispatch } from 'react-redux';
import {addNotification} from "../../store/notificationSlice";
import InfiniteScroll from 'react-infinite-scroll-component'

export default function ShowFollower({ username, setShowFollowerOrFollowing, showFollowerOrFollowing }) {

  const dispatch = useDispatch();
  const [followerResData, setFollowerResData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followerPage, setFollowerPage] = useState(1);
  const [followingresData, setFollowingResData] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [followingPage, setFollowingPage] = useState(1);


  const handleOutsideClick = (event) => {
    if (showFollowerOrFollowing && !event.target.closest('.menu-container')) {
      setShowFollowerOrFollowing("");
    }
  };

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const getFollowers = async (page) =>{
      const limit = 20;
      const response = await followerSearvice.getFollowers({username,page,limit});
      if (response.status < 400 && response.data) {
          setFollowerResData(response.data);
          if (page === 1) {
              setFollowers(response.data.docs);
          } else {
              setFollowers([...followers,...response.data.docs]);
          }
          setFollowerPage(page);
      } else {
          dispatch(addNotification({type:"error",text:response.message}))
      }
  }

  const getFollowings = async (page) =>{
      const limit = 20;
      const response = await followerSearvice.getFollowings({username,page,limit});
      if (response.status < 400 && response.data) {
          setFollowingResData(response.data);
          if (page === 1) {
              setFollowings(response.data.docs);
          } else {
              setFollowings([...followings,...response.data.docs]);
          }
          setFollowingPage(page);
      } else {
          dispatch(addNotification({type:"error",text:response.message}))
      }
  }

  useEffect(() => {
    if (showFollowerOrFollowing === "followers" && !followerResData) {
      getFollowers(1);
    } else if (showFollowerOrFollowing === "following" && !followingresData) {
      getFollowings(1);
    }
  },[showFollowerOrFollowing]);

  return (
    <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-20 grid place-content-center text-white'>
      <div className='GB-cointainer p-1 menu-container'>
        <div className='w-[90vw] h-[500px] bg-gray-950 rounded-md sm:w-[500px]'>
            <div className='border-b'>
              <button onClick={()=>setShowFollowerOrFollowing("followers")}
              className={`py-2 px-4 font-semibold 
              ${showFollowerOrFollowing === "followers" && "bg-gray-800 border-b-green-600 text-green-600 border-b"}`}>
                Followers
              </button>
              <button onClick={()=>setShowFollowerOrFollowing("following")}
              className={`py-2 px-4 font-semibold 
              ${showFollowerOrFollowing !== "followers" && "bg-gray-800 border-b-green-600 text-green-600 border-b"}`}>
                Followings
              </button>
            </div>
          {showFollowerOrFollowing === "followers" && 
            <div className='w-full h-[455px]'>
            {
                followerResData ? followers.length > 0 ?
                    <InfiniteScroll
                        scrollableTarget="scrollableDiv"
                        dataLength={followers.length}
                        next={() => getFollowers(followerPage + 1)}
                        height={455}
                        hasMore={followerResData.hasNextPage}
                        loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
                        endMessage={
                            <p className='w-full text-center font-semibold my-4'>No More Followers</p>
                        }
                    >

                        {
                            followers.map((follower, index) => (
                                <FollowerCard 
                                key={follower._id} 
                                setFollowers={setFollowers}
                                setFollowings={setFollowings}
                                follower={follower} />
                            ))
                        }

                    </InfiniteScroll> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>No Followers Found</h1> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
            }
            </div>}
          {showFollowerOrFollowing === "following" &&
            <div className='w-full h-[455px]'>
            {
                followingresData ? followings.length > 0 ?
                    <InfiniteScroll
                        scrollableTarget="scrollableDiv"
                        dataLength={followings.length}
                        next={() => getFollowings(followingPage + 1)}
                        height={455}
                        hasMore={followingresData.hasNextPage}
                        loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
                        endMessage={
                            <p className='w-full text-center font-semibold my-4'>No More Followings</p>
                        }
                    >

                        {
                            followings.map((following, index) => (
                                <FollowerCard 
                                setFollowers={setFollowers}
                                setFollowings={setFollowings}
                                key={following._id} 
                                follower={following} />
                            ))
                        }

                    </InfiniteScroll> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>No Followings Found</h1> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
            }
            </div>}


        </div>
      </div>
    </div>
  )
}
