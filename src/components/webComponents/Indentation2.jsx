import React, { useState } from 'react'
import EditorBox from './EditorBox';
import Iframe from './Iframe';

export default function Indentation2() {
  const mainWidth = window.innerWidth;
  const mainHeight = window.innerHeight - 75;
  const [editorWidth, setEditorWidth] = useState(mainWidth / 2);
  const [editorHeight, setEditorHeight] = useState(mainHeight * (2 / 3));
  const [isSingleEditor, setIsSingleEditor] = useState(window.innerWidth < 1280 ? true : false);

  const handleHorizontalResize = (e) => {
    const newWidth = e.clientX;
    if (newWidth <= 320) {
      setEditorWidth(320);
    } else if (newWidth >= mainWidth - 320) {
      setEditorWidth(mainWidth - 320);
    } else {
      setEditorWidth(newWidth);
    }
  };

  const handleVerticalResize = (e) => {
    const newHeight = e.clientY-50;
    if (newHeight <= 100) {
      setEditorHeight(100);
    } else if (newHeight >= mainHeight - 100) {
      setEditorHeight(mainHeight - 100);
    } else {
      setEditorHeight(newHeight);
    }
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
      setIsSingleEditor(false);
    } else {
      setIsSingleEditor(true);
    }
  });

  return (
    <div className='w-full h-full flex flex-col bg-gray-950'>

      <div style={{ width: "100%", height: editorHeight }} className='flex flex-nowrap justify-between bg-gray-950'>
        {isSingleEditor ? <EditorBox /> :
          <>
            <div style={{ width: editorWidth, height: "100%" }}>
              <EditorBox />
            </div>

            <div style={{ width: "14px", height: "100%" }}
              className=' bg-gray-950 border-x-[1px] border-gray-600 cursor-col-resize'
              onMouseDown={(e) => {
                window.addEventListener('mousemove', handleHorizontalResize);
                window.addEventListener('mouseup', () => {
                  window.removeEventListener('mousemove', handleHorizontalResize);
                });
              }}
            ></div>

            <div style={{ width: mainWidth - editorWidth - 14, height: "100%" }}>
              <EditorBox />
            </div>
          </>}
      </div>


      <div style={{width:"100%",height:"14px"}} 
        className=' bg-gray-950 border-y-[1px] border-gray-600 cursor-row-resize z-[5]'
        onMouseDown={(e) => {
          window.addEventListener('mousemove', handleVerticalResize);
          window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', handleVerticalResize);
          });
        }}
        ></div>


      <div style={{ width: "100%", height: mainHeight - editorHeight -14 }}>
        <Iframe  />
      </div>
    </div>
  )
}