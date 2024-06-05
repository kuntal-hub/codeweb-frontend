import React,{useEffect,useState} from 'react'
import MainContainer from '../components/MainContainer'
import { webService } from '../apiServices/web'
import ExplorePeopleCard from '../components/userComponents/ExplorePeopleCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExploreProfileLoadingCard from '../components/userComponents/ExploreProfileLoadingCard'

export default function ExplorePeople() {
    const [profiles, setProfiles] = useState([])
    const [resData, setResData] = useState(null)
    const [page, setPage] = useState(1)

    const getProfiles = async (page) => {
        const limit = 10;
        const response = await webService.showRecomendedPeople({page,limit})
        if (response.status < 400 && response.data) {
            setResData(response.data)
            if (page === 1) {
                setProfiles(response.data.docs)
            } else {
                setProfiles([...profiles, ...response.data.docs])
            }
            setPage(page)
        } else {

        }
    }

    useEffect(() => {
        getProfiles(1)
    }, [])

  return (
    <MainContainer>
        <div className='bg-gray-950 w-full h-full'>
            <div className='w-full border-b-2 border-b-green-600 px-3 pt-3 pb-1'>
                    <h1 className='text-white text-xl font-semibold px-3 w-auto'>
                        Explore People</h1>
            </div>

            <div className='w-full bg-gray-950'>
            {
        resData ? profiles.length > 0 ?
          <InfiniteScroll
            scrollableTarget='scrollableDiv'
            dataLength={profiles.length}
            next={() => getProfiles(page + 1)}
            height={window.innerHeight - 110}
            hasMore={resData.hasNextPage}
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
        </div>
    </MainContainer>
  )
}
