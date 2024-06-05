import React,{useState,useEffect} from 'react'
import { authServices } from "../apiServices/auth"
import { useDispatch } from 'react-redux'
import { addNotification } from '../store/notificationSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExplorePeopleCard from './userComponents/ExplorePeopleCard'
import ExploreProfileLoadingCard from './userComponents/ExploreProfileLoadingCard'

export default function SearchUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();
    const [page,setPage] = useState(1);
    const [profiles,setProfiles] = useState([]);
    const [userResData,setUserResData] = useState(null);

    const getUsers = async (page)=>{
        const limit = 10;
        const response = await authServices.searchUsers({page,limit,search:urlParams.get('q')});
        if (response.status<400 && response.data) {
            setUserResData(response.data);
            if (page === 1) {
                setProfiles(response.data.docs);
            } else {
                setProfiles([...profiles,...response.data.docs]);
            }
            setPage(page);
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(() => {
        if (urlParams.get('q')) {
            getUsers(1);
        } else {
            setProfiles([]);
        }
    },[urlParams.get('q')]);

  return (
    <div className='text-white w-full m-0 p-0 bg-gray-950'>
         {
        userResData ? profiles.length > 0 ?
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={profiles.length}
            next={() => getUsers(page + 1)}
            height={window.innerHeight - 110}
            hasMore={userResData.hasNextPage}
            loader={
              <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ExploreProfileLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ExploreProfileLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ExploreProfileLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ExploreProfileLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ExploreProfileLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ExploreProfileLoadingCard />
                </div>
              </div>
            }
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
          >
            <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
              {
                profiles.map((profile, index) => {
                  return (
                    <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'
                      key={profile._id}>
                      <ExplorePeopleCard profile={profile} setProfiles={setProfiles} />
                    </div>)
                })
              }
            </div>

          </InfiniteScroll> :
          <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Result Found</h1> :
          <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ExploreProfileLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ExploreProfileLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ExploreProfileLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ExploreProfileLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ExploreProfileLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ExploreProfileLoadingCard />
            </div>
          </div>
      }
    </div>
  )
}
