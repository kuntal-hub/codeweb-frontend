import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../store/notificationSlice'
import { setFollowings, setFollowingResData } from '../store/followingSlice'
import { webService } from '../apiServices/web'
import InfiniteScroll from 'react-infinite-scroll-component'
import WebCard from '../components/webComponents/WebCard'
import WebLoadingCard from '../components/webComponents/WebLoadingCard'

export default function Trending() {
  const dispatch = useDispatch();
  const followings = useSelector(state => state.following.followings);
  const followingResData = useSelector(state => state.following.followingResData);
  const [page, setPage] = useState(1);
  document.title = "Codeweb - Followings";

  const getFollowingWebs = async (page) => {
    const limit = 8;
    const response = await webService.getFollowingUsersWebs({ queryParameters: `page=${page}&limit=${limit}` });
    if (response.status < 400 && response.data) {
      dispatch(setFollowingResData(response.data))
      if (page === 1) {
        dispatch(setFollowings(response.data.docs));
      } else {
        dispatch(setFollowings([...followings, ...response.data.docs]));
      }
      setPage(page);
    } else {
      dispatch(addNotification({ type: "error", text: response.message }))
    }
  }

  useEffect(() => {
    if (!followingResData) {
      getFollowingWebs(1)
    } else {
      setPage(followingResData.page);
    }
  }, []);

  return (
    <div className='text-white w-full m-0 p-0 bg-gray-950'>
      {
        followingResData ? followings.length > 0 ?
          <InfiniteScroll
            dataLength={followings.length}
            next={() => getFollowingWebs(page + 1)}
            height={window.innerHeight - 110}
            hasMore={followingResData.hasNextPage}
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
                followings.map((web, index) => {
                  return (
                    <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'
                      key={web._id}>
                      <WebCard web={web} />
                    </div>)
                })
              }
            </div>

          </InfiniteScroll> :
          <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Result Found</h1> :
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
  )
}
