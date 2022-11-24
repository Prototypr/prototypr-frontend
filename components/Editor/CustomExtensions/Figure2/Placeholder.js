import { Node } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';


const Placeholder = Node.create({
  name: 'placeholder',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc }) => {
            const decorations = [];
            let paragraphDecoration;

            doc.descendants((node, pos) => {
              switch (node.type.name) {
                case 'figure':
                  break;

                case 'figcaption':
                  if (!node.textContent) {
                    decorations.push(
                      Decoration.node(pos, pos + node.nodeSize, {
                        placeholder: this.options.imageCaption,
                      }),
                    );
                  }
                  return false;

                case 'paragraph':
                  if (this.editor.isEmpty) {
                    paragraphDecoration = Decoration.node(
                      pos,
                      pos + node.nodeSize,
                      {
                        placeholder: this.options.placeholder,
                      },
                    );
                  }
                  return false;

                default:
                  break;
              }
              return true;
            });

            if (paragraphDecoration) {
              decorations.push(paragraphDecoration);
            }

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default Placeholder;