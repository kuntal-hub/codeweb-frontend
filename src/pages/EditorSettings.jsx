import React, { useEffect, useState } from 'react'
import Select from '../components/utilComponents/Select';
import { addNotification } from '../store/notificationSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { webService } from "../apiServices/web.js"

export default function EditorSettings() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [editorSettings, setEditorSettings] = useState({});
  const [teackChanges, setTeackChanges] = useState({})
  const [isDisabaled, setIsDisabled] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsDisabled(true)

    if (editorSettings.theme === teackChanges.theme &&
      editorSettings.fontSize === teackChanges.fontSize &&
      editorSettings.fontWeight === teackChanges.fontWeight &&
      editorSettings.formatOnType == teackChanges.formatOnType &&
      editorSettings.lineHeight == teackChanges.lineHeight &&
      editorSettings.mouseWheelZoom == teackChanges.mouseWheelZoom &&
      editorSettings.wordWrap === teackChanges.wordWrap) {
      dispatch(addNotification({ text: "No changes made", type: 'info' }))
      setIsDisabled(false)
      return;
    }

    const response = await webService.updateEditorPreferences({
      theme:editorSettings.theme,
      fontSize:editorSettings.fontSize,
      fontWeight:editorSettings.fontWeight,
      formatOnType:editorSettings.formatOnType==="true"?true:false,
      lineHeight:Number(editorSettings.lineHeight),
      mouseWheelZoom:editorSettings.mouseWheelZoom==="true"?true:false,
      wordWrap:editorSettings.wordWrap
    })
    if (response.status < 400 && response.data) {
      dispatch(addNotification({ text: response.message, type: 'success' }))
      setTeackChanges(response.data);
      setIsDisabled(false)
    } else if (response.status >= 400 || !response.data) {
      dispatch(addNotification({ text: response.message, type: 'error' }))
      setIsDisabled(false)
    }
  }
  
  useEffect(() => {
    webService.getEditorPreferences()
      .then(response => {
        if (response.status < 400 && response.data) {
          setEditorSettings(response.data);
          setTeackChanges(response.data)
        } else {
          navigate("/error")
        }
      })

  }, [])

  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
      <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
        <div className='lg:w-[35%] w-full pr-4'>
          <h2 className=' w-full text-xl font-bold mb-1'>Editor Settings</h2>
          <p className='capitalize'>customize your editor as you want for better user experience </p>
        </div>
        <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>
          <form className='w-ful lg:px-2'>

            <Select
              label="Theme"
              options={["vs-dark", "light"]}
              value={String(editorSettings.theme)}
              onChange={(e) => setEditorSettings({ ...editorSettings, theme: e.target.value })}
               /> <br />


            <Select
              label="Font Size"
              options={["10px", "12px", "14px", "15px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px", "32px"]}
              value={String(editorSettings.fontSize)}
              onChange={(e) => setEditorSettings({ ...editorSettings, fontSize: e.target.value })}
               /> <br />


            <Select
              label="font weight"
              options={["400", "500", "600", "700"]}
              value={String(editorSettings.fontWeight)}
              onChange={(e) => setEditorSettings({ ...editorSettings, fontWeight: e.target.value })}
               /> <br />


            <Select
              label="Format On Type"
              options={["true", "false"]}
              value={String(editorSettings.formatOnType)}
              onChange={(e) => setEditorSettings({ ...editorSettings, formatOnType: e.target.value==="true"?true:false })}
               /> <br />


            <Select
              label="Line Height"
              options={["14", "16", "18", "20", "22", "24", "26", "28", "30", "32"]}
              value={String(editorSettings.lineHeight)}
              onChange={(e) => setEditorSettings({ ...editorSettings, lineHeight: Number(e.target.value) })}
               /> <br />


            <Select
              label="Mouse Wheel Zoom"
              options={["true", "false"]}
              value={String(editorSettings.mouseWheelZoom)}
              onChange={(e) => setEditorSettings({ ...editorSettings, mouseWheelZoom: e.target.value==="true"?true:false })}
               /> <br />


            <Select
              label="Word Wrap"
              options={['on', 'off', 'wordWrapColumn', 'bounded']}
              value={String(editorSettings.wordWrap)}
              onChange={(e) => setEditorSettings({ ...editorSettings, wordWrap: e.target.value })}
               /> <br />


            <input type="submit" value="Save Chenges" readOnly={isDisabaled} onClick={submitHandler}
              className='bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            />
          </form>
        </div>
      </div>

    </div>
  )
}
