import React,{useEffect} from 'react'
import Editor from "@monaco-editor/react"


export default function EditorBox() {
    document.title = 'new web - codeWeb.io'

    useEffect(() => {
        import("../../cssFiles/editor.css")
    });
    return (
        <div className='' id='editor'>
            <Editor
                height="100%"
                width={"100%"}
                language="javascript"
                theme="vs-dark"
                defaultValue=''
                options={{
                    inlineSuggest: true,
                    fontFamily: "Source Code Pro, monospace",
                    fontWeight: "500",
                    fontSize: "15px",
                    formatOnType: true,
                    autoClosingBrackets: true,
                    minimap: { enabled: false},
                    copyWithSyntaxHighlighting:false,
                    formatOnPaste: true,
                    inlayHints: { enabled: true, padding:true},
                    lineHeight: 20,
                    mouseWheelZoom: true,
                    multiCursorLimit: 8,
                    showUnused:true,
                    wordWrap: "on",
                }}
            />
        </div>
    )
}
