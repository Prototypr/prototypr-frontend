import { Node, mergeAttributes } from "@tiptap/core";
// import { createNodeViewBlock } from './utils/utils'
import { ReactNodeViewRenderer } from "@tiptap/react";
import Component from './TweetComponent'
import axios from 'axios'
const Tweet = Node.create({
  name: 'tweet',
  selectable:true,
  priority:999,
   
  content: 'block+',

  group: 'block',

  defining: true,
  atom: true,
  draggable: true,
  isolating:true,
  selectable:true,
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'twitter-tweet',
      },
    }
  },
  addAttributes() {
    return {
      figcaption:{
        default: null,
        parseHTML: element => {
          return element.querySelector('figcaption')?.innerText
        }
      }
    }
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
    // return [
    //     "blockquote",
    //     // mergeAttributes(HTMLAttributes, { rel: this.options.rel }),
    //     mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    //     //  mergeAttributes( {class: 'twitter-tweet'},HTMLAttributes),

    //     0
    //   ]; 
    return['figure',
    // ['blockquote', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ['blockquote', mergeAttributes(HTMLAttributes, { draggable: false, contenteditable: false })],
    ['figcaption', HTMLAttributes?.figcaption?HTMLAttributes.figcaption:'']]
     },

  // addNodeView() {
  //   return ReactNodeViewRenderer(Component);
  // },
  addCommands() {
    return {
        // options:src,width,height
      insertTweet: (input) => async ({ tr, dispatch, editor }) => {
        const { selection } = tr
        // const node = this.type.create(options)
      
        // const tweetHTML = `
        // <iframe src="${input}"/>
        // `
        // https://github.com/ueberdosis/tiptap/blob/ccc37d5f2469296ff28360679f67fc173929a29b/demos/src/Examples/Tables/React/index.jsx
        let embed = await axios.get('https://req.prototypr.io/https://publish.twitter.com/oembed?url='+input)
          .then(function (response) {
            return response
          })
          .catch(function (error) {
            console.log(error);
            alert('Try a different twitter url')
            return false
          });
       
        if(embed){
          if(embed.data?.html){
            var el = document.createElement('div')
            el.innerHTML = embed.data?.html
            var blockquote = el.outerHTML
            editor.chain().focus().insertContent(blockquote, {
              parseOptions: {
                preserveWhitespace: false,
              },
            }).run()
            setTimeout(()=>{
              if(typeof twttr=='undefined'){
                //embed twitter 
                const s = document.createElement("script");
                s.setAttribute("src", "https://platform.twitter.com/widgets.js");
                s.setAttribute("id", "twitter-widget");
                s.setAttribute("async", "true");
            
                if(!document.getElementById('twitter-widget')){
                  document.head.appendChild(s);
                  setTimeout(()=>{
                    twttr?.widgets?.load()

                  },200)
                }
              }else{

                twttr?.widgets?.load()
              }

            },200)
            // const from = getPos()
            // const to = from + node.nodeSize
            // editor.chain().deleteRange({ from, to }).insertContentAt(from,blockquote).blur().run()
          }
        }

   

        // if (dispatch) {
        //   tr.replaceRangeWith(selection.from, selection.to, node)
        // }

        return true
      },
      // insertIframe: (options) => ({ tr, dispatch }) => {
      //   const { selection } = tr
      //   const iframeHTML = `
      //   <iframe src="${options.src}"/>
      //   `
      //   const node = this.type.create(options)

      //   if (dispatch) {
      //     tr.replaceRangeWith(selection.from, selection.to, node)
      //   }

      //   return true
      // },
    }
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const { view } = editor;
      // let { src, alt, title } = node.attrs;

      const container = document.createElement('figure');
      container.setAttribute('draggable', 'true');

      const wrapper = document.createElement('div');
      const figcaption = document.createElement('figcaption');

      wrapper.classList.add('figure_wrapper');
      wrapper.contentEditable = 'false';

      figcaption.classList.add('editable_text');
      figcaption.setAttribute('data-placeholder', 'Caption (optional)');
      figcaption.setAttribute('contenteditable', true);
      figcaption.setAttribute('draggable', 'false');
      figcaption.ondragstart=(e)=>{
        e.preventDefault()
        return false
      }
      
      if (node.childCount === 0) {
        figcaption.classList.add('empty');
      }

      container.appendChild(wrapper);
      container.appendChild(figcaption);

      const blockquote = appendTweetQuote(wrapper);
      blockquote.setAttribute('class','twitter-tweet')
      blockquote.innerHTML = `<p>${node.textContent}</p>`

      blockquote.onclick = () => {
        if (typeof getPos === 'function') {
          this.editor.commands.setNodeSelection(getPos());
        }
      };

      return {
        dom: container,
        contentDOM: blockquote,
        ignoreMutation(p) {
          if (p.type === 'attributes' && p.attributeName != null) {
            if (['src', 'title', 'alt'].includes(p.attributeName)) {
              if (typeof getPos === 'function') {
                view.dispatch(
                  view.state.tr.setNodeMarkup(getPos(), undefined, {
                    [p.attributeName]: (p.target).getAttribute(p.attributeName),
                  })
                );
              }
            }
            return true;
          }

          return false;
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
})

export default Tweet

function appendTweetQuote(wrapper) {
  const blockquote = document.createElement('blockquote');
  wrapper.appendChild(blockquote);
  return blockquote;
}