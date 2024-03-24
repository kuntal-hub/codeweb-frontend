import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { webService } from '../../apiServices/web';
import { useNavigate } from 'react-router-dom';
import ShowAsset from './ShowAsset';
import { useSafeNavigate } from '../../hooks/useSafeNavigate';
import WebAddons from './WebAddons';
import SetTitleDescpiption from './SetTitleDescpiption';
import JSZip from 'jszip';
import Comments from './Comments';
import AddToCollection from '../CollectionComponents/AddToCollection';

export default function WebFooter({ web }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const html = useSelector(state => state.webs.html);
  const css = useSelector(state => state.webs.css);
  const javascript = useSelector(state => state.webs.js);
  const cssLinks = useSelector(state => state.webs.cssLinks);
  const jsLinks = useSelector(state => state.webs.jsLinks);
  const htmlLinks = useSelector(state => state.webs.htmlLinks);
  const webTitle = useSelector(state => state.webs.title);
  const [isForkButtonDisabled, setIsForkButtonDisabled] = useState(false);
  const [showAsset, setShowAsset] = useState(false);
  const [showAddons, setShowAddons] = useState(false);
  const [showTitleDescpiption, setShowTitleDescpiption] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const safeNavigate = useSafeNavigate();

  const forkWeb = useCallback(async (title, description, isPublic) => {
    if (!web) {
      return;
    }
    setIsForkButtonDisabled(true);
    const res = await webService.createForkWeb({ webId: web?._id, title, description, isPublic })
    if (res.status < 400 && res.data) {
      dispatch(addNotification({ type: "success", text: res.message }))
      setShowTitleDescpiption(false)
      navigate(`/web/${res.data._id}`)
    } else {
      dispatch(addNotification({ type: "error", text: res.message }))
      setIsForkButtonDisabled(false)
    }
  }, [web])

  const exportZip = async () => {
    if (!html.trim() && !css.trim() && !javascript.trim()) {
      return;
    }
    const htmlContent =
      `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${htmlLinks.map(link => {
        return link
      }).join("")
      }
            <title>${webTitle}</title>
            <link rel="stylesheet" href="style.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          ${cssLinks.map(link => {
        return `<link rel="stylesheet" href="${link}">`
      }).join("")
      }
        </head>
        <body>
            ${html}
            ${jsLinks.map(link => {
        return `<script src="${link}"></script>`
      }).join("")
      }
            <script src="script.js"></script>
        </body>
        </html>`
    const cssContent = css;
    const jsContent = javascript;

    // Create the files
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const cssBlob = new Blob([cssContent], { type: 'text/css' });
    const jsBlob = new Blob([jsContent], { type: 'text/javascript' });

    // Create zip file
    const zip = new JSZip();
    zip.file('index.html', htmlBlob);
    zip.file('style.css', cssBlob);
    zip.file('script.js', jsBlob);

    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.download = `${webTitle.replaceAll(" ", "_")}.zip`;
    link.href = URL.createObjectURL(content);
    link.click();
    dispatch(addNotification({ type: "success", text: "Zip Exported successfully" }))
  }

  return (
    <div className='w-screen h-[25px] bg-gray-950 flex flex-nowrap overflow-x-auto overflow-y-hidden justify-start px-1 fixed left-0 bottom-0 z-20'>
      {user && web && user.username !== web.owner.username &&
        <button disabled={isForkButtonDisabled}
          onClick={() => setShowTitleDescpiption(true)}
          className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
          Fork
        </button>}
      <button onClick={() => setShowAsset(true)}
        className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
        Assets
      </button>
      <button onClick={() => setShowAddons(true)}
        className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
        Addons
      </button>
      {web &&
        <button onClick={() => safeNavigate(`/view-full/${web?._id}`)}
          className='h-[25px] text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px] min-w-16'>
          Full View
        </button>}
      {
        user && web &&
        <button onClick={() => setShowComments(true)}
          className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
          Comments
        </button>
      }
      <button onClick={exportZip}
        className='h-full text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px]'>
        Export
      </button>
          {
            user && web &&
            <button onClick={() => setShowAddToCollection(true)}
              className='h-[25px] text-white px-2 text-[12px] bg-gray-700 hover:bg-gray-600 mx-[2px] min-w-28'>
              Add To Collection
            </button>
          }
      {showAsset && <ShowAsset setShowAsset={setShowAsset} showAsset={showAsset} />}
      {showAddons && <WebAddons setShowAddons={setShowAddons} showAddons={showAddons}
        owner={web ? web.owner : null} />}
      {showComments && <Comments web={web} setShowComments={setShowComments} showComments={showComments} />}
      {showTitleDescpiption && <SetTitleDescpiption setShowTitleDescpiption={setShowTitleDescpiption} showTitleDescpiption={showTitleDescpiption} forkWeb={forkWeb} />}
      {showAddToCollection && 
      <AddToCollection 
      setShowAddToCollection={setShowAddToCollection} 
      showAddToCollection={showAddToCollection} webId={web._id} />}
    </div>
  )
}
