import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoAssetCard from './VideoAssetCard';

export default function ShowMyVideoAssets({ videos, videoCurrentPage, videoResData, getVideoAssets }) {
    return (
        <div className='w-full py-1'>
            {
                videoResData ? videos.length > 0 ?
                    <InfiniteScroll
                        dataLength={videos.length}
                        next={() => getVideoAssets(videoCurrentPage + 1)}
                        height={window.innerWidth < 1024 ? window.innerHeight - 166 : window.innerHeight - 112}
                        hasMore={videoResData.hasNextPage}
                        loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
                        endMessage={
                            <p className='w-full text-center font-semibold my-4'>No More Data</p>
                        }
                    >

                        {
                            videos.map((video, index) => (
                                <VideoAssetCard key={index} video={video} />
                            ))
                        }

                    </InfiniteScroll> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Videos Found</h1> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
            }
        </div>
    )
}
