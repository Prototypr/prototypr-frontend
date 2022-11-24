import { Plugin, PluginKey } from 'prosemirror-state'
// import {ReplaceStep} from 'prosemirror-transform'
import { Extension } from '@tiptap/core'
// import {filterHtml} from './htmlFilter'

import sanitizeHtml from 'sanitize-html';

export function filterHtml (html){

    let div = document.createElement('div')
    div.innerHTML = html

    let images = div.querySelectorAll('img')

    if(images.length){
        for(var x = 0;x<images.length;x++){
            if(images[x].parentNode?.nodeName!=='FIGURE' && images[x].src){
               let fig = document.createElement('figure')
                let cap = document.createElement('figcaption')
                let figimg = document.createElement('img')
                figimg.setAttribute('src',images[x].src)
                cap.innerText=''
                fig.appendChild(figimg)
                fig.appendChild(cap)
                images[x].replaceWith(fig)
                // fig.appendChild(images[x])
            }
        }
    }

    // const clean = sanitizeHtml(html, {
    //     allowedTags: [ 'p', 'h1', 'h2', 'h3', 'h4', 'a'],
    //     allowedAttributes: {
    //       'a': [ 'href' ]
    //     },
    //     disallowedTagsMode:'discard'
    //     // allowedIframeHostnames: ['www.youtube.com']
    //   });

    return div.innerHTML

}

export const PasteFilter = Extension.create({
  name: 'pasteFilter',
  priority:1001,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pasteFilter'),
        props: {
          transformPastedHTML(html) {
            //filter out styles
            html = filterHtml(html)
            return html;
          },
        }

      }),
    ]
  },
})


