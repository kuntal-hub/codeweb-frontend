import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { updateHtmlLinks } from '../../store/webSlice';
import { useParams } from 'react-router-dom';
import {webService} from "../../apiServices/web.js";

export default function HtmlAddons({owner}) {
    const dispatch = useDispatch();
    const {webId} = useParams();
    const htmlLinks = useSelector(state => state.webs.htmlLinks);
    const user = useSelector(state => state.auth.userData);
    const [link, setLink] = useState('');

    const addHtmlLink = async () => {
        if (link.trim().length<10) {
            return;
        }

        if (webId && user && user.username === owner?.username) {
            const response = await webService.addNewHtmlTag({webId, htmlLink:link})
            if (response.status<400 && response.data) {
                dispatch(addNotification({type:"success",text:response.message}))
            } else {
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }
        dispatch(updateHtmlLinks([...htmlLinks, link]))
        setLink('')
    }

    const deleteHtmlLink = async (index) => {
        if (webId && user && user.username === owner?.username) {
            const response = await webService.removeHtmlTag({webId,htmlLink:htmlLinks[index]})
            if (response.status<400 && response.data) {
                dispatch(addNotification({type:"success",text:response.message}))
            } else {
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }
        dispatch(updateHtmlLinks(htmlLinks.filter((_, i) => i !== index)))
    }

  return (
    <div className='w-full h-full-50px rounded-b-lg overflow-y-auto'>
        <p className='text-white font-semibold py-1 px-4'>
            Add meta tags, charset, viewport, etc. in the head tag of your web page by providing the html tag.
        </p>
        <div className='w-full px-3 py-5 md:px-10 flex flex-nowrap justify-between'>
            <input type="text"
            value={link}
            placeholder=' <meta charset="UTF-8" />'
            onChange={(e)=>setLink(e.target.value)}
            className='w-4/5 h-10 bg-gray-700 text-white px-2 rounded-l-lg outline-blue-600'
            />
            <button onClick={addHtmlLink}
            className='w-1/5 h-10 bg-blue-600 text-white px-2 rounded-r-lg hover:bg-blue-500 font-semibold'
            >
                Add
            </button>
        </div>
        {
            htmlLinks.map((link, index) => (
                <div className='w-full px-3 py-5 md:px-10 flex flex-nowrap justify-between' key={index}>
                <input type="text"
                value={link}
                readOnly={true}
                className='w-4/5 h-10 bg-gray-700 text-white px-2 rounded-l-lg overflow-auto'
                />
                <button onClick={()=>deleteHtmlLink(index)}
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

