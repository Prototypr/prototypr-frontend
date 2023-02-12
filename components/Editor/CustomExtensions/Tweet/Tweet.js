import { Node, mergeAttributes, nodePasteRule } from '@tiptap/core';

export const TWITTER_REG_G =
  /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(.+)?$/g;

const Twitter = Node.create({
  name: 'twitter',
  group: 'block',
  selectable: true,
  draggable: true,
  // atom:true,

  addOptions() {
    return {
      addPasteHandler: true,
    };
  },

  addAttributes() {
    return {
    figcaption:{
        default: null,
        parseHTML: element => {
          return element.querySelector('figcaption')?.innerText
        }
      },
      ['data-twitter-id']: {
        default: null,
        // force correct id
        parseHTML: (element) => element.getAttribute('data-twitter-id'),
      },
      url: {
        default: null,
      },
      pasted: false,
    };
  },

  addCommands() {
    return {
      insertTweet:
        () =>
        ({ commands }) => {
          commands.insertContent({
            type: this.name,
          });
          return true;
        },
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    return [
      nodePasteRule({
        find: TWITTER_REG_G,
        type: this.type,
        getAttributes: (match) => {
          return {
            ['data-twitter-id']: getTweetIdFromUrl(match.input),
            url: match.input,
            pasted: true,
          };
        },
      }),
    ];
  },

  parseHTML() {
    return [{
      tag:'blockquote',
      getAttrs: node =>{
        if(node.classList.contains('twitter-tweet')){
          return true
        }else{
          return false
        }},
    },]
},

  renderHTML({ HTMLAttributes }) {
    if (!HTMLAttributes.url) {
      return ['span'];
    }
    return['figure',
    // ['blockquote', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ['blockquote', mergeAttributes(HTMLAttributes, { draggable: false, contenteditable: false })],
    ['figcaption', HTMLAttributes?.figcaption?HTMLAttributes.figcaption:'']]
    // return ['div', mergeAttributes({ 'data-twitter': '' }, HTMLAttributes)];
  },

  addNodeView() {
    // return ReactNodeViewRenderer(TwitterComponent);
    return ({ node, getPos, editor}) => {
      const { view } = editor;
      const figcaption = document.createElement('input');


      let newUrl = ''
      if(!node.attrs.url){
        const container = document.createElement('div');
        container.style.position='relative'
        const tweetWrapper = document.createElement('div');
        tweetWrapper.style.position='relative'

        const twitterOverlay = document.createElement('div')
        twitterOverlay.setAttribute('class', 'twitterOverlay');
        twitterOverlay.style.display='none'
        container.appendChild(tweetWrapper)
        tweetWrapper.appendChild(twitterOverlay)
        const form= document.createElement('form')
        // onsubmit
        form.onsubmit = async (e) =>{
          e.preventDefault()

           //check link
           let url = e.target.fname?.value
           let foundTweet = false
           console.log(url)
           if(url && url.indexOf('/')>-1){
             //check if twitter
             let tweetId = url?.split('/')[5].split('?')[0];
             let twt = await window.twttr.widgets.createTweet(tweetId, container);
             foundTweet=true
             if(twt){
               editor.commands.updateAttributes('twitter', {
                 ...node.attrs,
                 pasted: false,
                 url:url
               });
               newUrl = url
               twitterOverlay.style.display='block'
               form.remove()

               
               // wrapper.classList.add('figure_wrapper');
               // wrapper.contentEditable = 'false';
               
                figcaption.setAttribute('data-placeholder', 'Caption (optional)');
                figcaption.setAttribute('draggable', 'false');
                figcaption.setAttribute('placeholder', 'Insert a caption (optional)');
                figcaption.addEventListener('keydown', (e) => {
                  newUrl=url
                  editor.commands.updateAttributes('twitter', {
                    ...node.attrs,
                    url:newUrl,
                    figcaption: figcaption.value
                  });
                })
                container.appendChild(figcaption)

             }
           }

          // empty content
          if(!e.target.fname?.value){
            const pos = getPos()
            const from = pos
            const to = pos
            const tr = view.state.tr
            tr.delete(from, to+1)
            view.dispatch(tr);

            setTimeout(()=>{
              editor.chain()
              .insertContentAt(pos, `<p></p><p></p>`, {
                updateSelection: true,
                parseOptions: {
                  preserveWhitespace: 'full',
                }
              }).focus().run()
            },200)
            // setTimeout(()=>{
            //   editor.chain().setTextSelection(pos+2).focus().run()
            // },200)
          }else if(!foundTweet){
            const pos = getPos()
            const from = pos
            const to = pos
            const tr = view.state.tr
            tr.delete(from, to+1)
            view.dispatch(tr);

            editor.chain()
            .insertContentAt(pos, `<p>${input.value}</p><p></p>`, {
              updateSelection: true,
              parseOptions: {
                preserveWhitespace: 'full',
              }
            }).focus().run()
            // setTimeout(()=>{
            //   editor.chain().setTextSelection(pos+2).focus().run()
            // },200)
          }
        }
        const input = document.createElement('input')
        // input.type = 'text'
        input.setAttribute('class', 'editorInput')
        input.setAttribute('id', 'fname')
        input.setAttribute('name', 'fname')
        input.placeholder='Paste a tweet link and press enter to embed'
        form.appendChild(input)

        container.appendChild(form)
        // input field
        input.addEventListener('keydown', (e) => {
          if(e.key=='Backspace' && input.value==''){
            const pos = getPos()
            const from = pos
            const to = pos
            const tr = view.state.tr
            tr.delete(from, to+1)
            view.dispatch(tr);

            setTimeout(()=>{
              editor.chain()
              .insertContentAt(pos-1, '<p></p>', {
                updateSelection: true,
                parseOptions: {
                  preserveWhitespace: 'full',
                }
              }).focus().run()
            },100)
          }
          // space bar pressed
          if(e.key==' '){
            const pos = getPos()
            const from = pos
            const to = pos
            const tr = view.state.tr
            tr.delete(from, to+1)
            view.dispatch(tr);

            setTimeout(()=>{
              editor.chain()
              .insertContentAt(pos, `<p>${input.value}&nbsp;</p>`, {
                updateSelection: true,
                parseOptions: {
                  preserveWhitespace: 'full',
                }
              }).focus().run()
            },100)
          }
          // return false;
        });
        setTimeout(()=>{
          input.focus()
        },250)
        input.addEventListener('mousedown', (e) => {
          // If we don't do this, we can't click the input. No idea why.
          e.preventDefault();
          input.focus()
          return false;
        });

        return {
          dom: container,
          // contentDOM: figcaption,
          ignoreMutation(p) {
            console.log(p)
            return true
          },
          stopEvent(e) {
            return true
          },
          update: (updatedNode) => {
            if (updatedNode.type !== this.type) {
              return false;
            }
  
            // figcaption.classList.toggle('empty', updatedNode.content.size === 0);
  
            return true;
          },
        };
      }
      // let { src, alt, title } = node.attrs;
      const container = document.createElement('figure');
      container.setAttribute('draggable', 'true');

      container.style.height='200px'
      container.style.width='200px'
      container.style.background='pink'

      const wrapper = document.createElement('div');
      // const figcaption = document.createElement('figcaption');

      wrapper.classList.add('figure_wrapper');
      wrapper.contentEditable = 'false';

      figcaption.classList.add('editable_text');
      figcaption.setAttribute('data-placeholder', 'Caption (optional)');
      // figcaption.setAttribute('contenteditable', true);
      figcaption.setAttribute('draggable', 'false');
      figcaption.ondragstart=(e)=>{
        e.preventDefault()
        return false
      }
      figcaption.value = `feafew`

      
      if (node.childCount === 0) {
        figcaption.classList.add('empty');
      }

      container.appendChild(wrapper);
      container.appendChild(figcaption);

      const blockquote = appendTweetQuote(wrapper);
      blockquote.setAttribute('class','twitter-tweet')
      blockquote.innerHTML = `<p>${node.textContent}</p>`

      // blockquote.onclick = () => {
      //   if (typeof getPos === 'function') {
      //     this.editor.commands.setNodeSelection(getPos());
      //   }
      // };

      return {
        dom: container,
        // contentDOM: figcaption,
        ignoreMutation(p) {
          if (p.type === 'attributes' && p.attributeName != null) {
            if (['src', 'title', 'alt'].includes(p.attributeName)) {
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

          figcaption.classList.toggle('empty', updatedNode.content.size === 0);

          return true;
        },
      };
    };
  },
});

export default Twitter


function appendTweetQuote(wrapper) {
  const blockquote = document.createElement('blockquote');
  wrapper.appendChild(blockquote);
  return blockquote;
}