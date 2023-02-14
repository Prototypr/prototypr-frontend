import { Node, mergeAttributes, nodePasteRule } from '@tiptap/core';
import axios from 'axios'
import {NodeSelection} from 'prosemirror-state'

export const pasteRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi
export const pasteRegexWithBrackets = /(?:\()https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/()]*)(?:\))/gi


const LinkEmbed = Node.create({
  name: 'linkEmbed',
  priority:2001,
  group: 'block',
  selectable: true,
  draggable: true,
  // atom:true,

  addOptions() {
    return {
      addPasteHandler: true,
    };
  },

  addAttributes() {
    return {
      ['url']: {
        default: null,
        parseHTML:(element) =>{
          return element.getAttribute('url')
        }
      },
      ['data-title']:{
        default:'',
        parseHTML:(element)=>{
            return element.getAttribute('data-title')
        }
      },
      ['data-image']:{
        default:'',
        parseHTML:(element)=>{
            return element.getAttribute('data-image')
        }
      },
      ['data-logo']:{
        default:'',
        parseHTML:(element)=>{
            return element.getAttribute('data-logo')
        }
      },
      ['data-publisher']:{
        default:'',
        parseHTML:(element)=>{
            return element.getAttribute('data-publisher')
        }
      },
      ['data-description']:{
        default:'',
        parseHTML:(element)=>{
            return element.getAttribute('data-description')
        }
      },
      ['data-date']:{
        default:'',
        parseHTML:(element)=>{
            return element.getAttribute('data-date')
        }
      },
      ['data-card']:{
        default:'',
        parseHTML:(element)=>{
            return element.getAttribute('data-card')
        }
      },
      pasted: false,
    };
  },

  addCommands() {
    return {
      insertLink:
        () =>
        ({ commands }) => {
          commands.insertContent({
            type: this.name,
          });
          return true;
        },
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    return [
      nodePasteRule({
        type: this.type,
        find: pasteRegex,
        getAttributes:(match) => {
          return {
            pasted: true,
            url:match?.input,
          };
        },
      }),
    ];
  },

  parseHTML() {
    return [{
      tag:'div',
      getAttrs: node =>{
        if(node.classList.contains('link-embed')){
          return true
        }else{
          return false
        }},
    },]
},

  renderHTML({ HTMLAttributes }) {
    if (!HTMLAttributes.url) {
      return ['span'];
    }

    let rawHTML = document.createElement('div')
    rawHTML.innerHTML=HTMLAttributes['data-card']

    return['div', mergeAttributes( { 
        draggable: false, 
        contenteditable: false, 
        url:HTMLAttributes?.url,
        class:'link-embed' }), rawHTML.innerHTML]
        
    // ['figcaption', HTMLAttributes?.figcaption?HTMLAttributes.figcaption:'']
  
    // return ['div', mergeAttributes({ 'data-twitter': '' }, HTMLAttributes)];
  },

  addNodeView() {
    // return ReactNodeViewRenderer(TwitterComponent);
    return ({ node, getPos, editor}) => {
      if(!editor){
        return false
      }
      const { view, state } = editor;
      const figcaption = document.createElement('input');

      /**
       * set up twitter dom 
       */
      let container = document.createElement('div');

      container.style.position='relative'
      container.contentEditable=false
      const tweetWrapper = document.createElement('div');
      tweetWrapper.style.position='relative'
      tweetWrapper.style.width='100%'
      tweetWrapper.style.maxWidth='100%'
      tweetWrapper.style.height='fit-content'
      tweetWrapper.style.background='#e8eef9'
      tweetWrapper.style.borderRadius='1rem'
      tweetWrapper.setAttribute('draggable',false)
      container.appendChild(tweetWrapper)

      const overlay = document.createElement('div')
      overlay.style.width='100%'
      overlay.style.maxWidth='100%'
      overlay.style.height='fit-content'
      overlay.style.position='absolute'
      overlay.style.top=0
      overlay.style.left=0
      overlay.style.width='100%'
      overlay.style.height='100%'
      overlay.onmousedown= (e) =>{
        e.preventDefault()
        e.stopPropagation()
      }
      tweetWrapper.append(overlay)
      //container for tweet iframe embed
      const tweetFrameContainer = (document.createElement('div'))
      tweetWrapper.append(tweetFrameContainer)

      if(!node.attrs.url){
        /**
         * if the tweet has no url yet, show the form
         */

        const form= document.createElement('form')
        // onsubmit
        form.onsubmit = async (e) =>{
          e.preventDefault()

           //check link
           let url = e.target.fname?.value
           let foundTweet = false
           if(url){
            
            let meta = await fetchOG(url)
            if(meta?.data?.metadata){
                let metadata = meta?.data?.metadata 
                const transaction = state.tr.setNodeMarkup(
                    getPos(), // For custom node views, this function is passed into the constructor.  It'll return the position of the node in the document.
                    undefined, // No node type change
                    {
                      ...node.attrs,
                      pasted: false,
                      url,
                      ['data-author']:metadata?.author,
                      ['data-image']:metadata?.image,
                      ['data-logo']:metadata?.logo,
                      ['data-publisher']:metadata?.publisher,
                      ['data-description']:metadata?.description,
                      ['data-date']:metadata?.date,
                      ['data-title']:metadata?.title,
                    } // Replace (update) attributes to your `video` block here
                    )
                    view.dispatch(transaction)
                    form.remove()
                    //show loading
                    const tweetId = Date.now()
                    showLoader(container, tweetId)
                    //add the draghandle to the nodeview
                    addDragHandle(tweetWrapper, view, getPos)
                    // await window?.twttr?.widgets?.createTweet(tweetId, tweetFrameContainer);
                    let loaderDiv = document.getElementById('loader_'+tweetId)
                    loaderDiv.remove()
  
                    //add new line
                    editor.chain()
                   .insertContentAt(getPos()+1, `<p></p>`, {
                     updateSelection: true,
                     parseOptions: {
                       preserveWhitespace: 'full',
                     }
                   }).focus().run()
            }
         
           }
           else{
             // empty content
             if(!e.target.fname?.value){
               const pos = getPos()
               const from = pos
               const to = pos
               const tr = view.state.tr
               tr.delete(from, to+1)
               view.dispatch(tr);
   
               setTimeout(()=>{
                 editor.chain()
                 .insertContentAt(pos, `<p></p><p></p>`, {
                   updateSelection: true,
                   parseOptions: {
                     preserveWhitespace: 'full',
                   }
                 }).focus().run()
               },200)
               // setTimeout(()=>{
               //   editor.chain().setTextSelection(pos+2).focus().run()
               // },200)
             }else if(!foundTweet){
               const pos = getPos()
               const from = pos
               const to = pos
               const tr = view.state.tr
               tr.delete(from, to+1)
               view.dispatch(tr);
   
               editor.chain()
               .insertContentAt(pos, `<p>${input.value}</p><p></p>`, {
                 updateSelection: true,
                 parseOptions: {
                   preserveWhitespace: 'full',
                 }
               }).focus().run()
               // setTimeout(()=>{
               //   editor.chain().setTextSelection(pos+2).focus().run()
               // },200)
             }
           }
        }
        const input = document.createElement('input')
        // input.type = 'text'
        input.setAttribute('class', 'editorInput')
        input.setAttribute('id', 'fname')
        input.setAttribute('name', 'fname')
        input.placeholder='Paste a link and press enter to embed'
        form.appendChild(input)

        container.appendChild(form)
        // input field
        input.addEventListener('keydown', (e) => {
          if(e.key=='Backspace' && input.value==''){
            const pos = getPos()
            const from = pos
            const to = pos
            const tr = view.state.tr
            tr.delete(from, to+1)
            view.dispatch(tr);

            setTimeout(()=>{
              editor.chain()
              .insertContentAt(pos-1, '<p></p>', {
                updateSelection: true,
                parseOptions: {
                  preserveWhitespace: 'full',
                }
              }).focus().run()
            },150)
          }
          // space bar pressed
          if(e.key==' '){
            const pos = getPos()
            const from = pos
            const to = pos
            const tr = view.state.tr
            tr.delete(from, to+1)
            view.dispatch(tr);

            setTimeout(()=>{
              editor.chain()
              .insertContentAt(pos, `<p>${input.value}&nbsp;</p>`, {
                updateSelection: true,
                parseOptions: {
                  preserveWhitespace: 'full',
                }
              }).focus().run()
            },100)
          }
          // return false;
        });
        setTimeout(()=>{
          input.focus()
        },250)
        input.addEventListener('mousedown', (e) => {
          // If we don't do this, we can't click the input. No idea why.
          e.preventDefault();
          input.focus()
          return false;
        });

        return {
          dom: container,
          // contentDOM: figcaption,
          ignoreMutation(p) {
            return true
          },
          stopEvent(e) {
            return true
          },
          // update: (updatedNode) => {
          //   if (updatedNode.type !== this.type) {
          //     return false;
          //   }
  
          //   // figcaption.classList.toggle('empty', updatedNode.content.size === 0);
  
          //   return true;
          // },
        };
      }
        //show the loader if the tweet has url but not embedded yet
        let tweetId = Date.now()+'_'+node?.attrs?.url
        showLoader(container, tweetId)
        //add the draghandle to the nodeview
        addDragHandle(tweetWrapper, view, getPos)
        
        setTimeout(async()=>{
         
            let meta = await fetchOG(node?.attrs?.url)
            const metadata = meta?.data?.metadata 

            if((metadata?.title || metadata?.image) && meta?.data.card){
                const transaction = state.tr.setNodeMarkup(getPos(), undefined,  { ...node.attrs, 
                    ['data-author']:metadata?.author,
                    ['data-image']:metadata?.image,
                    ['data-logo']:metadata?.logo,
                    ['data-publisher']:metadata?.publisher,
                    ['data-description']:metadata?.description,
                    ['data-date']:metadata?.date,
                    ['data-title']:metadata?.title,
                    ['data-card']:meta?.data.card
                  })
                    view.dispatch(transaction)
                
            }
            else if((metadata?.title || metadata?.image) && !meta?.data.card){
                const transaction = state.tr.setNodeMarkup(getPos(), undefined,  { ...node.attrs, 
                    ['data-author']:metadata?.author,
                    ['data-image']:metadata?.image,
                    ['data-logo']:metadata?.logo,
                    ['data-publisher']:metadata?.publisher,
                    ['data-description']:metadata?.description,
                    ['data-date']:metadata?.date,
                    ['data-title']:metadata?.title,
                  })
                    view.dispatch(transaction)
            }
            if(meta?.data?.card){
                let card = document.createElement('div')
                card.innerHTML=meta?.data?.card
                container.appendChild(card)
            }
        // await window?.twttr?.widgets?.createTweet(tweetId, tweetFrameContainer);
        let loaderDiv = document.getElementById('loader_'+tweetId)
        loaderDiv.remove()
      },10)

      return {
        dom: container,
        // contentDOM: blockquote,
        ignoreMutation(p) {
          if (p.type === 'attributes' && p.attributeName != null) {
            if (['src', 'title', 'alt'].includes(p.attributeName)) {
              // if (typeof getPos === 'function') {
              //   view.dispatch(
              //     view.state.tr.setNodeMarkup(getPos(), undefined, {
              //       [p.attributeName]: (p.target).getAttribute(p.attributeName),
              //     })
              //   );
              // }
            }
            return true;
          }

          return true;
        },
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }

          figcaption.classList.toggle('empty', updatedNode.content.size === 0);

          return true;
        },
      };
    };
  },
});

export default LinkEmbed


const addDragHandle = (tweetWrapper, view, getPos) =>{
  // drag handle
  const drag = tweetWrapper.appendChild(document.createElement('div'))
  drag.style.cssText = "width: 22px; height: 22px; position: absolute; left: -24px;top:2px; cursor: grab"
  drag.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" style="border:1px solid rgba(0,0,0,0.2);border-radius:4px;" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="92" cy="60" r="12"></circle><circle cx="164" cy="60" r="12"></circle><circle cx="92" cy="128" r="12"></circle><circle cx="164" cy="128" r="12"></circle><circle cx="92" cy="196" r="12"></circle><circle cx="164" cy="196" r="12"></circle></svg>'
  drag.contentEditable = false
  drag.onmousedown = e => {
    if (e.button == 0){
      view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, getPos())))
    }
  }
}

const showLoader = (container, id) =>{
  let loader = document.createElement('div')
  loader.setAttribute('id','loader_'+id)
  loader.innerHTML='<div style="font-size:13px; margin-top:-5px;">Loading embed...</div>'
        loader.style.cssText='margin-left:24px;'
        container.appendChild(loader)
}

const fetchOG = async(url) =>{
   let data = await axios
    .post(
        "/api/fetch-og",
        {
        url
        }
    )
    .then(function (response) {
        console.log("success");
        return response
    })
    .catch(function (error) {
        console.log(error)
        alert('error')
    });

    return data
}