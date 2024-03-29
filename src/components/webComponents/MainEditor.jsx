import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setEditorOption } from "../../store/editorOptionSlice.js"
import RetroBG from "../backgrounds/RetroBG.jsx";
import { webService } from "../../apiServices/web.js"
import {chengeCss,chengeHtml,chengeJs,chengeTitleAndDesc,updateCssLinks,updateJsLinks,updateHtmlLinks} from "../../store/webSlice.js";
import Iframe from './Iframe.jsx';
import WebHeader from './WebHeader.jsx';
import * as htmlToImage from 'html-to-image';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '../../store/notificationSlice.js';
import WebFooter from './WebFooter.jsx';
import Loader from '../backgrounds/Loader.jsx';
import Indentation1 from './indentation1.jsx';
import Indentation2 from './indentation2.jsx';
import Indentation3 from './indentation3.jsx';
import {resetYourWorkWebs} from "../../store/yourWorkSlice"

export default function MainEditor() {
  document.title = 'new web - codeWeb.io'
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const webHtml = useSelector(state => state.webs.html);
  const webCss = useSelector(state => state.webs.css);
  const webJs = useSelector(state => state.webs.js);
  const webTitle = useSelector(state => state.webs.title);
  const webDescription = useSelector(state => state.webs.description);
  const webIsPublic = useSelector(state => state.webs.isPublic);
  const cssLinks = useSelector(state => state.webs.cssLinks);
  const jsLinks = useSelector(state => state.webs.jsLinks);
  const htmlLinks = useSelector(state => state.webs.htmlLinks);
  const options = useSelector(state => state.editorOption.editorOption);
  const [loading, setLoading] = useState(true);
  const [indentationNo, setIndentationNo] = useState(2);
  const [showRenderingIfream, setShowRenderingIfream] = useState(true);
  const [isCreating,setIsCreating] = useState(false);
  const ifreamRef = useRef(null);

  useEffect(() => {
    webService.getEditorPreferences()
      .then(res => {
        dispatch(setEditorOption(res.data));
        if (window.innerWidth >= 1024) {
        setIndentationNo(res.data.indentation);
        }
        dispatch(chengeHtml(""));
        dispatch(chengeCss(""));
        dispatch(chengeJs(""));
        dispatch(chengeTitleAndDesc({title:"Untitled",description:"",isPublic:true}))
        dispatch(updateCssLinks([]));
        dispatch(updateJsLinks([]));
        dispatch(updateHtmlLinks([]));
        setLoading(false);
      })
  },[]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the event
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = '';
    };

    // Listen for the beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); //


  window.addEventListener("resize",()=>{
    if (window.innerWidth < 1024) {
      setIndentationNo(2);
    } else{
      setIndentationNo(options.indentation);
    }
  })

  const hendleSaveWeb = useCallback(async () => {
    if (!webHtml && !webCss && !webJs) {
      dispatch(addNotification({ text: "You can't save an empty web", type: "warning" }));
      return;
    } 
    if (webTitle==="Untitled" || !webDescription) {
      dispatch(addNotification({ text: "Title and description are required", type: "warning" }));
      return;
    }
    setIsCreating(true);
    const dataUrl = await htmlToImage.toJpeg(ifreamRef.current, { quality: 1.0,width:1200 ,height:700 });
    const image = await fetch(dataUrl).then((res) => res.blob());
    setShowRenderingIfream(false);
    const response = await webService.createWeb({
      title:webTitle,
      description:webDescription,
      html:webHtml,
      css:webCss,
      js:webJs,
      image:image,
      cssLinks:cssLinks,
      jsLinks:jsLinks,
      htmlLinks:htmlLinks,
      isPublic:webIsPublic,
    })

    if(response.status<400 && response.data){
      dispatch(addNotification({ text: response.message, type: "success" }));
      setIsCreating(false);
      dispatch(resetYourWorkWebs());
      navigate(`/web/${response.data._id}`);
    } else if(response.status>=400 && !response.data){
      dispatch(addNotification({ text: response.message, type: "error" }));
      setIsCreating(false);
    }

  },[ifreamRef,webTitle,webDescription,webHtml,webCss,webJs,cssLinks,jsLinks,webIsPublic,htmlLinks]);

  return (
    loading ? <RetroBG text={"Creating..."} /> :
      <div className='h-screen w-screen m-0 p-0'
      >
        <nav className='w-screen block h-[50px] bg-gray-700 m-0 p-0'>
          <WebHeader setIndentationNo={setIndentationNo} hendleSaveWeb={hendleSaveWeb} />
        </nav>

        {indentationNo === 1 &&
          <div className='w-screen h-calc-screen-75px m-0 p-0'>

            <Indentation1 />

          </div>
        }

        {indentationNo === 2 &&
          <div className='w-screen h-calc-screen-75px m-0 p-0'>

            <Indentation2 />

          </div>}

        {indentationNo === 3 &&
          <div className='w-screen h-calc-screen-75px m-0 p-0'>
            
            <Indentation3 />

          </div>
        }
        <div className='w-screen h-[25px]'>
            <WebFooter />
        </div>

        {showRenderingIfream && <div className='w-[1200px] h-[700px] opacity-0'>
      <Iframe ref={ifreamRef} />
    </div> }

    {isCreating && <Loader texts={[
      "Creating Your Web...",
      "Uploading Data...",
      "Almost Done...",
      "just Wait a moment...",
      "Almost Done..."
      ]} />}
      </div>

  )
}
