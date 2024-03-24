import React,{useState} from 'react'
import EditorBox from './EditorBox';
import Iframe from './Iframe';

export default function Indentation3() {
    const mainWidth = window.innerWidth;
    const [editorWidth, setEditorWidth] = useState(mainWidth / 2);
  
    const handleHorizontalResize = (e) => {
      const newWidth = e.clientX;
      if (newWidth<=350) {
        setEditorWidth(350);
      } else if (newWidth>=mainWidth-350) {
        setEditorWidth(mainWidth-350);
      } else {
        setEditorWidth(newWidth);
      }
    };

  return (
    <div className='w-full h-full flex flex-nowrap bg-gray-950'>

        <div style={{width:editorWidth-14,height:"100%"}}>
            <Iframe />
        </div>


        <div style={{width:"14px",height:"100%"}} 
        className=' bg-gray-950 border-x-[1px] border-gray-600 cursor-col-resize'
        onMouseDown={(e) => {
          window.addEventListener('mousemove', handleHorizontalResize);
          window.addEventListener('mouseup', () => {
          window.removeEventListener('mousemove', handleHorizontalResize);
          });
        }}
        ></div>


        <div style={{width: mainWidth-editorWidth,height:"100%"}}>
            <EditorBox />
        </div>

    </div>
  )
}