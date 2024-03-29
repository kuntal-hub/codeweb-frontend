import React, { memo, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useForm } from "react-hook-form"
import { addNotification } from '../../store/notificationSlice'
import { collectionService } from '../../apiServices/collection'
import Input from '../utilComponents/Input'
import {resetYourWorkCollections} from "../../store/yourWorkSlice"

export default memo(function DeleteCollection({collectionId,showDeleteCollectionComponent,setShowDeleteCollectionCoponent}) {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const handleOutsideClick = (event) => {
    if (showDeleteCollectionComponent && !event.target.closest('.menu-container')) {
      setShowDeleteCollectionCoponent(false);
    }
  };

// Adding event listener for clicks outside menu
useEffect(() => {
document.addEventListener('mousedown', handleOutsideClick);
return () => {
  document.removeEventListener('mousedown', handleOutsideClick);
};
}, []);

  const onSubmit = async (data) => {
    const confermation = confirm('Are you sure you want to delete This Web? This cannot be undone.');
    if (!confermation) return;

    if (data.text !== 'Delete My Collection') {
      return dispatch(addNotification({type: 'error', text: 'Please type "Delete My Web" to confirm'}))
    }

    const response = await collectionService.deleteCollection({collectionId})

    if (response.status < 400 && response.data) {
      dispatch(addNotification({type: 'success', text: 'Collection Deleted Successfully!'}))
      dispatch(resetYourWorkCollections());
      return window.history.back();
      //return navigate('../')
    } else {
      dispatch(addNotification({type: 'error', text: response.message}))
    }
  }

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-30 grid place-content-center half_transparent'>
      <div className=' border-red-600 border-8 rounded-lg p-4 bg-black w-[90vw] sm:w-[80vw] md:w-[65vw] lg:w-[50vw] menu-container'>
        <h1 className='text-3xl font-bold font-mono'>MEGA Warning!</h1>
        <p className='mb-3'>
          You are going to delete absolutely everything you've ever done in This Collection.
        </p>
        <p className='mb-3'>
          This cannot be undone. Export anything you want to keep first.
        </p>
        <p className='mb-4'>
          If you're sure, type <strong>Delete My Collection</strong> to confirm.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type='text' placeholder='Type Here...'
            required={true}
            {...register("text", { required: true })}
          />
            <button type='submit'
              className='bg-red-600 rounded-lg py-3 float-left px-5 text-white font-semibold hover:bg-red-500 mt-6 mb-3'
            >Delete My Collection
            </button>
        </form>
            <button onClick={() => setShowDeleteCollectionCoponent(false)}
              className='bg-green-600 rounded-lg py-3 px-5 float-right font-semibold hover:bg-green-500 mt-6 mb-3'
            >Cancel</button>
      </div>
    </div>
  )
})