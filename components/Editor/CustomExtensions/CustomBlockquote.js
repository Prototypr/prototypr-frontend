import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core'

export const inputRegex = /^\s*>\s$/

export const Blockquote = Node.create({

  name: 'blockquote',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'block+',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      { tag: 'blockquote' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockquote', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),
      // and add a new one …
      class: {
        parseHTML:(element)=>{
            return element.getAttribute('class')
        },
        renderHTML: (attributes) => {
          if(attributes.class){
            return {
              class: attributes.class
            };
          }
        }
      },
    }
    },

  addCommands() {
    return {
      setBlockquote: () => ({ commands }) => {
        return commands.wrapIn(this.name)
      },
      toggleBlockquote: () => ({ commands }) => {
        return commands.toggleWrap(this.name)
      },
      unsetBlockquote: () => ({ commands }) => {
        return commands.lift(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
    }
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },
})