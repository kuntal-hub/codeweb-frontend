import React,{memo,forwardRef} from 'react'
import { useSelector } from 'react-redux';

export default memo(forwardRef(function Iframe({web},ref) {
    let html,css,javascript,cssLinks,jsLinks,htmlLinks;
    if (web) {
        html = web.html;
        css = web.css;
        javascript = web.js;
        cssLinks = web.cssLinks;
        jsLinks = web.jsLinks;
        htmlLinks = web.htmlLinks;
    } else {
      html = useSelector(state => state.webs.html);
      css = useSelector(state => state.webs.css);
      javascript = useSelector(state => state.webs.js);
      cssLinks = useSelector(state => state.webs.cssLinks);
      jsLinks = useSelector(state => state.webs.jsLinks);
      htmlLinks = useSelector(state => state.webs.htmlLinks);
    }

    const htmlContent = `
    <html>
      <head>
        <title>Embedded HTML</title>
        <meta charset="UTF-8" />
        ${
          htmlLinks.map(link => {
            return link
          }).join("")
        }
        <style>
          ${css}
          </style>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          ${
            cssLinks.map(link => {
              return `<link rel="stylesheet" href="${link}">`
            }).join("")
          }
      </head>
      <body>
        ${html}
        ${
          jsLinks.map(link => {
            return `<script src="${link}"></script>`
          }).join("")
        }
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