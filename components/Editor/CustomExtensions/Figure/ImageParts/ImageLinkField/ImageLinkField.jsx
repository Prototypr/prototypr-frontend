import { styled } from '@stitches/react';
import { blackA, green, slate, indigo } from '@radix-ui/colors';
import normalizeUrl from 'normalize-url';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import React,{ useEffect,useState } from 'react';
  
const spinnerIcon = (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);


const Button = styled('button', {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    fontWeight: 500,
    height: 35,
  
    variants: {
      variant: {
        cancel: {
          backgroundColor: '',
          marginRight:'8px',
          color: slate.slate4,
          // boxShadow: `0 2px 10px ${blackA.blackA7}`,
          '&:hover': { outline: `1px solid ${slate.slate6}` },
          '&:focus': { boxShadow: `0 0 0 2px black` },
        },
        confirm: {
            backgroundColor: indigo.indigo10,
            color: slate.slate4,
            boxShadow: `0 2px 10px ${blackA.blackA7}`,
            '&:hover': { backgroundColor: indigo.indigo9 },
            '&:focus': { boxShadow: `0 0 0 2px black` },
          },
      },
    },
  
    defaultVariants: {
      variant: 'confirm',
    },
  });


  const Fieldset = styled('fieldset', {
    all: 'unset',
    marginBottom: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  });
  
  const Label = styled('label', {
    fontSize: 13,
    lineHeight: 1,
    marginBottom: 10,
    color: slate.slate8,
    display: 'block',
  });
  
  const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: 4,
    padding: '0 10px',
    fontSize: 15,
    lineHeight: 1,
    color: slate.slate6,
    boxShadow: `0 0 0 1px ${indigo.indigo8}`,
    backgroundColor:indigo.indogo9,
    height: 35,
    '&:focus': { boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  });

const LinkField = ({editor,node, setCanvasLoading, updateAttributes, closePopup}) =>{ 
    
    const [link, setLink] = useState();
    const [alt, setAlt] = useState();

    const firstFieldRef = React.useRef(null)
    const secondFieldRef = React.useRef(null)

    useEffect(()=>{
        const previousUrl = node.attrs.link;
        setLink(previousUrl)
        const previousAlt = node.attrs.alt;
        setAlt(previousAlt)
    },[])

    return(
    <>
          <Formy
            setCanvasLoading={setCanvasLoading}
            onCancel={()=>closePopup()}
            link={link}
            editor={editor}
            firstFieldRef={firstFieldRef}
            secondFieldRef={secondFieldRef}
            updateAttributes={updateAttributes}
            node={node}
            alt={alt}                       
            />
    </>
  );}

  export default LinkField


  const Formy = ({ firstFieldRef,secondFieldRef,onCancel, link,node,alt, openDokaFromInput, editor, updateAttributes, setCanvasLoading}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const ValidationSchema = Yup.object().shape({
      imgSrc:Yup.string().url().required('Please enter an image URL')
      });
  
      const formik=useFormik({
        enableReinitialize:true,
        // validationSchema:ValidationSchema,
        initialValues:{ url: link, alt:alt },
        onSubmit:async(values, action)=> {
          setIsSubmitting(true)
          var data = JSON.stringify(values, null, 2)
          var url = data.url
          var altText = data.alt?data.alt:''

          //get the value of the input text field
          if(firstFieldRef.current && firstFieldRef.current.value){
            url = firstFieldRef.current.value
          }
          //get the value of the input text field
          if(secondFieldRef.current && secondFieldRef.current.value){
            altText = secondFieldRef.current.value
          }
          //fix url format
          if(url && url.length){
            if((url.indexOf('{{')==-1 && (url.indexOf('[')==-1 && url.indexOf(']')==-1) && (url.indexOf('{')==-1 && url.indexOf('}')==-1))){
              url = normalizeUrl(url, {stripWWW: false, forceHttps: true} )
            }
    
          }
    
          if(node && url){
            //if the current node is a link already
          //   var $node = $(node);
            
          //  var valid= await checkLink(url)
    
          //  if(!valid){
          //       alert("Broken link detected. Please check the link you just entered – the website doesn't appear to load.")
          //       setIsSubmitting(false)
          //       return false
          //     }
            updateAttributes({link:url, alt:altText})
        }else if(node){
          //if node but url is blank, clear url
          updateAttributes({link:'', alt:altText})
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
    
      return (
        <div className="flex flex-col">
              <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <Fieldset>
                <Label htmlFor="url">Link</Label>
                <Input 
                ref={firstFieldRef}
                onChange={formik.handleChange}
                value={formik.values.url}
                className='bg-gray-800 placeholder-gray-500'
                // value={link}
                defaultValue={link}
                onFocus={(e)=>{setTimeout(()=>{e.target.select(e)},100)}}
                onMouseUp={(e)=>{e.target.select(e)}}
                id="url" placeholder="https://" />
                <Label className="mt-5" htmlFor="alt">Image Alt Text</Label>
                <Input 
                ref={secondFieldRef}
                onChange={formik.handleChange}
                value={formik.values.alt}
                className='bg-gray-800 placeholder-gray-500'
                // value={link}
                defaultValue={alt}
                onFocus={(e)=>{setTimeout(()=>{e.target.select(e)},100)}}
                onMouseUp={(e)=>{e.target.select(e)}}
                id="alt" placeholder="Descriptive text for your image" />
                </Fieldset>
                {formik.errors.imgSrc && formik.touched.imgSrc &&
                <div className="text-xs mb-3 text-pink-200 font-semibold">{formik.errors.imgSrc}</div>}
                <div className="flex flex-row-reverse justify-start">
                <Button disabled={isSubmitting} type="submit"className={`${isSubmitting?'opacity-70':''} font-secondary`}>
                  {isSubmitting?
                    <span className="text-white">{spinnerIcon}</span>:
                  "Update"
                    }
                </Button>
                 <Button
                 variant="cancel" 
                      onClick={onCancel}>
                          <div className="flex leading-5">
                             Cancel
                          </div>
                  </Button>
                </div>
                </form>
  
        </div>
      )
    }