import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { updateCssLinks } from '../../store/webSlice';
import { useParams } from 'react-router-dom';
import {webService} from "../../apiServices/web.js";

export default function CssAddons({owner}) {
    const dispatch = useDispatch();
    const {webId} = useParams();
    const cssLinks = useSelector(state => state.webs.cssLinks);
    const user = useSelector(state => state.auth.userData);
    const [link, setLink] = useState('');

    const addCssLink = async () => {
        if (link.trim().length<10) {
            return;
        }

        if (webId && user && user.username === owner?.username) {
            const response = await webService.addNewCssLink({webId, cssLink:link})
            if (response.status<400 && response.data) {
                dispatch(addNotification({type:"success",text:response.message}))
            } else {
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }
        dispatch(updateCssLinks([...cssLinks, link]))
        setLink('')
    }

    const deleteCssLink = async (index) => {
        if (webId && user && user.username === owner?.username) {
            const response = await webService.removeCssLink({webId,cssLink:cssLinks[index]})
            if (response.status<400 && response.data) {
                dispatch(addNotification({type:"success",text:response.message}))
            } else {
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }
        dispatch(updateCssLinks(cssLinks.filter((_, i) => i !== index)))
    }

  return (
    <div className='w-full h-full-50px rounded-b-lg overflow-y-auto'>
        <p className='text-white font-semibold py-1 px-4'>
            Add External css in the head of your web page by providing the link to the css file.
        </p>
        <div className='w-full px-3 py-5 md:px-10 flex flex-nowrap justify-between'>
            <input type="text"
            value={link}
            placeholder=' https://yourWebSite.com/style.css'
            onChange={(e)=>setLink(e.target.value)}
            className='w-4/5 h-10 bg-gray-700 text-white px-2 rounded-l-lg outline-blue-600'
            />
            <button onClick={addCssLink}
            className='w-1/5 h-10 bg-blue-600 text-white px-2 rounded-r-lg hover:bg-blue-500 font-semibold'
            >
                Add
            </button>
        </div>
        {
            cssLinks.map((link, index) => (
                <div className='w-full px-3 py-5 md:px-10 flex flex-nowrap justify-between' key={index}>
                <input type="text"
                value={link}
                readOnly={true}
                className='w-4/5 h-10 bg-gray-700 text-white px-2 rounded-l-lg overflow-auto'
                />
                <button onClick={()=>deleteCssLink(index)}
                className='w-1/5 h-10 bg-red-600 text-white px-2 rounded-r-lg hover:bg-red-500 font-semibold'
                >
                    delete
                </button>
            </div>
            ))
        }
    </div>
  )
}
