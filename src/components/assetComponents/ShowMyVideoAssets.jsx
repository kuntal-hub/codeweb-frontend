import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoAssetCard from './VideoAssetCard';

export default function ShowMyVideoAssets({ 
    videos, 
    videoCurrentPage, 
    videoResData, 
    getVideoAssets,
    copyOnly=false,
    height,
 }) {
    const infiniteScrollHeight = window.innerWidth < 1024 ? window.innerHeight - 166 : window.innerHeight - 112
    return (
        <div className='w-full py-1 text-white'>
            {
                videoResData ? videos.length > 0 ?
                    <InfiniteScroll
                        scrollableTarget='scrollableDiv'
                        dataLength={videos.length}
                        next={() => getVideoAssets(videoCurrentPage + 1)}
                        height={height ? height : infiniteScrollHeight}
                        hasMore={videoResData.hasNextPage}
                        loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
                        endMessage={
                            <p className='w-full text-center font-semibold my-4'>No More Data</p>
                        }
                    >

                        {
                            videos.map((video, index) => (
                                <VideoAssetCard key={index} video={video} copyOnly={copyOnly} getPublicAssets={getVideoAssets} />
                            ))
                        }

                    </InfiniteScroll> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Videos Found</h1> :
                    <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
            }
        </div>
    )
}
