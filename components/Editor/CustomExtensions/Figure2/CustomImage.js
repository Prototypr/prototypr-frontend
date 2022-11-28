import {
    mergeAttributes,
    Node,
    nodeInputRule,
  } from '@tiptap/core'
  import { PluginKey , Plugin} from "prosemirror-state";
import {Decoration, DecorationSet} from "prosemirror-view"

export const ImageDecorationKey = new PluginKey('image-decoration');

  
  export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/
  
  export const Image = Node.create({
    name: 'image',
    // selectable:false,
  
    addOptions() {
      return {
        inline: false,
        allowBase64: false,
        HTMLAttributes: {},
      }
    },
  
    inline() {
      return this.options.inline
    },
  
    group() {
      return this.options.inline ? 'inline' : 'block'
    },
  
    draggable: false,
  
    addAttributes() {
      return {
        src: {
          default: null,
        },
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
        link: { parseHTML: (element) => {
            if(element.getAttribute('link')){
                return element.getAttribute("link")
            }
        } },
      }
    },
  
    parseHTML() {
      return [
        {
          tag: this.options.allowBase64
            ? 'img[src]'
            : 'img[src]:not([src^="data:"])',
        },
      ]
    },

    addProseMirrorPlugins() {
        const editor = this.editor
        return [
            new Plugin({
                props: {

            handleKeyDown:(view, e)=>{
                let $pos = view.state.doc.resolve(view.state.selection?.$anchor.pos)

                if($pos.parent?.type.name=='figure'){

                    // e.preventDefault()
                }
            },
                  handleClick:(view, e)=>{
                    
                    let $pos = view.state.doc.resolve(view.state.selection?.$anchor.pos)
                                        
                    if($pos.parent?.type.name=='figure'){
                        let $parent = view.state.doc.resolve($pos.pos-1)
                        console.log($parent)
                        editor.chain().focus()
                        .setNodeSelection($parent.pos)
                        .run()
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
  
    // renderHTML({ HTMLAttributes }) {
    //   return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    // },
    renderHTML:(props)=> {
        if (props.HTMLAttributes.link) {
          const linkattrs = {
            href: props.HTMLAttributes.link,
            target: "_blank",
            rel: "noopener noreferrer nofollow",
            class:props.HTMLAttributes.class,
          }
          return [
            "a",
            linkattrs,
            ["img", {...props.HTMLAttributes, draggable:false}]
          ];
        }
        return [
          "img",
          {...props.HTMLAttributes, draggable:false}
        ];
      },
  
    addCommands() {
      return {
        setImage: options => ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
      }
    },
  
    addInputRules() {
      return [
        nodeInputRule({
          find: inputRegex,
          type: this.type,
          getAttributes: match => {
            const [,, alt, src, title] = match
  
            return { src, alt, title }
          },
        }),
      ]
    },
  })