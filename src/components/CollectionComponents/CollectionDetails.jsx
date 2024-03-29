import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default function CollectionDetails({collection,showDetails,setShowDetails}) {
    const dispatch = useDispatch();
    const createDate = new Date(collection.createdAt).toDateString();
    const updateDate = new Date(collection.updatedAt).toDateString();

    const handleOutsideClick = (event) => {
        if (showDetails && !event.target.closest('.menu-container')) {
          setShowDetails(false);
        }
      };

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
    return (
        <>
        <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-30 block py-20 overflow-y-auto'>
            <div className='GB-cointainer p-1 menu-container block mx-auto w-[94%] sm:w-[84%] md:w-[74%] lg:w-[64%] xl:w-[54%]'>
                <div className='bg-gray-950 text-white w-full rounded-md pb-2 text-sm'>
                    <div className='flex flex-wrap justify-between px-3 pt-3'>
                        <div className='w-full md:w-[49%]'>
                            <h2 className='text-white font-bold text-lg sm:text-xl'>
                                {collection.name}
                            </h2>
                            <p className='text-gray-300 mt-2 text-[13px]'>
                                {collection.description}
                            </p>
                        </div>
                        <div className='w-full md:w-[49%] my-3'>
                            <button onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                dispatch(addNotification({ type: "success", text: "Link Copied" }))
                            }}
                            className='flex flex-nowrap justify-center bg-gray-700 hover:bg-gray-600 rounded-md py-1 px-3 mx-auto'>
                                <span className="material-symbols-outlined">link</span>
                                <span className=' hover:underline text-[14px] ml-1 font-medium'>Copy Link</span>
                            </button>
                            <div className='w-full flex flex-nowrap justify-between p-3'>
                                <div className='w-[49%] flex flex-col'>
                                    <span className=' font-medium text-[15px]'>Created At</span>
                                    <span className='text-[13px] text-gray-400 font-medium'>{createDate}</span>
                                </div>
                                <div className='w-[49%] flex flex-col'>
                                    <span className=' font-medium text-[15px]'>Updated At</span>
                                    <span className='text-[13px] text-gray-400 font-medium'>{updateDate}</span>
                                </div>
                            </div>
                            <p className='w-full flex flex-nowrap justify-center py-3'>
                                <span className="material-symbols-outlined">favorite</span>
                                <span className='font-medium ml-2'>{collection.likesCount} Loves</span>
                            </p>
                            <p className='w-full flex flex-nowrap justify-center py-3'>
                                <span className="material-symbols-outlined">visibility</span>
                                <span className='font-medium ml-2'>{collection.views} Views</span>
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className='material-symbols-outlined fixed top-1 right-1 text-white z-30 bg-slate-800 rounded-md border border-white'>
        close
    </button>
        </>
    )
}
