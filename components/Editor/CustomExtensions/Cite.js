
import { Mark, mergeAttributes } from '@tiptap/core'
// https://www.codemzy.com/blog/tiptap-video-embed-extension

const Cite = Mark.create({
  name: 'cite', // unique name for the Node
//   group: 'block', // belongs to the 'block' group of extensions
priority: 1000,

inclusive: true,

//   selectable: true, // so we can select the video
//   draggable: true, // so we can drag the video
//   atom: true, // is a single unit

  parseHTML() {
    return [
      {
        tag: 'cite',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
      return ['cite', mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setCite: attributes => ({ chain }) => {
        return chain()
          .setMark(this.name, attributes)
          .run()
      },

      toggleCite: attributes => ({ chain }) => {
        return chain()
          .toggleMark(this.name, attributes, { extendEmptyMarkRange: true })
          .run()
      },

      unsetCite: () => ({ chain }) => {
        return chain()
          .unsetMark(this.name, { extendEmptyMarkRange: true })
          .run()
      },
    }
  },
});

export default Cite