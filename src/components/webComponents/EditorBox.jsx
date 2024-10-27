import React, { useEffect, memo, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Editor from "@monaco-editor/react"
import "../../cssFiles/editor.css";
import { chengeHtml, chengeCss, chengeJs } from "../../store/webSlice.js";



export default memo(function EditorBox() {
    const dispatch = useDispatch();
    const html = useSelector(state => state.webs.html);
    const css = useSelector(state => state.webs.css);
    const javascript = useSelector(state => state.webs.js);
    const options = useSelector(state => state.editorOption.editorOption);
    const [htmlContent, setHtmlContent] = useState(html);
    const [cssContent, setCssContent] = useState(css);
    const [javascriptContent, setJavascriptContent] = useState(javascript);
    const [fileName, setFileName] = useState('index.html');

    const files = {
        'script.js': {
            name: 'script.js',
            language: 'javascript',
            value: javascript,
        },
        'style.css': {
            name: 'style.css',
            language: 'css',
            value: css,
        },
        'index.html': {
            name: 'index.html',
            language: 'html',
            value: html,
        },
    };

    const file = files[fileName];

    function handleEditorChange(value, event) {
        if (fileName === 'index.html') {
            setHtmlContent(value);
        } else if (fileName === 'style.css') {
            setCssContent(value);
        } else if (fileName === 'script.js') {
            setJavascriptContent(value);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(chengeHtml(htmlContent));
        }, 1500);
        return () => clearTimeout(timeout);
    }, [htmlContent]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(chengeCss(cssContent));
        }, 1500);
        return () => clearTimeout(timeout);
    }, [cssContent])

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(chengeJs(javascriptContent));
        }, 1500);
        return () => clearTimeout(timeout);
    }, [javascriptContent])


    return (
        <div className='h-full w-full'>
            <button className={`py-1 px-5 mx-[1px] ${fileName === "index.html" ? "bg-gray-800" : "bg-gray-700"} text-white text-sm`}
                disabled={fileName === 'index.html'} onClick={() => setFileName('index.html')}>
                html
            </button>
            <button className={`py-1 px-5 mx-[1px] ${fileName === "style.css" ? "bg-gray-800" : "bg-gray-700"} text-white text-sm`}
                disabled={fileName === 'style.css'} onClick={() => setFileName('style.css')}>
                css
            </button>
            <button className={`py-1 px-5 mx-[1px] ${fileName === "script.js" ? "bg-gray-800" : "bg-gray-700"} text-white text-sm`}
                disabled={fileName === 'script.js'} onClick={() => setFileName('script.js')}>
                javascript
            </button>
            {/* <button className={`py-1 px-3 mx-[1px] ${showResult? "bg-gray-600":"bg-gray-700"} text-white text-sm`}
             disabled={fileName === 'script.js'} onClick={() => setShowResult(!showResult)}>
                Result
            </button> */}
            <Editor
                className='h-calc-100-28px'
                width="100%"
                language={file.language}
                theme={options.theme || "vs-dark"}
                value={file.value}
                onChange={handleEditorChange}
                options={{
                    inlineSuggest: true,
                    fontFamily: "Source Code Pro, monospace",
                    fontWeight: options.fontWeight || "500",
                    fontSize: options.fontSize || "14px",
                    formatOnType: options.formatOnType || false,
                    autoClosingBrackets: true,
                    minimap: { enabled: window.innerWidth >= 1024 ? true : false },
                    copyWithSyntaxHighlighting: false,
                    formatOnPaste: true,
                    // inlayHints: { enabled: true, padding: true },
                    lineHeight: options.lineHeight || 20,
                    mouseWheelZoom: options.mouseWheelZoom || true,
                    multiCursorLimit: 8,
                    showUnused: true,
                    wordWrap: options.wordWrap || "on",
                }}
            />
        </div>
    )
})
