import { Node , mergeAttributes} from '@tiptap/core'
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from './IframeComponent'
// https://gist.github.com/kiranparajuli589/5d4ab7aaf9e9ad12bc7d2dfacbe2f96d
const Iframe = Node.create({
  name: 'iframe',
  group: 'block',
  priority:999,
  content: 'block+',
  defining: true,
  atom: true,
  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: 'block-iframe',
      },
    }
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      frameborder: {
        default: 0,
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
      width: {
        default: 500,
      },
      height: {
        default: 315,
      },
      title: {
        default: null,
      },
      allow: {
        default: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      }
    }
  },
  parseHTML() {
    return [{
      tag: 'iframe',
    },
  ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]]
  },
  addCommands() {
    return {
        // options:src,width,height
      setIframe: (options) => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

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
    return ReactNodeViewRenderer(Component);
  },
})

export default Iframe