import {
  Node,
  nodeInputRule,
  mergeAttributes,
  findChildrenInRange,
  Tracker,
} from '@tiptap/core'
// import { ReactNodeViewRenderer } from "@tiptap/react";
// import FigureComponent from './Figure/FigureComponent';
import { PluginKey , Plugin} from "prosemirror-state";
import {Decoration, DecorationSet} from "prosemirror-view"

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/
export const ImageDecorationKey = new PluginKey('image-decoration');

export const FigCaption = Node.create({
  name: 'figcaption',
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  content: 'inline*',
  selectable: true,
  draggable: false,

  parseHTML() {
    return [
      {
        tag: 'figcaption',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['figcaption', mergeAttributes(HTMLAttributes), 0]
  },
})

export const Figure = Node.create({
  name: 'figure',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',
  //todo, make fig captions their own component - this is a bit of a hack
  // content: 'block figcaption',
  content: 'inline*',
  draggable: true,
  isolating: true,
  defining: true,
  selectable: true,


  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element =>{ 
          if(element.nodeName=='IMG'){
            return element?.getAttribute('src')
          } else{
            return element.querySelector('img')?.getAttribute('src')
          } 
        },
      },

      alt: {
        default: null,
        parseHTML: element => {
          if(element.nodeName=='IMG'){
            return element?.getAttribute('alt')
          } else{
            return element.querySelector('img')?.getAttribute('alt')
          }         
        },
      },

      title: {
        default: null,
        parseHTML: element =>{
          if(element.nodeName=='IMG'){
            return element?.getAttribute('title')
          } else{
            return element.querySelector('img')?.getAttribute('title')
          }    
        },
      },
      class: {
        default: null,
        parseHTML: element => {
          if(element.nodeName=='IMG'){
            return element?.getAttribute('class')
          } else{
            return element.querySelector('img')?.getAttribute('class')
          }    
        },
      },
      figcaption:{
        default: null,
        parseHTML: element => {
          if(element.nodeName=='FIGURE'){

            return element.querySelector('figcaption')?.innerHTML
          }
        },
      },
      link: { parseHTML: (element) => {
        if(element.querySelector('a')){
          return element.querySelector('a')?.getAttribute('href')
        }
        else if(element.parentElement?.nodeName=='A') {
         var url = element.parentElement.getAttribute("href")
         return url
        }else{
          return null
        }
      }
      },

    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
        // contentElement: 'figcaption',
        getAttrs: node =>{
          if((node?.firstElementChild?.classList?.contains('twitter-tweet') || node?.firstElementChild?.nodeName=='IFRAME')
          ||node?.firstElementChild?.nodeName=='VIDEO'){
            return false
          }else{
            return true
          }},
      },
      {
        tag: 'img',
        // contentElement: 'figcaption',
        getAttrs: node =>{
          return true
          },
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {

    if (HTMLAttributes.link) {
      const linkattrs = {
        href: HTMLAttributes.link,
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class:HTMLAttributes.class,
      }
      return [
        'figure',
        ["a",
          linkattrs,
          ['img', mergeAttributes(HTMLAttributes, { draggable: false, contenteditable: false })],
       ],
        ['figcaption', HTMLAttributes.figcaption]
      ];
    }

    return [
      'figure',
      ['img', mergeAttributes(HTMLAttributes, { draggable: false, contenteditable: false })],
      ['figcaption', HTMLAttributes?.figcaption?HTMLAttributes.figcaption:''],
    ]
  },

  addCommands() {
    return {
      setFigure: ({ position,caption, ...attrs }) => ({ chain }) => {

          return chain()
          .insertContentAt(position,{
            type: this.name,
            attrs,
            content: caption
              ? [{ type: 'text', text: caption }]
              : [],
          })
          // set cursor at end of caption field
          .command(({ tr, commands }) => {
            const { doc, selection } = tr
            const position = doc.resolve(selection.to - 2).end()

            return commands.setTextSelection(position)
          })
          .run()
      },

      imageToFigure: () => ({ tr, commands }) => {
        const { doc, selection } = tr
        const { from, to } = selection
        const images = findChildrenInRange(doc, { from, to }, node => node.type.name === 'image')

        if (!images.length) {
          return false
        }

        const tracker = new Tracker(tr)

        return commands.forEach(images, ({ node, pos }) => {
          const mapResult = tracker.map(pos)

          if (mapResult.deleted) {
            return false
          }

          const range = {
            from: mapResult.position,
            to: mapResult.position + node.nodeSize,
          }

          return commands.insertContentAt(range, {
            type: this.name,
            attrs: {
              src: node.attrs.src,
            },
          })
        })
      },

      figureToImage: () => ({ tr, commands }) => {
        const { doc, selection } = tr
        const { from, to } = selection
        const figures = findChildrenInRange(doc, { from, to }, node => node.type.name === this.name)

        if (!figures.length) {
          return false
        }

        const tracker = new Tracker(tr)

        return commands.forEach(figures, ({ node, pos }) => {
          const mapResult = tracker.map(pos)

          if (mapResult.deleted) {
            return false
          }

          const range = {
            from: mapResult.position,
            to: mapResult.position + node.nodeSize,
          }

          return commands.insertContentAt(range, {
            type: 'image',
            attrs: {
              src: node.attrs.src,
            },
          })
        })
      },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({find:inputRegex, type:this.type, match:match => {
        const [figcaption, alt, src, title] = match
        return { src, alt, title, figcaption }
      }}),
    ]
  },
  addProseMirrorPlugins() {
      const editor = this.editor
      return [
        new Plugin({
          props: {
            handleKeyDown:(view, e)=>{
              
               let $pos = view.state.doc.resolve(view.state.selection?.$anchor.pos)

               if($pos?.parent?.type.name=='figure'){
                  //if caret in text caption
                  if($pos.parent.firstChild?.type?.name=='text' || $pos.parent.firstChild==null){
                    let returnPos = $pos.pos
                    for (let d = $pos.depth; d > 0; d--) {
                      let prevNode = $pos.node(d)
                      if(prevNode?.type?.name=='figure'){
                        returnPos = $pos.before(d)
                        break;
                      }
                    }
    
                    if(e.key=='Enter'){
                        editor.chain().focus()
                        .setNodeSelection(returnPos)
                        // .insertContentAt(pos+1, '<p></p>', {
                        //   updateSelection: false,
                        //   parseOptions: {
                        //     preserveWhitespace: 'full',
                        //   }
                        // })
                        .run()
                      }
                }
                }
                //if image part is selected, nodAfter will be figure, so set the caption as text selection
                else{
                  let ev = e;  // Event object 'ev'
                var key = ev.which || ev.keyCode; // Detecting keyCode
                // Detecting Ctrl
                var ctrl = ev.ctrlKey ? ev.ctrlKey :ev.metaKey?ev.metaKey: ((key === 17 )
                    ? true : false);
                // If key pressed is V and if ctrl is true.
                if ((key == 86 && ctrl) || (ctrl)) {
                }
                else if ((key == 67 && ctrl) || (ctrl)) {              
                    // If key pressed is C and if ctrl is true.
                    console.log("Ctrl+C is pressed.");
                }


                else if($pos.nodeAfter?.type?.name=='figure' && e.key!=='Backspace'){
                  editor.chain().focus()
                  .setTextSelection($pos.pos+1)
                  .run()
                }
                
                }
              
            }
          }
        }),
        new Plugin({
          key:ImageDecorationKey,
          state: {
            init() { return DecorationSet.empty },
            apply(tr, set) {
              // Adjust decoration positions to changes made by the transaction
              set = set.map(tr.mapping, tr.doc)
              // See if the transaction adds or removes any placeholders
              let action = tr.getMeta(this)
              if (action && action.add) {
                let placeholderWidget = document.createElement("div")
                placeholderWidget.innerHTML = `<div style="z-index:49" class="bg-opacity-60	absolute text-gray-700 flex flex-col justify-center top-0 left-0 w-full h-full bg-white transition-all duration-200">
                <svg class="opacity-60 z-40 animate-spin h-8  mx-auto w-8 max-w-full max-h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" fill="currentColor"/></svg>
                </div>`
                placeholderWidget.style.position=action.add.position?action.add.position:'relative'
                placeholderWidget.style.display='inline-block'
                
                let imgPlaceholderContainer = document.createElement('div')
                imgPlaceholderContainer.style.height=action.add.height+'px'
                imgPlaceholderContainer.style.width=action.add.width+'px'
                imgPlaceholderContainer.style.backgroundColor="#E3E5FF"
                imgPlaceholderContainer.style.borderRadius="2px"
                imgPlaceholderContainer.style.zIndex=5
                imgPlaceholderContainer.style.position='relative'
                placeholderWidget.appendChild(imgPlaceholderContainer)
  
                let imgPlaceholder = document.createElement('img')
                imgPlaceholderContainer.appendChild(imgPlaceholder)
                imgPlaceholder.src=action.add.src
                imgPlaceholder.style.height=action.add.height+'px'
                imgPlaceholder.style.width=action.add.width+'px'
                imgPlaceholder.style.position='absolute'
                imgPlaceholder.style.top='0'
                imgPlaceholder.style.left='0'
                imgPlaceholder.style.objectFit='cover'
                imgPlaceholder.style.display='inline-block'
                imgPlaceholder.style.zIndex=5
                // imgPlaceholder.style.border='4px solid black!important'
                imgPlaceholder.classList.add('placeholderimg')
  
  
                
                let deco = Decoration.widget(action.add.pos, placeholderWidget, {id: action.add.id, type:action.add.type})
                set = set.add(tr.doc, [deco])
              } else if (action && action.remove) {
                set = set.remove(set.find(null, null,
                                          spec => spec.id == action.remove.id))
              }
              return set
            }
          },
          props: {
            decorations(state) { return this.getState(state) },
          },
         
        })
      ];
    },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const { view } = editor;
      let { src, alt, title, figcaption } = node.attrs;

      const container = document.createElement('figure');
      container.setAttribute('draggable', 'true');

      const wrapper = document.createElement('div');
      const figcaptionDiv = document.createElement('figcaption');

      wrapper.classList.add('figure_wrapper');
      wrapper.contentEditable = 'false';

      figcaptionDiv.classList.add('editable_text');
      figcaptionDiv.setAttribute('data-placeholder', 'Caption (optional)');
      figcaptionDiv.setAttribute('contenteditable', true);
      figcaptionDiv.setAttribute('draggable', 'false');
     
      figcaptionDiv.ondragstart=(e)=>{
        e.preventDefault()
        return false
      }
      
      if (node.childCount === 0) {
        figcaptionDiv.classList.add('empty');
      }

      container.appendChild(wrapper);
      container.appendChild(figcaptionDiv);

      const img = appendImgNode(src, wrapper);
      alt && img.setAttribute('alt', alt);
      title && img.setAttribute('title', title);

      img.onclick = () => {
        if (typeof getPos === 'function') {
          this.editor.commands.setNodeSelection(getPos());
        }
      };

      return {
        dom: container,
        contentDOM: figcaptionDiv,
        ignoreMutation(p) {
          console.log(p)
          if (p.type === 'attributes' && p.attributeName != null) {
            if (['src', 'title', 'alt', 'figcaption'].includes(p.attributeName)) {
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

          // set the figcaption to the textcontent          
          updatedNode.attrs.figcaption = updatedNode.textContent
          
          figcaptionDiv.classList.toggle('empty', updatedNode.content.size === 0);
          
          return true;
        },
      };
    };
  },
})

function appendImgNode(src, wrapper) {
  const image = document.createElement('img');
  image.setAttribute('src', sanitizeImg(src));
  wrapper.appendChild(image);
  return image;
}

function sanitizeImg(url) {
  return sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
}

function sanitize(url, protocols) {
  const anchor = document.createElement('a');
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

const keydownlistener = (e) =>{
  console.log(e)
  alert('papa')

}


