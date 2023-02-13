import { styled } from '@stitches/react';
import { slate, indigo } from '@radix-ui/colors';

import { useFormik } from 'formik';
// import * as Yup from 'yup';
import React,{ useEffect,useState } from 'react';
import normalizeUrl from 'normalize-url';
import { TextSelection } from "prosemirror-state";


  const Fieldset = styled('fieldset', {
    all: 'unset',
    // marginBottom: 15,
    position:'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  });
  
  const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: 6,
    padding: '0px 36px 0 10px',
    // text-overflow:'ellipsis',
    fontSize: 15,
    lineHeight: 1,
    color: slate.slate6,
    // boxShadow: `0 0 0 1px ${indigo.indigo8}`,
    // backgroundColor:indigo.indogo9,
    height: 32,
    // '&:focus': { boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  });


  const LinkField = ({editor,closePopup, showRemove, isFigure}) =>{ 
    
    const [link, setLink] = useState();
    const firstFieldRef = React.useRef(null)

    useEffect(()=>{
      if (editor) {

        const selection = editor.state.selection
        const isTextSelection = selection instanceof TextSelection

        let previousUrl = editor.getAttributes("link").href;
        
        if(editor.isActive('blockLink')){
            previousUrl = editor.getAttributes("blockLink").href;
        }else if(editor.isActive('figure') && !isTextSelection){
          previousUrl = editor.getAttributes("image").link;

        }
        setLink(previousUrl)

        firstFieldRef?.current?.select()
      }
    },[])

    return(
    <>
          <Formy
            onCancel={()=>{
              closePopup()
              editor.commands.focus()
            }}
            showRemove={showRemove}
            link={link}
            editor={editor}
            firstFieldRef={firstFieldRef}
            />
    </>
  );}

  export default LinkField


  const Formy = ({ firstFieldRef,onCancel, link, editor, showRemove}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    // const ValidationSchema = Yup.object().shape({
    //   imgSrc:Yup.string().url().required('Please enter an image URL')
    //   });
  
      const formik=useFormik({
        enableReinitialize:true,
        // validationSchema:ValidationSchema,
        initialValues:{ url: link },
        onSubmit:async(values, action)=> {
          setIsSubmitting(true)
          var data = JSON.stringify(values, null, 2)
          var url = data.url
          //get the value of the input text field
          if(firstFieldRef.current && firstFieldRef.current.value){
            url = firstFieldRef.current.value
          }
          //fix url format
          // if(url && url.length){
          //   if(url.indexOf('{{')==-1){
          //     // url = normalizeUrl(url, {stripWWW: false, forceHttps: true} )
          //   }
    
          // }
    
          if(url){
            const selection = editor.state.selection
            const isTextSelection = selection instanceof TextSelection

              if(editor.isActive('blockLink')){
                editor.chain().focus().updateAttributes('blockLink',{ href: url }).run();
              }else if(editor.isActive('figure') && !isTextSelection){
                editor.chain().focus().updateAttributes('image',{ link: url }).run();
              }else{ 
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
              }
        }else{
          const selection = editor.state.selection
          const isTextSelection = selection instanceof TextSelection

          if(editor.isActive('blockLink')){
            editor.chain().focus().updateAttributes('blockLink',{ href: '' }).run();
         }
          if(editor.isActive('figure') && !isTextSelection){
          editor.chain().focus().updateAttributes('image',{ link: '' }).run();
        }
         else{
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
         }
        }
        setTimeout(() => {
          // sync editor
          setIsSubmitting(false)
        }, 100)
          setTimeout(() => {
            // setSubmitting(false)
            setIsSubmitting(false)
            onCancel()
        }, 100)
      
      }
      })

      const removeLink = () =>{
        if(editor.isActive('blockLink')){
          editor.chain().focus().updateAttributes('blockLink',{ href: '' }).focus().run();
        }
        else{
          editor.chain().focus().unsetLink().run();
          editor.chain().focus().updateAttributes('image',{ link: '' }).run();
        }
        onCancel()
      }
    
      return (
              <form style={{width:'90%', minWidth:150}} onSubmit={formik.handleSubmit}>
              <Fieldset>
                <Input 
                ref={firstFieldRef}
                onChange={formik.handleChange}
                value={formik.values.url}
                style={{marginTop:0.5}}
                className='bg-gray-800 rounded-md'
                defaultValue={link}
                // onFocus={(e)=>{setTimeout(()=>{e.target.select(e)},100)}}
                // onMouseUp={(e)=>{e.target.select(e)}}
                id="url" placeholder="https://" />
               {link && <div onClick={removeLink} className="absolute right-0 p-2 pr-2 text-gray-300 hover:text-gray-100">
               <svg style={{width:'18px', height:'18px', marginTop:'-1px'}}className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07zM5.775 2.293l1.932-.518L8.742 5.64l-1.931.518-1.036-3.864zm9.483 16.068l1.931-.518 1.036 3.864-1.932.518-1.035-3.864zM2.293 5.775l3.864 1.036-.518 1.931-3.864-1.035.518-1.932zm16.068 9.483l3.864 1.035-.518 1.932-3.864-1.036.518-1.931z" fill="currentColor"/></svg>
                </div>}

                </Fieldset>
                </form>
        
      )
    }