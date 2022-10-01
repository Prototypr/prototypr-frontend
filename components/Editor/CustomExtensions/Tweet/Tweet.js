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
  parseHTML() {
    // return [{
    //     tag:'tweet',
    //   },]
      return [{
        tag:'blockquote',
        getAttrs: node =>{
          if(node.classList.contains('twitter-tweet')){
            return true
          }else{
            return false
          }},
        // class:'twitter-tweet'
      },]
      // return [{
      //   tag:'blockquote',
      //   class:'twitter-tweet'
      // },{
      //   tag:'tweet',
      // },]
  },
  renderHTML({ HTMLAttributes }) {
    return [
        "blockquote",
        // mergeAttributes(HTMLAttributes, { rel: this.options.rel }),
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        //  mergeAttributes( {class: 'twitter-tweet'},HTMLAttributes),

        0
      ];  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
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
                twttr?.widgets?.load()

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
})

export default Tweet