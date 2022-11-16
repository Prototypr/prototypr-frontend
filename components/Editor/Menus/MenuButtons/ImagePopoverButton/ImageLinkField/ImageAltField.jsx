import { styled } from '@stitches/react';
import { blackA, green, slate, indigo, whiteA } from '@radix-ui/colors';
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
          marginLeft:'8px',
          color: slate.slate10,
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
    textAlign:'left',
    width:550,
    margin:'0 auto',
    fontSize: 15,
    lineHeight: 1,
    color: slate.slate12,
    boxShadow: `0 0 0 1px ${indigo.indigo8}`,
    backgroundColor:whiteA.whiteA10,
    height: 35,
    '&:focus': { boxShadow: `0 0 0 2px ${indigo.indigo8}` },
  });

const LinkField = ({editor, closePopup, figureNode}) =>{ 
    
    const [alt, setAlt] = useState();
    const firstFieldRef = React.useRef(null)

    useEffect(()=>{
        let previousAlt = ''
        if(figureNode?.type?.name=='figure'){
            previousAlt = figureNode?.attrs?.alt;
        }
        setAlt(previousAlt)
    },[])

    return(
    <>
          <Formy
            onCancel={()=>closePopup()}
            alt={alt}       
            figureNode = {figureNode}
            editor={editor}                
            firstFieldRef={firstFieldRef}
            />
    </>
  );}

  export default LinkField


  const Formy = ({ firstFieldRef,onCancel, editor, alt, figureNode}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const ValidationSchema = Yup.object().shape({
      imgSrc:Yup.string().url().required('Please enter an image URL')
      });
  
      const formik=useFormik({
        enableReinitialize:true,
        // validationSchema:ValidationSchema,
        initialValues:{ alt:alt },
        onSubmit:async(values, action)=> {
          setIsSubmitting(true)
          var data = JSON.stringify(values, null, 2)
          var altText = data.alt?data.alt:''

          //get the value of the input text field
          if(firstFieldRef.current && firstFieldRef.current.value){
            altText = firstFieldRef.current.value
          }
    
         const tr = editor?.view.state.tr;
    
         //update the card with the new data
         const attrs = figureNode.attrs;
        //  console.log(attrs)

         if(editor.state.selection?.$anchor?.pos){
             tr.setNodeMarkup(editor.state.selection?.$anchor?.pos, undefined, {
                ...attrs,
                alt: altText
              });
              editor.view.dispatch(tr)
         }else{
            alert("Hey, the alt tag didn't attach to the image. Please contact support if you see this again!")
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
        <div className="">
              <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <Fieldset>
                <Input 
                ref={firstFieldRef}
                onChange={formik.handleChange}
                value={formik.values.alt}
                className='placeholder-gray-400'
                // value={link}
                defaultValue={alt}
                // onFocus={(e)=>{setTimeout(()=>{e.target.select(e)},100)}}
                // onMouseUp={(e)=>{e.target.select(e)}}
                id="alt" placeholder="E.g. A lamp with a bright bulb lighting up pages of an open book on a big desk" />
                </Fieldset>
                {formik.errors.imgSrc && formik.touched.imgSrc &&
                <div className="text-xs mb-3 text-pink-200 font-semibold">{formik.errors.imgSrc}</div>}
                <div className="flex justify-center mt-3">
                <Button type="submit" variant={"confirm"} disabled={isSubmitting} className={`${isSubmitting?'opacity-70':''}`}>
                  {isSubmitting?
                    <span className="text-white">{spinnerIcon}</span>:
                  "Save"
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