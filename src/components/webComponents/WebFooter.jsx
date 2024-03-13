import React,{useState,useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { webService } from '../../apiServices/web';
import { useNavigate } from 'react-router-dom';
import ShowAsset from './ShowAsset';
import { useSafeNavigate } from '../../hooks/useSafeNavigate';
import WebAddons from './WebAddons';
import SetTitleDescpiption from './SetTitleDescpiption';

export default function WebFooter({web}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);
    const [isForkButtonDisabled, setIsForkButtonDisabled] = useState(false);
    const [showAsset, setShowAsset] = useState(false);
    const [showAddons, setShowAddons] = useState(false);
    const [showTitleDescpiption, setShowTitleDescpiption] = useState(false);
    const safeNavigate = useSafeNavigate();

    const forkWeb = useCallback(async (title,description,isPublic) => {
        if (!web) {
            return;
        }
        setIsForkButtonDisabled(true);
        const res = await webService.createForkWeb({webId:web?._id,title,description,isPublic})
        if (res.status<400 && res.data) {
            dispatch(addNotification({type:"success",text:res.message}))
            setShowTitleDescpiption(false)
            navigate(`/web/${res.data._id}`)
        } else {
            dispatch(addNotification({type:"error",text:res.message}))
            setIsForkButtonDisabled(false)
        }
    },[web])

  return (
    <div className='w-screen h-[25px] bg-gray-950 flex flex-nowrap overflow-auto justify-start px-1 fixed left-0 bottom-0 z-20'>
        {user && web && user.username !== web.owner.username && 
        <button disabled={isForkButtonDisabled}
        onClick={()=>setShowTitleDescpiption(true)}
        className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
            Fork
        </button>}
        <button onClick={()=>setShowAsset(true)}
         className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
            Assets
        </button>
        <button onClick={()=>setShowAddons(true)}
         className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
            Addons
        </button>
        {web &&
        <button onClick={()=>safeNavigate(`/view-full/${web?._id}`)}
         className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
            Full View
        </button>}
        {showAsset && <ShowAsset setShowAsset={setShowAsset} showAsset={showAsset} />}
        {showAddons && <WebAddons setShowAddons={setShowAddons} showAddons={showAddons} 
        owner={web? web.owner : null} />}
        {showTitleDescpiption && <SetTitleDescpiption setShowTitleDescpiption={setShowTitleDescpiption} showTitleDescpiption={showTitleDescpiption} forkWeb={forkWeb} />}
    </div>
  )
}
