import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as htmlToImage from 'html-to-image';
import { useNavigate } from 'react-router-dom';
import {chengeCss,chengeHtml,chengeJs,chengeTitleAndDesc} from "../store/webSlice.js";
import { addNotification } from '../store/notificationSlice.js';
import EditorBox from '../components/webComponents/EditorBox.jsx';
import RetroBG from '../components/backgrounds/RetroBG.jsx';
import Iframe from '../components/webComponents/Iframe';
import { webService } from '../apiServices/web.js';
import WebHeader from '../components/webComponents/WebHeader2.jsx';
import {setEditorOption} from "../store/editorOptionSlice.js";
import { useParams } from 'react-router-dom';

export default function EditWeb() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const webHtml = useSelector(state => state.webs.html);
  const webCss = useSelector(state => state.webs.css);
  const webJs = useSelector(state => state.webs.js);
  const webTitle = useSelector(state => state.webs.title);
  const webDescription = useSelector(state => state.webs.description);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(true);
  const [indentationNo, setIndentationNo] = useState(2);
  const [web,setWeb] = useState(null);
  const ifreamRef = useRef(null);
  const {webId} = useParams();
  document.title = 'web - '+webTitle;

  useEffect(() => {
    webService.getEditorPreferences()
      .then(res => {
        dispatch(setEditorOption(res.data));
        setIndentationNo(res.data.indentation)
      })
      
      webService.getWebById({webId:webId})
      .then(res=>{
        if (res.status<400 && res.data) {
          setWeb(res.data);
          dispatch(chengeHtml(res.data.html))
          dispatch(chengeCss(res.data.css))
          dispatch(chengeJs(res.data.js))
          dispatch(chengeTitleAndDesc(res.data))
          setLoading(false);
      } else {
        navigate("/error")
      }
    })
  }, []);

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


  window.addEventListener("resize",(e)=>{
    if (window.innerWidth < 1024) {
      setIndentationNo(2);
    }
  })

  const hendleSaveWeb = useCallback(async () => {
    if (web.title===webTitle && web.description===webDescription && web.html===webHtml && web.css===webCss && web.js===webJs) {
      dispatch(addNotification({ text: "No changes to save", type: "info" }));
      return;
    }
    let image;
    if (web.html !== webHtml || web.css !== webCss || web.js !== webJs) {
      const dataUrl = await htmlToImage.toJpeg(ifreamRef.current, { quality: 1.0,width:1200 ,height:700 });
      image = await fetch(dataUrl).then((res) => res.blob()); 
    }
    
    setLoading(true);
    const data ={};
    data.webId = web._id;
    if (web.title!==webTitle) data.title = webTitle;
    if (web.description!==webDescription) data.description = webDescription;
    if (web.html!==webHtml) data.html = webHtml;
    if (web.css!==webCss) data.css = webCss;
    if (web.js!==webJs) data.js = webJs;
    if (image) data.image = image;
    const response = await webService.updateWeb(data)

    if(response.status<400 && response.data){
      dispatch(addNotification({ text: response.message, type: "success" }));
      setWeb({...web,html:webHtml,css:webCss,js:webJs,title:webTitle,description:webDescription});
      setLoading(false);
    } else if(response.status>=400 || !response.data){
      dispatch(addNotification({ text: response.message, type: "error" }));
      setLoading(false);
    }

  },[ifreamRef,webTitle,webDescription,webHtml,webCss,webJs,web]);

  return (
    loading? <RetroBG text={web? "Saving Web..." : "Loading..."} /> : 
    <div className='h-screen w-screen fixed top-0 left-0 bg-white m-0 p-0'>

      <nav className='w-screen block h-[50px] bg-gray-700 m-0 p-0'>
          <WebHeader setIndentationNo={setIndentationNo} hendleSaveWeb={hendleSaveWeb} web={web} />
        </nav>

        {indentationNo === 1 &&
          <div className='w-screen h-calc-screen-75px m-0 p-0 flex flex-nowrap'>

            <div className={`${showResult ? "w-[40%]" : "w-full"} bg-gray-950 h-full`}>
              <EditorBox showResult={showResult} setShowResult={setShowResult} />
            </div>

            {showResult &&
              <div className='h-full m-0 p-0 w-[60%]'>
                <Iframe ref={ifreamRef} />
              </div>}

          </div>
        }

        {indentationNo === 2 &&
          <div className='w-screen h-calc-screen-75px m-0 p-0 md:flex md:flex-nowrap lg:block'>

            <div className={`${showResult ? "h-[55%] md:w-[50%] md:h-full lg:w-full lg:h-[55%]" : "h-full md:w-[100%]"} 
          m-0 p-0 flex flex-nowrap justify-center bg-gray-950`}>
              <div className='w-[100vw]  md:w-[100%] lg:w-[50vw] min-h-full'>
                <EditorBox showResult={showResult} setShowResult={setShowResult} />
              </div>
              {window.innerWidth >= 1024 &&
                <div className='w-[50vw] min-h-full hidden lg:block'>
                  <EditorBox showResult={showResult} setShowResult={setShowResult} />
                </div>}
            </div>

            {showResult &&
              <div className='h-[45%] m-0 p-0 md:w-[50%] md:h-full lg:w-full lg:h-[45%]'>
                <Iframe ref={ifreamRef} />
              </div>}

          </div>}

        {indentationNo === 3 &&
          <div className='w-screen h-calc-screen-75px m-0 p-0 flex flex-nowrap'>
            {showResult &&
              <div className='h-full m-0 p-0 w-[60%]'>
                <Iframe ref={ifreamRef} />
              </div>}

            <div className={`${showResult ? "w-[40%]" : "w-full"} bg-gray-950 h-full`}>
              <EditorBox showResult={showResult} setShowResult={setShowResult} />
            </div>
          </div>
        }
        <div className='w-screen h-[25px] bg-gray-700'>

        </div>

    </div>
  
  )
}
