import {
  Node,
  nodeInputRule,
  findChildrenInRange,
  Tracker,
  mergeAttributes,
} from "@tiptap/core";
//   import { JSONContent } from '@tiptap/react';
import { TextSelection } from "prosemirror-state";
import { PluginKey, Plugin } from "prosemirror-state";
//   import {Decoration, DecorationSet} from "prosemirror-view"

//   export const ImageDecorationKey = new PluginKey('image-decoration');

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

const Figure = Node.create({
  name: "figure",
  // defaultOptions: {
  //   HTMLAttributes: {},
  // },
  group: "block",
  content: "image?video?figcaption?",
  draggable: true,
  inline: false,
  atom: true,
  defining: true,
  selectable: true,
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => {
          if (element.querySelector("img")?.getAttribute("src")) {
            return element.querySelector("img")?.getAttribute("src");
          } else if (element.querySelector("video")?.getAttribute("src")) {
            return element.querySelector("video")?.getAttribute("src");
          }

          return false;
        },
      },
      alt: {
        default: null,
        parseHTML: element => {
          if (element.querySelector("img")?.getAttribute("alt")) {
            return element.querySelector("img")?.getAttribute("alt");
          } else if (element.querySelector("video")?.getAttribute("alt")) {
            return element.querySelector("video")?.getAttribute("alt");
          }
          return false;
        },
      },
      title: {
        default: null,
        parseHTML: element =>
          element.querySelector("img")?.getAttribute("title"),
      },
      figureType: {
        default: "image",
        parseHTML: element => {
          if (element.querySelector("img")) {
            return "image";
          } else if (element.querySelector("video")) {
            return "video";
          }
        },
      },

      width: {
        default: null,
        parseHTML: element => {
          if (element.nodeName == "FIGURE") {
            return element.getAttribute("width");
          }
        },
      },
      link: {
        parseHTML: element => {
          if (element.querySelector("a")) {
            return element.querySelector("a")?.getAttribute("href");
          } else if (element.parentElement?.nodeName == "A") {
            var url = element.parentElement.getAttribute("href");
            return url;
          } else {
            return null;
          }
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "figure" }];
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new Plugin({
        props: {
          handleDOMEvents: (view, e) => {
            console.log(e);
          },
          handleKeyDown: (view, e) => {
            if (e.key == "Backspace") {
              return;
            }

            let $pos = view.state.doc.resolve(
              view.state.selection?.$anchor.pos
            );

            if ($pos?.nodeAfter?.type.name == "figure") {
              //if caret in text caption
              if (
                $pos.nodeAfter.firstChild?.type?.name == "text" ||
                $pos.nodeAfter.firstChild == null
              ) {
                let returnPos = $pos.pos;
                for (let d = $pos.depth; d > 0; d--) {
                  let prevNode = $pos.node(d);
                  if (prevNode?.type?.name == "figure") {
                    returnPos = $pos.before(d);
                    break;
                  }
                }

                if (e.key == "Enter") {
                  editor
                    .chain()
                    .focus()
                    .setNodeSelection(returnPos)
                    // .insertContentAt(pos+1, '<p></p>', {
                    //   updateSelection: false,
                    //   parseOptions: {
                    //     preserveWhitespace: 'full',
                    //   }
                    // })
                    .run();
                }
              } else {
                const { $from } = this.editor.state.selection;
                const selectedNode = $from.nodeAfter;

                let ev = e; // Event object 'ev'
                var key = ev.which || ev.keyCode; // Detecting keyCode
                // Detecting Ctrl
                var ctrl = ev.ctrlKey
                  ? ev.ctrlKey
                  : ev.metaKey
                    ? ev.metaKey
                    : key === 17
                      ? true
                      : false;
                // If key pressed is V and if ctrl is true.
                if ((key == 86 && ctrl) || ctrl) {
                } else if ((key == 67 && ctrl) || ctrl) {
                  // If key pressed is C and if ctrl is true.
                  console.log("Ctrl+C is pressed.");
                } else if (
                  e.key !== "Enter" &&
                  selectedNode.type.name === "figure" &&
                  !selectedNode.maybeChild(1)
                ) {
                  return (
                    this.editor
                      .chain()
                      // Go through the image.
                      .insertContentAt($pos.pos + 2, "<figcaption></ficaption>")
                      //   .setTextSelection($pos.pos + 1)
                      .scrollIntoView()
                      .run()
                  );
                } else if (
                  e.key !== "Enter" &&
                  selectedNode.type.name === "figure" &&
                  selectedNode.maybeChild(1)
                ) {
                  this.editor
                    .chain()
                    // Go through the image.
                    // .insertContentAt($pos.pos+1,'<figcaption></ficaption>')
                    .setTextSelection($pos.pos + 3)
                    .scrollIntoView()
                    .run();
                }
              }
            }
          },
        },
        filterTransaction: (transaction, state) => {
          // console.log(transaction)
          let result = true; // true for keep, false for stop transaction
          if (transaction?.curSelection?.node?.type.name == "image") {
            result = false;
          }
          if (transaction?.curSelection?.node?.type.name == "video") {
            result = false;
          }
          if (
            transaction?.curSelection?.$anchor?.parent?.type.name ==
            "figcaption"
          ) {
            if (transaction?.curSelection?.$anchor?.parentOffset == 0) {
              if (
                transaction?.curSelection?.$anchor?.parent.textContent?.length >
                0
              ) {
                result = false;
                var path = transaction?.curSelection?.$anchor?.path;
                for (var i = path.length - 1; i >= 0; i--) {
                  if (path[i]?.type?.name == "figure") {
                    let fignode = path[i];
                    if (fignode.childCount == 1) {
                      result = true;
                    } else if (fignode.childCount == 2) {
                      result = true;
                    }
                  }
                }
              }
            }
          }
          // if(transaction?.curSelection?.$anchor?.parent?.type.name=='figcaption'){
          //     //check the key pressed

          //     if(transaction?.curSelection?.$anchor?.parentOffset==0){
          //         if(transaction?.curSelection?.$anchor?.parent.textContent?.length>0){
          //                 if(transaction?.curSelection?.$anchor?.path?.length){
          //                     console.log('tr',transaction)
          //                     var path = transaction?.curSelection?.$anchor?.path
          //                     console.log(path)
          //                     for (var i = path.length - 1; i >= 0; i--) {
          //                         if(path[i]?.type?.name=='figure'){
          //                             let fignode = path[i]
          //                             console.log('insidecount',fignode.childCount)
          //                             childcount=fignode.childCount
          //                             if(fignode.childCount==1){
          //                                 result = false
          //                             }
          //                         }
          //                     }
          //                 }
          //         }
          //     }
          //     console.log('fig',transaction)
          // }
          return result;
        },
        // appendTransaction:(transactions, oldState, newState)=>{
        //     const tr = newState.tr;
        //     let modified = false;

        //     if (!transactions[0].docChanged) {
        //         return tr;
        //     }

        //     let oldFigureHadImage = false
        //     if(oldState?.selection?.$anchor?.path?.length){
        //         var path = oldState?.selection?.$anchor?.path
        //         for (var i = path.length - 1; i >= 0; i--) {
        //             if(path[i]?.type?.name=='figure'){
        //                 let fignode = path[i]
        //                 if(fignode.childCount==2){
        //                     oldFigureHadImage=true
        //                 }
        //             }
        //         }
        //     }

        //     let newStateHasImage = false
        //     if(newState?.selection?.$anchor?.path?.length){
        //         var path = newState?.selection?.$anchor?.path
        //         for (var i = path.length - 1; i >= 0; i--) {
        //             if(path[i]?.type?.name=='figure'){
        //                 let fignode = path[i]
        //                 if(fignode.childCount==1){
        //                     newStateHasImage=false
        //                 }
        //             }
        //         }
        //     }
        //     if(oldFigureHadImage==true && newStateHasImage == false){
        //         console.log('hey stop!')
        //         return false
        //     }

        // }
      }),
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "figure",
      {
        style: `width:${node?.attrs?.width}`,
        width: node?.attrs?.width,
        class: "figure",
        ["data-link"]: node?.attrs?.link ? node?.attrs?.link : "",
      },
      0,
    ];
  },

  addCommands() {
    return {
      setFigure:
        ({ caption, ...attrs }) =>
        ({ chain }) => {
          if (attrs.figureType == "image") {
            const content = [{ type: "image", attrs }];

            // if (caption) {
            //   content.push({ type: 'figcaption', text: caption });
            // }
            content.push({ type: "figcaption", text: "" });

            return (
              chain()
                // Delete current empty node.
                .command(({ commands, state }) => {
                  return !state.selection.$from.parent.textContent
                    ? commands.keyboardShortcut("Backspace")
                    : true;
                })
                .insertContent({
                  type: this.name,
                  attrs,
                  content,
                })

                // set cursor at end of caption field
                .command(({ tr, commands }) => {
                  const { doc, selection } = tr;
                  const position = doc.resolve(selection.to - 2).end();

                  return commands.setTextSelection(position);
                })
                .run()
            );
          } else if (attrs.figureType == "video") {
            console.log(attrs)
            const content = [{ type: "video", attrs }];

            // if (caption) {
            //   content.push({ type: 'figcaption', text: caption });
            // }
            content.push({ type: "figcaption", text: "" });

            return (
              chain()
                // Delete current empty node.
                .command(({ commands, state }) => {
                  return !state.selection.$from.parent.textContent
                    ? commands.keyboardShortcut("Backspace")
                    : true;
                })
                .insertContent({
                  type: this.name,
                  attrs,
                  content,
                })

                // set cursor at end of caption field
                .command(({ tr, commands }) => {
                  const { doc, selection } = tr;
                  const position = doc.resolve(selection.to - 2).end();

                  return commands.setTextSelection(position);
                })
                .run()
            );
          }
        },

      imageToFigure:
        () =>
        ({ tr, commands }) => {
          const { doc, selection } = tr;
          const { from, to } = selection;
          const images = findChildrenInRange(
            doc,
            { from, to },
            node => node.type.name === "image"
          );

          if (!images.length) {
            return false;
          }

          const tracker = new Tracker(tr);

          return commands.forEach(images, ({ node, pos }) => {
            const mapResult = tracker.map(pos);

            if (mapResult.deleted) {
              return false;
            }

            const range = {
              from: mapResult.position,
              to: mapResult.position + node.nodeSize,
            };

            return commands.insertContentAt(range, {
              type: this.name,
              attrs: {
                src: node.attrs.src,
              },
            });
          });
        },

      figureToImage:
        () =>
        ({ tr, commands }) => {
          const { doc, selection } = tr;
          const { from, to } = selection;
          const figures = findChildrenInRange(
            doc,
            { from, to },
            node => node.type.name === this.name
          );

          if (!figures.length) {
            return false;
          }

          const tracker = new Tracker(tr);

          return commands.forEach(figures, ({ node, pos }) => {
            const mapResult = tracker.map(pos);

            if (mapResult.deleted) {
              return false;
            }

            const range = {
              from: mapResult.position,
              to: mapResult.position + node.nodeSize,
            };

            return commands.insertContentAt(range, {
              type: "image",
              attrs: {
                src: node.attrs.src,
              },
            });
          });
        },

      moveCursorToCaption:
        () =>
        ({ state, chain }) => {
          const { anchor } = state.selection;

          return (
            chain()
              // Go through the image.
              .setTextSelection(anchor + 1)
              .scrollIntoView()
              .run()
          );
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({ find: inputRegex, type: this.type }, match => {
        const [, alt, src, title] = match;

        return { src, alt, title };
      }),
    ];
  },

  addKeyboardShortcuts() {
    const replaceFigureWithParagraph = () => {
      const { $from, from, anchor } = this.editor.state.selection;
      const selectedNode = $from.parent;

      if (selectedNode.type.name === "figure") {
        const { tr } = this.editor.state;

        tr.replaceRangeWith(
          from - 1,
          from + selectedNode.nodeSize - 1,
          this.editor.state.schema.nodes.paragraph.create()
        )
          .setSelection(TextSelection.create(tr.doc, anchor))
          .scrollIntoView();
        this.editor.view.dispatch(tr);

        return true;
      }
      // else if (selectedNode.type.name === 'figcaption'){
      //     let $pos = this.editor.view.state.doc.resolve(from-1)
      //     console.log($pos)
      //     if($pos?.parent?.type?.name=='figure'){
      //         // alert('stop it')
      //         const { tr } = this.editor.state;
      //         tr.replaceRangeWith(
      //             from - 1,
      //             from + selectedNode.nodeSize - 1,
      //             this.editor.state.schema.nodes.paragraph.create(),
      //           )
      //         // return false
      //     }

      // }
    };

    const moveCursorToCaption = () => {
      const { $from } = this.editor.state.selection;
      const selectedNode = $from.parent;

      if (selectedNode.type.name === "figure" && selectedNode.maybeChild(1)) {
        return this.editor.commands.moveCursorToCaption();
      }
    };

    return {
      Enter: moveCursorToCaption,
      Backspace: replaceFigureWithParagraph,
      Delete: replaceFigureWithParagraph,
    };
  },
});

export default Figure;
