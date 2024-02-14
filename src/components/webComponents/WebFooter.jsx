import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { webService } from '../../apiServices/web';
import { useNavigate } from 'react-router-dom';

export default function WebFooter({web}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);
    const [isForkButtonDisabled, setIsForkButtonDisabled] = useState(false);

    const forkWeb = async () => {
        console.log(" forkWeb")
        if (!web) {
            return;
        }
        setIsForkButtonDisabled(true);
        const res = await webService.createForkWeb({webId:web?._id})
        if (res.status<400 && res.data) {
            dispatch(addNotification({type:"success",text:res.message}))
            navigate(`/web/${res.data._id}`)
        } else {
            dispatch(addNotification({type:"error",text:res.message}))
            setIsForkButtonDisabled(false)
        }
    }

  return (
    <div className='w-screen h-[25px] bg-gray-950 flex flex-nowrap overflow-auto justify-start px-1 fixed left-0 bottom-0 z-20'>
        {user && web && user.username !== web.owner.username && 
        <button disabled={isForkButtonDisabled}
        onClick={forkWeb}
        className='h-full text-white px-3 bg-gray-700 hover:bg-gray-600 mx-[2px]'>
            Fork
        </button>}
    </div>
  )
}
