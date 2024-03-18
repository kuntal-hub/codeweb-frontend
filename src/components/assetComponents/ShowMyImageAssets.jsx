import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageAssetCard from './ImageAssetCard';

export default function ShowMyImageAssets({ imgCol1, imgCol2, imgCol3, imgCol4, imgCurrentPage, imageResData, getImageAssets}) {
  return (
    <div className='w-full py-1'>
        {
            imageResData ? (imgCol1.length + imgCol2.length + imgCol3.length + imgCol4.length) > 0 ?
            <InfiniteScroll
              dataLength={imgCol1.length + imgCol2.length + imgCol3.length + imgCol4.length}
              next={() => getImageAssets(imgCurrentPage + 1)}
              height={window.innerWidth < 1024 ? window.innerHeight - 166 : window.innerHeight - 112}
              hasMore={imageResData.hasNextPage}
              loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
              endMessage={
                <p className='w-full text-center font-semibold my-4'>No More Data</p>
              }
            >
              <div className="row">
                <div className="column">
                  {imgCol1.map((image, index) => <ImageAssetCard key={index} image={image} />)}
                </div>
                <div className="column">
                  {imgCol2.map((image, index) => <ImageAssetCard key={index} image={image} />)}
                </div>
                <div className="column">
                  {imgCol3.map((image, index) => <ImageAssetCard key={index} image={image} />)}
                </div>
                <div className="column">
                  {imgCol4.map((image, index) => <ImageAssetCard key={index} image={image} />)}
                </div>
              </div>
            </InfiniteScroll> :
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Images Found</h1> :
            <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
        }
    </div>
  )
}
