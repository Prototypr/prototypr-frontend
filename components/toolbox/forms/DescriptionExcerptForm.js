import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FormContainer } from "@/components/Jobs/FormStepper";
import { FormInput } from "@/components/Jobs/FormInput";
import * as Yup from "yup";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import Button from "@/components/Primitives/Button";
import MiniEditor from "@/components/MiniEditor/MiniEditor";
import useLoad from "../hooks/useLoad";import {
    useWizardContext,
  } from 'react-sweet-wizard';
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
const axios = require("axios");

function isEmptyObject(obj) {
    return (
      Object.getPrototypeOf(obj) === Object.prototype &&
      Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0
    );
  }
  

  const DescriptionExcerptForm = ({user}) =>{

    const { loading, postObject, isOwner } =
    useLoad(user);
  
    return(
      !user && loading?<Fallback/>:
      postObject? 
      <Form postObject={postObject} user={user} />:null
    )
  
  }

const Form = ({user, postObject}) =>{

    const { activeStepIndex, onNext, onPrevious, goTo, isFirstStep, isLastStep } =useWizardContext();

    const [errores, setErrores] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

  const FormSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
    excerpt: Yup.string().required("Excerpt is required"),
  });

  const formik = useFormik({
    validateOnChange:errores?true:false,
    initialValues: {
        content: postObject?.content?postObject?.content:'',
        excerpt: postObject?.excerpt?postObject.excerpt:''
    },
  validationSchema: FormSchema,



  onSubmit: async(values) => {

    async function submit() {
        setIsSubmitting(true)
        let publishPostEndpointConfig = {
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postObject.id}`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
    
          data: {
            data: {
              ...values,
            },
          },
        };
        
        await axios(publishPostEndpointConfig)
          .then(async function (response) {
            goTo(2)
            setIsSubmitting(false)
          })
          .catch(function (error) {
            console.log(error)
            toast.error("There was an error!", {
              duration: 5000,
            });
          });
      }
    await submit();
  },
});
const { dirty, errors, isValid } = formik;
const [disabled, setDisabled] = useState(false);



    useEffect(() => {
        if (errors && isEmptyObject(errors)) {
          setErrores(false);
        } else {
          setErrores(true)
          // setDisabled(true);
        }
      }, [errors]);


      const [content, setContent] = useState(postObject?.content)
      const [excerpt, setExcerpt] = useState(postObject?.excerpt)
    useEffect(()=>{

        setContent(postObject?.content)
        setExcerpt(postObject?.excerpt)
    },[postObject])

    return(
        <div className="max-w-2xl pt-6 pb-20 w-full">
            <div className="my-2 mb-6 ">
            <h1 className="text-2xl font-semibold mx-auto mb-2">Add your description</h1>
            <p className="text-gray-600">Write a longer description, and a short excerpt.</p>
            </div>
            <form
            className="mt-6"
            onSubmit={(e) => {
            e.preventDefault();
            if ((errors && isEmptyObject(errors)) || !errors) {
                setDisabled(false);
                formik.handleSubmit();
            } else {
                // setDisabled(true);
                formik.handleSubmit();
                toast.error("Hmmmm, it seems like some of the fields are empty.");
            }
            }}
        >
            <FormContainer>
            <div className="flex flex-col mx-auto gap-5 max-w-2xl  w-auto">
            
               <label className="text-md font-medium ">
                  Tagline
                </label>
                <div className="bg-white rounded-xl">
                    <MiniEditor
                    height={84}
                    showToolbar={false}
                    initialContent={excerpt?excerpt:''} 
                    title=""
                    disabled={isSubmitting}
                    placeholder="Unicorn platform is a landing page builder for SaaS products. Build and launch your marketing site in no time!"
                    setDescription={(html)=>{
                        formik.setFieldValue("excerpt",html)
                        setExcerpt(html)
                    }}/>
                </div>
                {formik.errors.excerpt && <span className="text-red-600 text-xs">{formik.errors.excerpt}</span>}
                 
            <label className="text-md font-medium mt-4">
                  Description
                </label>
                <div className="bg-white rounded-xl">
                    <MiniEditor
                    placeholder="Example: Need a new landing page? Look no further – ‘Unicorn Platform 3’ is here! One of the best landing page builders around just got better. Version 3 has loads of new features: Stripe payments, Google Sheets, blogging, and tonnes more. Everything you need for your SaaS, mobile app page, or tech startup. It’s also an Indie-made product, built by Alexander Isora and co."
                    title=""
                    initialContent={content?content:''}
                    disabled={isSubmitting}
                    setDescription={(html)=>{
                        formik.setFieldValue("content",html)
                        setContent(html)
                    }}/>
                </div>
                {formik.errors.content && <span className="text-red-600 text-xs">{formik.errors.content}</span>}

             
            </div>
            <div className="flex flex-col mx-auto max-w-2xl mt-12 w-auto"/>

                <Button
                variant={"confirmMedium"}
                type="submit"
                disabled={isSubmitting}
                className="p-4 bg-blue-700 text-white font-semibold rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                {isSubmitting?
                <div className="mx-auto w-[100px] flex justify-center">
                <Spinner size="sm" className="text-black" />
                </div>
                :
                `Save and Continue`}
                </Button>
                <div
                onClick={onPrevious}
                disabled={isSubmitting}
                className="px-3 py-2 inline-block hover:text-black text-gray-600 ml-4 cursor-pointer font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                Back
                </div>
            </FormContainer>
        </form>
        </div>
    )
}

export default DescriptionExcerptForm