import React,{memo,forwardRef} from 'react'
import { useSelector } from 'react-redux';

export default memo(forwardRef(function Iframe({web},ref) {
    let html,css,javascript;

    if (web) {
        html = web.html;
        css = web.css;
        javascript = web.js;
    } else {
      html = useSelector(state => state.webs.html);
      css = useSelector(state => state.webs.css);
      javascript = useSelector(state => state.webs.js);
    }

    const htmlContent = `
    <html>
      <head>
        <title>Embedded HTML</title>
        <style>
          ${css}
          </style>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
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
                ref={ref}
                title="Embedded Content"
                srcDoc={htmlContent}
                width="100%"
                height="100%"
                allowFullScreen={true}
            />
        </>
    )
}))