
import { Node, mergeAttributes } from '@tiptap/core'
// https://www.codemzy.com/blog/tiptap-video-embed-extension

const Video = Node.create({
  name: 'video', // unique name for the Node
  group: 'block', // belongs to the 'block' group of extensions
  draggable: false, // so we can drag the video
  atom: true, // is a single unit

  addAttributes() {
    return {
      "src": {
        default: null
      },
      width:{
        default:null
      },
      height:{
        default:null
      },
      class:{
        default:''
      },
      autoplay:{
        default:'autoplay'
      },
      loop:{
        default:'loop'
      },
      muted:{
        default:''
      },
      defaultMuted:{
        default:''
      },
      playsinline:{
        default:''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
      return ['video', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setVideo: ({ src,position,width,height,classNames, ...attrs }) => ({ chain }) => {
        return chain()
        .insertContentAt(position,{
          type: this.name,
          attrs:{src, width, height,class:classNames}
        })
          // .insertContent({
          //   type: this.name,
          //   attrs:{src, width, height,class:classNames}
          // })
          // set cursor at end of caption field
          .command(({ tr, commands }) => {
            const { doc, selection } = tr
            const position = doc.resolve(selection.to - 2).end()

            return commands.setTextSelection(position)
          })
          .run()
      },
    }
  }

  // addNodeView() {
  //   return ({ editor, node }) => {
  //     const div = document.createElement('div');
  //     div.className = 'aspect-w-16 aspect-h-9' + (editor.isEditable ? ' cursor-pointer' : '');
  //     const iframe = document.createElement('iframe');
  //     if (editor.isEditable) {
  //       iframe.className = 'pointer-events-none';
  //     }
  //     iframe.width = '640';
  //     iframe.height = '360';
  //     iframe.frameborder = "0";
  //     iframe.allowfullscreen = "";
  //     iframe.src = node.attrs.src;
  //     div.append(iframe);
  //     return {
  //       dom: div,
  //     }
  //   }
  // },
});

export default Video