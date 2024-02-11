import React,{memo} from 'react'
import { useSelector } from 'react-redux';

export default memo(function Iframe() {
    const html = useSelector(state => state.webs.html);
    const css = useSelector(state => state.webs.css);
    const javascript = useSelector(state => state.webs.js);

    const htmlContent = `
    <html>
      <head>
        <title>Embedded HTML</title>
        <style>
          ${css}
          </style>
      </head>
      <body>
        ${html}
        <script>
            ${javascript}
        </script>
      </body>
    </html>
  `;


    return (
        <>
            <iframe
                title="Embedded Content"
                srcDoc={htmlContent}
                width="100%"
                height="100%"
                allowFullScreen={true}
            />
        </>
    )
})