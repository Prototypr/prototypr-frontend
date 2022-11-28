import { Node } from '@tiptap/core';
import { TextSelection } from 'prosemirror-state';

const Figcaption = Node.create({
  name: 'figcaption',
  content: 'inline*',

  parseHTML() {
    return [{ tag: 'figcaption' }];
  },

  renderHTML() {
    return ['figcaption', { class: 'figure-caption' }, 0];
  },

  addCommands() {
    return {
      exitImageCaption: () => ({ state, dispatch }) => {
        const { $from } = state.selection;
        const selectedNode = $from.parent;

        if (
          selectedNode.type.name === 'figcaption' &&
          selectedNode.eq($from.node(-1).lastChild)
        ) {
          const { tr } = state;
          const pos = $from.end() + 2;
          tr.replaceRangeWith(pos, pos, state.schema.nodes.paragraph.create());
          tr.setSelection(TextSelection.create(tr.doc, pos + 1));
          dispatch(tr.scrollIntoView());
          return true;
        }
      },
    };
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const { view } = editor;

      const figcaptionDiv = document.createElement('figcaption');


      figcaptionDiv.classList.add('editable_text');
      figcaptionDiv.setAttribute('data-placeholder', 'Caption (optional)');
      figcaptionDiv.setAttribute('contenteditable', true);
      figcaptionDiv.setAttribute('draggable', 'false');
      
      if (node.textContent?.length==0) {
        figcaptionDiv.classList.add('empty');
      }else{
        figcaptionDiv.classList.remove('empty');
        // figcaptionDiv.classList.add('empty');
      }
      figcaptionDiv.addEventListener('keyup', () => {
        if (typeof getPos === 'function') {
          alert('hi')
          // … dispatch a transaction, for the current position in the document …
          view.dispatch(view.state.tr.setNodeMarkup(getPos(), undefined, {
            count: node.attrs.count + 1,
          }))
  
          // … and set the focus back to the editor.
          editor.commands.focus()
        }
      })

   

      return {
        dom: figcaptionDiv,
        contentDOM: figcaptionDiv,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          
          figcaptionDiv.classList.toggle('empty', updatedNode.content.size === 0);
          
          return true;
        },
      };
    };
  },


  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.exitImageCaption(),
    };
  },
});

export default Figcaption;