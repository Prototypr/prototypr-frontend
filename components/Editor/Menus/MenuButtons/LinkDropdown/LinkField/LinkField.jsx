import { styled } from '@stitches/react';
import { slate, indigo } from '@radix-ui/colors';

import { useFormik } from 'formik';
// import * as Yup from 'yup';
import React,{ useEffect,useState } from 'react';
import normalizeUrl from 'normalize-url';


  const Fieldset = styled('fieldset', {
    all: 'unset',
    // marginBottom: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  });
  
  const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    // borderRadius: 4,
    padding: '0px 0 0 10px',
    fontSize: 15,
    lineHeight: 1,
    color: slate.slate6,
    // boxShadow: `0 0 0 1px ${indigo.indigo8}`,
    // backgroundColor:indigo.indogo9,
    height: 32,
    // '&:focus': { boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  });


  const LinkField = ({editor,closePopup, showRemove}) =>{ 
    
    const [link, setLink] = useState();
    const firstFieldRef = React.useRef(null)

    useEffect(()=>{
      if (editor) {

        let previousUrl = editor.getAttributes("link").href;
        
        if(editor.isActive('blockLink')){
            previousUrl = editor.getAttributes("blockLink").href;
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
            if((url.indexOf('{{')==-1 && (url.indexOf('[')==-1 && url.indexOf(']')==-1) && (url.indexOf('{')==-1 && url.indexOf('}')==-1))){
              url = normalizeUrl(url, {stripWWW: false, forceHttps: true} )
            }
            
              if(editor.isActive('blockLink')){
                editor.chain().focus().updateAttributes('blockLink',{ href: url }).run();
              }else{
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
              }
        }else{
          if(editor.isActive('blockLink')){
            editor.chain().focus().updateAttributes('blockLink',{ href: '' }).run();
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
          alert('Link cleared')
        }else{

        editor.chain().focus().unsetLink().run();
        }
        onCancel()
      }
    
      return (
              <form style={{width:'90%'}} onSubmit={formik.handleSubmit}>
              <Fieldset>
                <Input 
                ref={firstFieldRef}
                onChange={formik.handleChange}
                value={formik.values.url}
                className='bg-gray-800'
                defaultValue={link}
                onFocus={(e)=>{setTimeout(()=>{e.target.select(e)},100)}}
                onMouseUp={(e)=>{e.target.select(e)}}
                id="url" placeholder="https://" />
                </Fieldset>
                </form>
        
      )
    }