import React, { useState, useEffect, useCallback, useRef } from 'react'
import EditorBox from './EditorBox'
import { useSelector, useDispatch } from "react-redux";
import { setEditorOption } from "../../store/editorOptionSlice.js"
import RetroBG from "../backgrounds/RetroBG.jsx";
import { webService } from "../../apiServices/web.js"
import Iframe from './Iframe.jsx';
import WebHeader from './WebHeader.jsx';
import * as htmlToImage from 'html-to-image';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '../../store/notificationSlice.js';


export default function MainEditor() {
  document.title = 'new web - codeWeb.io'
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
  const ifreamRef = useRef(null);

  useEffect(() => {
    webService.getEditorPreferences()
      .then(res => {
        dispatch(setEditorOption(res.data));
        setLoading(false);
      })
  }, []);


  window.addEventListener("resize",(e)=>{
    if (window.innerWidth < 1024) {
      setIndentationNo(2);
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
    const dataUrl = await htmlToImage.toJpeg(ifreamRef.current, { quality: 1.0,width:1200 ,height:700 });
    const image = await fetch(dataUrl).then((res) => res.blob());
    
    setLoading(true);
    const response = await webService.createWeb({
      title:webTitle,
      description:webDescription,
      html:webHtml,
      css:webCss,
      js:webJs,
      image:image,
      isPublic:true
    })

    if(response.status<400 && response.data){
      dispatch(addNotification({ text: response.message, type: "success" }));
      setLoading(false);
      navigate(`/web/${response.data._id}`);
    } else if(response.status>=400 && !response.data){
      dispatch(addNotification({ text: response.message, type: "error" }));
      setLoading(false);
    }

  },[ifreamRef,webTitle,webDescription,webHtml,webCss,webJs]);

  return (
    loading ? <RetroBG text={"Creating..."} /> :
      <div className='h-screen w-screen m-0 p-0'
      >
        <nav className='w-screen block h-[50px] bg-gray-700 m-0 p-0'>
          <WebHeader setIndentationNo={setIndentationNo} hendleSaveWeb={hendleSaveWeb} />
        </nav>

        {indentationNo === 1 &&
          <div className='w-screen h-calc-screen-50px m-0 p-0 flex flex-nowrap'>

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
          <div className='w-screen h-calc-screen-50px m-0 p-0 md:flex md:flex-nowrap lg:block'>

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
          <div className='w-screen h-calc-screen-50px m-0 p-0 flex flex-nowrap'>
            {showResult &&
              <div className='h-full m-0 p-0 w-[60%]'>
                <Iframe ref={ifreamRef} />
              </div>}

            <div className={`${showResult ? "w-[40%]" : "w-full"} bg-gray-950 h-full`}>
              <EditorBox showResult={showResult} setShowResult={setShowResult} />
            </div>
          </div>
        }
      </div>

  )
}
