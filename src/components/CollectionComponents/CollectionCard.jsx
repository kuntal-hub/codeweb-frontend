import React,{useState,memo} from 'react'
import {collectionService} from "../../apiServices/collection"
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default memo(function CollectionCard({collection,webId}) {
    const [isAdded,setIsAdded] = useState(false);
    const dispatch = useDispatch();

    const addToCollection = async ()=>{
        const response = await collectionService.addWebToCollection({collectionId:collection._id,webId});
        if (response.status<400 && response.data) {
            setIsAdded(true);
            dispatch(addNotification({type:"success",text:"Web Added to Collection"}))
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    const removeFromCollection = async ()=>{
        const response = await collectionService.removeWebFromCollection({collectionId:collection._id,webId});
        if (response.status<400 && response.data) {
            setIsAdded(false);
            dispatch(addNotification({type:"success",text:"Web Removed from Collection"}))
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }
  return (
    <div className='w-full bg-gray-800 flex flex-nowrap justify-between py-1 px-4 rounded-full my-3'>
        <div className='w-[80%]'>
            <h1 className=' overflow-hidden h-6'>
                {collection.name}
            </h1>
            <p className='text-gray-400 text-[12px]'>
                {collection.websCount? collection.websCount:0} Webs
            </p>
        </div>
        {isAdded ?
        <button onClick={removeFromCollection}
        className='bg-red-500 hover:bg-red-600 rounded-md ml-1 h-8 px-2 font-semibold mt-1'>
            Remove
        </button>:
        <button onClick={addToCollection}
        className='bg-green-500 hover:bg-green-600 rounded-md ml-1 h-8 px-2 font-semibold mt-1'>
            Add
        </button>}
    </div>
  )
})
