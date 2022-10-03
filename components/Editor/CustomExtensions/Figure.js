import {
    Node,
    nodeInputRule,
    mergeAttributes,
    findChildrenInRange,
    Tracker,
  } from '@tiptap/core'
  import { ReactNodeViewRenderer } from "@tiptap/react";
  import FigureComponent from './Figure/FigureComponent';
  import { PluginKey , Plugin} from "prosemirror-state";
  import {Decoration, DecorationSet} from "prosemirror-view"

  export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/
  export const ImageDecorationKey = new PluginKey('image-decoration');

const Figure = Node.create({
    name: 'figure',
  
    addOptions() {
      return {
        HTMLAttributes: {},
      }
    },
  
    group: 'block',
  
    content: 'inline*',
  
    draggable: true,

    selectable:true,
  
    isolating: true,

    atom: true,
    // selectable:true,
    priority: 900,
  
  
    addAttributes() {
      return {
        src: {
          default: null,
          parseHTML: element => element.querySelector('img')?.getAttribute('src'),
        },
  
        alt: {
          default: null,
          parseHTML: element => element.querySelector('img')?.getAttribute('alt'),
        },
  
        title: {
          default: null,
          parseHTML: element => element.querySelector('img')?.getAttribute('title'),
        },
        class: {
          default: null,
          parseHTML: element => element.querySelector('img')?.getAttribute('class'),
        },
        figcaption:{
          default: null,
          parseHTML: element => {
            return element.querySelector('figcaption')?.innerText
          },
        },
        
        link: { parseHTML: (element) => {
          if(element.querySelector('a')){
            return element.querySelector('a')?.getAttribute('title')
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
      ]
    },
  
    renderHTML({ HTMLAttributes }) {

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
        ['figcaption', HTMLAttributes.figcaption],
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
          const [, alt, src, title] = match
  
          return { src, alt, title }
        }}),
      ]
    },
    addProseMirrorPlugins() {
        const editor = this.editor
        return [
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

        addNodeView() {return ReactNodeViewRenderer(FigureComponent)}
  })

  export default Figure