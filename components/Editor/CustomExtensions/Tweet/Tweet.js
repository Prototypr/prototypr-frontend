import { Node, mergeAttributes, nodePasteRule } from '@tiptap/core';
import axios from 'axios'
import {NodeSelection} from 'prosemirror-state'

export const TWITTER_REG_G =
  /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(.+)?$/g;

const Twitter = Node.create({
  name: 'twitter',
  priority:100,
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
    // figcaption:{
    //     default: null,
    //     parseHTML: element => {
    //       return element.querySelector('figcaption')?.innerText
    //     }
    //   },
      ['data-twitter-id']: {
        default: null,
        // force correct id
        parseHTML: (element) =>{
         return element.getAttribute('data-twitter-id')},
      },
      url: {
        default: null,
      },
      tweetId: {
        default: null,
        parseHTML: (element) =>{
          return element.getAttribute('tweetid')
        },
      },
      pasted: {
        default:false
      },
      rawContent:{
        default:''
      }
    };
  },

  addCommands() {
    return {
      insertTweet:
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
        find: TWITTER_REG_G,
        type: this.type,
        getAttributes:async (match) => {
          return {
            ['data-twitter-id']: await getTweetIdFromUrl(match.input),
            url: match.input,
            pasted: true,
          };
        },
      }),
    ];
  },

  parseHTML() {
    return [{
      tag:'blockquote',
      getAttrs: node =>{
        if(node.classList.contains('twitter-tweet')){
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
    console.log(HTMLAttributes)
    let rawHTML = document.createElement('div')
    rawHTML.innerHTML=HTMLAttributes.rawContent
    return['div',
    // ['blockquote', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ['blockquote', mergeAttributes(HTMLAttributes, { draggable: false, contenteditable: false, class:'twitter-tweet' }),
    rawHTML.firstChild
  ],
    // ['figcaption', HTMLAttributes?.figcaption?HTMLAttributes.figcaption:'']
  ]
    // return ['div', mergeAttributes({ 'data-twitter': '' }, HTMLAttributes)];
  },

  addNodeView() {
    // return ReactNodeViewRenderer(TwitterComponent);
    return ({ node, getPos, editor}) => {
      const { view, state } = editor;
      const figcaption = document.createElement('input');

      let container = document.createElement('div');
      let loader = document.createElement('div')
      
      if(!node.attrs.url){
        container.style.position='relative'
        const tweetWrapper = document.createElement('div');
        tweetWrapper.style.position='relative'

        const twitterOverlay = document.createElement('div')
        twitterOverlay.setAttribute('class', 'twitterOverlay');
        twitterOverlay.style.display='none'
        container.appendChild(tweetWrapper)
        tweetWrapper.appendChild(twitterOverlay)
        const form= document.createElement('form')
        // onsubmit
        form.onsubmit = async (e) =>{
          e.preventDefault()

           //check link
           let url = e.target.fname?.value
           let foundTweet = false
           if(url?.indexOf('/')>-1 && url?.indexOf('twitter')>-1){
            let embed = await axios.get('https://req.prototypr.io/https://publish.twitter.com/oembed?url='+url)
              .then(function (response) {
                loader.remove()
                return response
              })
              .catch(function (error) {
                console.log(error);
                alert('Try a different twitter url')
                return false
              });

              if(embed.data?.html){
                var el = document.createElement('div')
                el.innerHTML = embed.data?.html
                var blockquote = el.querySelector('blockquote')
                let tweetId = url?.split('/')[5].split('?')[0];


                const transaction = state.tr.setNodeMarkup(
                  getPos(), // For custom node views, this function is passed into the constructor.  It'll return the position of the node in the document.
                  undefined, // No node type change
                  {
                    ...node.attrs,
                    pasted: false,
                    url:url,
                    rawContent:blockquote?.innerHTML,
                    tweetId:tweetId
                  } // Replace (update) attributes to your `video` block here
                  )
                  view.dispatch(transaction)
                  form.remove()
                  await window.twttr.widgets.createTweet(tweetId, container);

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
        input.placeholder='Paste a tweet link and press enter to embed'
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
          update: (updatedNode) => {
            if (updatedNode.type !== this.type) {
              return false;
            }
  
            // figcaption.classList.toggle('empty', updatedNode.content.size === 0);
  
            return true;
          },
        };
      }
      let tweetId = node?.attrs?.url?.split('/')[5].split('?')[0];
      container.style.position='relative'
        const tweetWrapper = document.createElement('div');
        tweetWrapper.style.position='relative'
        tweetWrapper.style.width='34rem'
        tweetWrapper.style.maxWidth='100%'
        tweetWrapper.style.height='fit-content'
        tweetWrapper.style.background='#e8eef9'
        tweetWrapper.style.borderRadius='1rem'
        tweetWrapper.setAttribute('draggable',false)
        container.appendChild(tweetWrapper)

        // debugging tweet id
        // let iddiv = document.createElement('div')
        // iddiv.innerHTML=`<h2>${tweetId}</h2>`
        // container.appendChild(iddiv)

        const overlay = document.createElement('div')
        overlay.style.width='34rem'
        overlay.style.maxWidth='100%'
        overlay.style.height='fit-content'
        // overlay.style.background='red'
        overlay.style.position='absolute'
        overlay.style.top=0
        overlay.style.left=0
        overlay.style.width='100%'
        overlay.style.height='100%'
        overlay.onmousedown= (e) =>{
          e.preventDefault()
          e.stopPropagation()
        }

        loader.innerHTML='<div style="font-size:13px; margin-top:-5px;">Loading tweet...</div>'
        loader.style.cssText='margin-left:24px;'
        container.appendChild(loader)
        // overlay.setAttribute('data-drag-handle',true)
        // overlay.setAttribute('draggable',true)

        tweetWrapper.append(overlay)

        const drag = tweetWrapper.appendChild(document.createElement('div'))
        drag.style.cssText = "width: 22px; height: 22px; position: absolute; left: -24px;top:2px; cursor: grab"
        drag.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" style="border:1px solid rgba(0,0,0,0.2);border-radius:4px;" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="92" cy="60" r="12"></circle><circle cx="164" cy="60" r="12"></circle><circle cx="92" cy="128" r="12"></circle><circle cx="164" cy="128" r="12"></circle><circle cx="92" cy="196" r="12"></circle><circle cx="164" cy="196" r="12"></circle></svg>'
        drag.contentEditable = false
        drag.onmousedown = e => {
          if (e.button == 0)
            view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, getPos())))
        }

        const tweetFrameContainer = (document.createElement('div'))
        tweetWrapper.append(tweetFrameContainer)
      // const blockquote = appendTweetQuote(tweetWrapper);
      setTimeout(async()=>{
        let twt = await window?.twttr?.widgets?.createTweet(tweetId, tweetFrameContainer);
        loader.remove()

        // foundTweet=true
      },10)
      // const wrapper = document.createElement('div');
      // // const figcaption = document.createElement('figcaption');

      // wrapper.classList.add('figure_wrapper');
      // wrapper.contentEditable = 'false';


      // blockquote.onclick = () => {
      //   if (typeof getPos === 'function') {
      //     this.editor.commands.setNodeSelection(getPos());
      //   }
      // };

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

export default Twitter


const getTweetIdFromUrl =async (url) =>{
  let embed = await axios.get('https://req.prototypr.io/https://publish.twitter.com/oembed?url='+url)
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    console.log(error);
    alert('Try a different twitter url')
    return false
  });

  return embed
}